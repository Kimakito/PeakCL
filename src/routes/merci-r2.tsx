import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, Star, TrendingUp } from "lucide-react";
import { absUrl } from "@/seo/site";
import { peakclTestimonials } from "@/content/peakcl/testimonials";
import { peakclFaq } from "@/content/peakcl/faq";
import { GlowingEffect } from "@/components/ui/glowing-effect";

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

const ROADMAP_STEPS = [
  {
    n: "1",
    title: "Audit",
    text: "On regarde ensemble ce qui existe déjà (site, réseaux, visibilité Google) et ce qu'il manque pour atteindre votre objectif.",
  },
  {
    n: "2",
    title: "Squelette",
    text: "Je structure une première version : message, contenu, parcours. La base avant la forme.",
  },
  {
    n: "3",
    title: "Validation",
    text: "Vous regardez, vous réagissez, vous dites ce qui vous ressemble ou pas. Rien n'avance sans votre feu vert.",
  },
  {
    n: "4",
    title: "Optimisation à deux",
    text: "On ajuste ensemble textes, visuels et détails. Votre avis compte à chaque étape, pas juste à la fin.",
  },
  {
    n: "5",
    title: "Livraison",
    text: "Mise en ligne, dernières vérifications, et transmission de tout ce qu'il faut pour être autonome (ou pour déléguer, si vous préférez).",
  },
];

const FAQ_HIGHLIGHTS_QUESTIONS = [
  "Combien de temps faut‑il pour créer un site (et le mettre vraiment en ligne) ?",
  "Je n’ai pas le temps de préparer le contenu. On fait comment ?",
  "Comment savoir si mon site “fonctionne” ?",
  "Est‑ce que je serai autonome après ?",
  "En quoi consiste l’accompagnement réseaux sociaux ?",
  "Qui crée les visuels et les textes des publications ?",
];

const faqHighlights = FAQ_HIGHLIGHTS_QUESTIONS.map((q) =>
  peakclFaq.find((f) => f.question === q),
).filter((f): f is (typeof peakclFaq)[number] => Boolean(f));

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
            J’ai bien reçu vos réponses. Je prépare notre prochain appel avec ça
            en tête ! En attendant, voici comment on va travailler ensemble.
          </p>

          <div className="relative mx-auto mt-10 max-w-xl rounded-2xl border border-white/10 bg-card/40 p-6 text-left shadow-card backdrop-blur">
            <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
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
              une fois payé : c’est ce qui va augmenter votre visibilité, et donc
              le nombre de clients ou de patients qui vous trouvent. Un seul
              nouveau client ou patient qui vous trouve grâce à ça peut suffire à
              rentabiliser l’investissement; et ça continue d’en amener après.
            </p>
          </div>

          <div className="mx-auto mt-6 grid max-w-xl gap-3 sm:grid-cols-3">
            {KEY_STATS.map((s) => (
              <div
                key={s.figure}
                className="relative rounded-2xl border border-white/5 bg-card/40 p-4 text-center shadow-card backdrop-blur"
              >
                <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
                <div className="text-2xl font-bold text-gradient">
                  {s.figure}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-turquoise)]">
              La méthode
            </span>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              Un accompagnement, pas une livraison à l’aveugle.
            </h2>
            <p className="mt-4 text-muted-foreground">
              À chaque étape, vous voyez, vous validez, vous ajustez. Rien n’est figé
              tant que vous ne vous y reconnaissez pas.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {ROADMAP_STEPS.map((step) => (
              <div
                key={step.n}
                className="relative rounded-2xl border border-white/5 bg-card/40 p-5 shadow-card backdrop-blur"
              >
                <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
                <div className="text-3xl font-bold text-gradient">{step.n}</div>
                <div className="mt-2 text-sm font-bold text-foreground">
                  {step.title}
                </div>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-turquoise)]">
              Ils en parlent mieux que moi
            </span>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              Des résultats, pas des promesses.
            </h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {peakclTestimonials.map((t) => (
              <div
                key={t.name}
                className="relative rounded-2xl border border-white/5 bg-card/50 p-5 shadow-card"
              >
                <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
                <div className="flex gap-1 text-[var(--brand-yellow)]">
                  {Array.from({ length: t.rating }).map((_, k) => (
                    <Star key={k} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-foreground/90">
                  "{t.quote}"
                </p>
                <div className="mt-4 border-t border-white/5 pt-3">
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {[t.sourceLabel, t.dateLabel].filter(Boolean).join(" · ")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 py-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-turquoise)]">
              Questions fréquentes
            </span>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              On lève les derniers doutes.
            </h2>
          </div>
          <div className="mt-10 space-y-2">
            {faqHighlights.map((f) => (
              <details
                key={f.question}
                className="group rounded-2xl border border-white/5 bg-card/50 p-4 shadow-card open:bg-card/70"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-sm font-semibold">
                  {f.question}
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/10 text-[var(--brand-turquoise)] transition-transform group-open:rotate-45 text-base">
                    +
                  </span>
                </summary>
                <p
                  className="mt-3 text-xs leading-relaxed text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: f.answerHtml }}
                />
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 py-20 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-turquoise)]">
            Mon engagement
          </span>
          <h2 className="mt-4 text-3xl font-bold md:text-4xl">
            Pas de chiffre magique promis.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Je ne vous garantis pas un chiffre d’affaires : personne ne le devrait
            honnêtement. Ce que je m’engage à faire : t’écouter vraiment,
            avancer avec vous à chaque étape, et livrer un résultat dans lequel
            vous vous reconnaissez.
          </p>

          <p className="mt-10 text-sm text-muted-foreground">À très vite,</p>
          <p className="text-sm font-semibold text-foreground">
            Charlotte · PeakCL
          </p>

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
