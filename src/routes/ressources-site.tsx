import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, Download } from "lucide-react";
import { absUrl } from "@/seo/site";

export const Route = createFileRoute("/ressources-site")({
  head: () => ({
    meta: [
      { title: "Ressource — Un site qui convertit — PeakCL" },
      {
        name: "description",
        content:
          "Ressource offerte PeakCL pour préparer votre appel : erreurs fréquentes et 3 piliers pour transformer votre site en outil de vente.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: absUrl("/ressources/site") },
    ],
    links: [{ rel: "canonical", href: absUrl("/ressources/site") }],
  }),
  component: Page,
});

function Page() {
  return (
    <main className="min-h-screen border-t border-white/5">
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          main { border: none !important; }
          .print-paper {
            background: white !important;
            color: black !important;
            border: none !important;
            box-shadow: none !important;
          }
          .print-paper * { color: black !important; }
        }
      `}</style>

      <section className="relative overflow-hidden bg-hero py-16">
        <div className="grid-bg absolute inset-0 -z-10" />
        <div className="mx-auto max-w-3xl px-6">
          <div className="no-print flex flex-wrap items-center justify-between gap-3">
            <a
              href="/bienvenue"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-foreground hover:border-white/20"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour à la page Bienvenue
            </a>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-full bg-primary-gradient px-4 py-2 text-xs font-semibold text-primary-foreground shadow-glow"
            >
              Télécharger en PDF <Download className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-6 rounded-3xl border border-white/10 bg-card/20 p-6 shadow-card print-paper">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-turquoise)]">
              Ressource offerte — créée pour votre appel
            </div>
            <h1 className="mt-4 text-balance text-3xl font-bold leading-tight md:text-4xl">
              Pourquoi ton site ne convertit pas
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Et comment le transformer en outil de vente. Un site web n&apos;est pas une vitrine : c&apos;est un commercial
              disponible 24h/24.
            </p>

            <div className="mt-8 space-y-6">
              <section>
                <h2 className="text-xl font-bold">La majorité des sites sont inutiles</h2>
                <p className="mt-3 text-sm text-muted-foreground">
                  Pas moches. Pas mal faits. Juste… inutiles. Ils existent. Mais ils ne travaillent pas.
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  Si personne ne te contacte via ce site, c&apos;est qu&apos;il y a un problème structurel. Pas esthétique.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold">Les 3 erreurs les plus courantes</h2>
                <ol className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li>
                    <span className="text-foreground">1 — Parler de soi.</span> Ton parcours, tes diplômes, ta passion…
                    Le visiteur veut savoir si tu peux l&apos;aider, lui.
                  </li>
                  <li>
                    <span className="text-foreground">2 — Pas de message clair.</span> En 5 secondes, ton visiteur ne
                    comprend pas ce que tu fais ni pour qui. Il repart.
                  </li>
                  <li>
                    <span className="text-foreground">3 — Pas de CTA visible.</span> Pas d&apos;appel à l&apos;action clair
                    = pas de prochaine étape. Le visiteur lit, puis ferme l&apos;onglet.
                  </li>
                </ol>
                <p className="mt-3 text-sm text-muted-foreground">
                  Un bon site ne présente pas ce que tu fais. Il prouve que tu peux résoudre un problème.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold">Les 3 piliers d&apos;un site qui convertit</h2>
                <ol className="mt-4 grid gap-3 md:grid-cols-3">
                  {[
                    {
                      k: "01",
                      t: "Clarté",
                      d: "En 5 secondes : qui tu aides, sur quel problème, avec quel résultat. Pas de jargon. Pas de flou.",
                    },
                    {
                      k: "02",
                      t: "Structure",
                      d: "Hero → Problème → Solution → Preuve → CTA. Chaque section guide vers la suivante.",
                    },
                    {
                      k: "03",
                      t: "Offre",
                      d: "Formulée comme une solution à un problème réel — pas comme une liste de prestations.",
                    },
                  ].map((s) => (
                    <li key={s.k} className="list-none rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="text-xs font-semibold text-[var(--brand-turquoise)]">{s.k}</div>
                      <div className="mt-1 text-base font-bold">{s.t}</div>
                      <div className="mt-2 text-sm text-muted-foreground">{s.d}</div>
                    </li>
                  ))}
                </ol>
                <p className="mt-4 text-sm text-muted-foreground">
                  Un bon site travaille pour toi 24h/24. Il filtre, il rassure, il donne envie de te contacter — sans
                  que tu aies à intervenir.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold">Checklist rapide : ton site convertit‑il ?</h2>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li>• En 5 secondes, un inconnu comprend ce que tu fais et pour qui.</li>
                  <li>• Ton message parle du problème de ton client, pas de toi.</li>
                  <li>• Il y a au moins un bouton d&apos;appel à l&apos;action visible sans scroller.</li>
                  <li>• Ta page de services explique un résultat, pas une liste de tâches.</li>
                  <li>• Tu as au moins un élément de preuve (avis, témoignage, résultat).</li>
                  <li>• Ton site est lisible sur mobile sans effort.</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

