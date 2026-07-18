import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/seo/site";
import { personJsonLd, breadcrumbJsonLd } from "@/seo/jsonld";
import { canonicalLink, hreflangLinks, ogLocaleMeta } from "@/seo/hreflang";
import { SnapPage, SnapSection, SectionDots } from "@/components/SnapPage";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { ExpressionGallery } from "@/components/ExpressionPhoto";
import { TerminalBio } from "@/components/TerminalBio";
import { StarCrawl } from "@/components/StarCrawl";

const PHOTO = "/peakcl/photo/charlotte-portrait";

const SECTIONS = [
  { id: "intro", label: "Charlotte" },
  { id: "parcours", label: "Background" },
  { id: "contact", label: "Let's talk?" },
] as const;

export const Route = createFileRoute("/en/about")({
  head: () => ({
    meta: [
      {
        title:
          "Charlotte Lacroix · Freelance web developer & graphic designer | PeakCL",
      },
      {
        name: "description",
        content:
          "Charlotte Lacroix (PeakCL), freelance web developer & graphic designer. Websites, logos and social media for independents, working remotely worldwide.",
      },
      {
        property: "og:title",
        content:
          "Charlotte Lacroix · Freelance web developer & graphic designer | PeakCL",
      },
      {
        property: "og:description",
        content:
          "The background, the method and the PeakCL philosophy: code and design in one, for an online presence that generates enquiries.",
      },
      { property: "og:type", content: "website" },
      ...ogLocaleMeta("/qui-suis-je", "en"),
      { "script:ld+json": personJsonLd() },
      {
        "script:ld+json": breadcrumbJsonLd([
          { name: "Home", path: "/en" },
          { name: "About", path: "/en/about" },
        ]),
      },
    ],
    links: [
      { ...canonicalLink("/qui-suis-je", "en") },
      ...hreflangLinks("/qui-suis-je"),
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <main className="min-h-screen border-t border-white/5">
      <SectionDots
        sections={SECTIONS.map((s) => ({ id: s.id, label: s.label }))}
      />
      <SnapPage>
        <SnapSection
          id="intro"
          className="relative flex items-center overflow-hidden bg-hero py-20"
        >
          <div className="grid-bg absolute inset-0 -z-10" />
          <div className="mx-auto max-w-4xl px-6 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-yellow)]">
              Who am I?
            </span>
            <h1 className="mx-auto mt-6 max-w-3xl text-balance text-4xl font-bold leading-tight md:text-6xl">
              Charlotte Lacroix, <span className="text-gradient">PeakCL</span>.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
              Web developer and graphic designer, working remotely with clients
              worldwide. My goal: turn your online presence into a tool that
              generates enquiries, not just visits.
            </p>
          </div>
        </SnapSection>

        <SnapSection
          id="parcours"
          className="flex items-center border-t border-white/5 py-20"
        >
          <div className="mx-auto max-w-3xl px-6">
            <TerminalBio className="mb-12" />

            <div className="relative mx-auto mb-8 max-w-md overflow-hidden rounded-2xl border border-white/10 shadow-card">
              <GlowingEffect
                spread={40}
                glow
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={3}
              />
              <picture>
                <source
                  type="image/avif"
                  srcSet={`${PHOTO}-640.avif 640w, ${PHOTO}-960.avif 960w, ${PHOTO}-1280.avif 1280w`}
                  sizes="(min-width: 768px) 448px, 100vw"
                />
                <source
                  type="image/webp"
                  srcSet={`${PHOTO}-640.webp 640w, ${PHOTO}-960.webp 960w, ${PHOTO}-1280.webp 1280w`}
                  sizes="(min-width: 768px) 448px, 100vw"
                />
                <img
                  src={`${PHOTO}-960.webp`}
                  alt="Charlotte Lacroix, founder of PeakCL"
                  width={960}
                  height={1117}
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-full object-cover"
                />
              </picture>
            </div>

            <StarCrawl />

            <div className="relative mt-10 rounded-2xl border border-white/5 bg-card/50 p-6 shadow-card">
              <GlowingEffect
                spread={40}
                glow
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={3}
              />
              <h2 className="text-2xl font-bold">How I work</h2>
              <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                <li>
                  <strong className="text-foreground">
                    Strategy &amp; structure
                  </strong>{" "}
                  : the message must be clear in 5 seconds.
                </li>
                <li>
                  <strong className="text-foreground">Premium design</strong> :
                  consistency, credibility and trust before the first call.
                </li>
                <li>
                  <strong className="text-foreground">Conversion</strong> :
                  proof, clear calls to action, a simple journey with minimal
                  friction.
                </li>
                <li>
                  <strong className="text-foreground">Fast sites</strong> :
                  hand-coded or WordPress, optimised for performance (Core Web
                  Vitals).
                </li>
                <li>
                  <strong className="text-foreground">SEO</strong> : clean
                  foundations so the right clients find you, wherever they are.
                </li>
              </ul>
            </div>

            <div className="mt-14 text-center">
              <h2 className="text-2xl font-bold">
                And on a lighter note: all my faces
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
                Serious about the work, not about myself. You work with a real
                person, not a logo.
              </p>
              <ExpressionGallery className="mt-8" />
            </div>
          </div>
        </SnapSection>

        <SnapSection
          id="contact"
          className="flex items-center border-t border-white/5 py-20"
        >
          <div className="mx-auto max-w-3xl px-6">
            <div className="relative rounded-2xl border border-[color-mix(in_oklab,var(--brand-turquoise)_30%,transparent)] bg-card/40 p-6 text-center shadow-card">
              <GlowingEffect
                spread={40}
                glow
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={3}
              />
              <h2 className="text-xl font-bold">Shall we talk?</h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
                Tell me about your business in 8 minutes: I'll tell you what a
                consistent online presence needs, and how I can handle it for
                you.
              </p>
              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="/en/book-a-call"
                  className="inline-flex items-center justify-center rounded-full bg-primary-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-all hover:scale-[1.03]"
                >
                  Get your diagnosis
                </a>
                <a
                  href="/en/portfolio"
                  className="inline-flex items-center justify-center rounded-full border border-border bg-card/60 px-6 py-3 text-sm font-semibold text-foreground hover:bg-card/80"
                >
                  See the portfolio
                </a>
              </div>
            </div>

            <div className="mt-10 text-center">
              <a
                href="/en"
                className="text-sm font-semibold text-[var(--brand-turquoise)] hover:text-foreground"
              >
                ← Back to home
              </a>
            </div>
          </div>
        </SnapSection>
      </SnapPage>
    </main>
  );
}
