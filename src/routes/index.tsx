import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowRight, Check, Sparkles, Phone,
} from "lucide-react";
import { peakclTestimonials } from "@/content/peakcl/testimonials";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { peakclFaqHome } from "@/content/peakcl/faq";
import { peakclPortfolio } from "@/content/peakcl/portfolio";
import { CATEGORIES } from "@/content/peakcl/portfolioDeck";
import { DeckFooter } from "@/components/DeckFooter";
import { TrustedBySection } from "@/components/TrustedBySection";
import { optimizedLogoUrl } from "@/lib/optimizedLogo";
import { absUrl } from "@/seo/site";
import { faqPageJsonLd } from "@/seo/jsonld";
import { submitNetlifyForm } from "@/lib/funnel";
import { CTAButton } from "@/components/CTAButton";
import { HeroPanel } from "@/components/home/HeroPanel";
import { InstagramFeed } from "@/components/home/InstagramFeed";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { type MascotPose } from "@/lib/mascot";

const LOGO_NAV = "/peakcl/logo-nav.webp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Création site internet, logo & réseaux en Savoie · PeakCL" },
      {
        name: "description",
        content:
          "Site, identité visuelle et réseaux sociaux : déléguez votre image en ligne à un seul interlocuteur, pour indépendants et petites structures.",
      },
      { property: "og:title", content: "PeakCL · Déléguez votre communication en ligne" },
      {
        property: "og:description",
        content:
          "Pas le temps pour votre site, vos réseaux et votre image ? Un seul interlocuteur pour construire une communication en ligne cohérente, de A à Z.",
      },
      { property: "og:url", content: absUrl("/") },
      { "script:ld+json": faqPageJsonLd(peakclFaqHome) },
    ],
    links: [
      { rel: "canonical", href: absUrl("/") },
      { rel: "preload", href: LOGO_NAV, as: "image", type: "image/webp" },
      { rel: "preload", href: "/peakcl/photo/charlotte-round-800.webp", as: "image", type: "image/webp" },
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

/* ── Hero panel ─────────────────────────────────────────────── */

/** Ancien emplacement de la mascotte 3D des gouttières : retiré pour tenir une
 *  seule direction (photo réelle + mockups + doodle de fond). Conservé en
 *  no-op pour ne pas toucher tous les appels de section. */
function SectionMascot(_props: {
  pose: MascotPose;
  side?: "left" | "right";
  flip?: boolean;
  heightClass?: string;
}) {
  return null;
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
    <section id="probleme" className="relative flex w-full items-center overflow-hidden py-16 md:py-20">
      <SectionMascot pose="idee" side="left" />
      <div className="mx-auto max-w-6xl px-8 md:px-16 w-full">
        <div className="grid items-start gap-10 md:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              accent="yellow"
              eyebrow="Soyons honnêtes"
              title={<>Votre métier mérite une image en ligne<span className="text-gradient"> à la hauteur.</span></>}
            />
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
    <section id="difference" className="relative flex w-full items-center overflow-hidden py-16 md:py-20">
      <SectionMascot pose="victoire" side="right" />
      <div className="mx-auto max-w-5xl px-8 md:px-16 w-full">
        <SectionHeading
          className="mb-10"
          accent="turquoise"
          eyebrow="La différence"
          title={<>Même activité. <span className="text-gradient">Deux façons de gérer sa com'.</span></>}
        />
        <div className="grid gap-5 md:grid-cols-2">
          {cols.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.08} className="h-full">
            <div className={`card-hover relative h-full rounded-2xl border p-6 shadow-card backdrop-blur ${c.tone === "good" ? "card-glass ring-brand" : "border-white/5 bg-card/30"}`}>
              <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
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
            </Reveal>
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

function useDrawOnView() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = containerRef.current;
    const ln = lineRef.current;
    if (!el || !ln) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      ln.style.setProperty("--draw", "1");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            ln.style.setProperty("--draw", "1");
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { containerRef, lineRef };
}

function MethodPanel() {
  const { containerRef, lineRef } = useDrawOnView();
  const steps = [
    { n: "01", title: "Diagnostic", desc: "Vous remplissez un formulaire de 8 minutes ou on en parle 20 minutes en visio. Je comprends votre activité, votre public, votre budget, vos contraintes." },
    { n: "02", title: "Cadrage", desc: "Je vous renvoie un devis précis sous 48h ouvrées (pas une fourchette élastique) et un planning. Vous validez ou vous ajustez." },
    { n: "03", title: "Production", desc: "Je code, je dessine, je rédige. Vous voyez le travail au fur et à mesure, pas seulement à la fin. Une révision incluse à chaque livrable." },
    { n: "04", title: "Suivi", desc: "Une fois en ligne, je reste disponible pour les ajustements de la première semaine. Au-delà, on continue ou on s'arrête, vous décidez." },
  ];
  return (
    <section id="methode" className="relative flex w-full items-center overflow-hidden py-16 md:py-20">
      <div className="relative isolate mx-auto w-full max-w-6xl px-8 md:px-16">
        {/* doodle en fond de section (thème « comment je travaille ») */}
        <img
          aria-hidden
          src="/peakcl/doodles/doodle-1.webp"
          loading="lazy"
          decoding="async"
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 hidden w-[min(760px,100%)] -translate-x-1/2 -translate-y-1/2 select-none opacity-30 md:block"
          style={{
            maskImage: "radial-gradient(circle, black 45%, transparent 78%)",
            WebkitMaskImage: "radial-gradient(circle, black 45%, transparent 78%)",
          }}
        />
        <SectionHeading
          className="mb-10"
          accent="yellow"
          eyebrow="Comment je travaille"
          title="Quatre étapes, du diagnostic à la mise en ligne"
        />
        <div ref={containerRef} className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {/* ligne de progression tracée au scroll (desktop) */}
          <div
            ref={lineRef}
            aria-hidden
            className="process-line pointer-events-none absolute left-[12.5%] right-[12.5%] top-10 hidden h-0.5 bg-gradient-to-r from-[var(--brand-turquoise)] to-[var(--brand-violet)] lg:block"
          />
          {steps.map((s, i) => (
            <motion.div key={s.n} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.07 }} className="card-hover relative rounded-2xl border border-white/5 bg-card/50 p-5 shadow-card">
              <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
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
  { eyebrow: "Clé en main", title: "Pack présence en ligne", price: "Sur devis", highlight: true, points: ["Site + logo + pages réseaux sociaux", "Premières publications selon besoin", "Intégration réseau social sur le site", "Mise en ligne + bases SEO + parcours de contact"] },
  { eyebrow: "Site vitrine codé", title: "Site vitrine codé", price: "Sur devis", points: ["Pages essentielles (Accueil, services, contact)", "Mobile, rapide, propre", "Mise en ligne complète (domaine, SSL, indexation)", "Bases SEO (structure, titres)"] },
  { eyebrow: "Sur-mesure / custom", title: "Site sur-mesure / custom", price: "Sur devis", points: ["UX/UI plus poussé, sections spécifiques", "Intégrations et fonctionnalités adaptées", "Optimisations performance et conversion"] },
  { eyebrow: "Identité visuelle", title: "Identité visuelle / logo", price: "Sur devis", points: ["Logo propre et déclinable (web + réseaux)", "Couleurs & typos cohérentes", "Mini kit de départ pour une image homogène"] },
];

function OffersPanel() {
  return (
    <section id="offres" className="relative flex w-full items-center overflow-hidden py-16 md:py-20">
      <SectionMascot pose="arc" side="left" heightClass="h-[40vh]" />
      <div className="mx-auto max-w-7xl px-8 md:px-16 w-full">
        <SectionHeading
          className="mb-8"
          accent="yellow"
          eyebrow="Les formes que prend l'accompagnement"
          title="Quatre formules selon votre besoin"
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {offers.map((o, i) => (
            <Reveal key={o.title} delay={i * 0.06} className="h-full">
            <div className={`card-hover relative h-full rounded-2xl border bg-card/50 p-5 shadow-card backdrop-blur ${o.highlight ? "border-[color-mix(in_oklab,var(--brand-turquoise)_30%,transparent)] ring-1 ring-[color-mix(in_oklab,var(--brand-turquoise)_22%,transparent)]" : "border-white/5"}`}>
              <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
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
            </Reveal>
          ))}
        </div>
        <div className="mt-6 text-center flex justify-center gap-3">
          <CTAButton href="/reservation-appel" dataEvent="cta_brief_offers">Faire le diagnostic</CTAButton>
          <CTAButton href="/services" variant="ghost" dataEvent="cta_services_detail">Voir tous les services</CTAButton>
        </div>
      </div>
    </section>
  );
}

/* ── Portfolio panel ─────────────────────────────────────────── */

function PortfolioPanel() {
  const featured = peakclPortfolio.slice(0, 6);
  return (
    <section id="portfolio" className="relative flex w-full items-center overflow-hidden py-16 md:py-20">
      <SectionMascot pose="tablette" side="right" heightClass="h-[40vh]" />
      <div className="mx-auto max-w-7xl px-8 md:px-16 w-full">
        <SectionHeading
          className="mb-8"
          accent="turquoise"
          eyebrow="Réalisations"
          title={<>Des projets livrés, <span className="text-gradient">qui convertissent</span>.</>}
          subtitle="Vous êtes dans quel métier ? Voyez ce que j'ai livré dans votre secteur."
        />
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
            <motion.a key={p.siteUrl} href={p.siteUrl} target="_blank" rel="noopener noreferrer" data-event="portfolio_click"
              initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.05 }}
              className="group relative rounded-2xl border border-white/5 bg-card/50 p-5 shadow-card transition-all hover:-translate-y-1 hover:border-white/15">
              <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
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
  const reviews = peakclTestimonials.map((t) => ({
    quote: t.quote,
    name: t.name,
    role: [t.sourceLabel, t.dateLabel].filter(Boolean).join(" · "),
    rating: t.rating,
  }));
  // Chaque avis n'apparaît qu'une fois par mise en page. La duplication interne
  // de TestimonialsColumn est le clone de boucle du marquee (défilement continu),
  // pas une répétition en dur des avis.
  const mid = Math.ceil(reviews.length / 2);
  const colA = reviews.slice(0, mid);
  const colB = reviews.slice(mid);
  return (
    <section id="avis" className="relative flex w-full items-center overflow-hidden py-16 md:py-20">
      <SectionMascot pose="graphique" side="left" heightClass="h-[40vh]" />
      <div className="mx-auto max-w-7xl px-8 md:px-16 w-full">
        <SectionHeading
          className="mb-8"
          accent="turquoise"
          eyebrow="Ils en parlent mieux que moi"
          title="Des résultats, pas des promesses."
        />
        <div className="mx-auto flex max-h-[58vh] justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]">
          {/* Mobile : une colonne, les 4 avis une fois */}
          <TestimonialsColumn testimonials={reviews} duration={22} className="md:hidden" />
          {/* Desktop : 2 colonnes, chaque avis une seule fois */}
          <TestimonialsColumn testimonials={colA} duration={18} className="hidden md:block" />
          <TestimonialsColumn testimonials={colB} duration={22} className="hidden md:block" />
        </div>
      </div>
    </section>
  );
}

/* ── FAQ panel ───────────────────────────────────────────────── */

function FAQPanel() {
  return (
    <section id="faq" className="relative flex w-full items-center overflow-hidden py-16 md:py-20">
      <SectionMascot pose="assise" side="right" />
      <div className="mx-auto max-w-3xl px-8 md:px-16 w-full">
        <SectionHeading
          className="mb-8"
          accent="turquoise"
          eyebrow="Questions fréquentes"
          title="On lève les derniers doutes."
        />
        <div className="space-y-2">
          {peakclFaqHome.map((f) => (
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
    <section id="contact" className="relative flex w-full items-center overflow-hidden py-16 md:py-20">
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
        <div className="mt-6 flex items-center justify-center gap-3">
          <img
            src="/peakcl/photo/charlotte-round-192.webp"
            width={192}
            height={192}
            loading="lazy"
            decoding="async"
            alt="Charlotte Lacroix"
            className="h-14 w-14 rounded-full object-cover ring-2 ring-white/15"
          />
          <p className="text-left text-sm text-muted-foreground">
            Vous parlerez directement à <span className="font-semibold text-foreground">Charlotte</span>.
          </p>
        </div>
        <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <CTAButton href="/reservation-appel" dataEvent="cta_brief_final">Faire le diagnostic</CTAButton>
          <CTAButton href={CALENDLY_URL} dataEvent="cta_calendly_final" variant="ghost">Réserver un appel</CTAButton>
        </div>
        <form
          className="relative mx-auto mt-7 max-w-xl space-y-3 rounded-2xl border border-white/10 bg-card/40 p-5 text-left shadow-card backdrop-blur"
          name="contact" method="POST" action="/merci" data-netlify="true" data-netlify-honeypot="bot-field" data-event="audit_submit" onSubmit={handleSubmit}
        >
          <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
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
            <span className="text-xs font-semibold text-muted-foreground">Téléphone</span>
            <input name="telephone" type="tel" className="mt-1.5 w-full rounded-md border border-white/10 bg-background/50 px-3 py-2.5 text-sm text-foreground outline-none focus:border-white/20" placeholder="06 12 34 56 78" />
          </label>
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
      <img src="/peakcl/photo/charlotte-round-192.webp" width={192} height={192} alt="Charlotte Lacroix, PeakCL" loading="lazy" decoding="async" className="mx-auto mb-5 h-20 w-20 rounded-full object-cover ring-2 ring-white/10" />
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

/* ── Reassurance bar (compteurs animés) ──────────────────────── */

/** Incrémente 0 -> target quand l'élément entre dans le viewport (une seule fois).
 *  Valeur finale immédiate si prefers-reduced-motion. */
function useCountUp(target: number, duration = 1200) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }
    let done = false;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting || done) return;
          done = true;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setValue(Math.round(target * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);
  return { value, ref };
}

function Stat({
  target,
  prefix = "",
  suffix = "",
  label,
  literal,
}: {
  target?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  literal?: string;
}) {
  const { value, ref } = useCountUp(target ?? 0);
  return (
    <span className="inline-flex items-center gap-1.5">
      <span ref={ref} className="font-bold text-[var(--brand-turquoise)]">
        {literal ?? `${prefix}${value}${suffix}`}
      </span>
      <span className="text-muted-foreground">{label}</span>
    </span>
  );
}

function ReassuranceBar() {
  return (
    <section aria-label="Réassurance" className="border-y border-white/5 bg-card/30 py-4">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-6 text-sm">
        <Stat target={20} suffix="+" label="projets livrés" />
        <Stat literal="5/5" label="sur Google" />
        <Stat target={100} suffix="%" label="clients satisfaits" />
        <Stat literal="Savoie" label="& France" />
      </div>
    </section>
  );
}

/* ── Root ────────────────────────────────────────────────────── */

function Landing() {
  return (
    <div className="relative bg-background text-foreground">
      {/* Scroll vertical : sections pleine hauteur empilées (desktop + mobile) */}
      <HeroPanel />
      <ReassuranceBar />
      <ProblemPanel />
      <DifferencePanel />
      <TrustedBySection />
      <OffersPanel />
      <PortfolioPanel />
      <ReviewsPanel />
      <MethodPanel />
      <FAQPanel />
      <ContactPanel />
      <InstagramFeed />
      <div className="hidden md:block"><DeckFooter /></div>
      <MobileStickyContact />
      <Footer />
    </div>
  );
}
