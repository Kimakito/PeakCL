#!/usr/bin/env node
/**
 * Exporte les poses de la mascotte kawaii (v2, trait indigo) en WebP détourés
 * pour le site. C'est la mascotte du print, du favicon et de la signature :
 * le site l'utilise désormais aussi, pour qu'on reconnaisse la même personne
 * partout.
 *
 * Source : brand/mascotte émotions/*.png
 * Sortie : public/peakcl/mascotte/<slug>.webp
 * Usage  : node scripts/process-mascotte.mjs
 *
 * Certaines sources sont déjà transparentes, d'autres ont un fond blanc plein.
 * Pour celles-ci, le fond est retiré par remplissage depuis les bords : seuls
 * les pixels quasi blancs CONNECTÉS au bord deviennent transparents. Le blanc
 * du t-shirt ou des yeux, entouré par le trait indigo, n'est donc pas touché.
 *
 * Toutes les poses sont recadrées au plus près (pieds en bas de l'image) pour
 * qu'une mascotte posée en `bottom: 0` ait les pieds sur la ligne.
 */
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = path.join(root, "brand", "mascotte émotions");
const outDir = path.join(root, "public", "peakcl", "mascotte");
fs.mkdirSync(outDir, { recursive: true });

/** fichier source → slug de sortie */
const MAP = {
  "Salut.png": "salut",
  "joyeuse.png": "joyeuse",
  "joie.png": "joie",
  "explosion de joie.png": "explosion-joie",
  "dab.png": "dab",
  "idée.png": "idee",
  "réflechit.png": "reflechit",
  "contrariée.png": "contrariee",
  "agacée.png": "agacee",
  "fatiguée.png": "fatiguee",
  "véner.png": "vener",
};

/** Hauteur de sortie : affichée jusqu'à ~340 px CSS, donc net en retina. */
const HEIGHT = 760;
/** Seuil « quasi blanc » pour le détourage des fonds pleins. */
const WHITE = 238;

function removeWhiteBackground(data, width, height) {
  const seen = new Uint8Array(width * height);
  const stack = [];
  const isWhite = (i) =>
    data[i * 4] >= WHITE && data[i * 4 + 1] >= WHITE && data[i * 4 + 2] >= WHITE;
  for (let x = 0; x < width; x++) stack.push(x, (height - 1) * width + x);
  for (let y = 0; y < height; y++) stack.push(y * width, y * width + width - 1);
  while (stack.length) {
    const p = stack.pop();
    if (seen[p] || !isWhite(p)) continue;
    seen[p] = 1;
    data[p * 4 + 3] = 0;
    const x = p % width;
    if (x > 0) stack.push(p - 1);
    if (x < width - 1) stack.push(p + 1);
    if (p >= width) stack.push(p - width);
    if (p < width * (height - 1)) stack.push(p + width);
  }
}

for (const [file, slug] of Object.entries(MAP)) {
  const src = path.join(srcDir, file);
  if (!fs.existsSync(src)) {
    console.warn(`⚠ source manquante : ${file}`);
    continue;
  }
  // Travail à une taille intermédiaire : le détourage pixel par pixel sur une
  // source de 3 000 px serait lent pour rien.
  const { data, info } = await sharp(src)
    .resize({ height: 1400, withoutEnlargement: true })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  removeWhiteBackground(data, info.width, info.height);

  const buf = await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .trim({ threshold: 1 })
    .resize({ height: HEIGHT, withoutEnlargement: true })
    .webp({ quality: 82, alphaQuality: 90 })
    .toBuffer();
  fs.writeFileSync(path.join(outDir, `${slug}.webp`), buf);
  console.log(`✓ ${file} → mascotte/${slug}.webp (${(buf.length / 1024).toFixed(0)} Ko)`);
}
