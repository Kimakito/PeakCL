import { absUrl } from "@/seo/site";

export type JsonLd = Record<string, unknown>;

/**
 * Identifiants stables du graphe d'entites.
 *
 * Toute reference d'une entite a une autre passe par ces @id plutot que par un
 * objet inline reduplique. Un moteur qui rencontre `{"@id": ".../#charlotte"}`
 * a deux endroits sait qu'il s'agit de la meme personne ; deux objets Person
 * identiques mais anonymes peuvent etre lus comme deux individus distincts.
 *
 * Le noeud entreprise n'est emis qu'UNE fois, par `professionalServiceJsonLd`.
 * Le site emettait auparavant en plus un noeud `Organization` sans @id decrivant
 * la meme societe : deux entites concurrentes pour une seule realite, ce qui
 * brouille exactement le lien PeakCL -> Charlotte Lacroix -> prestations que
 * l'on cherche a rendre evident.
 */
export const ENTITY_ID = {
  business: absUrl("/#business"),
  person: absUrl("/qui-suis-je#charlotte"),
} as const;

/** Profils officiels — memes URLs partout, c'est ce qui permet de corroborer l'entite. */
const SAME_AS = [
  "https://www.instagram.com/peakcl73/",
  "https://www.facebook.com/PeakCL73/",
  "https://www.linkedin.com/in/charlotte-lacroix-peakcl/",
  "https://github.com/PeakCL",
];

export function professionalServiceJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": ENTITY_ID.business,
    name: "PeakCL · Charlotte Lacroix",
    alternateName: "PeakCL",
    description:
      "Création et refonte de sites web, identité visuelle (logo) et community management pour indépendants et petites structures, à Albertville et en Savoie.",
    url: absUrl("/"),
    logo: absUrl("/peakcl/PeakCL.svg"),
    image: absUrl("/peakcl/PeakCL.svg"),
    email: "peakcl73@gmail.com",
    telephone: "+33743517627",
    priceRange: "€€",
    // Entreprise individuelle : la fondatrice EST l'unique intervenante. Le
    // triple lien founder/employee/vers l'@id Person rend explicite que
    // PeakCL et Charlotte Lacroix designent la meme realite operationnelle.
    founder: { "@id": ENTITY_ID.person },
    employee: { "@id": ENTITY_ID.person },
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
    sameAs: SAME_AS,
    // Les quatre prestations, rattachees par @id aux noeuds Service emis sur
    // leurs pages respectives : le graphe relie l'entreprise a son offre au
    // lieu de laisser chaque page isolee.
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Prestations PeakCL",
      itemListElement: [
        { "@id": `${absUrl("/sites-web")}#service` },
        { "@id": `${absUrl("/design")}#service` },
        { "@id": `${absUrl("/community-management")}#service` },
        { "@id": `${absUrl("/accompagnement-automatisation")}#service` },
      ],
    },
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

export function personJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": ENTITY_ID.person,
    name: "Charlotte Lacroix",
    url: absUrl("/qui-suis-je"),
    jobTitle: "Développeuse web & graphiste",
    image: absUrl("/peakcl/photo/charlotte-round-800.webp"),
    worksFor: { "@id": ENTITY_ID.business },
    founderOf: { "@id": ENTITY_ID.business },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Gilly-sur-Isère",
      postalCode: "73200",
      addressRegion: "Savoie",
      addressCountry: "FR",
    },
    knowsAbout: [
      "Création de site internet",
      "Refonte de site web",
      "Identité visuelle",
      "Création de logo",
      "Community management",
      "SEO local",
    ],
    sameAs: SAME_AS,
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

/** Zone desservie par défaut : villes et départements cibles pour le SEO local. */
export const DEFAULT_AREA_SERVED: JsonLd[] = [
  { "@type": "City", name: "Albertville" },
  { "@type": "City", name: "Gilly-sur-Isère" },
  { "@type": "City", name: "Chambéry" },
  { "@type": "City", name: "Annecy" },
  { "@type": "City", name: "Aix-les-Bains" },
  { "@type": "AdministrativeArea", name: "Savoie" },
  { "@type": "AdministrativeArea", name: "Haute-Savoie" },
];

/**
 * Schéma Service pour les pages prestation (sites web, logo, community management…).
 * `provider` pointe vers l'@id de la ProfessionalService pour lier les deux entités.
 */
export function serviceJsonLd(opts: {
  name: string;
  description: string;
  serviceType: string;
  path: string;
  areaServed?: JsonLd[];
  /** Clientèle visée — doit reprendre le « Pour qui » affiché sur la page. */
  audience?: string;
  /**
   * Offres du catalogue, telles qu'affichées. Les montants ne sont PAS repris :
   * les pages affichent « Sur devis » (showPrices=false), et un prix présent
   * dans le balisage mais absent de la page est une incohérence entre données
   * structurées et contenu visible.
   *
   * Les délais ne sont pas repris non plus. Schema.org n'a pas de propriété
   * juste pour « 3 à 5 semaines » sur un Service : `serviceOutput` décrit ce
   * que la prestation produit, pas son délai, et le détourner reviendrait à
   * publier une donnée structurée fausse. Le délai reste sur la page, où il
   * est lisible.
   */
  offers?: Array<{ title: string; desc: string }>;
}): JsonLd {
  const node: JsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    // @id stable : c'est cette ancre que référence le hasOfferCatalog de
    // l'entreprise. Changer la forme ici casse le lien du graphe.
    "@id": `${absUrl(opts.path)}#service`,
    name: opts.name,
    description: opts.description,
    serviceType: opts.serviceType,
    url: absUrl(opts.path),
    provider: { "@id": ENTITY_ID.business },
    areaServed: opts.areaServed ?? DEFAULT_AREA_SERVED,
  };

  if (opts.audience) {
    node.audience = { "@type": "Audience", audienceType: opts.audience };
  }

  if (opts.offers?.length) {
    node.hasOfferCatalog = {
      "@type": "OfferCatalog",
      name: opts.name,
      itemListElement: opts.offers.map((o) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: o.title,
          description: o.desc,
        },
      })),
    };
  }

  return node;
}

/**
 * Schéma LocalBusiness pour une page ville.
 *
 * Le `__root` émet déjà une ProfessionalService globale, mais elle est
 * identique sur toutes les pages : elle ne dit pas à Google que
 * /agence-web-chambery traite spécifiquement de Chambéry. Ce bloc porte un
 * `areaServed` centré sur la ville de la page et se rattache à l'entité
 * principale via `parentOrganization`, sans dupliquer les avis (un
 * aggregateRating répété sur 14 URLs est traité comme du balisage abusif).
 *
 * L'adresse reste celle de l'établissement réel (Gilly-sur-Isère) : déclarer
 * une adresse dans chaque ville desservie serait faux et sanctionnable.
 */
export function localBusinessJsonLd(opts: {
  /** Ville cible de la page. */
  city: string;
  /** Département / région affichée (« Savoie », « Haute-Savoie »…). */
  region: string;
  /** Chemin de la page, sert d'@id et d'url. */
  path: string;
  /** Description reprenant la requête ciblée. */
  description: string;
  /** Communes alentour couvertes par cette page. */
  nearbyCities?: string[];
  /** Prestations mises en avant sur la page. */
  services?: string[];
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${absUrl(opts.path)}#localbusiness`,
    name: `PeakCL · Agence web à ${opts.city}`,
    description: opts.description,
    url: absUrl(opts.path),
    image: absUrl("/peakcl/PeakCL.svg"),
    email: "peakcl73@gmail.com",
    telephone: "+33743517627",
    priceRange: "€€",
    parentOrganization: { "@id": absUrl("/#business") },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Gilly-sur-Isère",
      postalCode: "73200",
      addressRegion: "Savoie",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 45.6608,
      longitude: 6.3736,
    },
    areaServed: [
      { "@type": "City", name: opts.city },
      ...(opts.nearbyCities ?? []).map((name) => ({ "@type": "City", name })),
      { "@type": "AdministrativeArea", name: opts.region },
    ],
    knowsAbout: opts.services ?? [
      "Création de site internet",
      "Refonte de site web",
      "Référencement local (SEO)",
      "Création de logo",
      "Community management",
    ],
  };
}
