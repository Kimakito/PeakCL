import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, Download } from "lucide-react";
import { absUrl } from "@/seo/site";

export const Route = createFileRoute("/ressources-confiance")({
  head: () => ({
    meta: [
      { title: "Ressource — Installer la confiance — PeakCL" },
      {
        name: "description",
        content:
          "Ressource offerte PeakCL pour préparer votre appel : pourquoi vos prospects hésitent et comment installer la confiance rapidement (image, message, cohérence).",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: absUrl("/ressources/confiance") },
    ],
    links: [{ rel: "canonical", href: absUrl("/ressources/confiance") }],
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
              Pourquoi tes prospects ne te font pas confiance
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Et comment changer ça rapidement. Si tes prospects hésitent avant de te contacter, ce n&apos;est pas un
              problème de prix — c&apos;est un problème de confiance.
            </p>

            <div className="mt-8 space-y-6">
              <section>
                <h2 className="text-xl font-bold">Ce n&apos;est pas un problème de prix</h2>
                <p className="mt-3 text-sm text-muted-foreground">
                  Si tes prospects hésitent, demandent ton tarif puis disparaissent… ce n&apos;est pas parce que tu es
                  trop cher. C&apos;est parce qu&apos;ils ne te font pas encore assez confiance.
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  En ligne, la confiance se joue en quelques secondes. Bien avant que le prospect ait lu une ligne sur
                  toi. Si ces premières secondes ne déclenchent pas le bon signal, il passe à autre chose.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold">Ce qui crée le doute</h2>
                <ol className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li>
                    <span className="text-foreground">1 — Image peu professionnelle.</span> Photo floue, site daté,
                    identité incohérente… le cerveau enregistre immédiatement “pas sérieux”.
                  </li>
                  <li>
                    <span className="text-foreground">2 — Message flou.</span> Si on ne comprend pas ce que tu fais et
                    pour qui, le doute s&apos;installe. Le flou ne rassure jamais.
                  </li>
                  <li>
                    <span className="text-foreground">3 — Incohérence globale.</span> Ton site dit une chose, tes réseaux
                    en montrent une autre, ton offre en propose une troisième. Le prospect se méfie.
                  </li>
                </ol>
                <p className="mt-3 text-sm text-muted-foreground">
                  Le prix n&apos;est jamais la vraie objection. C&apos;est l&apos;argument qu&apos;on donne quand on n&apos;ose pas dire qu&apos;on n&apos;est pas convaincu.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold">Comment fonctionne le cerveau de ton client</h2>
                <p className="mt-3 text-sm text-muted-foreground">
                  La décision de “faire confiance ou non” se prend très vite, avant toute lecture. L&apos;émotion prime
                  sur la logique. Et le visuel parle avant toi.
                </p>
                <ol className="mt-4 grid gap-3 md:grid-cols-3">
                  {[
                    { k: "→", t: "Rapide", d: "Décision en moins de 3 secondes." },
                    { k: "→", t: "Émotionnel", d: "Si l’émotion est négative, le rationnel ne rattrape rien." },
                    { k: "→", t: "Visuel", d: "Le cerveau traite les images bien plus vite que le texte." },
                  ].map((s, idx) => (
                    <li key={idx} className="list-none rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="text-xs font-semibold text-[var(--brand-turquoise)]">{s.k}</div>
                      <div className="mt-1 text-base font-bold">{s.t}</div>
                      <div className="mt-2 text-sm text-muted-foreground">{s.d}</div>
                    </li>
                  ))}
                </ol>
              </section>

              <section>
                <h2 className="text-xl font-bold">Les 3 éléments qui installent la confiance</h2>
                <ol className="mt-4 grid gap-3 md:grid-cols-3">
                  {[
                    { k: "01", t: "Image pro", d: "Cohérente, soignée, alignée avec ce que tu vends." },
                    { k: "02", t: "Message clair", d: "Spécifique, concret, sans jargon, orienté problème." },
                    { k: "03", t: "Cohérence", d: "Site, réseaux, offre, communication: même langage." },
                  ].map((s) => (
                    <li key={s.k} className="list-none rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="text-xs font-semibold text-[var(--brand-turquoise)]">{s.k}</div>
                      <div className="mt-1 text-base font-bold">{s.t}</div>
                      <div className="mt-2 text-sm text-muted-foreground">{s.d}</div>
                    </li>
                  ))}
                </ol>
                <p className="mt-4 text-sm text-muted-foreground">
                  Quand ces trois éléments sont alignés, le doute disparaît. Et la décision devient évidente.
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

