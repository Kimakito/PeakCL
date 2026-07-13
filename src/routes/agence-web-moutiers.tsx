import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/seo/site";
import { breadcrumbJsonLd, faqPageJsonLd } from "@/seo/jsonld";
import { GeoLanding, geoLandingFaq } from "@/components/GeoLanding";

export const Route = createFileRoute("/agence-web-moutiers")({
  head: () => ({
    meta: [
      { title: "Création de site internet à Moûtiers (Tarentaise) · PeakCL" },
      {
        name: "description",
        content:
          "Création de site internet à Moûtiers et en Tarentaise : sites premium optimisés SEO local, pour commerces, saisonniers et hébergeurs. Audit gratuit sous 24h.",
      },
      { property: "og:title", content: "Création de site internet à Moûtiers · PeakCL" },
      {
        property: "og:description",
        content:
          "Site internet et SEO local pour les activités de Moûtiers et de la Tarentaise. Audit gratuit sous 24h.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/agence-web-moutiers") },
      {
        "script:ld+json": breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Moûtiers", path: "/agence-web-moutiers" },
        ]),
      },
      { "script:ld+json": faqPageJsonLd(geoLandingFaq("Moûtiers", "Savoie", "site internet")) },
    ],
    links: [{ rel: "canonical", href: absUrl("/agence-web-moutiers") }],
  }),
  component: Page,
});

function Page() {
  return (
    <GeoLanding
      city="Moûtiers"
      region="Savoie"
      serviceLabel="site internet"
      intro="Un site premium et rapide pour les commerces, hébergeurs et indépendants de Moûtiers et de la Tarentaise, pensé pour capter une clientèle locale comme saisonnière."
      angleTitle="Pourquoi une page Moûtiers ?"
      angleText="Moûtiers est la porte d'entrée des stations de Tarentaise : commerces de centre-ville, artisans, hébergeurs et services y vivent au rythme des saisons. Un site clair et bien référencé permet d'être trouvé toute l'année, par les habitants comme par les visiteurs de passage. Basée à Gilly-sur-Isère, à trente minutes, je connais la vallée et ses besoins."
      seoSection={{
        title: "Capter les recherches locales et saisonnières",
        text: "Balises titres et méta cohérentes, structure de contenu claire, maillage interne et pages rapides sur mobile : les bases du référencement local pour ressortir sur « site internet Moûtiers » et les requêtes de vos services, pas seulement sur votre nom.",
      }}
      nearby={[
        { name: "Albertville", href: "/agence-web-albertville" },
        { name: "Ugine", href: "/agence-web-ugine" },
        { name: "Beaufort", href: "/agence-web-beaufort" },
        { name: "Gilly-sur-Isère", href: "/agence-web-gilly-sur-isere" },
      ]}
    />
  );
}
