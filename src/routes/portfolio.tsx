import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Check, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { peakclTestimonials } from "@/content/peakcl/testimonials";
import {
  CATEGORIES,
  DECK_PROJECTS,
  LOGO_PROJECTS,
  type Category,
  type DeckProject,
} from "@/content/peakcl/portfolioDeck";
import { DeckFooter } from "@/components/DeckFooter";
import { absUrl } from "@/seo/site";
import { breadcrumbJsonLd } from "@/seo/jsonld";
import { GlowingEffect } from "@/components/ui/glowing-effect";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio · PeakCL" },
      {
        name: "description",
        content:
          "Réalisations PeakCL par métier : sites vitrines, e-commerce, branding. Filtrez les projets par secteur.",
      },
      { property: "og:title", content: "Portfolio · PeakCL" },
      {
        property: "og:description",
        content:
          "Des projets concrets, par métier. Un seul interlocuteur pour toute votre image en ligne.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/portfolio") },
      {
        "script:ld+json": breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Portfolio", path: "/portfolio" },
        ]),
      },
    ],
    links: [{ rel: "canonical", href: absUrl("/portfolio") }],
  }),
  component: PortfolioPage,
});

const CALENDLY_URL = "https://calendly.com/peakcl73/faisons-connaissance";

/** Catégories qui ont au moins un projet. */
const PANEL_CATS: Category[] = CATEGORIES.filter((c) =>
  DECK_PROJECTS.some((p) => p.category === c.slug),
);

const LOGOS_KEY = "logos";
const ALL_KEY = "all";
const LOGOS_ACCENT = "#EC4899";

type Filter = { key: string; label: string; accent: string };
const FILTERS: Filter[] = [
  { key: ALL_KEY, label: "Tous", accent: "var(--brand-turquoise)" },
  ...PANEL_CATS.map((c) => ({ key: c.slug, label: c.short, accent: c.accent })),
  { key: LOGOS_KEY, label: "Logos", accent: LOGOS_ACCENT },
];

/* ── Cadre MacBook (CSS) ─────────────────────────────────────── */
function MacbookFrame({ children }: { children: ReactNode }) {
  return (
    <div className="px-3 pt-4">
      {/* écran */}
      <div className="relative rounded-t-lg border border-white/15 bg-[#0b0b14] p-1.5 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.85)]">
        <span className="absolute left-1/2 top-1 z-10 h-1 w-1 -translate-x-1/2 rounded-full bg-white/25" aria-hidden />
        <div className="relative aspect-[16/10] overflow-hidden rounded-[3px] bg-black">{children}</div>
      </div>
      {/* base + charnière */}
      <div className="relative mx-auto h-2.5 w-[106%] -translate-x-[3%] rounded-b-lg bg-gradient-to-b from-[#c9cdd6] to-[#9399a5]">
        <span className="absolute left-1/2 top-0 h-1.5 w-14 -translate-x-1/2 rounded-b-[4px] bg-[#7c828d]" aria-hidden />
      </div>
    </div>
  );
}

/* ── Étude de cas (modale interne) ───────────────────────────── */
/** Avis client associé à un projet, si l'un des témoignages le mentionne. */
function testimonialFor(p: DeckProject) {
  const first = p.title.toLowerCase().split(" ")[0];
  return peakclTestimonials.find((t) => {
    const label = (t.sourceLabel || "").toLowerCase();
    if (!label || label.startsWith("avis")) return false;
    return label.includes(first);
  });
}

function CaseStudyModal({ p, onClose }: { p: DeckProject; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const quote = testimonialFor(p);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Étude de cas ${p.title}`}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-6"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-white/10 bg-[#0c0c16] shadow-card sm:rounded-3xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white/70 backdrop-blur hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        {p.shot ? (
          <div className="aspect-[16/9] overflow-hidden bg-black">
            <img src={p.shot} alt={`Aperçu du site ${p.title}`} decoding="async" className="h-full w-full object-cover object-top" />
          </div>
        ) : null}

        <div className="p-6 sm:p-8">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-turquoise)]">Étude de cas</span>
          <h3 className="mt-2 text-2xl font-bold">{p.title}</h3>
          {p.subtitle ? <p className="mt-1 text-sm text-muted-foreground">{p.subtitle}</p> : null}
          {p.description ? <p className="mt-5 text-sm leading-relaxed text-foreground/90">{p.description}</p> : null}

          {p.tags?.length ? (
            <div className="mt-6">
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Ce qui a été livré</div>
              <ul className="mt-3 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <li key={t} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-foreground/90">
                    <Check className="h-3.5 w-3.5 text-[var(--brand-turquoise)]" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {quote ? (
            <blockquote className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm italic leading-relaxed text-foreground/90">
              « {quote.quote} »
              <footer className="mt-2 not-italic text-xs text-muted-foreground">
                {quote.name} · {quote.sourceLabel}
              </footer>
            </blockquote>
          ) : null}

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            {p.siteUrl ? (
              <a
                href={p.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-event="portfolio_visit"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-foreground hover:border-white/30"
              >
                Voir le site en ligne <ArrowUpRight className="h-4 w-4" />
              </a>
            ) : null}
            <a
              href="/reservation-appel"
              data-event="cta_brief_case"
              className="cta-anim inline-flex items-center justify-center gap-2 rounded-full bg-primary-gradient px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow hover:scale-[1.02]"
            >
              Un projet comme ça ? <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Carte site (élément de grille) ──────────────────────────── */
function SiteCard({ p, onOpen }: { p: DeckProject; onOpen: (project: DeckProject) => void }) {
  const Inner = (
    <>
      <div
        className="pointer-events-none absolute -inset-4 -z-10 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30"
        style={{ background: p.accent }}
        aria-hidden
      />
      <MacbookFrame>
        {p.shot ? (
          <img
            src={p.shot}
            alt={`Aperçu du site ${p.title}`}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.08]"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center text-center text-xs text-white/40"
            style={{
              background: `radial-gradient(circle at 50% 40%, ${p.accent}22, transparent 70%)`,
            }}
          >
            Aperçu bientôt disponible
          </div>
        )}
      </MacbookFrame>
      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="truncate text-sm font-semibold">{p.title}</h3>
          {p.status === "construction" ? (
            <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-muted-foreground">
              en cours
            </span>
          ) : (
            <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
          )}
        </div>
        {p.subtitle ? (
          <p className="mt-0.5 truncate text-xs text-muted-foreground">
            {p.subtitle}
          </p>
        ) : null}
      </div>
    </>
  );

  return (
    <button
      type="button"
      onClick={() => onOpen(p)}
      data-event="portfolio_open"
      className="group relative block w-full cursor-pointer overflow-hidden rounded-2xl border border-white/5 bg-card/40 text-left shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-white/15"
    >
      <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
      {Inner}
    </button>
  );
}

/* ── Carte logo ──────────────────────────────────────────────── */
function LogoCard({ l }: { l: (typeof LOGO_PROJECTS)[number] }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-card/40 shadow-card">
      <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
      <div className="flex h-44 items-center justify-center bg-white p-8">
        <img
          src={l.file}
          alt={`Logo ${l.name}`}
          loading="lazy"
          decoding="async"
          className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full" style={{ background: l.accent }} />
          <h3 className="text-sm font-semibold">{l.name}</h3>
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">{l.metier}</p>
        {l.note ? (
          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground/70">{l.note}</p>
        ) : null}
      </div>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────── */
function PortfolioPage() {
  const [active, setActive] = useState<string>(ALL_KEY);
  const [openP, setOpenP] = useState<DeckProject | null>(null);

  // Pré-sélection via ?cat=<slug> (liens depuis la home).
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("cat");
    if (q && FILTERS.some((f) => f.key === q)) setActive(q);
  }, []);

  const showLogos = active === LOGOS_KEY;
  const projects =
    active === ALL_KEY ? DECK_PROJECTS : DECK_PROJECTS.filter((p) => p.category === active);
  const count = showLogos ? LOGO_PROJECTS.length : projects.length;
  const noun = showLogos ? "création" : "réalisation";

  return (
    <div className="relative bg-background text-foreground">
      {/* Hero compact */}
      <section className="relative isolate overflow-hidden bg-hero py-14 text-center md:py-20">
        <div className="hero-aurora" aria-hidden style={{ zIndex: -10 }} />
        <div className="relative mx-auto max-w-3xl px-6">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-turquoise)]">
            Portfolio
          </span>
          <h1 className="mt-4 text-balance text-4xl font-bold leading-tight md:text-6xl">
            Ils m'ont fait <span className="text-gradient">confiance</span>.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Sites, boutiques et logos livrés, classés par métier. Filtrez par secteur pour voir ce que j'ai fait dans le vôtre.
          </p>
        </div>
      </section>

      {/* Barre de filtres (collante) */}
      <div className="sticky top-[56px] z-30 border-y border-white/5 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-2 px-6 py-3">
          {FILTERS.map((f) => {
            const on = active === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setActive(f.key)}
                data-event="portfolio_filter"
                aria-pressed={on}
                className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  on
                    ? "bg-white/10 text-foreground"
                    : "border-white/10 text-muted-foreground hover:border-white/25 hover:text-foreground"
                }`}
                style={on ? { borderColor: f.accent } : undefined}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: f.accent, boxShadow: on ? `0 0 8px ${f.accent}` : undefined }}
                />
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grille */}
      <section className="mx-auto w-full max-w-7xl px-6 py-10 md:py-14">
        <p className="mb-6 text-sm text-muted-foreground">
          {count} {noun}
          {count > 1 ? "s" : ""}
        </p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {showLogos
            ? LOGO_PROJECTS.map((l) => <LogoCard key={l.name} l={l} />)
            : projects.map((p) => <SiteCard key={p.slug} p={p} onOpen={setOpenP} />)}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto w-full max-w-5xl px-6 pb-16">
        <div className="rounded-2xl border border-white/10 bg-card/40 p-8 text-center shadow-card backdrop-blur">
          <h2 className="text-3xl font-bold md:text-4xl">Votre métier mérite la même image.</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
            Décrivez votre activité en 8 minutes : je vous dis ce qu'il faut et comment je peux m'en charger.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a
              href="/reservation-appel"
              data-event="cta_brief_portfolio_end"
              className="inline-flex items-center gap-2 rounded-full bg-primary-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]"
            >
              Faire le diagnostic <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-event="cta_calendly_portfolio_end"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-card/40 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur hover:border-white/30"
            >
              Réserver un appel
            </a>
          </div>
        </div>
      </section>

      <DeckFooter />

      {openP ? <CaseStudyModal p={openP} onClose={() => setOpenP(null)} /> : null}
    </div>
  );
}
