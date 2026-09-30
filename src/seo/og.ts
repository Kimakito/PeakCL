import { absUrl } from "@/seo/site";
import pages from "@/seo/og-pages.json";

/**
 * Carte de partage (og:image) propre à chaque page.
 *
 * Les cartes sont générées par scripts/generate-og.mjs dans public/og/, à
 * partir de src/seo/og-pages.json : c'est la même liste qui dit ici quelles
 * pages en ont une. Une page absente de la liste garde la carte d'accueil.
 * Avant le 30/09/2026, les 40 pages partageaient une seule image, hors charte.
 */
type OgPage = { kicker: string; title: string };
const OG_PAGES = pages as Record<string, OgPage>;

const DEFAULT = "/peakcl/og-cover.jpg";

function normalize(pathname: string): string {
  return pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
}

/** Métadonnées og:image / twitter:image pour un chemin donné. */
export function ogImageMeta(pathname: string) {
  const p = normalize(pathname);
  const page = OG_PAGES[p];
  const src = page ? `/og/${p === "/" ? "accueil" : p.slice(1)}.jpg` : DEFAULT;
  const alt = page ? `PeakCL · ${page.title}` : "PeakCL · Site internet, logo et réseaux sociaux";
  return [
    { property: "og:image", content: absUrl(src) },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: alt },
    { name: "twitter:image", content: absUrl(src) },
  ];
}
