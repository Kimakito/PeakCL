import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/seo/site";
import { ServicePage } from "@/components/ServicePage";
import { community, cmForfaits } from "@/content/peakcl/services";

export const Route = createFileRoute("/community-management")({
  head: () => ({
    meta: [
      { title: "Community management en Savoie · PeakCL" },
      {
        name: "description",
        content:
          "Stratégie et contenus réseaux sociaux : forfaits mensuels, audit, contenu à la carte et formation. Rester visible sans y passer vos soirées. Sur devis.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/community-management") },
    ],
    links: [{ rel: "canonical", href: absUrl("/community-management") }],
  }),
  component: () => (
    <ServicePage
      avatarCard="reseaux"
      eyebrow="Réseaux sociaux"
      title="Community management"
      tagline="Rester visible et cohérent sur vos réseaux, sans y passer vos soirées. Des forfaits clairs, sans engagement long."
      forfaits={cmForfaits}
      forfaitsTitle="📱 Forfaits mensuels"
      forfaitsNote="Tarifs HT · révisions du visuel incluses · option +1 réseau supplémentaire disponible. Sans engagement de durée."
      sectionTitle="À la carte & accompagnement"
      sectionSubtitle="Besoin ponctuel ou envie d’autonomie : audit, contenus à l’unité et formation."
      items={community}
      showPrices
    />
  ),
});
