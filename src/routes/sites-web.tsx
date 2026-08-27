import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/seo/site";
import { SiteShowcase, type ShowcaseSite } from "@/components/ui/site-showcase";
import { DECK_PROJECTS } from "@/content/peakcl/portfolioDeck";
import { hreflangLinks } from "@/seo/hreflang";
import { serviceJsonLd, breadcrumbJsonLd } from "@/seo/jsonld";
import { ServicePage } from "@/components/ServicePage";
import { sitesWeb, sitesWebHighlights } from "@/content/peakcl/services";

/**
 * Vitrine de la page : cinq sites livres, un par famille de metier ciblee.
 *
 * Derive de `DECK_PROJECTS` et jamais retape a la main. En saisissant les URL
 * moi-meme, j'avais deja ecrit « adelante-voyages.fr » au lieu de
 * « adelantevoyages.fr » : un lien mort sur une vitrine dont le seul role est
 * de prouver que les sites existent. Les captures sont celles du portfolio,
 * environ 55 Ko chacune, et seule la premiere se charge en `eager`.
 */
const SHOWCASE_SLUGS = [
  "cime-strategie",
  "sp-renovation",
  "sanchez-randon",
  "adelante",
  "le-juste-plan",
] as const;

const SHOWCASE: ShowcaseSite[] = SHOWCASE_SLUGS.map((slug) => {
  const project = DECK_PROJECTS.find((p) => p.slug === slug);
  if (!project?.shot || !project.siteUrl) {
    throw new Error(`sites-web : projet « ${slug} » introuvable, sans capture ou sans URL`);
  }
  return {
    id: project.slug,
    name: project.title,
    metier: project.subtitle ?? "",
    url: project.siteUrl,
    image: project.shot,
  };
});

export const Route = createFileRoute("/sites-web")({
  head: () => ({
    meta: [
      { title: "Création de sites web sur mesure en Savoie · PeakCL" },
      {
        name: "description",
        content:
          "Sites vitrines, e-commerce et refontes : des sites web sur mesure, rapides et optimisés SEO, à partir de 2 000 € HT. Mini-audit gratuit avant devis.",
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
          audience:
            "Indépendants, thérapeutes, artisans, commerces et TPE, en création comme en refonte.",
          // Reprend le catalogue reellement affiche sur la page : les donnees
          // structurees decrivent ce que le visiteur voit, pas une offre ideale.
          offers: sitesWeb.map((o) => ({ title: o.title, desc: o.desc, price: o.price })),
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
    links: [{ rel: "canonical", href: absUrl("/sites-web") }, ...hreflangLinks("/sites-web")],
  }),
  component: () => (
    <ServicePage
      showPrices
      heroImage={{
        src: "/peakcl/assets/images/bureau-peakcl.webp",
        alt: "Bureau PeakCL avec un site web affiché à l’écran",
      }}
      showcase={<SiteShowcase sites={SHOWCASE} />}
      eyebrow="Développement web"
      title="Sites web sur mesure"
      tagline="Sites vitrines, e-commerce et refontes pour thérapeutes, artisans et indépendants de Savoie : rapides, bien référencés et pensés pour transformer un visiteur en rendez-vous ou en devis."
      facts={{
        audience:
          "Indépendants, thérapeutes, artisans, commerces et TPE, en création comme en refonte.",
        area: "Savoie et Haute-Savoie sur place, partout en France à distance (visio).",
        delay:
          "3 à 5 semaines pour un site vitrine, 4 à 7 semaines pour une boutique en ligne, 1 à 2 semaines pour une landing page.",
        pricing:
          "Site vitrine sur mesure 2 000 €, WordPress à partir de 2 500 €, e-commerce à partir de 3 800 €, refonte à partir de 1 200 €, landing page à partir de 800 €. Tarifs HT, devis précis sous 48h ouvrées après l'appel de cadrage. Le mini-audit préalable est gratuit.",
        process: [
          "Appel de diagnostic gratuit pour comprendre l'activité et l'objectif",
          "Devis précis et planning sous 48h ouvrées",
          "Maquettage et validation avant toute ligne de code",
          "Développement, rédaction et intégration des contenus",
          "Mise en ligne, optimisation SEO et indexation",
          "Support inclus après livraison (1 à 3 mois selon l'offre)",
        ],
        excludes:
          "la rédaction juridique (CGV, mentions légales) au-delà des modèles fournis, la photographie professionnelle, et l'achat de licences tierces (thèmes premium, banques d'images).",
      }}
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
