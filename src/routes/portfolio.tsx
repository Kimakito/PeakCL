import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useCallback, useEffect } from "react";
import {
  CATEGORIES,
  DECK_PROJECTS,
  LOGO_PROJECTS,
  liveCount,
  categoryProjects,
  type Category,
  type DeckProject,
} from "@/content/peakcl/portfolioDeck";
import { DeckFooter } from "@/components/DeckFooter";
import { absUrl } from "@/seo/site";
import { breadcrumbJsonLd } from "@/seo/jsonld";
import logo from "@/assets/peakcl-logo.png";
import { SnapPage, SnapSection, SectionDots } from "@/components/SnapPage";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio · PeakCL" },
      {
        name: "description",
        content:
          "Réalisations PeakCL par métier : sites vitrines, e-commerce, branding. Parcourez les projets secteur par secteur.",
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

const domainOf = (url?: string) => {
  if (!url) return "site en cours";
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
};

/* ── Panneaux ────────────────────────────────────────────────── */
const PANEL_CATS: Category[] = CATEGORIES.filter((c) =>
  DECK_PROJECTS.some((p) => p.category === c.slug),
);
type PanelDef = { id: string; label: string; accent: string };
const PANELS: PanelDef[] = [
  { id: "intro", label: "Accueil portfolio", accent: "#00E5D4" },
  ...PANEL_CATS.map((c) => ({ id: c.slug, label: c.short, accent: c.accent })),
  { id: "logos", label: "Logos créés", accent: "#EC4899" },
  { id: "contact", label: "Travailler ensemble", accent: "#FFD500" },
  { id: "footer", label: "Liens & contact", accent: "#7B3FF2" },
];

/* ── Carte site (élément de grille) ──────────────────────────── */
function SiteCard({ p }: { p: DeckProject }) {
  const Inner = (
    <>
      <div
        className="pointer-events-none absolute -inset-4 -z-10 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30"
        style={{ background: p.accent }}
        aria-hidden
      />
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/5 px-3 py-1.5">
        <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
        <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
        <span className="h-2 w-2 rounded-full bg-[#28c840]" />
        <span className="ml-1.5 truncate rounded bg-black/30 px-1.5 py-0.5 text-[10px] text-white/50">
          {domainOf(p.siteUrl)}
        </span>
      </div>
      <div className="relative aspect-[1600/815] overflow-hidden bg-[#0c0c16]">
        {p.shot ? (
          <img
            src={p.shot}
            alt={`Aperçu du site ${p.title}`}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
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
      </div>
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

  const cls =
    "group relative block overflow-hidden rounded-2xl border border-white/5 bg-card/40 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-white/15";
  return p.siteUrl ? (
    <a
      href={p.siteUrl}
      target="_blank"
      rel="noreferrer"
      data-event="portfolio_visit"
      className={cls}
    >
      {Inner}
    </a>
  ) : (
    <div className={cls}>{Inner}</div>
  );
}

/* ── Panneau catégorie (grille) ──────────────────────────────── */
function CategoryPanel({ cat }: { cat: Category }) {
  const items = categoryProjects(cat.slug);
  const n = liveCount(cat.slug);
  return (
    <section className="flex h-full w-full items-center overflow-hidden">
      <div className="mx-auto w-full max-w-7xl px-8 md:px-12">
        <div className="mb-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <div className="flex items-center gap-3">
            <span
              className="h-3 w-3 rounded-full"
              style={{ background: cat.accent }}
            />
            <h2 className="text-2xl font-bold md:text-4xl">{cat.label}</h2>
          </div>
          <span className="text-sm text-muted-foreground">
            {n > 0 ? `${n} réalisation${n > 1 ? "s" : ""}` : "bientôt"}
          </span>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <SiteCard key={p.slug} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function IntroPanel({ onNavigate }: { onNavigate: (id: string) => void }) {
  return (
    <section className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden text-center">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-turquoise)]">
        Portfolio · par métier
      </span>
      <h1 className="mt-4 max-w-4xl text-balance px-6 text-4xl font-bold leading-tight md:text-6xl">
        Ils m'ont fait <span className="text-gradient">confiance</span>.
      </h1>
      <p className="mx-auto mt-5 max-w-2xl px-6 text-muted-foreground">
        Cliquez sur votre métier : chaque section rassemble les projets que j'ai
        livrés dans ce secteur.
      </p>
      <div className="mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-2 px-6">
        {PANEL_CATS.map((c) => (
          <button
            key={c.slug}
            onClick={() => onNavigate(c.slug)}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-card/40 px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:scale-[1.04] hover:text-foreground"
            style={{ borderColor: `${c.accent}55` }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: c.accent }}
            />
            {c.short}
          </button>
        ))}
      </div>
      <img
        src="/peakcl/avatar-tablette.webp"
        alt=""
        aria-hidden
        className="pointer-events-none mt-8 hidden h-40 w-auto select-none opacity-90 md:block"
      />
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce text-xs text-white/30 hidden md:block">
        scroll →
      </div>
    </section>
  );
}

function ContactPanel() {
  return (
    <section className="flex h-full w-full flex-col items-center justify-center px-6 text-center">
      <h2 className="text-3xl font-bold md:text-4xl">
        Votre métier mérite la même image.
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
        Décrivez votre activité en 8 minutes : je vous dis ce qu'il faut et
        comment je peux m'en charger.
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
    </section>
  );
}

function LogosPanel() {
  return (
    <section className="flex h-full w-full items-center overflow-hidden">
      <div className="mx-auto w-full max-w-7xl px-8 md:px-12">
        <div className="mb-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <div className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-[#EC4899]" />
            <h2 className="text-2xl font-bold md:text-4xl">Logos créés</h2>
          </div>
          <span className="text-sm text-muted-foreground">
            {LOGO_PROJECTS.length} créations
          </span>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {LOGO_PROJECTS.map((l) => (
            <div
              key={l.name}
              className="group overflow-hidden rounded-2xl border border-white/5 bg-card/40 shadow-card"
            >
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
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: l.accent }}
                  />
                  <h3 className="text-sm font-semibold">{l.name}</h3>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {l.metier}
                </p>
                {l.note ? (
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground/70">
                    {l.note}
                  </p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function renderPanel(id: string, onNavigate: (id: string) => void) {
  if (id === "intro") return <IntroPanel onNavigate={onNavigate} />;
  if (id === "logos") return <LogosPanel />;
  if (id === "contact") return <ContactPanel />;
  if (id === "footer") return <DeckFooter />;
  const cat = CATEGORIES.find((c) => c.slug === id);
  return cat ? <CategoryPanel cat={cat} /> : null;
}

/* ── Page ────────────────────────────────────────────────────── */
function PortfolioPage() {
  const scrollToId = useCallback((id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("cat");
    if (q && PANELS.some((p) => p.id === q)) scrollToId(q);
  }, [scrollToId]);

  return (
    <div className="relative bg-background text-foreground">
      {/* Desktop : scroll vertical intelligent (snap par section) */}
      <div className="hidden md:block">
        <SectionDots
          sections={PANELS.map((s) => ({ id: s.id, label: s.label }))}
        />
        <SnapPage>
          {PANELS.map((s) => (
            <SnapSection
              key={s.id}
              id={s.id}
              className="flex items-center justify-center pl-16"
            >
              {renderPanel(s.id, scrollToId)}
            </SnapSection>
          ))}
        </SnapPage>
      </div>

      {/* Mobile : empilement vertical */}
      <div className="md:hidden">
        <header className="sticky top-0 z-50 flex items-center justify-between border-b border-white/5 bg-background/80 px-5 py-3 backdrop-blur-xl">
          <a href="/" className="flex items-center gap-2">
            <img
              src={logo}
              alt="PeakCL"
              className="h-7 w-7 rounded-md object-cover"
            />
            <span className="font-display text-base font-bold">
              Peak<span className="text-gradient">CL</span>
            </span>
          </a>
          <a
            href="/reservation-appel"
            className="rounded-full bg-primary-gradient px-4 py-1.5 text-xs font-semibold text-primary-foreground shadow-glow"
          >
            Réserver
          </a>
        </header>
        <div className="space-y-14 py-12">
          <IntroPanel onNavigate={() => {}} />
          {PANEL_CATS.map((c) => (
            <div key={c.slug} className="min-h-[60vh]">
              <CategoryPanel cat={c} />
            </div>
          ))}
          <div className="min-h-[60vh]">
            <LogosPanel />
          </div>
          <ContactPanel />
          <DeckFooter />
        </div>
      </div>
    </div>
  );
}
