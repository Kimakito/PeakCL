import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/seo/site";

export const Route = createFileRoute("/qui-suis-je")({
  head: () => ({
    meta: [
      { title: "Qui suis‑je ? — PeakCL" },
      {
        name: "description",
        content:
          "Découvrez le parcours de Charlotte Lacroix (PeakCL) et la manière dont PeakCL conçoit des sites premium orientés conversion.",
      },
      { property: "og:title", content: "Qui suis‑je ? — PeakCL" },
      {
        property: "og:description",
        content:
          "Le parcours, la méthode et la philosophie PeakCL — pour des sites qui convertissent.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/qui-suis-je") },
    ],
    links: [{ rel: "canonical", href: absUrl("/qui-suis-je") }],
  }),
  component: Page,
});

function Page() {
  return (
    <main className="min-h-screen border-t border-white/5">
      <section className="relative overflow-hidden bg-hero py-20">
        <div className="grid-bg absolute inset-0 -z-10" />
        <div className="mx-auto max-w-4xl px-6 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-yellow)]">
            Qui suis‑je ?
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-balance text-4xl font-bold leading-tight md:text-6xl">
            Charlotte Lacroix, <span className="text-gradient">PeakCL</span>.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
            Mon objectif: transformer votre présence en ligne en un outil qui génère des demandes,
            pas juste des visites.
          </p>
        </div>
      </section>

      <section className="border-t border-white/5 py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="rounded-2xl border border-white/5 bg-card/50 p-6 shadow-card">
            <h2 className="text-2xl font-bold">Ma façon de travailler</h2>
            <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
              <li>• Stratégie & structure: le message doit être clair en 5 secondes.</li>
              <li>• Design premium: cohérence, crédibilité, confiance.</li>
              <li>• Conversion: preuves, CTA, parcours et friction minimisée.</li>
              <li>• SEO local: bases propres pour être trouvé par les bons clients.</li>
            </ul>
          </div>

          <div className="mt-10 text-center">
            <a href="/" className="text-sm font-semibold text-[var(--brand-turquoise)] hover:text-foreground">
              ← Retour à l’accueil
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

