import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import logo from "@/assets/peakcl-logo.png";
import { absUrl } from "@/seo/site";

export const Route = createFileRoute("/packs")({
  head: () => ({
    meta: [
      { title: "Prestations · PeakCL" },
      {
        name: "description",
        content:
          "Catalogue de prestations PeakCL : sites web sur mesure, design graphique et community management. Sur devis selon cahier des charges.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/packs") },
    ],
    links: [{ rel: "canonical", href: absUrl("/packs") }],
  }),
  component: PacksPage,
});

const CALENDLY_URL = "https://calendly.com/peakcl73/45min";

type CatalogItem = {
  title: string;
  forWho: string;
  priceLabel?: string;
  delay?: string;
  included: string[];
  notIncluded?: string[];
  highlight?: boolean;
};

const devWeb: CatalogItem[] = [
  {
    title: "Site vitrine sur mesure (code)",
    forWho:
      "Pour qui : tu veux un site 100% custom, performant et pérenne, sans dépendre d’un CMS ou de plugins.",
    priceLabel: "Sur devis",
    delay: "Délai indicatif : 3 à 5 semaines (selon périmètre).",
    included: [
      "Analyse des besoins & maquettage (wireframes)",
      "Développement sur mesure (HTML/CSS/JS)",
      "Jusqu’à 6 pages (Accueil, À propos, Services, Portfolio, Blog, Contact)",
      "Responsive (mobile-first)",
      "Formulaire de contact & intégrations tierces",
      "Optimisation SEO on-page & performances (Lighthouse)",
      "Hébergement conseillé & mise en ligne",
      "Support inclus (durée selon offre)",
    ],
    notIncluded: [
      "Rédaction complète si volume important (option)",
      "Shooting photo/vidéo (option)",
      "Maintenance mensuelle (option)",
    ],
  },
  {
    title: "Site vitrine WordPress",
    forWho:
      "Pour qui : tu veux pouvoir modifier tes contenus via un back-office (pages, blog, etc.).",
    priceLabel: "Sur devis",
    delay: "Délai indicatif : 3 à 5 semaines (selon périmètre).",
    included: [
      "Analyse des besoins & maquettage",
      "Intégration (thème premium ou base personnalisée)",
      "Jusqu’à 6 pages",
      "Responsive & optimisation mobile",
      "Formulaire de contact & Google Maps (si pertinent)",
      "Optimisation SEO on-page",
      "Formation à l’utilisation du back-office",
      "Support inclus (durée selon offre)",
    ],
    notIncluded: [
      "Abonnements (thème premium, plugins payants, etc.)",
      "Maintenance mensuelle (option)",
    ],
  },
  {
    title: "Site e-commerce",
    forWho: "Pour qui : tu veux vendre en ligne via une boutique claire, sécurisée et bien brandée.",
    priceLabel: "Sur devis",
    delay: "Délai indicatif : 4 à 7 semaines (selon catalogue et plateforme).",
    included: [
      "Recommandation de plateforme (Shopify, WooCommerce, etc.)",
      "Configuration complète boutique + paiements",
      "Intégration produits (volume selon offre)",
      "Pages légales (structure + intégration, contenu à fournir)",
      "Optimisation SEO & performance",
      "Formation & documentation",
    ],
    notIncluded: ["Rédaction des CGV/mentions légales (à fournir ou via juriste)", "Gestion publicitaire (option)"],
  },
  {
    title: "Landing page / Page de vente",
    forWho: "Pour qui : tu veux une page unique orientée conversion (offre, lancement, événement).",
    priceLabel: "Sur devis",
    delay: "Délai indicatif : 1 à 2 semaines (selon contenu).",
    included: [
      "Structure orientée conversion (AIDA)",
      "Design & développement sur mesure",
      "CTA / formulaire / intégration emailing",
      "Optimisations performance",
    ],
  },
  {
    title: "Refonte de site existant",
    forWho: "Pour qui : ton site est obsolète (design, UX, vitesse) et tu veux repartir sur une base solide.",
    priceLabel: "Sur devis",
    delay: "Délai indicatif : selon complexité (audit → design → dev → mise en ligne).",
    included: [
      "Audit UX/UI + performances",
      "Nouveau design responsive",
      "Migration & préservation du contenu existant",
      "Redirections 301 (préservation SEO)",
      "Optimisation Core Web Vitals",
      "Tests multi-navigateurs / appareils",
    ],
  },
  {
    title: "Maintenance & support technique",
    forWho: "Pour qui : tu veux une tranquillité (sécurité, stabilité, petites évolutions).",
    priceLabel: "Sur devis",
    delay: "Engagement : à définir selon besoin.",
    included: [
      "Mises à jour (CMS, thèmes, plugins si WordPress)",
      "Sauvegardes & monitoring",
      "Corrections de bugs & ajustements mineurs",
      "Support par email",
    ],
  },
  {
    title: "Optimisation SEO technique",
    forWho: "Pour qui : tu veux gagner en visibilité Google via un audit technique + plan d’actions clair.",
    priceLabel: "Sur devis",
    delay: "Rapport livré : 1 semaine (selon disponibilité).",
    included: [
      "Audit SEO (technique + contenu)",
      "Recommandations priorisées",
      "Optimisation Core Web Vitals",
      "Corrections techniques (404, doublons, sitemap…)",
      "Balisage structuré (Schema.org) si pertinent",
    ],
  },
];

const design: CatalogItem[] = [
  {
    title: "Identité visuelle complète",
    forWho: "Pour qui : tu veux une marque cohérente (logo, couleurs, typographies, règles d’usage).",
    priceLabel: "Sur devis",
    delay: "Délai indicatif : 1 à 2 semaines.",
    included: [
      "Questionnaire de positionnement & brief",
      "Propositions de logo (nombre selon offre)",
      "Charte graphique (couleurs, typos, usages)",
      "Déclinaisons (fond clair/sombre, N&B, favicon, photo de profil)",
      "Fichiers livrés (SVG/PNG/PDF) + guide d’utilisation",
    ],
  },
  {
    title: "Supports print",
    forWho: "Pour qui : flyers, cartes de visite, plaquettes, affiches prêtes à imprimer.",
    priceLabel: "Sur devis",
    included: ["Mise en page + exports HD (CMJN + fonds perdus)", "Déclinaisons (selon quantité)"],
  },
  {
    title: "Visuels réseaux sociaux (templates)",
    forWho: "Pour qui : tu veux des templates brandés réutilisables (posts, stories, couvertures).",
    priceLabel: "Sur devis",
    delay: "Délai indicatif : 3 à 5 jours.",
    included: [
      "Pack de templates (volume selon offre)",
      "Formats recommandés (1:1, 4:5, 9:16, 16:9)",
      "Fichiers modifiables (Canva/Figma selon préférence)",
      "Guide d’utilisation",
    ],
  },
  {
    title: "Template email & newsletter",
    forWho: "Pour qui : tu veux un email responsive à ton image, compatible clients mail.",
    priceLabel: "Sur devis",
    included: ["Design responsive", "Intégration dans l’outil (Mailchimp/Brevo…)", "Template modulaire réutilisable"],
  },
  {
    title: "Bannières digitales",
    forWho: "Pour qui : bannières display et déclinaisons multi-formats.",
    priceLabel: "Sur devis",
    included: ["Formats standards + déclinaisons", "Exports optimisés selon plateforme"],
  },
];

const community: CatalogItem[] = [
  {
    title: "Forfaits mensuels",
    forWho: "Pour qui : tu veux déléguer la création de contenus (visuels + textes) et garder une présence régulière.",
    priceLabel: "Sur devis",
    included: [
      "Planning éditorial (selon formule)",
      "Visuels brandés + textes + hashtags",
      "Rapport mensuel (selon formule)",
      "Adaptation par plateforme (Instagram / Facebook / LinkedIn…)",
    ],
  },
  {
    title: "Audit réseaux sociaux",
    forWho: "Pour qui : tu veux une analyse claire + un plan d’actions priorisé.",
    priceLabel: "Sur devis",
    delay: "Livré : 5 jours ouvrés (selon disponibilité).",
    included: [
      "Analyse des comptes existants",
      "Benchmark (concurrents)",
      "Recommandations stratégiques (plateformes, formats, fréquence)",
      "Plan d’action priorisé",
    ],
  },
  {
    title: "Contenu à la carte",
    forWho: "Pour qui : tu veux des contenus ponctuels sans abonnement (post, story, reel, article…).",
    priceLabel: "Sur devis",
    included: ["Création visuelle + rédaction (selon format)", "Déclinaisons et exports"],
  },
  {
    title: "Formation réseaux sociaux",
    forWho: "Pour qui : tu veux être autonome (Canva, analytics, stratégie, algorithmes…).",
    priceLabel: "Sur devis",
    included: ["Modules au choix", "Support de formation", "Exercices pratiques + suivi"],
  },
];

const packages: CatalogItem[] = [
  {
    title: "Pack Présence Web",
    highlight: true,
    forWho: "Lancer sa présence en ligne de façon professionnelle et cohérente.",
    priceLabel: "Sur devis",
    included: [
      "Site vitrine (code ou WordPress selon besoin)",
      "Identité visuelle (logo + charte)",
      "Templates réseaux sociaux (selon offre)",
      "Optimisation SEO on-page",
    ],
  },
  {
    title: "Pack Brand & Social",
    forWho: "Construire une identité forte et l’exprimer sur les réseaux.",
    priceLabel: "Sur devis",
    included: ["Identité visuelle", "Templates réseaux sociaux", "Calendrier éditorial (selon offre)"],
  },
  {
    title: "Pack Relance Digitale",
    forWho: "Moderniser image + site + réseaux avec un plan clair.",
    priceLabel: "Sur devis",
    included: ["Refonte de site", "Rafraîchissement identité", "Nouveaux visuels réseaux", "Audit social (selon offre)"],
  },
];

function CatalogSection({ title, subtitle, items }: { title: string; subtitle: string; items: CatalogItem[] }) {
  return (
    <section className="mt-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
      </div>

      <div className="space-y-6">
        {items.map((p) => (
          <section
            key={p.title}
            className={`rounded-2xl border bg-card/50 p-7 shadow-card ${
              p.highlight
                ? "border-[color-mix(in_oklab,var(--brand-turquoise)_30%,transparent)] ring-1 ring-[color-mix(in_oklab,var(--brand-turquoise)_22%,transparent)]"
                : "border-white/5"
            }`}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="text-xl font-semibold">{p.title}</h3>
              <div className={`text-sm font-semibold ${p.highlight ? "text-[var(--brand-turquoise)]" : "text-muted-foreground"}`}>
                {p.priceLabel ?? "Sur devis"}
              </div>
            </div>

            <p className="mt-3 text-sm text-muted-foreground">{p.forWho}</p>
            {p.delay ? <p className="mt-2 text-sm text-muted-foreground">{p.delay}</p> : null}

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div className="rounded-xl border border-white/5 bg-background/40 p-5">
                <div className="text-sm font-semibold">Livrables</div>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {p.included.map((x) => (
                    <li key={x} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-4 w-4 text-[var(--brand-turquoise)]" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {p.notIncluded?.length ? (
                <div className="rounded-xl border border-white/5 bg-background/40 p-5">
                  <div className="text-sm font-semibold">Hors périmètre (souvent)</div>
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                    {p.notIncluded.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="rounded-xl border border-white/5 bg-background/40 p-5">
                  <div className="text-sm font-semibold">Comment on avance</div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    Tu réserves ton appel, je te fais un retour rapide, puis on valide un devis clair (livrables, délais, budget) selon ton cahier des charges.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6">
              <a
                href="/reservation-appel"
                data-event="cta_brief_pack"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-turquoise)] hover:text-foreground"
              >
                Demander un devis pour cette prestation <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}

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
            href="/reservation-appel"
            data-event="cta_brief_packs_header"
            className="hidden rounded-full border border-white/10 bg-card/40 px-4 py-2 text-xs font-semibold text-foreground backdrop-blur hover:border-white/20 md:inline-flex"
          >
            Réserver un appel
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
            <h1 className="text-balance text-4xl font-bold leading-tight md:text-6xl">Catalogue de prestations.</h1>
            <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
              Trois rôles, un seul interlocuteur : <span className="text-foreground">sites web custom</span> (avec accompagnement),
              <span className="text-foreground"> design</span>, <span className="text-foreground">community management</span>. Tarifs :{" "}
              <span className="text-foreground">sur devis</span> selon cahier des charges.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="/reservation-appel"
                data-event="cta_brief_packs_hero"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-all duration-300 hover:scale-[1.02]"
              >
                Demander un devis <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-event="cta_calendly_packs_hero"
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-foreground hover:border-white/20"
              >
                Réserver un appel
              </a>
            </div>
          </div>
        </section>

        <section className="border-t border-white/5 py-16">
          <div className="mx-auto max-w-5xl px-6">
            <div className="rounded-2xl border border-white/10 bg-card/40 p-7 shadow-card backdrop-blur">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-white/5 bg-background/40 p-5">
                  <div className="text-sm font-semibold">Ce que vous obtenez</div>
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                    <li>Des offres claires (livrables + délais + budget).</li>
                    <li>Des packs clé en main (économie vs achats séparés quand c’est pertinent).</li>
                    <li>Un seul interlocuteur (dev, design, social).</li>
                  </ul>
                </div>
                <div className="rounded-xl border border-white/5 bg-background/40 p-5">
                  <div className="text-sm font-semibold">Bon à savoir</div>
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                    <li>Acompte : 30 à 50 % à la signature.</li>
                    <li>Révisions incluses selon l’offre · au-delà : 60 €/h.</li>
                    <li>Droits d’utilisation cédés à la livraison du solde.</li>
                  </ul>
                </div>
              </div>
            </div>

            <CatalogSection
              title="💻 Développement web"
              subtitle="Sites web custom, personnalisés selon le client, avec accompagnement de bout en bout."
              items={devWeb}
            />
            <CatalogSection
              title="🎨 Design graphique"
              subtitle="Identité visuelle et supports pour une marque cohérente et mémorable."
              items={design}
            />
            <CatalogSection
              title="📱 Community management"
              subtitle="Stratégie et contenus : rester visible sans y passer tes soirées."
              items={community}
            />
            <CatalogSection
              title="📦 Packages combinés"
              subtitle="Quand c’est plus simple (et plus rentable) de tout cadrer ensemble."
              items={packages}
            />

            <div className="mt-12 rounded-2xl border border-white/10 bg-card/40 p-7 text-center shadow-card backdrop-blur">
              <h2 className="text-3xl font-bold md:text-4xl">On commence quand ?</h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Le plus simple : tu réserves ton appel. C’est quelques minutes, et je reviens vers toi avec un devis clair.
                Si tu préfères en parler de vive voix directement, tu peux aussi passer par Calendly.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="/reservation-appel"
                  data-event="cta_brief_packs_final"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-all duration-300 hover:scale-[1.02]"
                >
                  Demander un devis <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-event="cta_calendly_packs_final"
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-foreground hover:border-white/20"
                >
                  Réserver un appel
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

