import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/seo/site";
import { breadcrumbJsonLd, faqPageJsonLd } from "@/seo/jsonld";
import { GeoLanding, geoLandingFaq } from "@/components/GeoLanding";

export const Route = createFileRoute("/agence-web-annecy")({
  head: () => ({
    meta: [
      { title: "Création de site web à Annecy (Haute‑Savoie) · PeakCL" },
      {
        name: "description",
        content:
          "Création & refonte de sites web premium à Annecy. Un site rapide, clair et pensé pour générer des prises de contact. Audit gratuit sous 24h.",
      },
      {
        property: "og:title",
        content: "Création de site web à Annecy · PeakCL",
      },
      {
        property: "og:description",
        content:
          "Création & refonte de sites web premium à Annecy. Audit gratuit sous 24h.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/agence-web-annecy") },
      {
        "script:ld+json": breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Annecy", path: "/agence-web-annecy" },
        ]),
      },
      {
        "script:ld+json": faqPageJsonLd(
          geoLandingFaq("Annecy", "Haute-Savoie", "site web"),
        ),
      },
    ],
    links: [{ rel: "canonical", href: absUrl("/agence-web-annecy") }],
  }),
  component: Page,
});

function Page() {
  return (
    <GeoLanding
      city="Annecy"
      region="Haute-Savoie"
      intro="Un site premium, rapide et structuré pour convertir les visiteurs locaux en prises de contact."
      angleTitle="Un site qui fait le tri."
      angleText="Annecy est concurrentiel : l'objectif est une page et une structure qui rassurent, positionnent haut de gamme, et transforment en demandes qualifiées. On vise la qualité du contact, pas seulement le volume de visites."
      localExample={{
        text: "Annecy concentre beaucoup d'indépendants, d'artisans et de prestataires haut de gamme : la concurrence en ligne y est plus forte qu'ailleurs en Haute-Savoie. Se démarquer passe par un site rapide, une identité nette et des signaux de confiance solides (avis, portfolio, performance), exactement ce que je construis avec mes clients.",
      }}
      nearby={[
        { name: "Aix-les-Bains", href: "/agence-web-aix-les-bains" },
        { name: "Chambéry", href: "/agence-web-chambery" },
        { name: "Albertville", href: "/agence-web-albertville" },
        { name: "Gilly-sur-Isère", href: "/agence-web-gilly-sur-isere" },
      ]}
    />
  );
}
