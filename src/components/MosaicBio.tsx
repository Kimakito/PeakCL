import { useRouterState } from "@tanstack/react-router";
import { localeFromPath, type Locale } from "@/i18n/config";

const MASCOTTE = "/design-system/mascotte-ligne.svg";

type Copy = {
  aria: string;
  kicker: string;
  leadTitle: string;
  lead: string;
  role: string;
  metiersTitle: string;
  metiers: string[];
  statValue: string;
  statLabel: string;
  techTitle: string;
  tech: string;
  socialTitle: string;
  social: string;
  clientsTitle: string;
  clients: string;
  locationTitle: string;
  location: string;
};

function copyFor(locale: Locale): Copy {
  if (locale === "en") {
    return {
      aria: "About Charlotte Lacroix, PeakCL",
      kicker: "Who I am",
      leadTitle: "A single point of contact",
      lead: "I code, I design, and I'm trained in social media management. Site, logo and social aligned on the same message, with no double brief and no hidden subcontracting.",
      role: "Charlotte Lacroix · web developer & graphic designer · working remotely",
      metiersTitle: "Three crafts, one person",
      metiers: ["Code", "Design", "Social media"],
      statValue: "19",
      statLabel: "projects delivered, rated 5/5 on Google",
      techTitle: "Solid under the hood",
      tech: "Hand-coded sites, no CMS, no plugins. Core Web Vitals in the green, clean SEO.",
      socialTitle: "More than pretty posts",
      social: "I build consistent communication, designed to convert, from your website to your social channels.",
      clientsTitle: "Who I work with",
      clients: "Freelancers, makers, therapists, shop owners and small teams. A travel agency, a law firm, a dental technician, coaches, an equestrian store, and more.",
      locationTitle: "Where I work from",
      location: "Remotely, with clients across France and worldwide, over video calls.",
    };
  }
  return {
    aria: "Présentation de Charlotte Lacroix, PeakCL",
    kicker: "Qui je suis",
    leadTitle: "Une seule interlocutrice",
    lead: "Je code, je dessine, et je suis formée au community management. Site, logo et réseaux alignés sur le même message, sans double brief ni sous-traitance cachée.",
    role: "Charlotte Lacroix · développeuse web & graphiste · Gilly-sur-Isère, Savoie",
    metiersTitle: "Trois métiers, une personne",
    metiers: ["Code", "Design", "Community"],
    statValue: "19",
    statLabel: "projets livrés, notés 5/5 sur Google",
    techTitle: "Du solide sous le capot",
    tech: "Sites codés à la main, sans CMS ni plugins. Core Web Vitals au vert, SEO local propre.",
    socialTitle: "Plus que de jolis posts",
    social: "Je construis une communication cohérente, pensée pour la conversion, du site web jusqu'aux réseaux.",
    clientsTitle: "Pour qui",
    clients: "Indépendants, artisans, thérapeutes, commerçants et petites structures. Agence de voyage, cabinet d'avocate, prothésiste dentaire, coachs, e-commerce équestre…",
    locationTitle: "D'où je travaille",
    location: "Basée à Gilly-sur-Isère, près d'Albertville. Toute la Savoie et partout en France, en visio.",
  };
}

const CARD =
  "group relative overflow-hidden rounded-[28px] p-6 shadow-md transition-transform duration-300 hover:rotate-0";

/** Présentation bio en mosaïque de carrés arrondis colorés (motif signature PeakCL). */
export function MosaicBio({ className = "" }: { className?: string }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const c = copyFor(localeFromPath(path));
  return (
    <section
      aria-label={c.aria}
      className={`grid grid-cols-1 gap-4 sm:grid-cols-6 ${className}`}
    >
      {/* Lead — violet, texte blanc */}
      <article
        className={`${CARD} -rotate-1 p-7 text-white sm:col-span-4`}
        style={{ backgroundImage: "var(--grad-violet)" }}
      >
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/80">
          {c.kicker}
        </p>
        <h3 className="mt-2 font-display text-2xl font-extrabold md:text-3xl">
          {c.leadTitle}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-white/90">{c.lead}</p>
        <p className="mt-4 text-xs font-semibold text-white/80">{c.role}</p>
      </article>

      {/* Métiers + mascotte — turquoise, encre indigo */}
      <article
        className={`${CARD} rotate-1 flex flex-col justify-between text-[var(--indigo-900)] sm:col-span-2`}
        style={{ backgroundImage: "var(--grad-turquoise)" }}
      >
        <div>
          <p className="font-display text-lg font-extrabold">{c.metiersTitle}</p>
          <ul className="mt-3 space-y-1.5 text-sm font-bold">
            {c.metiers.map((m) => (
              <li key={m} className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-[3px] bg-[var(--indigo-900)]" />
                {m}
              </li>
            ))}
          </ul>
        </div>
        <img
          src={MASCOTTE}
          alt=""
          aria-hidden
          className="pointer-events-none mt-4 ml-auto h-24 w-auto opacity-90"
        />
      </article>

      {/* Stat 19 — jaune, encre indigo */}
      <article
        className={`${CARD} rotate-1 flex flex-col justify-center text-[var(--indigo-900)] sm:col-span-2`}
        style={{ backgroundImage: "var(--grad-jaune)" }}
      >
        <p className="font-display text-6xl font-extrabold leading-none">
          {c.statValue}
        </p>
        <p className="mt-2 text-sm font-semibold">{c.statLabel}</p>
      </article>

      {/* Tech — bleu, encre indigo */}
      <article
        className={`${CARD} -rotate-1 text-[var(--indigo-900)] sm:col-span-2`}
        style={{ backgroundImage: "var(--grad-bleu)" }}
      >
        <p className="font-display text-lg font-extrabold">{c.techTitle}</p>
        <p className="mt-2 text-sm">{c.tech}</p>
      </article>

      {/* Social — lavande, texte blanc */}
      <article
        className={`${CARD} rotate-1 text-white sm:col-span-2`}
        style={{ backgroundImage: "var(--grad-lavande)" }}
      >
        <p className="font-display text-lg font-extrabold">{c.socialTitle}</p>
        <p className="mt-2 text-sm text-white/90">{c.social}</p>
      </article>

      {/* Clients — carte blanche, encre */}
      <article
        className={`${CARD} -rotate-1 border border-border bg-card text-foreground sm:col-span-4`}
      >
        <p className="font-display text-lg font-extrabold">{c.clientsTitle}</p>
        <p className="mt-2 text-sm text-muted-foreground">{c.clients}</p>
      </article>

      {/* Localisation — bleu clair, encre indigo */}
      <article
        className={`${CARD} rotate-1 text-[var(--indigo-900)] sm:col-span-2`}
        style={{ backgroundColor: "var(--bleu-200)" }}
      >
        <p className="font-display text-lg font-extrabold">{c.locationTitle}</p>
        <p className="mt-2 text-sm">{c.location}</p>
      </article>
    </section>
  );
}
