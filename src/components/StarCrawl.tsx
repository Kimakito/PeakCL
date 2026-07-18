import { useEffect, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { localeFromPath, type Locale } from "@/i18n/config";

/**
 * Générique façon « opening crawl » : le texte est couché en perspective et
 * remonte vers un point de fuite, sur un ciel étoilé violet PeakCL.
 *
 * L'avancement suit le SCROLL, pas une minuterie. C'est le choix structurant :
 * une version chronométrée imposait ~35s au visiteur (il attend ou il part),
 * alors que la bio est justement l'endroit où un prospect vérifie à qui il
 * confie son budget. Piloté au scroll, il lit à sa vitesse et l'effet ne coûte
 * aucun temps mort.
 *
 * Autres contraintes tenues :
 * - Le texte reste du vrai texte dans le DOM (une transform CSS ne le cache ni
 *   à Google ni aux lecteurs d'écran) : le SEO local est préservé.
 * - `prefers-reduced-motion` ou « Lire en texte » => prose statique.
 */

type Para = { lead?: string; rest: string };

/** Textes du générique selon la langue : paragraphes, titres, libellés de
 *  boutons et CTA de sortie. L'anglais adopte un angle international/remote et
 *  retire l'ancrage Savoie. */
type CrawlCopy = {
  paragraphs: Para[];
  episode: string;
  title: string;
  endText: string;
  ctaLabel: string;
  ctaHref: string;
  readAsText: string;
  replay: string;
};

/** `lead` = le fragment mis en avant, repris en gras dans la version statique. */
const PARAGRAPHS_FR: Para[] = [
  {
    lead: "Je code, je dessine, et je suis formée au community management.",
    rest: "Je m'appelle Charlotte Lacroix et je suis à l'origine de PeakCL. La plupart des entrepreneurs doivent jongler entre un développeur qui ne pense pas design, un graphiste qui ne sait pas coder et un CM qui ne connaît pas leur image. Avec moi, c'est une seule interlocutrice pour votre site, votre identité visuelle et vos réseaux : site, logo et publications alignés sur le même message, sans double brief ni sous-traitance cachée.",
  },
  {
    rest: "Ma formation en community management complète mes compétences techniques et graphiques : je ne me contente pas de « faire de jolis posts », je construis une communication cohérente, pensée pour la conversion, du site web jusqu'aux réseaux sociaux.",
  },
  {
    rest: "Concrètement, j'accompagne des indépendants, artisans, thérapeutes, commerçants et petites structures qui veulent une présence en ligne professionnelle sans y passer leurs soirées. J'ai livré 19 projets, agence de voyage, cabinet d'avocate, artisan automobile, prothésiste dentaire, coachs, e-commerce équestre, notés 5/5 sur Google. Basée à Gilly-sur-Isère, juste à côté d'Albertville, je travaille avec des clients dans toute la Savoie (Chambéry, Aix-les-Bains, Annecy) et partout en France, en visio.",
  },
];

const PARAGRAPHS_EN: Para[] = [
  {
    lead: "I code, I design, and I'm trained in social media management.",
    rest: "I'm Charlotte Lacroix and I'm the founder of PeakCL. Most business owners have to juggle a developer who doesn't think about design, a designer who can't code and a social media manager who doesn't know their brand. With me, it's a single point of contact for your site, your visual identity and your social: site, logo and posts aligned on the same message, with no double brief and no hidden subcontracting.",
  },
  {
    rest: "My training in social media management rounds out my technical and design skills: I don't just make pretty posts, I build consistent communication, designed to convert, from your website all the way to your social channels.",
  },
  {
    rest: "In practice, I help freelancers, makers, therapists, shop owners and small teams who want a professional online presence without spending their evenings on it. I've delivered 19 projects, a travel agency, a law firm, an auto craftsman, a dental technician, coaches, an equestrian store, all rated 5/5 on Google. I work remotely, with clients across France and worldwide, over video calls.",
  },
];

function crawlCopy(locale: Locale): CrawlCopy {
  if (locale === "en") {
    return {
      paragraphs: PARAGRAPHS_EN,
      episode: "Episode I",
      title: "A single point of contact",
      endText: "One point of contact for your site, your logo and your social.",
      ctaLabel: "Get your diagnosis",
      ctaHref: "/en/book-a-call",
      readAsText: "Read as text",
      replay: "Replay the intro",
    };
  }
  return {
    paragraphs: PARAGRAPHS_FR,
    episode: "Épisode I",
    title: "Une seule interlocutrice",
    endText:
      "Une seule interlocutrice pour votre site, votre logo et vos réseaux.",
    ctaLabel: "Faire le diagnostic",
    ctaHref: "/reservation-appel",
    readAsText: "Lire en texte",
    replay: "Revoir le générique",
  };
}

/**
 * Étoiles tirées avec un xorshift à graine fixe : le serveur et le client
 * doivent produire exactement le même ciel, sinon l'hydratation casse
 * (Math.random() donnerait deux rendus différents).
 */
function makeStars(count: number, seed: number) {
  let s = seed;
  const rnd = () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return ((s >>> 0) % 100000) / 100000;
  };
  return Array.from({ length: count }, () => ({
    left: +(rnd() * 100).toFixed(3),
    top: +(rnd() * 100).toFixed(3),
    size: rnd() < 0.14 ? 2 : 1,
    opacity: +(0.25 + rnd() * 0.7).toFixed(2),
  }));
}

const STARS = makeStars(140, 20260717);

/**
 * Le crawl est réservé au desktop. Sous 768px le texte tombe au minimum du
 * clamp (15px), justifié et gras, couché en perspective : illisible. Le mobile
 * reçoit donc la prose, qui est de toute façon ce qu'un prospect vient lire.
 */
const CRAWL_MEDIA =
  "(min-width: 768px) and (prefers-reduced-motion: no-preference)";

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

export function StarCrawl({ className = "" }: { className?: string }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const locale = localeFromPath(path);
  const copy = crawlCopy(locale);
  const PARAGRAPHS = copy.paragraphs;
  const runwayRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  // `null` = pas de choix manuel, on suit CRAWL_MEDIA.
  const [forced, setForced] = useState<null | "static" | "crawl">(null);
  const [canCrawl, setCanCrawl] = useState(false);
  const [nearEnd, setNearEnd] = useState(false);

  // Démarre à false : le SSR rend donc la prose, et seul le desktop bascule sur
  // le crawl au montage. Le mobile ne bascule jamais (aucun flash), et le HTML
  // servi reste de la prose lisible, sans JS comme pour l'indexation.
  useEffect(() => {
    const mq = window.matchMedia(CRAWL_MEDIA);
    const sync = () => setCanCrawl(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const showCrawl = forced ? forced === "crawl" : canCrawl;

  useEffect(() => {
    if (!showCrawl) return;
    let raf = 0;

    const update = () => {
      raf = 0;
      const runway = runwayRef.current;
      const scene = sceneRef.current;
      const text = textRef.current;
      if (!runway || !scene || !text) return;

      const sceneH = scene.clientHeight;
      const textH = text.scrollHeight;
      // Départ à 35% du cadre et non tout en bas : la perspective repousse
      // déjà le bas hors champ, partir plus bas n'ajoute que du vide.
      const from = sceneH * 0.35;
      const to = -textH;

      // Course de scroll calée sur la distance à parcourir : 1px scrollé ≈ 1px
      // de crawl. Sans ça, le mapping dépendrait du retour à la ligne.
      runway.style.height = `${window.innerHeight + (from - to)}px`;

      const rect = runway.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      const p = travel > 0 ? clamp(-rect.top / travel, 0, 1) : 0;

      scene.style.setProperty("--crawl-y", `${from + (to - from) * p}px`);
      setNearEnd(p > 0.94);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const ro = new ResizeObserver(onScroll);
    if (textRef.current) ro.observe(textRef.current);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [showCrawl]);

  if (!showCrawl) {
    return (
      <div className={className}>
        <div className="space-y-5 text-[15px] leading-relaxed text-muted-foreground">
          {PARAGRAPHS.map((p, i) => (
            <p key={i}>
              {p.lead && <strong className="text-foreground">{p.lead} </strong>}
              {p.rest}
            </p>
          ))}
        </div>
        {/* Proposé seulement là où le crawl est lisible : jamais sur mobile. */}
        {canCrawl && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setForced("crawl")}
              className="text-sm font-semibold text-[var(--brand-turquoise)] hover:text-foreground"
            >
              {copy.replay}
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={runwayRef} className={`crawl-runway ${className}`}>
      <div className="crawl-sticky">
        {/* Les overlays (CTA, bouton) vivent hors de .crawl-scene : la
            perspective y crée un contexte 3D où le plan incliné est composité
            devant eux, et z-index n'y suffit pas. */}
        <div className="relative w-full">
          <div
            ref={sceneRef}
            className="crawl-scene h-[76vh] min-h-[420px] rounded-2xl border border-white/10 bg-[oklch(0.16_0.07_295)] shadow-card"
          >
            {/* Ciel étoilé : hors du .crawl-tilt, donc épargné par le masque. */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
              {STARS.map((s, i) => (
                <span
                  key={i}
                  className="absolute rounded-full bg-white"
                  style={{
                    left: `${s.left}%`,
                    top: `${s.top}%`,
                    width: s.size,
                    height: s.size,
                    opacity: s.opacity,
                  }}
                />
              ))}
            </div>

            <div className="crawl-tilt">
              <div
                ref={textRef}
                className="crawl-text px-[8%] text-[clamp(15px,2.4vw,26px)] text-[var(--brand-yellow)]"
                style={{
                  textShadow:
                    "0 0 14px color-mix(in oklab, var(--brand-yellow) 45%, transparent)",
                }}
              >
                <p className="text-center text-[0.8em] font-semibold uppercase tracking-[0.35em]">
                  {copy.episode}
                </p>
                <h2 className="mt-2 text-center text-[1.6em] font-extrabold uppercase leading-tight tracking-wide">
                  {copy.title}
                </h2>
                <div className="mt-[1.2em] space-y-[1em] text-justify font-bold leading-[1.45]">
                  {PARAGRAPHS.map((p, i) => (
                    <p key={i}>
                      {p.lead && <>{p.lead} </>}
                      {p.rest}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Le crawl terminé, le cadre serait un ciel vide : on sort sur le CTA. */}
          <div
            className={`pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 px-6 text-center transition-opacity duration-500 ${
              nearEnd ? "opacity-100" : "opacity-0"
            }`}
          >
            <p className="text-lg font-semibold text-foreground">
              {copy.endText}
            </p>
            <a
              href={copy.ctaHref}
              className={`inline-flex items-center justify-center rounded-full bg-primary-gradient px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition-all hover:scale-[1.03] ${
                nearEnd ? "pointer-events-auto" : ""
              }`}
            >
              {copy.ctaLabel}
            </a>
          </div>

          <button
            onClick={() => setForced("static")}
            className="absolute bottom-3 right-3 z-10 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-xs font-semibold text-white/60 backdrop-blur transition-colors hover:text-white"
          >
            {copy.readAsText}
          </button>
        </div>
      </div>
    </div>
  );
}
