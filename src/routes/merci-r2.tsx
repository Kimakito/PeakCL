import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, TrendingUp } from "lucide-react";
import { absUrl } from "@/seo/site";

const KEY_STATS = [
  {
    figure: "94%",
    label:
      "de la première impression sur une entreprise vient du design de son site web",
  },
  {
    figure: "0,05s",
    label:
      "c'est le temps qu'il faut à un visiteur pour juger votre site crédible ou non",
  },
  {
    figure: "76%",
    label:
      "des recherches locales sur mobile débouchent sur une visite ou un contact sous 24h",
  },
];

export const Route = createFileRoute("/merci-r2")({
  head: () => ({
    meta: [
      { title: "Bien reçu · PeakCL" },
      {
        name: "description",
        content: "Réponses bien reçues avant le deuxième appel.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/merci-r2") },
    ],
    links: [{ rel: "canonical", href: absUrl("/merci-r2") }],
  }),
  component: MerciR2Page,
});

function MerciR2Page() {
  return (
    <main className="min-h-screen border-t border-white/5">
      <section className="relative overflow-hidden bg-hero py-24">
        <div className="grid-bg absolute inset-0 -z-10" />
        <div className="mx-auto max-w-2xl px-6 text-center">
          <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-[var(--brand-turquoise)]">
            <Check className="h-6 w-6" />
          </div>
          <h1 className="mt-6 text-balance text-4xl font-bold md:text-5xl">
            C’est noté. Merci !
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            J’ai bien reçu tes réponses. Je prépare notre prochain appel avec ça
            en tête — à très vite au créneau réservé.
          </p>

          <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-white/10 bg-card/40 p-6 text-left shadow-card backdrop-blur">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-[var(--brand-turquoise)]">
                <TrendingUp className="h-5 w-5" />
              </span>
              <h2 className="text-lg font-bold text-foreground">
                Un investissement, pas une dépense
              </h2>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Ce qu’on va construire ensemble n’est pas un coût qui disparaît
              une fois payé : c’est ce qui va augmenter ta visibilité, et donc
              le nombre de clients ou de patients qui te trouvent. Un seul
              nouveau client ou patient qui te trouve grâce à ça peut suffire à
              rentabiliser l’investissement — et ça continue d’en amener après.
            </p>
          </div>

          <div className="mx-auto mt-6 grid max-w-xl gap-3 sm:grid-cols-3">
            {KEY_STATS.map((s) => (
              <div
                key={s.figure}
                className="rounded-2xl border border-white/5 bg-card/40 p-4 text-center shadow-card backdrop-blur"
              >
                <div className="text-2xl font-bold text-gradient">
                  {s.figure}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-10 text-sm text-muted-foreground">À très vite,</p>
          <p className="text-sm font-semibold text-foreground">Cha · PeakCL</p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
            >
              Retour à l’accueil <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="/portfolio"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-foreground hover:border-white/20"
            >
              Voir le portfolio
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
