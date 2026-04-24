import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { absUrl } from "@/seo/site";

export const Route = createFileRoute("/merci")({
  head: () => ({
    meta: [
      { title: "Merci — PeakCL" },
      {
        name: "description",
        content: "Merci pour votre message. Réponse sous 24h.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/merci") },
    ],
    links: [{ rel: "canonical", href: absUrl("/merci") }],
  }),
  component: MerciPage,
});

function MerciPage() {
  return (
    <main className="min-h-screen border-t border-white/5">
      <section className="relative overflow-hidden bg-hero py-24">
        <div className="grid-bg absolute inset-0 -z-10" />
        <div className="mx-auto max-w-2xl px-6 text-center">
          <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-[var(--brand-turquoise)]">
            <Check className="h-6 w-6" />
          </div>
          <h1 className="mt-6 text-balance text-4xl font-bold md:text-5xl">Merci.</h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Votre demande d’audit est bien envoyée. Je vous réponds sous 24h avec des recommandations concrètes.
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

