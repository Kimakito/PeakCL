import { DELIVERED_COUNT } from "@/content/peakcl/portfolio";

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

const COPY: Copy = {
  aria: "Présentation de Charlotte Lacroix, PeakCL",
  kicker: "Qui je suis",
  leadTitle: "Une seule interlocutrice",
  lead: "Je code, je dessine, et je suis formée au community management. Site, logo et réseaux alignés sur le même message, sans double brief ni sous-traitance cachée.",
  role: "Charlotte Lacroix · développeuse web & community manager · Gilly-sur-Isère, Savoie",
  metiersTitle: "Trois métiers, une personne",
  metiers: ["Code", "Design", "Community"],
  statValue: String(DELIVERED_COUNT),
  statLabel: "projets clients livrés, notés 5/5 sur Google",
  techTitle: "Du solide sous le capot",
  tech: "Sites codés à la main, sans CMS ni plugins. 7 ans de code, dont des plateformes à fort trafic et la refonte d'un site corporate international. Core Web Vitals au vert, SEO local propre.",
  socialTitle: "Plus que de jolis posts",
  social:
    "Je construis une communication cohérente, pensée pour la conversion, du site web jusqu'aux réseaux.",
  clientsTitle: "Pour qui",
  clients:
    "TPE, PME, indépendants, artisans, thérapeutes et commerçants. Agence de voyage, cabinet d'avocate, prothésiste dentaire, coachs, e-commerce équestre…",
  locationTitle: "D'où je travaille",
  location:
    "Basée à Gilly-sur-Isère, près d'Albertville. Toute la Savoie et partout en France, en visio.",
};

const CARD =
  "group relative overflow-hidden rounded-[28px] p-6 shadow-md transition-transform duration-300 hover:rotate-0";

/** Présentation bio en mosaïque de carrés arrondis colorés (motif signature PeakCL). */
export function MosaicBio({ className = "" }: { className?: string }) {
  const c = COPY;
  return (
    <section aria-label={c.aria} className={`grid grid-cols-1 gap-4 sm:grid-cols-6 ${className}`}>
      {/* Lead — violet, texte blanc */}
      <article
        className={`${CARD} -rotate-1 p-7 text-white sm:col-span-4`}
        style={{ backgroundImage: "var(--grad-violet)" }}
      >
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/80">{c.kicker}</p>
        <h3 className="mt-2 font-display text-2xl font-extrabold md:text-3xl">{c.leadTitle}</h3>
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
        <p className="font-display text-6xl font-extrabold leading-none">{c.statValue}</p>
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
