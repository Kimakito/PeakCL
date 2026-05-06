import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { absUrl } from "@/seo/site";
import { useEffect } from "react";

const TARGET = "/bienvenue";

function Redirect() {
  useEffect(() => {
    window.location.replace(TARGET);
  }, []);

  return null;
}

export const Route = createFileRoute("/bienvenue-strategie")({
  head: () => ({
    meta: [
      { title: "Redirection — PeakCL" },
      {
        name: "robots",
        content: "noindex, nofollow",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/bienvenue-strategie") },
    ],
    links: [{ rel: "canonical", href: absUrl(TARGET) }],
  }),
  component: BienvenueStrategiePage,
});

function BienvenueStrategiePage() {
  return (
    <main className="min-h-screen border-t border-white/5">
      <section className="relative overflow-hidden bg-hero py-20">
        <div className="grid-bg absolute inset-0 -z-10" />
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-muted-foreground">
            <CheckCircle2 className="h-4 w-4 text-[var(--brand-turquoise)]" />
            Redirection…
          </div>
          <Redirect />
        </div>
      </section>
    </main>
  );
}

