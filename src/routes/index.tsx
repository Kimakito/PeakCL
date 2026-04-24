import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Globe,
  Palette,
  Sparkles,
  Image as ImageIcon,
  Megaphone,
  Rocket,
  Star,
  Zap,
  Clock,
  Target,
  ShieldCheck,
} from "lucide-react";
import logo from "@/assets/peakcl-logo.png";
import { peakclTestimonials } from "@/content/peakcl/testimonials";
import { peakclFaq } from "@/content/peakcl/faq";
import { peakclPortfolio } from "@/content/peakcl/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PeakCL — Le site web qui transforme vos visiteurs en clients" },
      {
        name: "description",
        content:
          "Création & refonte de sites web haut de gamme pour entrepreneurs, coachs et consultants. Plus de prospects, plus de clients, plus de crédibilité.",
      },
      { property: "og:title", content: "PeakCL — Sites web qui convertissent" },
      {
        property: "og:description",
        content:
          "Site, logo, identité visuelle et contenus pour propulser votre activité.",
      },
    ],
  }),
  component: Landing,
});

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

function CTAButton({
  children,
  href = "#contact",
  variant = "primary",
  className = "",
}: {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300";
  const styles =
    variant === "primary"
      ? "bg-primary-gradient text-primary-foreground shadow-glow hover:scale-[1.03] hover:shadow-[0_25px_70px_-20px_color-mix(in_oklab,var(--brand-violet)_70%,transparent)]"
      : "border border-border bg-card/40 text-foreground backdrop-blur hover:bg-card/70";
  return (
    <a href={href} className={`${base} ${styles} ${className}`}>
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </a>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-3">
          <img src={logo} alt="PeakCL logo" className="h-9 w-9 rounded-lg object-cover" />
          <span className="font-display text-lg font-bold tracking-tight">
            Peak<span className="text-gradient">CL</span>
          </span>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#services" className="hover:text-foreground">Services</a>
          <a href="#process" className="hover:text-foreground">Méthode</a>
          <a href="/portfolio" className="hover:text-foreground">Portfolio</a>
          <a href="#resultats" className="hover:text-foreground">Résultats</a>
          <a href="#faq" className="hover:text-foreground">FAQ</a>
        </nav>
        <CTAButton href="#contact" className="!px-5 !py-2 text-xs">
          Réserver un appel
        </CTAButton>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-hero pt-20 pb-28 md:pt-28 md:pb-36">
      <div className="grid-bg absolute inset-0 -z-10" />
      <div className="mx-auto max-w-7xl px-6 text-center">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-muted-foreground"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--brand-turquoise)]" />
          Studio créatif & conversion · France · Belgique · Suisse · Canada
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ delay: 0.05 }}
          className="mx-auto mt-6 max-w-4xl text-balance text-5xl font-bold leading-[1.05] md:text-7xl"
        >
          Un site web qui vous apporte <span className="text-gradient">des clients</span>,
          pas juste des visites.
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ delay: 0.1 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl"
        >
          Pour entrepreneurs, coachs et consultants qui veulent enfin une présence en
          ligne <span className="text-foreground">crédible, premium</span> et conçue pour convertir.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ delay: 0.15 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <CTAButton href="#contact">Réserver un appel gratuit</CTAButton>
          <CTAButton href="#resultats" variant="ghost">Voir les résultats</CTAButton>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ delay: 0.25 }}
          className="mx-auto mt-14 grid max-w-3xl grid-cols-3 gap-6 border-t border-white/5 pt-8 text-center"
        >
          {[
            { k: "+120", v: "projets livrés" },
            { k: "14j", v: "délai moyen" },
            { k: "4.9/5", v: "satisfaction client" },
          ].map((s) => (
            <div key={s.v}>
              <div className="font-display text-2xl font-bold text-foreground md:text-3xl">{s.k}</div>
              <div className="mt-1 text-xs text-muted-foreground md:text-sm">{s.v}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Problem() {
  const pains = [
    "Votre site ne génère aucun client (ou très peu).",
    "Vous l'avez créé seul·e — il vous ressemble peu et inspire peu confiance.",
    "Vous perdez des heures sur WordPress sans résultat concret.",
    "Vos prospects ne comprennent pas, en 5 secondes, ce que vous proposez.",
  ];
  return (
    <section className="border-t border-white/5 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-start gap-12 md:grid-cols-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-turquoise)]">
              Le vrai problème
            </span>
            <h2 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
              Votre offre est solide.
              <br />
              <span className="text-muted-foreground">Votre site, lui, ne suit pas.</span>
            </h2>
            <p className="mt-6 max-w-md text-muted-foreground">
              Vous travaillez dur, vous créez du contenu, vous attirez du trafic… mais à la
              fin, ce sont toujours les mêmes prospects qui hésitent et ne passent jamais à l'action.
            </p>
          </div>

          <ul className="space-y-4">
            {pains.map((p) => (
              <li
                key={p}
                className="flex items-start gap-3 rounded-2xl border border-white/5 bg-card/40 p-5 shadow-card backdrop-blur"
              >
                <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--brand-violet)_25%,transparent)] text-[var(--brand-yellow)]">
                  ✕
                </span>
                <span className="text-sm text-foreground/90">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

const services = [
  {
    icon: Globe,
    title: "Création & refonte de site web",
    desc: "Un site rapide, élégant et structuré pour transformer vos visiteurs en clients qualifiés.",
  },
  {
    icon: Palette,
    title: "Création de logo & identité",
    desc: "Une marque cohérente et mémorable qui inspire confiance dès le premier regard.",
  },
  {
    icon: ImageIcon,
    title: "Design pour vos contenus",
    desc: "Visuels premium pour vos posts, carrousels et stories — toujours dans votre univers.",
  },
  {
    icon: Megaphone,
    title: "Pages pro réseaux sociaux",
    desc: "Google Business, LinkedIn, Instagram… des profils optimisés pour être trouvé et choisi.",
  },
  {
    icon: Rocket,
    title: "Lancement de votre présence",
    desc: "Premiers posts, ligne éditoriale et structure pour partir avec une vraie traction.",
  },
  {
    icon: Sparkles,
    title: "Stratégie de conversion",
    desc: "Chaque pixel, chaque mot, chaque CTA pensé pour générer des prospects, pas du décor.",
  },
];

function Services() {
  return (
    <section id="services" className="border-t border-white/5 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-turquoise)]">
            Ce que je crée pour vous
          </span>
          <h2 className="mt-4 text-4xl font-bold md:text-5xl">
            Une présence en ligne <span className="text-gradient">qui travaille pour vous</span>.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Des prestations pensées pour un seul objectif : plus de prospects, plus de
            clients, plus de revenus.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              transition={{ delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-card/50 p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-white/15"
            >
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[color-mix(in_oklab,var(--brand-violet)_30%,transparent)] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[color-mix(in_oklab,var(--brand-violet)_25%,transparent)] text-[var(--brand-turquoise)]">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PortfolioTeaser() {
  const featured = peakclPortfolio.slice(0, 6);
  return (
    <section className="border-t border-white/5 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-turquoise)]">
            Réalisations
          </span>
          <h2 className="mt-4 text-4xl font-bold md:text-5xl">
            Des projets livrés, <span className="text-gradient">qui convertissent</span>.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Quelques exemples de sites créés pour des entrepreneurs, artisans et entreprises locales.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <motion.a
              key={p.siteUrl}
              href={p.siteUrl}
              target="_blank"
              rel="noreferrer"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ delay: i * 0.06 }}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-card/50 p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-white/15"
            >
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[color-mix(in_oklab,var(--brand-violet)_30%,transparent)] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative">
                <div className="flex items-start gap-4">
                  {p.logoUrl ? (
                    <img
                      src={p.logoUrl}
                      alt={p.title}
                      className="h-12 w-12 rounded-xl bg-white/5 object-contain p-2"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-xl bg-white/5" />
                  )}
                  <div className="min-w-0">
                    <div className="text-base font-semibold">{p.title}</div>
                    {p.subtitle ? (
                      <div className="mt-1 text-xs text-muted-foreground">{p.subtitle}</div>
                    ) : null}
                  </div>
                </div>

                {p.tags.length ? (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.tags.slice(0, 3).map((t) => (
                      <span
                        key={`${p.siteUrl}-${t}`}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}

                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-turquoise)]">
                  Voir le projet <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-10 text-center">
          <CTAButton href="/portfolio" variant="ghost">
            Voir tout le portfolio
          </CTAButton>
        </div>
      </div>
    </section>
  );
}

function Social() {
  return (
    <section id="resultats" className="border-t border-white/5 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-turquoise)]">
            Ils en parlent mieux que moi
          </span>
          <h2 className="mt-4 text-4xl font-bold md:text-5xl">Des résultats, pas des promesses.</h2>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {peakclTestimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-white/5 bg-card/50 p-6 shadow-card"
            >
              <div className="flex gap-1 text-[var(--brand-yellow)]">
                {Array.from({ length: t.rating }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground/90">"{t.quote}"</p>
              <div className="mt-6 border-t border-white/5 pt-4">
                <div className="text-sm font-semibold">{t.name}</div>
                <div className="text-xs text-muted-foreground">
                  {[t.sourceLabel, t.dateLabel].filter(Boolean).join(" · ")}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const why = [
  {
    icon: Target,
    title: "Stratégie avant design",
    desc: "On ne fait pas du joli pour faire joli. Chaque section sert un objectif business mesurable.",
  },
  {
    icon: Zap,
    title: "Livraison rapide",
    desc: "Site complet livré en 14 jours en moyenne. Pas de mois d'attente, pas d'excuses.",
  },
  {
    icon: ShieldCheck,
    title: "Image premium garantie",
    desc: "Un design qui vous positionne comme l'expert haut de gamme que vous êtes vraiment.",
  },
  {
    icon: Clock,
    title: "Vous gardez votre temps",
    desc: "Vous me confiez le sujet, je m'occupe de tout. Vous validez, on lance, ça vit.",
  },
];

function Why() {
  return (
    <section id="process" className="border-t border-white/5 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-turquoise)]">
              Pourquoi PeakCL
            </span>
            <h2 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
              Vous n'avez pas besoin d'un autre site.
              <br />
              <span className="text-gradient">Vous avez besoin du bon.</span>
            </h2>
            <p className="mt-6 max-w-md text-muted-foreground">
              Construit avec vous, pour votre client idéal, avec une vraie structure
              de conversion. Pas un template recyclé.
            </p>
            <div className="mt-8">
              <CTAButton href="#contact">Discutons de votre projet</CTAButton>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {why.map((w) => (
              <div
                key={w.title}
                className="rounded-2xl border border-white/5 bg-card/50 p-5 shadow-card"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[color-mix(in_oklab,var(--brand-yellow)_18%,transparent)] text-[var(--brand-yellow)]">
                  <w.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold">{w.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section id="faq" className="border-t border-white/5 py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-turquoise)]">
            Questions fréquentes
          </span>
          <h2 className="mt-4 text-4xl font-bold md:text-5xl">On lève les derniers doutes.</h2>
        </div>
        <div className="mt-12 space-y-3">
          {peakclFaq.map((f) => (
            <details
              key={f.question}
              className="group rounded-2xl border border-white/5 bg-card/50 p-5 shadow-card open:bg-card/70"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-semibold">
                {f.question}
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 text-[var(--brand-turquoise)] transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p
                className="mt-3 text-sm leading-relaxed text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: f.answerHtml }}
              />
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-white/5 py-28"
    >
      <div className="absolute inset-0 -z-10 bg-hero" />
      <div className="grid-bg absolute inset-0 -z-10" />

      <div className="mx-auto max-w-4xl px-6 text-center">
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-balance text-4xl font-bold leading-tight md:text-6xl"
        >
          Prêt·e à avoir un site qui <span className="text-gradient">vend pour vous</span> ?
        </motion.h2>
        <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
          20 minutes d'appel offert. On clarifie votre objectif, votre client idéal,
          et la stratégie pour passer à l'étape supérieure. Aucun engagement.
        </p>

        <form
          className="mx-auto mt-10 max-w-xl space-y-4 rounded-2xl border border-white/10 bg-card/40 p-6 text-left shadow-card backdrop-blur"
          name="contact"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
        >
          <input type="hidden" name="form-name" value="contact" />
          <p className="hidden">
            <label>
              Ne pas remplir: <input name="bot-field" />
            </label>
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="text-xs font-semibold text-muted-foreground">Nom</span>
              <input
                name="name"
                required
                className="mt-2 w-full rounded-md border border-white/10 bg-background/50 px-4 py-3 text-sm text-foreground outline-none ring-0 focus:border-white/20"
                placeholder="Votre nom"
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-muted-foreground">Email</span>
              <input
                name="email"
                type="email"
                required
                className="mt-2 w-full rounded-md border border-white/10 bg-background/50 px-4 py-3 text-sm text-foreground outline-none ring-0 focus:border-white/20"
                placeholder="vous@exemple.com"
              />
            </label>
          </div>

          <label className="block">
            <span className="text-xs font-semibold text-muted-foreground">Message</span>
            <textarea
              name="message"
              required
              rows={5}
              className="mt-2 w-full rounded-md border border-white/10 bg-background/50 px-4 py-3 text-sm text-foreground outline-none ring-0 focus:border-white/20"
              placeholder="Décrivez votre activité et ce que vous voulez obtenir."
            />
          </label>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="submit"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-all duration-300 hover:scale-[1.03]"
            >
              Envoyer
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <CTAButton href="mailto:peakcl73@gmail.com" variant="ghost">
              Ou écrire à peakcl73@gmail.com
            </CTAButton>
          </div>
        </form>

        <ul className="mx-auto mt-10 flex max-w-xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
          {[
            "Devis sous 24h",
            "Sans engagement",
            "Livraison en 14 jours",
            "Satisfait ou ajusté",
          ].map((x) => (
            <li key={x} className="inline-flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-[var(--brand-turquoise)]" />
              {x}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground md:flex-row">
        <div className="flex items-center gap-3">
          <img src={logo} alt="PeakCL" className="h-7 w-7 rounded-md object-cover" />
          <span>© {new Date().getFullYear()} PeakCL — Charlotte Lacroix</span>
        </div>
        <div className="flex gap-6">
          <a href="#services" className="hover:text-foreground">Services</a>
          <a href="/portfolio" className="hover:text-foreground">Portfolio</a>
          <a href="#contact" className="hover:text-foreground">Contact</a>
        </div>
      </div>
    </footer>
  );
}

function Landing() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Services />
        <PortfolioTeaser />
        <Social />
        <Why />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
