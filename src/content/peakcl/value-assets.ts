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
    title: "Pourquoi vous n'avez pas (assez) de clients",
    subtitle:
      "Même en faisant tout « comme il faut ». Spoiler : ce n'est presque jamais un problème de visibilité.",
    hook: "Vous pouvez poster tous les jours, créer du contenu, être actif partout… et ne toujours pas signer de clients. Ce n'est ni un hasard, ni votre faute.",
    readTime: "5 min de lecture",
    intro: [
      "Prends 5 minutes pour lire ça tranquillement avant notre appel. Le but n'est pas de vous vendre quoi que ce soit ici : c'est de vous montrer ce qui bloque vraiment, et pourquoi.",
      "Si vous repartez de cette page avec un déclic, j'aurai déjà fait une partie de mon travail. Et notre échange n'en sera que plus utile.",
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
        h2: "Ce qui vous manque réellement",
        blocks: [
          {
            list: [
              {
                strong: "Pas de structure.",
                text: "Aucun fil conducteur entre ce que vous montrez et ce que vous vendez. Le visiteur ne sait pas où aller.",
              },
              {
                strong: "Pas de parcours client.",
                text: "Il n'existe pas de chemin balisé entre la première découverte et la prise de contact.",
              },
              {
                strong: "Pas de conversion.",
                text: "Même quand quelqu'un s'intéresse à vous, rien ne l'amène clairement à l'étape suivante.",
              },
            ],
          },
          { quote: "Ce qui vous manque, ce n'est pas plus de trafic. C'est un système." },
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
                d: "Montrer que vous comprenez leur problème et que vous avez la solution. La confiance se construit ici.",
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
            p: "Quand ces trois briques sont en place, votre activité ne dépend plus du bouche-à-oreille ni de la chance. Elle tourne.",
          },
        ],
      },
    ],
    action: {
      title: "Avant notre appel, fais ça",
      items: [
        {
          strong: "Audite votre parcours client.",
          text: "Trace le chemin d'un visiteur, de la découverte jusqu'à la prise de contact. Est-il clair ?",
        },
        {
          strong: "Identifie votre maillon faible.",
          text: "Attirer / Convaincre / Convertir : sur lequel des trois bloquez-vous vraiment ?",
        },
        {
          strong: "Formule votre offre en une phrase.",
          text: "« J'aide [qui] à [résultat] grâce à [méthode]. » Si ça ne sort pas en 30 secondes, c'est là que ça coince.",
        },
      ],
    },
    next: { title: "Ressource 2 : Pourquoi votre site ne convertit pas", href: "/ressources-site" },
    metaTitle: "Ressource : Pourquoi vous n'avez pas de clients · PeakCL",
    metaDescription:
      "Ressource offerte PeakCL pour préparer votre appel : pourquoi la visibilité seule ne suffit pas, et le système simple à mettre en place pour générer des clients.",
  },
  {
    slug: "ressources-site",
    index: 2,
    total: 4,
    eyebrow: "Ressource 2",
    title: "Pourquoi votre site ne convertit pas",
    subtitle:
      "Et comment le transformer en outil de vente. Un site n'est pas une vitrine : c'est un commercial disponible 24h/24.",
    hook: "La majorité des sites ne sont ni moches ni mal faits. Ils sont juste… inutiles. Ils existent, mais ils ne travaillent pas.",
    readTime: "5 min de lecture",
    intro: [
      "Si vous avez un site qui ne vous amène rien (ou pas de site du tout), cette ressource est pour vous. On ne va pas parler de couleurs ou de jolies animations.",
      "On va parler de la seule chose qui compte : est-ce que votre site transforme un visiteur en demande de contact ?",
    ],
    sections: [
      {
        h2: "La majorité des sites sont inutiles",
        blocks: [
          { p: "Pas moches. Pas mal faits. Juste… inutiles. Ils existent, mais ils ne travaillent pas." },
          {
            p: "Si personne ne vous contacte via votre site, c'est qu'il y a un problème structurel, pas esthétique.",
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
                text: "Votre parcours, vos diplômes, votre passion… Le visiteur, lui, veut savoir si vous pouvez l'aider.",
              },
              {
                strong: "Pas de message clair.",
                text: "En 5 secondes, il ne comprend pas ce que vous faites ni pour qui. Il repart.",
              },
              {
                strong: "Pas de CTA visible.",
                text: "Pas d'appel à l'action clair = pas de prochaine étape. Il lit, puis ferme l'onglet.",
              },
            ],
          },
          { quote: "Un bon site ne présente pas ce que vous faites. Il prouve que vous pouvez résoudre un problème." },
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
                d: "En 5 secondes : qui vous aidez, sur quel problème, avec quel résultat. Pas de jargon, pas de flou.",
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
            p: "Un bon site filtre, rassure et donne envie de vous contacter, sans que vous ayez à intervenir.",
          },
        ],
      },
    ],
    action: {
      title: "Checklist : votre site convertit-il ?",
      items: [
        { text: "En 5 secondes, un inconnu comprend ce que vous faites et pour qui." },
        { text: "Votre message parle du problème de votre client, pas de vous." },
        { text: "Il y a un appel à l'action visible sans avoir à scroller." },
        { text: "Votre page services explique un résultat, pas une liste de tâches." },
        { text: "Vous avez au moins une preuve (avis, témoignage, résultat)." },
        { text: "Votre site est lisible sur mobile, sans effort." },
      ],
    },
    next: {
      title: "Ressource 3 : Pourquoi vos prospects ne vous font pas confiance",
      href: "/ressources-confiance",
    },
    metaTitle: "Ressource : Pourquoi votre site ne convertit pas · PeakCL",
    metaDescription:
      "Ressource offerte PeakCL pour préparer votre appel : les 3 erreurs qui tuent la conversion, et les 3 piliers d'un site qui transforme les visiteurs en clients.",
  },
  {
    slug: "ressources-confiance",
    index: 3,
    total: 4,
    eyebrow: "Ressource 3",
    title: "Pourquoi vos prospects ne vous font pas confiance",
    subtitle:
      "Et comment changer ça vite. Si vos prospects hésitent, ce n'est presque jamais une question de prix.",
    hook: "Si vos prospects demandent votre tarif puis disparaissent, ce n'est pas parce que vous êtes trop cher. C'est qu'ils ne vous font pas encore assez confiance.",
    readTime: "4 min de lecture",
    intro: [
      "La confiance, en ligne, se joue en quelques secondes, bien avant qu'on ait lu une ligne sur vous. C'est frustrant, mais c'est aussi une bonne nouvelle : ça se travaille.",
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
                text: "Si on ne comprend pas ce que vous faites et pour qui, le doute s'installe. Le flou ne rassure jamais.",
              },
              {
                strong: "Une incohérence globale.",
                text: "Votre site dit une chose, vos réseaux une autre, votre offre une troisième. Le prospect se méfie.",
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
        h2: "Comment décide le cerveau de votre client",
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
              { k: "01", t: "Image pro", d: "Cohérente, soignée, alignée avec ce que vous vendez." },
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
          strong: "Vos 3 premières secondes.",
          text: "Ouvre votre site / votre profil comme un inconnu. Quelle émotion il dégage, tout de suite ?",
        },
        {
          strong: "Votre cohérence.",
          text: "Mets côte à côte votre site, votre Instagram et votre logo. Est-ce la même marque ?",
        },
        {
          strong: "Votre preuve.",
          text: "Un avis, un résultat, un avant/après visible rapidement ? Si non, c'est un levier énorme.",
        },
      ],
    },
    next: { title: "Bonus : Transformer votre site en machine à clients", href: "/ressources-conversion" },
    metaTitle: "Ressource : Pourquoi vos prospects ne vous font pas confiance · PeakCL",
    metaDescription:
      "Ressource offerte PeakCL pour préparer votre appel : pourquoi vos prospects hésitent et les 3 leviers (image, message, cohérence) pour installer la confiance vite.",
  },
  {
    slug: "ressources-conversion",
    index: 4,
    total: 4,
    eyebrow: "Bonus",
    title: "Transformer votre site en machine à clients",
    subtitle:
      "La synthèse. Si votre site ne ramène pas de clients, ce n'est pas un problème de design : c'est un problème de structure et de message.",
    hook: "Bonne nouvelle : vous n'avez pas besoin d'un site « plus beau ». Vous avez besoin d'un site qui guide, rassure et convertit.",
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
        h2: "Ce que votre visiteur attend vraiment",
        blocks: [
          { p: "Quand quelqu'un arrive sur votre site, il se pose une seule question :" },
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
                d: "Message compréhensible instantanément : ce que vous faites, pour qui, et le résultat.",
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
          { p: "C'est exactement la méthode qu'on appliquera à votre cas pendant l'appel." },
        ],
      },
    ],
    action: {
      title: "Auto-diagnostic express",
      items: [
        { text: "Comprend-on ce que vous faites en 5 secondes ?" },
        { text: "Votre site parle-t-il du client, ou de vous ?" },
        { text: "Y a-t-il un appel à l'action clair ?" },
        { text: "Votre site guide-t-il le visiteur, ou le laisse-t-il perdu ?" },
      ],
    },
    metaTitle: "Ressource : Transformer votre site en machine à clients · PeakCL",
    metaDescription:
      "Ressource offerte PeakCL pour préparer votre appel : la synthèse du système clarté / structure / conversion pour faire de votre site un vrai outil de vente.",
  },
  {
    slug: "ressources-reseaux",
    index: 1,
    total: 1,
    eyebrow: "Ressource · Réseaux sociaux",
    title: "Pourquoi avoir une stratégie sur les réseaux sociaux",
    subtitle:
      "Facebook, Instagram, TikTok, LinkedIn : 4 manières de communiquer, et une seule clé pour que ça marche.",
    hook: "Poster de temps en temps « quand on a le temps » ne construit rien. Une présence sans stratégie, c'est du bruit qui s'oublie en 2 secondes.",
    readTime: "5 min de lecture",
    intro: [
      "Les réseaux sociaux ne servent pas à « être vu ». Ils servent à construire une relation avec les bonnes personnes, jusqu'à ce qu'elles vous fassent confiance et passent à l'action.",
      "Voici pourquoi une vraie stratégie change tout, ce que chaque plateforme fait de mieux, et le seul facteur qui détermine si ça marche ou pas.",
    ],
    sections: [
      {
        h2: "Pourquoi une stratégie, et pas juste « poster »",
        blocks: [
          {
            p: "Sans stratégie, chaque publication part dans une direction différente : un jour vous montrez votre quotidien, le lendemain une promo, puis plus rien pendant 3 semaines. Votre audience ne sait jamais à quoi s'attendre, donc elle décroche.",
          },
          {
            list: [
              {
                strong: "Une stratégie donne un fil conducteur.",
                text: "Chaque publication sert un objectif : faire connaître, prouver votre expertise, ou vendre.",
              },
              {
                strong: "Elle cible la bonne audience.",
                text: "Parler à tout le monde, c'est ne convaincre personne. Une stratégie définit qui vous voulez toucher.",
              },
              {
                strong: "Elle prépare la vente.",
                text: "Les réseaux ne vendent pas directement : ils construisent la confiance qui rend la vente évidente ensuite.",
              },
            ],
          },
          { quote: "Les réseaux sociaux ne remplacent pas votre offre. Ils la rendent crédible avant même le premier contact." },
        ],
      },
      {
        h2: "4 plateformes, 4 manières de communiquer",
        blocks: [
          {
            cards: [
              {
                k: "Facebook",
                t: "La communauté",
                d: "Idéal pour fidéliser une audience locale ou déjà cliente : groupes, avis, événements, proximité.",
              },
              {
                k: "Instagram",
                t: "L'image de marque",
                d: "Le visuel et l'émotion. Parfait pour montrer votre univers, vos coulisses, votre savoir-faire en images.",
              },
              {
                k: "TikTok",
                t: "La découverte",
                d: "Le format le plus rapide pour toucher de nouvelles personnes qui ne vous connaissent pas encore.",
              },
              {
                k: "LinkedIn",
                t: "L'expertise",
                d: "Le réseau du sérieux et du B2B : votre expertise, vos résultats, votre crédibilité professionnelle.",
              },
            ],
          },
          {
            p: "Vous n'avez pas besoin d'être partout. Une ou deux plateformes bien choisies, alignées avec où se trouve votre cible, valent mieux que cinq comptes à moitié tenus.",
          },
        ],
      },
      {
        h2: "La régularité : la clé de la visibilité",
        blocks: [
          {
            p: "Les algorithmes de tous ces réseaux récompensent une chose avant tout : la constance. Un compte qui publie peu mais régulièrement passe devant un compte qui publie beaucoup puis disparaît.",
          },
          {
            callout: {
              title: "Ce que la régularité change concrètement",
              bullets: [
                "L'algorithme vous montre plus souvent à votre audience existante.",
                "Votre audience prend l'habitude de vous retrouver, ce qui construit la confiance.",
                "Chaque publication vient renforcer les précédentes, au lieu de repartir de zéro.",
              ],
            },
          },
          {
            quote: "Mieux vaut 1 publication par semaine tenue pendant 6 mois que 10 publications en 3 jours puis plus rien.",
          },
        ],
      },
    ],
    action: {
      title: "Avant notre appel, réfléchis à ça",
      items: [
        {
          strong: "Où est votre cible ?",
          text: "Sur quelle(s) plateforme(s) vos futurs clients passent-ils réellement du temps ?",
        },
        {
          strong: "Quel rythme vous pouvez tenir vraiment ?",
          text: "Mieux vaut un rythme modeste et tenu dans la durée qu'un rythme ambitieux abandonné après 2 semaines.",
        },
        {
          strong: "Quel est votre message central ?",
          text: "Ce que vous voulez que les gens retiennent de vous, publication après publication.",
        },
      ],
    },
    metaTitle: "Ressource : Pourquoi avoir une stratégie sur les réseaux sociaux · PeakCL",
    metaDescription:
      "Ressource offerte PeakCL pour préparer votre appel : pourquoi une stratégie réseaux sociaux, les 4 façons de communiquer (Facebook, Instagram, TikTok, LinkedIn) et pourquoi la régularité est la clé de la visibilité.",
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
