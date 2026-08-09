/**
 * Genere public/llms.txt depuis les modules de contenu du site.
 *
 * Pourquoi generer plutot qu'ecrire a la main : un llms.txt redige a part
 * devient faux des la premiere page renommee, et un fichier qui pointe vers
 * des URLs mortes est pire que pas de fichier du tout. Ici, la seule source de
 * verite reste src/content/peakcl/* et src/seo/geo.ts. Si un slug bouge, le
 * fichier suit au prochain build.
 *
 * Statut de llms.txt : proposition communautaire (Jeremy Howard, 2024), pas un
 * standard. Google a confirme publiquement ne pas l'utiliser. On le publie au
 * titre du future-proofing a cout quasi nul, pas comme technique de
 * referencement. Ne pas lui attribuer d'effet mesurable.
 *
 * Les modules sont en TypeScript avec des imports alias `@/`. Node ne sait pas
 * les charger tels quels : on les bundle en memoire avec esbuild (deja present
 * comme dependance de Vite) plutot que d'ajouter un runner TS au projet.
 */
import { build } from "esbuild";
import { writeFile, mkdir, rm } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, resolve, join } from "node:path";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SITE_URL = "https://peakcl.com";
const OUT = join(ROOT, "public", "llms.txt");
const TMP_DIR = join(ROOT, "node_modules", ".cache", "llms-txt");

/** Point d'entree synthetique : re-exporte tout ce dont le generateur a besoin. */
const ENTRY = `
export { SERVICES, LANDINGS, sitesWeb, refontePme, design, community, automatisation, cmForfaits, packages } from "@/content/peakcl/services";
export { conseils } from "@/content/peakcl/conseils";
export { peakclPortfolio } from "@/content/peakcl/portfolio";
export { geoPages, geoPagesFor, GEO_SERVICE_LABEL } from "@/seo/geo";
`;

/** Bundle les modules TS en un seul ESM chargeable par Node. */
async function loadContent() {
  await mkdir(TMP_DIR, { recursive: true });
  const entryPath = join(TMP_DIR, "entry.ts");
  const outPath = join(TMP_DIR, "bundle.mjs");
  await writeFile(entryPath, ENTRY, "utf8");

  await build({
    entryPoints: [entryPath],
    outfile: outPath,
    bundle: true,
    format: "esm",
    platform: "node",
    target: "node20",
    logLevel: "silent",
    // Resout l'alias `@/` de tsconfig, qu'esbuild ne lit pas seul.
    alias: { "@": join(ROOT, "src") },
    // `absUrl` lit import.meta.env, absent sous Node : on le neutralise.
    define: { "import.meta.env": "undefined" },
  });

  // Cache-buster : sans ca, un second appel dans le meme process relit
  // l'ancien module depuis le cache ESM de Node.
  return import(`${pathToFileURL(outPath).href}?t=${process.hrtime.bigint()}`);
}

const abs = (path) => `${SITE_URL}${path}`;

/** Une ligne de lien au format llms.txt : `- [titre](url) : description`. */
const link = (title, path, desc) =>
  desc ? `- [${title}](${abs(path)}) : ${desc}` : `- [${title}](${abs(path)})`;

/** Compacte un texte multi-lignes en une phrase exploitable. */
const oneLine = (s) => String(s).replace(/\s+/g, " ").trim();

/**
 * Resume une offre du catalogue : c'est le bloc a plus forte valeur pour un
 * moteur generatif, parce qu'il rend explicites le delai et le perimetre la ou
 * la plupart des sites d'agence n'affichent qu'une promesse marketing.
 *
 * Les montants ne sont volontairement PAS repris : le site affiche « Sur
 * devis » (showPrices=false). Publier un prix ici que la page ne montre pas
 * creerait une incoherence entre le contenu visible et ce qu'on donne aux
 * machines — exactement ce que Google demande d'eviter.
 */
function formatOffer(item) {
  const parts = [`### ${item.title}`, "", oneLine(item.desc)];
  if (item.delay) parts.push("", `**${oneLine(item.delay)}**`);
  if (item.included?.length) {
    parts.push("", "Inclus :", ...item.included.map((i) => `- ${oneLine(i)}`));
  }
  if (item.notIncluded?.length) {
    parts.push("", "Non inclus :", ...item.notIncluded.map((i) => `- ${oneLine(i)}`));
  }
  return parts.join("\n");
}

function render(c) {
  const catalogBySlug = {
    "/sites-web": c.sitesWeb,
    "/design": c.design,
    "/community-management": c.community,
    "/accompagnement-automatisation": c.automatisation,
    "/refonte-site-pme": c.refontePme,
  };

  // Les landings hors hub sont exposees a llms.txt au meme titre que les
  // services : invisibles dans la nav, mais decouvrables par les IA.
  const allPages = [...c.SERVICES, ...c.LANDINGS];

  const out = [];
  const push = (...lines) => out.push(...lines);

  push("# PeakCL");
  push("");
  push(
    "> Agence web et communication digitale de Charlotte Lacroix, developpeuse web et",
    "> graphiste independante basee a Gilly-sur-Isere (73200), pres d'Albertville en",
    "> Savoie. Creation et refonte de sites internet (sur mesure ou WordPress),",
    "> identite visuelle et logo, community management et automatisation, pour des",
    "> independants, artisans, therapeutes, PME et petites structures de Savoie,",
    "> Haute-Savoie et partout en France a distance.",
  );
  push("");
  push(
    "Interlocutrice unique : la meme personne code le site, dessine l'identite et",
    "gere les reseaux. Contact : peakcl73@gmail.com, 07 43 51 76 27.",
  );
  push("");

  // ── Services ────────────────────────────────────────────────────
  push("## Services");
  push("");
  for (const s of allPages) {
    push(link(s.title, s.slug, oneLine(s.tagline)));
  }
  push(link("Tous les services", "/services", "Vue d'ensemble des prestations et des packs."));
  push("");

  // ── Detail des offres ───────────────────────────────────────────
  push("## Detail des offres");
  push("");
  for (const s of allPages) {
    const items = catalogBySlug[s.slug];
    if (!items?.length) continue;
    push(`### ${s.title} — ${abs(s.slug)}`);
    push("");
    for (const item of items) {
      push(formatOffer(item).replace(/^### /gm, "#### "));
      push("");
    }
  }

  // Forfaits community management : les seuls tarifs publics du site. Ils sont
  // repris tels quels parce que les pages les affichent — contrairement aux
  // montants dev/design, masques derriere « Sur devis ».
  if (c.cmForfaits?.length) {
    push("### Forfaits community management (tarifs publics)");
    push("");
    for (const f of c.cmForfaits) {
      push(`#### ${f.name} — ${oneLine(f.price)}`);
      push("");
      push(oneLine(f.freq));
      if (f.inclus?.length) {
        push("", "Inclus :", ...f.inclus.map((i) => `- ${oneLine(i)}`));
      }
      push("");
    }
  }

  if (c.packages?.length) {
    push("### Packs combines");
    push("");
    for (const p of c.packages) {
      const economy = p.economy ? ` (${oneLine(p.economy)})` : "";
      push(`#### ${p.name}${economy}`);
      push("");
      push(oneLine(p.tagline));
      if (p.points?.length) {
        push("", "Comprend :", ...p.points.map((i) => `- ${oneLine(i)}`));
      }
      push("");
    }
  }

  // ── Zones desservies ────────────────────────────────────────────
  push("## Zones desservies");
  push("");
  push(
    "Etablissement a Gilly-sur-Isere (73200), Savoie. Interventions sur place dans",
    "le bassin albertvillois et la Savoie, et a distance partout en France.",
  );
  push("");
  // Groupees par prestation : deux pages d'une meme ville ciblent des services
  // differents, les melanger donnerait l'impression de doublons.
  for (const service of ["site", "community", "logo"]) {
    const pages = c.geoPagesFor(service);
    if (!pages.length) continue;
    push(`### ${c.GEO_SERVICE_LABEL[service]}`);
    push("");
    for (const g of pages) {
      // « Savoie (Savoie) » pour la page departementale : on n'affiche la
      // region que lorsqu'elle apporte une information.
      const label = g.city === g.regionLine ? g.city : `${g.city} (${g.regionLine})`;
      push(link(label, `/${g.slug}`, oneLine(g.shortPitch)));
    }
    push("");
  }

  // ── Realisations ────────────────────────────────────────────────
  push("## Realisations");
  push("");
  push(
    link(
      "Portfolio",
      "/portfolio",
      "Projets clients avec le perimetre reellement livre sur chacun.",
    ),
  );
  push("");
  for (const p of c.peakclPortfolio) {
    const subtitle = p.subtitle ? ` (${oneLine(p.subtitle)})` : "";
    const scope = p.scope?.length ? ` Perimetre : ${p.scope.map(oneLine).join(", ")}.` : "";
    const note = p.scopeNote ? ` ${oneLine(p.scopeNote)}` : "";
    push(`- **${p.title}**${subtitle} — ${oneLine(p.description ?? "")}${scope}${note}`);
  }
  push("");

  // ── Conseils ────────────────────────────────────────────────────
  push("## Conseils et guides");
  push("");
  push(link("Tous les conseils", "/conseils"));
  for (const a of c.conseils) {
    push(link(a.h1, `/${a.slug}`, oneLine(a.description)));
  }
  push("");

  // ── Entreprise ──────────────────────────────────────────────────
  push("## L'entreprise");
  push("");
  push(link("Qui suis-je", "/qui-suis-je", "Parcours et methode de Charlotte Lacroix."));
  push(link("Contact", "/contact", "Formulaire, telephone et email."));
  push(link("Reserver un appel", "/reservation-appel", "Diagnostic gratuit, reponse sous 24h."));
  push(link("Politique de confidentialite", "/politique-confidentialite"));
  push("");

  push("## Version anglaise");
  push("");
  push(link("English version", "/en", "Same services, presented in English."));
  push("");

  return out.join("\n").replace(/\n{3,}/g, "\n\n");
}

const content = await loadContent();
await writeFile(OUT, render(content), "utf8");
await rm(TMP_DIR, { recursive: true, force: true });
console.log(`llms.txt genere (${(await import("node:fs")).statSync(OUT).size} octets)`);
