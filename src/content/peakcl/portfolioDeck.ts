import { peakclPortfolio, type PeakclProject } from "./portfolio";

/** Catégorie de métier — sert au hub de filtrage du portfolio. */
export type Category = { slug: string; label: string; short: string; accent: string };

export type DeckProject = Omit<PeakclProject, "siteUrl"> & {
  siteUrl?: string;
  slug: string;
  category: string; // catégorie principale
  categories?: string[]; // si le projet relève de plusieurs métiers
  status: "live" | "construction";
  shot?: string; // /peakcl/portfolio/<slug>.webp
  accent: string;
};

export const CATEGORIES: Category[] = [
  { slug: "therapeute", label: "Thérapeutes & bien-être", short: "Thérapeutes", accent: "#34D399" },
  { slug: "artisan", label: "Artisans", short: "Artisans", accent: "#F59E0B" },
  { slug: "equestre", label: "Équitation & équestre", short: "Équestre", accent: "#84CC16" },
  { slug: "artiste", label: "Artistes & créatifs", short: "Artistes", accent: "#EC4899" },
  { slug: "ecrivain", label: "Écrivain", short: "Écrivain", accent: "#7B3FF2" },
  { slug: "archi", label: "Architectes & déco", short: "Architectes", accent: "#3B82F6" },
  { slug: "pme", label: "PME & tech", short: "PME & tech", accent: "#00E5D4" },
  { slug: "taxi", label: "Taxi & mobilité", short: "Taxi", accent: "#FFD500" },
  { slug: "droit", label: "Avocate & juridique", short: "Juridique", accent: "#64748B" },
  { slug: "pro-sante", label: "Santé & bien-être", short: "Santé", accent: "#6366F1" },
  { slug: "tourisme-animaux", label: "Tourisme & animaux", short: "Tourisme & animaux", accent: "#FB7185" },
];

const ACCENT_FALLBACK = "#00E5D4";
const accentOf = (cat: string) => CATEGORIES.find((c) => c.slug === cat)?.accent ?? ACCENT_FALLBACK;

/** title → { catégorie, slug, capture? }. La capture pointe vers /peakcl/portfolio/<shot>.webp */
const META: Record<string, { category: string; slug: string; shot?: string; categories?: string[] }> = {
  "Adelante Voyages": { category: "tourisme-animaux", slug: "adelante", shot: "adelante" },
  "Cabinet Johanna Alfonso": { category: "droit", slug: "alfonso", shot: "alfonso" },
  "Plumes Poils & Compagnie": { category: "tourisme-animaux", slug: "plumes", shot: "plumes" },
  "Fiona Espitallier Dick": { category: "artiste", slug: "fiona", shot: "fiona" },
  "Jantes 73 : La Vieille Roue": { category: "artisan", slug: "jantes73", shot: "jantes73" },
  "SETIC Fluides": { category: "pme", slug: "setic", shot: "setic" },
  "SP Services Rénovation": { category: "artisan", slug: "sp-renovation", shot: "sp-renovation" },
  "Laboratoire Sanchez Randon": { category: "pro-sante", slug: "sanchez-randon", shot: "sanchez-randon" },
  "Mordant Équin": { category: "equestre", slug: "mordant-equin", shot: "mordant-equin" },
  "TrackDM": { category: "pme", slug: "trackdm" },
  "Jean-Baptiste Lacroix": { category: "ecrivain", slug: "jb-lacroix", shot: "jb-lacroix" },
  "DoodleIdoo": { category: "artiste", slug: "doodleidoo", shot: "doodleidoo" },
  "LM Équitation Western": { category: "equestre", slug: "lm-equitation", shot: "lm-equitation" },
  "C'mieux comme ça": { category: "archi", slug: "cmieux", shot: "cmieux" },
  "Les 9 Poilus": { category: "tourisme-animaux", slug: "9poilus", shot: "9poilus" },
  "Ostéo Animal Care": { category: "pro-sante", slug: "osteo-animal", shot: "osteo-animal" },
  "Le Juste Plan": { category: "archi", slug: "le-juste-plan", shot: "le-juste-plan" },
  "Natural Riders": { category: "artisan", slug: "natural-riders", shot: "natural-riders", categories: ["artisan", "tourisme-animaux"] },
  "Peak Training": { category: "pro-sante", slug: "peak-training", shot: "peak-training" },
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const shotPath = (s?: string) => (s ? `/peakcl/portfolio/${s}.webp` : undefined);

/** Clients en cours de construction (pas encore de site live). */
const CONSTRUCTION: DeckProject[] = [
  {
    title: "Véronique Kaba", subtitle: "Thérapeute · Savoie",
    description: "Site en cours de création : une présence en ligne chaleureuse et rassurante pour son accompagnement thérapeutique.",
    tags: ["Site vitrine", "Bien-être"], category: "therapeute", status: "construction",
    slug: "veronique-kaba", accent: accentOf("therapeute"),
  },
  {
    title: "Pascale Vert", subtitle: "Thérapeute · Savoie",
    description: "Site en cours de création : une vitrine claire et apaisante pour présenter sa pratique et faciliter la prise de contact.",
    tags: ["Site vitrine", "Bien-être"], category: "therapeute", status: "construction",
    slug: "pascale-vert", accent: accentOf("therapeute"),
  },
  {
    title: "VS-Taxi", subtitle: "Taxi · Savoie",
    description: "Site en cours de création : réservation simple, zones desservies et contact rapide pour un service de taxi local.",
    tags: ["Site vitrine", "Réservation"], category: "taxi", status: "construction",
    slug: "vs-taxi", accent: accentOf("taxi"),
  },
];

export const DECK_PROJECTS: DeckProject[] = [
  ...peakclPortfolio.map((p): DeckProject => {
    const m = META[p.title] ?? { category: "pme", slug: slugify(p.title) };
    return {
      ...p,
      slug: m.slug,
      category: m.category,
      categories: m.categories,
      status: "live",
      shot: shotPath(m.shot),
      accent: accentOf(m.category),
    };
  }),
  ...CONSTRUCTION,
];

/** Un projet appartient-il à une catégorie (gère le multi-catégories) ? */
export const inCategory = (p: DeckProject, cat: string) => (p.categories ?? [p.category]).includes(cat);

/** Projets live d'une catégorie ("all" = tous). */
export function liveProjects(cat: string = "all"): DeckProject[] {
  return DECK_PROJECTS.filter((p) => p.status === "live" && (cat === "all" || inCategory(p, cat)));
}

/** Clients en cours d'une catégorie ("all" = tous). */
export function constructionProjects(cat: string = "all"): DeckProject[] {
  return DECK_PROJECTS.filter((p) => p.status === "construction" && (cat === "all" || inCategory(p, cat)));
}

/** Tous les projets (live + en cours) d'une catégorie. */
export function categoryProjects(cat: string): DeckProject[] {
  return DECK_PROJECTS.filter((p) => inCategory(p, cat));
}

/** Nombre de réalisations live par catégorie. */
export function liveCount(cat: string): number {
  return DECK_PROJECTS.filter((p) => p.status === "live" && inCategory(p, cat)).length;
}

/* ── Portfolio LOGOS (créations) ─────────────────────────────── */
export type LogoProject = {
  name: string;
  metier: string;
  file: string; // /peakcl/logos/<x>
  accent: string;
  note?: string;
};

export const LOGO_PROJECTS: LogoProject[] = [
  { name: "PeakCL", metier: "Studio web & design", file: "/peakcl/logos/peakcl.webp", accent: "#00E5D4", note: "Identité maison : sommet + circuit, énergie tech." },
  { name: "La Vieille Roue", metier: "Artisan automobile · Albertville", file: "/peakcl/logos/lavieilleroue.svg", accent: "#F59E0B", note: "Roue, route de montagne et savoir-faire mécanique." },
  { name: "SETIC Fluides", metier: "Bureau d'études · BTP", file: "/peakcl/logos/setic.svg", accent: "#1D9E75", note: "Sommet stylisé, sobriété technique." },
  { name: "Fiona Espitallier", metier: "Artiste comédie musicale", file: "/peakcl/logos/fiona.svg", accent: "#0F6E56", note: "Monogramme FE, silhouette en mouvement." },
  { name: "Peak Training", metier: "Coaching sportif · Ugine", file: "/peakcl/logos/peak-training.svg", accent: "#6B7F3A", note: "Blason montagne, texture kaki sportive." },
];
