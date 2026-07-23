import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { useRouterState } from "@tanstack/react-router";
import { localeFromPath, type Locale } from "@/i18n/config";
import type { DeckProject } from "@/content/peakcl/portfolioDeck";

/**
 * Pellicule de cinéma horizontale : chaque projet est un photogramme.
 * Bornée (molette au survol, swipe tactile, flèches clavier) ; le scroll de la
 * page n'est jamais bloqué, aux extrémités il reprend normalement.
 *
 * Choix structurants :
 * - Le repli (`fallback`, la grille filtrable existante) est rendu au SSR et
 *   sous prefers-reduced-motion : le contenu reste indexable et accessible sans
 *   JS, et le mouvement réduit est respecté. Le mode pellicule ne s'active
 *   qu'au montage, quand le mouvement est autorisé.
 * - Le focus (agrandissement/net du photogramme central, flou/assombrissement
 *   des voisins) est appliqué en style inline impératif au scroll, hors React :
 *   pas de re-render par frame, on tient le 60fps. Seul l'index actif (pour le
 *   compteur) passe par un state, et seulement quand il change.
 */

type Strings = {
  reelLabel: string;
  prev: string;
  next: string;
  progress: (n: number, total: number) => string;
  inProgress: string;
  hint: string;
};

const STRINGS: Record<Locale, Strings> = {
  fr: {
    reelLabel: "Pellicule des projets",
    prev: "Projet précédent",
    next: "Projet suivant",
    progress: (n, total) => `${n} / ${total}`,
    inProgress: "en cours",
    hint: "Molette, glissez ou flèches ← →",
  },
  en: {
    reelLabel: "Project film reel",
    prev: "Previous project",
    next: "Next project",
    progress: (n, total) => `${n} / ${total}`,
    inProgress: "in progress",
    hint: "Scroll, swipe or use ← → keys",
  },
};

export function PortfolioReel({
  projects,
  onOpen,
  fallback,
  resetKey,
}: {
  projects: DeckProject[];
  onOpen: (p: DeckProject) => void;
  /** Grille filtrable existante : rendue au SSR et en mouvement réduit. */
  fallback: ReactNode;
  /** Change quand le filtre change : réinitialise la bobine au début. */
  resetKey?: string;
}) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const t = STRINGS[localeFromPath(path)];

  const viewportRef = useRef<HTMLDivElement>(null);
  const frameRefs = useRef<(HTMLElement | null)[]>([]);
  const [reelMode, setReelMode] = useState(false);
  const [active, setActive] = useState(0);

  // Bascule vers la pellicule seulement si le mouvement est autorisé.
  // Sinon on garde le repli (grille), rendu par défaut y compris au SSR.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const sync = () => setReelMode(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Focus au scroll : le photogramme le plus proche du centre est net et
  // agrandi ; les autres rétrécissent, s'assombrissent et floutent selon leur
  // distance. Écrit en style inline, sans re-render.
  const applyFocus = useCallback(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    const center = vp.scrollLeft + vp.clientWidth / 2;
    let nearest = 0;
    let nearestDist = Infinity;
    frameRefs.current.forEach((el, i) => {
      if (!el) return;
      const fc = el.offsetLeft + el.offsetWidth / 2;
      const d = Math.min(Math.abs(fc - center) / el.offsetWidth, 1);
      el.style.transform = `scale(${(1.05 - d * 0.15).toFixed(3)})`;
      el.style.opacity = `${(1 - d * 0.5).toFixed(3)}`;
      el.style.filter = d < 0.02 ? "none" : `blur(${(d * 1.6).toFixed(2)}px)`;
      el.style.zIndex = d < 0.5 ? "10" : "1";
      const ad = Math.abs(fc - center);
      if (ad < nearestDist) {
        nearestDist = ad;
        nearest = i;
      }
    });
    setActive((prev) => (prev === nearest ? prev : nearest));
  }, []);

  // Scroll (rAF) + molette (vertical -> horizontal, sans bloquer aux bords) +
  // flèches clavier. La molette exige un listener non passif pour preventDefault.
  useEffect(() => {
    if (!reelMode) return;
    const vp = viewportRef.current;
    if (!vp) return;
    let raf = 0;
    const onScroll = () => {
      if (!raf)
        raf = requestAnimationFrame(() => {
          raf = 0;
          applyFocus();
        });
    };
    const onWheel = (e: WheelEvent) => {
      const atStart = vp.scrollLeft <= 0;
      const atEnd = vp.scrollLeft >= vp.scrollWidth - vp.clientWidth - 1;
      const delta =
        Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      // Aux extrémités dans le sens de sortie : on laisse la page scroller.
      if ((delta < 0 && atStart) || (delta > 0 && atEnd)) return;
      e.preventDefault();
      vp.scrollLeft += delta;
    };

    applyFocus();
    vp.addEventListener("scroll", onScroll, { passive: true });
    vp.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      vp.removeEventListener("scroll", onScroll);
      vp.removeEventListener("wheel", onWheel);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reelMode, applyFocus]);

  // Réinitialise au début quand le filtre recompose la bobine.
  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp || !reelMode) return;
    vp.scrollTo({ left: 0, behavior: "smooth" });
    setActive(0);
  }, [resetKey, reelMode]);

  const scrollToFrame = (i: number) => {
    const el = frameRefs.current[i];
    el?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollToFrame(Math.min(active + 1, projects.length - 1));
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollToFrame(Math.max(active - 1, 0));
    }
  };

  if (!reelMode) return <>{fallback}</>;

  return (
    <div className="relative">
      <div
        role="group"
        aria-label={t.reelLabel}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="relative overflow-hidden rounded-2xl border border-border bg-[var(--indigo-900)] shadow-card outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-turquoise)]"
      >
        {/* Spotlight néon DANS la bande, au-dessus du fond mais derrière les
            photogrammes (frames en z-10) : sinon le fond opaque le masquerait. */}
        <div
          aria-hidden
          className="reel-spotlight pointer-events-none absolute inset-0 z-0"
        />

        <div
          ref={viewportRef}
          className="reel-viewport relative z-10 flex items-center gap-4 px-[42%] py-9"
        >
          {projects.map((p, i) => (
            <button
              key={p.slug ?? p.title}
              type="button"
              ref={(el) => {
                frameRefs.current[i] = el;
              }}
              onClick={() => onOpen(p)}
              data-event="portfolio_open"
              className="reel-frame group relative block w-[clamp(230px,60vw,400px)] cursor-pointer overflow-hidden rounded-xl border border-border bg-black/40 text-left"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                {p.shot ? (
                  <img
                    src={p.shot}
                    alt={`${p.title}`}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover object-top"
                  />
                ) : (
                  <div
                    className="absolute inset-0 flex items-center justify-center text-center text-xs text-muted-foreground"
                    style={{
                      background: `radial-gradient(circle at 50% 40%, ${p.accent}22, transparent 70%)`,
                    }}
                  >
                    {p.title}
                  </div>
                )}
                {p.status !== "construction" ? (
                  <span className="absolute right-2 top-2 rounded-full bg-black/50 p-1 text-muted-foreground backdrop-blur">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                ) : null}
              </div>
              <figcaption className="flex items-center justify-between gap-2 border-t border-border px-3 py-2.5">
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold">
                    {p.title}
                  </div>
                  {p.subtitle ? (
                    <div className="truncate text-xs text-muted-foreground">
                      {p.subtitle}
                    </div>
                  ) : null}
                </div>
                {p.status === "construction" ? (
                  <span className="shrink-0 rounded-full border border-border bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                    {t.inProgress}
                  </span>
                ) : null}
              </figcaption>
            </button>
          ))}
        </div>

        {/* Habillage film, par-dessus les photogrammes : perforations 35mm en
            haut/bas, grain et vignette. Tous décoratifs, non cliquables. */}
        <div
          aria-hidden
          className="reel-perf pointer-events-none absolute inset-x-0 top-0 z-20 h-4"
        />
        <div
          aria-hidden
          className="reel-perf pointer-events-none absolute inset-x-0 bottom-0 z-20 h-4"
        />
        <div
          aria-hidden
          className="reel-grain pointer-events-none absolute inset-0 z-20"
        />
        <div
          aria-hidden
          className="reel-vignette pointer-events-none absolute inset-0 z-20"
        />
      </div>

      {/* Contrôles : flèches + compteur façon pellicule. */}
      <div className="mt-4 flex items-center justify-center gap-4">
        <button
          type="button"
          aria-label={t.prev}
          onClick={() => scrollToFrame(Math.max(active - 1, 0))}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-muted text-foreground transition-colors hover:border-border disabled:opacity-30"
          disabled={active === 0}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex flex-col items-center gap-1">
          <span className="font-mono text-xs tabular-nums text-muted-foreground">
            {t.progress(active + 1, projects.length)}
          </span>
          <div className="h-1 w-32 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,var(--brand-violet),var(--brand-turquoise))] transition-[width] duration-300"
              style={{
                width: `${((active + 1) / Math.max(projects.length, 1)) * 100}%`,
              }}
            />
          </div>
        </div>

        <button
          type="button"
          aria-label={t.next}
          onClick={() =>
            scrollToFrame(Math.min(active + 1, projects.length - 1))
          }
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-muted text-foreground transition-colors hover:border-border disabled:opacity-30"
          disabled={active === projects.length - 1}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <p className="mt-2 text-center text-[11px] text-muted-foreground/60">
        {t.hint}
      </p>
    </div>
  );
}
