import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { absUrl } from "@/seo/site";

export const Route = createFileRoute("/merci-brief")({
  head: () => ({
    meta: [
      { title: "Bien reçu — PeakCL" },
      {
        name: "description",
        content: "Brief bien reçu. Réponse sous 48h ouvrées.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/merci-brief") },
    ],
    links: [{ rel: "canonical", href: absUrl("/merci-brief") }],
  }),
  component: MerciBriefPage,
});

function MerciBriefPage() {
  return (
    <main className="min-h-screen border-t border-white/5">
      <section className="relative overflow-hidden bg-hero py-24">
        <div className="grid-bg absolute inset-0 -z-10" />
        <div className="mx-auto max-w-2xl px-6 text-center">
          <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-[var(--brand-turquoise)]">
            <Check className="h-6 w-6" />
          </div>
          <h1 className="mt-6 text-balance text-4xl font-bold md:text-5xl">Bien reçu. Merci !</h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            J’ai bien reçu ton brief. Je le lis attentivement et je reviens vers toi sous 48h ouvrées avec :
            <br />— soit un devis détaillé directement,
            <br />— soit une proposition de rendez‑vous de 20 min si certains points méritent qu’on en parle de vive voix.
          </p>
          <p className="mt-6 text-sm text-muted-foreground">À très vite,</p>
          <p className="text-sm font-semibold text-foreground">Cha — PeakCL</p>

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

