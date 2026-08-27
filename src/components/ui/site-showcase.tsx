import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export type ShowcaseSite = {
  id: string;
  /** Nom du client, affiché sous le navigateur. */
  name: string;
  /** Métier + ville, repris du portfolio. */
  metier: string;
  /** URL réelle du site livré. Sert au lien ET à la barre d'adresse. */
  url: string;
  /** Capture du site. Les captures du portfolio conviennent telles quelles. */
  image: string;
};

type SiteShowcaseProps = {
  sites: ShowcaseSite[];
  className?: string;
};

/** Retire le protocole et le slash final, pour une barre d'adresse lisible. */
function prettyUrl(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

/**
 * Vitrine défilante : un navigateur dans lequel les sites livrés se succèdent
 * au fil du défilement, avec un léger panoramique vertical qui donne
 * l'impression que la page bouge.
 *
 * Ce composant remplace une séquence d'images façon page produit Apple. La
 * version d'origine chargeait 941 JPG — mesuré à 102 Mo, dont 15 Mo avant même
 * d'être utilisable — sur une page qui vend des sites rapides. Ici, une capture
 * par client, celles du portfolio, environ 55 Ko pièce.
 *
 * Trois principes tenus :
 *
 * 1. **Aucun détournement du défilement.** La progression se calcule à partir
 *    de la position de la section dans le viewport, jamais depuis
 *    `document.scrollHeight`. La section n'impose aucune hauteur à la page et
 *    n'a pas d'avis sur ce qui l'entoure.
 * 2. **Aucun rendu React pendant l'animation.** La progression vit dans un ref
 *    et s'écrit directement sur les styles. Un `scroll` non throttlé qui
 *    déclenche cinq `setState` par tick, comme dans la version d'origine, rend
 *    la page collante sur mobile.
 * 3. **`prefers-reduced-motion` respecté** : plus de panoramique ni de fondu,
 *    les sites restent atteignables, chacun gardant son lien.
 *
 * Les captures sont `loading="lazy"` sauf la première : la vitrine est sous la
 * ligne de flottaison, elle ne doit pas peser sur le LCP.
 */
export function SiteShowcase({ sites, className }: SiteShowcaseProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const imgRefs = useRef<Array<HTMLImageElement | null>>([]);
  const urlRef = useRef<HTMLSpanElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || sites.length === 0) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let lastIndex = -1;

    const paint = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 quand la section entre par le bas, 1 quand elle sort par le haut.
      // Aucune dependance a la hauteur du document : la section peut vivre
      // n'importe ou dans la page sans rien lui imposer.
      const raw = (vh - rect.top) / (vh + rect.height);
      const p = Math.max(0, Math.min(0.9999, raw));

      const scaled = p * sites.length;
      const index = Math.min(sites.length - 1, Math.floor(scaled));
      const local = scaled - index;

      for (let i = 0; i < sites.length; i += 1) {
        const slide = slideRefs.current[i];
        const img = imgRefs.current[i];
        if (!slide) continue;
        const active = i === index;
        slide.style.opacity = reduced ? (active ? "1" : "0") : active ? "1" : "0";
        slide.style.zIndex = active ? "2" : "1";
        if (img && !reduced) {
          // Panoramique de 0 a -12% : la capture est affichee a 112% de
          // hauteur, l'oeil lit ca comme une page qui defile.
          img.style.transform = `translate3d(0, ${(-local * 12).toFixed(2)}%, 0)`;
        }
      }

      if (index !== lastIndex) {
        lastIndex = index;
        const site = sites[index];
        if (urlRef.current) urlRef.current.textContent = prettyUrl(site.url);
        if (captionRef.current) {
          captionRef.current.innerHTML = "";
          const strong = document.createElement("span");
          strong.className = "font-semibold text-foreground";
          strong.textContent = site.name;
          const rest = document.createElement("span");
          rest.textContent = ` · ${site.metier}`;
          captionRef.current.append(strong, rest);
        }
      }
      frame = 0;
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(paint);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.addEventListener("scroll", onScroll, { passive: true });
          window.addEventListener("resize", onScroll);
          paint();
        } else {
          window.removeEventListener("scroll", onScroll);
          window.removeEventListener("resize", onScroll);
        }
      },
      { threshold: 0 },
    );
    observer.observe(section);
    paint();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [sites]);

  return (
    <div ref={sectionRef} className={cn("mx-auto w-full max-w-4xl", className)}>
      {/* Chrome de navigateur, purement decoratif : masque aux lecteurs
          d'ecran, qui n'ont que faire de trois pastilles rondes. */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card/60 shadow-card">
        <div
          aria-hidden
          className="flex items-center gap-2 border-b border-border bg-muted/60 px-4 py-2.5"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 flex-1 truncate rounded-md bg-background/70 px-3 py-1 text-[11px] text-muted-foreground">
            <span ref={urlRef}>{prettyUrl(sites[0]?.url ?? "")}</span>
          </span>
        </div>

        <div className="relative aspect-[16/10] w-full overflow-hidden bg-background">
          {sites.map((site, i) => (
            <div
              key={site.id}
              ref={(el) => {
                slideRefs.current[i] = el;
              }}
              className="absolute inset-0 transition-opacity duration-500"
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              <a
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                data-event="showcase_site_open"
                aria-label={`Voir le site de ${site.name}`}
                className="block h-full w-full"
              >
                <img
                  ref={(el) => {
                    imgRefs.current[i] = el;
                  }}
                  src={site.image}
                  alt={`Site livré pour ${site.name}, ${site.metier}`}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className="h-[112%] w-full object-cover object-top will-change-transform"
                />
              </a>
            </div>
          ))}
        </div>
      </div>

      <div ref={captionRef} className="mt-4 text-center text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">{sites[0]?.name}</span>
        <span> · {sites[0]?.metier}</span>
      </div>
      <p className="mt-1 text-center text-xs text-muted-foreground/70">
        Des sites réellement livrés. Faites défiler pour les parcourir.
      </p>
    </div>
  );
}
