import {
  ArrowRight,
  Check,
  Gift,
  Globe,
  MapPin,
  Megaphone,
  Palette,
} from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { ExpressionPhoto } from "@/components/ExpressionPhoto";

export type NearbyLink = { name: string; href: string };

/** Mini-FAQ shown on every geo landing page — also used to build FAQPage JSON-LD in each route's head(). */
export function geoLandingFaq(city: string, region: string, serviceLabel: string) {
  return [
    {
      question: `Travaillez-vous uniquement à ${city} ?`,
      answerHtml: `Non. Je suis basée à Gilly-sur-Isère, en Savoie, et j'accompagne ${city} et ses environs, mais aussi des clients partout en France en visio. Une rencontre reste possible en ${region}.`,
    },
    {
      question: `Combien coûte un ${serviceLabel} à ${city} ?`,
      answerHtml: `Ça dépend du périmètre (site seul, ou site + logo + réseaux). Le devis est précis et envoyé sous 48h ouvrées après la réservation d'appel, pas une fourchette élastique. L'audit, lui, est gratuit.`,
    },
  ];
}

export type GeoLandingProps = {
  city: string;
  region: string;
  /** "site web" (default) or "site internet" */
  serviceLabel?: string;
  /** Hero subtitle, ideally city-specific */
  intro: string;
  /** Unique angle heading (avoids duplicate content across cities) */
  angleTitle: string;
  /** Unique angle paragraph */
  angleText: string;
  /** Optional city-specific block (local proof / context) to avoid duplicate content */
  localExample?: { text: string; linkLabel?: string; linkHref?: string };
  /** Optional dedicated local-SEO block (targets "agence seo {city}"-style queries) */
  seoSection?: { title: string; text: string };
  nearby: NearbyLink[];
};

const SERVICES = [
  {
    icon: Globe,
    title: "Site & pages de vente",
    desc: "Site vitrine rapide, codé sur mesure ou WordPress, pensé pour convertir.",
    href: "/services",
  },
  {
    icon: Palette,
    title: "Identité & logo",
    desc: "Logo, couleurs, typographies, une image cohérente et professionnelle.",
    href: "/creation-logo-albertville",
  },
  {
    icon: Megaphone,
    title: "Réseaux & contenus",
    desc: "Community management : publications régulières, à vos couleurs.",
    href: "/community-manager-savoie",
  },
];

const STEPS = [
  { n: "01", title: "Diagnostic", desc: "Réservation d’appel 3 min ou visio 20 min. Je comprends votre activité et votre objectif." },
  { n: "02", title: "Cadrage", desc: "Devis précis sous 48h ouvrées + planning. Vous validez ou ajustez." },
  { n: "03", title: "Production", desc: "Je code, je dessine, je rédige. Vous voyez le travail avancer." },
  { n: "04", title: "Mise en ligne", desc: "Domaine, performance, indexation. Et un suivi sur la première semaine." },
];

export function GeoLanding({
  city,
  region,
  serviceLabel = "site web",
  intro,
  angleTitle,
  angleText,
  localExample,
  seoSection,
  nearby,
}: GeoLandingProps) {
  const faq = geoLandingFaq(city, region, serviceLabel);
  return (
    <main className="min-h-screen border-t border-border">
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero py-20">
        <div className="grid-bg absolute inset-0 -z-10" />
        <div className="mx-auto max-w-5xl px-6 text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            {city} · {region}
          </div>
          <h1 className="mx-auto mt-6 max-w-3xl text-balance text-4xl font-bold leading-tight md:text-6xl">
            Agence web à <span className="text-gradient">{city}</span> : création de {serviceLabel}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">{intro}</p>
          <a
            href="/#contact"
            className="mx-auto mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-primary-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
          >
            Demander mon audit gratuit <ArrowRight className="h-4 w-4" />
          </a>
          <p className="mt-3 text-xs text-muted-foreground">Réponse sous 24h · Sans engagement</p>
        </div>
      </section>

      {/* Free audit strip */}
      <section className="border-t border-border bg-card/30 py-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-6 text-center sm:flex-row sm:text-left">
          <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[color-mix(in_oklab,var(--brand-yellow)_18%,transparent)] text-[var(--brand-yellow)]">
            <Gift className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              Audit gratuit de votre site web <span className="text-[var(--brand-turquoise)]">et</span> de vos réseaux sociaux
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Je passe en revue votre présence en ligne à {city} et je vous renvoie des recommandations
              concrètes, sous 24h, sans engagement.
            </p>
          </div>
          <div className="hidden shrink-0 sm:block">
            <ExpressionPhoto slug="lunettes-cool" caption="Cadeau" tilt={3} imgClassName="aspect-[3/4] w-20" />
          </div>
        </div>
      </section>

      {/* Unique angle */}
      <section className="border-t border-border py-20">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold">{angleTitle}</h2>
            <p className="mt-4 text-muted-foreground">{angleText}</p>
            {localExample ? (
              <p className="mt-4 text-muted-foreground">
                {localExample.text}{" "}
                {localExample.linkHref && localExample.linkLabel ? (
                  <a
                    href={localExample.linkHref}
                    className="font-medium text-[var(--brand-turquoise)] hover:underline"
                  >
                    {localExample.linkLabel}
                  </a>
                ) : null}
              </p>
            ) : null}
          </div>
          <div className="relative rounded-2xl border border-border bg-card/50 p-6 shadow-card">
            <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
            <h3 className="text-base font-semibold">Ce que vous obtenez</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-turquoise)]" />
                Une structure pensée conversion (CTA, preuves, parcours simple)
              </li>
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-turquoise)]" />
                Des bases SEO locales propres (balises, maillage, performance)
              </li>
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-turquoise)]" />
                Un design premium, rapide et mobile-first
              </li>
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-turquoise)]" />
                Une seule interlocutrice : site, identité et réseaux alignés
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="border-t border-border py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-bold md:text-3xl">
            Toute votre communication à {city}, au même endroit
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Site, identité visuelle et réseaux sociaux pensés ensemble, pour une image cohérente qui
            inspire confiance avant même le premier appel.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {SERVICES.map((s) => (
              <a
                key={s.title}
                href={s.href}
                className="group relative rounded-2xl border border-border bg-card/50 p-5 shadow-card transition-colors hover:border-border"
              >
                <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[color-mix(in_oklab,var(--brand-violet)_18%,transparent)] text-[var(--brand-violet)]">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[var(--brand-turquoise)]">
                  En savoir plus <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Local SEO */}
      {seoSection ? (
        <section className="border-t border-border py-20">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-2xl font-bold md:text-3xl">{seoSection.title}</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">{seoSection.text}</p>
          </div>
        </section>
      ) : null}

      {/* Process */}
      <section className="border-t border-border py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-bold md:text-3xl">Comment ça se passe</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step) => (
              <div key={step.n} className="relative rounded-2xl border border-border bg-card/50 p-5 shadow-card">
                <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
                <div className="text-sm font-bold text-[var(--brand-turquoise)]">{step.n}</div>
                <h3 className="mt-2 text-base font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mini FAQ */}
      <section className="border-t border-border py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-2xl font-bold">Questions fréquentes</h2>
          <div className="mt-6 space-y-4">
            {faq.map((item) => (
              <div key={item.question} className="relative rounded-2xl border border-border bg-card/50 p-5 shadow-card">
                <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
                <h3 className="text-base font-semibold">{item.question}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.answerHtml}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby + about */}
      <section className="border-t border-border py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-xl font-bold">Aux alentours de {city}</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {nearby.map((z) => (
              <a
                key={z.href}
                href={z.href}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-border hover:text-foreground"
              >
                <MapPin className="h-3 w-3" />
                {z.name}
              </a>
            ))}
            <a
              href="/qui-suis-je"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-border hover:text-foreground"
            >
              Qui suis-je ?
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden border-t border-border py-20">
        <div className="absolute inset-0 -z-10 bg-hero" />
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="mb-6 flex justify-center">
            <ExpressionPhoto slug="sourire-exterieur" caption="Ravie de vous lire" tilt={-2} imgClassName="aspect-[3/4] w-28" />
          </div>
          <h2 className="text-3xl font-bold md:text-4xl">
            Votre projet à {city}, on en parle ?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Décrivez votre activité en 8 minutes : je vous renvoie un audit gratuit et des
            recommandations concrètes.
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
