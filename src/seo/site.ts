export const SITE_URL = import.meta.env.VITE_SITE_URL?.replace(/\/+$/, "") || "https://peakcl.com";

export function absUrl(pathname: string) {
  if (!pathname.startsWith("/")) return `${SITE_URL}/${pathname}`;
  return `${SITE_URL}${pathname}`;
}
