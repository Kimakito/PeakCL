import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { breadcrumbJsonLd } from "@/seo/jsonld";
import { canonicalLink, hreflangLinks, ogLocaleMeta } from "@/seo/hreflang";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Reveal } from "@/components/ui/Reveal";
import {
  ExpressionPhoto,
  SectionAvatarCard,
} from "@/components/ExpressionPhoto";

const CALENDLY_URL = "https://calendly.com/peakcl73/faisons-connaissance";

/**
 * English service cards for the hub. Localized inline (English labels + English
 * route slugs) rather than reusing the shared French SERVICES data.
 */
const SERVICE_CARDS = [
  {
    slug: "/en/web-development",
    emoji: "💻",
    eyebrow: "Web development",
    title: "Custom websites",
    tagline:
      "Custom, high-performance and durable websites, with support from start to finish.",
  },
  {
    slug: "/en/social-media",
    emoji: "📱",
    eyebrow: "Social media",
    title: "Social media management",
    tagline:
      "For therapists and independents: stay visible and build trust, without spending your evenings on it.",
  },
  {
    slug: "/en/design",
    emoji: "🎨",
    eyebrow: "Graphic design",
    title: "Graphic design",
    tagline: "Visual identity and materials for a consistent, memorable brand.",
  },
  {
    slug: "/en/automation",
    emoji: "⚙️",
    eyebrow: "Automation & AI",
    title: "Automation & AI for your business",
    tagline:
      "Put AI and automation to work in your small team, to win back time without losing control.",
  },
];

/** English combined packages. Localized inline for the hub. */
const PACKS = [
  {
    emoji: "🌐",
    name: "Web Presence Pack",
    tagline: "Launch your online presence in a professional, consistent way.",
    points: [
      "Custom or WordPress showcase site (your choice), up to 5 pages",
      "Visual identity: logo + brand guidelines",
      "Social media visuals (5 branded templates)",
      "On-page SEO optimization",
      "1 month of support included",
    ],
    economy: "Around 15% saving vs separate offers",
  },
  {
    emoji: "🛒",
    name: "Complete E-commerce Pack",
    tagline: "Launch or redesign a high-performing, well-branded online store.",
    points: [
      "E-commerce site (Shopify or WooCommerce), up to 30 products",
      "Visual identity suited to e-commerce",
      "Promotional banners & product visuals",
      "Transactional email & newsletter template",
      "Google Analytics setup",
      "Training on how to run the store",
    ],
    economy: "Around 20% saving vs separate offers",
  },
  {
    emoji: "🎨",
    name: "Brand & Social Pack",
    tagline: "Build a strong identity and express it on social media.",
    points: [
      "Complete visual identity (logo + guidelines)",
      "Social media visuals pack (10 templates)",
      "1-month editorial calendar",
      "Audit of your existing channels",
      "Canva training (2h) for your autonomy",
    ],
    economy: "Around 15% saving vs separate offers",
  },
  {
    emoji: "📱",
    name: "Web + Social Starter Pack",
    tagline:
      "Build your site AND launch your social channels at the same time.",
    points: [
      "WordPress showcase site (up to 5 pages)",
      "Creation & optimization of your social profiles",
      "Pack of 10 branded visuals",
      "1-month editorial calendar free",
      "Essential social media plan: 1 month included",
    ],
    economy: "Around 18% saving + 1 month of social media free",
  },
  {
    emoji: "🔄",
    name: "Digital Refresh Pack",
    tagline: "For businesses that want to modernize their digital image.",
    points: [
      "Website redesign",
      "Visual identity refresh (logo + guidelines)",
      "New social media visuals (10 templates)",
      "Full technical SEO optimization",
      "Social media audit + recommendations",
    ],
    economy: "Around 20% saving vs separate offers",
  },
  {
    emoji: "🚀",
    name: "All-In-One Pack",
    tagline:
      "The complete solution to hand everything to a single point of contact.",
    points: [
      "Custom showcase or e-commerce site",
      "Complete visual identity",
      "Print materials (business card + flyer)",
      "Standard social media plan for 3 months (2 posts/week, 2 platforms)",
      "Email template + monthly newsletter x3",
      "Monthly performance report",
      "Priority support for 6 months",
    ],
    economy: "Around 25% saving · custom quote",
    highlight: true,
  },
];

export const Route = createFileRoute("/en/services")({
  head: () => ({
    meta: [
      {
        title: "Services · Websites, design, social media, automation · PeakCL",
      },
      {
        name: "description",
        content:
          "A single point of contact for your communication: websites, social media management, graphic design and support automating your processes. On request.",
      },
      { property: "og:type", content: "website" },
      ...ogLocaleMeta("/services", "en"),
      {
        "script:ld+json": breadcrumbJsonLd([
          { name: "Home", path: "/en" },
          { name: "Services", path: "/en/services" },
        ]),
      },
    ],
    links: [canonicalLink("/services", "en"), ...hreflangLinks("/services")],
  }),
  component: ServicesHub,
});

function ServicesHub() {
  return (
    <div className="min-h-screen">
      <main className="relative overflow-hidden border-t border-border bg-hero">
        <div className="grid-bg absolute inset-0 -z-10" />
        <div
          className="hero-aurora"
          aria-hidden
          style={{ bottom: "auto", height: "680px" }}
        />
        <div className="relative z-10 mx-auto max-w-5xl px-6 py-20">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-turquoise)]">
              Services
            </span>
            <h1 className="mt-4 text-balance text-4xl font-bold leading-tight md:text-6xl">
              One point of contact,{" "}
              <span className="text-gradient">four areas of expertise.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
              Site, social, image and automation: pick what you need, or hand it
              all over from A to Z. Pricing on request, based on your needs.
            </p>
            <div className="mt-10 flex justify-center">
              <SectionAvatarCard
                slug="offres"
                imgClassName="w-full max-w-[230px]"
              />
            </div>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {SERVICE_CARDS.map((s) => (
              <a
                key={s.slug}
                href={s.slug}
                data-event="services_hub_card"
                className="group relative rounded-2xl border border-border bg-card/50 p-7 shadow-card transition-all hover:-translate-y-1 hover:border-border"
              >
                <GlowingEffect
                  spread={40}
                  glow
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={3}
                />
                <div className="text-3xl">{s.emoji}</div>
                <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-yellow)]/80">
                  {s.eyebrow}
                </div>
                <h2 className="mt-1 text-xl font-semibold">{s.title}</h2>
                <p className="mt-3 text-sm text-muted-foreground">
                  {s.tagline}
                </p>
                <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand-turquoise)]">
                  Discover{" "}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </a>
            ))}
          </div>

          {/* Combined packages */}
          <div className="mt-20">
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-yellow)]">
                Combined packages
              </span>
              <h2 className="mt-4 text-3xl font-bold md:text-4xl">
                Simpler,{" "}
                <span className="text-gradient">and better value.</span>
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
                When several needs go together, a pack costs less than the
                services booked separately. All on request, based on your brief.
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {PACKS.map((pk, i) => (
                <Reveal key={pk.name} delay={i * 0.05} className="h-full">
                  <div
                    className={`card-hover relative flex h-full flex-col rounded-2xl border p-6 shadow-card ${
                      pk.highlight
                        ? "border-[color-mix(in_oklab,var(--brand-turquoise)_30%,transparent)] ring-1 ring-[color-mix(in_oklab,var(--brand-turquoise)_22%,transparent)] bg-card/60"
                        : "border-border bg-card/50"
                    }`}
                  >
                    <GlowingEffect
                      spread={40}
                      glow
                      disabled={false}
                      proximity={64}
                      inactiveZone={0.01}
                      borderWidth={3}
                    />
                    <div className="text-2xl">{pk.emoji}</div>
                    <h3 className="mt-3 text-lg font-semibold">{pk.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {pk.tagline}
                    </p>
                    <ul className="mt-4 flex-1 space-y-2 text-sm text-muted-foreground">
                      {pk.points.map((x) => (
                        <li key={x} className="flex items-start gap-2">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-turquoise)]" />
                          <span>{x}</span>
                        </li>
                      ))}
                    </ul>
                    {pk.economy ? (
                      <div className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full border border-[color-mix(in_oklab,var(--brand-yellow)_35%,transparent)] bg-muted px-3 py-1 text-xs font-semibold text-[var(--brand-yellow)]">
                        🏷️ {pk.economy}
                      </div>
                    ) : null}
                    <a
                      href="/en/book-a-call"
                      data-event="cta_brief_pack"
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand-turquoise)] hover:text-foreground"
                    >
                      Request a quote <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="mt-16 rounded-2xl border border-border bg-card/40 p-7 text-center shadow-card backdrop-blur">
            <div className="mb-6 flex justify-center">
              <ExpressionPhoto
                slug="sourire-malicieux"
                caption="Where do we start?"
                tilt={-3}
                imgClassName="aspect-[3/4] w-28"
              />
            </div>
            <h2 className="text-2xl font-bold md:text-3xl">
              Not sure where to start?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
              Book a diagnostic call: I will tell you what will have the most
              impact for your business, and how I can take care of it.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="/en/book-a-call"
                data-event="cta_brief_services_final"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-all duration-300 hover:scale-[1.02]"
              >
                Get your diagnostic <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-event="cta_calendly_services_final"
                className="inline-flex items-center justify-center rounded-full border border-border bg-muted px-6 py-3 text-sm font-semibold text-foreground hover:border-border"
              >
                Book a call
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
