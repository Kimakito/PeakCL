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

const SOCIALS = [
  { href: SOCIAL.instagram, label: "Instagram", icon: Instagram },
  { href: SOCIAL.facebook, label: "Facebook", icon: Facebook },
  { href: SOCIAL.linkedin, label: "LinkedIn", icon: Linkedin },
  { href: SOCIAL.whatsapp, label: "WhatsApp", icon: MessageCircle },
];

const FREELANCE_LINKS = [
  { href: FREELANCE.malt, label: "Malt" },
  { href: FREELANCE.fiverr, label: "Fiverr" },
  { href: FREELANCE.comeup, label: "ComeUp" },
];

type NavLink = { href: string; label: string };

type FooterText = {
  headline: string;
  subtitle: string;
  primaryNav: NavLink[];
  serviceLinks: NavLink[];
  alsoAvailable: string;
  /** Villes : SEO local français uniquement, retiré en anglais (angle international). */
  cities: NavLink[] | null;
};

/** Contenu du footer selon la langue. En anglais : angle international
 *  (freelance à distance), on retire l'ancrage géographique Savoie / villes. */
function footerText(locale: Locale): FooterText {
  if (locale === "en") {
    return {
      headline: "Let's build your online presence.",
      subtitle:
        "Website, brand, social, Google: one person, from start to finish.",
      primaryNav: [
        { href: "/en", label: "Home" },
        { href: "/en/portfolio", label: "Portfolio" },
        { href: "/en/services", label: "Services" },
        { href: "/en/about", label: "About" },
        { href: "/conseils", label: "Tips" },
        { href: "/en/book-a-call", label: "Book a call" },
      ],
      serviceLinks: [
        { href: "/en/web-development", label: "Web development" },
        { href: "/creation-logo-albertville", label: "Logo & brand identity" },
        { href: "/community-manager-savoie", label: "Social media management" },
        { href: "/en/design", label: "Graphic design" },
      ],
      alsoAvailable: "Also available on:",
      cities: null,
    };
  }
  return {
    headline: "Construisons votre image en ligne.",
    subtitle:
      "Site, identité, réseaux, Google : un seul interlocuteur, de A à Z.",
    primaryNav: [
      { href: "/", label: "Accueil" },
      { href: "/portfolio", label: "Portfolio" },
      { href: "/services", label: "Services" },
      { href: "/qui-suis-je", label: "Qui suis-je" },
      { href: "/conseils", label: "Conseils" },
      { href: "/reservation-appel", label: "Réservation d’appel" },
    ],
    serviceLinks: [
      { href: "/sites-web", label: "Création de sites web" },
      { href: "/creation-logo-albertville", label: "Logo & identité" },
      { href: "/community-manager-savoie", label: "Community management" },
      { href: "/design", label: "Design graphique" },
    ],
    alsoAvailable: "Aussi disponible sur :",
    cities: [
      { href: "/agence-web-albertville", label: "Albertville" },
      { href: "/agence-web-chambery", label: "Chambéry" },
      { href: "/agence-web-annecy", label: "Annecy" },
      { href: "/agence-web-aix-les-bains", label: "Aix-les-Bains" },
      { href: "/agence-web-gilly-sur-isere", label: "Gilly-sur-Isère" },
    ],
  };
}

/** Footer plein écran — pensé pour terminer un deck horizontal. */
export function DeckFooter() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const locale = localeFromPath(path);
  const t = footerText(locale);
  const year = new Date().getFullYear();
  return (
    <section className="flex h-full w-full items-center justify-center overflow-y-auto">
      <div className="mx-auto w-full max-w-3xl px-8 py-10 text-center">
        <img
          src="/design-system/logotype-horizontal.png"
          alt="PeakCL"
          className="logo-adaptive mx-auto h-12 w-auto"
        />
        <h2 className="mt-4 text-2xl font-bold md:text-3xl">{t.headline}</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
          {t.subtitle}
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          {SOCIALS.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              title={label}
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground transition-colors hover:border-[var(--brand-turquoise)] hover:text-[var(--brand-turquoise)]"
            >
              <Icon className="h-[18px] w-[18px]" />
            </a>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
          <a
            href={`mailto:${CONTACT.email}`}
            className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
          >
            <Mail className="h-4 w-4" /> {CONTACT.email}
          </a>
          <a
            href={CONTACT.phoneTel}
            className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
          >
            <Phone className="h-4 w-4" /> {CONTACT.phoneDisplay}
          </a>
        </div>

        <div className="mt-7 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs">
          {t.primaryNav.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-muted-foreground hover:text-foreground"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground/80">
          {t.serviceLinks.map(({ href, label }) => (
            <a key={href} href={href} className="hover:text-foreground">
              {label}
            </a>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground/80">
          <span>{t.alsoAvailable}</span>
          {FREELANCE_LINKS.map(({ href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer nofollow sponsored"
              className="hover:text-foreground"
            >
              {label}
            </a>
          ))}
        </div>

        {t.cities ? (
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground/60">
            {t.cities.map(({ href, label }) => (
              <a key={href} href={href} className="hover:text-foreground">
                {label}
              </a>
            ))}
          </div>
        ) : null}

        <p className="mt-6 text-xs text-muted-foreground/60">
          © {year} PeakCL · Charlotte Lacroix
        </p>
      </div>
    </section>
  );
}
