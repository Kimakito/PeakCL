export type PeakclProject = {
  title: string
  subtitle?: string
  description?: string
  tags: string[]
  siteUrl: string
  logoUrl?: string
}

const withPublicPrefix = (path?: string) => (path ? `/peakcl${path}` : undefined)

export const peakclPortfolio: PeakclProject[] = [
  {
    title: "Jantes 73 — La Vieille Roue",
    subtitle: "Artisan automobile · Albertville",
    description:
      "Johan avait ce projet en tête depuis plusieurs années, mais ne savait pas comment gérer son image en ligne, je lui ai créé son site, son logo, sa page google business profile, sa page facebook et les clients ont commencé à affluer",
    tags: ["Jekyll", "SEO local", "Site vitrine"],
    siteUrl: "https://lavieilleroue.fr/",
    logoUrl: withPublicPrefix("/assets/logo/lavieilleroue.png"),
  },
  {
    title: "Jean-Baptiste Lacroix",
    subtitle: "Écrivain fantasy · Savoie",
    description:
      "Jean-Baptiste écrit des univers fantasy captivants — mais hors de son cercle, personne ne le connaissait. J'ai conçu un site à son image : mystérieux, élégant, avec un blog pour construire une audience fidèle et bâtir sa notoriété en ligne.",
    tags: ["Jekyll", "Blog", "Portfolio auteur"],
    siteUrl: "https://jb-lacroix.fr/",
    logoUrl: withPublicPrefix("/assets/logo/logo.jbl.nobg.png"),
  },
  {
    title: "DoodleIdoo",
    subtitle: "Artiste illustratrice",
    description:
      "Une illustratrice créative dont les œuvres méritaient une vitrine à la hauteur. J'ai conçu un portfolio minimaliste et ultra-rapide, pensé pour les mobiles, qui met ses créations en lumière sans les noyer dans le décor.",
    tags: ["Jekyll", "Galerie", "Portfolio artiste"],
    siteUrl: "https://doodleidoo.com/",
    logoUrl: withPublicPrefix("/assets/logo/logo_doodleIdoo.png"),
  },
  {
    title: "LM Équitation Western",
    subtitle: "Monitrice · Savoie",
    description:
      "Maya, monitrice western, cherchait à attirer de nouveaux élèves en Savoie. J'ai bâti sa vitrine locale avec galerie, présentation des cours et pages optimisées pour les recherches équitation western en Savoie.",
    tags: ["Jekyll", "SEO local", "Site vitrine"],
    siteUrl: "https://lm-equitation-western.fr/",
    logoUrl: withPublicPrefix("/assets/logo/logo-lm-equitation.jpg"),
  },
  {
    title: "Adelante Voyages",
    subtitle: "Agence de voyage · France",
    description:
      "Face aux géants du tourisme en ligne, Victor voulait se faire une place avec une approche humaine. J'ai développé un site avec catalogue de destinations, storytelling des séjours et système de demande de devis personnalisé.",
    tags: ["Jekyll", "Catalogue", "Devis en ligne"],
    siteUrl: "https://adelantevoyages.fr/",
    logoUrl: withPublicPrefix("/assets/logo/logo-adelante.webp"),
  },
  {
    title: "C'mieux comme ça",
    subtitle: "Architecte d'intérieur · Albertville",
    description:
      'Céline a une phrase signature : "Votre habitat s\'adapte à vous, et non l\'inverse !" Il fallait que son site transmette cette philosophie au premier coup d\'œil. Site élégant, galerie de réalisations soignée, formulaire qui convertit.',
    tags: ["Jekyll", "Galerie", "Architecture intérieure"],
    siteUrl: "https://www.cmieuxcommeca.com/",
    logoUrl: withPublicPrefix("/assets/logo/cmieuxcommeca.webp"),
  },
  {
    title: "Plumes Poils & Compagnie",
    subtitle: "Ferme pédagogique · Savoie",
    description:
      "Camille et ses animaux interviennent en EHPAD, écoles et IME avec ses 40+ animaux médiateurs. J'ai créé un site chaleureux présentant la richesse de l'offre, les animaux, et facilitant la prise de contact pour les établissements.",
    tags: ["Jekyll", "Médiation animale", "Site vitrine"],
    siteUrl: "https://plumespoilscie.fr/",
    logoUrl: withPublicPrefix("/assets/logo/plumespoilsetcie.png"),
  },
  {
    title: "Les 9 Poilus",
    subtitle: "Communauté animaux · React + IA",
    description:
      "Une communauté pour les passionnés d'animaux de compagnie. J'ai développé une application React performante avec optimisation SEO automatisée et analytics intégrés pour suivre et amplifier la croissance de la plateforme.",
    tags: ["React", "IA SEO", "Analytics"],
    siteUrl: "https://les9poilus.fr/",
    logoUrl: withPublicPrefix("/assets/logo/9poilus.png"),
  },
  {
    title: "Ostéo Animal Care",
    subtitle: "Ostéopathie animale · WordPress",
    description:
      "Une praticienne en ostéopathie animale avec une approche unique et bienveillante. J'ai mis en place un site WordPress professionnel avec prise de rendez-vous en ligne et pages dédiées par type d'animal traité.",
    tags: ["WordPress", "Prise de RDV", "Santé animale"],
    siteUrl: "https://osteo-animalcare.com/",
    logoUrl: withPublicPrefix("/assets/logo/osteoanimalcare.webp"),
  },
  {
    title: "Le Juste Plan",
    subtitle: "Architecture · WordPress",
    description:
      "Un cabinet d'architecture cherchant à valoriser son approche singulière. J'ai conçu un portfolio WordPress haut de gamme, avec présentation des projets en pleine page et interface de demande d'étude personnalisée.",
    tags: ["WordPress", "Portfolio", "Architecture"],
    siteUrl: "https://lejusteplan.fr/",
    logoUrl: withPublicPrefix("/assets/logo/le_juste_plan.png"),
  },
  {
    title: "Natural Riders",
    subtitle: "E-commerce équestre · WooCommerce",
    description:
      "Une boutique spécialisée dans l'équipement naturel pour cavaliers cherchant à développer ses ventes web. J'ai mis en place WooCommerce avec catalogue optimisé, fiches produits détaillées et tunnel d'achat fluide.",
    tags: ["WooCommerce", "E-commerce", "WordPress"],
    siteUrl: "https://www.naturalriders.fr/",
    logoUrl: withPublicPrefix("/assets/logo/natural_riders.avif"),
  },
  {
    title: "Peak Training",
    subtitle: "Coaching sportif · Ugine",
    description:
      "Mathilde est coach certifiée CrossFit, Pilates et Musculation. Elle accompagnait des dizaines de clients — mais en ligne, elle n'existait pas. J'ai créé un site vitrine qui reflète son énergie, avec présentation des programmes et un formulaire de contact efficace.",
    tags: ["Jekyll", "Coaching", "Site vitrine"],
    siteUrl: "https://peaktraining.fr/",
    logoUrl: withPublicPrefix("/assets/logo/Peak-training.png"),
  },
  {
    title: "SETIC Fluides",
    subtitle: "Bureau d'études · BTP · Savoie",
    description:
      "Spécialisé en thermique, fluides et sécurité incendie, SETIC travaillait sans présence en ligne. J'ai conçu un site institutionnel sobre et professionnel, mettant en valeur leurs expertises techniques et leurs projets en Savoie et Rhône-Alpes.",
    tags: ["Jekyll", "Institutionnel", "BTP"],
    siteUrl: "https://setic-fluides.netlify.app/",
    logoUrl: withPublicPrefix("/assets/logo/setic.png"),
  },
  {
    title: "Mordant Équin",
    subtitle: "Dentiste équin · Savoie",
    description:
      "Laura pratique la dentisterie équine moderne — une spécialité rare et indispensable. J'ai créé son site avec un SEO géolocalisé précis pour qu'elle soit trouvée par les propriétaires de chevaux en Savoie et Haute-Savoie, dans un rayon de 250 km.",
    tags: ["Jekyll", "SEO géolocalisé", "Santé équine"],
    siteUrl: "https://mordant-equin.fr/",
    logoUrl: withPublicPrefix("/assets/logo/mordant-equin.png"),
  },
  {
    title: "Cabinet Johanna Alfonso",
    subtitle: "Avocate · Grenoble",
    description:
      "Maître Alfonso plaidait brillamment — mais son cabinet était invisible en ligne. J'ai développé un site sobre et rassurant, avec des pages spécialisées par domaine de droit, pour capter des clients en recherche active et urgente.",
    tags: ["Jekyll + React", "Droit", "Site professionnel"],
    siteUrl: "https://www.alfonso-avocat.fr/",
    logoUrl: withPublicPrefix("/assets/logo/ja-avocat.svg"),
  },
  {
    title: "Fiona Espitallier Dick",
    subtitle: "Artiste comédie musicale",
    description:
      "Fiona est artiste de comédie musicale — et elle avait besoin d'un portfolio qui impressionne les directeurs de casting dès les premières secondes. J'ai conçu un one-page visuel et immersif : démo-reel intégré, galerie photos, identité digitale qui rayonne.",
    tags: ["Jekyll", "One-page", "Portfolio artiste"],
    siteUrl: "https://fionaespitallier.fr/",
    logoUrl: withPublicPrefix("/assets/logo/fiona.png"),
  },
]

