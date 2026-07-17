import { useEffect, useRef, useState } from "react";

/**
 * Bloc « terminal » de la page Qui suis-je : les commandes se tapent
 * caractère par caractère quand le bloc entre dans le viewport, les sorties
 * s'affichent d'un coup (comme un vrai shell).
 *
 * Contraintes tenues :
 * - Le texte complet est dans le DOM au rendu SSR (masqué en CSS, pas retiré),
 *   donc indexable et lisible par les lecteurs d'écran.
 * - `prefers-reduced-motion: reduce` => tout est affiché immédiatement.
 * - Les invites ($, ~) sont aria-hidden : bruit inutile à l'oral.
 */

type Line =
  | { kind: "cmd"; text: string }
  | { kind: "out"; text: string; tone?: "accent" | "strong" }
  | { kind: "gap" };

const LINES: Line[] = [
  { kind: "cmd", text: "whoami" },
  { kind: "out", text: "charlotte lacroix", tone: "strong" },
  {
    kind: "out",
    text: "développeuse web & graphiste, Gilly-sur-Isère (Savoie)",
  },
  { kind: "gap" },

  { kind: "cmd", text: "ls ~/competences" },
  {
    kind: "out",
    text: "code/     design/     community-management/",
    tone: "accent",
  },
  { kind: "gap" },

  { kind: "cmd", text: "ls ~/projets | wc -l" },
  { kind: "out", text: "19", tone: "strong" },
  { kind: "out", text: "# 19 projets livrés, notés 5/5 sur Google" },
  { kind: "gap" },

  { kind: "cmd", text: "cat stack.txt" },
  { kind: "out", text: "Sites codés à la main, sans CMS ni plugins." },
  { kind: "out", text: "Core Web Vitals au vert, SEO local propre." },
];

const TYPE_MS = 30;
const AFTER_CMD_MS = 300;
const AFTER_OUT_MS = 90;
const GAP_MS = 180;

export function TerminalBio({ className = "" }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  // step = nombre de lignes entièrement révélées ; chars = avancement de la ligne en cours.
  const [step, setStep] = useState(0);
  const [chars, setChars] = useState(0);
  const [started, setStarted] = useState(false);
  const [jsReady, setJsReady] = useState(false);

  // Une fois monté, on prend la main sur l'affichage : les lignes non révélées
  // passent en opacity 0. Avant ça (SSR / pas de JS), tout reste visible.
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return; // on ne masque rien : lecture statique
    setJsReady(true);
  }, []);

  useEffect(() => {
    if (!jsReady || started) return;
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [jsReady, started]);

  useEffect(() => {
    if (!started) return;
    let cancelled = false;
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    (async () => {
      for (let i = 0; i < LINES.length; i++) {
        const line = LINES[i];
        if (line.kind === "cmd") {
          for (let c = 1; c <= line.text.length; c++) {
            if (cancelled) return;
            setChars(c);
            await sleep(TYPE_MS);
          }
          await sleep(AFTER_CMD_MS);
        } else {
          await sleep(line.kind === "gap" ? GAP_MS : AFTER_OUT_MS);
        }
        if (cancelled) return;
        setStep(i + 1);
        setChars(0);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [started]);

  const done = step >= LINES.length;

  return (
    <div
      ref={rootRef}
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-[oklch(0.19_0.04_290)] shadow-card ${className}`}
    >
      {/* Barre de titre : les 3 pastilles reprennent les couleurs de marque. */}
      <div
        aria-hidden
        className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3"
      >
        <span className="h-3 w-3 rounded-full bg-[var(--brand-yellow)]/80" />
        <span className="h-3 w-3 rounded-full bg-[var(--brand-turquoise)]/80" />
        <span className="h-3 w-3 rounded-full bg-white/25" />
        <span className="ml-2 font-mono text-xs text-muted-foreground">
          charlotte@peakcl : ~/qui-suis-je
        </span>
      </div>

      <div className="overflow-x-auto px-4 py-5 font-mono text-[13px] leading-relaxed sm:px-6 sm:text-sm">
        {LINES.map((line, i) => {
          if (line.kind === "gap") {
            return <div key={i} className="h-3" aria-hidden />;
          }

          const typing = jsReady && i === step && line.kind === "cmd";
          const hidden = jsReady && i > step;
          const text = typing ? line.text.slice(0, chars) : line.text;

          return (
            // Le texte reste dans le DOM même masqué : lecteurs d'écran + indexation.
            <div
              key={i}
              className={`whitespace-pre transition-opacity duration-150 ${
                hidden ? "opacity-0" : "opacity-100"
              }`}
            >
              {line.kind === "cmd" ? (
                <>
                  <span
                    aria-hidden
                    className="select-none text-[var(--brand-turquoise)]"
                  >
                    ${" "}
                  </span>
                  <span className="text-foreground">{text}</span>
                  {typing && <Cursor />}
                </>
              ) : (
                <span
                  className={
                    line.tone === "strong"
                      ? "text-foreground"
                      : line.tone === "accent"
                        ? "text-[var(--brand-yellow)]"
                        : "text-muted-foreground"
                  }
                >
                  {text}
                </span>
              )}
            </div>
          );
        })}

        {/* Invite finale, une fois le script terminé. */}
        <div
          className={`transition-opacity duration-200 ${
            !jsReady || done ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden
        >
          <span className="select-none text-[var(--brand-turquoise)]">$ </span>
          <Cursor />
        </div>
      </div>
    </div>
  );
}

function Cursor() {
  return (
    <span
      aria-hidden
      className="ml-0.5 inline-block h-[1em] w-[0.55em] translate-y-[0.15em] animate-pulse bg-[var(--brand-turquoise)]"
    />
  );
}
