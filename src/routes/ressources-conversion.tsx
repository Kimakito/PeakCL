import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, Download } from "lucide-react";
import { absUrl } from "@/seo/site";

export const Route = createFileRoute("/ressources-conversion")({
  head: () => ({
    meta: [
      { title: "Ressource — Conversion — PeakCL" },
      {
        name: "description",
        content:
          "Ressource offerte PeakCL pour préparer votre appel : structure + message pour transformer votre site en outil de conversion.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: absUrl("/ressources/conversion") },
    ],
    links: [{ rel: "canonical", href: absUrl("/ressources/conversion") }],
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
              Transformer ton site en machine à clients
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Si tu es ici, c’est probablement que ton site ne te ramène pas assez de clients… ou que tu n’en as pas
              encore. Bonne nouvelle : ce n’est pas un problème de design. C’est un problème de structure et de message.
            </p>

            <div className="mt-8 space-y-6">
              <section>
                <h2 className="text-xl font-bold">Pourquoi la majorité des sites échouent</h2>
                <p className="mt-3 text-sm text-muted-foreground">
                  La plupart des sites sont pensés comme des vitrines : ils parlent de l’entreprise, listent des
                  services, ils sont “jolis”. Mais ils oublient l’essentiel : convertir un visiteur en client.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold">Ce que ton visiteur attend vraiment</h2>
                <p className="mt-3 text-sm text-muted-foreground">
                  Quand quelqu’un arrive sur ton site, il se pose une seule question :
                </p>
                <div className="mt-3 rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-base font-bold text-foreground">
                    “Est-ce que cette personne peut résoudre mon problème ?”
                  </p>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  Si la réponse n’est pas évidente en quelques secondes, il part.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold">Le système PeakCL (les 3 piliers)</h2>
                <ol className="mt-4 grid gap-3 md:grid-cols-3">
                  {[
                    {
                      k: "1",
                      t: "Clarté",
                      d: "Message instantanément compréhensible. En 3 secondes: ce que tu fais, pour qui, et le résultat.",
                    },
                    {
                      k: "2",
                      t: "Structure",
                      d: "Le site guide le visiteur: problème → solution → preuve → passage à l’action.",
                    },
                    {
                      k: "3",
                      t: "Conversion",
                      d: "Chaque élément pousse à une action claire: prise de contact, appel, demande de devis.",
                    },
                  ].map((s) => (
                    <li key={s.k} className="list-none rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="text-xs font-semibold text-[var(--brand-turquoise)]">{s.k}</div>
                      <div className="mt-1 text-base font-bold">{s.t}</div>
                      <div className="mt-2 text-sm text-muted-foreground">{s.d}</div>
                    </li>
                  ))}
                </ol>
              </section>

              <section>
                <h2 className="text-xl font-bold">Auto-diagnostic rapide</h2>
                <ol className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li>1 — Comprend-on ce que tu fais en 5 secondes ?</li>
                  <li>2 — Ton site parle-t-il du client ou de toi ?</li>
                  <li>3 — Y a-t-il un appel à l’action clair ?</li>
                  <li>4 — Ton site guide-t-il ou laisse-t-il le visiteur perdu ?</li>
                </ol>
              </section>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

