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

/** Date du dernier commit touchant un fichier, au format AAAA-MM-JJ. */
function lastCommitDate(relPath) {
  try {
    const out = execFileSync(
      "git",
      ["log", "-1", "--format=%cs", "--", relPath],
      {
        cwd: ROOT,
        encoding: "utf8",
      },
    ).trim();
    return out || null;
  } catch {
    return null;
  }
}

/**
 * Dependances locales importees par un fichier de route (un seul niveau).
 * Resout les alias `@/` et les chemins relatifs, en essayant les extensions
 * usuelles. Les paquets npm sont ignores : leur date ne dit rien du contenu.
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
        out.push(candidate.slice(ROOT.length + 1));
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

  const dates = [routeFile, ...localImports(routeFile)]
    .map(lastCommitDate)
    .filter(Boolean);
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

writeFileSync(SITEMAP, updated, "utf8");
console.log(`sitemap : ${stamped}/${locs.length} URLs horodatees`);
if (missing.length) {
  console.warn(
    `  sans date (fichier de route introuvable) : ${missing.join(", ")}`,
  );
}
