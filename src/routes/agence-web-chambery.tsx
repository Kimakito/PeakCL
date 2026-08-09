import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/seo/site";
import { breadcrumbJsonLd, faqPageJsonLd, localBusinessJsonLd } from "@/seo/jsonld";
import { GeoLanding, geoLandingFaq } from "@/components/GeoLanding";

export const Route = createFileRoute("/agence-web-chambery")({
  head: () => ({
    meta: [
      // Les deux requêtes GSC de cette page (« agence web chambéry » et
      // « création site internet chambéry ») étaient absentes du title, qui
      // parlait de « site web » : 0 clic pour ~33e position. Le title les
      // reprend maintenant mot pour mot.
      { title: "Agence web à Chambéry · Création de site internet (Savoie)" },
      {
        name: "description",
        content:
          "Agence web à Chambéry : création de site internet premium, rapide et optimisé pour le référencement local. Pensé pour générer des prises de contact. Audit gratuit sous 24h.",
      },
      { property: "og:title", content: "Agence web à Chambéry · Création de site internet" },
      {
        property: "og:description",
        content:
          "Agence web à Chambéry : création de site internet premium et SEO local. Audit gratuit sous 24h.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/agence-web-chambery") },
      {
        "script:ld+json": breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Chambéry", path: "/agence-web-chambery" },
        ]),
      },
      { "script:ld+json": faqPageJsonLd(geoLandingFaq("Chambéry", "Savoie", "site internet")) },
      {
        "script:ld+json": localBusinessJsonLd({
          city: "Chambéry",
          region: "Savoie",
          path: "/agence-web-chambery",
          description:
            "Agence web à Chambéry : création de site internet, refonte et référencement local pour indépendants, professions libérales et commerces du bassin chambérien.",
          nearbyCities: ["Aix-les-Bains", "La Motte-Servolex", "Saint-Alban-Leysse", "Montmélian"],
          services: [
            "Agence web Chambéry",
            "Création de site internet Chambéry",
            "Refonte de site web",
            "Référencement local (SEO)",
          ],
        }),
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
      serviceLabel="site internet"
      intro="Un site internet premium, rapide et structuré pour convertir les visiteurs chambériens en prises de contact."
      angleTitle="Pour être choisi, il faut d'abord être trouvé."
      angleText="L'objectif : une page Chambéry qui se positionne sur Google, rassure avec des preuves, et envoie vers un appel à l'action clair. Chambéry est un marché actif, une présence en ligne nette fait la différence."
      localExample={{
        text: "Exemple concret à Chambéry : le site du Laboratoire Sanchez Randon, prothésiste dentaire, conçu pour inspirer confiance et faciliter la prise de contact des professionnels de santé du bassin chambérien.",
        linkLabel: "Voir le portfolio",
        linkHref: "/portfolio",
      }}
      seoSection={{
        title: "Création de site internet à Chambéry : être visible sur votre bassin",
        text: "Chambéry est le bassin le plus concurrentiel de Savoie : préfecture, université, zones d'activité de Bissy et de Savoie Technolac. Y ouvrir un site ne suffit pas, il faut apparaître sur les recherches locales. Chaque site que je livre part avec des balises title et méta rédigées une par une, une structure de contenu hiérarchisée, un maillage vers vos pages de service et des temps de chargement tenus. On travaille aussi votre fiche Google Business Profile, qui pèse lourd sur les recherches « près de moi » du secteur chambérien.",
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
