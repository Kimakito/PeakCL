import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState, useCallback, type FormEvent } from "react";
import {
  ArrowRight, Check, Sparkles, Star, Phone,
} from "lucide-react";
import { peakclTestimonials } from "@/content/peakcl/testimonials";
import { peakclFaq } from "@/content/peakcl/faq";
import { peakclPortfolio } from "@/content/peakcl/portfolio";
import { CATEGORIES } from "@/content/peakcl/portfolioDeck";
import { DeckFooter } from "@/components/DeckFooter";
import { TrustedBySection } from "@/components/TrustedBySection";
import { optimizedLogoUrl } from "@/lib/optimizedLogo";
import { absUrl } from "@/seo/site";
import { faqPageJsonLd } from "@/seo/jsonld";
import { submitNetlifyForm } from "@/lib/funnel";
import { Fireworks } from "@/components/home/Fireworks";
import { AuroraCanvas } from "@/components/home/AuroraCanvas";
import { Mascot } from "@/components/Mascot";
import { MASCOT_POSES, type MascotPose } from "@/lib/mascot";

const LOGO_NAV = "/peakcl/logo-nav.webp";
const AVATAR_SVG = "/peakcl/avatar.svg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Création site internet, logo & réseaux en Savoie · PeakCL" },
      {
        name: "description",
        content:
          "Site, identité, réseaux, Google : déléguez toute votre image en ligne à un seul interlocuteur. Pour indépendants et petites structures qui veulent une présence pro sans y passer leurs soirées.",
      },
      { property: "og:title", content: "PeakCL · Déléguez votre communication en ligne" },
      {
        property: "og:description",
        content:
          "Pas le temps pour votre site, vos réseaux et votre image ? Un seul interlocuteur pour construire une communication en ligne cohérente, de A à Z.",
      },
      { property: "og:url", content: absUrl("/") },
      { "script:ld+json": faqPageJsonLd(peakclFaq) },
    ],
    links: [
      { rel: "canonical", href: absUrl("/") },
      { rel: "preload", href: LOGO_NAV, as: "image", type: "image/webp" },
      { rel: "preload", href: AVATAR_SVG, as: "image", type: "image/svg+xml" },
      { rel: "preload", href: "/peakcl/avatar-montre.webp", as: "image", type: "image/webp" },
      { rel: "preload", href: "/peakcl/avatar-dab.webp", as: "image", type: "image/webp" },
      { rel: "preload", href: "/peakcl/avatar-tablette.webp", as: "image", type: "image/webp" },
      { rel: "preload", href: "/peakcl/avatar-bas.webp", as: "image", type: "image/webp" },
      { rel: "preload", href: "/peakcl/avatar-graphique.webp", as: "image", type: "image/webp" },
      { rel: "preload", href: "/peakcl/avatar-victoire.webp", as: "image", type: "image/webp" },
    ],
  }),
  component: Landing,
});

const CALENDLY_URL = "https://calendly.com/peakcl73/faisons-connaissance";
const WHATSAPP_URL = "https://wa.me/33743517627";
const PHONE_TEL = "tel:+33743517627";
const PHONE_DISPLAY = "07 43 51 76 27";
const EMAIL = "peakcl73@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/charlotte-lacroix-peakcl/";
const MALT_URL = "https://www.malt.fr/profile/peakcldev";
const FIVERR_URL = "https://fr.fiverr.com/s/99W6WYa";
const COMEUP_URL = "https://comeup.com/fr/@PeakCL";
const CODEUR_URL = "https://www.codeur.com/-peakcl";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

/* ── Shared primitive components ─────────────────────────────── */

function CTAButton({
  children, href = "#contact", variant = "primary", className = "", dataEvent,
}: {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "ghost";
  className?: string;
  dataEvent?: string;
}) {
  const base = "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300";
  const styles =
    variant === "primary"
      ? "bg-primary-gradient text-primary-foreground shadow-glow hover:scale-[1.03]"
      : "border border-border bg-card/40 text-foreground backdrop-blur hover:bg-card/70";
  const isExternal = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      data-event={dataEvent}
      className={`${base} ${styles} ${className}`}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </a>
  );
}

function ContactInline({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-muted-foreground ${className}`}>
      <span>Ou</span>
      <a href={PHONE_TEL} data-event="cta_phone" className="inline-flex items-center gap-1 font-semibold text-[var(--brand-turquoise)] hover:text-foreground">
        <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden />
        {PHONE_DISPLAY}
      </a>
      <span>·</span>
      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" data-event="cta_whatsapp" className="font-semibold text-[var(--brand-turquoise)] hover:text-foreground">WhatsApp</a>
      <span>·</span>
      <a href={`mailto:${EMAIL}`} data-event="cta_email" className="font-semibold text-[var(--brand-turquoise)] hover:text-foreground">{EMAIL}</a>
    </div>
  );
}

/* ── Section definitions ─────────────────────────────────────── */

const SECTIONS = [
  { id: "accueil",   label: "Accueil" },
  { id: "probleme",  label: "Votre situation" },
  { id: "difference", label: "La différence" },
  { id: "methode",   label: "Méthode" },
  { id: "offres",    label: "Offres" },
  { id: "portfolio", label: "Portfolio" },
  { id: "avis",      label: "Avis" },
  { id: "faq",       label: "FAQ" },
  { id: "contact",   label: "Contact" },
  { id: "footer",    label: "Liens & contact" },
] as const;

type SectionId = typeof SECTIONS[number]["id"];

/* ── Timeline avatar at bottom ───────────────────────────────── */

function TimelineBar({ activeIdx, total, onNavigate }: { activeIdx: number; total: number; onNavigate: (i: number) => void }) {
  const pct = total > 1 ? (activeIdx / (total - 1)) * 100 : 0;
  // sens de marche : on garde la dernière direction de navigation
  const prevIdx = useRef(activeIdx);
  const [facingRight, setFacingRight] = useState(true);
  useEffect(() => {
    if (activeIdx > prevIdx.current) setFacingRight(true);
    else if (activeIdx < prevIdx.current) setFacingRight(false);
    prevIdx.current = activeIdx;
  }, [activeIdx]);
  return (
    <div className="fixed bottom-0 left-16 right-0 z-40 hidden h-16 items-center px-8 md:flex">
      <div className="relative flex w-full items-center">
        {/* track */}
        <div className="h-px w-full bg-white/10" />
        {/* progress */}
        <div
          className="absolute left-0 h-px bg-gradient-to-r from-[var(--brand-violet)] via-[var(--brand-turquoise)] to-[var(--brand-yellow)] transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
        {/* dots */}
        {SECTIONS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => onNavigate(i)}
            title={s.label}
            className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2"
            style={{ left: `${(i / (total - 1)) * 100}%` }}
          >
            <span
              className={`block h-2 w-2 rounded-full transition-all duration-300 ${
                i === activeIdx
                  ? "scale-150 bg-[var(--brand-turquoise)] shadow-[0_0_8px_var(--brand-turquoise)]"
                  : i < activeIdx
                  ? "bg-[var(--brand-violet)]"
                  : "bg-white/20"
              }`}
            />
          </button>
        ))}
        {/* avatar qui marche le long de la timeline */}
        <div
          className="absolute bottom-1/2 -translate-x-1/2 transition-all duration-500"
          style={{ left: `${pct}%` }}
        >
          {/* orientation selon le sens de navigation (l'image regarde à gauche par défaut) */}
          <div style={{ transform: facingRight ? "scaleX(-1)" : "scaleX(1)" }}>
            <div className="mascot-walk">
              <img
                src="/peakcl/avatar-marche.webp"
                alt=""
                aria-hidden
                className="h-16 w-auto select-none drop-shadow-[0_0_12px_color-mix(in_oklab,var(--brand-turquoise)_60%,transparent)]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Left vertical navbar ────────────────────────────────────── */

function RightNav({ activeIdx, onNavigate }: { activeIdx: number; onNavigate: (i: number) => void }) {
  return (
    <nav
      aria-label="Navigation sections"
      className="fixed left-0 top-0 z-50 hidden h-full w-16 flex-col items-center justify-center gap-3 md:flex"
    >
      <div className="flex flex-col items-center gap-3">
        <a href="#top" className="mb-4 flex items-center justify-center">
          <img src={LOGO_NAV} alt="PeakCL" width={28} height={28} className="h-7 w-7 rounded-md object-cover opacity-80 hover:opacity-100" />
        </a>
        {SECTIONS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => onNavigate(i)}
            title={s.label}
            className="group relative flex items-center justify-center"
          >
            <span
              className={`block h-2 w-2 rounded-full transition-all duration-300 ${
                i === activeIdx
                  ? "scale-150 bg-[var(--brand-turquoise)] shadow-[0_0_8px_var(--brand-turquoise)]"
                  : "bg-white/25 group-hover:bg-white/60"
              }`}
            />
            <span className="pointer-events-none absolute left-8 whitespace-nowrap rounded-md bg-card/90 px-2 py-1 text-xs font-medium opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
              {s.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}

/* ── Mobile top nav ──────────────────────────────────────────── */

function MobileNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-background/70 backdrop-blur-xl md:hidden">
      <div className="flex items-center justify-between px-4 py-3">
        <a href="#top" className="flex items-center gap-2">
          <img src={LOGO_NAV} alt="PeakCL logo" width={32} height={32} fetchPriority="high" decoding="async" className="h-8 w-8 rounded-lg object-cover" />
          <span className="font-display text-base font-bold tracking-tight">Peak<span className="text-gradient">CL</span></span>
        </a>
        <CTAButton href={CALENDLY_URL} dataEvent="cta_calendly_header" className="!px-4 !py-2 !text-xs">Appel</CTAButton>
      </div>
    </header>
  );
}

/* ── Hero panel ─────────────────────────────────────────────── */

const ORBIT_ITEMS = [
  // pose = pose déclenchée au survol ; flip = version miroir (autre sens)
  { label: "Réserver un appel", href: "/reservation-appel", angle: -90, r: 220, variant: "primary" as const, pose: "victoire" as MascotPose },
  { label: "Réserver un appel", href: CALENDLY_URL, angle: -25, r: 240, variant: "ghost" as const, pose: "dab" as MascotPose },
  { label: "Voir le portfolio", href: "/portfolio", angle: 30, r: 220, variant: "ghost" as const, pose: "tablette" as MascotPose },
  { label: "Voir les offres", href: "/packs", angle: 90, r: 240, variant: "ghost" as const, pose: "bas" as MascotPose },
  { label: "Avis clients", href: "#avis", angle: 150, r: 220, variant: "ghost" as const, pose: "graphique" as MascotPose },
  { label: "WhatsApp", href: WHATSAPP_URL, angle: 210, r: 230, variant: "ghost" as const, pose: "dab" as MascotPose, flip: true },
] as const;

/** Mascotte décorative d'une section : en filigrane derrière le contenu,
 *  dans la gouttière latérale, visible seulement sur grands écrans (xl+). */
function SectionMascot({
  pose,
  side = "right",
  flip = false,
  heightClass = "h-[48vh]",
}: {
  pose: MascotPose;
  side?: "left" | "right";
  flip?: boolean;
  heightClass?: string;
}) {
  return (
    <img
      aria-hidden
      src={MASCOT_POSES[pose]}
      className={`pointer-events-none absolute bottom-0 -z-10 hidden w-auto select-none opacity-90 drop-shadow-[0_10px_40px_rgba(0,0,0,0.35)] xl:block ${heightClass} ${side === "right" ? "right-3 2xl:right-10" : "left-3 2xl:left-10"}`}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    />
  );
}

function HeroAvatar() {
  // Pose active = celle du bouton survolé ; sinon pose de repos (salut).
  const [active, setActive] = useState<{ pose: MascotPose; flip: boolean } | null>(null);
  const current = active ?? { pose: "montre" as MascotPose, flip: false };

  return (
    <div
      className="relative z-10 flex items-center justify-center"
      style={{ width: "var(--hero)", height: "var(--hero)", "--hero": "clamp(280px, 42vh, 520px)" } as React.CSSProperties}
    >
      {/* glow rings */}
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--brand-violet)_30%,transparent)_0%,transparent_70%)]" />
      <div className="absolute inset-[6%] animate-[spin_20s_linear_infinite] rounded-full border border-[var(--brand-violet)]/15" />
      <div className="absolute inset-[12%] animate-[spin_30s_linear_infinite_reverse] rounded-full border border-[var(--brand-turquoise)]/10" />

      {/* mascotte (suit la souris + change de pose au survol) */}
      <div
        className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
        style={{ height: "calc(var(--hero) * 0.58)", width: "calc(var(--hero) * 0.66)" }}
      >
        <Mascot pose={current.pose} flip={current.flip} lean heightClass="h-full" className="h-full w-full" alt="Charlotte · PeakCL" />
      </div>

      {/* orbiting CTAs (positions proportionnelles à --hero) */}
      {ORBIT_ITEMS.map((item) => {
        const rad = (item.angle * Math.PI) / 180;
        const fx = ((Math.cos(rad) * item.r) / 520).toFixed(4);
        const fy = ((Math.sin(rad) * item.r) / 520).toFixed(4);
        return (
          <div
            key={item.label}
            className="absolute"
            style={{
              left: "50%",
              top: "50%",
              transform: `translate(calc(-50% + ${fx} * var(--hero)), calc(-50% + ${fy} * var(--hero)))`,
            }}
            onMouseEnter={() => setActive({ pose: item.pose, flip: "flip" in item ? !!item.flip : false })}
            onMouseLeave={() => setActive(null)}
          >
            <CTAButton
              href={item.href}
              variant={item.variant}
              dataEvent={`cta_hero_${item.label.toLowerCase().replace(/\s+/g, "_")}`}
              className="!px-3 !py-1.5 !text-xs whitespace-nowrap shadow-lg"
            >
              {item.label}
            </CTAButton>
          </div>
        );
      })}
    </div>
  );
}

function HeroPanel() {
  return (
    <section id="accueil" className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden">
      {/* Aurora Peaks — Three.js scene as background */}
      <AuroraCanvas />
      {/* Keep Fireworks on top for the sparkle effect */}
      <Fireworks className="opacity-40" />

      {/* badge */}
      <div className="hero-fade relative z-10 mb-3 inline-flex items-center gap-2 rounded-full border border-[color-mix(in_oklab,var(--brand-turquoise)_35%,transparent)] bg-white/5 px-4 py-1.5 text-xs text-foreground/90 backdrop-blur">
        <span className="text-[var(--brand-yellow)]">★★★★★</span>
        5/5 Google · un seul interlocuteur
      </div>

      {/* avatar + orbit */}
      <HeroAvatar />

      {/* headline under avatar */}
      <div className="hero-fade hero-fade-d1 relative z-10 mt-3 text-center">
        <h1 className="mx-auto max-w-3xl text-balance text-2xl font-bold leading-tight md:text-4xl">
          Pas le temps pour votre site, vos réseaux et votre image ?
          <br />
          <span className="text-gradient">Déléguez-moi toute votre communication en ligne.</span>
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground md:text-base">
          Site · Identité · Réseaux · Google — un seul interlocuteur, de A à Z.
        </p>
      </div>

      {/* scroll hint */}
      <div className="absolute bottom-20 left-1/2 z-10 -translate-x-1/2 animate-bounce text-white/30 text-xs hidden md:block">
        scroll →
      </div>
    </section>
  );
}

/* ── Problem panel ───────────────────────────────────────────── */

function ProblemPanel() {
  const pains = [
    { t: "Vous repoussez toujours « le site » et « les réseaux ».", d: "Pas par manque d'envie, par manque de temps. Chaque mois qui passe, votre image reste en retard sur votre vrai niveau." },
    { t: "Vous perdez des soirées sur des outils que vous détestez.", d: "Canva, WordPress, Instagram… ce n'est pas votre métier. Pendant ce temps, vous ne facturez pas ce qui vous rapporte vraiment." },
    { t: "Trop d'interlocuteurs, zéro cohérence.", d: "Un pour le logo, un autre pour le site, personne pour les réseaux : le résultat ne raconte pas la même histoire." },
    { t: "Sans image en ligne, on vous choisit moins.", d: "Vos clients comparent avant d'appeler. Si votre concurrent paraît plus pro sur Google, c'est lui qu'on contacte." },
  ];
  return (
    <section id="probleme" className="relative flex h-screen w-full items-center overflow-hidden">
      <SectionMascot pose="idee" side="left" />
      <div className="mx-auto max-w-6xl px-8 md:px-16 w-full">
        <div className="grid items-start gap-10 md:grid-cols-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-yellow)]">Soyons honnêtes</span>
            <h2 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">
              Votre métier mérite une image en ligne
              <span className="text-gradient"> à la hauteur.</span>
            </h2>
            <div className="mt-8 overflow-hidden rounded-2xl bg-band-yellow p-5 shadow-card">
              <div className="text-xs font-bold uppercase tracking-[0.18em] opacity-70">Pourquoi déléguer</div>
              <p className="mt-2 text-base font-bold leading-snug">
                Négliger son image en ligne, ce n'est pas « économiser du temps ». C'est laisser des clients partir vers quelqu'un de moins bon, mais qui paraît plus pro.
              </p>
            </div>
            <div className="mt-6">
              <CTAButton href="/reservation-appel" dataEvent="cta_brief_problem">Je veux déléguer</CTAButton>
            </div>
          </div>
          <ul className="space-y-3">
            {pains.map((p) => (
              <li key={p.t} className="flex items-start gap-3 rounded-2xl border border-white/5 bg-card/40 p-4 shadow-card backdrop-blur">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--brand-violet)_30%,transparent)] text-[var(--brand-yellow)] text-xs">✕</span>
                <span>
                  <span className="block text-sm font-semibold text-foreground">{p.t}</span>
                  <span className="mt-1 block text-xs text-muted-foreground">{p.d}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ── Difference panel ────────────────────────────────────────── */

function DifferencePanel() {
  const cols = [
    {
      label: "Vous gérez tout seul",
      tone: "bad" as const,
      items: ["Site, réseaux et visuels repoussés « à plus tard »", "Des heures perdues sur des outils hors de votre métier", "Plusieurs prestataires, aucune ligne directrice", "Une image qui ne reflète pas votre niveau réel"],
    },
    {
      label: "Vous déléguez à PeakCL",
      tone: "good" as const,
      items: ["Un seul interlocuteur pour toute votre communication", "Site, identité, réseaux et Google alignés", "Une image pro qui inspire confiance avant le premier appel", "Vous retrouvez du temps pour votre vrai travail"],
    },
  ];
  return (
    <section id="difference" className="relative flex h-screen w-full items-center overflow-hidden">
      <SectionMascot pose="victoire" side="right" />
      <div className="mx-auto max-w-5xl px-8 md:px-16 w-full">
        <div className="text-center mb-10">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-turquoise)]">La différence</span>
          <h2 className="mt-4 text-3xl font-bold md:text-4xl">Même activité. <span className="text-gradient">Deux façons de gérer sa com'.</span></h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {cols.map((c) => (
            <div key={c.label} className={`rounded-2xl border p-6 shadow-card backdrop-blur ${c.tone === "good" ? "card-glass ring-brand" : "border-white/5 bg-card/30"}`}>
              <div className={`text-sm font-bold uppercase tracking-[0.16em] ${c.tone === "good" ? "text-[var(--brand-turquoise)]" : "text-muted-foreground"}`}>{c.label}</div>
              <ul className="mt-5 space-y-3">
                {c.items.map((x) => (
                  <li key={x} className="flex items-start gap-3 text-sm">
                    {c.tone === "good"
                      ? <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-turquoise)]" />
                      : <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center text-muted-foreground">✕</span>}
                    <span className={c.tone === "good" ? "text-foreground/90" : "text-muted-foreground"}>{x}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <CTAButton href="/reservation-appel" dataEvent="cta_brief_diff">Je veux déléguer</CTAButton>
        </div>
      </div>
    </section>
  );
}

/* ── Method panel ────────────────────────────────────────────── */

function MethodPanel() {
  const steps = [
    { n: "01", title: "Diagnostic", desc: "Tu remplis un formulaire de 8 minutes ou on en parle 20 minutes en visio. Je comprends ton activité, ton public, ton budget, tes contraintes." },
    { n: "02", title: "Cadrage", desc: "Je te renvoie un devis précis sous 48h ouvrées (pas une fourchette élastique) et un planning. Tu valides ou tu ajustes." },
    { n: "03", title: "Production", desc: "Je code, je dessine, je rédige. Tu vois le travail au fur et à mesure, pas seulement à la fin. Une révision incluse à chaque livrable." },
    { n: "04", title: "Suivi", desc: "Une fois en ligne, je reste disponible pour les ajustements de la première semaine. Au-delà, on continue ou on s'arrête, tu décides." },
  ];
  return (
    <section id="methode" className="relative flex h-screen w-full items-center overflow-hidden">
      <SectionMascot pose="bureau" side="right" heightClass="h-[42vh]" />
      <div className="mx-auto max-w-6xl px-8 md:px-16 w-full">
        <div className="text-center mb-10">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-yellow)]">Comment je travaille</span>
          <h2 className="mt-4 text-3xl font-bold md:text-4xl">Quatre étapes, du diagnostic à la mise en ligne</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div key={s.n} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.07 }} className="rounded-2xl border border-white/5 bg-card/50 p-5 shadow-card">
              <div className="text-xs font-semibold tracking-[0.2em] text-[var(--brand-turquoise)]">{s.n}</div>
              <h3 className="mt-4 text-base font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <CTAButton href="/reservation-appel" dataEvent="cta_brief_method">Faire le diagnostic</CTAButton>
        </div>
      </div>
    </section>
  );
}

/* ── Offers panel ────────────────────────────────────────────── */

const offers = [
  { eyebrow: "À pousser en priorité", title: "Pack présence en ligne", price: "Sur devis", highlight: true, points: ["Site + logo + pages réseaux sociaux", "Premières publications selon besoin", "Intégration réseau social sur le site", "Mise en ligne + bases SEO + parcours de contact"] },
  { eyebrow: "Site vitrine codé", title: "Site vitrine codé", price: "Sur devis", points: ["Pages essentielles (Accueil, services, contact)", "Mobile, rapide, propre", "Mise en ligne complète (domaine, SSL, indexation)", "Bases SEO (structure, titres)"] },
  { eyebrow: "Sur-mesure / custom", title: "Site sur-mesure / custom", price: "Sur devis", points: ["UX/UI plus poussé, sections spécifiques", "Intégrations et fonctionnalités adaptées", "Optimisations performance et conversion"] },
  { eyebrow: "Identité visuelle", title: "Identité visuelle / logo", price: "Sur devis", points: ["Logo propre et déclinable (web + réseaux)", "Couleurs & typos cohérentes", "Mini kit de départ pour une image homogène"] },
];

function OffersPanel() {
  return (
    <section id="offres" className="relative flex h-screen w-full items-center overflow-hidden">
      <SectionMascot pose="arc" side="left" heightClass="h-[40vh]" />
      <div className="mx-auto max-w-7xl px-8 md:px-16 w-full">
        <div className="text-center mb-8">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-yellow)]">Les formes que prend l'accompagnement</span>
          <h2 className="mt-4 text-3xl font-bold md:text-4xl">Quatre formules selon votre besoin</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {offers.map((o) => (
            <div key={o.title} className={`relative overflow-hidden rounded-2xl border bg-card/50 p-5 shadow-card backdrop-blur ${o.highlight ? "border-[color-mix(in_oklab,var(--brand-turquoise)_30%,transparent)] ring-1 ring-[color-mix(in_oklab,var(--brand-turquoise)_22%,transparent)]" : "border-white/5"}`}>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-yellow)]/80">{o.eyebrow}</div>
              <h3 className="mt-2 text-base font-semibold">{o.title}</h3>
              <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
                {o.points.map((x) => (
                  <li key={x} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--brand-turquoise)]" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center flex justify-center gap-3">
          <CTAButton href="/reservation-appel" dataEvent="cta_brief_offers">Faire le diagnostic</CTAButton>
          <CTAButton href="/packs" variant="ghost" dataEvent="cta_packs_detail">Voir les packs</CTAButton>
        </div>
      </div>
    </section>
  );
}

/* ── Portfolio panel ─────────────────────────────────────────── */

function PortfolioPanel() {
  const featured = peakclPortfolio.slice(0, 6);
  return (
    <section id="portfolio" className="relative flex h-screen w-full items-center overflow-hidden">
      <SectionMascot pose="tablette" side="right" heightClass="h-[40vh]" />
      <div className="mx-auto max-w-7xl px-8 md:px-16 w-full">
        <div className="text-center mb-8">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-turquoise)]">Réalisations</span>
          <h2 className="mt-4 text-3xl font-bold md:text-4xl">Des projets livrés, <span className="text-gradient">qui convertissent</span>.</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">Vous êtes dans quel métier ? Voyez ce que j'ai livré dans votre secteur.</p>
        </div>
        {/* hub catégories (version courte → filtre le portfolio) */}
        <div className="mb-7 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((c) => (
            <a
              key={c.slug}
              href={`/portfolio?cat=${c.slug}`}
              data-event="home_cat_filter"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-card/40 px-3.5 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-white/25 hover:text-foreground"
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: c.accent }} />
              {c.short}
            </a>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <motion.a key={p.siteUrl} href={p.siteUrl} target="_blank" rel="noreferrer" data-event="portfolio_click"
              initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-card/50 p-5 shadow-card transition-all hover:-translate-y-1 hover:border-white/15">
              <div className="flex items-start gap-3">
                {p.logoUrl
                  ? <img src={optimizedLogoUrl(p.logoUrl)} alt={p.title} width={40} height={40} className="h-10 w-10 rounded-xl bg-white/5 object-contain p-1.5" loading="lazy" decoding="async" />
                  : <div className="h-10 w-10 rounded-xl bg-white/5" />}
                <div>
                  <div className="text-sm font-semibold">{p.title}</div>
                  {p.subtitle && <div className="mt-0.5 text-xs text-muted-foreground">{p.subtitle}</div>}
                </div>
              </div>
              {p.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.tags.slice(0, 3).map((t) => (
                    <span key={`${p.siteUrl}-${t}`} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-muted-foreground">{t}</span>
                  ))}
                </div>
              )}
              <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--brand-turquoise)]">
                Voir le projet <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </motion.a>
          ))}
        </div>
        <div className="mt-6 text-center">
          <CTAButton href="/portfolio" variant="ghost">Voir tout le portfolio</CTAButton>
        </div>
      </div>
    </section>
  );
}

/* ── Reviews panel ───────────────────────────────────────────── */

function ReviewsPanel() {
  return (
    <section id="avis" className="relative flex h-screen w-full items-center overflow-hidden">
      <SectionMascot pose="graphique" side="left" heightClass="h-[40vh]" />
      <div className="mx-auto max-w-7xl px-8 md:px-16 w-full">
        <div className="text-center mb-8">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-turquoise)]">Ils en parlent mieux que moi</span>
          <h2 className="mt-4 text-3xl font-bold md:text-4xl">Des résultats, pas des promesses.</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {peakclTestimonials.map((t, i) => (
            <motion.div key={t.name} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-white/5 bg-card/50 p-5 shadow-card">
              <div className="flex gap-1 text-[var(--brand-yellow)]">
                {Array.from({ length: t.rating }).map((_, k) => <Star key={k} className="h-3.5 w-3.5 fill-current" />)}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-foreground/90">"{t.quote}"</p>
              <div className="mt-4 border-t border-white/5 pt-3">
                <div className="text-sm font-semibold">{t.name}</div>
                <div className="text-xs text-muted-foreground">{[t.sourceLabel, t.dateLabel].filter(Boolean).join(" · ")}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── FAQ panel ───────────────────────────────────────────────── */

function FAQPanel() {
  return (
    <section id="faq" className="relative flex h-screen w-full items-center overflow-hidden">
      <SectionMascot pose="assise" side="right" />
      <div className="mx-auto max-w-3xl px-8 md:px-16 w-full">
        <div className="text-center mb-8">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-turquoise)]">Questions fréquentes</span>
          <h2 className="mt-4 text-3xl font-bold md:text-4xl">On lève les derniers doutes.</h2>
        </div>
        <div className="space-y-2 max-h-[55vh] overflow-y-auto pr-1">
          {peakclFaq.map((f) => (
            <details key={f.question} className="group rounded-2xl border border-white/5 bg-card/50 p-4 shadow-card open:bg-card/70">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-sm font-semibold">
                {f.question}
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/10 text-[var(--brand-turquoise)] transition-transform group-open:rotate-45 text-base">+</span>
              </summary>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground" dangerouslySetInnerHTML={{ __html: f.answerHtml }} />
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Contact panel ───────────────────────────────────────────── */

function ContactPanel() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    const form = e.currentTarget;
    setIsSubmitting(true);
    try {
      await submitNetlifyForm(form);
      window.location.href = "/merci";
    } catch {
      alert("L'envoi a échoué. Écrivez-moi directement à peakcl73@gmail.com.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative flex h-screen w-full items-center overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-hero" />
      <div className="bg-aurora" aria-hidden />
      <div className="grid-bg absolute inset-0 -z-10" />
      <SectionMascot pose="reseaux" side="right" heightClass="h-[42vh]" />
      <div className="mx-auto max-w-4xl px-8 md:px-16 w-full text-center">
        <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-[color-mix(in_oklab,var(--brand-yellow)_35%,transparent)] bg-white/5 px-4 py-1.5 text-xs font-semibold text-[var(--brand-yellow)]">
          <Sparkles className="h-3.5 w-3.5" />
          Audit gratuit : votre site web + vos réseaux sociaux
        </div>
        <h2 className="text-balance text-3xl font-bold leading-tight md:text-4xl">Prêt à arrêter de tout faire vous-même ?</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
          Décrivez votre activité en 8 minutes : je vous dis ce qu'il faut pour une image cohérente et comment je peux m'en charger.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <CTAButton href="/reservation-appel" dataEvent="cta_brief_final">Faire le diagnostic</CTAButton>
          <CTAButton href={CALENDLY_URL} dataEvent="cta_calendly_final" variant="ghost">Réserver un appel</CTAButton>
        </div>
        <form
          className="mx-auto mt-7 max-w-xl space-y-3 rounded-2xl border border-white/10 bg-card/40 p-5 text-left shadow-card backdrop-blur"
          name="contact" method="POST" action="/merci" data-netlify="true" data-netlify-honeypot="bot-field" data-event="audit_submit" onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value="contact" />
          <input type="hidden" name="leadType" value="contact" />
          <input type="hidden" name="source" value="site_peakcl" />
          <p className="hidden"><label>Ne pas remplir: <input name="bot-field" /></label></p>
          <div className="grid gap-3 md:grid-cols-2">
            <label className="block">
              <span className="text-xs font-semibold text-muted-foreground">Nom</span>
              <input name="name" required className="mt-1.5 w-full rounded-md border border-white/10 bg-background/50 px-3 py-2.5 text-sm text-foreground outline-none focus:border-white/20" placeholder="Votre nom" />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-muted-foreground">Email</span>
              <input name="email" type="email" required className="mt-1.5 w-full rounded-md border border-white/10 bg-background/50 px-3 py-2.5 text-sm text-foreground outline-none focus:border-white/20" placeholder="vous@exemple.com" />
            </label>
          </div>
          <label className="block">
            <span className="text-xs font-semibold text-muted-foreground">Message</span>
            <textarea name="message" required rows={4} className="mt-1.5 w-full rounded-md border border-white/10 bg-background/50 px-3 py-2.5 text-sm text-foreground outline-none focus:border-white/20" placeholder="Votre activité, votre ville, votre objectif..." />
          </label>
          <div className="flex items-center justify-center gap-3">
            <button type="submit" disabled={isSubmitting} data-event="audit_submit_click" className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary-gradient px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition-all hover:scale-[1.03] disabled:opacity-60">
              {isSubmitting ? "Envoi…" : "Recevoir mon plan"}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
          <ContactInline className="justify-center" />
        </form>
      </div>
    </section>
  );
}

/* ── Mobile vertical layout ──────────────────────────────────── */

function MobileLayout() {
  return (
    <div className="md:hidden">
      <HeroPanel />
      <ProblemPanel />
      <DifferencePanel />
      <MethodPanel />
      <OffersPanel />
      <PortfolioPanel />
      <ReviewsPanel />
      <FAQPanel />
      <ContactPanel />
    </div>
  );
}

/* ── Mobile sticky contact ───────────────────────────────────── */

function MobileStickyContact() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-background/90 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl md:hidden">
      <div className="mx-auto flex max-w-lg gap-2 px-4">
        <a href={PHONE_TEL} data-event="cta_phone_sticky" className="flex flex-1 items-center justify-center gap-2 rounded-full border border-border bg-card/60 py-3 text-sm font-semibold text-foreground backdrop-blur hover:bg-card/80">
          <Phone className="h-4 w-4 text-[var(--brand-turquoise)]" aria-hidden />
          Appeler
        </a>
        <a href="#contact" data-event="cta_contact_sticky" className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary-gradient py-3 text-sm font-semibold text-primary-foreground shadow-glow">
          Message
        </a>
      </div>
    </div>
  );
}

/* ── Footer (mobile only) ────────────────────────────────────── */

function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 md:hidden">
      <img src="/peakcl/avatar-sieste.webp" alt="" aria-hidden loading="lazy" className="mx-auto mb-5 h-28 w-auto select-none opacity-95" />
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <img src={LOGO_NAV} alt="PeakCL" width={24} height={24} loading="lazy" decoding="async" className="h-6 w-6 rounded-md object-cover" />
          <span>© {new Date().getFullYear()} PeakCL · Charlotte Lacroix</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">LinkedIn</a>
          <a href={MALT_URL} target="_blank" rel="noopener noreferrer nofollow sponsored" className="hover:text-foreground">Malt</a>
          <a href={FIVERR_URL} target="_blank" rel="noopener noreferrer nofollow sponsored" className="hover:text-foreground">Fiverr</a>
          <a href={COMEUP_URL} target="_blank" rel="noopener noreferrer nofollow sponsored" className="hover:text-foreground">ComeUp</a>
          <a href="/portfolio" className="hover:text-foreground">Portfolio</a>
          <a href="/conseils" className="hover:text-foreground">Conseils</a>
        </div>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs">
          <a href="/agence-web-albertville" className="hover:text-foreground">Albertville</a>
          <a href="/agence-web-chambery" className="hover:text-foreground">Chambéry</a>
          <a href="/agence-web-annecy" className="hover:text-foreground">Annecy</a>
          <a href="/agence-web-aix-les-bains" className="hover:text-foreground">Aix-les-Bains</a>
        </div>
      </div>
    </footer>
  );
}

/* ── Root ────────────────────────────────────────────────────── */

const PANELS: React.FC[] = [
  HeroPanel, ProblemPanel, DifferencePanel, MethodPanel,
  OffersPanel, PortfolioPanel, ReviewsPanel, FAQPanel, ContactPanel, DeckFooter,
];

function Landing() {
  const [activeIdx, setActiveIdx] = useState(0);
  const deckRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);

  const navigateTo = useCallback((i: number) => {
    const clamped = Math.max(0, Math.min(SECTIONS.length - 1, i));
    setActiveIdx(clamped);
    const deck = deckRef.current;
    if (!deck) return;
    const panel = deck.children[clamped] as HTMLElement;
    if (panel) panel.scrollIntoView({ behavior: "smooth", inline: "start" });
  }, []);

  useEffect(() => {
    const deck = deckRef.current;
    if (!deck) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling.current) return;
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(delta) < 3) return;
      isScrolling.current = true;
      setActiveIdx((prev) => {
        const next = delta > 0 ? Math.min(SECTIONS.length - 1, prev + 1) : Math.max(0, prev - 1);
        const panel = deck.children[next] as HTMLElement;
        if (panel) panel.scrollIntoView({ behavior: "smooth", inline: "start" });
        return next;
      });
      setTimeout(() => { isScrolling.current = false; }, 750);
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); navigateTo(activeIdx + 1); }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); navigateTo(activeIdx - 1); }
    };

    deck.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    return () => {
      deck.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
    };
  }, [activeIdx, navigateTo]);

  return (
    <div className="relative bg-background text-foreground">
      {/* Desktop: horizontal scrolling deck */}
      <div
        ref={deckRef}
        className="hidden md:flex h-screen w-full flex-row overflow-x-hidden"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {PANELS.map((Panel, i) => (
          <div
            key={SECTIONS[i].id}
            className="h-screen w-screen shrink-0 pl-16 pb-16"
            style={{ scrollSnapAlign: "start" }}
          >
            <Panel />
          </div>
        ))}
      </div>

      {/* Desktop overlays — nav inter-pages = SiteNav globale ; sections via la timeline */}
      <TimelineBar activeIdx={activeIdx} total={SECTIONS.length} onNavigate={navigateTo} />

      {/* Mobile: normal vertical scroll */}
      <MobileNav />
      <MobileLayout />
      <TrustedBySection />
      <MobileStickyContact />
      <Footer />
    </div>
  );
}
