export type PeakclTestimonial = {
  name: string;
  sourceLabel?: string;
  dateLabel?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  /**
   * Logo du client qui a laissé l'avis, affiché en vignette.
   *
   * Renseigné UNIQUEMENT quand le rattachement est certain. Deux sources le
   * rendent certain : la réponse publique de PeakCL sur la fiche Google, qui
   * renvoie vers le site livré, ou la confirmation directe de Charlotte —
   * c'est le cas de Mathilde Treille pour Peak Training et de Céline Gaillard
   * pour C'mieux comme ça, dont les avis sont signés d'une initiale.
   *
   * Sans l'une de ces deux confirmations, on laisse vide et le mur affiche les
   * initiales : mieux vaut pas de logo qu'un avis attribué au mauvais client.
   */
  logoUrl?: string;
};

/**
 * Avis clients affichés sur l'accueil, relevés sur la fiche Google Business
 * Profile (6 avis, 5,0/5 au 26/08/2026).
 *
 * Deux règles :
 *
 * 1. **Citation verbatim, jamais reformulée.** Les entrées précédentes étaient
 *    des paraphrases : elles mettaient des mots dans la bouche de clients
 *    réels, et elles ne correspondaient plus au texte que Google affiche à
 *    trois clics de là. On coupe désormais à la phrase, sans réécrire.
 * 2. **Ordre antéchronologique.** Un avis récent vaut plus qu'un avis ancien :
 *    le plus frais s'affiche en premier.
 *
 * `sourceLabel` nomme le projet quand la réponse publique de PeakCL sur la
 * fiche Google permet de le rattacher sans ambiguïté (elle y renvoie vers le
 * site livré). Sans cette confirmation, on laisse « Avis Google ✓ » seul.
 *
 * Le JSON-LD `AggregateRating` de `src/seo/jsonld.ts` doit rester synchronisé
 * avec cette liste : un `reviewCount` qui ne correspond pas au nombre d'avis
 * réellement publics est exactement le genre d'incohérence que Google écarte.
 */
export const peakclTestimonials: PeakclTestimonial[] = [
  {
    name: "Laura",
    sourceLabel: "Mordant Équin · Avis Google ✓",
    logoUrl: "/peakcl/assets/logo/mordant-equin.png",
    dateLabel: "août 2026",
    rating: 5,
    quote:
      "Un accompagnement à la fois rassurant, enrichissant et réellement personnalisé pour mes débuts d’entrepreneure.",
  },
  {
    name: "Émilie Bailleux",
    sourceLabel: "Natural Riders · Avis Google ✓",
    logoUrl: "/peakcl/assets/logo/natural_riders.avif",
    dateLabel: "juillet 2026",
    rating: 5,
    quote:
      "Elle a su m’orienter dans mon choix d’un hébergement et d’une plateforme adaptée. Charlotte est réactive et a bien compris les besoins très spécifiques de mon site internet.",
  },
  {
    name: "Camille Daldosso",
    sourceLabel: "Plumes Poils & Compagnie · Avis Google ✓",
    logoUrl: "/peakcl/assets/logo/plumespoilsetcie.png",
    dateLabel: "juin 2026",
    rating: 5,
    quote:
      "Un grand merci à Charlotte pour sa réactivité, son expertise, ses idées et ses conseils. Elle a parfaitement cerné mes besoins tout en étant force de proposition.",
  },
  {
    name: "Mathilde T.",
    sourceLabel: "Peak Training · Avis Google ✓",
    logoUrl: "/peakcl/assets/logo/Peak-training.png",
    dateLabel: "mai 2026",
    rating: 5,
    quote:
      "Charlotte a très vite compris mes besoins et m’a proposé une direction plus moderne, plus claire et plus adaptée à mon activité.",
  },
  {
    name: "Céline G.",
    sourceLabel: "C'mieux comme ça · Avis Google ✓",
    logoUrl: "/peakcl/assets/logo/cmieuxcommeca.webp",
    dateLabel: "mars 2026",
    rating: 5,
    quote:
      "Les questions posées au démarrage ont permis de créer un premier jet très juste, puis de livrer un site opérationnel à temps.",
  },
  {
    name: "Victor G.",
    sourceLabel: "Adelante Voyage · Avis Google ✓",
    logoUrl: "/peakcl/assets/logo/logo-adelante.webp",
    rating: 5,
    quote:
      "Charlotte a compris nos attentes et a livré un site à la hauteur de nos ambitions, avec beaucoup de réactivité et de sens pratique.",
  },
];
