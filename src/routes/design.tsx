import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/seo/site";
import { ServicePage } from "@/components/ServicePage";
import { design } from "@/content/peakcl/services";

export const Route = createFileRoute("/design")({
  head: () => ({
    meta: [
      { title: "Design graphique & identité visuelle en Savoie · PeakCL" },
      {
        name: "description",
        content:
          "Logo, charte graphique, supports print et visuels réseaux sociaux : une marque cohérente et mémorable. Sur devis.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/design") },
    ],
    links: [{ rel: "canonical", href: absUrl("/design") }],
  }),
  component: () => (
    <ServicePage
      eyebrow="Design graphique"
      title="Design graphique"
      tagline="Une identité visuelle et des supports qui rendent votre marque cohérente et mémorable."
      intro={
        <div className="rounded-2xl border border-white/10 bg-card/40 p-6 shadow-card backdrop-blur">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-yellow)]">
            Certifiée
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Prestations réalisées dans le cadre de la certification{" "}
            <span className="text-foreground">RS7068 « Créer des supports de communication avec un outil de design graphique »</span>.
          </p>
        </div>
      }
      sectionTitle="🎨 Prestations design"
      sectionSubtitle="Identité visuelle et supports pour une marque cohérente sur tous vos points de contact."
      items={design}
    />
  ),
});
