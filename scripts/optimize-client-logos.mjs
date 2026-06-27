#!/usr/bin/env node
/**
 * Génère des miniatures WebP 96px pour les logos affichés en petit (marquee, portfolio).
 * Usage: node scripts/optimize-client-logos.mjs
 */
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const logoDir = path.join(root, "public", "peakcl", "assets", "logo");
const SIZE = 96;

const files = fs.readdirSync(logoDir).filter((f) => /\.(png|jpe?g|webp)$/i.test(f) && !f.endsWith("-sm.webp"));

let done = 0;
for (const file of files) {
  const input = path.join(logoDir, file);
  const base = file.replace(/\.(png|jpe?g|webp)$/i, "");
  const output = path.join(logoDir, `${base}-sm.webp`);
  try {
    await sharp(input)
      .resize(SIZE, SIZE, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(output);
    const inKb = Math.round(fs.statSync(input).size / 1024);
    const outKb = Math.round(fs.statSync(output).size / 1024);
    console.log(`✓ ${file} (${inKb}KB → ${outKb}KB) → ${base}-sm.webp`);
    done++;
  } catch (e) {
    console.warn(`✗ ${file}:`, e.message);
  }
}

// Logo nav PeakCL (depuis l'asset importé)
const navIn = path.join(root, "src", "assets", "peakcl-logo.png");
const navOut = path.join(root, "public", "peakcl", "logo-nav.webp");
if (fs.existsSync(navIn)) {
  await sharp(navIn).resize(72, 72, { fit: "cover" }).webp({ quality: 85 }).toFile(navOut);
  console.log(`✓ logo-nav.webp (${Math.round(fs.statSync(navOut).size / 1024)}KB)`);
}

console.log(`\n${done} miniatures générées.`);
