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
import { VideoPresentation } from "@/components/home/VideoPresentation";
import { SectionHeading } from "@/components/SectionHeading";
import { ExpressionGallery } from "@/components/ExpressionPhoto";
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
          "Vous avez besoin d’un site claire, d’une image cohérente et d’une présence en ligne fiable ? PeakCL vous accompagne de A à Z, avec un seul interlocuteur.",
      },
      { property: "og:title", content: "PeakCL · Votre présence en ligne, simplifiée" },
      {
        property: "og:description",
        content:
          "Un seul interlocuteur pour votre site, votre image et vos réseaux, avec un plan clair et des livrables concrets.",
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
  const points = [
    "Vous avez besoin d’une présence en ligne claire, crédible et facile à comprendre.",
    "Vous n’avez pas le temps de gérer site, design, réseaux et prise de contact à la main.",
    "Vous voulez un accompagnement simple, avec un seul interlocuteur et des décisions rapides.",
  ];

  return (
    <section id="probleme" className="relative flex w-full items-center overflow-hidden py-16 md:py-20">
      <SectionMascot pose="idee" side="left" />
      <div className="mx-auto max-w-6xl px-8 md:px-16 w-full">
        <div className="grid items-start gap-10 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeading
              align="left"
              accent="yellow"
              eyebrow="Pourquoi me confier votre image"
              title={<>Une présence en ligne<span className="text-gradient"> plus simple à tenir.</span></>}
            />
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Pas besoin d’un projet énorme pour paraître professionnel. Il faut surtout une direction claire, un bon rythme et quelqu’un qui vous aide à avancer.
            </p>
            <div className="mt-6">
              <CTAButton href="/reservation-appel" dataEvent="cta_brief_problem">Faire le diagnostic</CTAButton>
            </div>
          </div>
          <ul className="space-y-3">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3 rounded-2xl border border-white/5 bg-card/40 p-4 shadow-card backdrop-blur">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--brand-violet)_30%,transparent)] text-[var(--brand-yellow)] text-xs">✓</span>
                <span className="text-sm text-foreground/90">{point}</span>
              </li>
            ))}
          </ul>
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
    { n: "01", title: "Comprendre", desc: "Je pose les bonnes questions pour clarifier votre activité, votre public et votre objectif." },
    { n: "02", title: "Proposer", desc: "Je vous renvoie un plan clair, avec les livrables, le timing et un budget de départ." },
    { n: "03", title: "Livrer", desc: "Je produis le site et les éléments de communication, puis je vous accompagne jusqu’à la mise en ligne." },
  ];
  return (
    <section id="methode" className="relative flex w-full items-center overflow-hidden py-16 md:py-20">
      <div className="relative isolate mx-auto w-full max-w-6xl px-8 md:px-16">
        <SectionHeading
          className="mb-10"
          accent="yellow"
          eyebrow="Comment ça se passe"
          title="Un parcours simple, pensé pour avancer sans friction"
        />
        <div ref={containerRef} className="relative grid gap-5 md:grid-cols-3">
          <div
            ref={lineRef}
            aria-hidden
            className="process-line pointer-events-none absolute left-[16.6%] right-[16.6%] top-10 hidden h-0.5 bg-gradient-to-r from-[var(--brand-turquoise)] to-[var(--brand-violet)] md:block"
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
          <CTAButton href="/reservation-appel" dataEvent="cta_brief_method">Obtenir un plan clair</CTAButton>
        </div>
      </div>
    </section>
  );
}

/* ── Offers panel ────────────────────────────────────────────── */

const offers = [
  { eyebrow: "Le plus simple", title: "Pack présence en ligne", price: "Sur devis", highlight: true, points: ["Site clair + image cohérente", "Pages essentielles + parcours de contact", "Premières publications et visuels de base", "Mise en ligne et premiers réglages SEO"] },
  { eyebrow: "Pour un site rapide", title: "Site vitrine", price: "Sur devis", points: ["Structure pensée pour convertir", "Design sobre et mobile-friendly", "Pages accueil / services / contact", "Domaine, SSL et mise en ligne inclus"] },
  { eyebrow: "Si vous avez déjà un socle", title: "Refonte / amélioration", price: "Sur devis", points: ["Clarification du message et du parcours", "Visuels et textes repensés", "Amélioration du site existant", "Gain de clarté et de confiance"] },
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
          title="Trois façons d’avancer, selon votre besoin"
        />
        <div className="grid gap-4 md:grid-cols-3">
          {offers.map((o, i) => (
            <Reveal key={o.title} delay={i * 0.06} className="h-full">
            <div className={`card-hover relative h-full rounded-2xl border bg-card/50 p-5 shadow-card backdrop-blur ${o.highlight ? "border-[color-mix(in_oklab,var(--brand-turquoise)_30%,transparent)] ring-1 ring-[color-mix(in_oklab,var(--brand-turquoise)_22%,transparent)]" : "border-white/5"}`}>
              <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-yellow)]/80">{o.eyebrow}</div>
              <h3 className="mt-2 text-base font-semibold">{o.title}</h3>
              <div className="mt-2 text-sm font-semibold text-[var(--brand-turquoise)]">{o.price}</div>
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
          <CTAButton href="/services" variant="ghost" dataEvent="cta_services_detail">Voir les services</CTAButton>
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
          title={<>Des projets livrés, <span className="text-gradient">avec un vrai impact</span>.</>}
          subtitle="Vous êtes dans quel métier ? Voyez ce que j’ai déjà livré dans votre secteur."
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
          <CTAButton href="/portfolio" variant="ghost">Voir le portfolio</CTAButton>
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
        <p className="mb-2 text-center text-sm text-muted-foreground">Derrière PeakCL, une vraie personne :</p>
        <ExpressionGallery className="mt-2 mb-12" />
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
          Diagnostic gratuit : site, image et réseaux
        </div>
        <h2 className="text-balance text-3xl font-bold leading-tight md:text-4xl">Prêt à déléguer votre présence en ligne ?</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
          Décrivez votre activité en 8 minutes : je vous dis ce qui vous manque le plus et comment je peux vous aider à avancer.
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
    let raf = 0;
    // Filet de sécurité : quoi qu'il arrive (onglet en arrière-plan qui gèle
    // requestAnimationFrame, IntersectionObserver qui ne se déclenche jamais),
    // la valeur finale s'affiche. Un compteur figé à mi-course ("52%") ou resté
    // à 0 est pire que pas d'animation.
    let fallback = window.setTimeout(() => setValue(target), duration + 2500);

    const run = () => {
      if (done) return;
      done = true;
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(Math.round(target * eased));
        if (p < 1) {
          raf = requestAnimationFrame(tick);
        } else {
          setValue(target);
          window.clearTimeout(fallback);
        }
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) run();
        });
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    // Déjà visible au chargement (la barre est juste sous le hero) : certains
    // navigateurs ne rappellent pas l'observer, on démarre donc aussi ici.
    if (el.getBoundingClientRect().top < window.innerHeight) run();

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.clearTimeout(fallback);
    };
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
        <Stat target={peakclPortfolio.filter((p) => p.logoUrl).length} label="projets livrés" />
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
      <VideoPresentation />
      <ProblemPanel />
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
