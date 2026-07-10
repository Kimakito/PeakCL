import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { ArrowRight, Calendar, Check, Video } from "lucide-react";
import { CalendlyEmbed } from "@/components/CalendlyEmbed";
import {
  BIENVENUE_PATH,
  CALENDLY_R1_URL,
  buildCalendlyUrl,
  readCalendlyPrefill,
  readCalendlyPrefillFromSearch,
} from "@/lib/funnel";
import { absUrl } from "@/seo/site";

export const Route = createFileRoute("/merci-brief")({
  head: () => ({
    meta: [
      { title: "Réservez votre appel · PeakCL" },
      {
        name: "description",
        content:
          "Questionnaire reçu. Choisissez votre créneau pour le diagnostic (45 min), puis accède aux ressources avant l’appel.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/merci-brief") },
    ],
    links: [{ rel: "canonical", href: absUrl("/merci-brief") }],
  }),
  component: MerciBriefPage,
});

function MerciBriefPage() {
  const calendlyUrl = useMemo(() => {
    const fromSearch =
      typeof window !== "undefined" ? readCalendlyPrefillFromSearch(window.location.search) : {};
    const fromSession = readCalendlyPrefill();
    return buildCalendlyUrl(CALENDLY_R1_URL, {
      name: fromSearch.name || fromSession.name,
      email: fromSearch.email || fromSession.email,
    });
  }, []);

  return (
    <main className="min-h-screen border-t border-white/5">
      <section className="relative overflow-hidden bg-hero py-20">
        <div className="grid-bg absolute inset-0 -z-10" />
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-[var(--brand-turquoise)]">
            <Check className="h-6 w-6" />
          </div>
          <h1 className="mt-6 text-balance text-4xl font-bold md:text-5xl">C’est reçu.</h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Dernière étape avant l’appel : réservez votre créneau de <span className="font-semibold text-foreground">45 minutes</span>{" "}
            (diagnostic, sans engagement). Après la réservation, vous accéderez à la page avec la vidéo et les ressources à
            préparer.
          </p>

          <ol className="mx-auto mt-8 flex max-w-lg flex-col gap-2 text-left text-sm">
            <li className="flex items-center gap-3 rounded-xl border border-[color-mix(in_oklab,var(--brand-turquoise)_35%,transparent)] bg-white/5 px-4 py-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-gradient text-xs font-bold text-primary-foreground">
                ✓
              </span>
              <span className="text-foreground">Questionnaire envoyé</span>
            </li>
            <li className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-4 py-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-gradient text-xs font-bold text-primary-foreground">
                2
              </span>
              <span className="font-semibold text-foreground">Choisissez votre créneau ci‑dessous</span>
            </li>
            <li className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-muted-foreground">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 text-xs font-bold">
                3
              </span>
              <span className="flex items-center gap-2">
                <Video className="h-4 w-4 shrink-0" />
                Vidéo + ressources sur {BIENVENUE_PATH}
              </span>
            </li>
          </ol>
        </div>
      </section>

      <section className="border-t border-white/5 py-12">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-bold text-foreground">Réserver mon diagnostic (R1)</h2>
              <p className="mt-1 text-sm text-muted-foreground">Visio · 45 min · gratuit · sans engagement</p>
            </div>
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-foreground hover:border-white/20"
              data-event="cta_calendly_merci_brief_tab"
            >
              <Calendar className="h-4 w-4" />
              Ouvrir dans un nouvel onglet
            </a>
          </div>

          <CalendlyEmbed url={calendlyUrl} />

          <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-muted-foreground">
            Après confirmation du créneau, vous serez redirigé·e vers la page{" "}
            <a href={BIENVENUE_PATH} className="font-semibold text-[var(--brand-turquoise)] hover:text-foreground">
              bienvenue
            </a>{" "}
            (vidéo, preuves clients, guides). Si la redirection ne se fait pas, utilise le lien dans l’email Calendly ou
            clique ci‑dessous.
          </p>

          <div className="mt-6 flex justify-center">
            <a
              href={BIENVENUE_PATH}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-foreground hover:border-white/20"
              data-event="cta_bienvenue_manual"
            >
              J'ai réservé : accéder aux ressources <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
