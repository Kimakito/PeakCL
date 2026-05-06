import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, CheckCircle2 } from "lucide-react";
import { absUrl } from "@/seo/site";

const CALENDLY_URL = "https://calendly.com/peakcl73/45min";

export const Route = createFileRoute("/bienvenue-strategie")({
  head: () => ({
    meta: [
      { title: "Bienvenue — Stratégie — PeakCL" },
      {
        name: "description",
        content:
          "Bienvenue. Quelques minutes pour clarifier ta situation et repartir avec une recommandation claire sur ta présence en ligne.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/bienvenue-strategie") },
    ],
    links: [{ rel: "canonical", href: absUrl("/bienvenue-strategie") }],
  }),
  component: BienvenueStrategiePage,
});

function BienvenueStrategiePage() {
  return (
    <main className="min-h-screen border-t border-white/5">
      <section className="relative overflow-hidden bg-hero py-20">
        <div className="grid-bg absolute inset-0 -z-10" />
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-muted-foreground">
            <CheckCircle2 className="h-4 w-4 text-[var(--brand-turquoise)]" />
            Diagnostic envoyé — merci
          </div>
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-muted-foreground">
            <Check className="h-4 w-4 text-[var(--brand-turquoise)]" />
            Bienvenue · Stratégie
          </div>

          <h1 className="mx-auto mt-6 text-balance text-4xl font-bold leading-tight md:text-5xl">
            On clarifie ta <span className="text-gradient">stratégie</span> (vite et bien)
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Merci pour tes réponses. Si tu veux aller plus vite, le mieux est de faire un point ensemble: en 45 minutes,
            je te donne une reco claire et priorisée (message, structure, prochaines actions).
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-gradient px-7 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
              data-event="cta_calendly_bienvenue_strategie"
            >
              Réserver mon point stratégie <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="/portfolio"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-7 py-3 text-sm font-semibold text-foreground hover:border-white/20"
            >
              Voir le portfolio
            </a>
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 py-16">
        <div className="mx-auto grid max-w-4xl gap-6 px-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-card/30 p-6 shadow-card">
            <div className="text-sm font-semibold text-foreground">1) Diagnostic</div>
            <p className="mt-2 text-sm text-muted-foreground">
              3 à 5 minutes. Ta situation, tes objectifs, tes priorités, tes freins.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-card/30 p-6 shadow-card">
            <div className="text-sm font-semibold text-foreground">2) Reco claire</div>
            <p className="mt-2 text-sm text-muted-foreground">
              Je te renvoie une recommandation (structure, message, prochaine action).
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-card/30 p-6 shadow-card">
            <div className="text-sm font-semibold text-foreground">3) Étape suivante</div>
            <p className="mt-2 text-sm text-muted-foreground">
              Si ça fait sens, on voit ensemble comment te faire gagner du temps et des clients.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

