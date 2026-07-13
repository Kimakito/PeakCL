import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/seo/site";
import { serviceJsonLd, breadcrumbJsonLd, faqPageJsonLd } from "@/seo/jsonld";
import { CommunityLanding, communityFaq } from "@/components/CommunityLanding";

export const Route = createFileRoute("/community-manager-chambery")({
  head: () => ({
    meta: [
      { title: "Community manager à Chambéry · PeakCL" },
      {
        name: "description",
        content:
          "Community manager à Chambéry : déléguez vos réseaux sociaux à Charlotte (PeakCL). Visuels brandés, rédaction et stratégie, formules mensuelles sans engagement.",
      },
      { property: "og:title", content: "Community manager à Chambéry · PeakCL" },
      {
        property: "og:description",
        content:
          "Déléguez vos réseaux sociaux à une community manager formée, pour votre activité à Chambéry. Formules mensuelles, sans engagement.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/community-manager-chambery") },
      {
        "script:ld+json": serviceJsonLd({
          name: "Community management à Chambéry",
          description:
            "Gestion de réseaux sociaux pour indépendants et petites structures à Chambéry : visuels brandés, rédaction, stratégie et publications régulières.",
          serviceType: "Community management",
          path: "/community-manager-chambery",
          areaServed: [{ "@type": "City", name: "Chambéry" }],
        }),
      },
      {
        "script:ld+json": breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Community manager Chambéry", path: "/community-manager-chambery" },
        ]),
      },
      { "script:ld+json": faqPageJsonLd(communityFaq("Chambéry", "Savoie")) },
    ],
    links: [{ rel: "canonical", href: absUrl("/community-manager-chambery") }],
  }),
  component: () => (
    <CommunityLanding
      city="Chambéry"
      region="Savoie"
      intro="Une présence sur les réseaux sociaux régulière et à votre image, gérée par une community manager qui maîtrise aussi votre site et votre identité visuelle. Vous gardez votre temps, vos réseaux avancent."
      angleTitle="Community management à Chambéry : sortir du lot"
      angleText="Chambéry concentre commerces, professions libérales et jeunes structures qui se disputent l'attention sur Instagram et LinkedIn. Se démarquer demande une ligne éditoriale nette et des visuels reconnaissables, pas des posts au hasard. Je construis cette régularité pour vous, alignée sur votre site et votre logo, et je pilote tout à distance avec un point mensuel simple."
      nearby={[
        { name: "Aix-les-Bains", href: "/community-manager-aix-les-bains" },
        { name: "Albertville", href: "/community-manager-albertville" },
        { name: "Annecy", href: "/community-manager-annecy" },
        { name: "Site web à Chambéry", href: "/agence-web-chambery" },
      ]}
    />
  ),
});
