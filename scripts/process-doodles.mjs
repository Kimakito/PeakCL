#!/usr/bin/env node
/**
 * Transforme les planches de doodles (traits sombres sur fond crème) en
 * filigranes clairs à fond transparent, utilisables en décor subtil sur le
 * site sombre. L'alpha = inverse de la luminance (le fond clair devient
 * transparent, les traits deviennent opaques), la couleur est un blanc froid.
 * Usage: node scripts/process-doodles.mjs
 */
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public", "peakcl", "doodles");
fs.mkdirSync(outDir, { recursive: true });

const sources = ["doodle_2_07.jpg", "arl5_11xm_221223.jpg", "7609.jpg", "45930.jpg"];
const OUT = 1000; // taille de sortie (décor)

let done = 0;
for (const [i, file] of sources.entries()) {
  const src = path.join(root, file);
  if (!fs.existsSync(src)) continue;

  // Alpha = 255 - luminance (fond clair -> transparent ; traits -> opaques)
  const alpha = await sharp(src)
    .resize(OUT, OUT, { fit: "inside" })
    .grayscale()
    .negate()
    .linear(1.25, -20) // renforce le contraste des traits, coupe le voile de fond
    .toColourspace("b-w")
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = alpha.info;

  // Image blanc froid + canal alpha issu du doodle
  const buf = await sharp({
    create: { width, height, channels: 3, background: { r: 236, g: 244, b: 255 } },
  })
    .joinChannel(alpha.data, { raw: { width, height, channels: 1 } })
    .webp({ quality: 90 })
    .toBuffer();

  fs.writeFileSync(path.join(outDir, `doodle-${i + 1}.webp`), buf);
  done++;
}

console.log(`doodles traités: ${done} -> ${path.relative(root, outDir)}`);
