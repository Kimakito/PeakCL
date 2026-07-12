/**
 * Galerie « mascotte PeakCL » : jeu d'expressions d'un personnage écran-jaune,
 * dessiné sous Illustrator. Sert de démonstration de character design sur la
 * page /design (portfolio illustration).
 *
 * Fichiers : public/peakcl/assets/images/mascot-<slug>.webp
 * (générés par scripts/process-mascot.mjs depuis /images/<mood>-web.png)
 */

const BASE = "/peakcl/assets/images";

export type MascotShot = {
  slug: string;
  src: string;
  /** Humeur en un mot, affichée en légende. */
  mood: string;
  /** Texte alternatif accessible (français). */
  alt: string;
  /** Format natif de l'illustration. */
  orientation: "portrait" | "paysage";
};

export const MASCOT_GALLERY: MascotShot[] = [
  {
    slug: "happy",
    src: `${BASE}/mascot-happy.webp`,
    mood: "Euphorie",
    alt: "Mascotte PeakCL bras levés, feux d'artifice étoilés, expression de joie",
    orientation: "portrait",
  },
  {
    slug: "think",
    src: `${BASE}/mascot-think.webp`,
    mood: "Réflexion",
    alt: "Mascotte PeakCL pensive, ampoule allumée au-dessus de la tête",
    orientation: "portrait",
  },
  {
    slug: "thumbs-up",
    src: `${BASE}/mascot-thumbs-up.webp`,
    mood: "Validation",
    alt: "Mascotte PeakCL pouce levé sous un ciel ensoleillé",
    orientation: "paysage",
  },
  {
    slug: "sceptic",
    src: `${BASE}/mascot-sceptic.webp`,
    mood: "Doute",
    alt: "Mascotte PeakCL sceptique, ciel voilé au-dessus de la tête",
    orientation: "portrait",
  },
  {
    slug: "storm",
    src: `${BASE}/mascot-storm.webp`,
    mood: "Contrariété",
    alt: "Mascotte PeakCL en colère, nuage d'orage et éclair au-dessus de la tête",
    orientation: "portrait",
  },
  {
    slug: "sad",
    src: `${BASE}/mascot-sad.webp`,
    mood: "Découragement",
    alt: "Mascotte PeakCL triste sous un nuage de pluie",
    orientation: "portrait",
  },
];
