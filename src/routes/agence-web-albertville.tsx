import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/seo/site";
import { breadcrumbJsonLd, faqPageJsonLd } from "@/seo/jsonld";
import { GeoLanding, geoLandingFaq } from "@/components/GeoLanding";

export const Route = createFileRoute("/agence-web-albertville")({
  head: () => ({
    meta: [
      { title: "Agence web à Albertville : création de site internet · PeakCL" },
      {
        name: "description",
        content:
          "Agence web à Albertville : création de sites internet premium avec référencement SEO local inclus. Rapide, clair, pensé pour générer des prises de contact.",
      },
      { property: "og:title", content: "Agence web à Albertville · PeakCL" },
      {
        property: "og:description",
        content:
          "Agence web à Albertville : création de sites internet et référencement SEO local. Audit gratuit sous 24h.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/agence-web-albertville") },
      {
        "script:ld+json": breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Albertville", path: "/agence-web-albertville" },
        ]),
      },
      { "script:ld+json": faqPageJsonLd(geoLandingFaq("Albertville", "Savoie", "site internet")) },
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
      angleText="Pour être trouvée quand quelqu'un cherche « création site web Albertville », et pour rassurer avec une offre claire, locale et orientée résultats. Basée à Gilly-sur-Isère, juste à côté, je connais le tissu d'indépendants et d'artisans du bassin albertvillois."
      localExample={{
        text: "Exemple concret : pour La Vieille Roue (Jantes 73), artisan automobile à Albertville, j'ai conçu un site vitrine clair avec un travail de SEO local pour capter les recherches du bassin albertvillois.",
        linkLabel: "Voir le portfolio",
        linkHref: "/portfolio",
      }}
      seoSection={{
        title: "Agence SEO à Albertville : être trouvée avant vos concurrents",
        text: "Au-delà du design, chaque site est construit avec des bases de référencement local propres : balises titres et méta cohérentes, structure de contenu claire, maillage vers vos pages clés et temps de chargement optimisé. L'objectif : que votre agence ou activité albertvilloise apparaisse quand vos clients potentiels cherchent vos services à Albertville, pas seulement votre nom.",
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

