import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
import { absUrl } from "@/seo/site";
import { breadcrumbJsonLd } from "@/seo/jsonld";

export const Route = createFileRoute("/agence-web-annecy")({
  head: () => ({
    meta: [
      { title: "Création de site web à Annecy (Haute‑Savoie) — PeakCL" },
      {
        name: "description",
        content:
          "Création & refonte de sites web premium à Annecy. Un site rapide, clair et pensé pour générer des prises de contact. Audit gratuit sous 24h.",
      },
      { property: "og:title", content: "Création de site web à Annecy — PeakCL" },
      {
        property: "og:description",
        content:
          "Création & refonte de sites web premium à Annecy. Audit gratuit sous 24h.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/agence-web-annecy") },
      {
        "script:ld+json": breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Annecy", path: "/agence-web-annecy" },
        ]),
      },
    ],
    links: [{ rel: "canonical", href: absUrl("/agence-web-annecy") }],
  }),
  component: Page,
});

function Page() {
  return (
    <main className="min-h-screen border-t border-white/5">
      <section className="relative overflow-hidden bg-hero py-20">
        <div className="grid-bg absolute inset-0 -z-10" />
        <div className="mx-auto max-w-5xl px-6 text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            Annecy · Haute‑Savoie
          </div>
          <h1 className="mx-auto mt-6 max-w-3xl text-balance text-4xl font-bold leading-tight md:text-6xl">
            Création de site web à <span className="text-gradient">Annecy</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
            Un site premium, rapide et structuré pour convertir les visiteurs locaux en prises de contact.
          </p>
          <a
            href="/#contact"
            className="mx-auto mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-primary-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
          >
            Demander mon audit gratuit <ArrowRight className="h-4 w-4" />
          </a>
          <p className="mt-3 text-xs text-muted-foreground">Réponse sous 24h · Sans engagement</p>
        </div>
      </section>

      <section className="border-t border-white/5 py-20">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold">Un site qui fait le tri.</h2>
            <p className="mt-4 text-muted-foreground">
              Annecy est concurrentiel : l’objectif est une page et une structure qui rassurent, positionnent
              haut de gamme, et transforment en demandes qualifiées.
            </p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-card/50 p-6 shadow-card">
            <h3 className="text-base font-semibold">Focus conversion</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>• Offre claire + bénéfice concret</li>
              <li>• Preuves (portfolio) + avis</li>
              <li>• CTA audit visible à chaque étape</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

