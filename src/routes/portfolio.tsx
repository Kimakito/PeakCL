import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
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
      { property: "og:description", content: "Des projets concrets, par métier. Un seul interlocuteur pour toute votre image en ligne." },
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
const PANEL_CATS: Category[] = CATEGORIES.filter((c) => DECK_PROJECTS.some((p) => p.category === c.slug));
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
      <div className="pointer-events-none absolute -inset-4 -z-10 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30" style={{ background: p.accent }} aria-hidden />
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/5 px-3 py-1.5">
        <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
        <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
        <span className="h-2 w-2 rounded-full bg-[#28c840]" />
        <span className="ml-1.5 truncate rounded bg-black/30 px-1.5 py-0.5 text-[10px] text-white/50">{domainOf(p.siteUrl)}</span>
      </div>
      <div className="relative aspect-[1600/815] overflow-hidden bg-[#0c0c16]">
        {p.shot ? (
          <img src={p.shot} alt={`Aperçu du site ${p.title}`} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-center text-xs text-white/40" style={{ background: `radial-gradient(circle at 50% 40%, ${p.accent}22, transparent 70%)` }}>
            Aperçu bientôt disponible
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="truncate text-sm font-semibold">{p.title}</h3>
          {p.status === "construction" ? (
            <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-muted-foreground">en cours</span>
          ) : (
            <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
          )}
        </div>
        {p.subtitle ? <p className="mt-0.5 truncate text-xs text-muted-foreground">{p.subtitle}</p> : null}
      </div>
    </>
  );

  const cls = "group relative block overflow-hidden rounded-2xl border border-white/5 bg-card/40 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-white/15";
  return p.siteUrl ? (
    <a href={p.siteUrl} target="_blank" rel="noreferrer" data-event="portfolio_visit" className={cls}>{Inner}</a>
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
            <span className="h-3 w-3 rounded-full" style={{ background: cat.accent }} />
            <h2 className="text-2xl font-bold md:text-4xl">{cat.label}</h2>
          </div>
          <span className="text-sm text-muted-foreground">{n > 0 ? `${n} réalisation${n > 1 ? "s" : ""}` : "bientôt"}</span>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => <SiteCard key={p.slug} p={p} />)}
        </div>
      </div>
    </section>
  );
}

function IntroPanel({ onNavigate }: { onNavigate: (i: number) => void }) {
  return (
    <section className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden text-center">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-turquoise)]">Portfolio · par métier</span>
      <h1 className="mt-4 max-w-4xl text-balance px-6 text-4xl font-bold leading-tight md:text-6xl">
        Ils m'ont fait <span className="text-gradient">confiance</span>.
      </h1>
      <p className="mx-auto mt-5 max-w-2xl px-6 text-muted-foreground">
        Cliquez sur votre métier — chaque écran rassemble les projets que j'ai livrés dans ce secteur.
      </p>
      <div className="mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-2 px-6">
        {PANEL_CATS.map((c) => {
          const idx = PANELS.findIndex((p) => p.id === c.slug);
          return (
            <button
              key={c.slug}
              onClick={() => onNavigate(idx)}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-card/40 px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:scale-[1.04] hover:text-foreground"
              style={{ borderColor: `${c.accent}55` }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: c.accent }} />
              {c.short}
            </button>
          );
        })}
      </div>
      <img src="/peakcl/avatar-tablette.webp" alt="" aria-hidden className="pointer-events-none mt-8 hidden h-40 w-auto select-none opacity-90 md:block" />
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 animate-bounce text-xs text-white/30 hidden md:block">scroll →</div>
    </section>
  );
}

function ContactPanel() {
  return (
    <section className="flex h-full w-full flex-col items-center justify-center px-6 text-center">
      <h2 className="text-3xl font-bold md:text-4xl">Votre métier mérite la même image.</h2>
      <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
        Décrivez votre activité en 8 minutes : je vous dis ce qu'il faut et comment je peux m'en charger.
      </p>
      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        <a href="/reservation-appel" data-event="cta_brief_portfolio_end" className="inline-flex items-center gap-2 rounded-full bg-primary-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]">
          Faire le diagnostic <ArrowRight className="h-4 w-4" />
        </a>
        <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" data-event="cta_calendly_portfolio_end" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-card/40 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur hover:border-white/30">
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
          <span className="text-sm text-muted-foreground">{LOGO_PROJECTS.length} créations</span>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {LOGO_PROJECTS.map((l) => (
            <div key={l.name} className="group overflow-hidden rounded-2xl border border-white/5 bg-card/40 shadow-card">
              <div className="flex h-44 items-center justify-center bg-white p-8">
                <img src={l.file} alt={`Logo ${l.name}`} loading="lazy" decoding="async" className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ background: l.accent }} />
                  <h3 className="text-sm font-semibold">{l.name}</h3>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">{l.metier}</p>
                {l.note ? <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground/70">{l.note}</p> : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function renderPanel(id: string, onNavigate: (i: number) => void) {
  if (id === "intro") return <IntroPanel onNavigate={onNavigate} />;
  if (id === "logos") return <LogosPanel />;
  if (id === "contact") return <ContactPanel />;
  if (id === "footer") return <DeckFooter />;
  const cat = CATEGORIES.find((c) => c.slug === id);
  return cat ? <CategoryPanel cat={cat} /> : null;
}

/* ── Navbar verticale gauche (fixe) ──────────────────────────── */
function SideNav({ activeIdx, onNavigate }: { activeIdx: number; onNavigate: (i: number) => void }) {
  return (
    <nav aria-label="Navigation portfolio" className="fixed left-0 top-0 z-50 hidden h-full w-16 flex-col items-center justify-center gap-3 md:flex">
      <div className="flex flex-col items-center gap-3">
        <a href="/" title="Accueil" className="mb-4 flex items-center justify-center">
          <img src={logo} alt="PeakCL" width={28} height={28} className="h-7 w-7 rounded-md object-cover opacity-80 hover:opacity-100" />
        </a>
        {PANELS.map((s, i) => (
          <button key={s.id} onClick={() => onNavigate(i)} title={s.label} className="group relative flex items-center justify-center">
            <span className={`block h-2 w-2 rounded-full transition-all duration-300 ${i === activeIdx ? "scale-150 shadow-[0_0_8px_currentColor]" : "bg-white/25 group-hover:bg-white/60"}`} style={i === activeIdx ? { background: s.accent, color: s.accent } : undefined} />
            <span className="pointer-events-none absolute left-8 whitespace-nowrap rounded-md bg-card/90 px-2 py-1 text-xs font-medium opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">{s.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

/* ── Timeline bas + avatar qui marche ────────────────────────── */
function Timeline({ activeIdx, total, onNavigate }: { activeIdx: number; total: number; onNavigate: (i: number) => void }) {
  const pct = total > 1 ? (activeIdx / (total - 1)) * 100 : 0;
  const prev = useRef(activeIdx);
  const [facingRight, setFacingRight] = useState(true);
  useEffect(() => {
    if (activeIdx > prev.current) setFacingRight(true);
    else if (activeIdx < prev.current) setFacingRight(false);
    prev.current = activeIdx;
  }, [activeIdx]);
  return (
    <div className="fixed bottom-0 left-16 right-0 z-40 hidden h-16 items-center px-8 md:flex">
      <div className="relative flex w-full items-center">
        <div className="h-px w-full bg-white/10" />
        <div className="absolute left-0 h-px bg-gradient-to-r from-[var(--brand-violet)] via-[var(--brand-turquoise)] to-[var(--brand-yellow)] transition-all duration-500" style={{ width: `${pct}%` }} />
        {PANELS.map((s, i) => (
          <button key={s.id} onClick={() => onNavigate(i)} title={s.label} className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ left: `${(i / (total - 1)) * 100}%` }}>
            <span className={`block h-2 w-2 rounded-full transition-all duration-300 ${i === activeIdx ? "scale-150" : i < activeIdx ? "" : "bg-white/20"}`} style={i <= activeIdx ? { background: i === activeIdx ? s.accent : "var(--brand-violet)" } : undefined} />
          </button>
        ))}
        <div className="absolute bottom-1/2 -translate-x-1/2 transition-all duration-500" style={{ left: `${pct}%` }}>
          <div style={{ transform: facingRight ? "scaleX(-1)" : "scaleX(1)" }}>
            <div className="mascot-walk">
              <img src="/peakcl/avatar-marche.webp" alt="" aria-hidden className="h-16 w-auto select-none drop-shadow-[0_0_12px_color-mix(in_oklab,var(--brand-turquoise)_60%,transparent)]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────── */
function PortfolioPage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const deckRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);

  const navigateTo = useCallback((i: number) => {
    const clamped = Math.max(0, Math.min(PANELS.length - 1, i));
    setActiveIdx(clamped);
    const panel = deckRef.current?.children[clamped] as HTMLElement | undefined;
    panel?.scrollIntoView({ behavior: "smooth", inline: "start" });
  }, []);

  useEffect(() => {
    const deck = deckRef.current;
    if (!deck) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling.current) return;
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(delta) < 3) return;
      isScrolling.current = true;
      setActiveIdx((prev) => {
        const next = delta > 0 ? Math.min(PANELS.length - 1, prev + 1) : Math.max(0, prev - 1);
        (deck.children[next] as HTMLElement | undefined)?.scrollIntoView({ behavior: "smooth", inline: "start" });
        return next;
      });
      setTimeout(() => { isScrolling.current = false; }, 750);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); navigateTo(activeIdx + 1); }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); navigateTo(activeIdx - 1); }
    };
    deck.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    return () => {
      deck.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
    };
  }, [activeIdx, navigateTo]);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("cat");
    if (q) {
      const idx = PANELS.findIndex((p) => p.id === q);
      if (idx > 0) navigateTo(idx);
    }
  }, [navigateTo]);

  return (
    <div className="relative bg-background text-foreground">
      {/* Desktop : deck horizontal */}
      <div ref={deckRef} className="hidden h-screen w-full flex-row overflow-x-hidden md:flex" style={{ scrollSnapType: "x mandatory" }}>
        {PANELS.map((s) => (
          <div key={s.id} className="h-screen w-screen shrink-0 pl-16 pb-16" style={{ scrollSnapAlign: "start" }}>
            {renderPanel(s.id, navigateTo)}
          </div>
        ))}
      </div>
      <Timeline activeIdx={activeIdx} total={PANELS.length} onNavigate={navigateTo} />

      {/* Mobile : empilement vertical */}
      <div className="md:hidden">
        <header className="sticky top-0 z-50 flex items-center justify-between border-b border-white/5 bg-background/80 px-5 py-3 backdrop-blur-xl">
          <a href="/" className="flex items-center gap-2">
            <img src={logo} alt="PeakCL" className="h-7 w-7 rounded-md object-cover" />
            <span className="font-display text-base font-bold">Peak<span className="text-gradient">CL</span></span>
          </a>
          <a href="/reservation-appel" className="rounded-full bg-primary-gradient px-4 py-1.5 text-xs font-semibold text-primary-foreground shadow-glow">Réserver</a>
        </header>
        <div className="space-y-14 py-12">
          <IntroPanel onNavigate={() => {}} />
          {PANEL_CATS.map((c) => <div key={c.slug} className="min-h-[60vh]"><CategoryPanel cat={c} /></div>)}
          <div className="min-h-[60vh]"><LogosPanel /></div>
          <ContactPanel />
          <DeckFooter />
        </div>
      </div>
    </div>
  );
}
