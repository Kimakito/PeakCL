import { MASCOT_POSES, MASCOT_SIZES, type MascotPose } from "@/lib/mascot";

/** Largeur d'écran à partir de laquelle la mascotte apparaît (breakpoints Tailwind). */
const FROM = {
  md: { media: "(min-width: 768px)", visible: "hidden md:block" },
  lg: { media: "(min-width: 1024px)", visible: "hidden lg:block" },
  xl: { media: "(min-width: 1280px)", visible: "hidden xl:block" },
} as const;

/** GIF transparent 1×1 : ce que charge un écran trop petit pour la mascotte. */
const EMPTY = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

/**
 * Apparition ponctuelle de la mascotte à côté d'un contenu : une image
 * statique, décorative (alt vide, ignorée par les lecteurs d'écran), qui ne
 * capte pas les clics.
 *
 * La mascotte n'existe qu'à partir d'une largeur d'écran (`from`). En dessous,
 * elle est masquée ET jamais téléchargée : le <picture> ne sert le WebP que si
 * la requête média correspond, sinon un GIF vide inline. Un simple
 * `hidden lg:block` masquait l'image mais la faisait quand même télécharger
 * sur mobile (≈ 260 Ko pour les quatre poses de l'accueil, relevé par
 * Lighthouse).
 *
 * Au-dessus du breakpoint, chargement différé (loading="lazy") et priorité
 * basse : la mascotte n'arrive que près de l'écran, sans jamais retarder le
 * contenu. Les dimensions réelles (width/height) sont indispensables : sans
 * elles, une image différée en `w-auto` fait 0 px de large et n'est jamais
 * chargée.
 *
 * Le placement (hauteur, `absolute`, ancrage) reste à l'appelant via
 * `className` : chaque section a sa place libre à elle.
 */
export function MascotCameo({
  pose,
  from = "lg",
  className = "",
  flip = false,
}: {
  pose: MascotPose;
  /** Breakpoint d'apparition (et de téléchargement). */
  from?: keyof typeof FROM;
  className?: string;
  /** Miroir horizontal, pour que la mascotte regarde vers le contenu. */
  flip?: boolean;
}) {
  const [width, height] = MASCOT_SIZES[pose];
  const bp = FROM[from];
  return (
    <picture className="contents">
      <source media={bp.media} srcSet={MASCOT_POSES[pose]} />
      <img
        src={EMPTY}
        width={width}
        height={height}
        alt=""
        aria-hidden="true"
        loading="lazy"
        fetchPriority="low"
        decoding="async"
        draggable={false}
        className={`pointer-events-none w-auto select-none ${bp.visible} ${flip ? "-scale-x-100" : ""} ${className}`}
      />
    </picture>
  );
}
