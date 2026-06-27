import { absUrl } from "@/seo/site";

export type AssetBlock =
  | { p: string }
  | { list: { strong?: string; text: string }[] }
  | { cards: { k: string; t: string; d: string }[] }
  | { callout: { title?: string; bullets: string[] } }
  | { quote: string };

export type AssetSection = { h2: string; blocks: AssetBlock[] };

export type ValueAsset = {
  slug: string;
  index: number;
  total: number;
  eyebrow: string;
  title: string;
  subtitle: string;
  hook: string;
  readTime: string;
  intro: string[];
  sections: AssetSection[];
  action: { title: string; items: { strong?: string; text: string }[] };
  next?: { title: string; href: string };
  metaTitle: string;
  metaDescription: string;
};

export const valueAssets: ValueAsset[] = [
  {
    slug: "ressources-systeme",
    index: 1,
    total: 4,
    eyebrow: "Ressource 1 · la plus importante",
    title: "Pourquoi tu n'as pas (assez) de clients",
    subtitle:
      "Même en faisant tout « comme il faut ». Spoiler : ce n'est presque jamais un problème de visibilité.",
    hook: "Tu peux poster tous les jours, créer du contenu, être actif partout… et ne toujours pas signer de clients. Ce n'est ni un hasard, ni ta faute.",
    readTime: "5 min de lecture",
    intro: [
      "Prends 5 minutes pour lire ça tranquillement avant notre appel. Le but n'est pas de te vendre quoi que ce soit ici : c'est de te montrer ce qui bloque vraiment, et pourquoi.",
      "Si tu repars de cette page avec un déclic, j'aurai déjà fait une partie de mon travail. Et notre échange n'en sera que plus utile.",
    ],
    sections: [
      {
        h2: "Le vrai problème",
        blocks: [
          {
            p: "La majorité des indépendants pensent que leur problème, c'est la visibilité. Alors ils postent plus. Ils boostent leurs publications. Ils refont leur logo une troisième fois. Et rien ne change.",
          },
          { p: "Parce que le problème n'est pas là." },
        ],
      },
      {
        h2: "Ce qui te manque réellement",
        blocks: [
          {
            list: [
              {
                strong: "Pas de structure.",
                text: "Aucun fil conducteur entre ce que tu montres et ce que tu vends. Le visiteur ne sait pas où aller.",
              },
              {
                strong: "Pas de parcours client.",
                text: "Il n'existe pas de chemin balisé entre la première découverte et la prise de contact.",
              },
              {
                strong: "Pas de conversion.",
                text: "Même quand quelqu'un s'intéresse à toi, rien ne l'amène clairement à l'étape suivante.",
              },
            ],
          },
          { quote: "Ce qui te manque, ce n'est pas plus de trafic. C'est un système." },
        ],
      },
      {
        h2: "Le système en 3 étapes",
        blocks: [
          {
            cards: [
              {
                k: "01",
                t: "Attirer",
                d: "Toucher les bonnes personnes, pas tout le monde. Un message ciblé vaut dix fois plus que du volume.",
              },
              {
                k: "02",
                t: "Convaincre",
                d: "Montrer que tu comprends leur problème et que tu as la solution. La confiance se construit ici.",
              },
              {
                k: "03",
                t: "Convertir",
                d: "Transformer l'intérêt en décision. Un CTA clair, un appel, une offre bien formulée.",
              },
            ],
          },
          {
            callout: {
              title: "À retenir",
              bullets: [
                "La visibilité sans système, c'est du bruit.",
                "Un système sans clarté, c'est de l'énergie gaspillée.",
                "Trois étapes, dans l'ordre, sans en sauter une.",
              ],
            },
          },
          {
            p: "Quand ces trois briques sont en place, ton activité ne dépend plus du bouche-à-oreille ni de la chance. Elle tourne.",
          },
        ],
      },
    ],
    action: {
      title: "Avant notre appel, fais ça",
      items: [
        {
          strong: "Audite ton parcours client.",
          text: "Trace le chemin d'un visiteur, de la découverte jusqu'à la prise de contact. Est-il clair ?",
        },
        {
          strong: "Identifie ton maillon faible.",
          text: "Attirer / Convaincre / Convertir : sur lequel des trois bloques-tu vraiment ?",
        },
        {
          strong: "Formule ton offre en une phrase.",
          text: "« J'aide [qui] à [résultat] grâce à [méthode]. » Si ça ne sort pas en 30 secondes, c'est là que ça coince.",
        },
      ],
    },
    next: { title: "Ressource 2 : Pourquoi ton site ne convertit pas", href: "/ressources-site" },
    metaTitle: "Ressource : Pourquoi tu n'as pas de clients · PeakCL",
    metaDescription:
      "Ressource offerte PeakCL pour préparer ton appel : pourquoi la visibilité seule ne suffit pas, et le système simple à mettre en place pour générer des clients.",
  },
  {
    slug: "ressources-site",
    index: 2,
    total: 4,
    eyebrow: "Ressource 2",
    title: "Pourquoi ton site ne convertit pas",
    subtitle:
      "Et comment le transformer en outil de vente. Un site n'est pas une vitrine : c'est un commercial disponible 24h/24.",
    hook: "La majorité des sites ne sont ni moches ni mal faits. Ils sont juste… inutiles. Ils existent, mais ils ne travaillent pas.",
    readTime: "5 min de lecture",
    intro: [
      "Si tu as un site qui ne t'amène rien (ou pas de site du tout), cette ressource est pour toi. On ne va pas parler de couleurs ou de jolies animations.",
      "On va parler de la seule chose qui compte : est-ce que ton site transforme un visiteur en demande de contact ?",
    ],
    sections: [
      {
        h2: "La majorité des sites sont inutiles",
        blocks: [
          { p: "Pas moches. Pas mal faits. Juste… inutiles. Ils existent, mais ils ne travaillent pas." },
          {
            p: "Si personne ne te contacte via ton site, c'est qu'il y a un problème structurel, pas esthétique.",
          },
        ],
      },
      {
        h2: "Les 3 erreurs les plus courantes",
        blocks: [
          {
            list: [
              {
                strong: "Parler de soi.",
                text: "Ton parcours, tes diplômes, ta passion… Le visiteur, lui, veut savoir si tu peux l'aider.",
              },
              {
                strong: "Pas de message clair.",
                text: "En 5 secondes, il ne comprend pas ce que tu fais ni pour qui. Il repart.",
              },
              {
                strong: "Pas de CTA visible.",
                text: "Pas d'appel à l'action clair = pas de prochaine étape. Il lit, puis ferme l'onglet.",
              },
            ],
          },
          { quote: "Un bon site ne présente pas ce que tu fais. Il prouve que tu peux résoudre un problème." },
        ],
      },
      {
        h2: "Les 3 piliers d'un site qui convertit",
        blocks: [
          {
            cards: [
              {
                k: "01",
                t: "Clarté",
                d: "En 5 secondes : qui tu aides, sur quel problème, avec quel résultat. Pas de jargon, pas de flou.",
              },
              {
                k: "02",
                t: "Structure",
                d: "Hero → Problème → Solution → Preuve → CTA. Chaque section guide vers la suivante.",
              },
              {
                k: "03",
                t: "Offre",
                d: "Formulée comme une solution à un problème réel, pas comme une liste de prestations.",
              },
            ],
          },
          {
            p: "Un bon site filtre, rassure et donne envie de te contacter, sans que tu aies à intervenir.",
          },
        ],
      },
    ],
    action: {
      title: "Checklist : ton site convertit-il ?",
      items: [
        { text: "En 5 secondes, un inconnu comprend ce que tu fais et pour qui." },
        { text: "Ton message parle du problème de ton client, pas de toi." },
        { text: "Il y a un appel à l'action visible sans avoir à scroller." },
        { text: "Ta page services explique un résultat, pas une liste de tâches." },
        { text: "Tu as au moins une preuve (avis, témoignage, résultat)." },
        { text: "Ton site est lisible sur mobile, sans effort." },
      ],
    },
    next: {
      title: "Ressource 3 : Pourquoi tes prospects ne te font pas confiance",
      href: "/ressources-confiance",
    },
    metaTitle: "Ressource : Pourquoi ton site ne convertit pas · PeakCL",
    metaDescription:
      "Ressource offerte PeakCL pour préparer ton appel : les 3 erreurs qui tuent la conversion, et les 3 piliers d'un site qui transforme les visiteurs en clients.",
  },
  {
    slug: "ressources-confiance",
    index: 3,
    total: 4,
    eyebrow: "Ressource 3",
    title: "Pourquoi tes prospects ne te font pas confiance",
    subtitle:
      "Et comment changer ça vite. Si tes prospects hésitent, ce n'est presque jamais une question de prix.",
    hook: "Si tes prospects demandent ton tarif puis disparaissent, ce n'est pas parce que tu es trop cher. C'est qu'ils ne te font pas encore assez confiance.",
    readTime: "4 min de lecture",
    intro: [
      "La confiance, en ligne, se joue en quelques secondes, bien avant qu'on ait lu une ligne sur toi. C'est frustrant, mais c'est aussi une bonne nouvelle : ça se travaille.",
      "Voici ce qui crée le doute, et les trois leviers concrets pour l'effacer.",
    ],
    sections: [
      {
        h2: "Ce qui crée le doute",
        blocks: [
          {
            list: [
              {
                strong: "Une image peu professionnelle.",
                text: "Photo floue, site daté, identité incohérente… le cerveau enregistre immédiatement « pas sérieux ».",
              },
              {
                strong: "Un message flou.",
                text: "Si on ne comprend pas ce que tu fais et pour qui, le doute s'installe. Le flou ne rassure jamais.",
              },
              {
                strong: "Une incohérence globale.",
                text: "Ton site dit une chose, tes réseaux une autre, ton offre une troisième. Le prospect se méfie.",
              },
            ],
          },
          {
            quote:
              "Le prix n'est jamais la vraie objection. C'est l'argument qu'on donne quand on n'ose pas dire qu'on n'est pas convaincu.",
          },
        ],
      },
      {
        h2: "Comment décide le cerveau de ton client",
        blocks: [
          {
            cards: [
              { k: "→", t: "Rapide", d: "La décision « confiance ou pas » se prend en moins de 3 secondes." },
              { k: "→", t: "Émotionnel", d: "Si l'émotion est négative, le rationnel ne rattrape rien." },
              { k: "→", t: "Visuel", d: "Le cerveau traite les images bien plus vite que le texte." },
            ],
          },
        ],
      },
      {
        h2: "Les 3 éléments qui installent la confiance",
        blocks: [
          {
            cards: [
              { k: "01", t: "Image pro", d: "Cohérente, soignée, alignée avec ce que tu vends." },
              { k: "02", t: "Message clair", d: "Spécifique, concret, sans jargon, orienté problème." },
              { k: "03", t: "Cohérence", d: "Site, réseaux, offre : un seul et même langage." },
            ],
          },
          {
            quote: "Quand ces trois éléments sont alignés, le doute disparaît, et la décision devient évidente.",
          },
        ],
      },
    ],
    action: {
      title: "Avant notre appel, regarde",
      items: [
        {
          strong: "Tes 3 premières secondes.",
          text: "Ouvre ton site / ton profil comme un inconnu. Quelle émotion il dégage, tout de suite ?",
        },
        {
          strong: "Ta cohérence.",
          text: "Mets côte à côte ton site, ton Instagram et ton logo. Est-ce la même marque ?",
        },
        {
          strong: "Ta preuve.",
          text: "Un avis, un résultat, un avant/après visible rapidement ? Si non, c'est un levier énorme.",
        },
      ],
    },
    next: { title: "Bonus : Transformer ton site en machine à clients", href: "/ressources-conversion" },
    metaTitle: "Ressource : Pourquoi tes prospects ne te font pas confiance · PeakCL",
    metaDescription:
      "Ressource offerte PeakCL pour préparer ton appel : pourquoi tes prospects hésitent et les 3 leviers (image, message, cohérence) pour installer la confiance vite.",
  },
  {
    slug: "ressources-conversion",
    index: 4,
    total: 4,
    eyebrow: "Bonus",
    title: "Transformer ton site en machine à clients",
    subtitle:
      "La synthèse. Si ton site ne ramène pas de clients, ce n'est pas un problème de design : c'est un problème de structure et de message.",
    hook: "Bonne nouvelle : tu n'as pas besoin d'un site « plus beau ». Tu as besoin d'un site qui guide, rassure et convertit.",
    readTime: "4 min de lecture",
    intro: [
      "Cette dernière ressource relie tout ce qu'on a vu : système, conversion, confiance. C'est la photo d'ensemble.",
      "Garde-la sous la main : on s'en servira de fil rouge pendant notre appel.",
    ],
    sections: [
      {
        h2: "Pourquoi la majorité des sites échouent",
        blocks: [
          {
            p: "La plupart des sites sont pensés comme des vitrines : ils parlent de l'entreprise, listent des services, ils sont « jolis ». Mais ils oublient l'essentiel : convertir un visiteur en client.",
          },
        ],
      },
      {
        h2: "Ce que ton visiteur attend vraiment",
        blocks: [
          { p: "Quand quelqu'un arrive sur ton site, il se pose une seule question :" },
          { quote: "« Est-ce que cette personne peut résoudre mon problème ? »" },
          { p: "Si la réponse n'est pas évidente en quelques secondes, il part." },
        ],
      },
      {
        h2: "Le système PeakCL (les 3 piliers)",
        blocks: [
          {
            cards: [
              {
                k: "01",
                t: "Clarté",
                d: "Message compréhensible instantanément : ce que tu fais, pour qui, et le résultat.",
              },
              {
                k: "02",
                t: "Structure",
                d: "Le site guide : problème → solution → preuve → passage à l'action.",
              },
              {
                k: "03",
                t: "Conversion",
                d: "Chaque élément pousse vers une action claire : contact, appel, demande de devis.",
              },
            ],
          },
          { p: "C'est exactement la méthode qu'on appliquera à ton cas pendant l'appel." },
        ],
      },
    ],
    action: {
      title: "Auto-diagnostic express",
      items: [
        { text: "Comprend-on ce que tu fais en 5 secondes ?" },
        { text: "Ton site parle-t-il du client, ou de toi ?" },
        { text: "Y a-t-il un appel à l'action clair ?" },
        { text: "Ton site guide-t-il le visiteur, ou le laisse-t-il perdu ?" },
      ],
    },
    metaTitle: "Ressource : Transformer ton site en machine à clients · PeakCL",
    metaDescription:
      "Ressource offerte PeakCL pour préparer ton appel : la synthèse du système clarté / structure / conversion pour faire de ton site un vrai outil de vente.",
  },
];

export function valueAssetBySlug(slug: string): ValueAsset | undefined {
  return valueAssets.find((a) => a.slug === slug);
}

/** Builds the TanStack head() config for a value asset (internal, noindex). */
export function valueAssetHead(a: ValueAsset) {
  return {
    meta: [
      { title: a.metaTitle },
      { name: "description", content: a.metaDescription },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:type", content: "article" },
      { property: "og:url", content: absUrl(`/${a.slug}`) },
    ],
    links: [{ rel: "canonical", href: absUrl(`/${a.slug}`) }],
  };
}
