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
      "« Ça dépend » n'est pas une esquive, c'est la vérité. Je vous montre de quoi ça dépend, avec des fourchettes concrètes pour un thérapeute ou un indépendant.",
    intro:
      "« Combien coûte un site internet ? » C'est la première question que me posent les thérapeutes et les artisans de Savoie qui me contactent, et c'est souvent celle à laquelle on leur répond le plus mal. Un prix sans contexte ne veut rien dire : votre site n'est pas un produit sur étagère, c'est un outil taillé pour un objectif précis. Je vous explique ce qui fait bouger l'aiguille, sans jargon.",
    sections: [
      {
        h2: "Ce qui fait vraiment varier le prix",
        paragraphs: [
          "Le premier facteur, c'est le périmètre. Un site vitrine d'une page pour une praticienne qui veut surtout être trouvée et prise de rendez-vous n'a rien à voir avec un site de cinq pages, une boutique en ligne ou un système de réservation connecté à votre agenda. Plus il y a de fonctionnalités et de contenu à structurer, plus le travail grimpe.",
          "Vient ensuite le sur-mesure : un site codé spécifiquement pour vous est rapide, unique et ne vous enferme pas dans une usine à plugins — mais il demande plus de travail qu'un thème habillé. Et le contenu : si les textes, les photos et la logique du parcours sont à créer de zéro, c'est autant de temps en plus. Une bonne partie de mon travail, c'est justement de vous éviter la page blanche.",
        ],
      },
      {
        h2: "Des fourchettes pour se repérer",
        paragraphs: [
          "Pour un indépendant, un site vitrine professionnel va généralement de quelques centaines à quelques milliers d'euros, selon le périmètre et le niveau de personnalisation. Un pack complet — site + logo + réseaux + fiche Google — représente un budget plus élevé d'un coup, mais vous évite de courir après trois prestataires qui ne se parlent pas.",
          "Fuyez les deux extrêmes. Le site « gratuit » monté un dimanche vous coûtera dix soirées et une image amateur qui fait fuir vos prospects. Le devis opaque sans périmètre écrit, lui, cache toujours une mauvaise surprise. Je remets un devis chiffré ligne par ligne une fois que j'ai compris votre besoin — pas une fourchette élastique lâchée au téléphone.",
        ],
      },
      {
        h2: "Comment ne pas payer pour rien",
        paragraphs: [
          "Partez de l'objectif, jamais de la technique. Que doit faire ce site : décrocher des appels, générer des demandes de devis, remplir votre agenda de consultations ? Tout ce qui ne sert pas cet objectif est du budget jeté. Et exigez de savoir ce qui est inclus — mise en ligne, nom de domaine, certificat SSL, bases SEO, formation pour être autonome — et ce qui ne l'est pas.",
          "Chez PeakCL, l'audit est gratuit et je vous envoie le devis sous 48h ouvrées après un appel de 3 minutes. Vous savez exactement ce que vous payez, et pourquoi.",
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
      "« J'ai déjà Instagram, un site c'est en trop ? » La question que me posent presque tous les thérapeutes que j'accompagne. Ma réponse honnête, et pourquoi les deux ne font pas le même métier.",
    intro:
      "« J'ai déjà Instagram, ai-je vraiment besoin d'un site ? » Je l'entends à presque chaque premier appel, surtout de la part de praticiennes bien-être qui ont bâti une jolie communauté à force de posts. La question est légitime. Ma réponse est oui — mais pas pour vous vendre quelque chose : parce que les deux ne jouent pas du tout le même rôle. Je vous explique.",
    sections: [
      {
        h2: "Les réseaux, vous ne les possédez pas",
        paragraphs: [
          "Votre compte Instagram ou Facebook ne vous appartient pas vraiment. L'algorithme change, votre portée chute sans prévenir, et un compte peut être restreint ou suspendu du jour au lendemain — j'ai vu une praticienne perdre l'accès au sien une semaine, en pleine rentrée, sans aucun recours. Vous construisez sur un terrain loué. Votre site, lui, est votre terrain à vous : vous en gardez le contrôle total.",
        ],
      },
      {
        h2: "Google envoie vers des pages, pas vers vos posts",
        paragraphs: [
          "Quand quelqu'un tape « ostéopathe Chambéry » ou « médiation animale Savoie » sur Google, ce sont des pages web et des fiches Google Business Profile qui remontent — jamais vos publications Instagram. Sans site ni fiche, vous êtes invisible au moment exact où un client vous cherche activement, prêt à prendre rendez-vous.",
          "Un site clair répond en cinq secondes à la seule question qui compte pour un visiteur pressé : « qu'est-ce que vous faites, pour qui, et comment je vous contacte ? » Un fil de posts, aussi soigné soit-il, l'oblige à fouiller. La plupart ne fouillent pas.",
        ],
      },
      {
        h2: "La vraie réponse : les deux, alignés",
        paragraphs: [
          "Je ne vous oppose pas les deux, je les fais travailler ensemble. Les réseaux créent le lien et la régularité ; le site rassure et transforme le curieux en client. Ce qui fait la différence, c'est la cohérence : même logo, mêmes couleurs, même ton, du post au site jusqu'à la fiche Google, pour qu'on vous reconnaisse partout.",
          "C'est tout le principe de PeakCL : une seule personne pour votre site, votre identité et vos réseaux, pour que tout raconte la même histoire. Envie de voir ce que ça donnerait chez vous ? L'audit est gratuit.",
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
      "Deux bons outils, deux logiques. Je vous montre lequel choisir selon votre vraie situation d'indépendant — pas selon ce qui m'arrangerait de vous vendre.",
    intro:
      "WordPress ou sur-mesure ? On m'en fait souvent un débat quasi religieux, alors que ce sont juste deux bons outils avec des logiques différentes. Le bon choix ne dépend ni de la mode ni de ce qui m'arrange, mais de votre besoin réel. Voici comment je tranche avec mes clients.",
    sections: [
      {
        h2: "WordPress : autonomie et back-office",
        paragraphs: [
          "WordPress est le bon choix si vous voulez garder la main au quotidien : modifier vos textes, ajouter une page ou publier un article vous-même depuis une interface d'administration. C'est un standard très répandu, avec un écosystème énorme. Pour une praticienne qui tient un vrai blog ou change souvent ses tarifs et ses créneaux, c'est confortable.",
          "Le revers : vous dépendez d'extensions à mettre à jour, à sécuriser et à surveiller, sinon le site ralentit ou casse. Comptez une maintenance régulière — quelques dizaines de minutes par mois — pour qu'il reste propre et rapide. Beaucoup d'indépendants sous-estiment cette charge.",
        ],
      },
      {
        h2: "Sur mesure : performance et sobriété",
        paragraphs: [
          "Un site codé sur mesure est léger, rapide et sans usine à plugins à entretenir. Vous obtenez un rendu unique et un contrôle total sur la performance (les fameux Core Web Vitals) — ce que Google récompense et ce que vos visiteurs ressentent, surtout depuis un mobile en 4G au fond d'un cabinet.",
          "La contrepartie : vous êtes moins autonome pour les gros changements de structure, il faut passer par moi. Mais pour la majorité des thérapeutes et artisans que j'accompagne, un site stable et rapide qui ne bouge pas tous les mois, c'est exactement le bon compromis.",
        ],
      },
      {
        h2: "Comment je tranche avec vous",
        paragraphs: [
          "Trois questions suffisent. Devez-vous modifier le contenu vous-même, souvent ? La vitesse est-elle critique pour votre référencement local ? Où voulez-vous être dans deux ans ? À partir de vos réponses, je vous oriente vers l'un ou l'autre — l'important, c'est de ne pas vous enfermer dans une solution qui vous bloque, vous ralentit ou donne une image amateur.",
          "Chez PeakCL, je propose les deux, et je vous dis honnêtement lequel est fait pour vous, même quand ce n'est pas le plus rentable pour moi. L'audit est gratuit si vous voulez qu'on regarde votre cas ensemble.",
        ],
      },
    ],
  },
  {
    slug: "conseils-community-manager-utile",
    title: "Faut-il un community manager quand on est indépendant ? · PeakCL",
    h1: "Faut-il un community manager quand on est thérapeute ou indépendant ?",
    description:
      "Thérapeute, praticien ou artisan en Savoie : déléguer ses réseaux, est-ce vraiment utile ? Ce que je fais concrètement, quand ça vaut le coup, et quand je vous dis de garder la main.",
    datePublished: "2026-06-14",
    excerpt:
      "Le dimanche soir sur Canva pendant que la lessive tourne : je connais. Voici quand déléguer ses réseaux devient vraiment rentable — et quand ça ne l'est pas.",
    intro:
      "« Il faut être présent sur les réseaux. » On vous le répète partout, mais personne ne vous dit ce que ça change vraiment quand vous êtes seul·e à faire tourner votre activité. Je suis Charlotte, je crée des sites et je gère des réseaux pour des thérapeutes et des indépendants du bassin d'Albertville, Chambéry et Annecy. Voici comment je réponds à cette question, sans vous vendre du vent.",
    sections: [
      {
        h2: "Ce que je fais, au-delà des « jolis posts »",
        paragraphs: [
          "Un community manager qui se contente de faire trois carrousels colorés ne sert à rien. Ce que je construis, c'est une présence qui vous ressemble : une ligne éditoriale claire, des visuels aux codes de votre marque, et des publications pensées pour qu'un prospect prenne rendez-vous — pas pour collecter des cœurs qui ne paient pas les factures.",
          "Le nerf de la guerre, c'est la régularité. J'ai vu des comptes rester muets trois semaines puis lâcher cinq posts en deux jours : ça ne construit rien. Un rythme tenu, même modeste — un post par semaine assumé — vaut mieux qu'une rafale culpabilisée une fois par mois.",
        ],
      },
      {
        h2: "Quand déléguer rapporte — et quand je vous dis non",
        paragraphs: [
          "Déléguez le jour où votre heure vaut plus que ce que ça vous coûte. Une ostéo ou une praticienne qui passe son dimanche soir sur Canva perd deux séances de consultation en temps caché. Déléguez aussi quand vos réseaux ne ressemblent ni à votre site ni à votre logo, ou quand vous savez qu'il « faudrait publier » mais que ça ne se fait jamais.",
          "À l'inverse, si vous adorez créer, que vous êtes à l'aise devant la caméra et que ça marche déjà : gardez la main, franchement. Dans ce cas je vous pose juste le cadre — ligne édito, modèles de visuels, calendrier — et vous publiez vous-même. Je ne vends pas un abonnement dont vous n'avez pas besoin.",
        ],
      },
      {
        h2: "L'avantage d'une seule personne pour votre image entière",
        paragraphs: [
          "Le piège que je vois le plus souvent : un CM qui ne connaît pas votre identité visuelle, un graphiste qui ne touche pas au site, un dev qui n'a jamais ouvert Instagram. Trois prestataires, trois factures, zéro cohérence — et un prospect qui ne reconnaît pas votre marque d'une plateforme à l'autre.",
          "Chez PeakCL, c'est moi qui conçois votre site, votre identité et vos réseaux. Vos publications reprennent vos couleurs et votre ton, et renvoient vers les bonnes pages de votre site : tout tire dans le même sens. Si vous voulez savoir ce que ça donnerait pour votre activité, l'audit est gratuit et je vous réponds sous 48h ouvrées.",
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
      "Le SEO n'a rien de magique. Pour un thérapeute ou un artisan de Savoie, trois fondations bien posées battent mille astuces. Je vous donne les bonnes.",
    intro:
      "Être « bien référencé sur Google » fait rêver, et beaucoup vous vendront des recettes miracles. La réalité : pour une petite structure locale, le SEO tient à quelques fondations solides, pas à mille astuces. Voici les trois qui comptent vraiment quand on démarre à Chambéry, Albertville ou Annecy.",
    sections: [
      {
        h2: "Des fondations techniques propres",
        paragraphs: [
          "Votre site doit d'abord être lisible par Google : une structure claire (titres et balises hiérarchisés), des pages qui chargent vite, un affichage impeccable sur mobile — où se font la majorité des recherches locales — et une indexation correcte (sitemap, Search Console). Sans ces bases, tout le reste est du sable.",
          "Ces fondations se posent à la construction du site. Les rattraper après coup coûte toujours plus cher que de partir propre : je le vois à chaque refonte de site bricolé que je reprends.",
        ],
      },
      {
        h2: "La fiche Google Business Profile, votre meilleure alliée locale",
        paragraphs: [
          "Pour une activité locale, la fiche Google Business Profile est souvent la première source de contacts, avant même le site. Une fiche complète — bonne catégorie, photos réelles, services détaillés et surtout des avis clients — vous propulse dans le « pack local », cette carte avec trois résultats tout en haut de la page. C'est la place qui rapporte.",
          "Réclamez systématiquement un avis à chaque client content, dès la fin de la prestation. Un thérapeute qui prend l'habitude de le demander à chaque patient satisfait passe de trois avis à une vingtaine en quelques mois — et c'est souvent ce qui le fait remonter dans le pack local. C'est l'un des signaux les plus puissants, et l'un des plus négligés parce qu'on n'ose pas demander.",
        ],
      },
      {
        h2: "Du contenu utile, dans la durée",
        paragraphs: [
          "Le référencement se construit brique par brique. Des pages dédiées à chacun de vos services et à vos villes, des réponses claires aux vraies questions de vos clients (exactement comme cet article), et une cohérence d'ensemble : voilà ce qui vous fait monter durablement, pas un coup de baguette.",
          "Ça prend du temps, mais chaque page bien faite continue de travailler pour vous des années. Si vous voulez partir sur des bases saines plutôt que de rattraper les dégâts plus tard, l'audit PeakCL est gratuit — je vous dis où vous en êtes, concrètement.",
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
