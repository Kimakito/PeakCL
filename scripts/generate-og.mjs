#!/usr/bin/env node
/**
 * Génère les cartes de partage (Open Graph / Twitter, 1200×630), une par page.
 *
 * Source des textes : src/seo/og-pages.json (chemin → sur-titre + titre). Le
 * même fichier dit au site quelles pages ont leur carte (voir src/seo/og.ts) :
 * ajouter une page ici et relancer le script suffit.
 *
 * Sortie : public/og/<slug>.jpg (l'accueil : public/og/accueil.jpg), plus
 * public/peakcl/og-cover.jpg, copie de la carte d'accueil gardée à son ancienne
 * URL pour les partages déjà publiés.
 *
 * Rendu : une page HTML aux couleurs et polices de la charte (Baloo 2, Nunito,
 * fond crème, encre indigo, tuiles du logo, photo du hero), capturée par Chrome
 * en mode headless puis convertie en JPEG par sharp. Chrome plutôt que le
 * rendu SVG de sharp : librsvg ne sait pas charger les polices WOFF2 de la
 * charte et retombait sur Arial.
 *
 * Usage : node scripts/generate-og.mjs   (macOS, Google Chrome installé)
 * Variable CHROME pour un autre chemin de Chrome.
 */
import sharp from "sharp";
import fs from "fs";
import os from "os";
import path from "path";
import { execFileSync } from "child_process";
import { fileURLToPath, pathToFileURL } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pages = JSON.parse(fs.readFileSync(path.join(root, "src/seo/og-pages.json"), "utf8"));
const outDir = path.join(root, "public", "og");
fs.mkdirSync(outDir, { recursive: true });

const CHROME = process.env.CHROME ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const W = 1200;
const H = 630;

const f = (p) => pathToFileURL(path.join(root, p)).href;
const FONTS = `
  @font-face { font-family: "Baloo 2"; font-weight: 800; src: url(${f("brand/print/assets/fonts/baloo2-800-latin.woff2")}) format("woff2"); }
  @font-face { font-family: "Baloo 2"; font-weight: 800; src: url(${f("brand/print/assets/fonts/baloo2-800-latin-ext.woff2")}) format("woff2"); unicode-range: U+0100-024F; }
  @font-face { font-family: "Nunito"; font-weight: 700; src: url(${f("brand/print/assets/fonts/nunito-700-latin.woff2")}) format("woff2"); }
  @font-face { font-family: "Nunito"; font-weight: 400; src: url(${f("brand/print/assets/fonts/nunito-400-latin.woff2")}) format("woff2"); }
`;

/** Nom de fichier d'une page : « /sites-web » → « sites-web », « / » → « accueil ». */
const slugOf = (p) => (p === "/" ? "accueil" : p.slice(1));

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function html({ kicker, title }) {
  // Titre long : on descend d'un cran pour tenir sur trois lignes maximum.
  const size = title.length > 58 ? 58 : title.length > 44 ? 64 : 72;
  return `<!doctype html><html><head><meta charset="utf-8"><style>
${FONTS}
* { margin: 0; box-sizing: border-box; }
body { width: ${W}px; height: ${H}px; background: #FFEAA9; overflow: hidden; position: relative;
  font-family: "Nunito", sans-serif; color: #13004D; }
.left { position: absolute; left: 72px; top: 64px; width: 610px; height: 502px;
  display: flex; flex-direction: column; }
.logo { height: 38px; width: auto; align-self: flex-start; }
.kicker { margin-top: auto; font-weight: 700; font-size: 22px; letter-spacing: .14em;
  text-transform: uppercase; color: #360099; }
h1 { margin-top: 14px; font-family: "Baloo 2", sans-serif; font-weight: 800;
  font-size: ${size}px; line-height: 1.02; letter-spacing: -.01em; text-wrap: balance; }
.nw { white-space: nowrap; }
.foot { margin-top: auto; padding-top: 28px; font-size: 24px; color: #574F82; }
.foot b { color: #13004D; }
.star { color: #E0B400; letter-spacing: 2px; }
.photo { position: absolute; right: 64px; top: 64px; width: 420px; height: 502px;
  border-radius: 40px; object-fit: cover; object-position: 30% 40%;
  box-shadow: 0 20px 60px -20px rgba(54,0,153,.45); }
.tile { position: absolute; border-radius: 22%; }
</style></head><body>
<div class="tile" style="right:448px;top:40px;width:78px;height:78px;transform:rotate(-6deg);background:linear-gradient(135deg,#F2EB96,#F2D966 50%,#F2D04B)"></div>
<img class="photo" src="${f("public/peakcl/hero/hero-960.webp")}">
<div class="tile" style="right:36px;bottom:34px;width:110px;height:110px;transform:rotate(3deg);background:linear-gradient(135deg,#97F0F7,#4DAFC9)"></div>
<div class="tile" style="right:176px;bottom:22px;width:46px;height:46px;transform:rotate(-3deg);background:linear-gradient(135deg,#BABAFF,#875FD5)"></div>
<div class="left">
  <img class="logo" src="${f("public/signature.svg")}">
  <p class="kicker">${esc(kicker)}</p>
  <h1>${esc(title).replace(/(\S+-\S+)/g, '<span class="nw">$1</span>')}</h1>
  <p class="foot"><span class="star">★★★★★</span> <b>5/5 sur Google</b> · peakcl.com</p>
</div>
</body></html>`;
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "peakcl-og-"));
for (const [route, text] of Object.entries(pages)) {
  const htmlPath = path.join(tmp, "card.html");
  const pngPath = path.join(tmp, "card.png");
  fs.writeFileSync(htmlPath, html(text));
  execFileSync(
    CHROME,
    [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      "--allow-file-access-from-files",
      `--window-size=${W},${H}`,
      "--virtual-time-budget=4000",
      `--screenshot=${pngPath}`,
      pathToFileURL(htmlPath).href,
    ],
    { stdio: "ignore" },
  );
  const out = path.join(outDir, `${slugOf(route)}.jpg`);
  await sharp(pngPath).resize(W, H).jpeg({ quality: 84, mozjpeg: true }).toFile(out);
  console.log(`✓ ${route} → ${path.relative(root, out)}`);
}
fs.copyFileSync(path.join(outDir, "accueil.jpg"), path.join(root, "public/peakcl/og-cover.jpg"));
fs.rmSync(tmp, { recursive: true, force: true });
