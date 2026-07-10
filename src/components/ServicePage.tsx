import type { ReactNode } from "react";
import { ArrowRight, Check } from "lucide-react";
import { SnapPage, SnapSection, SectionDots } from "@/components/SnapPage";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Reveal } from "@/components/ui/Reveal";
import type { CatalogItem, Forfait, ServiceHighlight } from "@/content/peakcl/services";

const CALENDLY_URL = "https://calendly.com/peakcl73/faisons-connaissance";

function CatalogCard({ p, showPrices }: { p: CatalogItem; showPrices?: boolean }) {
  const priceText = showPrices && p.price ? p.price : "Sur devis";
  return (
    <section
      className={`card-hover relative rounded-2xl border bg-card/50 p-7 shadow-card ${
        p.highlight
          ? "border-[color-mix(in_oklab,var(--brand-turquoise)_30%,transparent)] ring-1 ring-[color-mix(in_oklab,var(--brand-turquoise)_22%,transparent)]"
          : "border-white/5"
      }`}
    >
      <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="text-xl font-semibold">{p.title}</h3>
        <div className="text-right">
          <div className={`text-sm font-semibold ${priceText === "Sur devis" ? "text-muted-foreground" : "text-[var(--brand-turquoise)]"}`}>
            {priceText}
          </div>
          {priceText === "Sur devis" ? (
            <div className="text-xs text-muted-foreground/70">Selon votre profil et le périmètre</div>
          ) : null}
        </div>
      </div>

      <p className="mt-3 text-sm text-muted-foreground">{p.desc}</p>
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
              Vous réservez votre appel, je vous fais un retour rapide, puis on valide un devis clair (livrables, délais, budget) selon votre besoin.
            </p>
          </div>
        )}
      </div>

      <div className="mt-6">
        <a
          href="/reservation-appel"
          data-event="cta_brief_service"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-turquoise)] hover:text-foreground"
        >
          Demander un devis pour cette prestation <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}

function ForfaitCard({ f }: { f: Forfait }) {
  return (
    <div
      className={`card-hover relative flex flex-col rounded-2xl border p-6 shadow-card ${
        f.highlight
          ? "border-[color-mix(in_oklab,var(--brand-turquoise)_35%,transparent)] ring-1 ring-[color-mix(in_oklab,var(--brand-turquoise)_25%,transparent)] bg-card/70"
          : "border-white/5 bg-card/50"
      }`}
    >
      {f.highlight ? (
        <span className="absolute -top-2.5 left-6 rounded-full bg-primary-gradient px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary-foreground">
          Populaire
        </span>
      ) : null}
      <div className="flex items-center gap-2">
        <span className="text-xl">{f.emoji}</span>
        <span className="text-sm font-bold uppercase tracking-[0.14em]">{f.name}</span>
      </div>
      <div className="mt-3 text-2xl font-bold text-[var(--brand-turquoise)]">{f.price}</div>
      <p className="mt-1 text-xs text-muted-foreground">{f.freq}</p>
      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
        {f.inclus.map((x) => (
          <li key={x} className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-turquoise)]" />
            <span>{x}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export type ServicePageProps = {
  eyebrow: string;
  title: string;
  tagline: string;
  /** Bloc optionnel affiché sous le tagline dans le hero. */
  intro?: ReactNode;
  /** Section optionnelle « expertises » (grille de cartes) entre le hero et le catalogue. */
  highlights?: ServiceHighlight[];
  highlightsTitle?: string;
  highlightsSubtitle?: string;
  /** Grille de forfaits mensuels (Community management). Toujours chiffrée. */
  forfaits?: Forfait[];
  forfaitsTitle?: string;
  forfaitsNote?: string;
  sectionTitle: string;
  sectionSubtitle: string;
  items: CatalogItem[];
  /** Affiche les prix réels des items du catalogue (sinon « Sur devis »). */
  showPrices?: boolean;
};

export function ServicePage({ eyebrow, title, tagline, intro, highlights, highlightsTitle, highlightsSubtitle, forfaits, forfaitsTitle, forfaitsNote, sectionTitle, sectionSubtitle, items, showPrices }: ServicePageProps) {
  const SECTIONS = [
    { id: "intro", label: "Intro" },
    ...(highlights?.length ? [{ id: "expertises", label: "Expertises" }] : []),
    ...(forfaits?.length ? [{ id: "forfaits", label: "Forfaits" }] : []),
    { id: "prestations", label: "Prestations" },
    { id: "contact", label: "Contact" },
  ];
  return (
    <div className="min-h-screen">
      <main className="border-t border-white/5">
        <SectionDots sections={SECTIONS} />
        <SnapPage>
          <SnapSection id="intro" className="relative flex items-center overflow-hidden bg-hero py-20">
            <div className="grid-bg absolute inset-0 -z-10" />
            <div className="hero-aurora" aria-hidden />
            <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-turquoise)]">{eyebrow}</span>
              <h1 className="mt-4 text-balance text-4xl font-bold leading-tight md:text-6xl">{title}</h1>
              <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">{tagline}</p>
              {intro ? <div className="mx-auto mt-8 max-w-2xl text-left">{intro}</div> : null}
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="/reservation-appel"
                  data-event="cta_brief_service_hero"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-all duration-300 hover:scale-[1.02]"
                >
                  Demander un devis <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-event="cta_calendly_service_hero"
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-foreground hover:border-white/20"
                >
                  Réserver un appel
                </a>
              </div>
            </div>
          </SnapSection>

          {highlights?.length ? (
            <SnapSection id="expertises" className="flex items-center border-t border-white/5 py-16">
              <div className="mx-auto w-full max-w-5xl px-6">
                <div className="mb-8 text-center">
                  <h2 className="text-2xl font-bold text-foreground md:text-3xl">{highlightsTitle ?? "Ce que je peux faire pour vous"}</h2>
                  {highlightsSubtitle ? <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">{highlightsSubtitle}</p> : null}
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  {highlights.map((h) => (
                    <div key={h.title} className="card-hover relative rounded-2xl border border-white/5 bg-card/50 p-6 shadow-card">
                      <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
                      <div className="text-2xl">{h.emoji}</div>
                      <h3 className="mt-3 text-lg font-semibold">{h.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{h.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </SnapSection>
          ) : null}

          {forfaits?.length ? (
            <SnapSection id="forfaits" className="flex items-center border-t border-white/5 py-16">
              <div className="mx-auto w-full max-w-5xl px-6">
                <div className="mb-8 text-center">
                  <h2 className="text-2xl font-bold text-foreground md:text-3xl">{forfaitsTitle ?? "Forfaits mensuels"}</h2>
                  {forfaitsNote ? <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">{forfaitsNote}</p> : null}
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {forfaits.map((f) => (
                    <ForfaitCard key={f.name} f={f} />
                  ))}
                </div>
              </div>
            </SnapSection>
          ) : null}

          <SnapSection id="prestations" className="flex items-center border-t border-white/5 py-16">
            <div className="mx-auto w-full max-w-5xl px-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground">{sectionTitle}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{sectionSubtitle}</p>
              </div>
              <div className="space-y-6">
                {items.map((p, i) => (
                  <Reveal key={p.title} delay={i * 0.05}>
                    <CatalogCard p={p} showPrices={showPrices} />
                  </Reveal>
                ))}
              </div>
            </div>
          </SnapSection>

          <SnapSection id="contact" className="flex items-center border-t border-white/5 py-16">
            <div className="mx-auto w-full max-w-5xl px-6">
              <div className="rounded-2xl border border-white/10 bg-card/40 p-7 text-center shadow-card backdrop-blur">
                <h2 className="text-3xl font-bold md:text-4xl">On commence quand ?</h2>
                <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                  Le plus simple : vous réservez votre appel. C’est quelques minutes, et je reviens vers vous avec un devis clair.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <a
                    href="/reservation-appel"
                    data-event="cta_brief_service_final"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-all duration-300 hover:scale-[1.02]"
                  >
                    Demander un devis <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-event="cta_calendly_service_final"
                    className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-foreground hover:border-white/20"
                  >
                    Réserver un appel
                  </a>
                </div>
              </div>
            </div>
          </SnapSection>
        </SnapPage>
      </main>
    </div>
  );
}
