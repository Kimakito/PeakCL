import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowRight, Check, CheckCircle2, Download } from "lucide-react";
import { absUrl } from "@/seo/site";

const BOOKING_URL = "https://calendly.com/peakcl73/45min";
const WISTIA_MEDIA_ID = "26i532zvqr";

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
        content: "Bienvenue. Regarde la vidéo, télécharge les ressources, puis réserve ton point stratégie si tu veux qu’on avance vite.",
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
            Bienvenue
          </div>

          <h1 className="mx-auto mt-6 text-balance text-4xl font-bold leading-tight md:text-5xl">
            Voilà la suite (simple, rapide, efficace)
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            1) Regarde la vidéo (VSL) ci‑dessous.
            <br />
            2) Télécharge les ressources PDF.
            <br />
            3) Si tu veux qu’on avance vite: réserve ton point stratégie.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-gradient px-7 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
              data-event="cta_booking_bienvenue"
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
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid gap-8 md:grid-cols-2 md:items-start">
            <div className="rounded-3xl border border-white/10 bg-card/20 p-6 shadow-card">
              <h2 className="text-xl font-bold">VSL (vidéo)</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Cette vidéo pose le cadre et prétraite les objections principales. Regarde‑la avant de réserver.
              </p>
              <WistiaVideo mediaId={WISTIA_MEDIA_ID} />
            </div>

            <div className="rounded-3xl border border-white/10 bg-card/20 p-6 shadow-card">
              <h2 className="text-xl font-bold">Ressources PDF</h2>
              <p className="mt-2 text-sm text-muted-foreground">Télécharge les guides et garde‑les sous la main.</p>

              <div className="mt-5 grid gap-3">
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
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-white/10 bg-card/20 p-6 shadow-card">
            <h2 className="text-xl font-bold">Prochaine étape</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Si tu te reconnais dans la problématique et que tu veux une reco claire, priorisée, et actionnable:
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-gradient px-7 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
                data-event="cta_booking_bienvenue_bottom"
              >
                Réserver mon point stratégie <ArrowRight className="h-4 w-4" />
              </a>
              <span className="text-xs text-muted-foreground">45 min · visio · sans engagement</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

