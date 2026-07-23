import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { absUrl } from "@/seo/site";

export const Route = createFileRoute("/cadrage/pascale/merci")({
  head: () => ({
    meta: [
      { title: "Questionnaire envoyé · PeakCL" },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:url", content: absUrl("/cadrage/pascale/merci") },
    ],
  }),
  component: MerciCadragePascalePage,
});

function MerciCadragePascalePage() {
  return (
    <main className="min-h-screen border-t border-border">
      <section className="relative overflow-hidden bg-hero py-24">
        <div className="grid-bg absolute inset-0 -z-10" />
        <div className="mx-auto max-w-2xl px-6 text-center">
          <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-[var(--brand-turquoise)]">
            <Check className="h-6 w-6" />
          </div>
          <h1 className="mt-6 text-balance text-3xl font-bold md:text-4xl">
            Merci Pascale.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Ton questionnaire de cadrage est bien reçu. Je le parcours
            attentivement et je reviens vers toi si une précision est nécessaire
            avant la refonte de ton site.
          </p>
          <p className="mt-6 text-sm text-muted-foreground">Cha · PeakCL</p>
        </div>
      </section>
    </main>
  );
}
