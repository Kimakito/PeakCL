/**
 * Contenu des pages Services (Sites web, Community management, Design,
 * Accompagnement Automatisation) + packages combinés + métadonnées du hub.
 *
 * Affichage des tarifs : seul le Community management est chiffré publiquement.
 * Les montants dev/design/packs sont stockés dans `price` mais masqués
 * (les pages passent showPrices=false → affichage « Sur devis »).
 * Pour révéler un prix plus tard : passer showPrices={true} sur la page.
 */

export type CatalogItem = {
  title: string;
  desc: string;
  /** Montant réel. Affiché seulement quand la page passe showPrices. */
  price?: string;
  delay?: string;
  included: string[];
  notIncluded?: string[];
  highlight?: boolean;
};

/* ── Sites web ───────────────────────────────────────────────── */

export const sitesWeb: CatalogItem[] = [
  {
    title: "Site vitrine sur mesure (code)",
    desc: "Site 100% codé, sans CMS ni dépendance à des plugins. Performances optimales, architecture maîtrisée de bout en bout, résultat unique et pérenne.",
    price: "2 000 €",
    delay: "Délai : 3 à 5 semaines",
    included: [
      "Analyse des besoins & maquettage (wireframes)",
      "Développement HTML/CSS/JS sur mesure",
      "Jusqu’à 6 pages (Accueil, À propos, Services, Portfolio, Blog, Contact)",
      "Responsive design (mobile-first)",
      "Formulaire de contact & intégrations tierces",
      "Optimisation SEO on-page & performances (Lighthouse)",
      "Hébergement conseillé & mise en ligne",
      "3 mois de support inclus",
    ],
  },
  {
    title: "Site vitrine WordPress",
    desc: "Site professionnel sous WordPress avec back-office pour gérer votre contenu en autonomie. Idéal pour modifier vos pages sans faire appel à un développeur.",
    price: "À partir de 2 500 €",
    delay: "Délai : 3 à 5 semaines",
    included: [
      "Analyse des besoins & maquettage",
      "Intégration thème premium ou développement thème enfant",
      "Jusqu’à 6 pages (Accueil, À propos, Services, Portfolio, Blog, Contact)",
      "Responsive design & optimisation mobile",
      "Formulaire de contact & Google Maps",
      "Optimisation SEO on-page (Yoast / RankMath)",
      "Formation à l’utilisation du back-office",
      "1 mois de support inclus",
    ],
  },
  {
    title: "Site e-commerce",
    desc: "Boutique en ligne complète et sécurisée. Plateforme recommandée selon votre projet : Shopify, PrestaShop ou WooCommerce.",
    price: "À partir de 3 800 €",
    delay: "Délai : 4 à 7 semaines",
    included: [
      "Audit & recommandation de plateforme selon vos besoins",
      "Configuration complète de la boutique",
      "Intégration jusqu’à 30 produits",
      "Passerelles de paiement (Stripe, PayPal…)",
      "Gestion des stocks & commandes",
      "Politiques légales (CGV, mentions légales, confidentialité)",
      "Optimisation SEO & vitesse de chargement",
      "Formation & documentation utilisateur",
    ],
  },
  {
    title: "Landing page / Page de vente",
    desc: "Une page unique à fort taux de conversion pour promouvoir une offre, un événement ou un produit.",
    price: "À partir de 800 €",
    delay: "Délai : 1 à 2 semaines",
    included: [
      "Copywriting orienté conversion (structure AIDA)",
      "Design & développement sur mesure, responsive",
      "Intégration formulaire de capture / CTA",
      "Connexion à un outil d’emailing (Mailchimp, Brevo…)",
      "Tests de performance & optimisation",
    ],
  },
  {
    title: "Refonte de site existant",
    desc: "Modernisation d’un site obsolète : nouveau design, meilleure expérience utilisateur, meilleures performances.",
    price: "À partir de 1 200 €",
    delay: "Selon complexité du site actuel",
    included: [
      "Audit UX/UI et analyse des performances actuelles",
      "Nouveau design responsive (mobile-first)",
      "Migration & préservation du contenu existant",
      "Redirections 301 & préservation du SEO",
      "Optimisation Core Web Vitals",
      "Tests multi-navigateurs & cross-device",
    ],
  },
  {
    title: "Maintenance & support technique",
    desc: "Contrat mensuel pour assurer la sécurité, la stabilité et les mises à jour de votre site.",
    price: "99 €/mois",
    delay: "Engagement 3 mois minimum",
    included: [
      "Mises à jour CMS, plugins & thèmes",
      "Sauvegardes hebdomadaires",
      "Monitoring de disponibilité (uptime)",
      "Corrections de bugs & ajustements mineurs",
      "Rapport mensuel de performance",
      "Support par email prioritaire",
    ],
  },
  {
    title: "Optimisation SEO technique",
    desc: "Audit et optimisation pour améliorer votre positionnement sur Google et augmenter votre trafic organique.",
    price: "500 €",
    delay: "Rapport livré en 1 semaine",
    included: [
      "Audit SEO complet (technique, contenu, backlinks)",
      "Rapport de recommandations priorisées",
      "Optimisation vitesse (Core Web Vitals)",
      "Correction des erreurs techniques (404, doublons, sitemap…)",
      "Balisage structuré Schema.org",
      "Suivi mensuel des positions (3 mois inclus)",
    ],
  },
];

/* ── Design ──────────────────────────────────────────────────── */

export const design: CatalogItem[] = [
  {
    title: "Identité visuelle complète",
    desc: "Logo, couleurs, typographies et charte graphique pour une marque cohérente et mémorable.",
    price: "À partir de 500 €",
    delay: "Délai : 1 à 2 semaines",
    included: [
      "Questionnaire de positionnement & brief",
      "3 propositions de logo (AI, SVG, PNG, PDF)",
      "Charte graphique (couleurs, typographies, usages)",
      "Kit de déclinaisons (fond clair, fond sombre, noir & blanc)",
      "Fichiers sources + guide d’utilisation",
      "2 révisions incluses",
    ],
  },
  {
    title: "Supports print",
    desc: "Flyers, plaquettes, cartes de visite et affiches prêts à l’impression.",
    price: "À partir de 80 €/support",
    delay: "Tarif dégressif dès 3 supports",
    included: [
      "Cartes de visite (recto/verso)",
      "Flyers A5 ou A4 (recto/verso)",
      "Plaquettes commerciales (4 à 8 pages)",
      "Affiches (A3/A2)",
      "Fichiers HD prêts à l’impression (CMJN + fonds perdus)",
    ],
  },
  {
    title: "Visuels réseaux sociaux",
    desc: "Pack de 10 templates brandés et réutilisables pour animer vos réseaux avec professionnalisme.",
    price: "À partir de 200 €",
    delay: "Délai : 3 à 5 jours",
    included: [
      "10 templates (posts, stories, couvertures)",
      "Déclinaisons par plateforme (Instagram, Facebook, LinkedIn, TikTok)",
      "Formats recommandés (1:1, 4:5, 9:16, 16:9)",
      "Fichiers modifiables (Canva Pro ou Figma)",
      "Guide d’utilisation",
    ],
  },
  {
    title: "Template email & newsletter",
    desc: "Design responsive à votre image, compatible tous clients mail et plateformes d’emailing.",
    price: "À partir de 180 €",
    delay: "Délai : 3 à 5 jours",
    included: [
      "Design responsive (mobile & desktop)",
      "Intégration dans votre outil (Mailchimp, Brevo, ActiveCampaign…)",
      "Template modulaire & réutilisable",
      "Test de compatibilité multi-clients mail",
      "Fichier HTML + documentation",
    ],
  },
  {
    title: "Bannières publicitaires digitales",
    desc: "Bannières display pour vos campagnes, en formats standards ou sur mesure.",
    price: "À partir de 150 € pour 5 formats",
    delay: "Livraison en 48h",
    included: [
      "Formats standards (728x90, 300x250, 160x600, 320x50…)",
      "Déclinaisons statiques (image ou GIF)",
      "Respect des spécifications de chaque plateforme",
      "Jusqu’à 5 formats inclus",
    ],
  },
];

/* ── Community management ─────────────────────────────────────── */

/** Forfaits mensuels CM (seuls tarifs publics du site). */
export type Forfait = {
  emoji: string;
  name: string;
  freq: string;
  inclus: string[];
  price: string;
  highlight?: boolean;
};

export const cmForfaits: Forfait[] = [
  {
    emoji: "🌱",
    name: "Essentiel",
    freq: "4 publications/mois (1/semaine)",
    inclus: ["4 visuels brandés", "4 textes + hashtags", "Rapport mensuel"],
    price: "200 €/mois",
  },
  {
    emoji: "⭐",
    name: "Standard",
    freq: "8 publications/mois (2/semaine)",
    inclus: ["8 visuels brandés", "8 textes + hashtags", "Rapport mensuel"],
    price: "400 €/mois",
    highlight: true,
  },
  {
    emoji: "🚀",
    name: "Dynamique",
    freq: "12 publications/mois (3/semaine)",
    inclus: ["12 visuels", "12 textes + hashtags", "1 story/semaine", "Rapport mensuel"],
    price: "650 €/mois",
  },
  {
    emoji: "🔥",
    name: "Intensif",
    freq: "20 publications/mois (5/semaine, hors LinkedIn)",
    inclus: ["20 visuels", "20 textes + hashtags", "Stories + Reels (2/mois)", "Rapport mensuel"],
    price: "900 €/mois",
  },
  {
    emoji: "🎯",
    name: "Sur mesure",
    freq: "Fréquence définie ensemble",
    inclus: ["Volume personnalisé", "Toutes plateformes", "Accompagnement stratégique", "Rapport mensuel"],
    price: "Devis",
  },
];

export const community: CatalogItem[] = [
  {
    title: "Audit réseaux sociaux",
    desc: "Analyse complète de votre présence sociale pour identifier forces, lacunes et opportunités.",
    price: "À partir de 250 €",
    delay: "Livré en 5 jours ouvrés",
    included: [
      "Analyse de vos comptes existants (engagement, fréquence, ton…)",
      "Benchmark de 3 concurrents",
      "Audit de votre cible et personas",
      "Recommandations stratégiques (plateformes, formats, fréquence)",
      "Rapport PDF illustré avec plan d’action priorisé",
    ],
  },
  {
    title: "Contenu à la carte",
    desc: "Création de contenus ponctuels sans engagement mensuel. Idéal pour un besoin précis ou tester la collaboration.",
    price: "Pack de 20 contenus : 380 €",
    included: [
      "Post (texte + visuel) : 20 à 30 €/unité",
      "Story animée : 30 à 50 €/unité",
      "Reel / vidéo courte : 80 à 150 €/unité",
      "Article de blog SEO (800-1200 mots) : 120 à 180 €",
      "Newsletter rédigée et designée : 150 à 250 €",
      "Calendrier éditorial 1 mois : 180 €",
    ],
  },
  {
    title: "Formation réseaux sociaux",
    desc: "Formation individuelle ou en groupe pour prendre en main vos réseaux en autonomie.",
    price: "200 €/demi-journée · 350 €/journée",
    included: [
      "Modules au choix : création de contenu, algorithmes, Canva, analytics",
      "Format présentiel ou visioconférence",
      "Support de formation personnalisé fourni",
      "Exercices pratiques sur vos propres comptes",
      "1h de suivi post-formation incluse",
    ],
  },
];

/* ── Accompagnement Automatisation (RS7311) ───────────────────── */

export const automatisation: CatalogItem[] = [
  {
    title: "Audit & cartographie des processus",
    desc: "Vous perdez du temps sur des tâches répétitives et vous ne savez pas par où commencer.",
    delay: "Livré : 1 à 2 semaines (selon nombre de process)",
    included: [
      "Entretien de cadrage et recensement des tâches chronophages",
      "Cartographie des processus actuels (schéma clair)",
      "Repérage des points d’automatisation à fort impact",
      "Estimation du temps et du budget gagnés",
      "Plan d’action IA priorisé (quick wins d’abord)",
    ],
  },
  {
    title: "Mise en place d’automatisations no-code",
    desc: "Vous voulez relier vos outils et supprimer les copier-coller entre applications.",
    delay: "Délai indicatif : 1 à 4 semaines (selon complexité)",
    included: [
      "Scénarios automatisés (Make, Zapier, n8n selon besoin)",
      "Connexion de vos outils (CRM, mail, agenda, facturation, formulaires…)",
      "Tests, sécurisation et gestion des erreurs",
      "Documentation claire de chaque automatisation",
      "Support de démarrage inclus",
    ],
    notIncluded: [
      "Abonnements aux plateformes (Make, Zapier, etc.)",
      "Développement d’API sur mesure (option)",
    ],
  },
  {
    title: "IA appliquée à vos contenus & données",
    desc: "Vous voulez gagner du temps sur la rédaction, le tri, l’analyse ou la relance.",
    included: [
      "Génération de contenus (emails, posts, fiches, résumés…) avec relecture humaine",
      "Synthèse et analyse de données volumineuses (retours clients, tableaux de bord)",
      "Assistants et agents IA connectés à vos outils",
      "Garde-fous et validation humaine là où c’est nécessaire",
    ],
  },
  {
    title: "Formation & montée en autonomie",
    desc: "Vous voulez comprendre et faire évoluer vos automatisations vous-même.",
    delay: "Format : sessions à distance ou sur site",
    included: [
      "Prise en main des outils no-code (Make / Zapier)",
      "Bonnes pratiques et méthode pour automatiser sans casser",
      "Cas pratiques sur vos propres process",
      "Support de formation réutilisable",
    ],
  },
  {
    title: "Accompagnement consultante (suivi)",
    desc: "Vous voulez une automatisation qui vit et s’améliore dans le temps.",
    delay: "Engagement : à définir selon besoin",
    included: [
      "Suivi régulier et optimisation des scénarios",
      "Nouvelles automatisations au fil des besoins",
      "Monitoring et corrections",
      "Point de conseil sur l’organisation et les outils",
    ],
  },
];

/**
 * Les 4 axes d'expertise couverts par la certification RS7311
 * « Améliorer l'efficacité de sa TPE à l'aide de l'IA », reformulés en
 * bénéfices client (et non en modules de formation).
 */
export type ServiceHighlight = { emoji: string; title: string; desc: string };

export const automatisationHighlights: ServiceHighlight[] = [
  {
    emoji: "🗺️",
    title: "Cartographier les opportunités IA",
    desc: "On repère, dans vos processus, là où l’IA fait vraiment gagner du temps. Vous repartez avec un plan d’action IA clair, priorisé sur 30 jours.",
  },
  {
    emoji: "✍️",
    title: "Générer vos contenus avec l’IA",
    desc: "Emails, posts, fiches produits, visuels : produire plus vite et à votre image, avec une relecture humaine systématique.",
  },
  {
    emoji: "📊",
    title: "Analyser vos données",
    desc: "Synthétiser retours clients, tableaux de bord et documents volumineux pour décider plus vite, sans se faire piéger par les biais de l’IA.",
  },
  {
    emoji: "⚙️",
    title: "Automatiser vos tâches répétitives",
    desc: "Connecter vos outils (Make, Zapier, n8n) : tri d’emails, relances, veille, leads CRM. Fini les copier-coller entre applications.",
  },
];

/* ── Packages combinés (hub /services) ───────────────────────── */

export type Pack = {
  emoji: string;
  name: string;
  tagline: string;
  points: string[];
  economy?: string;
  highlight?: boolean;
};

export const packages: Pack[] = [
  {
    emoji: "🌐",
    name: "Pack Présence Web",
    tagline: "Lancer sa présence en ligne de façon professionnelle et cohérente.",
    points: [
      "Site vitrine sur mesure ou WordPress (au choix), jusqu’à 5 pages",
      "Identité visuelle : logo + charte graphique",
      "Visuels réseaux sociaux (5 templates brandés)",
      "Optimisation SEO on-page",
      "1 mois de support inclus",
    ],
    economy: "Économie ~15% vs offres séparées",
  },
  {
    emoji: "🛒",
    name: "Pack E-commerce Complet",
    tagline: "Lancer ou refondre une boutique en ligne performante et bien brandée.",
    points: [
      "Site e-commerce (Shopify ou WooCommerce), jusqu’à 30 produits",
      "Identité visuelle adaptée au e-commerce",
      "Bannières promotionnelles & visuels produits",
      "Template email transactionnel & newsletter",
      "Configuration Google Analytics",
      "Formation à la gestion de la boutique",
    ],
    economy: "Économie ~20% vs offres séparées",
  },
  {
    emoji: "🎨",
    name: "Pack Brand & Social",
    tagline: "Construire une identité forte et l’exprimer sur les réseaux sociaux.",
    points: [
      "Identité visuelle complète (logo + charte)",
      "Pack visuels réseaux sociaux (10 templates)",
      "Calendrier éditorial 1 mois",
      "Audit de vos réseaux existants",
      "Formation Canva (2h) pour votre autonomie",
    ],
    economy: "Économie ~15% vs offres séparées",
  },
  {
    emoji: "📱",
    name: "Pack Web + Social Starter",
    tagline: "Créer son site ET lancer ses réseaux sociaux en même temps.",
    points: [
      "Site vitrine WordPress (jusqu’à 5 pages)",
      "Création & optimisation des profils réseaux sociaux",
      "Pack de 10 visuels brandés",
      "Calendrier éditorial 1 mois offert",
      "Forfait CM Essentiel : 1 mois inclus",
    ],
    economy: "Économie ~18% + 1 mois de CM offert",
  },
  {
    emoji: "🔄",
    name: "Pack Relance Digitale",
    tagline: "Pour les entreprises qui veulent moderniser leur image digitale.",
    points: [
      "Refonte de site web",
      "Rafraîchissement identité visuelle (logo + charte)",
      "Nouveaux visuels réseaux sociaux (10 templates)",
      "Optimisation SEO technique complète",
      "Audit réseaux sociaux + recommandations",
    ],
    economy: "Économie ~20% vs offres séparées",
  },
  {
    emoji: "🚀",
    name: "Pack All-In-One",
    tagline: "La solution complète pour déléguer à un seul interlocuteur.",
    points: [
      "Site vitrine ou e-commerce sur mesure",
      "Identité visuelle complète",
      "Supports print (carte de visite + flyer)",
      "Forfait CM Standard 3 mois (2 publications/semaine, 2 plateformes)",
      "Template email + newsletter mensuelle x3",
      "Rapport de performance mensuel",
      "Support prioritaire 6 mois",
    ],
    economy: "Économie ~25% · devis personnalisé",
    highlight: true,
  },
];

/* ── Métadonnées du hub /services ────────────────────────────── */

export type ServiceMeta = {
  slug: string;
  navLabel: string;
  emoji: string;
  eyebrow: string;
  title: string;
  tagline: string;
};

export const SERVICES: ServiceMeta[] = [
  {
    slug: "/sites-web",
    navLabel: "Sites web",
    emoji: "💻",
    eyebrow: "Développement web",
    title: "Sites web sur mesure",
    tagline: "Sites custom, performants et pérennes, avec un accompagnement de bout en bout.",
  },
  {
    slug: "/community-management",
    navLabel: "Community management",
    emoji: "📱",
    eyebrow: "Réseaux sociaux",
    title: "Community management",
    tagline: "Stratégie et contenus : rester visible sans y passer vos soirées.",
  },
  {
    slug: "/design",
    navLabel: "Design",
    emoji: "🎨",
    eyebrow: "Design graphique",
    title: "Design graphique",
    tagline: "Identité visuelle et supports pour une marque cohérente et mémorable.",
  },
  {
    slug: "/accompagnement-automatisation",
    navLabel: "Automatisation",
    emoji: "⚙️",
    eyebrow: "Automatisation & IA",
    title: "Automatisation & IA pour votre TPE",
    tagline: "Mettre l’IA et l’automatisation au service de votre petite structure, pour gagner du temps sans y perdre le contrôle.",
  },
];
