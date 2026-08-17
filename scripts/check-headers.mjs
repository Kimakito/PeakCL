/**
 * Verifie en HTTP reel que les en-tetes de securite arrivent sur les VRAIES
 * pages, pas seulement sur les fichiers statiques.
 *
 * Pourquoi ce script existe : pendant des mois, les `[[headers]]` de
 * netlify.toml n'ont couvert que le CDN. Le site etant rendu par la fonction
 * SSR TanStack Start, aucune page HTML ne recevait X-Frame-Options, CSP,
 * Referrer-Policy ni Permissions-Policy — et le garde-fou `X-Robots-Tag:
 * noindex` des decks clients ne s'appliquait pas davantage. Rien ne le signalait
 * : la configuration avait l'air correcte, `/robots.txt` la confirmait, et
 * personne ne pense a tester une page HTML.
 *
 * Les en-tetes sont maintenant poses par une edge function
 * (netlify/edge-functions/security-headers.ts). Ce script est la pour que le
 * jour ou elle casse, se desactive ou disparait, on l'apprenne autrement que
 * par un audit.
 *
 * A lancer APRES deploiement : il interroge la production.
 *
 *   npm run headers:check
 *   npm run headers:check -- --base https://deploy-preview-42--peakcl.netlify.app
 *
 * Il tourne aussi contre `netlify dev`, utile pour verifier l'edge function sans
 * deployer :
 *
 *   npx netlify dev --offline --port 8877 --target-port 5175 \
 *     --command "npx vite preview --port 5175 --strictPort"
 *   npm run headers:check -- --base http://localhost:8877
 *
 * Une reserve dans ce mode : `netlify dev` ne reproduit pas le cache du CDN et
 * sert les polices en `no-cache`. La derniere ligne du rapport (assets
 * immuables) echoue donc en local alors qu'elle passe en production. Les autres
 * lignes, elles, sont fiables.
 *
 * Sort en code 1 si une anomalie est detectee, pour servir de garde-fou en CI.
 */
import { readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const baseArg = process.argv.indexOf("--base");
const BASE = (baseArg !== -1 ? process.argv[baseArg + 1] : "https://peakcl.com").replace(
  /\/+$/,
  "",
);

/** Attendus sur toute reponse hors assets immuables. Cf. l'edge function. */
const EXPECTED = {
  "x-frame-options": "SAMEORIGIN",
  "x-content-type-options": "nosniff",
  "referrer-policy": "strict-origin-when-cross-origin",
  "permissions-policy": "camera=(), microphone=(), geolocation=()",
};

/**
 * HSTS : verifie a part, sur la seule duree.
 *
 * On envoie `max-age=31536000; includeSubDomains`, mais Netlify gere le HSTS au
 * niveau du domaine et reecrit l'en-tete : la production renvoie
 * `max-age=31536000` tout court, y compris sur les fichiers statiques ou
 * netlify.toml demandait explicitement `includeSubDomains`. Exiger la valeur
 * exacte produirait un echec permanent qu'aucune modification du depot ne peut
 * corriger — et un garde-fou qui echoue toujours finit par etre ignore.
 * Ce qui compte ici est qu'une duree longue soit bien annoncee.
 */
const HSTS_MIN_MAX_AGE = 31536000;

/** La CSP est longue : on verifie sa presence et quelques directives cles. */
const CSP_HEADER = "content-security-policy-report-only";
const CSP_MUST_CONTAIN = ["default-src 'self'", "frame-ancestors 'self'", "object-src 'none'"];

/**
 * Pages HTML servies par la fonction SSR : c'est LE cas qui n'etait pas couvert.
 * `/` et une page ville pour couvrir a la fois la racine et une route profonde.
 */
const HTML_PAGES = ["/", "/agence-web-albertville"];

/** Fichier statique servi par le CDN : sert de temoin. */
const STATIC_FILES = ["/robots.txt"];

/**
 * Assets immuables, volontairement EXCLUS de l'edge function : on verifie qu'ils
 * gardent au moins leur nosniff (pose par netlify.toml) et leur cache long.
 * Les polices de public/fonts/ ont des noms stables, contrairement aux bundles
 * de /assets/ qui sont hashes au build : on lit le dossier plutot que de coder
 * un nom en dur qui pourrirait au premier renommage.
 */
const FONTS_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "fonts");

const problems = [];

async function probe(pathname) {
  const url = `${BASE}${pathname}`;
  try {
    const res = await fetch(url, { redirect: "manual" });
    return { pathname, status: res.status, headers: res.headers };
  } catch (err) {
    return { pathname, status: 0, headers: new Headers(), error: String(err.message) };
  }
}

function judge(r, { csp = true } = {}) {
  if (r.status === 0) return `KO injoignable (${r.error})`;
  const missing = [];
  for (const [name, value] of Object.entries(EXPECTED)) {
    const got = r.headers.get(name);
    if (!got) missing.push(name);
    else if (got.toLowerCase() !== value.toLowerCase()) missing.push(`${name}=${got}`);
  }
  const hsts = r.headers.get("strict-transport-security");
  const maxAge = Number(hsts?.match(/max-age=(\d+)/)?.[1] ?? 0);
  if (!hsts) missing.push("strict-transport-security");
  else if (maxAge < HSTS_MIN_MAX_AGE) missing.push(`strict-transport-security=${hsts}`);

  if (csp) {
    const policy = r.headers.get(CSP_HEADER);
    if (!policy) missing.push(CSP_HEADER);
    else {
      const absent = CSP_MUST_CONTAIN.filter((d) => !policy.includes(d));
      if (absent.length) missing.push(`${CSP_HEADER} sans ${absent.join(" / ")}`);
    }
  }
  return missing.length ? `KO ${missing.join(", ")}` : "ok";
}

/** Les decks clients doivent porter le noindex HTTP, meme en 404. */
function judgeNoindex(r) {
  const tag = r.headers.get("x-robots-tag");
  if (!tag) return "KO X-Robots-Tag absent";
  if (!/noindex/i.test(tag)) return `KO X-Robots-Tag = ${tag}`;
  return `ok (${r.status}, ${tag})`;
}

function row(pathname, status, verdict) {
  if (!verdict.startsWith("ok")) problems.push(`${pathname} : ${verdict}`);
  return [pathname.padEnd(34), String(status).padEnd(5), verdict].join(" ");
}

console.log(`Base : ${BASE}\n`);

console.log(`── Pages HTML (rendues par la fonction SSR) ${"─".repeat(30)}`);
for (const p of HTML_PAGES) {
  const r = await probe(p);
  console.log(row(p, r.status, judge(r)));
}

console.log(`\n── Fichiers statiques (CDN) ${"─".repeat(30)}`);
for (const p of STATIC_FILES) {
  const r = await probe(p);
  console.log(row(p, r.status, judge(r)));
}

console.log(`\n── Decks clients : noindex HTTP ${"─".repeat(30)}`);
{
  const p = "/cadrage/verification-automatique";
  const r = await probe(p);
  console.log(row(p, r.status, r.status === 0 ? "KO injoignable" : judgeNoindex(r)));
}

console.log(`\n── Assets immuables (exclus de l'edge function) ${"─".repeat(20)}`);
{
  const font = readdirSync(FONTS_DIR).find((f) => /\.(woff2?|ttf|otf)$/i.test(f));
  const href = font ? `/fonts/${font}` : "";
  if (!href) {
    console.log("  (aucune police dans public/fonts/, verification sautee)");
  } else {
    const r = await probe(href);
    const cache = r.headers.get("cache-control") ?? "";
    const nosniff = r.headers.get("x-content-type-options") ?? "";
    const verdict =
      r.status !== 200
        ? `KO status ${r.status}`
        : !/immutable/.test(cache)
          ? `KO cache-control = ${cache}`
          : !/nosniff/.test(nosniff)
            ? "KO nosniff absent"
            : "ok (immutable + nosniff)";
    console.log(row(href, r.status, verdict));
  }
}

console.log();
if (problems.length) {
  console.error(`${problems.length} anomalie(s) :`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
console.log("Aucune anomalie.");
