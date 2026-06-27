import { absUrl } from "@/seo/site";
import { breadcrumbJsonLd } from "@/seo/jsonld";

export type ConseilSection = { h2: string; paragraphs: string[] };

export type Conseil = {
  slug: string;
  title: string;
  h1: string;
  description: string;
  datePublished: string;
  excerpt: string;
  intro: string;
  sections: ConseilSection[];
};

export const conseils: Conseil[] = [
  {
    slug: "conseils-prix-site-internet",
    title: "Combien coûte un site internet ? (guide clair) · PeakCL",
    h1: "Combien coûte un site internet en 2026 ?",
    description:
      "Prix d'un site internet pour un indépendant ou une petite structure : ce qui fait varier le tarif, les fourchettes réalistes, et comment éviter de payer pour rien.",
    datePublished: "2026-06-14",
    excerpt:
      "Pourquoi « ça dépend » est une vraie réponse, et comment estimer honnêtement le budget d'un site qui vous rapporte.",
    intro:
      "« Combien coûte un site internet ? » est la question la plus posée, et la plus mal répondue. Un prix sans contexte ne veut rien dire : un site, ce n'est pas un produit standard, c'est un outil taillé pour un objectif. Voici comment y voir clair, sans jargon.",
    sections: [
      {
        h2: "Ce qui fait vraiment varier le prix",
        paragraphs: [
          "Le tarif d'un site dépend d'abord du périmètre : un site vitrine d'une page n'a rien à voir avec un site de cinq pages, un e-commerce ou un site avec réservation en ligne. Plus il y a de fonctionnalités et de contenu à structurer, plus le travail augmente.",
          "Ensuite vient le sur-mesure : un site codé spécifiquement pour vous, rapide et unique, demande plus de travail qu'un thème adapté, mais il vieillit mieux et ne vous enferme pas dans des plugins. Enfin, le contenu : si les textes, photos et la logique du parcours sont à créer, c'est du temps en plus.",
        ],
      },
      {
        h2: "Des fourchettes pour se repérer",
        paragraphs: [
          "Pour un indépendant, un site vitrine professionnel se situe généralement dans une fourchette de quelques centaines à quelques milliers d'euros selon le périmètre et le niveau de personnalisation. Un pack complet (site + logo + réseaux + fiche Google) représente un budget plus élevé, mais évite de multiplier les prestataires.",
          "Méfiez-vous des deux extrêmes : le site à 0 € qui vous coûte des soirées et donne une image amateur, et le devis opaque sans périmètre clair. Un bon prestataire vous remet un devis précis après avoir compris votre besoin, pas une fourchette élastique au doigt mouillé.",
        ],
      },
      {
        h2: "Comment ne pas payer pour rien",
        paragraphs: [
          "Partez de l'objectif, pas de la technique : que doit faire le site (appels, devis, réservations) ? Tout ce qui ne sert pas cet objectif est du budget gaspillé. Demandez ce qui est inclus (mise en ligne, domaine, SSL, bases SEO, formation) et ce qui ne l'est pas.",
          "Chez PeakCL, l'audit est gratuit et le devis est envoyé sous 48h ouvrées après un brief de 8 minutes. Vous savez exactement ce que vous payez, et pourquoi.",
        ],
      },
    ],
  },
  {
    slug: "conseils-site-web-ou-instagram",
    title: "Site web ou Instagram : faut-il vraiment un site ? · PeakCL",
    h1: "Site web ou Instagram : faut-il vraiment un site quand on a déjà les réseaux ?",
    description:
      "Vous avez déjà Instagram ou Facebook : un site internet est-il encore utile ? La réponse, et pourquoi les deux ne jouent pas le même rôle.",
    datePublished: "2026-06-14",
    excerpt:
      "Les réseaux et le site ne font pas le même travail. Voici pourquoi l'un ne remplace pas l'autre.",
    intro:
      "« J'ai déjà Instagram, ai-je vraiment besoin d'un site ? » C'est légitime. La réponse courte : oui, parce que les deux ne jouent pas le même rôle. Voici la version longue.",
    sections: [
      {
        h2: "Les réseaux, vous ne les contrôlez pas",
        paragraphs: [
          "Un compte Instagram ou Facebook ne vous appartient pas vraiment : algorithmes qui changent, portée qui chute, comptes parfois restreints ou suspendus du jour au lendemain. Vous bâtissez sur un terrain loué. Votre site, lui, est votre base : vous en gardez le contrôle total.",
        ],
      },
      {
        h2: "Google envoie vers des pages, pas vers vos posts",
        paragraphs: [
          "Quand quelqu'un cherche votre service sur Google, ce sont des pages web et des fiches Google Business Profile qui remontent, pas vos publications Instagram. Sans site ni fiche, vous êtes invisible au moment précis où un client vous cherche activement.",
          "Un site clair répond à la question « qu'est-ce que vous faites, pour qui, comment vous contacter ? » en cinq secondes. Un fil de posts, non.",
        ],
      },
      {
        h2: "La bonne approche : les deux, alignés",
        paragraphs: [
          "Le site et les réseaux fonctionnent ensemble. Les réseaux créent le lien et la régularité ; le site rassure et convertit. L'idéal est une image cohérente partout : même logo, mêmes couleurs, même message, du post au site jusqu'à la fiche Google.",
          "C'est exactement le principe de PeakCL : une seule personne pour votre site, votre identité et vos réseaux, pour que tout raconte la même histoire.",
        ],
      },
    ],
  },
  {
    slug: "conseils-wordpress-ou-sur-mesure",
    title: "Site WordPress ou codé sur mesure : comment choisir ? · PeakCL",
    h1: "Site WordPress ou site codé sur mesure : comment choisir ?",
    description:
      "WordPress ou site sur mesure : avantages, limites et critères de choix selon votre besoin d'autonomie, de performance et d'évolution.",
    datePublished: "2026-06-14",
    excerpt:
      "Deux bonnes options, deux logiques différentes. Comment trancher selon votre situation réelle.",
    intro:
      "WordPress ou sur-mesure ? Ce n'est pas une guerre de religion : ce sont deux bons outils avec des logiques différentes. Le bon choix dépend de votre besoin réel, pas de la mode.",
    sections: [
      {
        h2: "WordPress : autonomie et back-office",
        paragraphs: [
          "WordPress est idéal si vous voulez garder la main sur vos contenus : modifier des textes, ajouter des pages ou des articles vous-même, via une interface d'administration. C'est un standard répandu, avec un large écosystème.",
          "Le revers : la dépendance aux extensions (mises à jour, sécurité, lenteurs possibles) et une maintenance régulière nécessaire pour rester propre et rapide.",
        ],
      },
      {
        h2: "Sur mesure : performance et sobriété",
        paragraphs: [
          "Un site codé sur mesure est léger, rapide et sans dépendance à une usine à plugins. Il offre un rendu unique et un contrôle total sur la performance (Core Web Vitals), ce que Google et vos visiteurs apprécient.",
          "En contrepartie, vous êtes moins autonome pour les changements structurels, mais pour beaucoup d'indépendants, un site stable et rapide qui ne bouge pas souvent est exactement ce qu'il faut.",
        ],
      },
      {
        h2: "Comment trancher",
        paragraphs: [
          "Posez-vous trois questions : avez-vous besoin de modifier souvent le contenu vous-même ? La performance est-elle critique pour vous ? Quelle est votre ambition d'évolution ? L'essentiel est d'éviter une solution qui vous bloque, vous ralentit, ou donne une image amateur.",
          "Chez PeakCL, je propose les deux et je vous oriente honnêtement selon votre cas, pas selon ce qui m'arrange.",
        ],
      },
    ],
  },
  {
    slug: "conseils-community-manager-utile",
    title: "Faut-il un community manager quand on est indépendant ? · PeakCL",
    h1: "Faut-il un community manager quand on est indépendant ?",
    description:
      "Déléguer ses réseaux sociaux : quand c'est utile, ce que fait vraiment un community manager, et comment ne pas perdre votre temps (ni votre argent).",
    datePublished: "2026-06-14",
    excerpt:
      "Publier au hasard ne sert à rien. Voici quand déléguer ses réseaux devient vraiment rentable.",
    intro:
      "Tout le monde dit qu'il « faut être présent sur les réseaux ». Mais entre poster au hasard et déléguer à un community manager, qu'est-ce qui change vraiment pour une petite activité ? Faisons le point.",
    sections: [
      {
        h2: "Le vrai travail d'un community manager",
        paragraphs: [
          "Un bon community manager ne se contente pas de « faire de jolis posts ». Il construit une présence régulière et cohérente : une ligne éditoriale, des visuels à votre image, des messages pensés pour donner envie de vous contacter, pas juste pour collecter des likes.",
          "La régularité est la clé. Trois semaines de silence puis une rafale de posts ne construit rien. Un rythme tenu, même modeste, vaut mieux qu'un feu de paille.",
        ],
      },
      {
        h2: "Quand déléguer devient rentable",
        paragraphs: [
          "Déléguez quand le temps passé sur Canva le dimanche soir vous coûte plus que ce qu'il vous rapporte, quand vos réseaux ne ressemblent ni à votre site ni à votre logo, ou quand vous savez qu'il faut publier mais que ça ne se fait jamais.",
          "À l'inverse, si vous adorez créer du contenu et que ça marche, gardez la main : déléguez plutôt la stratégie et les visuels, et publiez vous-même.",
        ],
      },
      {
        h2: "L'avantage d'un prestataire qui maîtrise aussi votre image",
        paragraphs: [
          "Le piège classique : un CM qui ne connaît pas votre identité visuelle, un graphiste qui ne fait pas le site, un dev qui ne pense pas réseaux. Trois prestataires, zéro cohérence.",
          "Chez PeakCL, je suis formée au community management et je conçois aussi votre site et votre identité. Vos publications reprennent les codes de votre marque et renvoient vers les bonnes pages : tout travaille dans la même direction.",
        ],
      },
    ],
  },
  {
    slug: "conseils-referencer-site-google",
    title: "Comment être bien référencé sur Google (petite structure) · PeakCL",
    h1: "Comment être bien référencé sur Google quand on est une petite structure ?",
    description:
      "Référencement local pour indépendants : les fondations SEO, l'importance de la fiche Google Business Profile, et ce qui fait vraiment venir des clients.",
    datePublished: "2026-06-14",
    excerpt:
      "Le référencement n'est pas magique. Voici les fondations qui comptent vraiment quand on débute.",
    intro:
      "Être « bien référencé » fait rêver, mais le SEO n'a rien de magique. Pour une petite structure locale, quelques fondations bien posées valent mieux que mille astuces. Voici l'essentiel.",
    sections: [
      {
        h2: "Des fondations techniques propres",
        paragraphs: [
          "Avant tout, votre site doit être lisible par Google : une structure claire (titres, balises), des pages rapides, un site adapté au mobile, et une indexation correcte (sitemap, Search Console). Sans ces bases, le reste ne sert à rien.",
          "Ces fondations se posent à la création du site. Les rattraper après coup coûte toujours plus cher que de partir propre.",
        ],
      },
      {
        h2: "La fiche Google Business Profile, votre meilleure alliée locale",
        paragraphs: [
          "Pour une activité locale, la fiche Google Business Profile est souvent la première source de contacts. Une fiche complète, avec la bonne catégorie, des photos, vos services et surtout des avis clients, vous fait apparaître dans le « pack local » (la carte en haut des résultats).",
          "Demandez systématiquement un avis à vos clients satisfaits : c'est l'un des signaux les plus efficaces, et l'un des plus négligés.",
        ],
      },
      {
        h2: "Du contenu utile, dans la durée",
        paragraphs: [
          "Le référencement se construit dans le temps. Des pages dédiées à vos services et à vos villes, des réponses claires aux questions de vos clients (comme cet article), et une cohérence d'ensemble : voilà ce qui vous fait remonter durablement.",
          "C'est un marathon, pas un sprint, mais chaque brique compte. Si vous voulez partir sur des bases solides, l'audit PeakCL est gratuit.",
        ],
      },
    ],
  },
];

export function conseilBySlug(slug: string): Conseil | undefined {
  return conseils.find((c) => c.slug === slug);
}

function articleJsonLd(c: Conseil) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: c.h1,
    description: c.description,
    datePublished: c.datePublished,
    dateModified: c.datePublished,
    author: { "@type": "Person", name: "Charlotte Lacroix", url: absUrl("/qui-suis-je") },
    publisher: {
      "@type": "Organization",
      name: "PeakCL",
      logo: { "@type": "ImageObject", url: absUrl("/peakcl/PeakCL.svg") },
    },
    mainEntityOfPage: absUrl(`/${c.slug}`),
    url: absUrl(`/${c.slug}`),
  };
}

/** Builds the TanStack head() config for a conseil article route. */
export function conseilHead(c: Conseil) {
  return {
    meta: [
      { title: c.title },
      { name: "description", content: c.description },
      { property: "og:title", content: c.h1 },
      { property: "og:description", content: c.description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: absUrl(`/${c.slug}`) },
      {
        "script:ld+json": breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Conseils", path: "/conseils" },
          { name: c.h1, path: `/${c.slug}` },
        ]),
      },
      { "script:ld+json": articleJsonLd(c) },
    ],
    links: [{ rel: "canonical", href: absUrl(`/${c.slug}`) }],
  };
}
