/**
 * Bibliothèque des visuels « humains » PeakCL.
 *
 * Deux familles :
 *  - EXPRESSIONS : photos de Charlotte stylisées BD, une par humeur. Servent à
 *    donner de la personnalité (galeries, bulles, accents de section).
 *  - SECTION_CARDS : illustrations avatar labellisées, prêtes à poser comme
 *    vignette de section (Offres, Portfolio, Réseaux…).
 *
 * Tous les fichiers vivent dans /public/peakcl/assets/images/ (WebP).
 */

const BASE = "/peakcl/assets/images";

export type ExpressionSlug =
  | "sourire-detendu"
  | "sourire-malicieux"
  | "sourire-exterieur"
  | "planche-expressions"
  | "collage-signature"
  | "intense"
  | "sceptique"
  | "grand-sourire"
  | "sourcil-leve"
  | "lunettes-cool"
  | "lunettes-reflexion"
  | "determinee"
  | "eyeliner-confiante"
  | "batman";

export interface Expression {
  slug: ExpressionSlug;
  src: string;
  /** Texte alternatif accessible (français). */
  alt: string;
  /** Humeur en un mot, utilisable comme légende / bulle. */
  mood: string;
}

export const EXPRESSIONS: Record<ExpressionSlug, Expression> = {
  "sourire-detendu": {
    slug: "sourire-detendu",
    src: `${BASE}/expr-sourire-detendu.webp`,
    alt: "Charlotte, sourire détendu",
    mood: "Détendue",
  },
  "sourire-malicieux": {
    slug: "sourire-malicieux",
    src: `${BASE}/expr-sourire-malicieux.webp`,
    alt: "Charlotte, sourire malicieux",
    mood: "Malicieuse",
  },
  "sourire-exterieur": {
    slug: "sourire-exterieur",
    src: `${BASE}/expr-sourire-exterieur.webp`,
    alt: "Charlotte souriante en extérieur",
    mood: "Souriante",
  },
  "planche-expressions": {
    slug: "planche-expressions",
    src: `${BASE}/expr-planche-expressions.webp`,
    alt: "Planche des expressions de Charlotte",
    mood: "Toutes mes têtes",
  },
  "collage-signature": {
    slug: "collage-signature",
    src: `${BASE}/expr-collage-signature.webp`,
    alt: "Collage signature Charlotte Lacroix",
    mood: "Charlotte Lacroix",
  },
  intense: {
    slug: "intense",
    src: `${BASE}/expr-intense.webp`,
    alt: "Charlotte, regard intense et concentré",
    mood: "Concentrée",
  },
  sceptique: {
    slug: "sceptique",
    src: `${BASE}/expr-sceptique.webp`,
    alt: "Charlotte, air sceptique",
    mood: "Sceptique",
  },
  "grand-sourire": {
    slug: "grand-sourire",
    src: `${BASE}/expr-grand-sourire.webp`,
    alt: "Charlotte, grand sourire",
    mood: "Ravie",
  },
  "sourcil-leve": {
    slug: "sourcil-leve",
    src: `${BASE}/expr-sourcil-leve.webp`,
    alt: "Charlotte, un sourcil levé",
    mood: "Intriguée",
  },
  "lunettes-cool": {
    slug: "lunettes-cool",
    src: `${BASE}/expr-lunettes-cool.webp`,
    alt: "Charlotte avec des lunettes, décontractée",
    mood: "Peinarde",
  },
  "lunettes-reflexion": {
    slug: "lunettes-reflexion",
    src: `${BASE}/expr-lunettes-reflexion.webp`,
    alt: "Charlotte avec des lunettes, en pleine réflexion",
    mood: "En réflexion",
  },
  determinee: {
    slug: "determinee",
    src: `${BASE}/expr-determinee.webp`,
    alt: "Charlotte, air déterminé",
    mood: "Déterminée",
  },
  "eyeliner-confiante": {
    slug: "eyeliner-confiante",
    src: `${BASE}/expr-eyeliner-confiante.webp`,
    alt: "Charlotte, regard confiant",
    mood: "Confiante",
  },
  batman: {
    slug: "batman",
    src: `${BASE}/expr-batman.webp`,
    alt: "Charlotte déguisée en Batman",
    mood: "Super-héroïne du web",
  },
};

/** Liste ordonnée, pratique pour une galerie. */
export const EXPRESSION_LIST: Expression[] = Object.values(EXPRESSIONS);

/**
 * Cartes de section labellisées (avatar + halo + intitulé gravé dans l'image).
 * Se posent comme vignette décorative d'un en-tête de section.
 */
export type SectionCardSlug =
  | "portfolio"
  | "logos"
  | "avis-clients"
  | "contact"
  | "tips"
  | "reseaux"
  | "qui-suis-je"
  | "offres"
  | "sites-web";

export interface SectionCard {
  slug: SectionCardSlug;
  src: string;
  alt: string;
}

export const SECTION_CARDS: Record<SectionCardSlug, SectionCard> = {
  portfolio: { slug: "portfolio", src: `${BASE}/carte-portfolio.webp`, alt: "Charlotte présente le portfolio PeakCL" },
  logos: { slug: "logos", src: `${BASE}/carte-logos.webp`, alt: "Charlotte crée un logo sur sa tablette" },
  "avis-clients": { slug: "avis-clients", src: `${BASE}/carte-avis-clients.webp`, alt: "Charlotte, bras levés, célèbre les avis clients" },
  contact: { slug: "contact", src: `${BASE}/carte-contact.webp`, alt: "Charlotte vient vers vous, contact" },
  tips: { slug: "tips", src: `${BASE}/carte-tips.webp`, alt: "Charlotte partage une astuce, ampoule allumée" },
  reseaux: { slug: "reseaux", src: `${BASE}/carte-reseaux.webp`, alt: "Charlotte en selfie entourée des réseaux sociaux" },
  "qui-suis-je": { slug: "qui-suis-je", src: `${BASE}/carte-qui-suis-je.webp`, alt: "Charlotte assise, présentation" },
  offres: { slug: "offres", src: `${BASE}/carte-offres.webp`, alt: "Charlotte présente les offres, courbe qui monte" },
  "sites-web": { slug: "sites-web", src: `${BASE}/carte-sites-web.webp`, alt: "Charlotte à son bureau, création de sites web" },
};
