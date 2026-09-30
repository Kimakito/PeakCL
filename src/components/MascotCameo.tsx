import { MASCOT_POSES, MASCOT_SIZES, type MascotPose } from "@/lib/mascot";

/**
 * Apparition ponctuelle de la mascotte à côté d'un contenu : une image
 * statique, décorative (alt vide, ignorée par les lecteurs d'écran), qui ne
 * capte pas les clics.
 *
 * Le positionnement est laissé à l'appelant via `className` (hauteur,
 * `absolute`, point d'ancrage, breakpoint d'apparition) : chaque section a sa
 * place libre à elle, il n'y a pas d'emplacement générique qui marche partout.
 */
export function MascotCameo({
  pose,
  className = "",
  flip = false,
}: {
  pose: MascotPose;
  className?: string;
  /** Miroir horizontal, pour que la mascotte regarde vers le contenu. */
  flip?: boolean;
}) {
  const [width, height] = MASCOT_SIZES[pose];
  return (
    <img
      src={MASCOT_POSES[pose]}
      width={width}
      height={height}
      alt=""
      aria-hidden="true"
      // Pas de loading="lazy" : avec le défilement du site (scroll-snap sur
      // certaines pages), le chargement différé ne se déclenchait jamais et la
      // mascotte restait invisible. Priorité basse à la place : l'image
      // (50 à 90 Ko) arrive après le contenu utile sans le retarder.
      fetchPriority="low"
      decoding="async"
      draggable={false}
      className={`pointer-events-none w-auto select-none ${flip ? "-scale-x-100" : ""} ${className}`}
    />
  );
}
