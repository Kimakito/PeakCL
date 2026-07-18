/**
 * Chaînes d'interface du chrome (nav, footer, sélecteur, gabarit ServicePage),
 * dans les deux langues. Le contenu éditorial des pages ne vit PAS ici : il
 * reste dans les routes (FR inline, EN dupliqué) et dans les modules de contenu.
 *
 * La nav n'est pas qu'une affaire de libellés : en anglais on ne montre pas
 * « Conseils » (le blog n'est pas traduit), donc les entrées elles-mêmes
 * diffèrent selon la langue.
 */
import type { Locale } from "@/i18n/config";

type NavItem = { to: string; label: string };
type ServiceItem = { to: string; label: string; emoji: string };

type UIStrings = {
  nav: {
    services: string;
    overview: string;
    serviceItems: ServiceItem[];
    links: NavItem[];
    cta: string;
    openMenu: string;
    closeMenu: string;
  };
  langSwitch: {
    /** aria-label du groupe de sélection de langue. */
    label: string;
    toFr: string;
    toEn: string;
  };
  footer: {
    services: string;
    areas: string;
    studio: string;
    contact: string;
    alsoOn: string;
  };
  servicePage: {
    onQuote: string;
    priceHint: string;
    deliverables: string;
    outOfScope: string;
    howWeWork: string;
    howWeWorkBody: string;
    requestQuote: string;
    popular: string;
    /** CTA « Demander un devis » du hero et du bloc contact final. */
    requestQuoteHero: string;
    /** CTA secondaire « Réserver un appel ». */
    bookCall: string;
    /** Titres par défaut des sections (fallbacks des props ?? "..."). */
    highlightsTitleDefault: string;
    forfaitsTitleDefault: string;
    galleryTitleDefault: string;
    socialsTitleDefault: string;
    /** Bloc contact final. */
    contactTitle: string;
    contactBody: string;
    photoCaption: string;
    sections: string[];
  };
};

const SERVICE_ITEMS_EN: ServiceItem[] = [
  { to: "/en/web-development", label: "Web development", emoji: "💻" },
  { to: "/en/social-media", label: "Social media", emoji: "📱" },
  { to: "/en/design", label: "Design & branding", emoji: "🎨" },
  { to: "/en/automation", label: "Automation", emoji: "⚙️" },
];

const UI: Record<Locale, UIStrings> = {
  fr: {
    nav: {
      services: "Services",
      overview: "Vue d’ensemble",
      // FR : les entrées Services viennent de content/peakcl/services.ts, la nav
      // les lit directement. On ne les duplique pas ici.
      serviceItems: [],
      links: [
        { to: "/portfolio", label: "Portfolio" },
        { to: "/qui-suis-je", label: "Qui suis-je" },
        { to: "/conseils", label: "Conseils" },
        { to: "/contact", label: "Contact" },
      ],
      cta: "Réserver un appel",
      openMenu: "Ouvrir le menu",
      closeMenu: "Fermer le menu",
    },
    langSwitch: {
      label: "Choix de la langue",
      toFr: "Français",
      toEn: "English",
    },
    footer: {
      services: "Services",
      areas: "Zones desservies",
      studio: "Le studio",
      contact: "Contact",
      alsoOn: "Aussi sur :",
    },
    servicePage: {
      onQuote: "Sur devis",
      priceHint: "Selon votre profil et le périmètre",
      deliverables: "Livrables",
      outOfScope: "Hors périmètre (souvent)",
      howWeWork: "Comment on avance",
      howWeWorkBody:
        "Vous réservez votre appel, je vous fais un retour rapide, puis on valide un devis clair (livrables, délais, budget) selon votre besoin.",
      requestQuote: "Demander un devis pour cette prestation",
      popular: "Populaire",
      requestQuoteHero: "Demander un devis",
      bookCall: "Réserver un appel",
      highlightsTitleDefault: "Ce que je peux faire pour vous",
      forfaitsTitleDefault: "Forfaits mensuels",
      galleryTitleDefault: "Illustration & character design",
      socialsTitleDefault: "Comptes que j’anime",
      contactTitle: "On commence quand ?",
      contactBody:
        "Le plus simple : vous réservez votre appel. C’est quelques minutes, et je reviens vers vous avec un devis clair.",
      photoCaption: "On y va ?",
      sections: [
        "Intro",
        "Expertises",
        "Forfaits",
        "Prestations",
        "Illustration",
        "Réseaux",
        "Contact",
      ],
    },
  },
  en: {
    nav: {
      services: "Services",
      overview: "Overview",
      serviceItems: SERVICE_ITEMS_EN,
      links: [
        { to: "/en/portfolio", label: "Portfolio" },
        { to: "/en/about", label: "About" },
      ],
      cta: "Book a call",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    langSwitch: {
      label: "Language",
      toFr: "Français",
      toEn: "English",
    },
    footer: {
      services: "Services",
      areas: "Where I work",
      studio: "The studio",
      contact: "Contact",
      alsoOn: "Also on:",
    },
    servicePage: {
      onQuote: "On request",
      priceHint: "Based on your profile and scope",
      deliverables: "What's included",
      outOfScope: "Usually out of scope",
      howWeWork: "How we work together",
      howWeWorkBody:
        "You book your call, I get back to you quickly, then we lock in a clear quote (deliverables, timeline, budget) based on your needs.",
      requestQuote: "Request a quote for this service",
      popular: "Popular",
      requestQuoteHero: "Request a quote",
      bookCall: "Book a call",
      highlightsTitleDefault: "What I can do for you",
      forfaitsTitleDefault: "Monthly plans",
      galleryTitleDefault: "Illustration & character design",
      socialsTitleDefault: "Accounts I run",
      contactTitle: "Ready to get started?",
      contactBody:
        "The simplest way: book your call. It only takes a few minutes, and I come back to you with a clear quote.",
      photoCaption: "Shall we?",
      sections: [
        "Intro",
        "Expertise",
        "Plans",
        "Services",
        "Showcase",
        "Social",
        "Contact",
      ],
    },
  },
};

export function ui(locale: Locale): UIStrings {
  return UI[locale];
}
