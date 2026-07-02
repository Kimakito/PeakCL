import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, BookOpen } from "lucide-react";
import { absUrl } from "@/seo/site";
import { conseils } from "@/content/peakcl/conseils";
import { SnapPage, SnapSection, SectionDots } from "@/components/SnapPage";

const SECTIONS = [
  { id: "intro", label: "Conseils" },
  { id: "articles", label: "Articles" },
  { id: "contact", label: "Audit gratuit" },
];

export const Route = createFileRoute("/conseils")({
  head: () => ({
    meta: [
      { title: "Conseils, site web, réseaux sociaux & visibilité | PeakCL" },
      {
        name: "description",
        content:
          "Conseils clairs pour indépendants et petites structures : prix d'un site, WordPress ou sur-mesure, site vs réseaux, community management et référencement local.",
      },
      { property: "og:title", content: "Conseils PeakCL · site, réseaux & visibilité" },
      {
        property: "og:description",
        content:
          "Des réponses concrètes pour votre présence en ligne, sans jargon.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/conseils") },
    ],
    links: [{ rel: "canonical", href: absUrl("/conseils") }],
  }),
  component: Page,
});

function Page() {
  return (
    <main className="min-h-screen border-t border-white/5">
      <SectionDots sections={SECTIONS} />
      <SnapPage>
        <SnapSection id="intro" className="relative flex items-center overflow-hidden bg-hero py-20">
          <div className="grid-bg absolute inset-0 -z-10" />
          <div className="mx-auto max-w-4xl px-6 text-center">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-muted-foreground">
              <BookOpen className="h-3.5 w-3.5" />
              Conseils
            </div>
            <h1 className="mx-auto mt-6 max-w-3xl text-balance text-4xl font-bold leading-tight md:text-6xl">
              Y voir clair sur votre <span className="text-gradient">présence en ligne</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
              Des réponses concrètes, sans jargon, aux questions que se posent les indépendants et les
              petites structures avant de se lancer.
            </p>
          </div>
        </SnapSection>

        <SnapSection id="articles" className="flex items-center border-t border-white/5 py-16">
          <div className="mx-auto max-w-5xl px-6">
            <div className="grid gap-5 sm:grid-cols-2">
              {conseils.map((c) => (
                <a
                  key={c.slug}
                  href={`/${c.slug}`}
                  className="group flex flex-col rounded-2xl border border-white/5 bg-card/50 p-6 shadow-card transition-colors hover:border-white/15"
                >
                  <h2 className="text-lg font-bold leading-snug">{c.h1}</h2>
                  <p className="mt-3 flex-1 text-sm text-muted-foreground">{c.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand-turquoise)]">
                    Lire l&apos;article{" "}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </SnapSection>

        <SnapSection id="contact" className="relative flex items-center overflow-hidden border-t border-white/5 py-16">
          <div className="absolute inset-0 -z-10 bg-hero" />
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-2xl font-bold md:text-3xl">Une question sur votre projet ?</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Audit gratuit de votre site web et de vos réseaux sociaux, sous 24h et sans engagement.
            </p>
            <a
              href="/reservation-appel"
              className="mx-auto mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-primary-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
            >
              Demander mon audit gratuit <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </SnapSection>
      </SnapPage>
    </main>
  );
}
