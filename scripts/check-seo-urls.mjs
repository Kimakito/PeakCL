/**
 * Verifie en HTTP reel ce que le site repond, URL par URL.
 *
 * Pourquoi un script et pas une verification a la main : les regles de
 * redirection vivent dans netlify.toml, les canonical dans les routes React et
 * la liste indexable dans sitemap.xml. Ces trois sources peuvent diverger sans
 * qu'aucune ne soit fausse isolement — une URL qui redirige mais reste au
 * sitemap, une page en noindex declaree indexable, un canonical qui pointe vers
 * une URL qui redirige elle-meme. Seule une requete sur le site deploye tranche.
 *
 * A lancer APRES deploiement : il interroge la production, pas le build local.
 *
 *   node scripts/check-seo-urls.mjs
 *   node scripts/check-seo-urls.mjs --base https://deploy-preview-42--peakcl.netlify.app
 *
 * Sort en code 1 si une anomalie est detectee, pour pouvoir servir de garde-fou
 * en CI.
 */
import { readFileSync } from "node:fs";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SITEMAP = join(ROOT, "public", "sitemap.xml");

const baseArg = process.argv.indexOf("--base");
const BASE = (baseArg !== -1 ? process.argv[baseArg + 1] : "https://peakcl.com").replace(
  /\/+$/,
  "",
);

/**
 * Anciennes URL qui doivent rediriger, avec leur cible attendue.
 * Cette liste double volontairement netlify.toml : elle exprime l'INTENTION
 * (« /graphisme doit finir sur /design »), la ou le toml exprime le moyen. Une
 * regle supprimee par megarde ne se voit pas en relisant le toml, elle se voit
 * ici.
 */
const LEGACY = {
  "/graphisme": "/design",
  "/graphisme.html": "/design",
  "/developpement-web": "/sites-web",
  "/developpement-web.html": "/sites-web",
  "/creation-site-vitrine": "/sites-web",
  "/creation-site-vitrine.html": "/sites-web",
  "/creation-site-ecommerce": "/sites-web",
  "/maintenance-site-web": "/sites-web",
  "/maintenance-site-web.html": "/sites-web",
  "/contact.html": "/contact",
  "/portfolio.html": "/portfolio",
  "/qui-suis-je.html": "/qui-suis-je",
  "/packs": "/services",
  "/brief": "/reservation-appel",
  "/blog": "/conseils",
  "/conseils/2025/04/18/hebergement": "/conseils",
  "/web-strategy/tunnel-de-vente": "/conseils",
  "/react/hooks": "/conseils",
  "/2025/01/article": "/conseils",
  "/bienvenue-strategie": "/bienvenue",
};

/**
 * URL qui doivent repondre 200 tout en restant HORS du sitemap (noindex).
 * Ce sont les pages de confirmation et les ressources privees : elles n'ont de
 * sens qu'atteintes depuis un parcours, jamais depuis la recherche.
 * `/diagnostic` n'en fait PAS partie : c'est une page d'entree publique,
 * declaree au sitemap a dessein.
 */
const NOINDEX = ["/bienvenue", "/merci", "/merci-brief", "/merci-diagnostic", "/questionnaire-r2"];

const sitemapUrls = [...readFileSync(SITEMAP, "utf8").matchAll(/<loc>(.*?)<\/loc>/g)].map(
  (m) => m[1],
);
const sitemapPaths = new Set(sitemapUrls.map((u) => new URL(u).pathname));

/** Une requete sans suivi de redirection : on veut voir le 301, pas sa cible. */
async function probe(pathname) {
  const url = `${BASE}${pathname}`;
  try {
    const res = await fetch(url, { redirect: "manual" });
    const location = res.headers.get("location") ?? "";
    let canonical = "";
    let robots = "";
    if (res.status === 200) {
      const html = await res.text();
      canonical = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i)?.[1] ?? "";
      robots = html.match(/<meta[^>]+name="robots"[^>]+content="([^"]+)"/i)?.[1] ?? "";
    }
    return { pathname, status: res.status, location, canonical, robots };
  } catch (err) {
    return { pathname, status: 0, location: "", canonical: "", robots: String(err.message) };
  }
}

/** Chemin d'une destination, qu'elle soit absolue ou relative. */
function toPath(location) {
  if (!location) return "";
  try {
    return new URL(location, BASE).pathname;
  } catch {
    return location;
  }
}

const problems = [];

/** Verdict d'une URL declaree au sitemap : 200, auto-canonique, pas de noindex. */
function judgeSitemap(r) {
  const url = `${BASE}${r.pathname}`;
  if (r.status !== 200) return `KO status ${r.status}`;
  if (r.robots && /noindex/i.test(r.robots)) return `KO noindex (${r.robots})`;
  if (!r.canonical) return "KO canonical absente";
  if (r.canonical.replace(/\/$/, "") !== url.replace(/\/$/, ""))
    return `KO canonical -> ${r.canonical}`;
  return "ok";
}

/** Verdict d'une ancienne URL : 301 vers la cible attendue, en un seul saut. */
function judgeLegacy(r, expected) {
  if (r.status !== 301) return `KO status ${r.status} (301 attendu)`;
  const dest = toPath(r.location);
  if (dest !== expected) return `KO -> ${dest} (attendu ${expected})`;
  // Une cible hors sitemap est suspecte (redirection vers une page morte ou
  // elle-meme redirigee), sauf si elle est volontairement non indexable : une
  // ancienne URL de tunnel a le droit de pointer vers une page de tunnel.
  if (!sitemapPaths.has(expected) && !NOINDEX.includes(expected))
    return `KO cible ${expected} ni au sitemap ni declaree noindex`;
  return "ok";
}

/** Verdict d'une page volontairement non indexable. */
function judgeNoindex(r) {
  if (r.status === 404) return "ok (404)";
  if (r.status !== 200) return `KO status ${r.status}`;
  if (!/noindex/i.test(r.robots)) return "KO indexable (pas de meta robots noindex)";
  if (sitemapPaths.has(r.pathname)) return "KO presente au sitemap alors qu'en noindex";
  return "ok";
}

function row(r, verdict) {
  const dest = r.status >= 300 && r.status < 400 ? toPath(r.location) : "";
  const inSitemap = sitemapPaths.has(r.pathname) ? "oui" : "non";
  if (!verdict.startsWith("ok")) problems.push(`${r.pathname} : ${verdict}`);
  return [
    r.pathname.padEnd(38),
    String(r.status).padEnd(5),
    dest.padEnd(22),
    (r.canonical.replace(BASE, "") || "—").padEnd(30),
    inSitemap.padEnd(10),
    verdict,
  ].join(" ");
}

/** Requetes par lots : eviter d'ouvrir 60 connexions d'un coup sur Netlify. */
async function mapLimit(items, limit, fn) {
  const out = [];
  for (let i = 0; i < items.length; i += limit) {
    out.push(...(await Promise.all(items.slice(i, i + limit).map(fn))));
  }
  return out;
}

const header = [
  "URL".padEnd(38),
  "CODE".padEnd(5),
  "DESTINATION".padEnd(22),
  "CANONICAL".padEnd(30),
  "SITEMAP".padEnd(10),
  "VERDICT",
].join(" ");

console.log(`Base : ${BASE}\n`);

console.log(`── Sitemap (${sitemapUrls.length} URL) ${"─".repeat(40)}`);
console.log(header);
const sitemapResults = await mapLimit(
  sitemapUrls.map((u) => new URL(u).pathname),
  8,
  probe,
);
for (const r of sitemapResults) console.log(row(r, judgeSitemap(r)));

const legacyPaths = Object.keys(LEGACY);
console.log(`\n── Anciennes URL (${legacyPaths.length}) ${"─".repeat(40)}`);
console.log(header);
const legacyResults = await mapLimit(legacyPaths, 8, probe);
for (const r of legacyResults) console.log(row(r, judgeLegacy(r, LEGACY[r.pathname])));

console.log(`\n── Pages non indexables (${NOINDEX.length}) ${"─".repeat(40)}`);
console.log(header);
const noindexResults = await mapLimit(NOINDEX, 8, probe);
for (const r of noindexResults) console.log(row(r, judgeNoindex(r)));

console.log();
if (problems.length) {
  console.error(`${problems.length} anomalie(s) :`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
console.log("Aucune anomalie.");
