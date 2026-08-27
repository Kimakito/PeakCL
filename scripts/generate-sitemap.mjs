/**
 * Regenere public/sitemap.xml en y injectant un `lastmod` reel, calcule depuis
 * l'historique git.
 *
 * Pourquoi : des trois balises optionnelles du protocole, Google a confirme
 * ignorer `changefreq` et `priority`. `lastmod` est la seule qu'il exploite —
 * a condition qu'elle soit exacte. Un sitemap sans lastmod ne donne aucun
 * moyen de distinguer une page modifiee ce matin d'une page figee depuis un
 * an, ce qui compte precisement quand le quota de demandes d'indexation
 * manuelle est epuise et qu'on depend du recrawl spontane.
 *
 * Un lastmod faux est pire que pas de lastmod : Google cesse de s'y fier pour
 * tout le domaine s'il constate que la date ne correspond a aucun changement
 * reel. D'ou le calcul depuis git plutot qu'un `new Date()` a chaque build,
 * qui ferait mentir les 42 URLs a chaque deploiement.
 *
 * La date retenue pour une page est la plus recente entre son fichier de route
 * et les fichiers locaux qu'il importe directement (composant de rendu, module
 * de contenu). Sans ca, une refonte de src/content/peakcl/conseils.ts ne
 * bougerait pas la date des pages conseils, alors que leur contenu a change.
 *
 * `__root.tsx` est volontairement HORS de ce calcul, bien qu'il fasse partie du
 * rendu de chaque page. Google demande la date de derniere modification
 * *significative* : un changement de chrome global (nav, footer, balise
 * commune) n'est pas une modification du contenu de chacune des 42 pages.
 * L'inclure daterait tout le sitemap du jour a chaque retouche de gabarit, ce
 * qui reviendrait a n'avoir aucune information — le defaut qu'on corrige ici.
 *
 * Meme raison pour les modules d'INFRASTRUCTURE (voir INFRA_PREFIXES) : `absUrl`,
 * les generateurs JSON-LD, les hreflang, les libelles i18n. Ils sont importes
 * par presque toutes les routes, donc une retouche de l'un d'eux datait les 43
 * URLs du meme jour — c'est exactement ce qui s'etait produit : le sitemap
 * portait `2026-08-09` partout parce que `src/seo/site.ts` (six lignes, un
 * helper d'URL absolue) avait ete touche ce jour-la. Un lastmod uniforme ne
 * distingue plus rien et Google finit par cesser de s'y fier pour le domaine.
 * Ces modules changent la FORME des metadonnees, jamais le contenu redactionnel
 * de la page.
 *
 * Restent comptes : le fichier de route lui-meme, les composants de rendu
 * (`src/components/…`) et les modules de contenu (`src/content/…`), ou une
 * modification veut effectivement dire que la page a change.
 *
 * La LISTE des URLs n'est pas deduite du repertoire des routes : elle est
 * relue depuis le sitemap existant, qui reste la liste curatee. Beaucoup de
 * routes ne doivent pas y figurer (pages noindex, decks clients, remerciements)
 * et un balayage automatique les y ferait entrer.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SITEMAP = join(ROOT, "public", "sitemap.xml");
const SITE_URL = "https://peakcl.com";

/** Fichier de route servant une URL du sitemap. */
function routeFileFor(pathname) {
  if (pathname === "/") return "src/routes/index.tsx";
  if (pathname === "/en") return "src/routes/en/index.tsx";
  return `src/routes${pathname}.tsx`;
}

/**
 * Commits COSMETIQUES, a ignorer dans le calcul de `lastmod`.
 *
 * Un passage de prettier, une config de lint ou un bump de dependance touchent
 * des centaines de fichiers sans qu'une seule ligne visible par un lecteur ne
 * change. Sans ce filtre, le sitemap datait ses 43 URLs du meme jour a cause du
 * seul commit `style: applique prettier a src/ et scripts/` — une date unique
 * partout ne distingue plus rien, et Google cesse de se fier au lastmod d'un
 * domaine dont les dates ne correspondent a aucun changement reel.
 *
 * On filtre sur le type de commit conventionnel plutot que sur le contenu du
 * diff : un `-w` de git ne suffirait pas (prettier deplace aussi des sauts de
 * ligne et reecrit des quotes), et un commit `style:`/`chore:` annonce par son
 * auteur qu'il ne change pas le rendu. Corollaire : ne pas ranger une vraie
 * modification de contenu sous `chore:`, elle serait invisible au sitemap.
 */
const COSMETIC_SUBJECT = /^(style|chore|ci|build|test|docs)(\([^)]*\))?[:!]|prettier|lint|format/i;

/**
 * Date du dernier commit de CONTENU touchant un fichier, au format AAAA-MM-JJ.
 * Remonte l'historique tant que les commits sont cosmetiques. Si le fichier n'a
 * jamais connu que des commits cosmetiques, on retombe sur le plus ancien
 * plutot que de ne rien renvoyer : une date approximative vaut mieux qu'une URL
 * sans lastmod.
 */
function lastCommitDate(relPath) {
  try {
    // Separateur explicite entre la date et le sujet : `%cs` est de longueur
    // fixe, mais le sujet contient ses propres espaces et un split(" ") naif
    // n'en garderait que le premier mot, ratant les mots-cles du filtre.
    const out = execFileSync("git", ["log", "--format=%cs\t%s", "--", relPath], {
      cwd: ROOT,
      encoding: "utf8",
    }).trim();
    if (!out) return null;
    const commits = out.split("\n").map((line) => {
      const [date, subject = ""] = line.split("\t");
      return { date, subject };
    });
    const substantive = commits.find((c) => !COSMETIC_SUBJECT.test(c.subject));
    return (substantive ?? commits[0]).date || null;
  } catch {
    return null;
  }
}

/**
 * Modules transverses dont la date ne dit rien du contenu d'une page donnee.
 * Voir l'en-tete du fichier : les inclure aplatit tout le sitemap sur une seule
 * date des qu'un helper est touche.
 */
const INFRA_PREFIXES = ["src/seo/", "src/i18n/", "src/lib/"];

function isInfra(relPath) {
  return INFRA_PREFIXES.some((p) => relPath.startsWith(p));
}

/**
 * Dependances locales importees par un fichier de route (un seul niveau).
 * Resout les alias `@/` et les chemins relatifs, en essayant les extensions
 * usuelles. Les paquets npm sont ignores : leur date ne dit rien du contenu.
 * Les modules d'infrastructure sont ecartes pour la meme raison.
 */
function localImports(relRoutePath) {
  const abs = join(ROOT, relRoutePath);
  if (!existsSync(abs)) return [];
  const src = readFileSync(abs, "utf8");
  const specs = [...src.matchAll(/from\s+"([^"]+)"/g)].map((m) => m[1]);
  const out = [];
  for (const spec of specs) {
    let base;
    if (spec.startsWith("@/")) base = join(ROOT, "src", spec.slice(2));
    else if (spec.startsWith(".")) base = resolve(dirname(abs), spec);
    else continue;
    for (const ext of [".ts", ".tsx", "/index.ts", "/index.tsx", ""]) {
      const candidate = `${base}${ext}`;
      if (existsSync(candidate) && !candidate.endsWith("/")) {
        const rel = candidate.slice(ROOT.length + 1);
        if (!isInfra(rel)) out.push(rel);
        break;
      }
    }
  }
  return out;
}

const xml = readFileSync(SITEMAP, "utf8");
const locs = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);

let updated = xml;
let stamped = 0;
const missing = [];

for (const loc of locs) {
  const pathname = loc.replace(SITE_URL, "") || "/";
  const routeFile = routeFileFor(pathname);
  if (!existsSync(join(ROOT, routeFile))) {
    missing.push(pathname);
    continue;
  }

  const dates = [routeFile, ...localImports(routeFile)].map(lastCommitDate).filter(Boolean);
  if (!dates.length) {
    missing.push(pathname);
    continue;
  }
  const lastmod = dates.sort().at(-1);

  // Remplace un lastmod existant, sinon l'insere juste apres le <loc>.
  const block = new RegExp(
    `(<loc>${loc.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}</loc>)(\\s*<lastmod>.*?</lastmod>)?`,
  );
  updated = updated.replace(block, `$1\n    <lastmod>${lastmod}</lastmod>`);
  stamped += 1;
}

/* ── Annotations hreflang ─────────────────────────────────────────────
 *
 * Search Console rangeait /en, /en/automation et /en/book-a-call en
 * « Detectee, actuellement non indexee », avec « Sans objet » en derniere
 * exploration : Google connaissait ces URL sans jamais avoir depense de budget
 * de crawl dessus. Les balises <link hreflang> existaient bien dans le <head>
 * de chaque page, mais elles ne se lisent qu'APRES exploration — elles ne
 * peuvent donc pas aider une page qui n'a jamais ete exploree.
 *
 * L'annotation dans le sitemap, elle, se lit AVANT : c'est la methode que
 * Google documente pour signaler des alternatives a l'echelle d'un site. Une
 * page FR deja exploree fait ainsi decouvrir son equivalent EN.
 *
 * ROUTE_MAP est lu depuis src/i18n/config.ts plutot que recopie ici : c'est
 * deja la source unique du selecteur de langue et des balises hreflang du
 * head. Une paire ajoutee la-bas doit se retrouver ici sans intervention,
 * sinon les deux listes divergent en silence — le defaut exact que ce depot a
 * deja corrige pour les pages villes.
 */
const CONFIG = join(ROOT, "src", "i18n", "config.ts");
const configSrc = readFileSync(CONFIG, "utf8");
const routeMapBlock = configSrc.match(/ROUTE_MAP[^=]*=\s*\[([\s\S]*?)\];/);
const pairs = routeMapBlock
  ? [...routeMapBlock[1].matchAll(/\{\s*fr:\s*"([^"]+)"\s*,\s*en:\s*"([^"]+)"\s*\}/g)].map((m) => ({
      fr: m[1],
      en: m[2],
    }))
  : [];

if (!routeMapBlock) {
  // ROUTE_MAP introuvable : le fichier a bouge ou change de forme. Erreur
  // bloquante et non avertissement — un sitemap publie sans alternates se
  // deploie sans que rien ne signale la perte, et le probleme se paie en
  // semaines d'indexation.
  console.error("sitemap : ROUTE_MAP introuvable dans src/i18n/config.ts");
  process.exit(1);
}

// ROUTE_MAP present mais VIDE : cas legitime depuis la suppression de la
// version anglaise (27/08/2026). Le site est monolingue, il n'y a plus
// d'alternate a ecrire, et la boucle ci-dessous ne fait simplement rien.

// Idempotence : on retire les annotations d'une generation precedente avant de
// les reecrire, sinon chaque execution les empile.
updated = updated.replace(/\n\s*<xhtml:link[^>]*\/>/g, "");

const inSitemap = new Set(locs);
let annotated = 0;

for (const { fr, en } of pairs) {
  const frUrl = fr === "/" ? `${SITE_URL}/` : `${SITE_URL}${fr}`;
  const enUrl = `${SITE_URL}${en}`;
  // Une paire hreflang non reciproque est ignoree par Google. Si l'une des
  // deux URL manque au sitemap, on n'annote ni l'une ni l'autre.
  if (!inSitemap.has(frUrl) || !inSitemap.has(enUrl)) continue;

  const alternates =
    `\n    <xhtml:link rel="alternate" hreflang="fr" href="${frUrl}"/>` +
    `\n    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}"/>` +
    `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${frUrl}"/>`;

  for (const url of [frUrl, enUrl]) {
    const esc = url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    // Insertion en fin de bloc <url> : le protocole n'impose pas l'ordre des
    // enfants, et cela evite d'interferer avec l'insertion du <lastmod>.
    const block = new RegExp(`(<loc>${esc}</loc>[\\s\\S]*?)(\\n  </url>)`);
    if (block.test(updated)) {
      updated = updated.replace(block, `$1${alternates}$2`);
      annotated += 1;
    }
  }
}

// Le namespace xhtml doit etre declare sur <urlset>, sinon les balises sont
// invalides et le sitemap entier peut etre rejete.
if (annotated && !updated.includes("xmlns:xhtml=")) {
  updated = updated.replace(
    /<urlset([^>]*)>/,
    '<urlset$1 xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  );
}

writeFileSync(SITEMAP, updated, "utf8");
console.log(`sitemap : ${stamped}/${locs.length} URLs horodatees`);
console.log(`sitemap : ${annotated} URLs annotees hreflang (${pairs.length} paires FR/EN)`);
if (missing.length) {
  console.warn(`  sans date (fichier de route introuvable) : ${missing.join(", ")}`);
}
