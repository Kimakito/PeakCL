import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/seo/site";
import { breadcrumbJsonLd, faqPageJsonLd } from "@/seo/jsonld";
import { GeoLanding, geoLandingFaq } from "@/components/GeoLanding";

export const Route = createFileRoute("/agence-web-beaufort")({
  head: () => ({
    meta: [
      { title: "Création de site internet à Beaufort (Beaufortain) · PeakCL" },
      {
        name: "description",
        content:
          "Création de site internet à Beaufort et dans le Beaufortain : sites premium optimisés SEO local pour producteurs, artisans et hébergeurs. Audit gratuit sous 24h.",
      },
      { property: "og:title", content: "Création de site internet à Beaufort · PeakCL" },
      {
        property: "og:description",
        content:
          "Site internet et SEO local pour les activités de Beaufort et du Beaufortain. Audit gratuit sous 24h.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/agence-web-beaufort") },
      {
        "script:ld+json": breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Beaufort", path: "/agence-web-beaufort" },
        ]),
      },
      { "script:ld+json": faqPageJsonLd(geoLandingFaq("Beaufort", "Savoie", "site internet")) },
    ],
    links: [{ rel: "canonical", href: absUrl("/agence-web-beaufort") }],
  }),
  component: Page,
});

function Page() {
  return (
    <GeoLanding
      city="Beaufort"
      region="Savoie"
      serviceLabel="site internet"
      intro="Un site premium et rapide pour les producteurs, artisans et hébergeurs du Beaufortain, pensé pour valoriser un savoir-faire local et capter les visiteurs de la vallée."
      angleTitle="Pourquoi une page Beaufort ?"
      angleText="Le Beaufortain vit de son terroir et de son tourisme de montagne : producteurs, artisans, gîtes et activités de plein air y ont tout à gagner d'une vitrine en ligne soignée. Un site clair et bien référencé fait la différence quand un visiteur cherche un hébergement ou un produit local avant de monter dans la vallée. Basée à Gilly-sur-Isère, je travaille avec les acteurs du bassin albertvillois et du Beaufortain."
      seoSection={{
        title: "Valoriser un savoir-faire local en ligne",
        text: "Balises titres et méta cohérentes, contenu structuré, maillage interne et pages rapides sur mobile : les fondations d'un référencement local propre pour ressortir sur « site internet Beaufort » et sur les recherches de vos produits et services.",
      }}
      nearby={[
        { name: "Albertville", href: "/agence-web-albertville" },
        { name: "Ugine", href: "/agence-web-ugine" },
        { name: "Moûtiers", href: "/agence-web-moutiers" },
        { name: "Gilly-sur-Isère", href: "/agence-web-gilly-sur-isere" },
      ]}
    />
  );
}
