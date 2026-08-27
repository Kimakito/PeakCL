import type { Config, Context } from "@netlify/edge-functions";

/**
 * En-tetes de securite et d'indexation, appliques a TOUTES les reponses.
 *
 * Pourquoi une edge function et pas les `[[headers]]` de netlify.toml :
 * ces blocs ne s'appliquent qu'aux fichiers servis par le CDN. Or le site est
 * rendu par la fonction SSR TanStack Start, donc AUCUNE page HTML ne les
 * recevait. Verifie en production le 17/08/2026 : `/robots.txt` (statique)
 * renvoyait bien CSP, X-Frame-Options, Referrer-Policy et Permissions-Policy,
 * tandis que `/` et `/cadrage/*` (SSR) n'en portaient aucun. Les vraies pages
 * — les seules qui peuvent etre encadrees dans une iframe ou desindexees —
 * etaient donc les seules non couvertes.
 *
 * Une edge function s'execute devant l'origine, quelle qu'elle soit : elle
 * couvre le HTML SSR, les fichiers statiques et tout ce qui sera ajoute
 * ensuite. C'est desormais la source unique de ces en-tetes ; netlify.toml ne
 * garde que le cache. Ne pas redupliquer ces cles la-bas : deux sources
 * finissent toujours par diverger.
 */
const SECURITY_HEADERS: Record<string, string> = {
  // Empeche l'encadrement du site par un tiers (clickjacking). SAMEORIGIN
  // plutot que DENY : /contact integre deja une iframe interne.
  "X-Frame-Options": "SAMEORIGIN",
  // Interdit au navigateur de deviner un type MIME different de celui servi.
  "X-Content-Type-Options": "nosniff",
  // Ne fuite pas l'URL complete (chemins de deck client, params) vers l'externe.
  "Referrer-Policy": "strict-origin-when-cross-origin",
  // Le site n'utilise ni camera, ni micro, ni geoloc : on les coupe.
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  // Force le HTTPS cote navigateur. Pas de `preload` : c'est quasi irreversible.
  // Netlify gere le HSTS au niveau du domaine et reecrit cet en-tete : la
  // production renvoie `max-age=31536000` sans `includeSubDomains`, quoi qu'on
  // demande ici. On l'envoie quand meme (au cas ou ce reglage change), mais
  // scripts/check-headers.mjs ne verifie que la duree.
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  // CSP en Report-Only : on observe les violations en console avant de basculer
  // la cle en `Content-Security-Policy`. `unsafe-inline` sur script-src est
  // requis par l'hydratation TanStack Start.
  //
  // HubSpot eclate ses ressources sur une dizaine de sous-domaines (analytics,
  // banniere, formulaires, meetings, CDN statique) et en ajoute au fil des
  // versions. Les lister un par un garantit une regression silencieuse au
  // prochain changement de leur cote, d'ou les jokers sur les domaines qu'ils
  // controlent entierement.
  //
  // Calendly reste autorise tant que BOOKING_URL pointe dessus (voir
  // src/lib/links.ts). A retirer une fois la bascule vers HubSpot Meetings
  // confirmee en production.
  "Content-Security-Policy-Report-Only": [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'self'",
    [
      "script-src 'self' 'unsafe-inline'",
      "https://www.googletagmanager.com",
      "https://*.hs-scripts.com",
      "https://*.hs-analytics.net",
      "https://*.hs-banner.com",
      "https://*.hsforms.net",
      "https://*.hsleadflows.net",
      "https://*.usemessages.com",
      "https://static.hsappstatic.net",
      // Bouton « Sources préférées » de Google Search, chargé sous
      // consentement sur les articles de conseils (GooglePreferredSource).
      "https://news.google.com",
    ].join(" "),
    [
      "style-src 'self' 'unsafe-inline'",
      "https://fonts.googleapis.com",
      "https://static.hsappstatic.net",
      "https://*.hsforms.net",
    ].join(" "),
    "font-src 'self' data: https://fonts.gstatic.com https://static.hsappstatic.net",
    "img-src 'self' data: blob: https:",
    "media-src 'self'",
    [
      "connect-src 'self'",
      "https://www.google-analytics.com",
      "https://*.analytics.google.com",
      "https://*.googletagmanager.com",
      "https://*.hubspot.com",
      "https://*.hubapi.com",
      "https://*.hsforms.com",
      "https://*.hs-analytics.net",
      "https://*.hs-banner.com",
    ].join(" "),
    "frame-src https://*.hubspot.com https://meetings-eu1.hubspot.com https://news.google.com",
    "form-action 'self'",
  ].join("; "),
};

/**
 * Decks clients : noindex au niveau HTTP, par defaut et a l'avance.
 *
 * Aucune page /cadrage/* n'existe aujourd'hui, ces URL renvoient un 404. Le
 * garde-fou reste utile pour deux raisons : le prochain deck sera noindex des
 * sa mise en ligne sans dependre d'une meta oubliee dans la route, et il couvre
 * les reponses non-HTML (un PDF de deck ne peut pas porter de meta).
 *
 * Ne PAS rebasculer /cadrage/ en Disallow dans robots.txt : une page interdite
 * au crawl n'est jamais lue, donc son noindex n'est jamais vu — c'est ce qui
 * avait produit le « indexee malgre le blocage » de Search Console.
 */
const NOINDEX_PREFIX = "/cadrage/";

export default async (request: Request, context: Context): Promise<Response> => {
  const response = await context.next();

  for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(name, value);
  }

  if (new URL(request.url).pathname.startsWith(NOINDEX_PREFIX)) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
};

export const config: Config = {
  path: "/*",
  // La fonction SSR et les assets restent servis normalement : on ne fait que
  // relayer la reponse de l'origine en lui ajoutant des en-tetes.
  excludedPath: ["/assets/*", "/fonts/*"],
};
