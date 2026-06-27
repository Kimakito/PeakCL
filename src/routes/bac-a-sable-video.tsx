import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import logo from "@/assets/peakcl-logo.png";
import { absUrl } from "@/seo/site";

const STORAGE_KEY = "peakcl-bac-a-sable-video-text";
const DEFAULT_TEXT = `Let's go pour la démo

Alors, on parle de quoi aujourd'hui ?`;

export const Route = createFileRoute("/bac-a-sable-video")({
  head: () => ({
    meta: [
      { title: "Bac à sable vidéo · PeakCL (interne)" },
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: [
      { rel: "canonical", href: absUrl("/bac-a-sable-video") },
      {
        rel: "preload",
        href: "/fonts/StyleScript-Regular.ttf",
        as: "font",
        type: "font/ttf",
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        href: "/fonts/Gabriela-Regular.ttf",
        as: "font",
        type: "font/ttf",
        crossOrigin: "anonymous",
      },
    ],
  }),
  component: BacASableVideoPage,
});

const W = 1080;
const H = 1920;

function StageBtn({
  label,
  onClick,
  accent,
}: {
  label: string;
  onClick: () => void;
  accent: "yellow" | "teal" | "violet";
}) {
  const border =
    accent === "yellow"
      ? "border-[color-mix(in_oklab,var(--brand-yellow)_50%,transparent)] text-[var(--brand-yellow)]"
      : accent === "teal"
        ? "border-[color-mix(in_oklab,var(--brand-turquoise)_50%,transparent)] text-[var(--brand-turquoise)]"
        : "border-[color-mix(in_oklab,var(--brand-violet)_50%,transparent)] text-white";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`font-gabriela rounded-xl border bg-black/30 px-4 py-2 text-base backdrop-blur hover:bg-black/45 ${border}`}
    >
      {label}
    </button>
  );
}

function BacASableVideoPage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState(DEFAULT_TEXT);
  const [recordMode, setRecordMode] = useState(false);
  const [scale, setScale] = useState(0.45);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setText(saved);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, text);
    } catch {
      /* ignore */
    }
  }, [text]);

  const updateScale = useCallback(() => {
    if (recordMode) return;
    const pad = 48;
    const sx = (window.innerWidth - pad) / W;
    const sy = (window.innerHeight - 120 - pad) / H;
    setScale(Math.min(sx, sy, 1));
  }, [recordMode]);

  useEffect(() => {
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [updateScale]);

  const focusTextarea = () => textareaRef.current?.focus();

  const execClipboard = async (action: "copy" | "cut" | "paste") => {
    const el = textareaRef.current;
    if (!el) return;
    el.focus();
    if (action === "paste") {
      try {
        const clip = await navigator.clipboard.readText();
        const start = el.selectionStart;
        const end = el.selectionEnd;
        const next = text.slice(0, start) + clip + text.slice(end);
        setText(next);
        const pos = start + clip.length;
        requestAnimationFrame(() => el.setSelectionRange(pos, pos));
      } catch {
        document.execCommand("paste");
      }
      return;
    }
    document.execCommand(action);
  };

  const toolbar = (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={() => execClipboard("cut")}
        className="rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-white/15"
      >
        Couper
      </button>
      <button
        type="button"
        onClick={() => execClipboard("copy")}
        className="rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-white/15"
      >
        Copier
      </button>
      <button
        type="button"
        onClick={() => execClipboard("paste")}
        className="rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-white/15"
      >
        Coller
      </button>
      <button
        type="button"
        onClick={() => {
          setText("");
          focusTextarea();
        }}
        className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground"
      >
        Vider
      </button>
      <button
        type="button"
        onClick={() => {
          setText(DEFAULT_TEXT);
          focusTextarea();
        }}
        className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground"
      >
        Texte démo
      </button>
    </div>
  );

  return (
    <div
      className={
        recordMode
          ? "min-h-screen bg-black"
          : "min-h-screen bg-[#0a0a0f] text-foreground"
      }
    >
      {!recordMode && (
        <header className="sticky top-0 z-50 border-b border-white/10 bg-background/90 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3">
            <div>
              <h1 className="font-display text-sm font-bold">Bac à sable vidéo</h1>
              <p className="text-xs text-muted-foreground">
                Zone {W}×{H} px · Story / Reel / TikTok · peakcl.com/bac-a-sable-video
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {toolbar}
              <button
                type="button"
                onClick={() => setRecordMode(true)}
                className="rounded-full bg-primary-gradient px-4 py-2 text-xs font-semibold text-primary-foreground shadow-glow"
              >
                Mode capture (1080×1920)
              </button>
            </div>
          </div>
        </header>
      )}

      {recordMode && (
        <button
          type="button"
          onClick={() => setRecordMode(false)}
          className="fixed right-4 top-4 z-[100] rounded-full border border-white/20 bg-black/70 px-4 py-2 text-xs font-semibold text-white backdrop-blur hover:bg-black/90"
        >
          Quitter le mode capture
        </button>
      )}

      <div
        className={
          recordMode
            ? "flex min-h-screen items-center justify-center overflow-auto p-0"
            : "flex justify-center overflow-auto px-4 py-8"
        }
      >
        <div
          style={
            recordMode
              ? undefined
              : {
                  transform: `scale(${scale})`,
                  transformOrigin: "top center",
                }
          }
        >
          <div
            ref={stageRef}
            id="peakcl-video-stage"
            className="bac-sable-studio relative overflow-hidden shadow-2xl"
            style={{
              width: W,
              height: H,
              flexShrink: 0,
            }}
          >
            {/* Fond PeakCL */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(160deg, #1a1230 0%, #2a1a52 45%, #1a2840 100%)",
              }}
            />
            <div className="bg-aurora absolute inset-[-20%] opacity-90" aria-hidden />
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
                `,
                backgroundSize: "56px 56px",
              }}
              aria-hidden
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-1"
              style={{
                background:
                  "linear-gradient(90deg, #6d0497, #7b3ff2 30%, #00e5d4 55%, #ffd500 85%, transparent)",
              }}
              aria-hidden
            />

            {/* Contenu */}
            <div className="relative z-10 flex h-full flex-col px-12 pt-14 pb-16">
              <div className="flex items-center gap-4">
                <img
                  src={logo}
                  alt="PeakCL"
                  className="h-16 w-16 rounded-xl object-cover shadow-lg ring-2 ring-white/10"
                />
                <div>
                  <div className="font-gabriela text-3xl tracking-tight text-white">
                    Peak<span className="text-gradient">CL</span>
                  </div>
                  <div className="font-gabriela text-lg text-white/55">peakcl.com</div>
                </div>
              </div>

              <h2 className="font-script mt-8 text-[4.25rem] leading-[1.05] text-white">
                Les raccourcis qui font{" "}
                <span className="text-gradient">gagner du temps</span>
              </h2>

              <p className="font-gabriela mt-5 text-2xl text-white/60">
                Cliquez et apprenez à bosser efficacement !
              </p>

              {/* Zone démo (dans le cadre capture) */}
              <div className="mt-8 flex min-h-0 flex-1 flex-col rounded-3xl border border-white/15 bg-white/[0.06] p-3 shadow-card backdrop-blur-sm">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-3 px-2">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                    <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                    <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                    <span className="font-gabriela ml-2 text-lg text-white/45">
                      Zone de texte
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <StageBtn label="Couper" onClick={() => execClipboard("cut")} accent="yellow" />
                    <StageBtn label="Copier" onClick={() => execClipboard("copy")} accent="teal" />
                    <StageBtn label="Coller" onClick={() => execClipboard("paste")} accent="violet" />
                  </div>
                </div>

                <textarea
                  ref={textareaRef}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  spellCheck={false}
                  className="font-gabriela min-h-0 w-full flex-1 resize-none rounded-2xl border border-black/10 bg-[#faf8fc] px-6 py-5 text-[30px] leading-[1.45] text-[#2d1f4e] outline-none ring-0 placeholder:text-[#2d1f4e]/30 focus:border-[color-mix(in_oklab,var(--brand-violet)_40%,transparent)] focus:ring-4 focus:ring-[color-mix(in_oklab,var(--brand-violet)_20%,transparent)]"
                  placeholder="Tapez ou collez du texte pour votre démo…"
                  style={{ height: "100%" }}
                />
              </div>

              <div className="font-gabriela mt-6 flex items-center justify-between text-xl text-white/50">
                <span>★★★★★ 5/5 Google</span>
                <span className="text-[var(--brand-turquoise)]">@peakcl</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {!recordMode && (
        <aside className="mx-auto mt-6 max-w-lg px-4 pb-12 text-center text-xs text-muted-foreground">
          <p>
            Enregistrez cette page en <strong className="text-foreground">1080×1920</strong> (OBS, QuickTime,
            Loom…) en cadrant uniquement la zone violette. Utilisez le bouton « Mode capture » pour masquer
            cette barre d’outils.
          </p>
          <p className="mt-2">
            Les raccourcis clavier fonctionnent dans la zone de texte : Ctrl/Cmd + C, X, V, A.
          </p>
        </aside>
      )}
    </div>
  );
}
