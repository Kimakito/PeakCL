/** Miniature WebP 96px générée par scripts/optimize-client-logos.mjs */
export function optimizedLogoUrl(url: string): string {
  if (!url || url.endsWith(".svg")) return url;
  if (url.includes("-sm.webp")) return url;
  return url.replace(/\.(png|jpe?g|webp)$/i, "-sm.webp");
}
