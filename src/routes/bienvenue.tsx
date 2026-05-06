import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowRight, CheckCircle2, Download, Star, TriangleAlert } from "lucide-react";
import { absUrl } from "@/seo/site";
import { peakclTestimonials } from "@/content/peakcl/testimonials";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const BOOKING_URL = "https://calendly.com/peakcl73/45min";
const WISTIA_MEDIA_ID = "26i532zvqr";
const AGENDA_HELP_IMAGE = "/peakcl/assets/images/agenda-calendly.png";

function WistiaVideo({ mediaId }: { mediaId: string }) {
  useEffect(() => {
    const ensureScript = (src: string, type?: string) => {
      const existing = document.querySelector(`script[src="${src}"]`);
      if (existing) return;
      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      if (type) s.type = type;
      document.head.appendChild(s);
    };

    ensureScript("https://fast.wistia.com/player.js");
    ensureScript(`https://fast.wistia.com/embed/${mediaId}.js`, "module");
  }, [mediaId]);

  return (
    <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-black/40">
      <style>{`
        wistia-player[media-id='${mediaId}']:not(:defined) {
          background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/${mediaId}/swatch');
          display: block;
          filter: blur(5px);
          padding-top: 56.25%;
        }
      `}</style>
      {/* @ts-expect-error - Custom element provided by Wistia */}
      <wistia-player media-id={mediaId} aspect="1.7777777777777777" />
    </div>
  );
}

export const Route = createFileRoute("/bienvenue")({
  head: () => ({
    meta: [
      { title: "Bienvenue — PeakCL" },
      {
        name: "description",
        content:
          "Pour confirmer ton appel et accéder aux ressources, suis les étapes ci‑dessous. (Vidéo + preuves + ressources)",
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
            Si tu ne complètes pas ces étapes, je serai obligée d&apos;annuler notre appel.
          </p>
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
              <h2 className="text-2xl font-bold text-foreground">Regarde la vidéo</h2>
              <p className="mt-1 text-sm text-muted-foreground">Regarde la VSL jusqu&apos;au bout avant ton rendez‑vous.</p>
            </div>
          </div>
          <WistiaVideo mediaId={WISTIA_MEDIA_ID} />
        </section>

        {/* Step 2 */}
        <section>
          <div className="mb-6 flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-gradient text-sm font-bold text-primary-foreground">
              2
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Ajoute le rendez‑vous à ton agenda</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Quand tu reçois l&apos;invitation, clique sur “Je connais cet expéditeur” puis confirme pour l&apos;ajouter à ton calendrier.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-card/30 shadow-card">
            <img src={AGENDA_HELP_IMAGE} alt="Aide agenda - confirmation du rendez-vous" className="h-auto w-full" />
          </div>
        </section>

        {/* Step 3 */}
        <section>
          <div className="mb-6 flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-gradient text-sm font-bold text-primary-foreground">
              3
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Regarde des résultats clients</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Quelques retours récents de clients PeakCL (site, clarté, conversion).
              </p>
            </div>
          </div>

          <div className="relative">
            <Carousel opts={{ align: "start", loop: true }}>
              <CarouselContent>
                {peakclTestimonials.map((t) => (
                  <CarouselItem key={t.name} className="md:basis-1/2">
                    <div className="h-full rounded-2xl border border-white/10 bg-card/30 p-6 shadow-card">
                      <div className="flex gap-1 text-[var(--brand-yellow)]">
                        {Array.from({ length: t.rating }).map((_, k) => (
                          <Star key={k} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-foreground/90">“{t.quote}”</p>
                      <div className="mt-6 border-t border-white/10 pt-4">
                        <div className="text-sm font-semibold text-foreground">{t.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {[t.sourceLabel, t.dateLabel].filter(Boolean).join(" · ")}
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="static mt-4 translate-y-0 border-white/10 bg-card text-foreground" />
              <CarouselNext className="static mt-4 translate-y-0 border-white/10 bg-card text-foreground" />
            </Carousel>
          </div>
        </section>

        {/* Step 4 */}
        <section>
          <div className="mb-6 flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-gradient text-sm font-bold text-primary-foreground">
              4
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Récupère les ressources</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Télécharge les guides et garde‑les sous la main avant notre rendez‑vous.
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-card/30 shadow-card">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[color-mix(in_oklab,var(--brand-violet)_18%,transparent)] via-transparent to-[color-mix(in_oklab,var(--brand-turquoise)_12%,transparent)]" />
            <div className="relative p-6">
              <div className="grid gap-3">
                {[
                  { title: "Guide 01 — Système", href: "/peakcl/assets/ressources/peakcl_guide01_systeme.pdf" },
                  { title: "Guide 02 — Site", href: "/peakcl/assets/ressources/peakcl_guide02_site.pdf" },
                  { title: "Guide 03 — Confiance", href: "/peakcl/assets/ressources/peakcl_guide03_confiance.pdf" },
                  { title: "Ressource — Conversion", href: "/peakcl/assets/peakcl_ressource_conversion.pdf" },
                ].map((r) => (
                  <a
                    key={r.href}
                    href={r.href}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-foreground hover:border-white/20"
                    target="_blank"
                    rel="noreferrer"
                    data-event="resource_pdf_open"
                  >
                    <span className="flex items-center gap-2">
                      <Download className="h-4 w-4 text-muted-foreground" />
                      {r.title}
                    </span>
                    <span className="text-xs text-muted-foreground">PDF</span>
                  </a>
                ))}
              </div>

              <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-xs text-muted-foreground">45 min · visio · sans engagement</div>
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-gradient px-7 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
                  data-event="cta_booking_bienvenue_bottom"
                >
                  Confirmer mon appel <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

