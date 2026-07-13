import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/seo/site";
import { breadcrumbJsonLd, faqPageJsonLd } from "@/seo/jsonld";
import { GeoLanding, geoLandingFaq } from "@/components/GeoLanding";

export const Route = createFileRoute("/agence-web-ugine")({
  head: () => ({
    meta: [
      { title: "Création de site internet à Ugine (Savoie) · PeakCL" },
      {
        name: "description",
        content:
          "Création de site internet à Ugine : sites premium avec référencement SEO local inclus. Basée juste à côté, à Gilly-sur-Isère. Audit gratuit sous 24h.",
      },
      { property: "og:title", content: "Création de site internet à Ugine · PeakCL" },
      {
        property: "og:description",
        content:
          "Site internet et SEO local pour les commerces et artisans d'Ugine. Audit gratuit sous 24h.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/agence-web-ugine") },
      {
        "script:ld+json": breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Ugine", path: "/agence-web-ugine" },
        ]),
      },
      { "script:ld+json": faqPageJsonLd(geoLandingFaq("Ugine", "Savoie", "site internet")) },
    ],
    links: [{ rel: "canonical", href: absUrl("/agence-web-ugine") }],
  }),
  component: Page,
});

function Page() {
  return (
    <GeoLanding
      city="Ugine"
      region="Savoie"
      serviceLabel="site internet"
      intro="Un site premium, rapide et clair pour les commerces, artisans et indépendants uginois, pensé pour transformer les recherches locales en prises de contact."
      angleTitle="Pourquoi une page Ugine ?"
      angleText="Pour ressortir quand un habitant du bassin cherche « création site internet Ugine », sans se noyer parmi des agences lointaines. Basée à Gilly-sur-Isère, à quelques minutes d'Ugine, je connais le tissu local entre vallée de l'Arly et Albertville : commerces de centre-ville, artisans et petites structures qui ont besoin d'une présence en ligne nette."
      seoSection={{
        title: "Être visible à Ugine avant vos concurrents",
        text: "Chaque site part sur des bases de référencement local propres : balises titres et méta cohérentes, structure de contenu claire, maillage interne et temps de chargement optimisé. Objectif : que votre activité uginoise apparaisse quand vos clients cherchent vos services, pas seulement votre nom.",
      }}
      nearby={[
        { name: "Albertville", href: "/agence-web-albertville" },
        { name: "Gilly-sur-Isère", href: "/agence-web-gilly-sur-isere" },
        { name: "Beaufort", href: "/agence-web-beaufort" },
        { name: "Moûtiers", href: "/agence-web-moutiers" },
      ]}
    />
  );
}
