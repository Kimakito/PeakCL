/** Étendue de la mission — sert au badge affiché sur les cartes. */
export type ScopeLevel = "global" | "identite" | "reseaux" | "site";

export type PeakclProject = {
  title: string;
  subtitle?: string;
  description?: string;
  tags: string[];
  siteUrl: string;
  logoUrl?: string;
  /** Prestations réellement livrées sur le projet, listées dans l'étude de cas. */
  scope?: string[];
  /** Précision honnête sur ce qui n'est pas de moi (logo d'un autre graphiste, client autonome…). */
  scopeNote?: string;
  /** Niveau de mission, pour le badge de carte. */
  scopeLevel?: ScopeLevel;
  /** Remplace le libellé du badge quand le niveau ne raconte pas bien la mission. */
  scopeLabel?: string;
};

const withPublicPrefix = (path?: string) =>
  path ? `/peakcl${path}` : undefined;

export const peakclPortfolio: PeakclProject[] = [
  {
    title: "Ikami",
    subtitle: "Portail immobilier · France · Espagne · Suisse",
    description:
      "Le plus gros morceau de ma carrière : un portail d'annonces immobilières décliné dans trois pays. J'ai tout construit en full stack, backend PHP compris : la base des annonces, celle des agents immobiliers, et autant de bases à faire tourner que de pays. Conception, développement, mise en ligne et maintenance : c'était moi, du premier schéma de base de données aux mises à jour quotidiennes.",
    tags: ["PHP", "Bases de données", "Multi-pays"],
    scope: [
      "Conception et développement full stack",
      "Backend PHP intégral",
      "Base de données des annonces immobilières",
      "Base de données des agents immobiliers",
      "Déclinaisons France, Espagne et Suisse",
      "Gestion d'une base par pays",
      "Mise en ligne et maintenance",
    ],
    scopeNote:
      "Projet mené dans le cadre de mon poste salarié, et non en freelance.",
    scopeLevel: "site",
    scopeLabel: "Full stack · 3 pays",
    siteUrl: "https://ikami.fr/",
  },
  {
    title: "Adelante Voyages",
    subtitle: "Agence de voyage · France",
    description:
      "Face aux géants du tourisme en ligne, Victor voulait se faire une place avec une approche humaine. Derrière la vitrine (catalogue de destinations et storytelling des séjours), j'ai développé un vrai back-office : suivi des devis, des ventes et des commissions, dans un seul tableau de bord. C'est la partie invisible qui a demandé le plus de travail.",
    tags: ["Jekyll", "Catalogue", "Dashboard sur-mesure"],
    scope: [
      "Site internet et catalogue de destinations",
      "Dashboard de gestion des devis",
      "Suivi des ventes",
      "Calcul et suivi des commissions",
      "Système de demande de devis personnalisé",
    ],
    scopeLevel: "site",
    scopeLabel: "Site + back-office",
    siteUrl: "https://adelantevoyages.fr/",
    logoUrl: withPublicPrefix("/assets/logo/logo-adelante.webp"),
  },
  {
    title: "Cabinet Johanna Alfonso",
    subtitle: "Avocate · Grenoble",
    description:
      "Maître Alfonso plaidait brillamment, mais son cabinet était invisible en ligne. Amélie Brunet avait signé les maquettes ; j'ai pris le relais côté technique et développé le site avec des pages spécialisées par domaine de droit, pour capter des clients en recherche active et urgente.",
    tags: ["Jekyll + React", "Droit", "Site professionnel"],
    scope: [
      "Développement du site",
      "Intégration fidèle des maquettes Adobe",
      "Pages spécialisées par domaine de droit",
    ],
    scopeNote:
      "Direction artistique et maquettes signées Amélie Brunet, graphiste : j'ai assuré l'intégration et le développement.",
    scopeLevel: "site",
    scopeLabel: "Intégration & dev",
    siteUrl: "https://www.alfonso-avocat.fr/",
    logoUrl: withPublicPrefix("/assets/logo/ja-avocat.svg"),
  },
  {
    title: "Plumes Poils & Compagnie",
    subtitle: "Ferme pédagogique · Savoie",
    description:
      "Camille et ses animaux interviennent en EHPAD, écoles et IME avec ses 40+ animaux médiateurs. J'ai créé un site chaleureux présentant la richesse de l'offre, les animaux, et facilitant la prise de contact pour les établissements.",
    tags: ["Jekyll", "Médiation animale", "Site vitrine"],
    scope: ["Site internet complet", "Intégration de la charte existante"],
    scopeNote:
      "Le logo et la charte graphique venaient d'un autre graphiste : j'ai construit le site en respectant son identité au pixel près.",
    scopeLevel: "site",
    siteUrl: "https://plumespoilscie.fr/",
    logoUrl: withPublicPrefix("/assets/logo/plumespoilsetcie.png"),
  },
  {
    title: "Fiona Espitallier Dick",
    subtitle: "Artiste comédie musicale",
    description:
      "Fiona est artiste de comédie musicale, et elle avait besoin d'un portfolio qui impressionne les directeurs de casting dès les premières secondes. Je lui ai dessiné un logo qui se lit à la fois comme un micro et comme une scène, puis conçu un one-page visuel et immersif : démo-reel intégré, galerie photos, identité digitale qui rayonne.",
    tags: ["Jekyll", "One-page", "Portfolio artiste"],
    scope: [
      "Création du logo (micro et scène)",
      "Site internet one-page",
      "Intégration démo-reel et galerie",
    ],
    scopeLevel: "identite",
    siteUrl: "https://fionaespitallier.fr/",
    logoUrl: withPublicPrefix("/assets/logo/fiona.png"),
  },
  {
    title: "Jantes 73 : La Vieille Roue",
    subtitle: "Artisan automobile · Albertville",
    description:
      "Johan avait ce projet en tête depuis des années, mais partait de zéro : ni logo, ni site, ni adresse pro. J'ai lancé toute sa communication, du logo aux flyers, du site à la fiche Google, jusqu'à la prise de rendez-vous en ligne. Il n'a eu qu'à ouvrir l'atelier : les clients ont suivi.",
    tags: ["Jekyll", "SEO local", "Site vitrine"],
    scope: [
      "Création du logo",
      "Charte graphique",
      "Site internet",
      "Flyers",
      "Fiche Google Business Profile",
      "Page Facebook + premières publications",
      "Adresse e-mail professionnelle",
      "Prise de rendez-vous en ligne (Cal.com)",
    ],
    scopeLevel: "global",
    scopeLabel: "Lancement complet",
    siteUrl: "https://lavieilleroue.fr/",
    logoUrl: withPublicPrefix("/assets/logo/lavieilleroue.png"),
  },
  {
    title: "SETIC Fluides",
    subtitle: "Bureau d'études · BTP · Savoie",
    description:
      "Spécialisé en thermique, fluides et sécurité incendie, SETIC travaillait sans présence en ligne. J'ai conçu un site institutionnel sobre et professionnel, mettant en valeur leurs expertises techniques et leurs projets en Savoie et Rhône-Alpes.",
    tags: ["Jekyll", "Institutionnel", "BTP"],
    scope: [
      "Création du logo",
      "Charte graphique",
      "Site internet",
      "Création de la page LinkedIn",
      "Calendrier éditorial",
    ],
    scopeLevel: "global",
    siteUrl: "https://setic-fluides.netlify.app/",
    logoUrl: withPublicPrefix("/assets/logo/setic.png"),
  },
  {
    title: "SP Services Rénovation",
    subtitle: "Artisan rénovation · Isère",
    description:
      "Stéphane transforme les intérieurs et extérieurs avec un savoir-faire polyvalent (salles de bain, terrasses, électricité). J'ai créé un site moderne avec galerie de chantiers, formulaire de contact et fil Instagram intégré pour valoriser ses réalisations.",
    tags: ["TanStack Start", "Galerie", "Artisan"],
    scope: [
      "Amélioration du logo",
      "Site internet",
      "Fiche Google Business Profile",
      "Création des pages Facebook et Instagram",
      "Intégration du fil Instagram au site",
    ],
    scopeLevel: "global",
    siteUrl: "https://sp-renovation-73.fr/",
    logoUrl: withPublicPrefix("/assets/logo/sp-renovation.png"),
  },
  {
    title: "Laboratoire Sanchez Randon",
    subtitle: "Prothésiste dentaire · Chambéry",
    description:
      "Un laboratoire avec 25 ans d'expertise, et un site géré par une agence qui a arrêté l'abonnement du jour au lendemain. J'ai repris le site en urgence, l'ai réhébergé, puis refondu entièrement : pages spécialisées implants, prothèses et logiciels Exocad / 3Shape, plus le fil Instagram intégré.",
    tags: ["Jekyll", "Institutionnel", "Santé"],
    scope: [
      "Reprise du site laissé par l'ancienne agence",
      "Réhébergement sur Netlify",
      "Refonte totale du site",
      "Intégration du fil Instagram",
    ],
    scopeLevel: "site",
    scopeLabel: "Reprise + refonte",
    siteUrl: "https://prothesiste-sanchezrandon-chambery.fr/",
    logoUrl: withPublicPrefix("/assets/logo/sanchezrandon.svg"),
  },
  {
    title: "Mordant Équin",
    subtitle: "Dentiste équin · Savoie",
    description:
      "Laura pratique la dentisterie équine moderne, une spécialité rare et indispensable. J'ai créé son site avec un SEO géolocalisé précis pour qu'elle soit trouvée par les propriétaires de chevaux en Savoie et Haute-Savoie, dans un rayon de 250 km.",
    tags: ["Jekyll", "SEO géolocalisé", "Santé équine"],
    scope: ["Site internet", "Création de la page Facebook"],
    scopeLevel: "reseaux",
    siteUrl: "https://mordant-equin.fr/",
    logoUrl: withPublicPrefix("/assets/logo/mordant-equin.png"),
  },
  {
    title: "Jean-Baptiste Lacroix",
    subtitle: "Écriture · Drone · Échecs · Savoie",
    description:
      "Jean-Baptiste mène trois vies : auteur de fantasy, pilote de drone et passionné d'échecs. Plutôt que trois sites éparpillés, je lui en ai construit un seul, avec un onglet par univers (son écriture et son blog, ses captations aériennes et sa partie échecs) pour rassembler toute son audience au même endroit.",
    tags: ["Écriture", "Drone", "Échecs"],
    scope: [
      "Site internet",
      "Architecture des trois univers (écriture, drone, échecs)",
      "Blog intégré",
    ],
    scopeLevel: "site",
    siteUrl: "https://jb-lacroix.fr/",
    logoUrl: withPublicPrefix("/assets/logo/logo.jbl.nobg.png"),
  },
  {
    title: "DoodleIdoo",
    subtitle: "Artiste illustratrice",
    description:
      "Une illustratrice créative dont les œuvres méritaient une vitrine à la hauteur. J'ai conçu un portfolio minimaliste et ultra-rapide, pensé pour les mobiles, qui met ses créations en lumière sans les noyer dans le décor.",
    tags: ["Jekyll", "Galerie", "Portfolio artiste"],
    scope: [
      "Site internet",
      "Lancement du compte Instagram",
      "Lancement du compte TikTok",
    ],
    scopeLevel: "reseaux",
    siteUrl: "https://doodleidoo.com/",
    logoUrl: withPublicPrefix("/assets/logo/logo_doodleIdoo.png"),
  },
  {
    title: "LM Équitation Western",
    subtitle: "Monitrice · Savoie",
    description:
      "Maya, monitrice western, cherchait à attirer de nouveaux élèves en Savoie. J'ai bâti sa vitrine locale avec galerie, présentation des cours et pages optimisées pour les recherches équitation western en Savoie.",
    tags: ["Jekyll", "SEO local", "Site vitrine"],
    scope: ["Site internet", "Pages optimisées pour le référencement local"],
    scopeLevel: "site",
    siteUrl: "https://lm-equitation-western.fr/",
    logoUrl: withPublicPrefix("/assets/logo/logo-lm-equitation.jpg"),
  },
  {
    title: "C'mieux comme ça",
    subtitle: "Architecte d'intérieur · Albertville",
    description:
      "Céline a une phrase signature : \"Votre habitat s'adapte à vous, et non l'inverse !\" Il fallait que son site transmette cette philosophie au premier coup d'œil. Site élégant, galerie de réalisations soignée, formulaire qui convertit.",
    tags: ["Jekyll", "Galerie", "Architecture intérieure"],
    scope: ["Site internet", "Charte graphique", "Amélioration du logo"],
    scopeNote:
      "Le logo d'origine n'est pas de moi : je l'ai retravaillé pour qu'il tienne sur tous les supports.",
    scopeLevel: "identite",
    siteUrl: "https://www.cmieuxcommeca.com/",
    logoUrl: withPublicPrefix("/assets/logo/cmieuxcommeca.webp"),
  },
  {
    title: "Les 9 Poilus",
    subtitle: "Communauté animaux · React + IA",
    description:
      "Une communauté pour les passionnés d'animaux de compagnie. J'ai développé une application React performante avec optimisation SEO automatisée et analytics intégrés, et je pilote les réseaux (TikTok, Instagram, Facebook) qui ont fait grossir la communauté.",
    tags: ["React", "IA SEO", "Réseaux sociaux"],
    scope: [
      "Site internet (application React)",
      "Optimisation SEO automatisée et analytics",
      "Compte TikTok",
      "Compte Instagram",
      "Page Facebook",
    ],
    scopeLevel: "reseaux",
    scopeLabel: "Site + communauté",
    siteUrl: "https://les9poilus.fr/",
    logoUrl: withPublicPrefix("/assets/logo/9poilus.png"),
  },
  {
    title: "Ostéo Animal Care",
    subtitle: "Ostéopathie animale · WordPress",
    description:
      "Une praticienne en ostéopathie animale qui voulait garder la main sur son site. Elle avait installé son WordPress : j'ai construit toutes les pages et écrit tous les contenus, puis je lui ai laissé les clés. Depuis, elle publie seule.",
    tags: ["WordPress", "Rédaction", "Santé animale"],
    scope: [
      "Création de toutes les pages du site",
      "Rédaction intégrale des contenus",
      "Passage de relais pour une gestion autonome",
    ],
    scopeNote:
      "Le WordPress avait été installé par la cliente : elle gère seule son site au quotidien.",
    scopeLevel: "site",
    scopeLabel: "Pages & contenus",
    siteUrl: "https://osteo-animalcare.ch/",
    logoUrl: withPublicPrefix("/assets/logo/osteoanimalcare.webp"),
  },
  {
    title: "Le Juste Plan",
    subtitle: "Architecture · WordPress",
    description:
      "Un cabinet d'architecture cherchant à valoriser son approche singulière. J'ai conçu un portfolio WordPress haut de gamme, avec présentation des projets en pleine page et interface de demande d'étude personnalisée.",
    tags: ["WordPress", "Portfolio", "Architecture"],
    scope: [
      "Site WordPress sur-mesure, créé intégralement",
      "Présentation des projets en pleine page",
      "Formulaire de demande d'étude",
    ],
    scopeLevel: "site",
    scopeLabel: "Site sur-mesure",
    siteUrl: "https://lejusteplan.fr/",
    logoUrl: withPublicPrefix("/assets/logo/le_juste_plan.png"),
  },
  {
    title: "Natural Riders",
    subtitle: "E-commerce équestre · PrestaShop",
    description:
      "Une boutique d'équipement naturel pour cavaliers coincée sur Jimdo, trop limité pour vendre sérieusement. J'ai migré toute la boutique vers PrestaShop : catalogue, photos et charte graphique repris un par un, sans rien perdre en route.",
    tags: ["PrestaShop", "E-commerce", "Migration"],
    scope: [
      "Migration du site Jimdo vers PrestaShop",
      "Intégration du catalogue produits",
      "Intégration des photos",
      "Application de la charte graphique",
    ],
    scopeLevel: "site",
    scopeLabel: "Migration e-commerce",
    siteUrl: "https://www.naturalriders.fr/",
    logoUrl: withPublicPrefix("/assets/logo/natural_riders.avif"),
  },
  {
    title: "Peak Training",
    subtitle: "Coaching sportif · Ugine",
    description:
      "Mathilde est coach certifiée CrossFit, Pilates et Musculation. Elle accompagnait des dizaines de clients, mais en ligne, elle n'existait pas. Je lui ai construit son identité : logo, site vitrine à son énergie, et les supports visuels qu'elle publie sur ses réseaux.",
    tags: ["Jekyll", "Coaching", "Site vitrine"],
    scope: [
      "Création du logo",
      "Site internet",
      "Supports visuels pour les réseaux sociaux",
    ],
    scopeLevel: "global",
    siteUrl: "https://peaktraining.fr/",
    logoUrl: withPublicPrefix("/assets/logo/Peak-training.png"),
  },
];
