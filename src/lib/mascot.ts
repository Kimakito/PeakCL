/**
 * Bibliothèque de poses de la mascotte PeakCL (v2 : kawaii, trait indigo,
 * salopette en jean). C'est la mascotte du favicon, des cartes de visite, du
 * flyer et de la signature mail : le site utilise la même, pour qu'on
 * reconnaisse la même personne partout.
 *
 * Fichiers : public/peakcl/mascotte/<slug>.webp, générés par
 * scripts/process-mascotte.mjs depuis brand/mascotte émotions/. Tous sont
 * détourés et recadrés pieds en bas : posés en `bottom: 0`, ils tiennent sur
 * la ligne.
 *
 * Règle d'usage (détaillée sur /ma-marque) : la pose suit le MESSAGE de la
 * section, pas l'envie du moment. Idée pour un conseil ou une solution,
 * réfléchit pour une question, joie ou dab pour une réussite, salut pour
 * accueillir ou prendre congé. Les poses agacées servent aux idées reçues,
 * jamais à côté d'un prix ou d'un formulaire.
 */
const BASE = "/peakcl/mascotte";

export const MASCOT_POSES = {
  salut: `${BASE}/salut.webp`, // accueille, dit au revoir
  joyeuse: `${BASE}/joyeuse.webp`, // bras levés, bonne nouvelle
  joie: `${BASE}/joie.webp`, // à genoux, émue (avis, remerciement)
  explosion: `${BASE}/explosion-joie.webp`, // victoire, projet livré
  dab: `${BASE}/dab.webp`, // fierté, réalisations
  idee: `${BASE}/idee.webp`, // conseil, solution
  reflechit: `${BASE}/reflechit.webp`, // question, FAQ
  contrariee: `${BASE}/contrariee.webp`, // idée reçue à casser
  agacee: `${BASE}/agacee.webp`, // erreur à éviter
  fatiguee: `${BASE}/fatiguee.webp`, // coulisses
  vener: `${BASE}/vener.webp`, // humour franc, rarement
} as const;

export type MascotPose = keyof typeof MASCOT_POSES;

/**
 * Dimensions réelles des fichiers (px). Passées en width/height à l'<img> :
 * sans elles, une image `loading="lazy"` en `w-auto` fait 0 px de large avant
 * chargement, et le navigateur ne la charge jamais. À mettre à jour si
 * scripts/process-mascotte.mjs est relancé avec une autre hauteur.
 */
export const MASCOT_SIZES: Record<MascotPose, [number, number]> = {
  salut: [345, 760],
  joyeuse: [459, 760],
  joie: [646, 760],
  explosion: [718, 760],
  dab: [630, 760],
  idee: [359, 760],
  reflechit: [302, 760],
  contrariee: [364, 760],
  agacee: [398, 760],
  fatiguee: [406, 760],
  vener: [505, 760],
};

/** Pose par défaut quand aucune n'est précisée. */
export const MASCOT_DEFAULT_POSE: MascotPose = "salut";
