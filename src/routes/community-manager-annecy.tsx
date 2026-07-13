import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/seo/site";
import { serviceJsonLd, breadcrumbJsonLd, faqPageJsonLd } from "@/seo/jsonld";
import { CommunityLanding, communityFaq } from "@/components/CommunityLanding";

export const Route = createFileRoute("/community-manager-annecy")({
  head: () => ({
    meta: [
      { title: "Community manager à Annecy (Haute-Savoie) · PeakCL" },
      {
        name: "description",
        content:
          "Community manager à Annecy : déléguez vos réseaux sociaux à Charlotte (PeakCL). Visuels brandés, rédaction et stratégie, formules mensuelles sans engagement.",
      },
      { property: "og:title", content: "Community manager à Annecy · PeakCL" },
      {
        property: "og:description",
        content:
          "Déléguez vos réseaux sociaux à une community manager formée, pour votre activité à Annecy. Formules mensuelles, sans engagement.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/community-manager-annecy") },
      {
        "script:ld+json": serviceJsonLd({
          name: "Community management à Annecy",
          description:
            "Gestion de réseaux sociaux pour indépendants et petites structures à Annecy : visuels brandés, rédaction, stratégie et publications régulières.",
          serviceType: "Community management",
          path: "/community-manager-annecy",
          areaServed: [{ "@type": "City", name: "Annecy" }],
        }),
      },
      {
        "script:ld+json": breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Community manager Annecy", path: "/community-manager-annecy" },
        ]),
      },
      { "script:ld+json": faqPageJsonLd(communityFaq("Annecy", "Haute-Savoie")) },
    ],
    links: [{ rel: "canonical", href: absUrl("/community-manager-annecy") }],
  }),
  component: () => (
    <CommunityLanding
      city="Annecy"
      region="Haute-Savoie"
      intro="Des réseaux sociaux soignés et réguliers pour votre activité annécienne, gérés par une community manager qui pense aussi votre site et votre image. Une présence cohérente, sans y consacrer vos soirées."
      angleTitle="Community management à Annecy : une image à la hauteur"
      angleText="Annecy attire une clientèle exigeante et une forte concurrence visuelle : hôtellerie, bien-être, artisanat, tourisme. Sur ce marché, des visuels amateurs se remarquent tout de suite. Je vous apporte une identité réseaux nette, cohérente avec votre site et votre logo, et une régularité qui installe la confiance avant même le premier contact. Tout se pilote en visio, où que vous soyez dans le bassin annécien."
      nearby={[
        { name: "Aix-les-Bains", href: "/community-manager-aix-les-bains" },
        { name: "Chambéry", href: "/community-manager-chambery" },
        { name: "Albertville", href: "/community-manager-albertville" },
        { name: "Site web à Annecy", href: "/agence-web-annecy" },
      ]}
    />
  ),
});
