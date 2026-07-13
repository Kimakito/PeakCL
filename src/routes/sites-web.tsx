import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/seo/site";
import { serviceJsonLd, breadcrumbJsonLd } from "@/seo/jsonld";
import { ServicePage } from "@/components/ServicePage";
import { sitesWeb, sitesWebHighlights } from "@/content/peakcl/services";

export const Route = createFileRoute("/sites-web")({
  head: () => ({
    meta: [
      { title: "Création de sites web sur mesure en Savoie · PeakCL" },
      {
        name: "description",
        content:
          "Sites vitrines, e-commerce et refontes : des sites web custom, rapides et optimisés SEO, avec un accompagnement de bout en bout. Sur devis.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/sites-web") },
      {
        "script:ld+json": serviceJsonLd({
          name: "Création de site web sur mesure",
          description:
            "Sites vitrines, e-commerce et refontes : des sites web custom, rapides et optimisés pour le référencement local en Savoie et Haute-Savoie.",
          serviceType: "Création de site internet",
          path: "/sites-web",
        }),
      },
      {
        "script:ld+json": breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Services", path: "/services" },
          { name: "Sites web", path: "/sites-web" },
        ]),
      },
    ],
    links: [{ rel: "canonical", href: absUrl("/sites-web") }],
  }),
  component: () => (
    <ServicePage
      heroImage={{ src: "/peakcl/assets/images/bureau-peakcl.webp", alt: "Bureau PeakCL avec un site web affiché à l’écran" }}
      eyebrow="Développement web"
      title="Sites web sur mesure"
      tagline="Sites vitrines, e-commerce et refontes : rapides, optimisés et pensés pour convertir vos visiteurs en clients."
      highlights={sitesWebHighlights}
      highlightsTitle="Ce que j’apporte à votre site"
      highlightsSubtitle="Un site rapide, bien référencé et pensé pour convertir, sur tous les écrans."
      sectionTitle="💻 Prestations sites web"
      sectionSubtitle="Sites custom, personnalisés selon le client, avec accompagnement de bout en bout."
      items={sitesWeb}
      portfolioLink={{ to: "/portfolio", label: "Voir mes réalisations web" }}
    />
  ),
});
