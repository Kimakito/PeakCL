import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import logo from "@/assets/peakcl-logo.png";
import { absUrl } from "@/seo/site";

export const Route = createFileRoute("/packs")({
  head: () => ({
    meta: [
      { title: "Les packs — PeakCL" },
      {
        name: "description",
        content:
          "Les 4 offres PeakCL, en détail. Site vitrine codé, site sur‑mesure, identité visuelle, pack présence en ligne.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/packs") },
    ],
    links: [{ rel: "canonical", href: absUrl("/packs") }],
  }),
  component: PacksPage,
});

const CALENDLY_URL = "https://calendly.com/peakcl73/45min";

const packs = [
  {
    title: "Pack site vitrine codé",
    forWho:
      "Pour qui : tu as une activité claire. Tu veux un site rapide, sobre, qui charge en moins de 2 secondes.",
    price: "Sur devis",
    delay: "Délai indicatif : à confirmer selon périmètre et disponibilité.",
    included: [
      "1 à 5 pages",
      "Code propre (HTML/CSS/Tailwind/JS), responsive",
      "Contenus rédigés inclus",
      "Mise en ligne (domaine, SSL, indexation)",
      "Bases SEO (structure, titres)",
    ],
    notIncluded: [
      "Maintenance mensuelle",
      "Hébergement et email pro (choix et abonnement)",
      "Photos pro (si besoin)",
    ],
  },
  {
    title: "Pack site sur‑mesure",
    forWho:
      "Pour qui : tu as un besoin spécifique — espace membre, calculateur, intégration outil, formulaire avancé.",
    price: "Sur devis",
    delay: "Délai indicatif : à confirmer selon fonctionnalités.",
    included: [
      "Développement custom",
      "Fonctionnalités définies au cadrage",
      "Devis précis après cadrage",
    ],
    notIncluded: [
      "Maintenance mensuelle",
      "Hébergement et email pro (choix et abonnement)",
      "Contenu photo pro (si besoin)",
    ],
  },
  {
    title: "Pack identité visuelle",
    forWho: "Pour qui : tu démarres ou tu veux rafraîchir ton image.",
    price: "Sur devis",
    delay: "Délai indicatif : à confirmer selon déclinaisons.",
    included: [
      "Logo",
      "Version monochrome",
      "Déclinaisons (favicon, photo de profil)",
      "Charte simple (couleurs, typo)",
    ],
    notIncluded: [
      "Kit complet print",
      "Naming / recherche de nom",
      "Shooting photo",
    ],
  },
  {
    title: "Pack présence en ligne (combo)",
    highlight: true,
    forWho: "Pour qui : tu veux tout en une fois, sans rien coordonner.",
    price: "Sur devis",
    delay: "Délai indicatif : à confirmer selon périmètre et contenus.",
    included: [
      "Site vitrine + logo",
      "Mise en place LinkedIn, Instagram, Facebook, Google Business Profile",
      "Bases SEO + mise en ligne",
    ],
    notIncluded: [
      "Gestion mensuelle des publications (option)",
      "Budget pub",
      "Création de contenu photo/vidéo (si besoin)",
    ],
  },
];

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-3">
          <img src={logo} alt="PeakCL logo" className="h-9 w-9 rounded-lg object-cover" />
          <span className="font-display text-lg font-bold tracking-tight">
            Peak<span className="text-gradient">CL</span>
          </span>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="/#method" className="hover:text-foreground">
            Méthode
          </a>
          <a href="/packs" className="hover:text-foreground">
            Offres
          </a>
          <a href="/portfolio" className="hover:text-foreground">
            Portfolio
          </a>
          <a href="/#faq" className="hover:text-foreground">
            FAQ
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="/brief"
            data-event="cta_brief_packs_header"
            className="hidden rounded-full border border-white/10 bg-card/40 px-4 py-2 text-xs font-semibold text-foreground backdrop-blur hover:border-white/20 md:inline-flex"
          >
            Remplir le brief
          </a>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-event="cta_calendly_packs_header"
            className="inline-flex items-center justify-center rounded-full bg-primary-gradient px-5 py-2 text-xs font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
          >
            Réserver un appel
          </a>
        </div>
      </div>
    </header>
  );
}

function PacksPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="border-t border-white/5">
        <section className="relative overflow-hidden bg-hero py-20">
          <div className="grid-bg absolute inset-0 -z-10" />
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h1 className="text-balance text-4xl font-bold leading-tight md:text-6xl">Les 4 packs en détail.</h1>
            <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
              Si tu sais déjà ce que tu cherches, voici les 4 packs avec ce qui est inclus, ce qui ne l’est pas, et le
              délai indicatif. Sinon, le diagnostic en quelques minutes te dira lequel est adapté.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="/brief"
                data-event="cta_brief_packs_hero"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-all duration-300 hover:scale-[1.02]"
              >
                Faire le diagnostic <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-event="cta_calendly_packs_hero"
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-foreground hover:border-white/20"
              >
                Réserver 20 min en visio
              </a>
            </div>
          </div>
        </section>

        <section className="border-t border-white/5 py-16">
          <div className="mx-auto max-w-5xl px-6">
            <div className="space-y-6">
              {packs.map((p) => (
                <section
                  key={p.title}
                  className={`rounded-2xl border bg-card/50 p-7 shadow-card ${
                    p.highlight
                      ? "border-[color-mix(in_oklab,var(--brand-turquoise)_30%,transparent)] ring-1 ring-[color-mix(in_oklab,var(--brand-turquoise)_22%,transparent)]"
                      : "border-white/5"
                  }`}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h2 className="text-2xl font-bold">{p.title}</h2>
                    <div className={`text-sm font-semibold ${p.highlight ? "text-[var(--brand-turquoise)]" : "text-muted-foreground"}`}>
                      {p.price}
                    </div>
                  </div>

                  <p className="mt-3 text-sm text-muted-foreground">{p.forWho}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{p.delay}</p>

                  <div className="mt-6 grid gap-5 md:grid-cols-2">
                    <div className="rounded-xl border border-white/5 bg-background/40 p-5">
                      <div className="text-sm font-semibold">Ce qui est inclus</div>
                      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                        {p.included.map((x) => (
                          <li key={x} className="flex items-start gap-3">
                            <Check className="mt-0.5 h-4 w-4 text-[var(--brand-turquoise)]" />
                            <span>{x}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-xl border border-white/5 bg-background/40 p-5">
                      <div className="text-sm font-semibold">Ce qui n’est pas inclus</div>
                      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                        {p.notIncluded.map((x) => (
                          <li key={x}>{x}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6">
                    <a
                      href="/brief"
                      data-event="cta_brief_pack"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-turquoise)] hover:text-foreground"
                    >
                      Demander un devis pour ce pack <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-12 rounded-2xl border border-white/10 bg-card/40 p-7 text-center shadow-card backdrop-blur">
              <h2 className="text-3xl font-bold md:text-4xl">On commence quand ?</h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Le plus simple : tu remplis le diagnostic. C’est quelques minutes, et tu auras un devis sous 48h ouvrées.
                Si tu préfères en parler de vive voix, tu peux aussi réserver 20 minutes en visio.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="/brief"
                  data-event="cta_brief_packs_final"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-all duration-300 hover:scale-[1.02]"
                >
                  Faire le diagnostic <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-event="cta_calendly_packs_final"
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-foreground hover:border-white/20"
                >
                  Réserver 20 min en visio
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

