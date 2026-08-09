import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Check,
  Clock,
  GraduationCap,
  HandHeart,
  Instagram,
  Sparkles,
  Wand2,
} from "lucide-react";
import { absUrl } from "@/seo/site";
import { breadcrumbJsonLd } from "@/seo/jsonld";
import { submitNetlifyForm } from "@/lib/funnel";

export const Route = createFileRoute("/la-com-des-pepites")({
  head: () => ({
    meta: [
      {
        title: "La com' des pépites · Formez-vous à l'IA et à la com, ou déléguez",
      },
      {
        name: "description",
        content:
          "Plus de clients, une image qui inspire confiance et l'IA qui bosse enfin pour toi. On te forme pour devenir autonome, ou on s'occupe de ta com et de tes réseaux à ta place.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/la-com-des-pepites") },
      {
        "script:ld+json": breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "La com' des pépites", path: "/la-com-des-pepites" },
        ]),
      },
    ],
    links: [{ rel: "canonical", href: absUrl("/la-com-des-pepites") }],
  }),
  component: PepitesPage,
});

/* Styles scopés.
   1. La page est une marque à part : tant qu'elle est montée, le chrome PeakCL
      (nav, footer, PeakaBot, fond violet global) est masqué — uniquement via
      ce sélecteur, aucun autre fichier n'est modifié.
   2. Aucune variable globale de thème n'est utilisée : rendu identique en
      clair et en sombre. */
const PEPITES_CSS = `
body:has(main.pepites) > header,
body:has(main.pepites) > footer,
body:has(main.pepites) .site-bg,
body:has(main.pepites) .scroll-progress,
body:has(main.pepites) .cursor-halo,
body:has(main.pepites) .peakabot-btn,
body:has(main.pepites) [aria-label^="PeakaBot"] {
  display: none !important;
}

.pepites {
  --pep-bg: #FBEFD6;
  --pep-bg-soft: #FFF7E6;
  --pep-card: #FFFDF7;
  --pep-gold: #E9A63A;
  --pep-gold-deep: #D98A1F;
  --pep-ink: #1E1913;
  --pep-red: #B7311A;
  --pep-gold-link: #8C5A12;
  --pep-muted: #6B5A3F;

  position: relative;
  isolation: isolate;
  color: var(--pep-ink);
  font-family: var(--font-sans);
  font-style: normal;
  background: var(--pep-bg-soft);
}

/* Fond de page : base crème + halo doré doux, fixé au viewport */
.pep-bg-base,
.pep-bg-glow,
.pep-bg-sunrise {
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
}
.pep-bg-base { background: var(--pep-bg-soft); }
.pep-bg-glow {
  background-image: radial-gradient(circle at 50% 30%, #FFF991 0%, transparent 70%);
  opacity: 0.6;
  mix-blend-mode: multiply;
}
.pep-bg-sunrise {
  background-image: radial-gradient(circle at 50% 115%, var(--pep-gold), transparent 60%);
  opacity: 0.35;
  mix-blend-mode: multiply;
}
.pepites h1,
.pepites h2,
.pepites h3 {
  font-family: var(--font-display);
  color: var(--pep-ink);
  letter-spacing: -0.01em;
}
.pepites p,
.pepites li,
.pepites label,
.pepites span,
.pepites input,
.pepites textarea,
.pepites select,
.pepites button {
  font-style: normal;
  font-family: var(--font-sans);
}
.pepites a { color: var(--pep-ink); text-decoration: none; }
.pepites a:hover { text-decoration: underline; }
/* L'outline suit le border-radius propre à chaque champ (pilule pour le hero,
   arrondi doux pour le formulaire de contact) : pas d'override global ici. */
.pepites :is(a, button, input, textarea, select):focus-visible {
  outline: 3px solid var(--pep-ink);
  outline-offset: 3px;
}
.pepites :is(input, textarea)::placeholder { color: #7E6A46; opacity: 1; }

/* Bandeau défilant */
.pep-marquee { display: flex; width: max-content; animation: pep-slide 26s linear infinite; }
@keyframes pep-slide { from { transform: translateX(0); } to { transform: translateX(-50%); } }

@media (prefers-reduced-motion: reduce) {
  .pep-marquee { animation: none; }
}
`;

/** Mentions légales PeakCL (page hors de cette landing). */
const LEGAL_URL = "/mentions-legales";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Apparition au scroll : props prêtes à étaler sur n'importe quel motion.*. */
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.55, delay, ease: EASE },
});

/** Mascotte : apparition au scroll, flottement continu, réaction au survol. */
function Mascotte({
  src,
  alt,
  className,
  delay = 0,
  width,
  height,
}: {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
  width: number;
  height: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.span {...reveal(delay * 0.2)} className="inline-block">
      <motion.img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        className={className}
        whileHover={reduce ? undefined : { rotate: [0, -4, 4, 0], scale: 1.06 }}
        animate={reduce ? undefined : { y: [0, -10, 0] }}
        transition={
          reduce
            ? { duration: 0.4 }
            : {
                duration: 4.5,
                delay,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
      />
    </motion.span>
  );
}

type EmailFormProps = {
  id: string;
  buttonLabel: string;
  microCopy: string;
};

function EmailForm({ id, buttonLabel, microCopy }: EmailFormProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const inputId = `pepites-email-${id}`;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    setStatus("sending");
    try {
      await submitNetlifyForm(form);
      setStatus("done");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: EASE }}
        role="status"
        className="flex items-center gap-3 rounded-3xl border-2 border-[var(--pep-ink)] bg-[var(--pep-card)] px-5 py-4 text-base font-bold shadow-[4px_4px_0_var(--pep-ink)]"
      >
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--pep-gold)]">
          <Check className="h-5 w-5 text-[var(--pep-ink)]" />
        </span>
        Merci ! On te tient au courant.
      </motion.div>
    );
  }

  return (
    <form
      name="pepites"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      data-event="pepites_email_submit"
      onSubmit={handleSubmit}
      className="w-full"
    >
      <input type="hidden" name="form-name" value="pepites" />
      <input type="hidden" name="source" value="la_com_des_pepites" />
      <p className="hidden">
        <label>
          Ne pas remplir: <input name="bot-field" tabIndex={-1} />
        </label>
      </p>

      <div className="flex w-full flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <label htmlFor={inputId} className="sr-only">
            Ton adresse email
          </label>
          <input
            id={inputId}
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="ton@email.fr"
            className="w-full rounded-full border-2 border-[var(--pep-ink)] bg-[var(--pep-card)] px-5 py-3.5 text-base font-semibold text-[var(--pep-ink)] outline-none transition-shadow focus:shadow-[4px_4px_0_var(--pep-ink)]"
          />
        </div>
        <motion.button
          type="submit"
          disabled={status === "sending"}
          whileHover={{ y: -2 }}
          whileTap={{ y: 2 }}
          className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full border-2 border-[var(--pep-ink)] bg-[var(--pep-gold)] px-6 py-3.5 text-base font-extrabold text-[var(--pep-ink)] shadow-[4px_4px_0_var(--pep-ink)] transition-colors hover:bg-[var(--pep-gold-deep)] disabled:opacity-60"
        >
          {status === "sending" ? "Envoi en cours…" : buttonLabel}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </motion.button>
      </div>

      {status === "error" && (
        <p role="alert" className="mt-2 text-sm font-bold text-[var(--pep-red)]">
          Oups, l’envoi n’a pas marché. Réessaie dans un instant.
        </p>
      )}

      <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--pep-muted)]">{microCopy}</p>
      <p className="mt-1 max-w-md text-xs leading-relaxed text-[var(--pep-muted)]">
        En laissant ton email, tu acceptes qu’on te recontacte au sujet de La com’ des pépites.
        Désinscription à tout moment.{" "}
        <a
          href={LEGAL_URL}
          className="underline underline-offset-2"
          data-event="pepites_legal_link"
        >
          Mentions légales
        </a>
        .
      </p>
    </form>
  );
}

/** Choix proposé dans le formulaire de contact — miroir de public/netlify-forms.html. */
const BESOINS = [
  "Me former (Pépite Académie)",
  "Déléguer ma com",
  "Je ne sais pas encore",
] as const;

const PEP_FIELD_CLASS =
  "w-full rounded-2xl border-2 border-[var(--pep-ink)] bg-[var(--pep-card)] px-4 py-3 text-base font-semibold text-[var(--pep-ink)] outline-none transition-shadow focus:shadow-[4px_4px_0_var(--pep-ink)]";
const PEP_LABEL_CLASS = "mb-1.5 block text-sm font-extrabold text-[var(--pep-ink)]";

/**
 * Formulaire de contact classique (bas de page).
 * Form Netlify distinct de `pepites` (capture email du hero) : ici on récupère
 * une vraie demande qualifiée, donc les deux ne doivent pas se mélanger dans
 * le dashboard Netlify. Le form jumeau vit dans public/netlify-forms.html,
 * seul fichier scanné au build (le site est en SSR).
 */
function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    setStatus("sending");
    try {
      await submitNetlifyForm(form);
      setStatus("done");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: EASE }}
        role="status"
        className="flex items-center gap-3 rounded-3xl border-2 border-[var(--pep-ink)] bg-[var(--pep-card)] px-5 py-4 text-base font-bold shadow-[4px_4px_0_var(--pep-ink)]"
      >
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--pep-gold)]">
          <Check className="h-5 w-5 text-[var(--pep-ink)]" />
        </span>
        Message reçu ! On te répond très vite.
      </motion.div>
    );
  }

  return (
    <form
      name="pepites-contact"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      data-event="pepites_contact_submit"
      onSubmit={handleSubmit}
      className="w-full text-left"
    >
      <input type="hidden" name="form-name" value="pepites-contact" />
      <input type="hidden" name="source" value="la_com_des_pepites" />
      <input type="hidden" name="leadType" value="pepites_contact" />
      <p className="hidden">
        <label>
          Ne pas remplir: <input name="bot-field" tabIndex={-1} />
        </label>
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="pepites-contact-name" className={PEP_LABEL_CLASS}>
            Prénom et nom
          </label>
          <input
            id="pepites-contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Camille Martin"
            className={PEP_FIELD_CLASS}
          />
        </div>
        <div>
          <label htmlFor="pepites-contact-email" className={PEP_LABEL_CLASS}>
            Email
          </label>
          <input
            id="pepites-contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="ton@email.fr"
            className={PEP_FIELD_CLASS}
          />
        </div>
        <div>
          <label htmlFor="pepites-contact-tel" className={PEP_LABEL_CLASS}>
            Téléphone <span className="font-semibold text-[var(--pep-muted)]">(facultatif)</span>
          </label>
          <input
            id="pepites-contact-tel"
            name="telephone"
            type="tel"
            autoComplete="tel"
            placeholder="06 12 34 56 78"
            className={PEP_FIELD_CLASS}
          />
        </div>
        <div>
          <label htmlFor="pepites-contact-besoin" className={PEP_LABEL_CLASS}>
            Ton besoin
          </label>
          <select
            id="pepites-contact-besoin"
            name="besoin"
            defaultValue={BESOINS[0]}
            className={PEP_FIELD_CLASS}
          >
            {BESOINS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="pepites-contact-message" className={PEP_LABEL_CLASS}>
          Ton message
        </label>
        <textarea
          id="pepites-contact-message"
          name="message"
          required
          rows={4}
          placeholder="Raconte-nous ton activité et ce qui te bloque aujourd’hui."
          className={`${PEP_FIELD_CLASS} resize-y`}
        />
      </div>

      <motion.button
        type="submit"
        disabled={status === "sending"}
        whileHover={{ y: -2 }}
        whileTap={{ y: 2 }}
        className="group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-[var(--pep-ink)] bg-[var(--pep-gold)] px-6 py-3.5 text-base font-extrabold text-[var(--pep-ink)] shadow-[4px_4px_0_var(--pep-ink)] transition-colors hover:bg-[var(--pep-gold-deep)] disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? "Envoi en cours…" : "Envoyer mon message"}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </motion.button>

      {status === "error" && (
        <p role="alert" className="mt-2 text-sm font-bold text-[var(--pep-red)]">
          Oups, l’envoi n’a pas marché. Réessaie dans un instant.
        </p>
      )}

      <p className="mt-3 text-xs leading-relaxed text-[var(--pep-muted)]">
        Tes informations servent uniquement à te recontacter au sujet de La com’ des pépites. Aucune
        revente, désinscription à tout moment.{" "}
        <a
          href={LEGAL_URL}
          className="underline underline-offset-2"
          data-event="pepites_legal_link"
        >
          Mentions légales
        </a>
        .
      </p>
    </form>
  );
}

const VOIES = [
  {
    icon: GraduationCap,
    kicker: "Pépite Académie",
    title: "Tu veux garder la main",
    text: "On t’apprend à exploiter l’IA dans ton entreprise et à gérer tes réseaux toi-même. Tu gagnes du temps, tu restes autonome, à ton rythme.",
    link: "Je veux en savoir plus",
    img: "/pepites/pepita-idee.png",
    imgAlt: "La mascotte pépite a une idée lumineuse",
    imgSize: [395, 432] as const,
  },
  {
    icon: HandHeart,
    kicker: "Gestion",
    title: "Tu préfères déléguer",
    text: "Pas le temps ? On crée ton site et on fait vivre tes réseaux à ta place. Tu te concentres sur ton métier, on s’occupe de ta visibilité.",
    link: "Je veux qu’on m’en parle",
    img: "/pepites/pepita-chill.png",
    imgAlt: "La mascotte pépite se détend tranquillement",
    imgSize: [465, 417] as const,
  },
] as const;

const BENEFICES = [
  { icon: Clock, title: "Gagne des heures chaque semaine" },
  { icon: Wand2, title: "Crée des contenus pro sans être expert" },
  { icon: HandHeart, title: "Reste autonome, avec un filet quand tu bloques" },
] as const;

const PREUVES = [
  {
    title: "L’IA rendue concrète",
    text: "Du temps gagné, pas de la théorie.",
    img: "/pepites/pepita-valide.png",
    imgAlt: "La mascotte pépite valide d’un signe de tête",
    imgSize: [427, 398] as const,
  },
  {
    title: "Apprendre ou déléguer, au choix",
    text: "Tu montes en autonomie, ou tu nous confies tout.",
    img: "/pepites/pepita-reflechit.png",
    imgAlt: "La mascotte pépite réfléchit à son choix",
    imgSize: [460, 440] as const,
  },
  {
    title: "Un seul interlocuteur, 360°",
    text: "IA, réseaux, site, image. Fini de courir après cinq prestataires.",
    img: "/pepites/pepita-pouce.png",
    imgAlt: "La mascotte pépite lève le pouce",
    imgSize: [408, 405] as const,
  },
] as const;

const PROFILS = [
  {
    name: "Charlotte",
    nickname: "Pépita",
    text: "Passionnée d’IA et de création, elle forme les TPE à exploiter l’intelligence artificielle et crée sites et visuels.",
  },
  {
    name: "Guillaume",
    nickname: "Patato",
    text: "Community manager, il forme et accompagne les entrepreneurs pour rayonner sur les réseaux sociaux.",
  },
] as const;

const MARQUEE_ITEMS = [
  "Plus de clients",
  "L’IA qui bosse pour toi",
  "Des réseaux qui tournent",
  "Une image qui inspire confiance",
  "Du temps gagné",
];

function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden border-y-2 border-[var(--pep-ink)] bg-[var(--pep-gold)] py-3"
    >
      <div className="pep-marquee">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-4 whitespace-nowrap px-6 text-base font-extrabold uppercase tracking-[0.12em] text-[var(--pep-ink)]"
          >
            {item}
            <Sparkles className="h-4 w-4" />
          </span>
        ))}
      </div>
    </div>
  );
}

const ELFSIGHT_SRC = "https://elfsightcdn.com/platform.js";
/** Widget Elfsight — Instagram Feed « La com' des pépites ». */
const ELFSIGHT_APP_CLASS = "elfsight-app-b30d514d-5261-4e43-b54e-30d5256f026a";
const PEPITES_INSTAGRAM = "https://www.instagram.com/comdespepites/";

/**
 * Feed Instagram du compte La com' des pépites.
 * platform.js scanne le DOM et hydrate le div `.elfsight-app-<id>`.
 * Le script n'est injecté qu'une fois (idempotent), côté client uniquement.
 * Compte tout neuf : la section est cadrée « on démarre », pas « regarde nos
 * milliers d'abonnés » — elle vit donc bas de page, avant le CTA final.
 */
function InstagramSection() {
  useEffect(() => {
    if (document.querySelector(`script[src="${ELFSIGHT_SRC}"]`)) return;
    const s = document.createElement("script");
    s.src = ELFSIGHT_SRC;
    s.async = true;
    document.body.appendChild(s);
  }, []);

  return (
    <section id="instagram" className="px-5 py-16 sm:px-8 md:py-24">
      <div className="mx-auto w-full max-w-4xl">
        <div className="flex flex-col items-center text-center">
          <Mascotte
            src="/pepites/pepita-pouce.png"
            alt="La mascotte pépite lève le pouce"
            className="w-24 sm:w-28"
            width={408}
            height={405}
            delay={0.3}
          />
          <motion.span
            {...reveal()}
            className="mt-4 inline-flex items-center gap-2 rounded-full border-2 border-[var(--pep-ink)] bg-[var(--pep-card)] px-4 py-1.5 text-sm font-extrabold shadow-[3px_3px_0_var(--pep-ink)]"
          >
            <Instagram className="h-4 w-4 text-[var(--pep-gold-deep)]" />
            Instagram
          </motion.span>
          <motion.h2 {...reveal()} className="mt-4 text-3xl font-extrabold sm:text-4xl">
            On démarre, viens voir la suite
          </motion.h2>
          <motion.p {...reveal()} className="mt-4 max-w-2xl text-lg leading-relaxed">
            Le compte vient d’ouvrir. Conseils IA, coulisses et astuces com’ y arrivent au fil des
            semaines : abonne-toi, tu verras tout naître en direct.
          </motion.p>
        </div>

        <motion.div
          {...reveal(0.1)}
          className="mt-10 overflow-hidden rounded-[2rem] border-2 border-[var(--pep-ink)] bg-[var(--pep-card)] p-4 shadow-[8px_8px_0_var(--pep-ink)] sm:p-6"
        >
          <div className={ELFSIGHT_APP_CLASS} data-elfsight-app-lazy />
        </motion.div>

        <motion.div {...reveal(0.15)} className="mt-8 text-center">
          <motion.a
            href={PEPITES_INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            data-event="pepites_instagram_follow"
            whileHover={{ y: -2 }}
            whileTap={{ y: 1 }}
            className="group inline-flex items-center gap-2 rounded-full border-2 border-[var(--pep-ink)] bg-[var(--pep-gold)] px-6 py-3 text-base font-extrabold text-[var(--pep-ink)] shadow-[4px_4px_0_var(--pep-ink)] transition-colors hover:bg-[var(--pep-gold-deep)]"
          >
            <Instagram className="h-4 w-4" />
            Suivre @comdespepites
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

function PepitesPage() {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 70]);

  return (
    <main className="pepites relative min-h-screen overflow-hidden">
      <style>{PEPITES_CSS}</style>

      {/* Fond : crème + halo doré (soft yellow glow / sunrise glow) */}
      <div className="pep-bg-base" aria-hidden="true" />
      <div className="pep-bg-glow" aria-hidden="true" />
      <div className="pep-bg-sunrise" aria-hidden="true" />

      {/* Header propre à la marque (le chrome PeakCL est masqué sur cette page) */}
      <header className="sticky top-0 z-50 border-b-2 border-[var(--pep-ink)] bg-[var(--pep-card)]/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-2.5 sm:px-8">
          <a
            href="#top"
            aria-label="La com’ des pépites, haut de page"
            className="flex items-center"
          >
            <img
              src="/pepites/logo-horizontal.png"
              alt="La com’ des pépites"
              className="h-11 w-auto sm:h-14"
              width={1000}
              height={562}
            />
          </a>
          <motion.a
            href="#rejoindre"
            data-event="pepites_nav_cta"
            whileHover={{ y: -2 }}
            whileTap={{ y: 1 }}
            className="inline-flex shrink-0 items-center rounded-full border-2 border-[var(--pep-ink)] bg-[var(--pep-gold)] px-4 py-2 text-sm font-extrabold text-[var(--pep-ink)] shadow-[3px_3px_0_var(--pep-ink)] transition-colors hover:bg-[var(--pep-gold-deep)] sm:px-5"
          >
            Rejoindre les pépites
          </motion.a>
        </div>
      </header>

      {/* 1) HERO */}
      <section
        id="top"
        ref={heroRef}
        className="relative px-5 pb-16 pt-12 sm:px-8 md:pb-24 md:pt-20"
      >
        <motion.div
          style={{ y: heroY }}
          className="mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-[1.05fr_0.95fr] md:gap-14"
        >
          <div className="relative z-10">
            <motion.span
              {...reveal()}
              className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--pep-ink)] bg-[var(--pep-card)] px-4 py-1.5 text-sm font-extrabold shadow-[3px_3px_0_var(--pep-ink)]"
            >
              <motion.span
                animate={reduce ? undefined : { rotate: [0, 18, -18, 0], scale: [1, 1.15, 1] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="inline-flex"
              >
                <Sparkles className="h-4 w-4 text-[var(--pep-gold-deep)]" />
              </motion.span>
              La com’ des pépites
            </motion.span>

            <motion.h1
              {...reveal()}
              className="mt-5 text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-[3.75rem]"
            >
              Maîtrise ta com à{" "}
              <span className="relative inline-block">
                <span className="relative z-10">360°.</span>
                <motion.span
                  aria-hidden="true"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
                  className="absolute -bottom-1 left-0 z-0 h-2.5 w-full origin-left rounded-full bg-[var(--pep-gold)]"
                />
              </span>
            </motion.h1>

            <motion.p {...reveal()} className="mt-5 max-w-xl text-lg leading-relaxed">
              Plus de clients, une image qui inspire confiance, et enfin l’IA qui bosse pour toi. On
              te forme pour devenir autonome, ou on s’en occupe à ta place.
            </motion.p>

            <motion.div {...reveal(0.25)} className="mt-8 max-w-xl">
              <EmailForm
                id="hero"
                buttonLabel="Je veux devenir une pépite"
                microCopy="Laisse ton email pour être prévenu·e dès l’ouverture des places. Pas de spam."
              />
            </motion.div>
          </div>

          <div className="relative order-first flex justify-center md:order-none">
            <Mascotte
              src="/pepites/logo-avatar.png"
              alt="La mascotte de La com’ des pépites, une pépite d’or qui parle dans un mégaphone"
              className="w-56 drop-shadow-[8px_10px_0_rgba(30,25,19,0.10)] sm:w-72 md:w-full md:max-w-[420px]"
              width={494}
              height={383}
            />
          </div>
        </motion.div>
      </section>

      <Marquee />

      {/* 2) DEUX FAÇONS D'AVANCER */}
      <section className="px-5 py-16 sm:px-8 md:py-24">
        <motion.div className="mx-auto w-full max-w-6xl">
          <motion.h2 {...reveal()} className="text-3xl font-extrabold sm:text-4xl">
            Deux façons d’avancer
          </motion.h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {VOIES.map((card) => (
              <motion.article
                key={card.title}
                {...reveal()}
                whileHover={reduce ? undefined : { y: -6, rotate: -0.4 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                className="relative flex flex-col overflow-hidden rounded-[2rem] border-2 border-[var(--pep-ink)] bg-[var(--pep-card)] p-6 shadow-[8px_8px_0_var(--pep-ink)] sm:p-8"
              >
                <img
                  src={card.img}
                  alt={card.imgAlt}
                  width={card.imgSize[0]}
                  height={card.imgSize[1]}
                  loading="lazy"
                  className="pointer-events-none absolute right-3 top-3 w-20 rotate-6 opacity-95 sm:w-24"
                />
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-[var(--pep-ink)] bg-[var(--pep-gold)]">
                  <card.icon className="h-6 w-6 text-[var(--pep-ink)]" />
                </span>
                <p className="mt-4 text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--pep-muted)]">
                  {card.kicker}
                </p>
                <h3 className="mt-1 max-w-[16ch] text-2xl font-extrabold">{card.title}</h3>
                <p className="mt-3 flex-1 text-base leading-relaxed">{card.text}</p>
                <a
                  href="#rejoindre"
                  data-event="pepites_card_anchor"
                  className="group mt-6 inline-flex items-center gap-2 text-base font-extrabold text-[var(--pep-gold-link)] underline underline-offset-4"
                >
                  {card.link}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 3) L'IA CONCRETE */}
      <section className="relative px-5 py-16 sm:px-8 md:py-24">
        <motion.div className="mx-auto w-full max-w-6xl rounded-[2.5rem] border-2 border-[var(--pep-ink)] bg-[var(--pep-card)] p-6 shadow-[10px_10px_0_var(--pep-ink)] sm:p-10">
          <div className="grid items-center gap-10 md:grid-cols-[0.75fr_1.25fr]">
            <div className="flex justify-center">
              <Mascotte
                src="/pepites/pepita-surprise.png"
                alt="La mascotte pépite, surprise de voir tout ce que l’IA fait gagner"
                className="w-40 sm:w-52 md:w-full md:max-w-[240px]"
                width={492}
                height={445}
                delay={0.4}
              />
            </div>

            <div>
              <motion.h2 {...reveal()} className="text-3xl font-extrabold sm:text-4xl">
                L’IA, enfin concrète pour ta TPE
              </motion.h2>
              <motion.p {...reveal()} className="mt-4 max-w-2xl text-lg leading-relaxed">
                Pas de blabla, pas de théorie. Des usages simples qui te font gagner des heures dès
                la première semaine : rédiger tes contenus, créer tes visuels, t’organiser. Et si tu
                veux animer tes réseaux toi-même, on te forme aussi.
              </motion.p>

              <ul className="mt-8 grid gap-3">
                {BENEFICES.map((b) => (
                  <motion.li
                    key={b.title}
                    {...reveal()}
                    whileHover={reduce ? undefined : { x: 6 }}
                    className="flex items-center gap-3 rounded-2xl border-2 border-[var(--pep-ink)] bg-[var(--pep-bg-soft)] px-4 py-3"
                  >
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--pep-gold)]">
                      <b.icon className="h-4 w-4 text-[var(--pep-ink)]" />
                    </span>
                    <span className="text-base font-bold">{b.title}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 4) GESTION */}
      <section className="px-5 py-16 sm:px-8 md:py-24">
        <motion.div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
          <div>
            <Mascotte
              src="/pepites/pepita-help.png"
              alt="La mascotte pépite tend la main pour aider"
              className="w-32 sm:w-40"
              width={488}
              height={401}
              delay={0.2}
            />
          </div>
          <motion.h2 {...reveal()} className="mt-4 text-3xl font-extrabold sm:text-4xl">
            Pas le temps ? On prend le relais
          </motion.h2>
          <motion.p {...reveal()} className="mt-4 max-w-2xl text-lg leading-relaxed">
            On crée ton site, on soigne ta fiche Google et on fait vivre tes réseaux avec des
            contenus réguliers à ton image. Résultat : une présence pro qui tourne pendant que tu
            bosses.
          </motion.p>
          <motion.a
            {...reveal()}
            href="#rejoindre"
            data-event="pepites_gestion_anchor"
            whileHover={{ y: -2 }}
            whileTap={{ y: 1 }}
            className="group mt-7 inline-flex items-center gap-2 rounded-full border-2 border-[var(--pep-ink)] bg-[var(--pep-card)] px-6 py-3 text-base font-extrabold shadow-[4px_4px_0_var(--pep-ink)]"
          >
            Parle-nous de ton projet
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </motion.a>
        </motion.div>
      </section>

      {/* 5) POURQUOI */}
      <section className="px-5 py-16 sm:px-8 md:py-24">
        <motion.div className="mx-auto w-full max-w-6xl">
          <motion.h2 {...reveal()} className="text-3xl font-extrabold sm:text-4xl">
            Pourquoi La com’ des pépites
          </motion.h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {PREUVES.map((p, i) => (
              <motion.article
                key={p.title}
                {...reveal()}
                whileHover={reduce ? undefined : { y: -6 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                className="flex flex-col items-start rounded-[2rem] border-2 border-[var(--pep-ink)] bg-[var(--pep-card)] p-6 shadow-[8px_8px_0_var(--pep-ink)]"
              >
                <img
                  src={p.img}
                  alt={p.imgAlt}
                  width={p.imgSize[0]}
                  height={p.imgSize[1]}
                  loading="lazy"
                  className="mx-auto w-28 sm:w-32"
                />
                <span className="mt-4 inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-[var(--pep-ink)] bg-[var(--pep-gold)] text-sm font-extrabold">
                  {i + 1}
                </span>
                <h3 className="mt-3 text-xl font-extrabold">{p.title}</h3>
                <p className="mt-2 text-base leading-relaxed">{p.text}</p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>

      <Marquee />

      {/* 6) QUI SOMMES-NOUS */}
      <section className="px-5 py-16 sm:px-8 md:py-24">
        <motion.div className="mx-auto w-full max-w-4xl">
          <motion.h2 {...reveal()} className="text-3xl font-extrabold sm:text-4xl">
            Qui sommes-nous
          </motion.h2>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {PROFILS.map((p) => (
              <motion.article
                key={p.name}
                {...reveal()}
                whileHover={reduce ? undefined : { y: -4 }}
                className="rounded-[2rem] border-2 border-[var(--pep-ink)] bg-[var(--pep-card)] p-6 shadow-[6px_6px_0_var(--pep-ink)]"
              >
                <h3 className="text-xl font-extrabold">{p.name}</h3>
                <p className="mt-0.5 text-xs italic text-[var(--pep-muted)]">{p.nickname}</p>
                <p className="mt-2 text-base leading-relaxed">{p.text}</p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 7) INSTAGRAM */}
      <InstagramSection />

      {/* 8) CTA FINAL */}
      <section id="rejoindre" className="scroll-mt-24 px-5 pb-16 pt-16 sm:px-8 md:pb-24 md:pt-24">
        <motion.div className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-[2.5rem] border-2 border-[var(--pep-ink)] bg-[var(--pep-card)] p-6 text-center shadow-[10px_10px_0_var(--pep-ink)] sm:p-10">
          <div className="flex justify-center">
            <Mascotte
              src="/pepites/mascotte.png"
              alt="La mascotte pépite fait la fête avec des confettis"
              className="w-28 sm:w-40"
              width={439}
              height={454}
            />
          </div>

          <motion.h2 {...reveal()} className="mt-4 text-3xl font-extrabold sm:text-4xl">
            Prêt·e à devenir une pépite ?
          </motion.h2>
          <motion.p {...reveal()} className="mx-auto mt-4 max-w-xl text-lg leading-relaxed">
            Dis-nous où tu en es : on te répond avec des pistes concrètes, sans jargon ni
            engagement.
          </motion.p>

          <motion.div {...reveal()} className="mx-auto mt-8 max-w-xl">
            <ContactForm />
          </motion.div>
        </motion.div>
      </section>

      {/* Pied de page propre à la marque */}
      <footer className="border-t-2 border-[var(--pep-ink)] px-5 py-8 sm:px-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-3 text-center">
          <img
            src="/pepites/logo-horizontal.png"
            alt="La com’ des pépites"
            className="h-10 w-auto"
            width={1000}
            height={562}
            loading="lazy"
          />
          <p className="text-sm text-[var(--pep-muted)]">
            La com’ des pépites, une collaboration Charlotte × Guillaume.
          </p>
          <p className="text-xs text-[var(--pep-muted)]">
            <a
              href={LEGAL_URL}
              className="underline underline-offset-2"
              data-event="pepites_legal_link_footer"
            >
              Mentions légales
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
}
