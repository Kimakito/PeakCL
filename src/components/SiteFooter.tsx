import { Instagram, Facebook, Linkedin, MessageCircle, Mail, Phone } from "lucide-react";
import { useRouterState } from "@tanstack/react-router";
import { SOCIAL, CONTACT } from "@/lib/links";
import { resetConsent } from "@/lib/consent";
import { localeFromPath, type Locale } from "@/i18n/config";
import { geoPagesFor } from "@/seo/geo";
import { metierPages } from "@/seo/metiers";
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

/**
 * Pages villes : SEO local français uniquement, aucun équivalent anglais.
 * Derivé de `geoPages` plutôt que réécrit ici : la liste était auparavant
 * dupliquée, et une page ajoutée d'un côté manquait de l'autre.
 *
 * Les pages community-manager par ville sont listées elles aussi : elles
 * n'étaient atteignables que depuis leurs voisines et depuis le hub Savoie,
 * donc quasi orphelines pour un crawler.
 */
const VILLES = geoPagesFor("site").map((p) => ({
  href: `/${p.slug}`,
  label: `Agence web ${p.city}`,
}));

const VILLES_CM = geoPagesFor("community").map((p) => ({
  href: `/${p.slug}`,
  label: p.city === "Savoie" ? "Community manager en Savoie" : `Community manager ${p.city}`,
}));

/**
 * Pages metier : FR uniquement, comme les pages villes. Listees au footer pour
 * la meme raison qu'elles — sans lien interne, une page reste orpheline et
 * Google la classe « Exploree, actuellement non indexee ».
 */
const METIERS = metierPages.map((m) => ({ href: `/${m.slug}`, label: m.label }));

const PAGES: Record<Locale, FooterLink[]> = {
  fr: [
    { href: "/portfolio", label: "Portfolio" },
    { href: "/diagnostic", label: "Mini-audit gratuit" },
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
    <footer className="border-t border-border bg-card/30">
      <div className="mx-auto grid max-w-5xl gap-8 px-6 py-14 sm:grid-cols-2 md:grid-cols-4">
        <nav aria-label={t.services}>
          <h2 className="text-sm font-semibold text-foreground">{t.services}</h2>
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

        {/* Bloc villes et métiers : SEO FR seulement, masqué en anglais. */}
        {locale === "fr" ? (
          <nav aria-label={t.areas}>
            <h2 className="text-sm font-semibold text-foreground">{t.areas}</h2>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {[...VILLES, ...VILLES_CM, ...METIERS].map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover:text-foreground">
                    {l.label}
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
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground transition-colors hover:border-[var(--brand-turquoise)] hover:text-[var(--brand-turquoise)]"
              >
                <Icon className="h-[17px] w-[17px]" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 border-t border-border px-6 py-6 text-xs text-muted-foreground/70 sm:flex-row">
        <p>
          {locale === "en"
            ? `© ${year} PeakCL · Charlotte Lacroix · Web developer & designer, working remotely worldwide`
            : `© ${year} PeakCL · Charlotte Lacroix · Gilly-sur-Isère (73200), Savoie`}
        </p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          {/* Lien legal : obligatoire (art. 13 RGPD) et attendu par Google sur
              un site commercial. Affiche en FR comme en EN, la page etant la
              meme entite juridique. */}
          <a href="/politique-confidentialite" className="hover:text-foreground">
            {locale === "en" ? "Privacy policy" : "Politique de confidentialité"}
          </a>
          {/* Le consentement doit pouvoir etre retire aussi facilement qu'il a
              ete donne (RGPD art. 7-3). Ce lien efface le choix stocke, ce qui
              refait apparaitre la banniere immediatement. */}
          <button type="button" onClick={() => resetConsent()} className="hover:text-foreground">
            {locale === "en" ? "Manage cookies" : "Gérer mes cookies"}
          </button>
        </div>
      </div>
    </footer>
  );
}
