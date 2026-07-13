import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/seo/site";
import { serviceJsonLd, breadcrumbJsonLd, faqPageJsonLd } from "@/seo/jsonld";
import { CommunityLanding, communityFaq } from "@/components/CommunityLanding";

export const Route = createFileRoute("/community-manager-aix-les-bains")({
  head: () => ({
    meta: [
      { title: "Community manager à Aix-les-Bains · PeakCL" },
      {
        name: "description",
        content:
          "Community manager à Aix-les-Bains : déléguez vos réseaux sociaux à Charlotte (PeakCL). Visuels brandés, rédaction et stratégie, formules mensuelles sans engagement.",
      },
      { property: "og:title", content: "Community manager à Aix-les-Bains · PeakCL" },
      {
        property: "og:description",
        content:
          "Déléguez vos réseaux sociaux à une community manager formée, pour votre activité à Aix-les-Bains. Formules mensuelles, sans engagement.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/community-manager-aix-les-bains") },
      {
        "script:ld+json": serviceJsonLd({
          name: "Community management à Aix-les-Bains",
          description:
            "Gestion de réseaux sociaux pour indépendants et petites structures à Aix-les-Bains : visuels brandés, rédaction, stratégie et publications régulières.",
          serviceType: "Community management",
          path: "/community-manager-aix-les-bains",
          areaServed: [{ "@type": "City", name: "Aix-les-Bains" }],
        }),
      },
      {
        "script:ld+json": breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Community manager Aix-les-Bains", path: "/community-manager-aix-les-bains" },
        ]),
      },
      { "script:ld+json": faqPageJsonLd(communityFaq("Aix-les-Bains", "Savoie")) },
    ],
    links: [{ rel: "canonical", href: absUrl("/community-manager-aix-les-bains") }],
  }),
  component: () => (
    <CommunityLanding
      city="Aix-les-Bains"
      region="Savoie"
      intro="Une gestion de réseaux sociaux régulière et à votre image pour votre activité aixoise, par une community manager qui maîtrise aussi votre site et votre identité visuelle. Vous déléguez, la cohérence suit."
      angleTitle="Community management à Aix-les-Bains : capter une clientèle de passage"
      angleText="Entre thermalisme, lac et tourisme, Aix-les-Bains vit beaucoup de sa clientèle de passage : bien-être, restauration, hébergement, commerces. Des réseaux actifs et rassurants font souvent la différence au moment du choix. Je construis cette présence régulière, alignée sur votre site et votre logo, pour transformer les curieux en clients. Pilotage à distance, avec un point mensuel clair."
      nearby={[
        { name: "Chambéry", href: "/community-manager-chambery" },
        { name: "Annecy", href: "/community-manager-annecy" },
        { name: "Albertville", href: "/community-manager-albertville" },
        { name: "Site web à Aix-les-Bains", href: "/agence-web-aix-les-bains" },
      ]}
    />
  ),
});
