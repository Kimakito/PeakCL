import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { absUrl } from "@/seo/site";
import { breadcrumbJsonLd } from "@/seo/jsonld";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Reveal } from "@/components/ui/Reveal";
import { SERVICES, packages } from "@/content/peakcl/services";
import { ExpressionPhoto, SectionAvatarCard } from "@/components/ExpressionPhoto";

const CALENDLY_URL = "https://calendly.com/peakcl73/faisons-connaissance";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services · Sites web, design, réseaux, automatisation · PeakCL" },
      {
        name: "description",
        content:
          "Un seul interlocuteur pour votre communication : sites web, community management, design graphique et accompagnement à l’automatisation de vos processus. Sur devis.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/services") },
      {
        "script:ld+json": breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Services", path: "/services" },
        ]),
      },
    ],
    links: [{ rel: "canonical", href: absUrl("/services") }],
  }),
  component: ServicesHub,
});

function ServicesHub() {
  return (
    <div className="min-h-screen">
      <main className="relative overflow-hidden border-t border-white/5 bg-hero">
        <div className="grid-bg absolute inset-0 -z-10" />
        <div className="hero-aurora" aria-hidden style={{ bottom: "auto", height: "680px" }} />
        <div className="relative z-10 mx-auto max-w-5xl px-6 py-20">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-turquoise)]">Services</span>
            <h1 className="mt-4 text-balance text-4xl font-bold leading-tight md:text-6xl">
              Un seul interlocuteur, <span className="text-gradient">quatre expertises.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
              Site, réseaux, image et automatisation : choisissez ce dont vous avez besoin, ou déléguez tout de A à Z. Tarifs sur devis selon votre besoin.
            </p>
            <div className="mt-10 flex justify-center">
              <SectionAvatarCard slug="offres" imgClassName="w-full max-w-[230px]" />
            </div>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {SERVICES.map((s) => (
              <a
                key={s.slug}
                href={s.slug}
                data-event="services_hub_card"
                className="group relative rounded-2xl border border-white/5 bg-card/50 p-7 shadow-card transition-all hover:-translate-y-1 hover:border-white/15"
              >
                <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
                <div className="text-3xl">{s.emoji}</div>
                <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-yellow)]/80">{s.eyebrow}</div>
                <h2 className="mt-1 text-xl font-semibold">{s.title}</h2>
                <p className="mt-3 text-sm text-muted-foreground">{s.tagline}</p>
                <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand-turquoise)]">
                  Découvrir <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </a>
            ))}
          </div>

          {/* Packages combinés */}
          <div className="mt-20">
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-yellow)]">Packages combinés</span>
              <h2 className="mt-4 text-3xl font-bold md:text-4xl">Plus simple, <span className="text-gradient">et plus rentable.</span></h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
                Quand plusieurs besoins vont ensemble, un pack revient moins cher que les prestations séparées. Tous sur devis selon votre cahier des charges.
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {packages.map((pk, i) => (
                <Reveal key={pk.name} delay={i * 0.05} className="h-full">
                <div
                  className={`card-hover relative flex h-full flex-col rounded-2xl border p-6 shadow-card ${
                    pk.highlight
                      ? "border-[color-mix(in_oklab,var(--brand-turquoise)_30%,transparent)] ring-1 ring-[color-mix(in_oklab,var(--brand-turquoise)_22%,transparent)] bg-card/60"
                      : "border-white/5 bg-card/50"
                  }`}
                >
                  <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
                  <div className="text-2xl">{pk.emoji}</div>
                  <h3 className="mt-3 text-lg font-semibold">{pk.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{pk.tagline}</p>
                  <ul className="mt-4 flex-1 space-y-2 text-sm text-muted-foreground">
                    {pk.points.map((x) => (
                      <li key={x} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-turquoise)]" />
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                  {pk.economy ? (
                    <div className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full border border-[color-mix(in_oklab,var(--brand-yellow)_35%,transparent)] bg-white/5 px-3 py-1 text-xs font-semibold text-[var(--brand-yellow)]">
                      🏷️ {pk.economy}
                    </div>
                  ) : null}
                  <a
                    href="/reservation-appel"
                    data-event="cta_brief_pack"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand-turquoise)] hover:text-foreground"
                  >
                    Demander un devis <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="mt-16 rounded-2xl border border-white/10 bg-card/40 p-7 text-center shadow-card backdrop-blur">
            <div className="mb-6 flex justify-center">
              <ExpressionPhoto slug="sourire-malicieux" caption="Par quoi on commence ?" tilt={-3} imgClassName="aspect-[3/4] w-28" />
            </div>
            <h2 className="text-2xl font-bold md:text-3xl">Vous ne savez pas par où commencer ?</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
              Réservez un appel de diagnostic : je vous dis ce qui aura le plus d’impact pour votre activité, et comment je peux m’en charger.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="/reservation-appel"
                data-event="cta_brief_services_final"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-all duration-300 hover:scale-[1.02]"
              >
                Faire le diagnostic <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-event="cta_calendly_services_final"
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-foreground hover:border-white/20"
              >
                Réserver un appel
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
