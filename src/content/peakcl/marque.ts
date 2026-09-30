/**
 * Contenu de la page cachée /ma-marque : le mode d'emploi des visuels PeakCL.
 *
 * Page interne (noindex, hors sitemap, liée nulle part). Elle répond à une seule
 * question : « j'ai ce visuel, quand est-ce que je m'en sers ? ».
 *
 * Images : versions web légères dans public/marque/ (générées avec cwebp depuis
 * brand/). Les fichiers source haute définition restent dans brand/ — le champ
 * `source` de chaque visuel dit où les retrouver.
 */

const M = "/marque";

export type Visual = {
  id: string;
  src: string;
  label: string;
  /** Chemin du fichier HD dans le repo. */
  source: string;
  /** Fond sur lequel afficher la vignette. */
  bg?: "clair" | "fonce" | "creme";
};

// ── Mascotte v2 (kawaii, trait indigo) ─────────────────────────────────────

const E = "brand/mascotte émotions";

export const MASCOTTE = {
  salut: { id: "salut", src: `${M}/m-salut.webp`, label: "Salut", source: `${E}/Salut.png` },
  joyeuse: {
    id: "joyeuse",
    src: `${M}/m-joyeuse.webp`,
    label: "Joyeuse",
    source: `${E}/joyeuse.png`,
  },
  joie: { id: "joie", src: `${M}/m-joie.webp`, label: "Joie", source: `${E}/joie.png` },
  explosion: {
    id: "explosion",
    src: `${M}/m-explosion-joie.webp`,
    label: "Explosion de joie",
    source: `${E}/explosion de joie.png`,
  },
  dab: { id: "dab", src: `${M}/m-dab.webp`, label: "Dab", source: `${E}/dab.png` },
  idee: { id: "idee", src: `${M}/m-idee.webp`, label: "Idée", source: `${E}/idée.png` },
  ideeBuste: {
    id: "ideeBuste",
    src: `${M}/m-idee-buste.webp`,
    label: "Idée (buste)",
    source: `${E}/idée!.png`,
  },
  reflechit: {
    id: "reflechit",
    src: `${M}/m-reflechit.webp`,
    label: "Réfléchit",
    source: `${E}/réflechit.png`,
  },
  reflexionBuste: {
    id: "reflexionBuste",
    src: `${M}/m-reflexion-buste.webp`,
    label: "Réflexion (buste)",
    source: `${E}/réflexion.png`,
  },
  fatiguee: {
    id: "fatiguee",
    src: `${M}/m-fatiguee.webp`,
    label: "Fatiguée",
    source: `${E}/fatiguée.png`,
  },
  fatigueBuste: {
    id: "fatigueBuste",
    src: `${M}/m-fatigue-buste.webp`,
    label: "Fatigue (buste)",
    source: `${E}/fatigue.png`,
  },
  agacee: { id: "agacee", src: `${M}/m-agacee.webp`, label: "Agacée", source: `${E}/agacée.png` },
  agacementBuste: {
    id: "agacementBuste",
    src: `${M}/m-agacement-buste.webp`,
    label: "Agacement (buste)",
    source: `${E}/agacement.png`,
  },
  contrariee: {
    id: "contrariee",
    src: `${M}/m-contrariee.webp`,
    label: "Contrariée",
    source: `${E}/contrariée.png`,
  },
  colereBuste: {
    id: "colereBuste",
    src: `${M}/m-colere-buste.webp`,
    label: "Colère (buste)",
    source: `${E}/colère.png`,
  },
  vener: { id: "vener", src: `${M}/m-vener.webp`, label: "Vénère", source: `${E}/véner.png` },
  rageBuste: {
    id: "rageBuste",
    src: `${M}/m-rage-buste.webp`,
    label: "Rage (buste)",
    source: `${E}/rage.png`,
  },
  neutre: { id: "neutre", src: `${M}/m-neutre.webp`, label: "Neutre", source: `${E}/mascotte.png` },
  ligne: {
    id: "ligne",
    src: `${M}/m-ligne.webp`,
    label: "Trait seul",
    source: `${E}/Mascotte@2x.png`,
  },
} satisfies Record<string, Visual>;

/**
 * Les émotions, rangées par message. C'est le cœur de la page : chaque humeur
 * de la mascotte correspond à un type de post, pas à une envie du moment.
 */
export const EMOTIONS: {
  mood: string;
  message: string;
  exemples: string[];
  visuals: Visual[];
  dose: string;
}[] = [
  {
    mood: "Bonjour, c'est moi",
    message: "Présentation, accueil des nouveaux abonnés, post épinglé, story du lundi matin.",
    exemples: [
      "« Nouvelle ici ? Je suis Charlotte, et voilà ce que je fais »",
      "Réponse à un premier message",
    ],
    visuals: [MASCOTTE.salut, MASCOTTE.neutre],
    dose: "1 post épinglé + quand tu relances ton compte",
  },
  {
    mood: "Idée, astuce",
    message: "Conseils, tutos, carrousels « 3 choses à savoir sur… ». Ta pose la plus utile.",
    exemples: ["Couverture de carrousel tips", "« L'astuce du mardi »"],
    visuals: [MASCOTTE.idee, MASCOTTE.ideeBuste],
    dose: "Chaque semaine",
  },
  {
    mood: "Je me pose la question",
    message:
      "Sondages, questions ouvertes, « et toi, tu fais comment ? », avant/après une réflexion.",
    exemples: ["Story sondage", "Post question qui fait parler en commentaire"],
    visuals: [MASCOTTE.reflechit, MASCOTTE.reflexionBuste],
    dose: "1 à 2 fois par mois",
  },
  {
    mood: "Ça m'agace (gentiment)",
    message:
      "Idées reçues à casser, erreurs à éviter, « non, un site à 300 € ce n'est pas… ». Toujours avec de l'humour, jamais contre un client.",
    exemples: ["« L'erreur que je vois partout sur Google »", "Mythe vs réalité"],
    visuals: [MASCOTTE.contrariee, MASCOTTE.agacee, MASCOTTE.agacementBuste, MASCOTTE.colereBuste],
    dose: "1 à 2 fois par mois",
  },
  {
    mood: "Vénère (second degré)",
    message:
      "Réservé à l'humour franc : le client qui envoie son logo en .jpg flou, le Wi-Fi en montagne…",
    exemples: ["Mème métier", "Story coulisses"],
    visuals: [MASCOTTE.vener, MASCOTTE.rageBuste],
    dose: "Rare, c'est ce qui la rend drôle",
  },
  {
    mood: "Coulisses, fatigue",
    message: "Le vrai quotidien d'indépendante : lundi, rush de livraison, café. Ça humanise.",
    exemples: ["« Lundi, 7h, deux sites à livrer »", "Story fin de journée"],
    visuals: [MASCOTTE.fatiguee, MASCOTTE.fatigueBuste],
    dose: "1 fois par mois",
  },
  {
    mood: "Joie, victoire",
    message:
      "Projet livré, avis reçu, anniversaire de l'agence, cap franchi, bonne nouvelle client.",
    exemples: ["« Le site de X est en ligne »", "« 20 avis Google, merci »"],
    visuals: [MASCOTTE.explosion, MASCOTTE.dab, MASCOTTE.joie, MASCOTTE.joyeuse],
    dose: "À chaque livraison",
  },
];

// ── Série « néon » (fond indigo, cercle lumineux) ──────────────────────────

export const NEON_COVERS: Visual[] = [
  {
    id: "n-qui",
    src: `${M}/n-qui-suis-je.webp`,
    label: "Qui suis-je",
    source: `${E}/Qui-suis-je.png`,
    bg: "fonce",
  },
  {
    id: "n-offres",
    src: `${M}/n-offres.webp`,
    label: "Offres",
    source: `${E}/offres.png`,
    bg: "fonce",
  },
  {
    id: "n-sites",
    src: `${M}/n-sites-web.webp`,
    label: "Sites web",
    source: `${E}/sites-web.png`,
    bg: "fonce",
  },
  {
    id: "n-graph",
    src: `${M}/n-graphisme.webp`,
    label: "Graphisme",
    source: `${E}/graphisme.png`,
    bg: "fonce",
  },
  {
    id: "n-reseaux",
    src: `${M}/n-reseaux.webp`,
    label: "Réseaux",
    source: `${E}/réseaux.png`,
    bg: "fonce",
  },
  {
    id: "n-reseaux2",
    src: `${M}/n-reseaux-sociaux.webp`,
    label: "Réseaux (variante)",
    source: `${E}/réseaux-sociaux.png`,
    bg: "fonce",
  },
  {
    id: "n-portfolio",
    src: `${M}/n-portfolio.webp`,
    label: "Portfolio",
    source: `${E}/portfolio.png`,
    bg: "fonce",
  },
  { id: "n-tips", src: `${M}/n-tips.webp`, label: "Tips", source: `${E}/tips.png`, bg: "fonce" },
  {
    id: "n-avis",
    src: `${M}/n-avis-clients.webp`,
    label: "Avis clients",
    source: `${E}/avis-clients.png`,
    bg: "fonce",
  },
  {
    id: "n-contact",
    src: `${M}/n-contact.webp`,
    label: "Contact",
    source: `${E}/contact.png`,
    bg: "fonce",
  },
];

export const NEON_STORIES: Visual[] = [1, 2, 3].map((i) => ({
  id: `s-contact${i}`,
  src: `${M}/s-contact${i}.webp`,
  label:
    ["Parlons de ton projet", "Retrouve-moi ici", "Contacte-moi"][i - 1] +
    " (à refaire en « vous »)",
  source: `${E}/contact${i}.png`,
  bg: "fonce" as const,
}));

export const NEON_AVIS: Visual[] = [1, 2, 3, 4, 5].map((i) => ({
  id: `p-avis${i}`,
  src: `${M}/p-avis${i}.webp`,
  label: `Avis ${i}`,
  source: `${E}/visuel-avis${i}.png`,
  bg: "fonce" as const,
}));

// ── Logos ─────────────────────────────────────────────────────────────────

export const LOGOS: (Visual & { quand: string; eviter: string })[] = [
  {
    id: "l-carre",
    src: `${M}/l-carre.webp`,
    label: "Logo carré + mascotte",
    source: "brand/logos/1PeakCL-logo-carré.svg",
    quand:
      "Photo de profil des pages pro (Instagram, Facebook, Google Business), signature mail, filigrane de post.",
    eviter:
      "Trop détaillé sous 48 px : en tout petit, c'est la tête de la mascotte (favicon) qui prend le relais.",
  },
  {
    id: "l-horizontal",
    src: `${M}/l-horizontal.webp`,
    label: "Logotype horizontal",
    source: "brand/mascotte émotions/logo-horizontal.svg",
    quand: "En-tête de devis, audit, proposition, facture. Petite signature en bas d'un visuel.",
    eviter: "Ne jamais le réécrire au clavier : c'est un lettrage dessiné.",
    bg: "clair",
  },
  {
    id: "l-vertical",
    src: `${M}/l-vertical.webp`,
    label: "Logotype vertical",
    source: "brand/logos/1logo-vertical.svg",
    quand: "Formats étroits et hauts : story, kakemono, marge d'un flyer, colonne de site.",
    eviter: "Dans un format paysage, il flotte : prends l'horizontal.",
    bg: "clair",
  },
  {
    id: "l-fond-clair",
    src: `${M}/l-fond-clair.webp`,
    label: "Bannière fond clair",
    source: "brand/logos/1fond-clair-peakcl.svg",
    quand: "Bannière LinkedIn, en-tête de newsletter, fond de visio.",
    eviter: "Sur une photo chargée : le logotype disparaît.",
  },
  {
    id: "l-fond-fonce",
    src: `${M}/l-fond-fonce.webp`,
    label: "Bannière fond indigo",
    source: "brand/logos/1fond-foncé-logo.svg",
    quand: "Couverture Facebook/YouTube, slide de fin de présentation, écran d'attente de live.",
    eviter: "Pas de noir à côté : le sombre PeakCL, c'est l'indigo #13004D.",
  },
  {
    id: "l-illustration",
    src: `${M}/l-illustration.webp`,
    label: "Illustration grand format",
    source: "brand/logos/1illustration.svg",
    quand: "Couverture de présentation client, page « Qui suis-je », visuel d'annonce important.",
    eviter: "En petit : c'est un visuel d'impact, pas un logo.",
  },
  {
    id: "l-presentation",
    src: `${M}/l-presentation.webp`,
    label: "Image de présentation (montagne)",
    source: "brand/logos/1image de présentation.svg",
    quand: "Fond de visio, bannière « Savoie », couverture d'article, post d'ancrage local.",
    eviter: "Ne pas ajouter de texte long par-dessus : garde le ciel pour respirer.",
  },
  {
    id: "l-carres",
    src: `${M}/l-carres-couleurs.webp`,
    label: "Carrés couleurs (motif)",
    source: "brand/logos/1carrés-couleurs.svg",
    quand: "Fond de carrousel, de citation, de story texte. C'est ton motif, pas ton logo.",
    eviter: "Ne pas le présenter seul comme logo.",
  },
];

// ── Couleurs ──────────────────────────────────────────────────────────────

export const COULEURS: { nom: string; hex: string; role: string; ink: string }[] = [
  {
    nom: "Indigo encre",
    hex: "#13004D",
    role: "Texte, traits, fonds sombres. Remplace le noir, partout.",
    ink: "#fff",
  },
  { nom: "Bleu", hex: "#427CFF", role: "Liens, boutons, accent interactif.", ink: "#fff" },
  {
    nom: "Jaune CTA",
    hex: "#F2D04B",
    role: "Un seul élément par visuel : le bouton, le chiffre clé.",
    ink: "#13004D",
  },
  { nom: "Turquoise", hex: "#96F0F7", role: "Fraîcheur, halos, surlignage.", ink: "#13004D" },
  { nom: "Lavande", hex: "#BABAFF", role: "Douceur, fonds de carte, sélection.", ink: "#13004D" },
  {
    nom: "Violet profond",
    hex: "#360099",
    role: "Profondeur, titres sur fond clair.",
    ink: "#fff",
  },
  { nom: "Crème", hex: "#FFEAA9", role: "Fond chaud du site.", ink: "#13004D" },
  { nom: "Neutre 50", hex: "#FAFAFF", role: "Fond doux (jamais de gris pur).", ink: "#13004D" },
];

export const DEGRADES: { nom: string; css: string }[] = [
  { nom: "Turquoise", css: "linear-gradient(135deg, #97F0F7 0%, #4DAFC9 100%)" },
  { nom: "Bleu", css: "linear-gradient(135deg, #94D4FF 8%, #6191FF 100%)" },
  { nom: "Lavande", css: "linear-gradient(135deg, #BABAFF 0%, #875FD5 100%)" },
  { nom: "Jaune", css: "linear-gradient(135deg, #F2EB96 0%, #F2D966 50%, #F2D04B 100%)" },
  {
    nom: "Indigo",
    css: "linear-gradient(135deg, #875FD5 0%, #442887 44%, #291267 67%, #13004D 100%)",
  },
  { nom: "Texte signature", css: "linear-gradient(100deg, #F2D04B 0%, #4DAFC9 45%, #360099 100%)" },
];

// ── Situations : le point d'entrée « j'ai besoin d'un visuel pour… » ────────

export type Situation = {
  id: string;
  titre: string;
  canal: string;
  visuals: Visual[];
  regle: string;
};

const PORTRAIT: Visual = {
  id: "portrait",
  src: "/peakcl/photo/charlotte-portrait-640.webp",
  label: "Ta photo portrait",
  source: "public/peakcl/photo/",
};

const [N_QUI, N_OFFRES, N_SITES, N_GRAPH, N_RESEAUX, , N_PORTFOLIO, N_TIPS, N_AVIS, N_CONTACT] =
  NEON_COVERS;
const LOGO = Object.fromEntries(LOGOS.map((l) => [l.id, l]));

export const SITUATIONS: Situation[] = [
  {
    id: "presenter",
    titre: "Me présenter",
    canal: "Post épinglé, bio, LinkedIn, premier message",
    visuals: [PORTRAIT, MASCOTTE.salut, N_QUI],
    regle:
      "Ta vraie photo d'abord, la mascotte ensuite. Les gens achètent à une personne : la mascotte fait sourire, la photo rassure.",
  },
  {
    id: "conseil",
    titre: "Partager un conseil",
    canal: "Carrousel Instagram / LinkedIn, article",
    visuals: [MASCOTTE.idee, MASCOTTE.ideeBuste, N_TIPS, LOGO["l-carres"]],
    regle:
      "Mascotte « idée » en couverture, puis slides sur fond clair ou carrés couleurs. Logotype horizontal en petit sur la dernière slide.",
  },
  {
    id: "mythe",
    titre: "Casser une idée reçue",
    canal: "Post « erreur à éviter », « mythe vs réalité »",
    visuals: [MASCOTTE.contrariee, MASCOTTE.agacee, MASCOTTE.colereBuste],
    regle:
      "L'agacement vise une idée, jamais une personne. La slide suivante donne toujours la solution.",
  },
  {
    id: "question",
    titre: "Poser une question",
    canal: "Story sondage, post question",
    visuals: [MASCOTTE.reflechit, MASCOTTE.reflexionBuste],
    regle: "Buste en story (il se lit en petit), pose en pied en post.",
  },
  {
    id: "victoire",
    titre: "Annoncer une bonne nouvelle",
    canal: "Projet livré, cap franchi, nouveauté",
    visuals: [MASCOTTE.explosion, MASCOTTE.dab, MASCOTTE.joie, N_PORTFOLIO],
    regle:
      "Mascotte en vignette, la capture du site client en vedette. C'est le travail du client qu'on montre, pas toi.",
  },
  {
    id: "avis",
    titre: "Publier un avis client",
    canal: "Post, story, à la une « Avis »",
    visuals: [...NEON_AVIS.slice(0, 3), N_AVIS],
    regle:
      "Un avis toutes les deux semaines, pas cinq d'un coup. Relaie aussi l'avis en story avec un lien vers Google.",
  },
  {
    id: "coulisses",
    titre: "Coulisses, humour",
    canal: "Stories, posts légers",
    visuals: [MASCOTTE.fatiguee, MASCOTTE.vener, MASCOTTE.fatigueBuste],
    regle:
      "Alterne avec tes vraies photos (expressions, bureau). C'est là que le contenu cesse de ressembler à de l'IA.",
  },
  {
    id: "contact",
    titre: "Inviter à me contacter",
    canal: "Story finale, fin de carrousel, relance",
    visuals: [...NEON_STORIES, N_CONTACT],
    regle:
      "Une story contact à la fin de chaque série de stories. Un seul appel à l'action, en jaune.",
  },
  {
    id: "alaune",
    titre: "Stories à la une",
    canal: "Instagram",
    visuals: [N_QUI, N_OFFRES, N_SITES, N_GRAPH, N_RESEAUX, N_AVIS],
    regle:
      "La série néon sert à ça. Recadre en cercle, toujours dans le même ordre : qui, offres, services, avis, contact.",
  },
  {
    id: "document",
    titre: "Devis, audit, proposition",
    canal: "PDF, Google Docs, présentation",
    visuals: [LOGO["l-horizontal"], LOGO["l-illustration"], MASCOTTE.joyeuse],
    regle:
      "Logotype horizontal en en-tête, illustration en couverture. Pas d'émotion négative dans un document commercial.",
  },
  {
    id: "profil",
    titre: "Photo de profil, bannière",
    canal: "Comptes pro, LinkedIn, Google Business",
    visuals: [LOGO["l-carre"], PORTRAIT, LOGO["l-fond-clair"], LOGO["l-fond-fonce"]],
    regle:
      "Compte perso (LinkedIn) : ta photo. Page pro (Insta, Facebook, Google) : logo carré. Bannières : fond clair ou indigo.",
  },
  {
    id: "local",
    titre: "Ancrage Savoie",
    canal: "Post local, fiche Google, pages villes",
    visuals: [LOGO["l-presentation"], N_SITES],
    regle:
      "L'image montagne dit « je suis d'ici » sans une ligne de texte. Parfait pour les posts Google Business.",
  },
];

// ── Ce qui ne se mélange pas ───────────────────────────────────────────────

export const AUTRES_UNIVERS: { titre: string; statut: string; src: string; texte: string }[] = [
  {
    titre: "Avatar v1 (salopette noire)",
    statut: "Retiré",
    src: "/peakcl/avatar-montre.webp",
    texte:
      "Remplacé le 30/09/2026 : le site utilise désormais la mascotte kawaii, comme le favicon, le print et la signature. Ne plus l'utiliser nulle part, pour qu'il n'y ait qu'un seul personnage.",
  },
  {
    titre: "Pépita (La com des pépites)",
    statut: "Sous-marque à part",
    src: "/pepites/pepita-idee.png",
    texte: "Elle vit sur sa page. Jamais sur un post PeakCL, jamais à côté de la mascotte.",
  },
  {
    titre: "PeakaBot, le robot écran jaune",
    statut: "Assistant du site",
    src: "/peakcl/assets/images/mascot-happy.webp",
    texte:
      "C'est l'assistant du site (la bulle en bas à droite) et la démo de character design de /design. Il reste un robot, distinct de toi : on sait qu'on parle à un assistant, pas à Charlotte. Ne pas le mettre sur tes réseaux à la place de la mascotte.",
  },
  {
    titre: "Tes photos « expressions »",
    statut: "À exploiter",
    src: "/peakcl/assets/images/expr-sourire-malicieux.webp",
    texte:
      "Toi, en vrai, avec 14 humeurs. Utilise-les comme la mascotte : en réaction, en coulisses, en couverture. Elles prouvent qu'il y a une personne derrière.",
  },
];

// ── Rythme type ────────────────────────────────────────────────────────────

export const SEMAINE: { jour: string; post: string; visuel: string }[] = [
  { jour: "Lundi", post: "Story coulisses", visuel: "Fatiguée ou photo expression" },
  { jour: "Mardi", post: "Carrousel conseil", visuel: "Idée + carrés couleurs" },
  { jour: "Jeudi", post: "Idée reçue ou question", visuel: "Contrariée ou Réfléchit" },
  { jour: "Vendredi", post: "Preuve : projet livré ou avis", visuel: "Joie / dab ou visuel avis" },
  { jour: "Chaque série de stories", post: "Dernière story", visuel: "Story contact néon" },
];

// ── Réseaux sociaux ────────────────────────────────────────────────────────
//
// Ton image en ligne, c'est ta première démo : un prospect regarde ton
// Instagram ou ton LinkedIn avant de t'écrire. Cette partie dit quoi mettre où.

/** Ce qu'un inconnu doit comprendre en 5 secondes, sur n'importe quel profil. */
export const TEST_5_SECONDES: { q: string; r: string }[] = [
  { q: "Qui ?", r: "Charlotte, une vraie personne. Pas « une agence »." },
  { q: "Quoi ?", r: "Site, identité visuelle et réseaux, faits par la même main." },
  {
    q: "Pour qui ?",
    r: "Les TPE et PME de Savoie, tous secteurs : artisans, commerces, cabinets, services.",
  },
  { q: "Et maintenant ?", r: "Un seul lien : le mini-audit gratuit (peakcl.com/diagnostic)." },
];

/** Incohérences relevées sur tes profils et fichiers, à régler une fois pour toutes. */
export const INCOHERENCES: { titre: string; constat: string; decision: string }[] = [
  {
    titre: "Trois identifiants différents",
    constat:
      "Instagram @peakcl73, Facebook PeakCL73, TikTok @peakcl5, LinkedIn charlotte-lacroix-peakcl.",
    decision:
      "Vise le même partout (idéalement @peakcl, sinon @peakcl73). Si un nom est pris, garde @peakcl73 et aligne les autres dessus.",
  },
  {
    titre: "Tu ou vous ?",
    constat:
      "Le site et tes conseils vouvoient. Les stories néon tutoient (« Parlons de ton projet », « Contacte-moi »).",
    decision:
      "Décidé le 30/09/2026 : « vous » dans tout ce qui vend (site, bio, devis, stories contact), « tu » seulement en stories coulisses et humour. Les 3 stories contact sont à refaire en « vous ».",
  },
  {
    titre: "Deux mascottes",
    constat:
      "La mascotte kawaii en jean sur le print et le favicon, l'avatar en salopette noire sur le site.",
    decision:
      "Réglé le 30/09/2026 : la kawaii partout, réseaux comme site (accueil, pied de page). L'avatar v1 est retiré.",
  },
  {
    titre: "Le lien en bio",
    constat:
      "Tes notes (fiche Google) gardent peakcl.com/brief en lien principal, alors que tes pages froides pointent vers le mini-audit.",
    decision:
      "Un inconnu n'est pas prêt pour un appel. Lien principal : peakcl.com/diagnostic. Deuxième lien : ta fiche Google (avis).",
  },
];

export type Reseau = {
  nom: string;
  compte: string;
  role: string;
  priorite: "Principal" | "Important" | "Secondaire" | "Facultatif";
  profil: { visuel: Visual; texte: string };
  banniere: string;
  bio: string;
  contenu: string[];
  rythme: string;
  visuels: Visual[];
};

const CAPTURE_PROJET: Visual = {
  id: "capture",
  src: "/peakcl/portfolio/osteo-animal.webp",
  label: "Capture d'un projet client",
  source: "public/peakcl/portfolio/",
};

const EXPR: Visual = {
  id: "expr",
  src: "/peakcl/assets/images/expr-grand-sourire.webp",
  label: "Photo expression",
  source: "public/peakcl/assets/images/expr-*.webp",
};

export const RESEAUX: Reseau[] = [
  {
    nom: "Instagram",
    compte: "@peakcl73",
    priorite: "Principal",
    role: "Ta vitrine. C'est là qu'un prospect juge ton œil : si ta grille est cohérente, il imagine la sienne.",
    profil: {
      visuel: LOGO["l-carre"],
      texte: "Logo carré avec la mascotte. Il reste lisible en rond et en petit.",
    },
    banniere:
      "Stories à la une avec les couvertures néon, dans l'ordre : Qui suis-je, Offres, Sites web, Graphisme, Avis, Contact.",
    bio: "Charlotte · Site, identité visuelle et réseaux, par une seule personne\nPour les TPE et PME de Savoie\nMini-audit gratuit ↓",
    contenu: [
      "Un conseil (carrousel, mascotte « idée » en couverture)",
      "Une preuve (projet livré ou avis client)",
      "Un moment humain (ta photo, une coulisse, un Reel face caméra)",
    ],
    rythme:
      "3 posts par semaine + stories 3 à 4 jours sur 7, chaque série finit par une story contact",
    visuels: [MASCOTTE.idee, NEON_AVIS[0], PORTRAIT, NEON_STORIES[0]],
  },
  {
    nom: "LinkedIn",
    compte: "Charlotte Lacroix (profil perso)",
    priorite: "Important",
    role: "Là où les professions libérales et les PME te lisent. On y suit une personne, pas un logo.",
    profil: {
      visuel: PORTRAIT,
      texte: "Ta photo portrait, jamais la mascotte : c'est ton profil personnel.",
    },
    banniere:
      "Bannière fond clair (1584 × 396) avec le logotype, ou l'image montagne pour l'ancrage Savoie.",
    bio: "Titre : Sites internet, identité visuelle et réseaux sociaux pour les TPE et PME de Savoie · PeakCL",
    contenu: [
      "Cas client raconté : nom, problème, ce que tu as fait, résultat",
      "Ta méthode : les questions que tu poses, comment tu travailles",
      "Une prise de position franche sur ton métier",
    ],
    rythme: "2 posts par semaine, et 10 minutes de commentaires chez les autres",
    visuels: [PORTRAIT, CAPTURE_PROJET, LOGO["l-fond-clair"], MASCOTTE.reflechit],
  },
  {
    nom: "Google Business",
    compte: "PeakCL : Charlotte Lacroix",
    priorite: "Important",
    role: "Ce qui s'affiche quand on cherche « création site Albertville ». Les avis y comptent plus qu'ailleurs.",
    profil: {
      visuel: LOGO["l-carre"],
      texte:
        "Logo carré en logo, image montagne en couverture, et de vraies photos (toi, ton bureau).",
    },
    banniere: "Couverture : image de présentation (montagne). Ajoute une photo par mois.",
    bio: "Description : reprends ta phrase de positionnement, puis les villes (Albertville, Chambéry, Annecy, Aix-les-Bains).",
    contenu: [
      "Un post « Nouveautés » : le dernier projet livré, avec sa capture",
      "Une réponse personnelle à chaque avis, sous 48 h",
    ],
    rythme: "1 post par semaine (il disparaît au bout de quelques mois, il faut l'alimenter)",
    visuels: [LOGO["l-presentation"], CAPTURE_PROJET, PORTRAIT],
  },
  {
    nom: "Facebook",
    compte: "PeakCL73",
    priorite: "Secondaire",
    role: "Le réseau local : groupes d'entrepreneurs de Savoie, commerçants, bouche-à-oreille.",
    profil: {
      visuel: LOGO["l-carre"],
      texte: "Même logo carré qu'Instagram, pour qu'on te reconnaisse d'un réseau à l'autre.",
    },
    banniere: "Couverture fond indigo avec le logo (1640 × 624, contenu centré).",
    bio: "Même phrase que la bio Instagram, même lien /diagnostic.",
    contenu: [
      "Repartage de tes posts Instagram (sans rien recréer)",
      "Réponses utiles dans les groupes locaux : c'est là que viennent les contacts",
    ],
    rythme: "Repartage automatique + 2 passages par semaine dans les groupes",
    visuels: [LOGO["l-fond-fonce"], MASCOTTE.salut],
  },
  {
    nom: "TikTok",
    compte: "@peakcl5",
    priorite: "Facultatif",
    role: "Pas prioritaire pour ta cible. Sers-t'en seulement comme deuxième diffusion de tes Reels.",
    profil: {
      visuel: LOGO["l-carre"],
      texte: "Même photo que partout. Change l'identifiant pour qu'il colle aux autres.",
    },
    banniere: "Pas de bannière.",
    bio: "Même bio qu'Instagram, en plus court.",
    contenu: ["Tes Reels Instagram, republiés tels quels"],
    rythme: "Aucun contenu dédié",
    visuels: [MASCOTTE.dab],
  },
];

/** Aperçu de grille Instagram : l'alternance à viser sur 9 posts. */
export type Tuile =
  | { kind: "mascotte"; visual: Visual; titre: string; fond: string; pilier: string }
  | { kind: "image"; visual: Visual; pilier: string };

export const GRILLE: Tuile[] = [
  {
    kind: "mascotte",
    visual: MASCOTTE.ideeBuste,
    titre: "3 oublis sur les sites de TPE",
    fond: "linear-gradient(135deg, #F2EB96 0%, #F2D04B 100%)",
    pilier: "Conseil",
  },
  { kind: "image", visual: PORTRAIT, pilier: "Humain" },
  { kind: "image", visual: NEON_AVIS[0], pilier: "Preuve" },
  { kind: "image", visual: CAPTURE_PROJET, pilier: "Projet livré" },
  {
    kind: "mascotte",
    visual: MASCOTTE.contrariee,
    titre: "Non, 5 pages ne sont pas obligatoires",
    fond: "linear-gradient(135deg, #BABAFF 0%, #875FD5 100%)",
    pilier: "Idée reçue",
  },
  { kind: "image", visual: EXPR, pilier: "Coulisses" },
  {
    kind: "mascotte",
    visual: MASCOTTE.reflechit,
    titre: "Vous faites comment pour vos avis Google ?",
    fond: "linear-gradient(135deg, #97F0F7 0%, #4DAFC9 100%)",
    pilier: "Question",
  },
  { kind: "image", visual: NEON_AVIS[1], pilier: "Preuve" },
  {
    kind: "mascotte",
    visual: MASCOTTE.explosion,
    titre: "Le site de Camille est en ligne",
    fond: "linear-gradient(135deg, #94D4FF 8%, #6191FF 100%)",
    pilier: "Victoire",
  },
];

export const FORMATS: { support: string; taille: string; note: string }[] = [
  {
    support: "Post Instagram / carrousel",
    taille: "1080 × 1350",
    note: "Format 4:5, il prend plus de place dans le fil que le carré.",
  },
  {
    support: "Story, Reel, TikTok",
    taille: "1080 × 1920",
    note: "Rien d'important dans les 250 px du haut et du bas.",
  },
  {
    support: "Post LinkedIn",
    taille: "1080 × 1350",
    note: "Le même visuel qu'Instagram fonctionne.",
  },
  {
    support: "Bannière LinkedIn",
    taille: "1584 × 396",
    note: "Ta photo de profil masque le coin bas gauche.",
  },
  {
    support: "Couverture Facebook",
    taille: "1640 × 624",
    note: "Garde le logo au centre : les bords sont rognés sur mobile.",
  },
  {
    support: "Photo de profil",
    taille: "800 × 800",
    note: "Affichée en rond : rien d'important dans les coins.",
  },
  {
    support: "Post Google Business",
    taille: "1200 × 900",
    note: "Format 4:3, une vraie photo plutôt qu'un visuel texte.",
  },
];

export const PLAN_DEMARRAGE: { quand: string; quoi: string }[] = [
  {
    quand: "Cette semaine",
    quoi: "Remettre les profils en cohérence : même photo, même nom, même bio, lien /diagnostic, stories à la une rangées. Une heure, une seule fois.",
  },
  {
    quand: "Semaine 2",
    quoi: "Préparer 6 posts d'avance avec la grille ci-dessus : 2 conseils, 2 preuves, 2 moments humains. Tout est déjà dans cette page.",
  },
  {
    quand: "Ensuite",
    quoi: "Suivre la semaine type. Une fois par mois, regarde ta grille Instagram de loin : si elle ne ressemble pas à l'aperçu, rééquilibre.",
  },
];

export const CHECKLIST: string[] = [
  "La même photo de profil sur Instagram, Facebook, TikTok et Google",
  "Le même identifiant partout",
  "La bio dit qui, quoi, pour qui, en vouvoyant",
  "Le lien principal pointe vers peakcl.com/diagnostic",
  "Les stories à la une utilisent les couvertures néon, dans l'ordre",
  "Sur les 9 derniers posts : au moins 2 où l'on voit ta vraie tête",
  "Une seule mascotte visible : la kawaii",
  "La bannière LinkedIn et la couverture Facebook sont des visuels de marque",
  "Le dernier post a moins de 7 jours",
  "Un avis client relayé ce mois-ci",
];

// ── Grille tarifaire ───────────────────────────────────────────────────────
//
// Analyse du 30/09/2026. Deux grilles circulent : le catalogue Notion et celle
// du site (src/content/peakcl/services.ts), qui a déjà corrigé l'à la carte et
// les packs. Grille validée par Charlotte et appliquée au site le même jour
// (services.ts, pages métier, accueil, méta-descriptions, questionnaire R2).

/** Taux de référence proposé : tout prix = jours estimés × TJM, arrondi. */
export const TJM = { jour: 450, heure: 65 };

export const VERDICTS: {
  famille: string;
  ressenti: string;
  verdict: "Sous le marché" | "Dans le marché" | "Au-dessus";
  texte: string;
}[] = [
  {
    famille: "Sites web",
    ressenti: "Je pense être chère",
    verdict: "Dans le marché",
    texte:
      "Un freelance facture 800 à 3 000 € un site de 5 à 10 pages, une agence part de 3 000 €. À 2 000 €, tu es au milieu de la fourchette freelance. Avec ton taux de 60 €/h, 2 000 € paient à peine 33 heures, maquettes, SEO et 3 mois de support compris : c'est serré, pas cher.",
  },
  {
    famille: "Identité visuelle",
    ressenti: "Pas d'avis",
    verdict: "Sous le marché",
    texte:
      "Une identité complète chez un graphiste freelance débutant coûte 1 000 à 2 500 €. À 500 € avec 3 pistes de logo, une charte, les déclinaisons et 2 révisions, tu es au prix d'un logo seul. C'est ton offre la plus sous-évaluée.",
  },
  {
    famille: "Réseaux sociaux",
    ressenti: "Je pense être bien",
    verdict: "Sous le marché",
    texte:
      "La journée moyenne d'un community manager freelance est d'environ 400 €. Ton forfait Essentiel à 200 € couvre 4 posts, les échanges et un rapport : une demi-journée payée pour une journée de travail. Les forfaits hauts (650 et 900 €) sont corrects, c'est l'entrée de gamme qui tire tout vers le bas.",
  },
  {
    famille: "Formation, audits",
    ressenti: "Pas d'avis",
    verdict: "Sous le marché",
    texte:
      "350 € la journée de formation, c'est sous ton propre taux horaire (60 € × 7 h = 420 €), sans compter la préparation du support.",
  },
];

export const INCOHERENCES_TARIFS: { titre: string; texte: string }[] = [
  {
    titre: "Deux grilles en circulation",
    texte:
      "Ton catalogue Notion n'est plus celui du site. Le site a déjà corrigé les packs (l'ancien Pack E-commerce à 3 200 € coûtait moins cher que la boutique seule à 3 800 €) et l'à la carte (le post à 20 € revenait moins cher que le forfait à 50 €). Un prospect qui reçoit le PDF puis visite le site voit deux prix. Garde une seule source : le site.",
  },
  {
    titre: "Le sur mesure moins cher que WordPress",
    texte:
      "Site codé 2 000 €, WordPress 2 500 €. Pour le client, le code a l'air d'être l'option « au rabais », alors que c'est l'inverse. Ta cible ne choisit pas une technologie : elle choisit si elle veut modifier ses pages seule. Même prix pour les deux, la techno se choisit ensuite.",
  },
  {
    titre: "Pas d'entrée pour les petits budgets",
    texte:
      "Beaucoup de TPE qui démarrent (artisan qui s'installe, commerce, petit cabinet) ont 1 000 à 1 500 € de budget. Entre la landing à 800 € et le site à 2 000 €, il n'y a rien : ils partent chez Wix. Une offre 1 à 3 pages comble ce trou sans baisser ton site complet.",
  },
  {
    titre: "La refonte moins chère que la création",
    texte:
      "Refonte dès 1 200 € contre 2 000 € pour un site neuf, alors qu'elle ajoute un audit, une migration et des redirections. Tout le monde va demander une « refonte ».",
  },
  {
    titre: "Une maintenance pensée pour WordPress",
    texte:
      "« Mises à jour CMS, plugins et thèmes » ne veut rien dire pour un site codé. Deux formules : une pour WordPress, une plus légère pour le sur mesure (c'est d'ailleurs un argument de vente du code).",
  },
  {
    titre: "Des émojis dans le catalogue",
    texte:
      "Ta charte les interdit. Un catalogue est un document commercial : même règle que le site.",
  },
];

export type LigneTarif = {
  prestation: string;
  actuel: string;
  propose: string;
  raison: string;
  nouveau?: boolean;
};

export const GRILLE_TARIFS: { famille: string; lignes: LigneTarif[] }[] = [
  {
    famille: "Sites web",
    lignes: [
      {
        prestation: "Landing page",
        actuel: "dès 800 €",
        propose: "dès 900 €",
        raison: "2 jours avec le texte de vente.",
      },
      {
        prestation: "Site essentiel (1 à 3 pages)",
        actuel: "—",
        propose: "1 400 €",
        raison: "L'entrée pour les TPE qui démarrent ou ont peu à présenter. 3 jours.",
        nouveau: true,
      },
      {
        prestation: "Site vitrine jusqu'à 6 pages (sur mesure ou WordPress)",
        actuel: "2 000 € / dès 2 500 €",
        propose: "2 400 €",
        raison: "Un seul prix, la techno se choisit selon l'autonomie voulue. 5 à 6 jours.",
      },
      {
        prestation: "Site e-commerce",
        actuel: "dès 3 800 €",
        propose: "dès 3 800 €",
        raison: "Dans le marché, on ne touche pas.",
      },
      {
        prestation: "Refonte",
        actuel: "dès 1 200 €",
        propose: "dès 1 800 €",
        raison: "Plus proche de la création, puisqu'elle comprend audit et migration.",
      },
      {
        prestation: "Maintenance WordPress",
        actuel: "99 €/mois",
        propose: "99 €/mois",
        raison: "Dans le marché.",
      },
      {
        prestation: "Suivi site sur mesure",
        actuel: "—",
        propose: "49 €/mois",
        raison:
          "Hébergement suivi, sauvegardes, petites retouches. Pas de plugins à mettre à jour.",
        nouveau: true,
      },
      {
        prestation: "Optimisation SEO technique",
        actuel: "500 €",
        propose: "650 €",
        raison: "3 mois de suivi des positions inclus : c'est du temps récurrent.",
      },
    ],
  },
  {
    famille: "Identité & graphisme",
    lignes: [
      {
        prestation: "Logo essentiel",
        actuel: "—",
        propose: "500 €",
        raison: "1 piste affinée, 2 révisions, déclinaisons. Garde un prix d'entrée.",
        nouveau: true,
      },
      {
        prestation: "Identité visuelle complète",
        actuel: "dès 500 €",
        propose: "dès 1 200 €",
        raison: "3 pistes, charte, kit, guide : bas de la fourchette freelance (1 000 à 2 500 €).",
      },
      {
        prestation: "10 templates réseaux",
        actuel: "dès 200 €",
        propose: "dès 350 €",
        raison: "35 € le template modifiable, guide compris.",
      },
      {
        prestation: "Carte de visite",
        actuel: "dès 80 €",
        propose: "dès 90 €",
        raison: "Ajustement léger.",
      },
      {
        prestation: "Flyer",
        actuel: "dès 120 €",
        propose: "dès 150 €",
        raison: "Recto verso, fichiers imprimeur.",
      },
      {
        prestation: "Plaquette 4 à 8 pages",
        actuel: "dès 280 €",
        propose: "dès 450 €",
        raison: "Une journée de mise en page au minimum.",
      },
      {
        prestation: "Template e-mail",
        actuel: "dès 180 €",
        propose: "dès 250 €",
        raison: "Tests multi-clients mail compris.",
      },
    ],
  },
  {
    famille: "Réseaux sociaux",
    lignes: [
      {
        prestation: "Forfait Essentiel (4 posts)",
        actuel: "200 €/mois",
        propose: "250 €/mois",
        raison: "Monte le plancher sans effrayer : 62 € le post, rapport compris.",
      },
      {
        prestation: "Forfait Standard (8 posts)",
        actuel: "400 €/mois",
        propose: "450 €/mois",
        raison: "Garde l'écart avec l'Essentiel.",
      },
      {
        prestation: "Forfait Dynamique (12 posts)",
        actuel: "650 €/mois",
        propose: "650 €/mois",
        raison: "Dans le marché.",
      },
      {
        prestation: "Forfait Intensif (20 posts)",
        actuel: "900 €/mois",
        propose: "950 €/mois",
        raison: "Reels compris : c'est le plus long à produire.",
      },
      {
        prestation: "Audit réseaux",
        actuel: "dès 250 €",
        propose: "dès 350 €",
        raison: "Benchmark de 3 concurrents : une petite journée.",
      },
      {
        prestation: "Formation",
        actuel: "200 € / 350 €",
        propose: "300 € / 500 €",
        raison: "Demi-journée / journée, support préparé compris.",
      },
    ],
  },
];

/** Les packs du site, recalculés le 30/09/2026 : somme × 0,85 (× 0,80 pour Délégation), arrondi à 50 €. */
export const PACKS_EXEMPLES: {
  nom: string;
  pour: string;
  contenu: string;
  somme: number;
  prix: number;
  avant: string;
}[] = [
  {
    nom: "Identité & réseaux",
    pour: "Une activité qui n'a pas encore d'image",
    contenu: "Identité complète + 10 visuels + calendrier + audit réseaux + formation Canva 2 h",
    somme: 2210,
    prix: 1900,
    avant: "1 050 €",
  },
  {
    nom: "Lancement",
    pour: "Partir de zéro : site, image et réseaux ensemble",
    contenu:
      "Site vitrine + identité complète + 10 visuels + profils + calendrier + 1 mois de forfait Essentiel",
    somme: 4480,
    prix: 3800,
    avant: "2 700 € / 3 150 €",
  },
  {
    nom: "Lancement e-commerce",
    pour: "Vendre en ligne",
    contenu: "Boutique + identité complète + bannières + template e-mail + Analytics",
    somme: 5590,
    prix: 4750,
    avant: "4 100 €",
  },
  {
    nom: "Relance",
    pour: "Tout existe déjà mais ne travaille plus",
    contenu: "Refonte + rafraîchissement d'identité + 10 visuels + SEO technique + audit réseaux",
    somme: 3650,
    prix: 3100,
    avant: "2 250 €",
  },
  {
    nom: "Délégation (vitrine)",
    pour: "Ne plus s'en occuper du tout, 6 mois",
    contenu:
      "Site + identité + carte et flyer + 3 mois de CM + e-mailing + support prioritaire 6 mois",
    somme: 6724,
    prix: 5400,
    avant: "4 200 €",
  },
];

export const REVENU_EXEMPLE = {
  titre: "Ce que ça change sur ton mois",
  texte:
    "En micro-entreprise, environ 25,6 % du chiffre d'affaires part en cotisations en 2026. Pour 2 500 € nets, il faut facturer autour de 3 360 € par mois. Avec la grille actuelle : un site à 2 000 € + 3 forfaits Essentiel = 2 600 €, soit environ 1 930 € nets. Avec la grille proposée : un site à 2 400 € + 2 forfaits Standard = 3 300 €, soit environ 2 450 € nets, pour moins de clients à gérer.",
};

export const SOURCES_TARIFS: { label: string; url: string }[] = [
  {
    label: "La Fabrique du Net : coût d'un site vitrine",
    url: "https://www.lafabriquedunet.fr/creation-site-vitrine/articles/combien-coute-creation-site-vitrine/",
  },
  {
    label: "La Fabrique du Net : tarif community manager 2026",
    url: "https://www.lafabriquedunet.fr/tarif-community-manager-couts-et-prestations-types/",
  },
  {
    label: "La Fabrique du Net : TJM des développeurs freelances 2026",
    url: "https://www.lafabriquedunet.fr/tarifs-des-developpeurs-freelances-dans-les-grandes-villes-de-france/",
  },
  {
    label: "Tarifs moyens des graphistes",
    url: "https://modelesdebusinessplan.com/blogs/infos/graphistes-tarifs-moyens-actuels",
  },
];
