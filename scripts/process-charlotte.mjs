#!/usr/bin/env node
/**
 * Traite la photo pro de Charlotte en variantes web.
 * - round-*   : recadrage circulaire (coins transparents) pour le hero, le CTA et le footer.
 * - portrait-*: portrait rectangulaire (coins arrondis gérés en CSS) pour /qui-suis-je.
 * Usage: node scripts/process-charlotte.mjs [chemin-source]
 */
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = process.argv[2] || path.join(root, "..", "PeakCL.jpg");
const outDir = path.join(root, "public", "peakcl", "photo");
fs.mkdirSync(outDir, { recursive: true });

const { width } = await sharp(src).metadata();
const size = width; // image carrée

// Masque circulaire (disque plein) -> coins transparents, à la taille de sortie.
const circleAt = (px) =>
  Buffer.from(
    `<svg width="${px}" height="${px}"><circle cx="${px / 2}" cy="${px / 2}" r="${px / 2}" fill="#fff"/></svg>`,
  );

async function round(px) {
  const buf = await sharp(src)
    .resize(px, px)
    .composite([{ input: circleAt(px), blend: "dest-in" }])
    .webp({ quality: 88 })
    .toBuffer();
  fs.writeFileSync(path.join(outDir, `charlotte-round-${px}.webp`), buf);
  return px;
}

async function portrait(px) {
  // Portrait vertical 4:5 recadré sur le sujet (légèrement à droite du centre).
  const cropW = Math.round(size * 0.86);
  const cropH = Math.round(cropW * 1.25) > size ? size : Math.round(cropW * 1.25);
  const left = Math.round((size - cropW) * 0.55);
  const region = { left, top: 0, width: cropW, height: cropH };
  for (const fmt of ["webp", "avif"]) {
    const buf = await sharp(src)
      .extract(region)
      .resize(px, Math.round((px * cropH) / cropW))
      [fmt]({ quality: fmt === "avif" ? 55 : 82 })
      .toBuffer();
    fs.writeFileSync(path.join(outDir, `charlotte-portrait-${px}.${fmt}`), buf);
  }
  return px;
}

const roundSizes = [96, 192, 400, 800];
const portraitSizes = [640, 960, 1280];
for (const s of roundSizes) await round(s);
for (const s of portraitSizes) await portrait(s);

console.log("round:", roundSizes.join(","), "| portrait:", portraitSizes.join(","));
console.log("out:", path.relative(root, outDir));
