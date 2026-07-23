import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check, Sparkles, Phone } from "lucide-react";
import { peakclTestimonialsEn } from "@/content/peakcl/testimonials.en";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { peakclFaqHomeEn } from "@/content/peakcl/faq.en";
import { peakclPortfolio } from "@/content/peakcl/portfolio";
import { CATEGORIES } from "@/content/peakcl/portfolioDeck";
import { DeckFooter } from "@/components/DeckFooter";
import { TrustedBySection } from "@/components/TrustedBySection";
import { optimizedLogoUrl } from "@/lib/optimizedLogo";
import { absUrl } from "@/seo/site";
import { faqPageJsonLd } from "@/seo/jsonld";
import { canonicalLink, hreflangLinks, ogLocaleMeta } from "@/seo/hreflang";
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

export const Route = createFileRoute("/en/")({
  head: () => ({
    meta: [
      {
        title: "Freelance web developer: code, design & social in one · PeakCL",
      },
      {
        name: "description",
        content:
          "Need a clear site, a consistent brand and a reliable online presence? PeakCL builds it end to end, hand-coded and fast, working remotely with clients worldwide.",
      },
      {
        property: "og:title",
        content: "PeakCL · Your online presence, simplified",
      },
      {
        property: "og:description",
        content:
          "One partner for your site, your brand and your social, with a clear plan and concrete deliverables.",
      },
      ...ogLocaleMeta("/", "en"),
      { "script:ld+json": faqPageJsonLd(peakclFaqHomeEn) },
    ],
    links: [
      { ...canonicalLink("/", "en") },
      ...hreflangLinks("/"),
      { rel: "preload", href: LOGO_NAV, as: "image", type: "image/webp" },
      {
        rel: "preload",
        href: "/peakcl/photo/charlotte-round-800.webp",
        as: "image",
        type: "image/webp",
      },
    ],
  }),
  component: Landing,
});

const CALENDLY_URL = "https://calendly.com/peakcl73/faisons-connaissance";
const WHATSAPP_URL = "https://wa.me/33743517627";
const PHONE_TEL = "tel:+33743517627";
const PHONE_DISPLAY = "+33 7 43 51 76 27";
const EMAIL = "peakcl73@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/charlotte-lacroix-peakcl/";
const MALT_URL = "https://www.malt.fr/profile/peakcldev";
const FIVERR_URL = "https://fr.fiverr.com/s/99W6WYa";
const COMEUP_URL = "https://comeup.com/fr/@PeakCL";

/** English labels for the portfolio category hub. Keyed by the imported
 *  CATEGORIES slugs so we never fork the shared portfolioDeck data module. */
const CAT_LABELS_EN: Record<string, string> = {
  therapeute: "Therapists",
  artisan: "Trades & craft",
  equestre: "Equestrian",
  artiste: "Artists",
  ecrivain: "Writers",
  archi: "Architects",
  pme: "SMEs & tech",
  taxi: "Taxi",
  droit: "Legal",
  "pro-sante": "Health",
  "tourisme-animaux": "Travel & animals",
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/* ── Shared primitive components ─────────────────────────────── */

function ContactInline({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-muted-foreground ${className}`}
    >
      <span>Or</span>
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

/* ── Hero panel ─────────────────────────────────────────────── */

/** No-op kept so section calls stay untouched (the 3D mascot was removed to
 *  hold a single visual direction: real photo + mockups + background doodle). */
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
    "You need an online presence that's clear, credible and easy to grasp.",
    "You don't have time to juggle the site, design, social and inbound by hand.",
    "You want a simple setup: one point of contact and fast decisions.",
  ];

  return (
    <section
      id="probleme"
      className="relative flex w-full items-center overflow-hidden py-16 md:py-20"
    >
      <SectionMascot pose="idee" side="left" />
      <div className="mx-auto max-w-6xl px-8 md:px-16 w-full">
        <div className="grid items-start gap-10 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeading
              align="left"
              accent="yellow"
              eyebrow="Why hand your online image to me"
              title={
                <>
                  An online presence
                  <span className="text-gradient">
                    {" "}
                    that's easier to keep up.
                  </span>
                </>
              }
            />
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
              You don't need a huge project to look professional. What you
              really need is a clear direction, a steady rhythm, and someone who
              helps you keep moving.
            </p>
            <div className="mt-6">
              <CTAButton href="/en/book-a-call" dataEvent="cta_brief_problem">
                Get your diagnosis
              </CTAButton>
            </div>
          </div>
          <ul className="space-y-3">
            {points.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 rounded-2xl border border-border bg-card/40 p-4 shadow-card backdrop-blur"
              >
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--brand-violet)_30%,transparent)] text-[var(--brand-yellow)] text-xs">
                  ✓
                </span>
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
    {
      n: "01",
      title: "Understand",
      desc: "I ask the right questions to clarify your business, your audience and your goal.",
    },
    {
      n: "02",
      title: "Propose",
      desc: "I send back a clear plan, with the deliverables, the timing and a starting budget.",
    },
    {
      n: "03",
      title: "Deliver",
      desc: "I build the site and the communication assets, then guide you all the way to launch.",
    },
  ];
  return (
    <section
      id="methode"
      className="relative flex w-full items-center overflow-hidden py-16 md:py-20"
    >
      <div className="relative isolate mx-auto w-full max-w-6xl px-8 md:px-16">
        <SectionHeading
          className="mb-10"
          accent="yellow"
          eyebrow="How it works"
          title="A simple path, built to move forward without friction"
        />
        <div ref={containerRef} className="relative grid gap-5 md:grid-cols-3">
          <div
            ref={lineRef}
            aria-hidden
            className="process-line pointer-events-none absolute left-[16.6%] right-[16.6%] top-10 hidden h-0.5 bg-gradient-to-r from-[var(--brand-turquoise)] to-[var(--brand-violet)] md:block"
          />
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ delay: i * 0.07 }}
              className="card-hover relative rounded-2xl border border-border bg-card/50 p-5 shadow-card"
            >
              <GlowingEffect
                spread={40}
                glow
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={3}
              />
              <div className="text-xs font-semibold tracking-[0.2em] text-[var(--brand-turquoise)]">
                {s.n}
              </div>
              <h3 className="mt-4 text-base font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <CTAButton href="/en/book-a-call" dataEvent="cta_brief_method">
            Get a clear plan
          </CTAButton>
        </div>
      </div>
    </section>
  );
}

/* ── Offers panel ────────────────────────────────────────────── */

const offers = [
  {
    eyebrow: "The simplest",
    title: "Online presence pack",
    price: "On request",
    highlight: true,
    points: [
      "Clear site + consistent brand",
      "Essential pages + contact journey",
      "First posts and core visuals",
      "Launch and initial SEO setup",
    ],
  },
  {
    eyebrow: "For a site, fast",
    title: "Showcase site",
    price: "On request",
    points: [
      "Structure built to convert",
      "Clean, mobile-friendly design",
      "Home / services / contact pages",
      "Domain, SSL and launch included",
    ],
  },
  {
    eyebrow: "If you already have a base",
    title: "Redesign / improvement",
    price: "On request",
    points: [
      "Sharper message and journey",
      "Reworked visuals and copy",
      "Improvements to your existing site",
      "More clarity, more trust",
    ],
  },
];

function OffersPanel() {
  return (
    <section
      id="offres"
      className="relative flex w-full items-center overflow-hidden py-16 md:py-20"
    >
      <SectionMascot pose="arc" side="left" heightClass="h-[40vh]" />
      <div className="mx-auto max-w-7xl px-8 md:px-16 w-full">
        <SectionHeading
          className="mb-8"
          accent="yellow"
          eyebrow="The shapes the work can take"
          title="Three ways to move forward, depending on what you need"
        />
        <div className="grid gap-4 md:grid-cols-3">
          {offers.map((o, i) => (
            <Reveal key={o.title} delay={i * 0.06} className="h-full">
              <div
                className={`card-hover relative h-full rounded-2xl border bg-card/50 p-5 shadow-card backdrop-blur ${o.highlight ? "border-[color-mix(in_oklab,var(--brand-turquoise)_30%,transparent)] ring-1 ring-[color-mix(in_oklab,var(--brand-turquoise)_22%,transparent)]" : "border-border"}`}
              >
                <GlowingEffect
                  spread={40}
                  glow
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={3}
                />
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-yellow)]/80">
                  {o.eyebrow}
                </div>
                <h3 className="mt-2 text-base font-semibold">{o.title}</h3>
                <div className="mt-2 text-sm font-semibold text-[var(--brand-turquoise)]">
                  {o.price}
                </div>
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
          <CTAButton href="/en/book-a-call" dataEvent="cta_brief_offers">
            Get your diagnosis
          </CTAButton>
          <CTAButton
            href="/en/services"
            variant="ghost"
            dataEvent="cta_services_detail"
          >
            See the services
          </CTAButton>
        </div>
      </div>
    </section>
  );
}

/* ── Portfolio panel ─────────────────────────────────────────── */

function PortfolioPanel() {
  const featured = peakclPortfolio.slice(0, 6);
  return (
    <section
      id="portfolio"
      className="relative flex w-full items-center overflow-hidden py-16 md:py-20"
    >
      <SectionMascot pose="tablette" side="right" heightClass="h-[40vh]" />
      <div className="mx-auto max-w-7xl px-8 md:px-16 w-full">
        <SectionHeading
          className="mb-8"
          accent="turquoise"
          eyebrow="Selected work"
          title={
            <>
              Projects delivered,{" "}
              <span className="text-gradient">with real impact</span>.
            </>
          }
          subtitle="What's your field? See what I've already shipped in your industry."
        />
        {/* category hub (short version → filters the portfolio) */}
        <div className="mb-7 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((c) => (
            <a
              key={c.slug}
              href={`/en/portfolio?cat=${c.slug}`}
              data-event="home_cat_filter"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-3.5 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-border hover:text-foreground"
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: c.accent }}
              />
              {CAT_LABELS_EN[c.slug] ?? c.short}
            </a>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <motion.a
              key={p.siteUrl}
              href={p.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-event="portfolio_click"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ delay: i * 0.05 }}
              className="group relative rounded-2xl border border-border bg-card/50 p-5 shadow-card transition-all hover:-translate-y-1 hover:border-border"
            >
              <GlowingEffect
                spread={40}
                glow
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={3}
              />
              <div className="flex items-start gap-3">
                {p.logoUrl ? (
                  <img
                    src={optimizedLogoUrl(p.logoUrl)}
                    alt={p.title}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-xl bg-muted object-contain p-1.5"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-xl bg-muted" />
                )}
                <div>
                  <div className="text-sm font-semibold">{p.title}</div>
                  {p.subtitle && (
                    <div className="mt-0.5 text-xs text-muted-foreground">
                      {p.subtitle}
                    </div>
                  )}
                </div>
              </div>
              {p.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.tags.slice(0, 3).map((t) => (
                    <span
                      key={`${p.siteUrl}-${t}`}
                      className="rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--brand-turquoise)]">
                View project <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </motion.a>
          ))}
        </div>
        <div className="mt-6 text-center">
          <CTAButton href="/en/portfolio" variant="ghost">
            See the portfolio
          </CTAButton>
        </div>
      </div>
    </section>
  );
}

/* ── Reviews panel ───────────────────────────────────────────── */

function ReviewsPanel() {
  const reviews = peakclTestimonialsEn.map((t) => ({
    quote: t.quote,
    name: t.name,
    role: [t.sourceLabel, t.dateLabel].filter(Boolean).join(" · "),
    rating: t.rating,
  }));
  // Each review appears only once per layout. The internal duplication inside
  // TestimonialsColumn is the marquee loop clone (continuous scroll), not a
  // hard-coded repeat of the reviews.
  const mid = Math.ceil(reviews.length / 2);
  const colA = reviews.slice(0, mid);
  const colB = reviews.slice(mid);
  return (
    <section
      id="avis"
      className="relative flex w-full items-center overflow-hidden py-16 md:py-20"
    >
      <SectionMascot pose="graphique" side="left" heightClass="h-[40vh]" />
      <div className="mx-auto max-w-7xl px-8 md:px-16 w-full">
        <SectionHeading
          className="mb-8"
          accent="turquoise"
          eyebrow="They say it better than I could"
          title="Results, not promises."
        />
        <p className="mb-2 text-center text-sm text-muted-foreground">
          Behind PeakCL, a real person:
        </p>
        <ExpressionGallery className="mt-2 mb-12" />
        <div className="mx-auto flex max-h-[58vh] justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]">
          {/* Mobile: one column, the 4 reviews once */}
          <TestimonialsColumn
            testimonials={reviews}
            duration={22}
            className="md:hidden"
          />
          {/* Desktop: 2 columns, each review only once */}
          <TestimonialsColumn
            testimonials={colA}
            duration={18}
            className="hidden md:block"
          />
          <TestimonialsColumn
            testimonials={colB}
            duration={22}
            className="hidden md:block"
          />
        </div>
      </div>
    </section>
  );
}

/* ── FAQ panel ───────────────────────────────────────────────── */

function FAQPanel() {
  return (
    <section
      id="faq"
      className="relative flex w-full items-center overflow-hidden py-16 md:py-20"
    >
      <SectionMascot pose="assise" side="right" />
      <div className="mx-auto max-w-3xl px-8 md:px-16 w-full">
        <SectionHeading
          className="mb-8"
          accent="turquoise"
          eyebrow="Frequently asked"
          title="Let's clear up any last doubts."
        />
        <div className="space-y-2">
          {peakclFaqHomeEn.map((f) => (
            <details
              key={f.question}
              className="group rounded-2xl border border-border bg-card/50 p-4 shadow-card open:bg-card/70"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-sm font-semibold">
                {f.question}
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border text-[var(--brand-turquoise)] transition-transform group-open:rotate-45 text-base">
                  +
                </span>
              </summary>
              <p
                className="mt-3 text-xs leading-relaxed text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: f.answerHtml }}
              />
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
      alert("Something went wrong. Email me directly at peakcl73@gmail.com.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative flex w-full items-center overflow-hidden py-16 md:py-20"
    >
      <div className="absolute inset-0 -z-10 bg-hero" />
      <div className="bg-aurora" aria-hidden />
      <div className="grid-bg absolute inset-0 -z-10" />
      <SectionMascot pose="reseaux" side="right" heightClass="h-[42vh]" />
      <div className="mx-auto max-w-4xl px-8 md:px-16 w-full text-center">
        <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-[color-mix(in_oklab,var(--brand-yellow)_35%,transparent)] bg-muted px-4 py-1.5 text-xs font-semibold text-[var(--brand-yellow)]">
          <Sparkles className="h-3.5 w-3.5" />
          Free diagnosis: site, brand and social
        </div>
        <h2 className="text-balance text-3xl font-bold leading-tight md:text-4xl">
          Ready to hand off your online presence?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
          Tell me about your business in 8 minutes: I'll pinpoint what you're
          missing most and how I can help you move forward.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <img
            src="/peakcl/photo/charlotte-round-192.webp"
            width={192}
            height={192}
            loading="lazy"
            decoding="async"
            alt="Charlotte Lacroix"
            className="h-14 w-14 rounded-full object-cover ring-2 ring-border"
          />
          <p className="text-left text-sm text-muted-foreground">
            You'll talk directly with{" "}
            <span className="font-semibold text-foreground">Charlotte</span>.
          </p>
        </div>
        <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <CTAButton href="/en/book-a-call" dataEvent="cta_brief_final">
            Get your diagnosis
          </CTAButton>
          <CTAButton
            href={CALENDLY_URL}
            dataEvent="cta_calendly_final"
            variant="ghost"
          >
            Book a call
          </CTAButton>
        </div>
        <form
          className="relative mx-auto mt-7 max-w-xl space-y-3 rounded-2xl border border-border bg-card/40 p-5 text-left shadow-card backdrop-blur"
          name="contact"
          method="POST"
          action="/merci"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          data-event="audit_submit"
          onSubmit={handleSubmit}
        >
          <GlowingEffect
            spread={40}
            glow
            disabled={false}
            proximity={64}
            inactiveZone={0.01}
            borderWidth={3}
          />
          <input type="hidden" name="form-name" value="contact" />
          <input type="hidden" name="leadType" value="contact" />
          <input type="hidden" name="source" value="site_peakcl" />
          <p className="hidden">
            <label>
              Don't fill this in: <input name="bot-field" />
            </label>
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            <label className="block">
              <span className="text-xs font-semibold text-muted-foreground">
                Name
              </span>
              <input
                name="name"
                required
                className="mt-1.5 w-full rounded-md border border-border bg-background/50 px-3 py-2.5 text-sm text-foreground outline-none focus:border-border"
                placeholder="Your name"
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-muted-foreground">
                Email
              </span>
              <input
                name="email"
                type="email"
                required
                className="mt-1.5 w-full rounded-md border border-border bg-background/50 px-3 py-2.5 text-sm text-foreground outline-none focus:border-border"
                placeholder="you@example.com"
              />
            </label>
          </div>
          <label className="block">
            <span className="text-xs font-semibold text-muted-foreground">
              Phone
            </span>
            <input
              name="telephone"
              type="tel"
              className="mt-1.5 w-full rounded-md border border-border bg-background/50 px-3 py-2.5 text-sm text-foreground outline-none focus:border-border"
              placeholder="+1 555 123 4567"
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-muted-foreground">
              Message
            </span>
            <textarea
              name="message"
              required
              rows={4}
              className="mt-1.5 w-full rounded-md border border-border bg-background/50 px-3 py-2.5 text-sm text-foreground outline-none focus:border-border"
              placeholder="Your business, your location, your goal..."
            />
          </label>
          <div className="flex items-center justify-center gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              data-event="audit_submit_click"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary-gradient px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition-all hover:scale-[1.03] disabled:opacity-60"
            >
              {isSubmitting ? "Sending…" : "Get my plan"}
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
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/90 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl md:hidden">
      <div className="mx-auto flex max-w-lg gap-2 px-4">
        <a
          href={PHONE_TEL}
          data-event="cta_phone_sticky"
          className="flex flex-1 items-center justify-center gap-2 rounded-full border border-border bg-card/60 py-3 text-sm font-semibold text-foreground backdrop-blur hover:bg-card/80"
        >
          <Phone
            className="h-4 w-4 text-[var(--brand-turquoise)]"
            aria-hidden
          />
          Call
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

/* ── Footer (mobile only) ────────────────────────────────────── */

function Footer() {
  return (
    <footer className="border-t border-border py-8 md:hidden">
      <img
        src="/peakcl/photo/charlotte-round-192.webp"
        width={192}
        height={192}
        alt="Charlotte Lacroix, PeakCL"
        loading="lazy"
        decoding="async"
        className="mx-auto mb-5 h-20 w-20 rounded-full object-cover ring-2 ring-border"
      />
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <img
            src={LOGO_NAV}
            alt="PeakCL"
            width={24}
            height={24}
            loading="lazy"
            decoding="async"
            className="h-6 w-6 rounded-md object-cover"
          />
          <span>© {new Date().getFullYear()} PeakCL · Charlotte Lacroix</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
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
          <a href="/en/portfolio" className="hover:text-foreground">
            Portfolio
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ── Reassurance bar (animated counters) ─────────────────────── */

/** Counts 0 -> target when the element enters the viewport (once).
 *  Jumps straight to the final value under prefers-reduced-motion. */
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
    // Safety net: whatever happens (a backgrounded tab freezing
    // requestAnimationFrame, an IntersectionObserver that never fires), the
    // final value shows. A counter stuck mid-way ("52%") or left at 0 is worse
    // than no animation at all.
    const fallback = window.setTimeout(() => setValue(target), duration + 2500);

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
    // Already visible on load (the bar sits right under the hero): some
    // browsers don't re-notify the observer, so we also start here.
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
    <section
      aria-label="Reassurance"
      className="border-y border-border bg-card/30 py-4"
    >
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-6 text-sm">
        <Stat
          target={peakclPortfolio.filter((p) => p.logoUrl).length}
          label="projects delivered"
        />
        <Stat literal="5/5" label="on Google" />
        <Stat target={100} suffix="%" label="happy clients" />
        <Stat literal="Remote" label="worldwide" />
      </div>
    </section>
  );
}

/* ── Root ────────────────────────────────────────────────────── */

function Landing() {
  return (
    <div className="relative bg-background text-foreground">
      {/* Vertical scroll: full-height sections stacked (desktop + mobile) */}
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
      <div className="hidden md:block">
        <DeckFooter />
      </div>
      <MobileStickyContact />
      <Footer />
    </div>
  );
}
