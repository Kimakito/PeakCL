import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/seo/site";
import { breadcrumbJsonLd } from "@/seo/jsonld";
import { GeoLanding } from "@/components/GeoLanding";

export const Route = createFileRoute("/agence-web-chambery")({
  head: () => ({
    meta: [
      { title: "Création de site web à Chambéry (Savoie) · PeakCL" },
      {
        name: "description",
        content:
          "Création & refonte de sites web premium à Chambéry. Un site rapide, clair et pensé pour générer des prises de contact. Audit gratuit sous 24h.",
      },
      { property: "og:title", content: "Création de site web à Chambéry · PeakCL" },
      {
        property: "og:description",
        content:
          "Création & refonte de sites web premium à Chambéry. Audit gratuit sous 24h.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/agence-web-chambery") },
      {
        "script:ld+json": breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Chambéry", path: "/agence-web-chambery" },
        ]),
      },
    ],
    links: [{ rel: "canonical", href: absUrl("/agence-web-chambery") }],
  }),
  component: Page,
});

function Page() {
  return (
    <GeoLanding
      city="Chambéry"
      region="Savoie"
      intro="Un site premium, rapide et structuré pour convertir les visiteurs locaux en prises de contact."
      angleTitle="Pour être choisi, il faut d'abord être trouvé."
      angleText="L'objectif : une page Chambéry qui se positionne sur Google, rassure avec des preuves, et envoie vers un appel à l'action clair. Chambéry est un marché actif, une présence en ligne nette fait la différence."
      localExample={{
        text: "Exemple concret à Chambéry : le site du Laboratoire Sanchez Randon, prothésiste dentaire, conçu pour inspirer confiance et faciliter la prise de contact des professionnels de santé du bassin chambérien.",
        linkLabel: "Voir le portfolio",
        linkHref: "/portfolio",
      }}
      nearby={[
        { name: "Aix-les-Bains", href: "/agence-web-aix-les-bains" },
        { name: "Albertville", href: "/agence-web-albertville" },
        { name: "Annecy", href: "/agence-web-annecy" },
        { name: "Gilly-sur-Isère", href: "/agence-web-gilly-sur-isere" },
      ]}
    />
  );
}

