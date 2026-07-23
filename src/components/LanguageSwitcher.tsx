import { useRouterState } from "@tanstack/react-router";
import { alternatePath, localeFromPath, type Locale } from "@/i18n/config";
import { ui } from "@/i18n/ui";

/**
 * Bascule 🇫🇷 FR / 🇬🇧 EN. Drapeau + code (et non drapeau seul) : un drapeau
 * désigne un pays, pas une langue, or la cible anglaise est internationale.
 *
 * Liens en <a> volontairement (pas <Link>) : un rechargement complet relance le
 * SSR, ce qui rafraîchit <html lang>, les balises head et le JSON-LD dans la
 * bonne langue. Une navigation SPA les laisserait dans la langue précédente.
 */
export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const current = localeFromPath(path);
  const strings = ui(current).langSwitch;

  const items: { locale: Locale; flag: string; code: string; label: string }[] =
    [
      { locale: "fr", flag: "🇫🇷", code: "FR", label: strings.toFr },
      { locale: "en", flag: "🇬🇧", code: "EN", label: strings.toEn },
    ];

  return (
    <div
      role="group"
      aria-label={strings.label}
      className={`flex items-center gap-0.5 rounded-full border border-border bg-muted p-0.5 ${className}`}
    >
      {items.map(({ locale, flag, code, label }) => {
        const active = locale === current;
        return (
          <a
            key={locale}
            href={alternatePath(path, locale)}
            hrefLang={locale}
            aria-label={label}
            aria-current={active ? "true" : undefined}
            className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold transition-colors ${
              active
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span aria-hidden>{flag}</span>
            <span>{code}</span>
          </a>
        );
      })}
    </div>
  );
}
