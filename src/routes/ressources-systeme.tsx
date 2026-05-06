import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, Download } from "lucide-react";
import { absUrl } from "@/seo/site";

export const Route = createFileRoute("/ressources-systeme")({
  head: () => ({
    meta: [
      { title: "Ressource — Le système en 3 étapes — PeakCL" },
      {
        name: "description",
        content:
          "Ressource offerte PeakCL pour préparer votre appel : pourquoi la visibilité seule ne suffit pas, et le système simple à mettre en place.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: absUrl("/ressources/systeme") },
    ],
    links: [{ rel: "canonical", href: absUrl("/ressources/systeme") }],
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
              Pourquoi tu n&apos;as pas de clients
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Même si tu fais tout « comme il faut ». La visibilité seule ne suffit pas — voici ce qu’il faut vraiment
              mettre en place.
            </p>

            <div className="mt-8 space-y-6">
              <section>
                <h2 className="text-xl font-bold">Le vrai problème</h2>
                <p className="mt-3 text-sm text-muted-foreground">
                  Tu peux poster tous les jours, faire du contenu, être actif sur les réseaux… et toujours ne pas avoir
                  de clients. Ce n&apos;est pas un hasard. Et ce n&apos;est pas ta faute.
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  La majorité des indépendants pensent que leur problème, c&apos;est la visibilité. Alors ils postent
                  plus. Ils boostent leurs publications. Ils refont leur logo. Mais rien ne change.
                </p>
                <p className="mt-3 text-sm text-muted-foreground">Parce que le problème n&apos;est pas là.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold">Ce qui te manque réellement</h2>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li>
                    <span className="text-foreground">1 — Pas de structure.</span> Aucun fil conducteur entre ce que tu
                    montres et ce que tu vends. Le visiteur ne sait pas où aller.
                  </li>
                  <li>
                    <span className="text-foreground">2 — Pas de parcours client.</span> Il n&apos;existe pas de chemin
                    balisé entre la première découverte et la prise de contact.
                  </li>
                  <li>
                    <span className="text-foreground">3 — Pas de conversion.</span> Même si quelqu&apos;un
                    s&apos;intéresse à toi, il n&apos;y a pas de mécanisme clair pour passer à l&apos;étape suivante.
                  </li>
                </ul>
                <p className="mt-3 text-sm text-muted-foreground">
                  Ce qui te manque, ce n&apos;est pas plus de trafic. C&apos;est un système.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold">Le système en 3 étapes</h2>
                <p className="mt-3 text-sm text-muted-foreground">
                  Un système simple et reproductible, qui fait le travail à ta place — même quand tu dors.
                </p>
                <ol className="mt-4 grid gap-3 md:grid-cols-3">
                  {[
                    {
                      k: "01",
                      t: "Attirer",
                      d: "Toucher les bonnes personnes, pas tout le monde. Un message ciblé vaut 10 fois plus que du volume.",
                    },
                    {
                      k: "02",
                      t: "Convaincre",
                      d: "Montrer que tu comprends leur problème, et que tu as la solution. La confiance se construit ici.",
                    },
                    {
                      k: "03",
                      t: "Convertir",
                      d: "Transformer l’intérêt en décision. Un CTA clair, un appel, une offre bien formulée.",
                    },
                  ].map((s) => (
                    <li key={s.k} className="list-none rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="text-xs font-semibold text-[var(--brand-turquoise)]">{s.k}</div>
                      <div className="mt-1 text-base font-bold">{s.t}</div>
                      <div className="mt-2 text-sm text-muted-foreground">{s.d}</div>
                    </li>
                  ))}
                </ol>
                <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-muted-foreground">
                  <div className="font-semibold text-foreground">À retenir</div>
                  <ul className="mt-2 space-y-1">
                    <li>• La visibilité sans système, c&apos;est du bruit.</li>
                    <li>• Un système sans clarté, c&apos;est de l&apos;énergie gaspillée.</li>
                    <li>• Trois étapes, dans l&apos;ordre, sans en sauter une.</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold">3 actions à faire cette semaine</h2>
                <ol className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li>
                    <span className="text-foreground">1 — Audite ton parcours client.</span> Trace le chemin d&apos;un
                    visiteur depuis la découverte jusqu&apos;à la prise de contact. Est-ce que ce chemin est clair ?
                  </li>
                  <li>
                    <span className="text-foreground">2 — Identifie ton maillon faible.</span> Attirer / Convaincre /
                    Convertir — sur lequel des trois tu bloques vraiment ? Concentre ton énergie là.
                  </li>
                  <li>
                    <span className="text-foreground">3 — Formule ton offre en une phrase.</span> “J&apos;aide [qui] à
                    [résultat] grâce à [méthode].” Si tu n&apos;y arrives pas en 30 secondes, c&apos;est là que ça coince.
                  </li>
                </ol>
              </section>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

