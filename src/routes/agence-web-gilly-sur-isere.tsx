import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/seo/site";
import { breadcrumbJsonLd, faqPageJsonLd } from "@/seo/jsonld";
import { GeoLanding, geoLandingFaq } from "@/components/GeoLanding";

export const Route = createFileRoute("/agence-web-gilly-sur-isere")({
  head: () => ({
    meta: [
      { title: "Création de site internet à Gilly‑sur‑Isère · PeakCL" },
      {
        name: "description",
        content:
          "Création & refonte de sites web à Gilly‑sur‑Isère, près d’Albertville. Site rapide, clair, pensé pour générer des prises de contact. Audit gratuit sous 24h.",
      },
      { property: "og:title", content: "Création de site internet à Gilly‑sur‑Isère · PeakCL" },
      {
        property: "og:description",
        content: "Création & refonte de sites web à Gilly‑sur‑Isère. Audit gratuit sous 24h.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/agence-web-gilly-sur-isere") },
      {
        "script:ld+json": breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Gilly‑sur‑Isère", path: "/agence-web-gilly-sur-isere" },
        ]),
      },
      { "script:ld+json": faqPageJsonLd(geoLandingFaq("Gilly-sur-Isère", "Savoie", "site internet")) },
    ],
    links: [{ rel: "canonical", href: absUrl("/agence-web-gilly-sur-isere") }],
  }),
  component: Page,
});

function Page() {
  return (
    <GeoLanding
      city="Gilly-sur-Isère"
      region="Savoie"
      serviceLabel="site internet"
      intro="Un site premium, rapide et structuré pour convertir les visiteurs en prises de contact, localement et partout en France."
      angleTitle="Être visible sur « création de site internet Gilly-sur-Isère »."
      angleText="Pour remonter sur Google, il faut une page dédiée, avec une intention claire, un contenu utile (pas du blabla) et des signaux de confiance : portfolio, avis, performance. Juste à côté d'Albertville, je suis sur place."
      localExample={{
        text: "Avantage à Gilly-sur-Isère : je suis basée ici même, dans la zone d'Albertville. Pas d'agence lointaine ni d'interlocuteur qui change — vous travaillez directement avec la personne qui code, dessine et gère vos réseaux, avec la possibilité de se rencontrer sur place en Savoie.",
      }}
      nearby={[
        { name: "Albertville", href: "/agence-web-albertville" },
        { name: "Chambéry", href: "/agence-web-chambery" },
        { name: "Aix-les-Bains", href: "/agence-web-aix-les-bains" },
        { name: "Annecy", href: "/agence-web-annecy" },
      ]}
    />
  );
}

