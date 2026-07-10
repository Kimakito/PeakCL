import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/seo/site";
import { ServicePage } from "@/components/ServicePage";
import { sitesWeb } from "@/content/peakcl/services";

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
    ],
    links: [{ rel: "canonical", href: absUrl("/sites-web") }],
  }),
  component: () => (
    <ServicePage
      avatarCard="sites-web"
      eyebrow="Développement web"
      title="Sites web sur mesure"
      tagline="Sites vitrines, e-commerce et refontes : rapides, optimisés et pensés pour convertir vos visiteurs en clients."
      sectionTitle="💻 Prestations sites web"
      sectionSubtitle="Sites custom, personnalisés selon le client, avec accompagnement de bout en bout."
      items={sitesWeb}
    />
  ),
});
