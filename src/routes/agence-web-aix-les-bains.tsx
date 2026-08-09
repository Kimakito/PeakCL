import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/seo/site";
import { breadcrumbJsonLd, faqPageJsonLd, localBusinessJsonLd } from "@/seo/jsonld";
import { GeoLanding, geoLandingFaq } from "@/components/GeoLanding";

export const Route = createFileRoute("/agence-web-aix-les-bains")({
  head: () => ({
    meta: [
      // « agence wordpress aix-les-bains » remonte en impressions sans aucun
      // clic : le mot WordPress n'apparaissait nulle part sur la page. Il est
      // légitime ici — une partie du portfolio est livrée sous WordPress.
      { title: "Agence web & WordPress à Aix-les-Bains (Savoie) · PeakCL" },
      {
        name: "description",
        content:
          "Agence web à Aix-les-Bains : création de site WordPress ou sur-mesure, avec référencement local. Vous gardez la main sur votre site. Audit gratuit sous 24h.",
      },
      { property: "og:title", content: "Agence web & WordPress à Aix-les-Bains · PeakCL" },
      {
        property: "og:description",
        content:
          "Agence web à Aix-les-Bains : site WordPress ou sur-mesure, optimisé SEO local. Audit gratuit sous 24h.",
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
      {
        "script:ld+json": localBusinessJsonLd({
          city: "Aix-les-Bains",
          region: "Savoie",
          path: "/agence-web-aix-les-bains",
          description:
            "Agence web à Aix-les-Bains : création de site WordPress ou codé sur mesure et référencement local pour commerces, hébergeurs et indépendants du bassin aixois.",
          nearbyCities: ["Chambéry", "Le Bourget-du-Lac", "Grésy-sur-Aix", "Rumilly"],
          services: [
            "Agence web Aix-les-Bains",
            "Agence WordPress Aix-les-Bains",
            "Création de site WordPress",
            "Site codé sur mesure",
            "Référencement local (SEO)",
          ],
        }),
      },
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
      headline={
        <>
          Agence web & WordPress à <span className="text-gradient">Aix-les-Bains</span>
        </>
      }
      intro="Un site WordPress ou codé sur mesure, rapide et structuré pour convertir les visiteurs locaux en prises de contact."
      angleTitle="Local, mais premium."
      angleText="Une page locale sert à attirer des recherches ciblées (Aix-les-Bains + service) et à convertir vite avec une offre claire et un design haut de gamme. Idéal pour les indépendants et commerces qui veulent une image à la hauteur de leur travail."
      localExample={{
        text: "À Aix-les-Bains, l'économie locale vit beaucoup du tourisme, du thermalisme et des commerces de proximité autour du lac du Bourget : autant d'activités où une image en ligne soignée et une fiche Google complète font la différence sur des clients qui comparent avant de réserver. Je conçois des sites pensés pour ce réflexe.",
      }}
      seoSection={{
        title: "Agence WordPress à Aix-les-Bains : reprendre la main sur votre site",
        text: "WordPress ou sur-mesure, je ne vends pas une chapelle : je choisis selon votre besoin d'autonomie. WordPress si vous voulez publier vos actualités, vos offres de saison ou vos tarifs sans me rappeler — je construis le site, je le sécurise, je vous forme et je vous laisse les clés. Sur-mesure si la performance et l'originalité priment. Dans les deux cas, même exigence : balises rédigées une par une, structure claire, chargement rapide et fiche Google Business Profile travaillée pour les recherches du bassin aixois.",
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
