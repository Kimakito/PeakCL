import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/seo/site";
import { serviceJsonLd, breadcrumbJsonLd } from "@/seo/jsonld";
import { ServicePage } from "@/components/ServicePage";
import { community, cmForfaits, communityHighlights } from "@/content/peakcl/services";

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
      {
        "script:ld+json": serviceJsonLd({
          name: "Community management",
          description:
            "Stratégie et contenus réseaux sociaux : forfaits mensuels, audit, contenu à la carte et formation, pour les indépendants et TPE de Savoie et Haute-Savoie.",
          serviceType: "Community management",
          path: "/community-management",
        }),
      },
      {
        "script:ld+json": breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Services", path: "/services" },
          { name: "Community management", path: "/community-management" },
        ]),
      },
    ],
    links: [{ rel: "canonical", href: absUrl("/community-management") }],
  }),
  component: () => (
    <ServicePage
      heroImage={{ src: "/peakcl/assets/images/iphone.webp", alt: "Contenus réseaux sociaux affichés sur un iPhone" }}
      eyebrow="Réseaux sociaux"
      title="Community management"
      tagline="Rester visible et cohérent sur vos réseaux, sans y passer vos soirées. Des forfaits clairs, sans engagement long."
      highlights={communityHighlights}
      highlightsTitle="Ce que je gère pour vos réseaux"
      highlightsSubtitle="Une présence régulière et à votre image, sans que ça vous mange vos soirées."
      forfaits={cmForfaits}
      forfaitsTitle="📱 Forfaits mensuels"
      forfaitsNote="Tarifs HT · révisions du visuel incluses · option +1 réseau supplémentaire disponible. Sans engagement de durée."
      sectionTitle="À la carte & accompagnement"
      sectionSubtitle="Besoin ponctuel ou envie d’autonomie : audit, contenus à l’unité et formation."
      items={community}
      showPrices
      socials={[
        {
          handle: "la_communaute_des_9_poilus",
          url: "https://www.instagram.com/la_communaute_des_9_poilus/",
          name: "La Communauté des 9 Poilus",
          desc: "La vie en Savoie d’une tribu de neuf : 2 humains, 6 chats, 2 chevaux et 1 chien. Contenus du quotidien, ton chaleureux et animation de la communauté.",
        },
        {
          handle: "haltere_ego_c",
          url: "https://www.instagram.com/haltere_ego_c/",
          name: "Haltère Ego",
          desc: "Vivre avec l’endométriose par le sport : CrossFit, équitation, course à pied et Hyrox. Témoignage, sensibilisation et publications régulières.",
        },
        {
          handle: "lesmondesdejbl",
          url: "https://www.facebook.com/lesmondesdejbl",
          name: "Les Mondes de JBL",
          platform: "facebook",
          desc: "Page d’un écrivain : premier roman paru, deuxième en écriture. Animation de la communauté de lecteurs et actualités autour de ses univers.",
        },
      ]}
      socialsTitle="📲 Des comptes que j’anime"
      socialsSubtitle="En attendant vos projets, voici deux comptes que je gère au quotidien pour garder la main : rythme de publication, visuels et animation de communauté."
    />
  ),
});
