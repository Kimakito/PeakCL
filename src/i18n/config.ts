/**
 * Fondations i18n.
 *
 * Le français reste à la racine (`/services`, `/qui-suis-je`…), les URLs qui
 * rankent ne bougent pas. L'anglais vit sous `/en/` avec des slugs anglais
 * (`/en/web-development`), meilleurs pour le SEO et l'UX qu'un `/en/sites-web`.
 *
 * `ROUTE_MAP` est la source unique de vérité : il alimente à la fois le
 * sélecteur de langue (chemin courant -> son équivalent) et les balises
 * hreflang (chaque page déclare son alternative dans l'autre langue).
 */

export type Locale = "fr" | "en";

export const DEFAULT_LOCALE: Locale = "fr";
export const LOCALES: Locale[] = ["fr", "en"];

/** Balise BCP-47 pour l'attribut <html lang> et og:locale. */
export const HTML_LANG: Record<Locale, string> = {
  fr: "fr",
  en: "en",
};
export const OG_LOCALE: Record<Locale, string> = {
  fr: "fr_FR",
  en: "en_US",
};

/**
 * Paires de routes traduites. `fr` et `en` sont des chemins absolus.
 * Seules les 8 pages commerciales sont traduites ; tout ce qui n'est pas ici
 * (villes, decks, conseils) n'a pas d'équivalent anglais et pointera vers
 * l'accueil dans l'autre langue.
 */
export const ROUTE_MAP: { fr: string; en: string }[] = [
  { fr: "/", en: "/en" },
  { fr: "/services", en: "/en/services" },
  { fr: "/sites-web", en: "/en/web-development" },
  { fr: "/community-management", en: "/en/social-media" },
  { fr: "/design", en: "/en/design" },
  { fr: "/accompagnement-automatisation", en: "/en/automation" },
  { fr: "/portfolio", en: "/en/portfolio" },
  { fr: "/qui-suis-je", en: "/en/about" },
  { fr: "/reservation-appel", en: "/en/book-a-call" },
];

/** Normalise un pathname : retire le slash final (sauf racine). */
function normalize(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

/** Langue déduite de l'URL : `en` si le chemin est `/en` ou commence par `/en/`. */
export function localeFromPath(pathname: string): Locale {
  const p = normalize(pathname);
  return p === "/en" || p.startsWith("/en/") ? "en" : "fr";
}

/**
 * Chemin équivalent dans l'autre langue, pour le sélecteur et les hreflang.
 * Une page sans traduction (ville, deck) renvoie la racine de l'autre langue,
 * plutôt qu'un lien mort.
 */
export function alternatePath(pathname: string, target: Locale): string {
  const p = normalize(pathname);
  const pair = ROUTE_MAP.find((r) => r.fr === p || r.en === p);
  if (pair) return pair[target];
  return target === "en" ? "/en" : "/";
}
