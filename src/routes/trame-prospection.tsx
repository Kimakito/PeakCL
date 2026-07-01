import { createFileRoute } from "@tanstack/react-router";
import {
  Calendar,
  ExternalLink,
  FileText,
  Maximize2,
  Minimize2,
  MousePointerClick,
  Sparkles,
  Target,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import logo from "@/assets/peakcl-logo.png";
import { TRAME_PROSPECTION_MARKDOWN } from "@/content/peakcl/trame-prospection-markdown";
import { absUrl } from "@/seo/site";

const MARKMAP_LOADER = "https://cdn.jsdelivr.net/npm/markmap-autoloader@0.18";

declare global {
  interface Window {
    markmap?: {
      autoLoader?: { manual?: boolean; renderAll?: () => void };
    };
  }
}

const LEGEND = [
  { emoji: "⚠️", label: "Règles" },
  { emoji: "1→7", label: "Trame" },
  { emoji: "🛡️", label: "Objections" },
  { emoji: "📋", label: "Suivi CRM" },
] as const;

export const Route = createFileRoute("/trame-prospection")({
  head: () => ({
    meta: [
      { title: "Trame prospection froide : mindmap (interne)" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
    ],
    links: [{ rel: "canonical", href: absUrl("/trame-prospection") }],
  }),
  component: TrameProspectionPage,
});

function ActionBtn({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: typeof FileText;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      title={label}
      aria-label={label}
      className="group inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-2.5 py-2 text-xs font-semibold text-foreground backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.08] sm:flex-none sm:px-3.5"
    >
      <Icon className="h-4 w-4 shrink-0 text-[var(--brand-turquoise)] sm:h-3.5 sm:w-3.5" />
      <span className="hidden sm:inline">{label}</span>
      <ExternalLink className="hidden h-3 w-3 opacity-40 sm:inline" />
    </a>
  );
}

function TrameProspectionPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.replaceChildren();
    const template = document.createElement("script");
    template.type = "text/template";
    template.textContent = TRAME_PROSPECTION_MARKDOWN;
    container.appendChild(template);

    window.markmap = window.markmap || {};
    window.markmap.autoLoader = { manual: true };

    let cancelled = false;

    /** Make the whole node clickable (not just the tiny fold circle). */
    const enhance = () => {
      const svg = container.querySelector("svg");
      if (!svg) return;
      svg.style.filter = "drop-shadow(0 0 1px oklch(1 0 0 / 18%))";
      svg.addEventListener("click", (e) => {
        const target = e.target as Element;
        if (target.tagName.toLowerCase() === "circle") return;
        const node = target.closest("g.markmap-node");
        const circle = node?.querySelector("circle");
        if (circle) {
          circle.dispatchEvent(
            new MouseEvent("click", { bubbles: true, cancelable: true, view: window }),
          );
        }
      });
    };

    const render = () => {
      if (cancelled) return;
      window.markmap?.autoLoader?.renderAll?.();
      setReady(true);
      setTimeout(enhance, 60);
    };

    if (window.markmap?.autoLoader?.renderAll) {
      render();
    } else {
      const existing = document.querySelector<HTMLScriptElement>("script[data-markmap-loader]");
      if (existing) {
        existing.addEventListener("load", render);
      } else {
        const script = document.createElement("script");
        script.src = MARKMAP_LOADER;
        script.async = true;
        script.dataset.markmapLoader = "1";
        script.addEventListener("load", render);
        document.body.appendChild(script);
      }
    }

    return () => {
      cancelled = true;
      container.replaceChildren();
      setReady(false);
    };
  }, []);

  return (
    <div
      className={`trame-prospection-studio relative flex h-dvh max-h-dvh flex-col overflow-hidden ${
        fullscreen ? "fixed inset-0 z-50" : ""
      }`}
    >
      <div className="trame-aurora" aria-hidden />
      <div className="trame-grid pointer-events-none absolute inset-0 z-0" aria-hidden />

      <header
        className="relative z-20 shrink-0 border-b border-white/[0.08] bg-[oklch(0.14_0.04_295/80%)] backdrop-blur-2xl"
        style={{ paddingTop: "max(0.5rem, env(safe-area-inset-top))" }}
      >
        <div className="mx-auto flex max-w-[1600px] flex-col gap-3 px-3 py-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4 sm:px-4 sm:py-3 md:px-6">
          <div className="flex min-w-0 items-center gap-2.5 sm:gap-3.5">
            <div className="relative shrink-0">
              <div
                className="absolute -inset-1 rounded-xl opacity-60 blur-md"
                style={{
                  background: "linear-gradient(135deg, var(--brand-violet), var(--brand-turquoise))",
                }}
                aria-hidden
              />
              <img
                src={logo}
                alt="PeakCL"
                className="relative h-9 w-9 rounded-lg object-cover ring-1 ring-white/15 sm:h-11 sm:w-11 sm:rounded-xl"
              />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <h1 className="font-display text-sm font-bold tracking-tight sm:text-base md:text-lg">
                  Trame <span className="text-gradient-anim">prospection</span>
                </h1>
                <span className="trame-chip text-[var(--brand-turquoise)]">
                  <Sparkles className="h-3 w-3" />
                  Interne
                </span>
              </div>
              <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-[10px] text-muted-foreground sm:text-[11px]">
                <span>Com digitale globale</span>
                <span className="hidden text-white/20 sm:inline">·</span>
                <span className="hidden sm:inline">Call ~45 min · Maj 10/06</span>
              </p>
            </div>
          </div>

          <div className="grid w-full grid-cols-3 gap-1.5 sm:flex sm:w-auto sm:flex-wrap sm:items-center sm:gap-2">
            <ActionBtn href="/reservation-appel" icon={FileText} label="Réservation" />
            <ActionBtn href="https://calendly.com/peakcl73/45min" icon={Calendar} label="Calendly" />
            <button
              type="button"
              onClick={() => setFullscreen((v) => !v)}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary-gradient px-2.5 py-2 text-xs font-semibold text-primary-foreground shadow-glow transition-all duration-300 hover:-translate-y-0.5 sm:flex-none sm:gap-2 sm:px-4"
            >
              {fullscreen ? (
                <>
                  <Minimize2 className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
                  <span className="hidden sm:inline">Quitter</span>
                </>
              ) : (
                <>
                  <Maximize2 className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
                  <span className="hidden sm:inline">Plein écran</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex min-h-0 flex-1 flex-col p-2 sm:p-3 md:p-5">
        <div className="trame-frame mx-auto flex min-h-0 w-full max-w-[1600px] flex-1 flex-col">
          <div className="trame-canvas relative min-h-0 flex-1">
            {!ready && (
              <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-4 bg-[oklch(0.14_0.04_295/95%)]">
                <div className="trame-loader-ring" />
                <div className="text-center">
                  <p className="font-display text-sm font-semibold text-foreground">
                    Construction de la mindmap
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Trame prospection froide · PeakCL
                  </p>
                </div>
              </div>
            )}

            {ready && (
              <div className="trame-hint pointer-events-none absolute bottom-2 left-1/2 z-20 -translate-x-1/2 px-2 text-center sm:bottom-3">
                <span className="inline-flex flex-wrap items-center justify-center gap-x-1.5 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-[10px] font-medium text-white/70 backdrop-blur-md sm:text-[11px]">
                  <MousePointerClick className="hidden h-3.5 w-3.5 text-[var(--brand-turquoise)] sm:inline" />
                  Clique un nœud pour déplier · molette pour zoomer · glisse pour déplacer
                </span>
              </div>
            )}

            <div
              ref={containerRef}
              className="trame-prospection-map markmap absolute inset-0 touch-pan-x touch-pan-y"
              aria-label="Mindmap trame de prospection froide"
            />
          </div>
        </div>

        {!fullscreen && (
          <footer
            className="mx-auto mt-2 flex w-full max-w-[1600px] shrink-0 flex-col items-start gap-2 px-1 sm:mt-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-3"
            style={{ paddingBottom: "max(0.25rem, env(safe-area-inset-bottom))" }}
          >
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {LEGEND.map((item) => (
                <span key={item.label} className="trame-chip text-muted-foreground">
                  <span aria-hidden>{item.emoji}</span>
                  {item.label}
                </span>
              ))}
            </div>
            <div className="hidden items-center gap-2 text-[11px] text-muted-foreground sm:flex">
              <Target className="h-3.5 w-3.5 shrink-0 text-[var(--brand-yellow)]" />
              Objectif : call diagnostic, pas de vente
            </div>
          </footer>
        )}
      </main>
    </div>
  );
}
