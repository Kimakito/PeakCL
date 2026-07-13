import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/seo/site";
import { breadcrumbJsonLd, faqPageJsonLd } from "@/seo/jsonld";
import { GeoLanding, geoLandingFaq } from "@/components/GeoLanding";

export const Route = createFileRoute("/agence-web-aix-les-bains")({
  head: () => ({
    meta: [
      { title: "Création de site web à Aix-les-Bains (Savoie) · PeakCL" },
      {
        name: "description",
        content:
          "Création & refonte de sites web premium à Aix-les-Bains. Un site rapide, clair et pensé pour générer des prises de contact. Audit gratuit sous 24h.",
      },
      { property: "og:title", content: "Création de site web à Aix-les-Bains · PeakCL" },
      {
        property: "og:description",
        content:
          "Création & refonte de sites web premium à Aix-les-Bains. Audit gratuit sous 24h.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/agence-web-aix-les-bains") },
      {
        "script:ld+json": breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Aix-les-Bains", path: "/agence-web-aix-les-bains" },
        ]),
      },
      { "script:ld+json": faqPageJsonLd(geoLandingFaq("Aix-les-Bains", "Savoie", "site web")) },
    ],
    links: [{ rel: "canonical", href: absUrl("/agence-web-aix-les-bains") }],
  }),
  component: Page,
});

function Page() {
  return (
    <GeoLanding
      city="Aix-les-Bains"
      region="Savoie"
      intro="Un site premium, rapide et structuré pour convertir les visiteurs locaux en prises de contact."
      angleTitle="Local, mais premium."
      angleText="Une page locale sert à attirer des recherches ciblées (Aix-les-Bains + service) et à convertir vite avec une offre claire et un design haut de gamme. Idéal pour les indépendants et commerces qui veulent une image à la hauteur de leur travail."
      localExample={{
        text: "À Aix-les-Bains, l'économie locale vit beaucoup du tourisme, du thermalisme et des commerces de proximité autour du lac du Bourget : autant d'activités où une image en ligne soignée et une fiche Google complète font la différence sur des clients qui comparent avant de réserver. Je conçois des sites pensés pour ce réflexe.",
      }}
      nearby={[
        { name: "Chambéry", href: "/agence-web-chambery" },
        { name: "Albertville", href: "/agence-web-albertville" },
        { name: "Annecy", href: "/agence-web-annecy" },
        { name: "Gilly-sur-Isère", href: "/agence-web-gilly-sur-isere" },
      ]}
    />
  );
}

