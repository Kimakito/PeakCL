#!/usr/bin/env node
/**
 * Convertit les illustrations de la mascotte PeakCL (créées sous Illustrator,
 * fond violet, PNG lourds) en WebP web-ready pour la galerie /design.
 * Source : /images/<mood>-web.png · Sortie : public/peakcl/assets/images/mascot-<mood>.webp
 * Usage : node scripts/process-mascot.mjs
 */
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = path.join(root, "images");
const outDir = path.join(root, "public", "peakcl", "assets", "images");
fs.mkdirSync(outDir, { recursive: true });

/** fichier source → slug de sortie */
const MAP = {
  "happy-web.png": "mascot-happy",
  "think-web.png": "mascot-think",
  "thumbs-up-web.png": "mascot-thumbs-up",
  "storm-web.png": "mascot-storm",
  "sad-web.png": "mascot-sad",
  "sceptic-web.png": "mascot-sceptic",
};

const MAX = 1400; // plus grand côté, suffisant pour un affichage retina en galerie

for (const [file, slug] of Object.entries(MAP)) {
  const src = path.join(srcDir, file);
  if (!fs.existsSync(src)) {
    console.warn(`⚠ source manquante : ${file}`);
    continue;
  }
  const buf = await sharp(src)
    .resize({ width: MAX, height: MAX, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer();
  const out = path.join(outDir, `${slug}.webp`);
  fs.writeFileSync(out, buf);
  console.log(`✓ ${file} → ${slug}.webp (${(buf.length / 1024).toFixed(0)} Ko)`);
}

/* ── Avatars carrés (visage du personnage) pour le chatbot PeakaBot ──
 * Crop recentré sur la tête/le buste du personnage, puis carré 480px. */
const AVATARS = {
  "happy-web.png": { slug: "avatar-happy", left: 520, top: 1830, side: 1300 },
  "think-web.png": { slug: "avatar-think", left: 570, top: 2150, side: 1000 },
  "thumbs-up-web.png": { slug: "avatar-thumbs-up", left: 1365, top: 805, side: 1150 },
};

for (const [file, { slug, left, top, side }] of Object.entries(AVATARS)) {
  const src = path.join(srcDir, file);
  if (!fs.existsSync(src)) continue;
  const meta = await sharp(src).metadata();
  const w = Math.min(side, meta.width - left);
  const h = Math.min(side, meta.height - top);
  const s = Math.min(w, h);
  const buf = await sharp(src)
    .extract({ left, top, width: s, height: s })
    .resize(480, 480)
    .webp({ quality: 82 })
    .toBuffer();
  const out = path.join(outDir, `${slug}.webp`);
  fs.writeFileSync(out, buf);
  console.log(`✓ ${file} → ${slug}.webp (${(buf.length / 1024).toFixed(0)} Ko)`);
}
