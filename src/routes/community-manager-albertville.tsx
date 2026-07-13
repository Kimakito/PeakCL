import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/seo/site";
import { serviceJsonLd, breadcrumbJsonLd, faqPageJsonLd } from "@/seo/jsonld";
import { CommunityLanding, communityFaq } from "@/components/CommunityLanding";

export const Route = createFileRoute("/community-manager-albertville")({
  head: () => ({
    meta: [
      { title: "Community manager à Albertville · PeakCL" },
      {
        name: "description",
        content:
          "Community manager à Albertville : déléguez vos réseaux sociaux à Charlotte (PeakCL). Visuels brandés, rédaction et stratégie, formules mensuelles sans engagement.",
      },
      { property: "og:title", content: "Community manager à Albertville · PeakCL" },
      {
        property: "og:description",
        content:
          "Déléguez vos réseaux sociaux à une community manager formée, à Albertville. Formules mensuelles, sans engagement.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/community-manager-albertville") },
      {
        "script:ld+json": serviceJsonLd({
          name: "Community management à Albertville",
          description:
            "Gestion de réseaux sociaux pour indépendants et petites structures à Albertville : visuels brandés, rédaction, stratégie et publications régulières.",
          serviceType: "Community management",
          path: "/community-manager-albertville",
          areaServed: [{ "@type": "City", name: "Albertville" }],
        }),
      },
      {
        "script:ld+json": breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Community manager Albertville", path: "/community-manager-albertville" },
        ]),
      },
      { "script:ld+json": faqPageJsonLd(communityFaq("Albertville", "Savoie")) },
    ],
    links: [{ rel: "canonical", href: absUrl("/community-manager-albertville") }],
  }),
  component: () => (
    <CommunityLanding
      city="Albertville"
      region="Savoie"
      intro="Déléguez vos réseaux sociaux à une community manager formée, basée juste à côté, à Gilly-sur-Isère. Une présence régulière et cohérente avec votre site et votre image, sans y passer vos soirées."
      angleTitle="Community management à Albertville : local et cohérent"
      angleText="Le tissu albertvillois est fait d'indépendants, d'artisans et de commerces qui n'ont pas le temps d'alimenter Instagram ou Facebook chaque semaine. Je prends le relais avec des visuels à vos couleurs et une ligne éditoriale claire, pensés pour donner envie de vous contacter. Étant à quelques minutes d'Albertville, je peux aussi vous rencontrer pour les shootings ou les temps forts."
      nearby={[
        { name: "Chambéry", href: "/community-manager-chambery" },
        { name: "Annecy", href: "/community-manager-annecy" },
        { name: "Aix-les-Bains", href: "/community-manager-aix-les-bains" },
        { name: "Site web à Albertville", href: "/agence-web-albertville" },
      ]}
    />
  ),
});
