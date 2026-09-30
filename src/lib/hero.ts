/**
 * Photo du premier écran de l'accueil, en trois largeurs, AVIF puis WebP
 * (générées depuis brand/hero.png). Partagé entre BrandHero, qui l'affiche,
 * et le head de la route /, qui la précharge : les deux doivent annoncer
 * exactement les mêmes fichiers, sinon le préchargement est perdu.
 */
export const HERO = "/peakcl/hero/hero";
export const HERO_WIDTHS = [640, 960, 1280] as const;
export const HERO_SIZES = "(min-width: 1024px) 46vw, 100vw";
export const heroSrcSet = (ext: "avif" | "webp") =>
  HERO_WIDTHS.map((w) => `${HERO}-${w}.${ext} ${w}w`).join(", ");
