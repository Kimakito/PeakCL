import {
  Instagram,
  Facebook,
  Linkedin,
  MessageCircle,
  Mail,
  Phone,
} from "lucide-react";
import { useRouterState } from "@tanstack/react-router";
import { SOCIAL, FREELANCE, CONTACT } from "@/lib/links";
import { localeFromPath, type Locale } from "@/i18n/config";
import { ui } from "@/i18n/ui";

const SOCIALS = [
  { href: SOCIAL.instagram, label: "Instagram", icon: Instagram },
  { href: SOCIAL.facebook, label: "Facebook", icon: Facebook },
  { href: SOCIAL.linkedin, label: "LinkedIn", icon: Linkedin },
  { href: SOCIAL.whatsapp, label: "WhatsApp", icon: MessageCircle },
];

type FooterLink = { href: string; label: string };

const SERVICES: Record<Locale, FooterLink[]> = {
  fr: [
    { href: "/sites-web", label: "Création de sites web" },
    { href: "/creation-logo-albertville", label: "Logo & identité visuelle" },
    { href: "/community-manager-savoie", label: "Community management" },
    { href: "/design", label: "Design graphique" },
    { href: "/services", label: "Tous les services" },
  ],
  en: [
    { href: "/en/web-development", label: "Web development" },
    { href: "/en/design", label: "Design & branding" },
    { href: "/en/social-media", label: "Social media" },
    { href: "/en/automation", label: "Automation" },
    { href: "/en/services", label: "All services" },
  ],
};

/** Pages villes : SEO local français uniquement, aucun équivalent anglais. */
const VILLES = [
  { href: "/agence-web-albertville", label: "Albertville" },
  { href: "/agence-web-chambery", label: "Chambéry" },
  { href: "/agence-web-annecy", label: "Annecy" },
  { href: "/agence-web-aix-les-bains", label: "Aix-les-Bains" },
  { href: "/agence-web-gilly-sur-isere", label: "Gilly-sur-Isère" },
  { href: "/agence-web-ugine", label: "Ugine" },
  { href: "/agence-web-moutiers", label: "Moûtiers" },
  { href: "/agence-web-beaufort", label: "Beaufort" },
];

const PAGES: Record<Locale, FooterLink[]> = {
  fr: [
    { href: "/portfolio", label: "Portfolio" },
    { href: "/diagnostic", label: "Diagnostic gratuit" },
    { href: "/qui-suis-je", label: "Qui suis-je" },
    { href: "/conseils", label: "Conseils" },
    { href: "/contact", label: "Contact" },
    { href: "/reservation-appel", label: "Réserver un appel" },
  ],
  en: [
    { href: "/en/portfolio", label: "Portfolio" },
    { href: "/en/about", label: "About" },
    { href: "/en/book-a-call", label: "Book a call" },
  ],
};

/** Footer global du site (monté dans __root sur toutes les pages sauf le deck home/portfolio). */
export function SiteFooter() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const locale = localeFromPath(path);
  const t = ui(locale).footer;
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/5 bg-card/30">
      <div className="mx-auto grid max-w-5xl gap-8 px-6 py-14 sm:grid-cols-2 md:grid-cols-4">
        <nav aria-label={t.services}>
          <h2 className="text-sm font-semibold text-foreground">
            {t.services}
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {SERVICES[locale].map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-foreground">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bloc villes : SEO local FR seulement, masqué en anglais. */}
        {locale === "fr" ? (
          <nav aria-label={t.areas}>
            <h2 className="text-sm font-semibold text-foreground">{t.areas}</h2>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {VILLES.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover:text-foreground">
                    Agence web {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}

        <nav aria-label={t.studio}>
          <h2 className="text-sm font-semibold text-foreground">{t.studio}</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {PAGES[locale].map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-foreground">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold text-foreground">{t.contact}</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <a
                href={`mailto:${CONTACT.email}`}
                className="inline-flex items-center gap-1.5 hover:text-foreground js-track-email"
              >
                <Mail className="h-4 w-4" /> {CONTACT.email}
              </a>
            </li>
            <li>
              <a
                href={CONTACT.phoneTel}
                className="inline-flex items-center gap-1.5 hover:text-foreground"
              >
                <Phone className="h-4 w-4" /> {CONTACT.phoneDisplay}
              </a>
            </li>
          </ul>
          <div className="mt-4 flex items-center gap-3">
            {SOCIALS.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:border-[var(--brand-turquoise)] hover:text-[var(--brand-turquoise)]"
              >
                <Icon className="h-[17px] w-[17px]" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 border-t border-white/5 px-6 py-6 text-xs text-muted-foreground/70 sm:flex-row">
        <p>
          {locale === "en"
            ? `© ${year} PeakCL · Charlotte Lacroix · Web developer & designer, working remotely worldwide`
            : `© ${year} PeakCL · Charlotte Lacroix · Gilly-sur-Isère (73200), Savoie`}
        </p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <span>{t.alsoOn}&nbsp;</span>
          <a
            href={FREELANCE.malt}
            target="_blank"
            rel="noopener noreferrer nofollow sponsored"
            className="hover:text-foreground"
          >
            Malt
          </a>
          <a
            href={FREELANCE.fiverr}
            target="_blank"
            rel="noopener noreferrer nofollow sponsored"
            className="hover:text-foreground"
          >
            Fiverr
          </a>
          <a
            href={FREELANCE.comeup}
            target="_blank"
            rel="noopener noreferrer nofollow sponsored"
            className="hover:text-foreground"
          >
            ComeUp
          </a>
        </div>
      </div>
    </footer>
  );
}
