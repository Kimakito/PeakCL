import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowRight,
  Check,
  Globe,
  Palette,
  Sparkles,
  Image as ImageIcon,
  Megaphone,
  Rocket,
  Star,
  Zap,
  Clock,
  Target,
  ShieldCheck,
  Phone,
} from "lucide-react";
const LOGO_NAV = "/peakcl/logo-nav.webp";
import { peakclTestimonials } from "@/content/peakcl/testimonials";
import { peakclFaq } from "@/content/peakcl/faq";
import { peakclPortfolio } from "@/content/peakcl/portfolio";
import { TrustedBySection } from "@/components/TrustedBySection";
import { optimizedLogoUrl } from "@/lib/optimizedLogo";
import { absUrl } from "@/seo/site";
import { faqPageJsonLd } from "@/seo/jsonld";
import { loadExternalScript } from "@/lib/loadExternalScript";
import { submitNetlifyForm } from "@/lib/funnel";

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
    ],
  }),
  component: Landing,
});

const CALENDLY_URL = "https://calendly.com/peakcl73/45min";
const WHATSAPP_URL = "https://wa.me/33743517627";
/** Même numéro que WhatsApp — lien tel: pour appels depuis mobile / fiche Google */
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

function CTAButton({
  children,
  href = "#contact",
  variant = "primary",
  className = "",
  dataEvent,
}: {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "ghost";
  className?: string;
  dataEvent?: string;
}) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300";
  const styles =
    variant === "primary"
      ? "bg-primary-gradient text-primary-foreground shadow-glow hover:scale-[1.03] hover:shadow-[0_25px_70px_-20px_color-mix(in_oklab,var(--brand-violet)_70%,transparent)]"
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
      <a
        href={PHONE_TEL}
        data-event="cta_phone"
        className="inline-flex items-center gap-1 font-semibold text-[var(--brand-turquoise)] hover:text-foreground"
      >
        <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden />
        {PHONE_DISPLAY}
      </a>
      <span>·</span>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        data-event="cta_whatsapp"
        className="font-semibold text-[var(--brand-turquoise)] hover:text-foreground"
      >
        WhatsApp
      </a>
      <span>·</span>
      <a
        href={`mailto:${EMAIL}`}
        data-event="cta_email"
        className="font-semibold text-[var(--brand-turquoise)] hover:text-foreground"
      >
        {EMAIL}
      </a>
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-3">
          <img
            src={LOGO_NAV}
            alt="PeakCL logo"
            width={36}
            height={36}
            fetchPriority="high"
            decoding="async"
            className="h-9 w-9 rounded-lg object-cover"
          />
          <span className="font-display text-lg font-bold tracking-tight">
            Peak<span className="text-gradient">CL</span>
          </span>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#method" className="hover:text-foreground">Méthode</a>
          <a href="/packs" className="hover:text-foreground">Offres</a>
          <a href="/portfolio" className="hover:text-foreground">Portfolio</a>
          <a href="#resultats" className="hover:text-foreground">Avis</a>
          <a href="#faq" className="hover:text-foreground">FAQ</a>
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="/brief"
            data-event="cta_brief_header"
            className="hidden rounded-full border border-white/10 bg-card/40 px-4 py-2 text-xs font-semibold text-foreground backdrop-blur hover:border-white/20 md:inline-flex"
          >
            Remplir le brief
          </a>
          <CTAButton href={CALENDLY_URL} dataEvent="cta_calendly_header" className="!px-5 !py-2 text-xs">
            Réserver un appel
          </CTAButton>
        </div>
      </div>
    </header>
  );
}

function GeoLinks() {
  const items = [
    { name: "Albertville", href: "/agence-web-albertville" },
    { name: "Gilly‑sur‑Isère", href: "/agence-web-gilly-sur-isere" },
    { name: "Chambéry", href: "/agence-web-chambery" },
    { name: "Annecy", href: "/agence-web-annecy" },
    { name: "Aix-les-Bains", href: "/agence-web-aix-les-bains" },
  ];

  return (
    <section className="border-t border-white/5 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-turquoise)]">
            Basée en Savoie, disponible partout
          </span>
          <h2 className="mt-4 text-3xl font-bold md:text-4xl">
            Projets partout en France, en visio.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Je travaille à distance (domicile) et j’accompagne des clients dans toute la France. Les pages ci‑dessous
            existent surtout pour le SEO local.
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            Déplacements: uniquement si nécessaire autour d’Albertville / Annecy / Chambéry (et je préfère éviter).
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {items.map((i) => (
            <a
              key={i.href}
              href={i.href}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-muted-foreground hover:border-white/20 hover:text-foreground"
            >
              {i.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Hero() {
  const chips = [
    { label: "Site & pages de vente", color: "var(--brand-turquoise)" },
    { label: "Identité & visuels", color: "var(--brand-yellow)" },
    { label: "Réseaux & contenus", color: "var(--brand-violet)" },
  ];
  return (
    <section id="top" className="relative overflow-hidden bg-hero pt-20 pb-28 md:pt-28 md:pb-36">
      <div className="bg-aurora" aria-hidden />
      <div className="grid-bg absolute inset-0 -z-10" />
      <div className="mx-auto max-w-7xl px-6 text-center">
        <div className="hero-fade mx-auto inline-flex items-center gap-2 rounded-full border border-[color-mix(in_oklab,var(--brand-turquoise)_35%,transparent)] bg-white/5 px-4 py-1.5 text-xs text-foreground/90 backdrop-blur">
          <span className="text-[var(--brand-yellow)]">★★★★★</span>
          5/5 Google · communication globale · un seul interlocuteur
        </div>

        {/* H1 sans animation : visible immédiatement pour le LCP Lighthouse */}
        <h1 className="mx-auto mt-6 max-w-4xl text-balance text-5xl font-bold leading-[1.04] md:text-7xl">
          Pas le temps pour votre site, vos réseaux et votre image ?
          <br />
          <span className="text-gradient">Déléguez-moi toute votre communication en ligne.</span>
        </h1>

        <p className="hero-fade hero-fade-d1 mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Aujourd’hui, on vous juge en ligne avant de vous appeler. Je construis votre{" "}
          <span className="text-foreground">image complète</span> : site, identité, réseaux, Google, pour que vous
          paraissiez aussi pro que vous l’êtes vraiment. Vous validez, je m’occupe du reste.
        </p>

        <div className="hero-fade hero-fade-d2 mt-7 flex flex-wrap items-center justify-center gap-2.5">
          {chips.map((c) => (
            <span
              key={c.label}
              className="inline-flex items-center gap-2 rounded-full border bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-foreground/90 backdrop-blur"
              style={{ borderColor: `color-mix(in oklab, ${c.color} 45%, transparent)` }}
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: c.color }} />
              {c.label}
            </span>
          ))}
        </div>

        <div className="hero-fade hero-fade-d3 mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <CTAButton href="/brief" dataEvent="cta_brief_hero">
            Déléguer ma communication (8 min)
          </CTAButton>
          <CTAButton href={CALENDLY_URL} dataEvent="cta_calendly_hero" variant="ghost">
            Réserver un appel
          </CTAButton>
        </div>
        <div className="hero-fade hero-fade-d3 mt-4">
          <ContactInline />
        </div>

        <div className="hero-fade hero-fade-d4 mx-auto mt-14 grid max-w-3xl grid-cols-3 gap-6 border-t border-white/10 pt-8 text-center">
          {[
            { k: "+20", v: "projets livrés" },
            { k: "14j", v: "délai moyen" },
          ].map((s) => (
            <div key={s.v}>
              <div className="font-display text-2xl font-bold text-foreground md:text-3xl">{s.k}</div>
              <div className="mt-1 text-xs text-muted-foreground md:text-sm">{s.v}</div>
            </div>
          ))}
          <a
            href="https://www.google.com/search?q=PeakCL&hl=fr"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <div className="font-display text-2xl font-bold text-foreground transition-colors group-hover:text-brand-turquoise md:text-3xl">5/5</div>
            <div className="mt-1 text-xs text-muted-foreground transition-colors group-hover:text-brand-turquoise md:text-sm">notes Google</div>
          </a>
        </div>
      </div>
    </section>
  );
}

// (VideoIntro removed from home — kept available via /qui-suis-je if needed)

function Problem() {
  const pains = [
    {
      t: "Vous repoussez toujours « le site » et « les réseaux ».",
      d: "Pas par manque d’envie, par manque de temps. Et chaque mois qui passe, votre image en ligne reste en retard sur votre vrai niveau.",
    },
    {
      t: "Vous perdez des soirées sur des outils que vous détestez.",
      d: "Canva, WordPress, Instagram… ce n’est pas votre métier. Pendant ce temps, vous ne facturez pas ce qui vous rapporte vraiment.",
    },
    {
      t: "Trop d’interlocuteurs, zéro cohérence.",
      d: "Un pour le logo, un autre pour le site, personne pour les réseaux : le résultat ne raconte pas la même histoire. Et ça se voit.",
    },
    {
      t: "Sans image en ligne, on vous choisit moins.",
      d: "Vos clients comparent avant d’appeler. Si votre concurrent paraît plus pro sur Google et les réseaux, c’est lui qu’on contacte, même si vous êtes meilleur.",
    },
  ];
  return (
    <section className="border-t border-white/5 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-start gap-12 md:grid-cols-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-yellow)]">
              Soyons honnêtes
            </span>
            <h2 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
              Votre métier mérite une image en ligne
              <br />
              <span className="text-gradient">à la hauteur... sans que vous y passiez vos week-ends.</span>
            </h2>
            <p className="mt-6 max-w-md text-muted-foreground">
              La plupart de mes clients ne veulent pas devenir community managers ni intégrateurs web. Ils veulent une communication claire, cohérente, qui travaille pour eux, et quelqu’un à qui déléguer tout ça.
            </p>

            <div className="mt-8 overflow-hidden rounded-2xl bg-band-yellow p-6 shadow-card">
              <div className="text-xs font-bold uppercase tracking-[0.18em] opacity-70">Pourquoi déléguer</div>
              <p className="mt-2 text-lg font-bold leading-snug">
                Négliger son image en ligne, ce n’est pas “économiser du temps”.
                C’est laisser des clients partir vers quelqu’un de moins bon, mais qui paraît plus pro sur Google et les réseaux.
              </p>
            </div>
          </div>

          <ul className="space-y-4">
            {pains.map((p) => (
              <li
                key={p.t}
                className="flex items-start gap-4 rounded-2xl border border-white/5 bg-card/40 p-5 shadow-card backdrop-blur transition-colors hover:border-[color-mix(in_oklab,var(--brand-turquoise)_35%,transparent)]"
              >
                <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--brand-violet)_30%,transparent)] text-[var(--brand-yellow)]">
                  ✕
                </span>
                <span>
                  <span className="block text-sm font-semibold text-foreground">{p.t}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{p.d}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Bridge() {
  const cols = [
    {
      label: "Vous gérez tout seul",
      tone: "bad" as const,
      items: [
        "Site, réseaux et visuels repoussés « à plus tard »",
        "Des heures perdues sur des outils hors de votre métier",
        "Plusieurs prestataires, aucune ligne directrice commune",
        "Une image en ligne qui ne reflète pas votre niveau réel",
      ],
    },
    {
      label: "Vous déléguez à PeakCL",
      tone: "good" as const,
      items: [
        "Un seul interlocuteur pour toute votre communication",
        "Site, identité, réseaux et Google alignés sur le même message",
        "Une image pro qui inspire confiance avant le premier appel",
        "Vous retrouvez du temps pour votre vrai travail",
      ],
    },
  ];
  return (
    <section className="border-t border-white/5 py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-turquoise)]">
            La différence
          </span>
          <h2 className="mt-4 text-4xl font-bold md:text-5xl">
            Même activité. <span className="text-gradient">Deux façons de gérer sa com’.</span>
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {cols.map((c) => (
            <div
              key={c.label}
              className={`rounded-2xl border p-7 shadow-card backdrop-blur ${
                c.tone === "good"
                  ? "card-glass ring-brand"
                  : "border-white/5 bg-card/30"
              }`}
            >
              <div
                className={`text-sm font-bold uppercase tracking-[0.16em] ${
                  c.tone === "good" ? "text-[var(--brand-turquoise)]" : "text-muted-foreground"
                }`}
              >
                {c.label}
              </div>
              <ul className="mt-5 space-y-3">
                {c.items.map((x) => (
                  <li key={x} className="flex items-start gap-3 text-sm">
                    {c.tone === "good" ? (
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-turquoise)]" />
                    ) : (
                      <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center text-muted-foreground">✕</span>
                    )}
                    <span className={c.tone === "good" ? "text-foreground/90" : "text-muted-foreground"}>{x}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <CTAButton href="/brief" dataEvent="cta_brief_bridge">
            Je veux déléguer
          </CTAButton>
        </div>
      </div>
    </section>
  );
}

function Method() {
  const steps = [
    {
      n: "01",
      title: "Diagnostic",
      desc:
        "Tu remplis un formulaire de 8 minutes ou on en parle 20 minutes en visio. Je comprends ton activité, ton public, ton budget, tes contraintes.",
    },
    {
      n: "02",
      title: "Cadrage",
      desc:
        "Je te renvoie un devis précis sous 48h ouvrées (pas une fourchette élastique) et un planning. Tu valides ou tu ajustes.",
    },
    {
      n: "03",
      title: "Production",
      desc:
        "Je code, je dessine, je rédige. Tu vois le travail au fur et à mesure, pas seulement à la fin. Une révision est incluse à chaque livrable.",
    },
    {
      n: "04",
      title: "Suivi",
      desc:
        "Une fois en ligne, je reste disponible pour les ajustements de la première semaine. Au-delà, on peut continuer ou s’arrêter, tu décides.",
    },
  ];

  return (
    <section id="method" className="border-t border-white/5 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-yellow)]">
            Comment je travaille
          </span>
          <h2 className="mt-4 text-4xl font-bold md:text-5xl">Quatre étapes, du diagnostic à la mise en ligne</h2>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-white/5 bg-card/50 p-6 shadow-card"
            >
              <div className="text-xs font-semibold tracking-[0.2em] text-[var(--brand-turquoise)]">{s.n}</div>
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <CTAButton href="/brief" dataEvent="cta_brief_method">
            Faire le diagnostic
          </CTAButton>
        </div>
      </div>
    </section>
  );
}

const services = [
  {
    icon: Globe,
    title: "Site web (création / refonte)",
    desc: "Un site clair, rapide et structuré, pensé pour être compris en 5 secondes et générer des prises de contact.",
  },
  {
    icon: Palette,
    title: "Création de logo & identité",
    desc: "Une identité simple, propre et cohérente, utilisable partout (site, réseaux, Google).",
  },
  {
    icon: ImageIcon,
    title: "Kit visuels & contenus",
    desc: "Des visuels et textes de démarrage pour présenter votre activité (posts, bannières, sections clés).",
  },
  {
    icon: Megaphone,
    title: "Réseaux sociaux (pages pro)",
    desc: "Création / optimisation de vos profils + intégration du réseau social préféré sur le site.",
  },
  {
    icon: Rocket,
    title: "Google Business Profile",
    desc: "Création et optimisation de votre fiche Google pour être trouvé localement et inspirer confiance.",
  },
  {
    icon: Sparkles,
    title: "Mise en ligne & bases SEO",
    desc: "Domaine, sécurité, indexation, structure SEO de base… pour un site propre, publiable et durable.",
  },
];

function Services() {
  return (
    <section id="services" className="border-t border-white/5 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-turquoise)]">
            Ce que je crée pour vous
          </span>
          <h2 className="mt-4 text-4xl font-bold md:text-5xl">
            Une présence en ligne <span className="text-gradient">cohérente</span> et prête à servir votre activité.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Pas juste “un site”. Un ensemble complet (site + identité + réseaux + Google) pour être trouvé,
            rassurer et donner envie de vous contacter.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              transition={{ delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-card/50 p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-white/15"
            >
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[color-mix(in_oklab,var(--brand-violet)_30%,transparent)] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[color-mix(in_oklab,var(--brand-violet)_25%,transparent)] text-[var(--brand-turquoise)]">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const offers = [
  {
    eyebrow: "À pousser en priorité",
    title: "Pack présence en ligne (combo)",
    price: "Sur devis",
    highlight: true,
    points: [
      "Site + logo + pages réseaux sociaux",
      "Premières publications pour présenter l’activité (selon besoin)",
      "Intégration de votre réseau social préféré sur le site",
      "Mise en ligne + bases SEO + parcours de contact simple",
    ],
  },
  {
    eyebrow: "Site vitrine codé",
    title: "Site vitrine codé",
    price: "Sur devis",
    points: [
      "Pages essentielles (Accueil, services, à propos, contact)",
      "Mobile, rapide, propre",
      "Mise en ligne complète (domaine, SSL, indexation)",
      "Bases SEO (structure, titres)",
    ],
  },
  {
    eyebrow: "Sur‑mesure / custom",
    title: "Site sur‑mesure / custom",
    price: "Sur devis",
    points: [
      "UX/UI plus poussé, pages spécifiques, sections sur‑mesure",
      "Intégrations et fonctionnalités adaptées à votre activité",
      "Optimisations performance, structure, conversion",
    ],
  },
  {
    eyebrow: "Identité visuelle",
    title: "Identité visuelle / logo",
    price: "Sur devis",
    points: [
      "Logo propre et déclinable (web + réseaux)",
      "Couleurs & typos cohérentes",
      "Mini kit de départ pour garder une image homogène",
    ],
  },
];

function Packs() {
  return (
    <section id="packs" className="border-t border-white/5 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-yellow)]">
            Les 4 formes que prend l’accompagnement
          </span>
          <h2 className="mt-4 text-4xl font-bold md:text-5xl">
            Quatre formes selon votre besoin
          </h2>
          <p className="mt-4 text-muted-foreground">
            L’accompagnement reste le même. Ce qui change, c’est ce qu’on produit ensemble.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {offers.map((o, i) => (
            <motion.div
              key={o.title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              transition={{ delay: i * 0.05 }}
              className={`relative overflow-hidden rounded-2xl border bg-card/50 p-7 shadow-card backdrop-blur ${
                o.highlight
                  ? "border-[color-mix(in_oklab,var(--brand-turquoise)_30%,transparent)] ring-1 ring-[color-mix(in_oklab,var(--brand-turquoise)_22%,transparent)]"
                  : "border-white/5"
              }`}
            >
              <div
                className={`absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-70 blur-2xl ${
                  o.highlight
                    ? "bg-[color-mix(in_oklab,var(--brand-turquoise)_28%,transparent)]"
                    : "bg-[color-mix(in_oklab,var(--brand-yellow)_22%,transparent)]"
                }`}
              />
              <div className="relative">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-yellow)]/80">
                  {o.eyebrow}
                </div>
                <div className="mt-3 flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="text-xl font-semibold">{o.title}</h3>
                  <div className={`text-sm font-semibold ${o.highlight ? "text-[var(--brand-turquoise)]" : "text-muted-foreground"}`}>
                    {o.price}
                  </div>
                </div>
                <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                  {o.points.map((x) => (
                    <li key={x} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-4 w-4 text-[var(--brand-turquoise)]" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-white/5 bg-card/40 p-7 text-center shadow-card backdrop-blur">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-turquoise)]">
            Option mensuelle
          </div>
          <h3 className="mt-3 text-2xl font-semibold">Rester visible sans y penser</h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
            Si vous voulez déléguer sur la durée : publications réseaux sociaux, mises à jour du site, contenus, et suivi léger.
          </p>
          <div className="mt-6">
            <CTAButton href={CALENDLY_URL} dataEvent="cta_calendly_packs">
              Discutons de ce qui vous soulagerait
            </CTAButton>
          </div>
        </div>

        <div className="mt-10 text-center">
          <CTAButton href="/packs" dataEvent="cta_packs_detail" variant="ghost">
            Voir les packs en détail
          </CTAButton>
        </div>
      </div>
    </section>
  );
}

function ForWho() {
  return (
    <section id="for-who" className="border-t border-white/5 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-turquoise)]">
            Pour qui
          </span>
          <h2 className="mt-4 text-4xl font-bold md:text-5xl">À qui ça s’adresse</h2>
        </div>

        <div className="mx-auto mt-10 max-w-3xl space-y-4 text-sm text-muted-foreground">
          <p>
            Mon accompagnement est pensé pour les indépendants, artisans, créateurs et petites structures. Concrètement : vous portez votre activité seul·e
            ou à quelques‑uns, vous voulez une présence en ligne propre sans embaucher une agence, et vous n’avez pas le temps de gérer plusieurs prestataires.
          </p>
          <p>
            Je n’accompagne pas les grandes équipes marketing, les agences qui veulent sous‑traiter, ni les projets sans budget défini.
          </p>
        </div>
      </div>
    </section>
  );
}

function PortfolioTeaser() {
  const featured = peakclPortfolio.slice(0, 6);
  return (
    <section className="border-t border-white/5 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-turquoise)]">
            Réalisations
          </span>
          <h2 className="mt-4 text-4xl font-bold md:text-5xl">
            Des projets livrés, <span className="text-gradient">qui convertissent</span>.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Quelques exemples de sites créés pour des entrepreneurs, artisans et entreprises locales.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <motion.a
              key={p.siteUrl}
              href={p.siteUrl}
              target="_blank"
              rel="noreferrer"
              data-event="portfolio_click"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ delay: i * 0.06 }}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-card/50 p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-white/15"
            >
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[color-mix(in_oklab,var(--brand-violet)_30%,transparent)] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative">
                <div className="flex items-start gap-4">
                  {p.logoUrl ? (
                    <img
                      src={optimizedLogoUrl(p.logoUrl)}
                      alt={p.title}
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-xl bg-white/5 object-contain p-2"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-xl bg-white/5" />
                  )}
                  <div className="min-w-0">
                    <div className="text-base font-semibold">{p.title}</div>
                    {p.subtitle ? (
                      <div className="mt-1 text-xs text-muted-foreground">{p.subtitle}</div>
                    ) : null}
                  </div>
                </div>

                {p.tags.length ? (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.tags.slice(0, 3).map((t) => (
                      <span
                        key={`${p.siteUrl}-${t}`}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}

                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-turquoise)]">
                  Voir le projet <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-10 text-center">
          <CTAButton href="/portfolio" variant="ghost" className="js-track-portfolio">
            Voir tout le portfolio
          </CTAButton>
        </div>
      </div>
    </section>
  );
}

function Social() {
  return (
    <section id="resultats" className="border-t border-white/5 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-turquoise)]">
            Ils en parlent mieux que moi
          </span>
          <h2 className="mt-4 text-4xl font-bold md:text-5xl">Des résultats, pas des promesses.</h2>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {peakclTestimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-white/5 bg-card/50 p-6 shadow-card"
            >
              <div className="flex gap-1 text-[var(--brand-yellow)]">
                {Array.from({ length: t.rating }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground/90">"{t.quote}"</p>
              <div className="mt-6 border-t border-white/5 pt-4">
                <div className="text-sm font-semibold">{t.name}</div>
                <div className="text-xs text-muted-foreground">
                  {[t.sourceLabel, t.dateLabel].filter(Boolean).join(" · ")}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Instagram() {
  const sectionRef = useRef<HTMLElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;
    loadExternalScript({
      id: "elfsight-platform-script",
      src: "https://elfsightcdn.com/platform.js",
    });
  }, [shouldLoad]);

  return (
    <section ref={sectionRef} className="border-t border-white/5 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-turquoise)]">
            Réseaux sociaux
          </span>
          <h2 className="mt-4 text-4xl font-bold md:text-5xl">
            Suivez PeakCL sur <span className="text-gradient">Instagram</span>.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Avant / après, conseils conversion, coulisses des projets.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-2xl border border-white/5 bg-card/30 p-4 shadow-card backdrop-blur">
          <div
            className="elfsight-app-562a0aa7-3065-445f-bb96-cba40fe65b41"
            data-elfsight-app-lazy
          />
        </div>
      </div>
    </section>
  );
}

const why = [
  {
    icon: Target,
    title: "Clarté avant tout",
    desc: "On structure votre message pour que vos clients comprennent vite et passent à l’action.",
  },
  {
    icon: Zap,
    title: "Simple et efficace",
    desc: "On va à l’essentiel : un résultat en ligne, propre, et prêt à travailler pour vous.",
  },
  {
    icon: ShieldCheck,
    title: "Cohérence partout",
    desc: "Logo, site, réseaux, Google : un ensemble aligné qui inspire confiance.",
  },
  {
    icon: Clock,
    title: "Vous gardez votre temps",
    desc: "Vous me confiez le sujet, je fais. Vous validez, on met en ligne, et vous passez à autre chose.",
  },
];

function Why() {
  return (
    <section id="why" className="border-t border-white/5 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-turquoise)]">
              Pourquoi moi
            </span>
            <h2 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
              Une seule personne,
              <br />
              <span className="text-gradient">trois expertises.</span>
            </h2>
            <p className="mt-6 max-w-md text-muted-foreground">
              Je code, je conçois vos visuels et, formée au community management, je gère vos
              réseaux. Vous n’avez pas à briefer trois fois, à payer trois marges, ni à arbitrer entre
              un dev qui ne pense pas design, un graphiste qui ne sait pas coder et un CM qui ne
              connaît pas votre image.
            </p>
            <p className="mt-4 max-w-md text-muted-foreground">
              Vous travaillez avec moi seule. Pas de sous‑traitance cachée, pas de chef de projet entre nous. Vous
              m’écrivez, je vous réponds. Vous voyez le travail avancer.
            </p>
            <div className="mt-8">
              <CTAButton href="/brief" dataEvent="cta_brief_why">
                Faire le diagnostic
              </CTAButton>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {why.map((w) => (
              <div
                key={w.title}
                className="rounded-2xl border border-white/5 bg-card/50 p-5 shadow-card"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[color-mix(in_oklab,var(--brand-yellow)_18%,transparent)] text-[var(--brand-yellow)]">
                  <w.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold">{w.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section id="faq" className="border-t border-white/5 py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-turquoise)]">
            Questions fréquentes
          </span>
          <h2 className="mt-4 text-4xl font-bold md:text-5xl">On lève les derniers doutes.</h2>
        </div>
        <div className="mt-12 space-y-3">
          {peakclFaq.map((f) => (
            <details
              key={f.question}
              className="group rounded-2xl border border-white/5 bg-card/50 p-5 shadow-card open:bg-card/70"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-semibold">
                {f.question}
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 text-[var(--brand-turquoise)] transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p
                className="mt-3 text-sm leading-relaxed text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: f.answerHtml }}
              />
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
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
      alert(
        "L’envoi a échoué. Vérifiez votre connexion et réessayez, ou écrivez-moi directement à peakcl73@gmail.com.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-white/5 py-28"
    >
      <div className="absolute inset-0 -z-10 bg-hero" />
      <div className="bg-aurora" aria-hidden />
      <div className="grid-bg absolute inset-0 -z-10" />

      <div className="mx-auto max-w-4xl px-6 text-center">
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-[color-mix(in_oklab,var(--brand-yellow)_35%,transparent)] bg-white/5 px-4 py-1.5 text-xs font-semibold text-[var(--brand-yellow)]">
          <Sparkles className="h-3.5 w-3.5" />
          Audit gratuit : votre site web + vos réseaux sociaux
        </div>
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-balance text-4xl font-bold leading-tight md:text-6xl"
        >
          Prêt à arrêter de tout faire vous-même ?
        </motion.h2>
        <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
          Décrivez votre activité en 8 minutes : je vous dis ce qu’il faut pour une image en ligne cohérente (site, identité, réseaux), et comment je peux m’en charger pour vous. Ou réservez un appel pour en parler directement.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <CTAButton href="/brief" dataEvent="cta_brief_final">
            Faire le diagnostic
          </CTAButton>
          <CTAButton href={CALENDLY_URL} dataEvent="cta_calendly_final" variant="ghost">
            Réserver un appel
          </CTAButton>
        </div>

        <form
          className="mx-auto mt-10 max-w-xl space-y-4 rounded-2xl border border-white/10 bg-card/40 p-6 text-left shadow-card backdrop-blur"
          name="contact"
          method="POST"
          action="/merci"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          data-event="audit_submit"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value="contact" />
          <input type="hidden" name="leadType" value="contact" />
          <input type="hidden" name="source" value="site_peakcl" />
          <p className="hidden">
            <label>
              Ne pas remplir: <input name="bot-field" />
            </label>
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="text-xs font-semibold text-muted-foreground">Nom</span>
              <input
                name="name"
                required
                className="mt-2 w-full rounded-md border border-white/10 bg-background/50 px-4 py-3 text-sm text-foreground outline-none ring-0 focus:border-white/20"
                placeholder="Votre nom"
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-muted-foreground">Email</span>
              <input
                name="email"
                type="email"
                required
                className="mt-2 w-full rounded-md border border-white/10 bg-background/50 px-4 py-3 text-sm text-foreground outline-none ring-0 focus:border-white/20"
                placeholder="vous@exemple.com"
              />
            </label>
          </div>

          <label className="block">
            <span className="text-xs font-semibold text-muted-foreground">Message</span>
            <textarea
              name="message"
              required
              rows={5}
              className="mt-2 w-full rounded-md border border-white/10 bg-background/50 px-4 py-3 text-sm text-foreground outline-none ring-0 focus:border-white/20"
                placeholder="Décrivez votre activité + votre ville/zone + votre objectif (ex: +10 demandes/mois) + ce que vous avez déjà (site, réseaux, Google)."
            />
          </label>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={isSubmitting}
              data-event="audit_submit_click"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-all duration-300 hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Envoi…" : "Recevoir mon plan"}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <CTAButton href={CALENDLY_URL} dataEvent="cta_calendly_contact" variant="ghost">
              Réserver une visio
            </CTAButton>
          </div>
          <div className="mt-4 text-center">
            <ContactInline className="justify-center" />
          </div>
        </form>

        <ul className="mx-auto mt-10 flex max-w-xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
          {[
            "Réponse sous 24h",
            "Sans engagement",
            "Recommandations actionnables",
            "Clarté sur les prochaines étapes",
          ].map((x) => (
            <li key={x} className="inline-flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-[var(--brand-turquoise)]" />
              {x}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function MobileStickyContact() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-background/90 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl md:hidden">
      <div className="mx-auto flex max-w-lg gap-2 px-4">
        <a
          href={PHONE_TEL}
          data-event="cta_phone_sticky"
          className="flex flex-1 items-center justify-center gap-2 rounded-full border border-border bg-card/60 py-3 text-sm font-semibold text-foreground backdrop-blur hover:bg-card/80"
        >
          <Phone className="h-4 w-4 text-[var(--brand-turquoise)]" aria-hidden />
          Appeler
        </a>
        <a
          href="#contact"
          data-event="cta_contact_sticky"
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary-gradient py-3 text-sm font-semibold text-primary-foreground shadow-glow"
        >
          Message
        </a>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 text-sm text-muted-foreground md:flex-row">
        <div className="flex flex-col items-center gap-3 md:items-start">
          <div className="flex items-center gap-3">
          <img
            src={LOGO_NAV}
            alt="PeakCL"
            width={28}
            height={28}
            loading="lazy"
            decoding="async"
            className="h-7 w-7 rounded-md object-cover"
          />
          <span>© {new Date().getFullYear()} PeakCL · Charlotte Lacroix</span>
        </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs md:justify-start">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground"
            >
              LinkedIn
            </a>
            <a
              href={MALT_URL}
              target="_blank"
              rel="noopener noreferrer nofollow sponsored"
              className="hover:text-foreground"
            >
              Malt
            </a>
            <a
              href={FIVERR_URL}
              target="_blank"
              rel="noopener noreferrer nofollow sponsored"
              className="hover:text-foreground"
            >
              Fiverr
            </a>
            <a
              href={COMEUP_URL}
              target="_blank"
              rel="noopener noreferrer nofollow sponsored"
              className="hover:text-foreground"
            >
              ComeUp
            </a>
            <a
              href={CODEUR_URL}
              target="_blank"
              rel="noopener noreferrer nofollow sponsored"
              className="hover:text-foreground"
            >
              Codeur.com
            </a>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <a href="#method" className="hover:text-foreground">Méthode</a>
          <a href="/packs" className="hover:text-foreground">Offres</a>
          <a href="/community-manager-savoie" className="hover:text-foreground">Community management</a>
          <a href="/creation-logo-albertville" className="hover:text-foreground">Logo &amp; identité</a>
          <a href="/portfolio" className="hover:text-foreground">Portfolio</a>
          <a href="/conseils" className="hover:text-foreground">Conseils</a>
          <a href="/brief" className="hover:text-foreground">Diagnostic</a>
          <a href="#contact" className="hover:text-foreground">Contact</a>
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-7xl border-t border-white/5 px-6 pt-6">
        <p className="text-xs font-semibold text-muted-foreground">Zones desservies</p>
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
          <a href="/agence-web-albertville" className="hover:text-foreground">Création de site internet à Albertville</a>
          <a href="/agence-web-gilly-sur-isere" className="hover:text-foreground">Site internet à Gilly-sur-Isère</a>
          <a href="/agence-web-chambery" className="hover:text-foreground">Site internet à Chambéry</a>
          <a href="/agence-web-aix-les-bains" className="hover:text-foreground">Site internet à Aix-les-Bains</a>
          <a href="/agence-web-annecy" className="hover:text-foreground">Site internet à Annecy</a>
        </div>
      </div>
    </footer>
  );
}

function Landing() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="pb-[calc(5.25rem+env(safe-area-inset-bottom))] md:pb-0">
        <Hero />
        <Problem />
        <Bridge />
        <Method />
        <Packs />
        <ForWho />
        <PortfolioTeaser />
        <Social />
        <Instagram />
        <Why />
        <FAQ />
        <FinalCTA />
      </main>
      <TrustedBySection />
      <MobileStickyContact />
      <Footer />
    </div>
  );
}
