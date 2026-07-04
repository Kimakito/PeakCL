import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Download, Star, TriangleAlert } from "lucide-react";
import { absUrl } from "@/seo/site";
import { peakclTestimonials } from "@/content/peakcl/testimonials";

const AGENDA_HELP_IMAGE = "/peakcl/assets/images/agenda-calendly.png";

export const Route = createFileRoute("/bienvenue")({
  head: () => ({
    meta: [
      { title: "Bienvenue · PeakCL" },
      {
        name: "description",
        content:
          "Pour confirmer ton appel et accéder aux ressources, suis les étapes ci‑dessous.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/bienvenue") },
    ],
    links: [{ rel: "canonical", href: absUrl("/bienvenue") }],
  }),
  component: BienvenuePage,
});

function BienvenuePage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="relative overflow-hidden px-6 pt-16 pb-20 text-center">
        <div className="pointer-events-none absolute top-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-[color-mix(in_oklab,var(--brand-violet)_18%,transparent)] blur-[120px]" />
        <div className="relative z-10 mx-auto max-w-3xl">
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-muted-foreground">
            Étape 3 · Après ton créneau Calendly
          </div>
          <div className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-[var(--brand-turquoise)]">
            <TriangleAlert className="h-4 w-4" />
            <span>Regarde cette page jusqu&apos;au bout.</span>
            <TriangleAlert className="h-4 w-4" />
          </div>

          <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl">
            Pour confirmer ton appel et accéder aux ressources, réalise les{" "}
            <span className="text-gradient">4 étapes</span> ci‑dessous
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Tu as réservé ton diagnostic : parcours les preuves et les guides
            avant notre rendez‑vous. Si tu ne complètes pas ces étapes, je serai
            obligée d&apos;annuler notre appel.
          </p>
          <div className="mt-8">
            <a
              href="#ressources"
              className="inline-flex items-center justify-center rounded-full bg-primary-gradient px-7 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
              data-event="cta_go_resources_bienvenue"
            >
              Accéder aux ressources
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-3xl space-y-16 px-6 pb-24">
        {/* Step 1 */}
        <section>
          <div className="mb-6 flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-gradient text-sm font-bold text-primary-foreground">
              1
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                Qui je suis, ce que je fais
              </h2>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-card/30 p-6 shadow-card">
            <p className="text-base leading-relaxed text-foreground/90">
              Je m&apos;appelle Charlotte, fondatrice de PeakCL. J&apos;aide les
              indépendants et petites entreprises à structurer leur activité
              pour attirer des clients sans s&apos;épuiser : site web, système
              de prospection, image de marque, outils : j&apos;adapte
              l&apos;accompagnement à ce qui te fait vraiment avancer, pas une
              formule unique.
            </p>
            <p className="mt-3 text-base leading-relaxed text-foreground/90">
              Notre appel sert à comprendre où tu en es et ce qui bloque, pour
              te proposer un plan concret, pas un pitch générique. À très vite !
            </p>
          </div>
        </section>

        {/* Step 2 */}
        <section>
          <div className="mb-6 flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-gradient text-sm font-bold text-primary-foreground">
              2
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                Ajoute le rendez‑vous à ton agenda
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Quand tu reçois l&apos;invitation, clique sur “Je connais cet
                expéditeur” puis confirme pour l&apos;ajouter à ton calendrier.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-card/30 shadow-card">
            <img
              src={AGENDA_HELP_IMAGE}
              alt="Aide agenda - confirmation du rendez-vous"
              className="h-auto w-full"
            />
          </div>
        </section>

        {/* Step 3 */}
        <section>
          <div className="mb-6 flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-gradient text-sm font-bold text-primary-foreground">
              3
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                Regarde des résultats clients
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Quelques retours récents de clients PeakCL (site, clarté,
                conversion).
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {peakclTestimonials.map((t) => (
              <div
                key={t.name}
                className="h-full rounded-2xl border border-white/10 bg-card/30 p-6 shadow-card"
              >
                <div className="flex gap-1 text-[var(--brand-yellow)]">
                  {Array.from({ length: t.rating }).map((_, k) => (
                    <Star key={k} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-foreground/90">
                  “{t.quote}”
                </p>
                <div className="mt-6 border-t border-white/10 pt-4">
                  <div className="text-sm font-semibold text-foreground">
                    {t.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {[t.sourceLabel, t.dateLabel].filter(Boolean).join(" · ")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Step 4 */}
        <section id="ressources">
          <div className="mb-6 flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-gradient text-sm font-bold text-primary-foreground">
              4
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                Récupère les ressources
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Télécharge les guides et garde‑les sous la main avant notre
                rendez‑vous.
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-card/30 shadow-card">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[color-mix(in_oklab,var(--brand-violet)_18%,transparent)] via-transparent to-[color-mix(in_oklab,var(--brand-turquoise)_12%,transparent)]" />
            <div className="relative p-6">
              <div className="grid gap-3">
                {[
                  {
                    title: "1 · Pourquoi tu n'as pas de clients",
                    href: "/ressources-systeme",
                  },
                  {
                    title: "2 · Pourquoi ton site ne convertit pas",
                    href: "/ressources-site",
                  },
                  {
                    title: "3 · Pourquoi on ne te fait pas confiance",
                    href: "/ressources-confiance",
                  },
                  {
                    title: "Bonus · Ton site, machine à clients",
                    href: "/ressources-conversion",
                  },
                  {
                    title: "5 · Stratégie réseaux sociaux",
                    href: "/ressources-reseaux",
                  },
                ].map((r) => (
                  <a
                    key={r.href}
                    href={r.href}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-foreground hover:border-white/20"
                    data-event="resource_open"
                  >
                    <span className="flex items-center gap-2">
                      <Download className="h-4 w-4 text-muted-foreground" />
                      {r.title}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Ouvrir
                    </span>
                  </a>
                ))}
              </div>

              <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-xs text-muted-foreground">
                  45 min · visio · sans engagement
                </div>
                <div className="text-xs text-muted-foreground">
                  Ressources personnalisées pour ton appel
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
