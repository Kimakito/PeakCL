import { Instagram, Facebook, Linkedin, MessageCircle, Mail, Phone } from "lucide-react";
import { SOCIAL, CONTACT } from "@/lib/links";
import { resetConsent } from "@/lib/consent";
import { geoPagesFor } from "@/seo/geo";
import { metierPages } from "@/seo/metiers";
import { MascotCameo } from "@/components/MascotCameo";

const SOCIALS = [
  { href: SOCIAL.instagram, label: "Instagram", icon: Instagram },
  { href: SOCIAL.facebook, label: "Facebook", icon: Facebook },
  { href: SOCIAL.linkedin, label: "LinkedIn", icon: Linkedin },
  { href: SOCIAL.whatsapp, label: "WhatsApp", icon: MessageCircle },
];

type FooterLink = { href: string; label: string };

const SERVICES: FooterLink[] = [
  { href: "/sites-web", label: "Création de sites web" },
  { href: "/refonte-site-pme", label: "Refonte de site" },
  { href: "/creation-logo-albertville", label: "Logo & identité visuelle" },
  // Le libellé suit l'URL : /community-management est la page des forfaits.
  // La page locale « community manager en Savoie » est listée avec les villes.
  { href: "/community-management", label: "Community management : forfaits" },
  { href: "/design", label: "Design graphique" },
  { href: "/accompagnement-automatisation", label: "Automatisation" },
  { href: "/services", label: "Tous les services" },
];

/**
 * Pages villes (SEO local).
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
 * Pages metier. Listees au footer pour
 * la meme raison qu'elles — sans lien interne, une page reste orpheline et
 * Google la classe « Exploree, actuellement non indexee ».
 */
const METIERS = metierPages.map((m) => ({ href: `/${m.slug}`, label: m.label }));

const PAGES: FooterLink[] = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/diagnostic", label: "Mini-audit gratuit" },
  { href: "/qui-suis-je", label: "Qui suis-je" },
  { href: "/conseils", label: "Conseils" },
  { href: "/contact", label: "Contact" },
  { href: "/reservation-appel", label: "Réserver un appel" },
];

/** Footer global du site (monté dans __root sur toutes les pages sauf le deck home/portfolio). */
export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-card/30">
      {/* Signature de fin de page : la mascotte « salut » debout sur le trait du
          footer, sur toutes les pages. Assez petite pour ne rien masquer de la
          section précédente, assez constante pour qu'on la reconnaisse. */}
      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <MascotCameo
          pose="salut"
          from="md"
          className="absolute bottom-0 right-6 h-28 translate-y-px"
        />
      </div>
      <div className="mx-auto grid max-w-5xl gap-8 px-6 py-14 sm:grid-cols-2 md:grid-cols-4">
        <nav aria-label="Services">
          <h2 className="text-sm font-semibold text-foreground">Services</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {SERVICES.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-foreground">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bloc villes et métiers (SEO local). */}
        <nav aria-label="Zones desservies">
          <h2 className="text-sm font-semibold text-foreground">Zones desservies</h2>
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

        <nav aria-label="Le studio">
          <h2 className="text-sm font-semibold text-foreground">Le studio</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {PAGES.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-foreground">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold text-foreground">Contact</h2>
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
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground transition-colors hover:border-[var(--brand-turquoise)] hover:text-[var(--accent-turquoise-ink)]"
              >
                <Icon className="h-[17px] w-[17px]" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 border-t border-border px-6 py-6 text-xs text-muted-foreground/70 sm:flex-row">
        <p>{`© ${year} PeakCL · Charlotte Lacroix · Gilly-sur-Isère (73200), Savoie`}</p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          {/* Lien legal : obligatoire (art. 13 RGPD) et attendu par Google sur
              un site commercial. */}
          <a href="/politique-confidentialite" className="hover:text-foreground">
            Politique de confidentialité
          </a>
          {/* Le consentement doit pouvoir etre retire aussi facilement qu'il a
              ete donne (RGPD art. 7-3). Ce lien efface le choix stocke, ce qui
              refait apparaitre la banniere immediatement. */}
          <button type="button" onClick={() => resetConsent()} className="hover:text-foreground">
            Gérer mes cookies
          </button>
        </div>
      </div>
    </footer>
  );
}
