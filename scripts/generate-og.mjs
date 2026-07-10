#!/usr/bin/env node
/**
 * Génère la carte de partage social (Open Graph / Twitter) 1200x630 :
 * fond dégradé de marque + halos + portrait rond + titre.
 * Usage: node scripts/generate-og.mjs
 */
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "public", "peakcl", "og-cover.jpg");
const photo = path.join(root, "public", "peakcl", "photo", "charlotte-round-800.webp");

const W = 1200;
const H = 630;

// Fond + halos + texte + anneau du portrait
const svg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#160b30"/>
      <stop offset="0.55" stop-color="#0d0f1e"/>
      <stop offset="1" stop-color="#08131d"/>
    </linearGradient>
    <filter id="blur"><feGaussianBlur stdDeviation="60"/></filter>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <circle cx="1010" cy="120" r="260" fill="#7B3FF2" opacity="0.35" filter="url(#blur)"/>
  <circle cx="990" cy="520" r="220" fill="#00E5D4" opacity="0.22" filter="url(#blur)"/>
  <circle cx="120" cy="560" r="200" fill="#FFD500" opacity="0.10" filter="url(#blur)"/>

  <text x="90" y="118" font-family="Arial, sans-serif" font-size="42" font-weight="700" fill="#ffffff">Peak<tspan fill="#00E5D4">CL</tspan></text>

  <text x="88" y="285" font-family="Arial, sans-serif" font-size="62" font-weight="800" fill="#ffffff">Déléguez votre</text>
  <text x="88" y="355" font-family="Arial, sans-serif" font-size="62" font-weight="800" fill="#00E5D4">communication en ligne.</text>

  <text x="90" y="430" font-family="Arial, sans-serif" font-size="30" fill="#c8cede">Site · Identité · Réseaux · Google. Un seul interlocuteur.</text>

  <text x="90" y="512" font-family="Arial, sans-serif" font-size="27" font-weight="700" fill="#FFD500">★★★★★ 5/5 Google<tspan fill="#9aa2b5" font-weight="400"> · 20+ projets · Savoie &amp; France</tspan></text>

  <circle cx="1000" cy="315" r="150" fill="none" stroke="#00E5D4" stroke-width="4" opacity="0.85"/>
</svg>`;

const ring = 150;
const photoBuf = await sharp(photo)
  .resize(ring * 2, ring * 2)
  .toBuffer();

await sharp(Buffer.from(svg))
  .composite([{ input: photoBuf, left: 1000 - ring, top: 315 - ring }])
  .jpeg({ quality: 88 })
  .toFile(out);

console.log("OG:", path.relative(root, out), `${W}x${H}`);
