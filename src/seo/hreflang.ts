/**
 * Balises hreflang réciproques pour une page traduite.
 *
 * On passe TOUJOURS le chemin FR canonique : la fonction en déduit l'équivalent
 * EN via ROUTE_MAP, si bien que les deux versions d'une page émettent exactement
 * les mêmes alternates. Une paire hreflang non réciproque est ignorée par
 * Google, d'où cette source unique.
 *
 * `x-default` pointe sur le FR : c'est la version historique, celle qui rank.
 */
import { absUrl } from "@/seo/site";
import { alternatePath, OG_LOCALE, type Locale } from "@/i18n/config";

type LinkTag = { rel: string; hrefLang?: string; href: string };

/** Liens <link rel="alternate" hreflang> à insérer dans `head().links`. */
export function hreflangLinks(frPath: string): LinkTag[] {
  const enPath = alternatePath(frPath, "en");
  return [
    { rel: "alternate", hrefLang: "fr", href: absUrl(frPath) },
    { rel: "alternate", hrefLang: "en", href: absUrl(enPath) },
    { rel: "alternate", hrefLang: "x-default", href: absUrl(frPath) },
  ];
}

/** Balise canonical de la page dans la langue passée. */
export function canonicalLink(frPath: string, locale: Locale): LinkTag {
  const path = locale === "en" ? alternatePath(frPath, "en") : frPath;
  return { rel: "canonical", href: absUrl(path) };
}

/** Meta og:locale + og:url cohérents avec la langue. */
export function ogLocaleMeta(frPath: string, locale: Locale) {
  const path = locale === "en" ? alternatePath(frPath, "en") : frPath;
  return [
    { property: "og:locale", content: OG_LOCALE[locale] },
    { property: "og:url", content: absUrl(path) },
  ];
}
