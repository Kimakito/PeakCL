import {
  EXPRESSIONS,
  EXPRESSION_LIST,
  SECTION_CARDS,
  type ExpressionSlug,
  type SectionCardSlug,
} from "@/lib/expressions";

/**
 * Visuels « humains » PeakCL, prêts à poser dans n'importe quelle page.
 * Tout est en Tailwind + variables de marque, animations coupées en
 * reduced-motion (variante `motion-reduce:`).
 */

type ExpressionPhotoProps = {
  slug: ExpressionSlug;
  /** Petite légende / humeur affichée en pastille (ex. « Sceptique »). */
  caption?: string;
  /** Rotation ludique au repos, en degrés (défaut 0). */
  tilt?: number;
  className?: string;
  /** Classe(s) sur l'image (largeur/hauteur). Défaut : carré souple. */
  imgClassName?: string;
  loading?: "lazy" | "eager";
};

/** Photo d'expression encadrée, avec inclinaison et survol vivant. */
export function ExpressionPhoto({
  slug,
  caption,
  tilt = 0,
  className = "",
  imgClassName = "aspect-[3/4] w-40",
  loading = "lazy",
}: ExpressionPhotoProps) {
  const e = EXPRESSIONS[slug];
  return (
    <figure
      className={`group relative inline-block ${className}`}
      style={{ rotate: `${tilt}deg` }}
    >
      <div className="overflow-hidden rounded-2xl border border-[color-mix(in_oklab,var(--brand-turquoise)_28%,transparent)] bg-card shadow-card transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 group-hover:rotate-[-2deg] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 motion-reduce:group-hover:rotate-0">
        <img
          src={e.src}
          alt={e.alt}
          loading={loading}
          decoding="async"
          className={`block object-cover ${imgClassName}`}
        />
      </div>
      {caption ? (
        <figcaption className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-card/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.04em] text-foreground shadow-card backdrop-blur">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

type ExpressionGalleryProps = {
  /** Slugs à afficher, dans l'ordre. Défaut : une sélection variée. */
  slugs?: ExpressionSlug[];
  /** Affiche l'humeur sous chaque photo. */
  showCaptions?: boolean;
  className?: string;
};

const DEFAULT_GALLERY: ExpressionSlug[] = [
  "grand-sourire",
  "sceptique",
  "sourcil-leve",
  "lunettes-reflexion",
  "determinee",
  "eyeliner-confiante",
  "sourire-malicieux",
  "batman",
];

/** Rangée d'expressions inclinées, façon planche de BD. */
export function ExpressionGallery({
  slugs = DEFAULT_GALLERY,
  showCaptions = true,
  className = "",
}: ExpressionGalleryProps) {
  const tilts = [-4, 3, -2, 4, -3, 2, -4, 3];
  return (
    <div className={`flex flex-wrap items-end justify-center gap-4 sm:gap-5 ${className}`}>
      {slugs.map((slug, i) => (
        <ExpressionPhoto
          key={slug}
          slug={slug}
          tilt={tilts[i % tilts.length]}
          caption={showCaptions ? EXPRESSIONS[slug].mood : undefined}
          imgClassName="aspect-[3/4] w-24 sm:w-28 md:w-32"
        />
      ))}
    </div>
  );
}

type SectionAvatarCardProps = {
  slug: SectionCardSlug;
  className?: string;
  imgClassName?: string;
  loading?: "lazy" | "eager";
};

/** Carte de section labellisée (avatar + intitulé gravé), en vignette flottante. */
export function SectionAvatarCard({
  slug,
  className = "",
  imgClassName = "w-full max-w-[280px]",
  loading = "lazy",
}: SectionAvatarCardProps) {
  const c = SECTION_CARDS[slug];
  return (
    <div
      className={`group overflow-hidden rounded-3xl border border-white/10 shadow-card transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${className}`}
    >
      <img
        src={c.src}
        alt={c.alt}
        loading={loading}
        decoding="async"
        className={`block h-auto object-cover ${imgClassName}`}
      />
    </div>
  );
}

export { EXPRESSION_LIST };
