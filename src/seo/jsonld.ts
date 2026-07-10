import { absUrl } from "@/seo/site";

export type JsonLd = Record<string, unknown>;

export function organizationJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PeakCL",
    url: absUrl("/"),
    logo: absUrl("/peakcl/PeakCL.svg"),
    email: "peakcl73@gmail.com",
    sameAs: ["https://www.linkedin.com/in/charlotte-lacroix-peakcl/"],
  };
}

export function professionalServiceJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": absUrl("/#business"),
    name: "PeakCL · Charlotte Lacroix",
    description:
      "Création et refonte de sites web, identité visuelle (logo) et community management pour indépendants et petites structures, à Albertville et en Savoie.",
    url: absUrl("/"),
    logo: absUrl("/peakcl/PeakCL.svg"),
    image: absUrl("/peakcl/PeakCL.svg"),
    email: "peakcl73@gmail.com",
    telephone: "+33743517627",
    priceRange: "€€",
    founder: {
      "@type": "Person",
      name: "Charlotte Lacroix",
    },
    address: {
      "@type": "PostalAddress",
      // Établissement de service : pas de rue affichée (cohérent avec la fiche Google en zone masquée)
      addressLocality: "Gilly-sur-Isère",
      postalCode: "73200",
      addressRegion: "Savoie",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      // Coordonnées approximatives de Gilly-sur-Isère — à affiner si besoin
      latitude: 45.6608,
      longitude: 6.3736,
    },
    areaServed: [
      { "@type": "City", name: "Albertville" },
      { "@type": "City", name: "Gilly-sur-Isère" },
      { "@type": "City", name: "Chambéry" },
      { "@type": "City", name: "Annecy" },
      { "@type": "City", name: "Aix-les-Bains" },
      { "@type": "AdministrativeArea", name: "Savoie" },
      { "@type": "AdministrativeArea", name: "Haute-Savoie" },
      { "@type": "Country", name: "France" },
    ],
    knowsAbout: [
      "Création de site internet",
      "Refonte de site web",
      "Identité visuelle",
      "Création de logo",
      "Community management",
      "SEO local",
    ],
    sameAs: [
      "https://www.instagram.com/peakcl73/",
      "https://www.facebook.com/PeakCL73/",
      "https://www.linkedin.com/in/charlotte-lacroix-peakcl/",
      "https://github.com/PeakCL",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "4",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        author: { "@type": "Person", name: "Victor G." },
        reviewBody:
          "Un immense merci à Charlotte pour le travail exceptionnel réalisé sur le site internet d'Adelante Voyage. Toute l'équipe est absolument ravie du résultat ! Elle a parfaitement su comprendre nos attentes et même les dépasser.",
      },
      {
        "@type": "Review",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        author: { "@type": "Person", name: "Mathilde T." },
        datePublished: "2026-05",
        reviewBody:
          "Je ne peux que recommander Charlotte. Très professionnelle, elle a vite cerné mes besoins et proposé de supers versions de site, ainsi qu'un logo bien plus dynamique et moderne. 100% satisfaite !",
      },
      {
        "@type": "Review",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        author: { "@type": "Person", name: "Céline G." },
        datePublished: "2026-03",
        reviewBody:
          "Cela faisait des mois que je repoussais la création de mon site. Le 1er jet m'a bluffée car je me suis entièrement reconnue. Très réactive sur tous les ajustements. C'est parfait !",
      },
      {
        "@type": "Review",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        author: { "@type": "Person", name: "Camille Daldosso" },
        datePublished: "2026-06",
        reviewBody:
          "Depuis le temps que je repoussais la création de mon site, je suis plus que ravie de cette collaboration avec PeakCL. Un grand merci à Charlotte pour sa réactivité, son expertise et ses conseils. Elle a parfaitement cerné mes besoins. Je ne peux que la recommander.",
      },
    ],
  };
}

export function faqPageJsonLd(items: Array<{ question: string; answerHtml: string }>): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.question,
      acceptedAnswer: {
        "@type": "Answer",
        // Keep as text to avoid embedded HTML in JSON-LD
        text: i.answerHtml.replace(/<[^>]*>/g, ""),
      },
    })),
  };
}

export function breadcrumbJsonLd(crumbs: Array<{ name: string; path: string }>): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: c.name,
      item: absUrl(c.path),
    })),
  };
}

