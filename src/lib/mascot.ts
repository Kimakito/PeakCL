/**
 * Bibliothèque de poses de la mascotte PeakCL.
 *
 * Chaque clé pointe vers un fichier dans /public/peakcl/.
 * Pour ajouter une pose : dépose le fichier (WebP/PNG/SVG transparent) dans
 * public/peakcl/ puis ajoute une ligne ici. <Mascot pose="..." /> fait le reste.
 *
 * Les poses du hero sont normalisées au même cadrage 2:3 (pieds en bas) pour
 * que les transitions au survol soient fluides, sans saut d'échelle.
 */
export const MASCOT_POSES = {
  // — Poses HERO (WebP détouré, cadrage 2:3 homogène) —
  montre: "/peakcl/avatar-montre.webp", // présente / accueille (pose de repos)
  dab: "/peakcl/avatar-dab.webp", // dab façon Usain Bolt
  victoire: "/peakcl/avatar-victoire.webp", // bras levés, « c'est parti »
  tablette: "/peakcl/avatar-tablette.webp", // tablette graphique (création)
  bas: "/peakcl/avatar-bas.webp", // pointe vers le bas
  graphique: "/peakcl/avatar-graphique.webp", // tient un graphique qui monte

  // — Poses SECTIONS / FOOTER (prêtes à l'emploi) —
  idee: "/peakcl/avatar-idee.webp", // 💡 ampoule (audit / conseil)
  reseaux: "/peakcl/avatar-reseaux.webp", // 📱 selfie réseaux sociaux
  bureau: "/peakcl/avatar-bureau.webp", // 💻 devant l'ordinateur (scène complète)
  marche: "/peakcl/avatar-marche.webp", // 🚶 marche (animation au scroll)
  arc: "/peakcl/avatar-arc.webp", // 🎯 l'archère (ciblage marketing)
  assise: "/peakcl/avatar-assise.webp", // ☕ assise détendue (footer)
  sieste: "/peakcl/avatar-sieste.webp", // 💤 sieste sur le logo (footer)
} as const;

export type MascotPose = keyof typeof MASCOT_POSES;

/** Pose affichée par défaut (repos) dans le hero. */
export const MASCOT_DEFAULT_POSE: MascotPose = "montre";
