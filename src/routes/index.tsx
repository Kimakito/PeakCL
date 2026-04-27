import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect } from "react";
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
} from "lucide-react";
import logo from "@/assets/peakcl-logo.png";
import { peakclTestimonials } from "@/content/peakcl/testimonials";
import { peakclFaq } from "@/content/peakcl/faq";
import { peakclPortfolio } from "@/content/peakcl/portfolio";
import { absUrl } from "@/seo/site";
import { faqPageJsonLd } from "@/seo/jsonld";
import { loadExternalScript } from "@/lib/loadExternalScript";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PeakCL — Le site web qui transforme vos visiteurs en clients" },
      {
        name: "description",
        content:
          "Je crée votre présence en ligne de A à Z (site, logo, réseaux sociaux, Google Business Profile) pour que vous soyez visible sans y passer vos soirées.",
      },
      { property: "og:title", content: "PeakCL — Sites web qui convertissent" },
      {
        property: "og:description",
        content:
          "Site, logo, réseaux sociaux et Google Business Profile pour une présence en ligne claire, cohérente et prête à attirer des clients.",
      },
      { property: "og:url", content: absUrl("/") },
      { "script:ld+json": faqPageJsonLd(peakclFaq) },
    ],
    links: [{ rel: "canonical", href: absUrl("/") }],
  }),
  component: Landing,
});

const CALENDLY_URL = "https://calendly.com/peakcl73/45min";
const WHATSAPP_URL = "https://wa.me/33743517627";
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
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        data-event="cta_whatsapp"
        className="font-semibold text-[var(--brand-turquoise)] hover:text-foreground"
      >
        WhatsApp pro
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
          <img src={logo} alt="PeakCL logo" className="h-9 w-9 rounded-lg object-cover" />
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
  return (
    <section id="top" className="relative overflow-hidden bg-hero pt-20 pb-28 md:pt-28 md:pb-36">
      <div className="grid-bg absolute inset-0 -z-10" />
      <div className="mx-auto max-w-7xl px-6 text-center">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-muted-foreground"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--brand-turquoise)]" />
          Studio créatif & conversion · France · Belgique · Suisse · Canada
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ delay: 0.05 }}
          className="mx-auto mt-6 max-w-4xl text-balance text-5xl font-bold leading-[1.05] md:text-7xl"
        >
          Je prends le temps de faire ce que vous n’avez pas le temps de faire :
          <br />
          <span className="text-gradient">votre présence en ligne</span>.
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ delay: 0.1 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl"
        >
          Aujourd’hui, on peut “faire un site” avec l’IA. Mais sans méthode, on perd vite du temps et on perd la main.
          <br />
          Je vous accompagne humainement et je m’occupe de tout : <span className="text-foreground">site, logo, réseaux sociaux, Google</span>.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ delay: 0.15 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <CTAButton href="/brief" dataEvent="cta_brief_hero">
            Faire le diagnostic
          </CTAButton>
          <CTAButton href={CALENDLY_URL} dataEvent="cta_calendly_hero" variant="ghost">
            Réserver un appel
          </CTAButton>
        </motion.div>
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ delay: 0.17 }}
          className="mt-3"
        >
          <a
            href="#resultats"
            className="text-xs font-semibold text-muted-foreground hover:text-foreground"
          >
            Voir les résultats →
          </a>
        </motion.div>
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ delay: 0.18 }}
          className="mt-4"
        >
          <ContactInline />
        </motion.div>

        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ delay: 0.25 }}
          className="mx-auto mt-14 grid max-w-3xl grid-cols-3 gap-6 border-t border-white/5 pt-8 text-center"
        >
          {[
            { k: "+20", v: "projets livrés" },
            { k: "14j", v: "délai moyen" },
            { k: "4.9/5", v: "satisfaction client" },
          ].map((s) => (
            <div key={s.v}>
              <div className="font-display text-2xl font-bold text-foreground md:text-3xl">{s.k}</div>
              <div className="mt-1 text-xs text-muted-foreground md:text-sm">{s.v}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// (VideoIntro removed from home — kept available via /qui-suis-je if needed)

function Problem() {
  const pains = [
    "Vous avez tenté (IA / template) et le projet n’avance pas — ou ne ressemble pas à votre activité.",
    "Vous n’avez ni le temps, ni l’envie de vous former des semaines pour un résultat incertain.",
    "Votre présence en ligne manque de cohérence (site, logo, réseaux, Google) et ça se voit.",
    "Vos futurs clients ne comprennent pas clairement qui vous êtes, ce que vous faites, et comment vous contacter.",
  ];
  return (
    <section className="border-t border-white/5 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-start gap-12 md:grid-cols-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-turquoise)]">
              Le constat
            </span>
            <h2 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
              Le problème, ce n’est pas l’envie.
              <br />
              <span className="text-muted-foreground">C’est la coordination.</span>
            </h2>
            <p className="mt-6 max-w-md text-muted-foreground">
              Site, logo, réseaux, Google… sur le papier c’est simple. Dans la réalité, ça fait souvent plusieurs prestataires à coordonner.
              Je suis là pour enlever cette charge et livrer un ensemble cohérent.
            </p>
          </div>

          <ul className="space-y-4">
            {pains.map((p) => (
              <li
                key={p}
                className="flex items-start gap-3 rounded-2xl border border-white/5 bg-card/40 p-5 shadow-card backdrop-blur"
              >
                <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--brand-violet)_25%,transparent)] text-[var(--brand-yellow)]">
                  ✕
                </span>
                <span className="text-sm text-foreground/90">{p}</span>
              </li>
            ))}
          </ul>
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
        "Une fois en ligne, je reste disponible pour les ajustements de la première semaine. Au-delà, on peut continuer ou s’arrêter — tu décides.",
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
                      src={p.logoUrl}
                      alt={p.title}
                      className="h-12 w-12 rounded-xl bg-white/5 object-contain p-2"
                      loading="lazy"
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
  useEffect(() => {
    loadExternalScript({
      id: "elfsight-platform-script",
      src: "https://elfsightcdn.com/platform.js",
    });
  }, []);

  return (
    <section className="border-t border-white/5 py-24">
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
              <span className="text-gradient">deux métiers.</span>
            </h2>
            <p className="mt-6 max-w-md text-muted-foreground">
              Je code et je dessine. Vous n’avez pas à briefer deux fois, à payer deux marges, ni à arbitrer entre un
              dev qui ne pense pas design et un designer qui ne sait pas coder.
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
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-white/5 py-28"
    >
      <div className="absolute inset-0 -z-10 bg-hero" />
      <div className="grid-bg absolute inset-0 -z-10" />

      <div className="mx-auto max-w-4xl px-6 text-center">
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-balance text-4xl font-bold leading-tight md:text-6xl"
        >
          On commence quand ?
        </motion.h2>
        <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
          Le plus simple : vous remplissez le diagnostic. C’est 8 minutes, vous aurez un devis sous 48h ouvrées. Si vous préférez en parler de vive voix, vous pouvez aussi réserver 20 minutes en visio.
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
              data-event="audit_submit_click"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-all duration-300 hover:scale-[1.03]"
            >
              Recevoir mon plan
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

function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 text-sm text-muted-foreground md:flex-row">
        <div className="flex flex-col items-center gap-3 md:items-start">
          <div className="flex items-center gap-3">
          <img src={logo} alt="PeakCL" className="h-7 w-7 rounded-md object-cover" />
          <span>© {new Date().getFullYear()} PeakCL — Charlotte Lacroix</span>
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
          <a href="/portfolio" className="hover:text-foreground">Portfolio</a>
          <a href="/brief" className="hover:text-foreground">Diagnostic</a>
          <a href="#contact" className="hover:text-foreground">Contact</a>
        </div>
      </div>
    </footer>
  );
}

function Landing() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero />
        <Problem />
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
      <Footer />
    </div>
  );
}
