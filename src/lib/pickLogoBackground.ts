export type LogoBgVariant = "light" | "dark";

/** Choix fond clair ou foncé derrière un logo selon sa luminance moyenne. */
export function pickLogoBackground(img: HTMLImageElement): LogoBgVariant {
  try {
    const w = 32;
    const h = 32;
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return "light";
    ctx.drawImage(img, 0, 0, w, h);
    const { data } = ctx.getImageData(0, 0, w, h);

    let sum = 0;
    let count = 0;
    for (let i = 0; i < data.length; i += 4) {
      const a = data[i + 3] ?? 0;
      if (a < 16) continue;
      const r = data[i] ?? 0;
      const g = data[i + 1] ?? 0;
      const b = data[i + 2] ?? 0;
      const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      sum += lum;
      count += 1;
    }

    if (!count) return "light";
    return sum / count > 180 ? "dark" : "light";
  } catch {
    return "light";
  }
}
