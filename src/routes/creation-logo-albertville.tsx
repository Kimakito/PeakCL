import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, Gift, MapPin, Palette } from "lucide-react";
import { absUrl } from "@/seo/site";
import { breadcrumbJsonLd } from "@/seo/jsonld";
import { GlowingEffect } from "@/components/ui/glowing-effect";

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Création de logo et identité visuelle",
  name: "Création de logo & identité visuelle · PeakCL",
  description:
    "Création de logo, charte graphique et identité visuelle pour indépendants et petites structures à Albertville et en Savoie.",
  provider: {
    "@type": "ProfessionalService",
    name: "PeakCL · Charlotte Lacroix",
    url: absUrl("/"),
  },
  areaServed: [
    { "@type": "City", name: "Albertville" },
    { "@type": "AdministrativeArea", name: "Savoie" },
    { "@type": "Country", name: "France" },
  ],
  url: absUrl("/creation-logo-albertville"),
};

export const Route = createFileRoute("/creation-logo-albertville")({
  head: () => ({
    meta: [
      { title: "Création de logo & identité visuelle à Albertville · PeakCL" },
      {
        name: "description",
        content:
          "Création de logo et identité visuelle à Albertville (Savoie) : logo pro, charte graphique, déclinaisons web/print. Par une graphiste qui code aussi votre site.",
      },
      { property: "og:title", content: "Création de logo & identité visuelle à Albertville · PeakCL" },
      {
        property: "og:description",
        content:
          "Logo professionnel, charte graphique et déclinaisons, une identité cohérente, à Albertville et partout en France.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/creation-logo-albertville") },
      {
        "script:ld+json": breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Création de logo à Albertville", path: "/creation-logo-albertville" },
        ]),
      },
      { "script:ld+json": serviceJsonLd },
    ],
    links: [{ rel: "canonical", href: absUrl("/creation-logo-albertville") }],
  }),
  component: Page,
});

const INCLUDED = [
  "Brief créatif & moodboard (on clarifie votre positionnement)",
  "Propositions de logo (nombre selon devis)",
  "Palette de couleurs & typographies",
  "Déclinaisons : fond clair/sombre, favicon, avatar réseaux",
  "Fichiers livrables (SVG, PNG, PDF) + mini guide d'usage",
];

const ZONES = [
  { name: "Albertville", href: "/agence-web-albertville" },
  { name: "Chambéry", href: "/agence-web-chambery" },
  { name: "Annecy", href: "/agence-web-annecy" },
  { name: "Aix-les-Bains", href: "/agence-web-aix-les-bains" },
];

function Page() {
  return (
    <main className="min-h-screen border-t border-white/5">
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero py-20">
        <div className="grid-bg absolute inset-0 -z-10" />
        <div className="mx-auto max-w-5xl px-6 text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            Albertville · Savoie · partout en France
          </div>
          <h1 className="mx-auto mt-6 max-w-3xl text-balance text-4xl font-bold leading-tight md:text-6xl">
            Création de <span className="text-gradient">logo</span> &amp; identité visuelle à Albertville
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
            Un logo professionnel et une identité cohérente, réutilisable partout : web, réseaux,
            print. Conçus par une graphiste qui code aussi votre site : même main, même cohérence.
          </p>
          <a
            href="/#contact"
            className="mx-auto mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-primary-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
          >
            Demander un devis <ArrowRight className="h-4 w-4" />
          </a>
          <p className="mt-3 text-xs text-muted-foreground">Réponse sous 24h · Sans engagement</p>
        </div>
      </section>

      {/* Free audit strip */}
      <section className="border-t border-white/5 bg-card/30 py-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-6 text-center sm:flex-row sm:text-left">
          <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[color-mix(in_oklab,var(--brand-yellow)_18%,transparent)] text-[var(--brand-yellow)]">
            <Gift className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              Audit gratuit de votre image (site web + réseaux sociaux)
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Logo daté, couleurs incohérentes, visuels réseaux brouillons ? Je regarde votre identité
              actuelle et vous dis quoi améliorer, sous 24h, sans engagement.
            </p>
          </div>
        </div>
      </section>

      {/* Why + included */}
      <section className="border-t border-white/5 py-20">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold">Pourquoi soigner votre identité visuelle ?</h2>
            <p className="mt-4 text-muted-foreground">
              Votre logo et vos couleurs sont la première chose qu&apos;on voit, avant même de vous
              lire. Une identité claire et cohérente inspire confiance, vous distingue de la
              concurrence, et se réutilise partout sans repartir de zéro à chaque support.
            </p>
            <p className="mt-4 text-muted-foreground">
              Mon avantage : je conçois votre identité <strong className="text-foreground">et</strong>{" "}
              votre site. Pas de logo livré dans le vide qui ne s&apos;intègre nulle part, tout est
              pensé pour fonctionner ensemble.
            </p>
          </div>
          <div className="relative rounded-2xl border border-white/5 bg-card/50 p-6 shadow-card">
            <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[color-mix(in_oklab,var(--brand-violet)_18%,transparent)] text-[var(--brand-violet)]">
              <Palette className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-base font-semibold">Ce qui est inclus</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {INCLUDED.map((i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-turquoise)]" />
                  {i}
                </li>
              ))}
            </ul>
            <a
              href="/packs"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand-turquoise)] hover:text-foreground"
            >
              Voir les offres graphisme <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Zones */}
      <section className="border-t border-white/5 py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-xl font-bold">Graphiste en Savoie et alentours</h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            Basée à Gilly-sur-Isère, près d&apos;Albertville, je crée des logos et identités visuelles pour des indépendants et
            petites structures dans toute la Savoie et partout en France (visio).
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {ZONES.map((z) => (
              <a
                key={z.href}
                href={z.href}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-white/20 hover:text-foreground"
              >
                <MapPin className="h-3 w-3" />
                {z.name}
              </a>
            ))}
            <a
              href="/community-manager-savoie"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-white/20 hover:text-foreground"
            >
              Community management
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden border-t border-white/5 py-20">
        <div className="absolute inset-0 -z-10 bg-hero" />
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Donnons une vraie image à votre activité</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Décrivez votre projet en 8 minutes : je vous propose une direction visuelle et un devis
            clair.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="/reservation-appel"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
            >
              Faire le diagnostic <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="https://calendly.com/peakcl73/faisons-connaissance"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-border bg-card/60 px-6 py-3 text-sm font-semibold text-foreground hover:bg-card/80"
            >
              Réserver un appel
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
