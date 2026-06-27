import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/seo/site";
import { breadcrumbJsonLd } from "@/seo/jsonld";
import { GeoLanding } from "@/components/GeoLanding";

export const Route = createFileRoute("/agence-web-albertville")({
  head: () => ({
    meta: [
      { title: "Création de site web / site internet à Albertville · PeakCL" },
      {
        name: "description",
        content:
          "Création & refonte de sites web (sites internet) premium à Albertville. Un site rapide, clair et pensé pour générer des prises de contact. Audit gratuit sous 24h.",
      },
      { property: "og:title", content: "Création de site web à Albertville · PeakCL" },
      {
        property: "og:description",
        content:
          "Création & refonte de sites web premium à Albertville. Audit gratuit sous 24h.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/agence-web-albertville") },
      {
        "script:ld+json": breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Albertville", path: "/agence-web-albertville" },
        ]),
      },
    ],
    links: [{ rel: "canonical", href: absUrl("/agence-web-albertville") }],
  }),
  component: Page,
});

function Page() {
  return (
    <GeoLanding
      city="Albertville"
      region="Savoie"
      serviceLabel="site internet"
      intro="Un site premium (site internet), rapide et structuré pour convertir les visiteurs locaux en prises de contact."
      angleTitle="Pourquoi une page Albertville ?"
      angleText="Pour être trouvée quand quelqu'un cherche « création site web Albertville », et pour rassurer avec une offre claire, locale et orientée résultats. Basée à Albertville, je connais le tissu d'indépendants et d'artisans local."
      localExample={{
        text: "Exemple concret : pour La Vieille Roue (Jantes 73), artisan automobile à Albertville, j'ai conçu un site vitrine clair avec un travail de SEO local pour capter les recherches du bassin albertvillois.",
        linkLabel: "Voir le portfolio",
        linkHref: "/portfolio",
      }}
      nearby={[
        { name: "Gilly-sur-Isère", href: "/agence-web-gilly-sur-isere" },
        { name: "Chambéry", href: "/agence-web-chambery" },
        { name: "Aix-les-Bains", href: "/agence-web-aix-les-bains" },
        { name: "Annecy", href: "/agence-web-annecy" },
      ]}
    />
  );
}

