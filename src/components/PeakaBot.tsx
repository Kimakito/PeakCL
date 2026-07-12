import { useEffect, useRef, useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { MessageCircle, Send, X } from "lucide-react";
import {
  PEAKABOT_NODES,
  PEAKABOT_START,
  PEAKABOT_WHATSAPP,
  type BotChoice,
  type BotMood,
} from "@/content/peakcl/peakabot";
import { askPeakaBot, type ChatTurn } from "@/lib/peakabot-server";

const AVATAR: Record<BotMood, string> = {
  happy: "/peakcl/assets/images/avatar-happy.webp",
  think: "/peakcl/assets/images/avatar-think.webp",
  "thumbs-up": "/peakcl/assets/images/avatar-thumbs-up.webp",
};

type Msg = { from: "bot" | "user"; text: string };

/** Message d'accueil (bulles du nœud de départ). */
function startMessages(): Msg[] {
  return PEAKABOT_NODES[PEAKABOT_START].bot.map((text) => ({ from: "bot", text }));
}

/**
 * PeakaBot : chatbot scénarisé (FAQ), personnifié par la mascotte PeakCL.
 * 100 % front, aucune donnée envoyée. L'avatar change d'expression selon le nœud.
 */
export function PeakaBot() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [nodeId, setNodeId] = useState(PEAKABOT_START);
  const [messages, setMessages] = useState<Msg[]>(startMessages);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const node = PEAKABOT_NODES[nodeId] ?? PEAKABOT_NODES[PEAKABOT_START];
  const mood = busy ? "think" : node.mood;

  /** Historique transcript -> tours de conversation pour l'IA. */
  const toTurns = (msgs: Msg[]): ChatTurn[] =>
    msgs.map((m) => ({ role: m.from === "bot" ? "assistant" : "user", content: m.text }));

  const onSend = async (e: FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    const next: Msg[] = [...messages, { from: "user", text }];
    setMessages(next);
    setBusy(true);
    try {
      const res = await askPeakaBot({ data: { messages: toTurns(next) } });
      setMessages((prev) => [...prev, { from: "bot", text: res.text }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Souci de connexion. Réessayez, ou écrivez à Charlotte sur WhatsApp." },
      ]);
    } finally {
      setBusy(false);
    }
  };

  // Auto-scroll en bas du transcript à chaque nouveau message.
  useEffect(() => {
    if (open) scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open, busy]);

  // Échap ferme le panneau.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Ouverture depuis n'importe où : window.dispatchEvent(new Event("peakabot:open")).
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("peakabot:open", onOpen);
    return () => window.removeEventListener("peakabot:open", onOpen);
  }, []);

  const goToNode = (id: string, userLabel: string) => {
    const target = PEAKABOT_NODES[id];
    if (!target) return;
    setMessages((prev) => [
      ...prev,
      { from: "user", text: userLabel },
      ...target.bot.map((text) => ({ from: "bot" as const, text })),
    ]);
    setNodeId(id);
  };

  const onChoice = (c: BotChoice) => {
    if (c.href) {
      if (c.external) {
        window.open(c.href, "_blank", "noopener,noreferrer");
      } else {
        setOpen(false);
        navigate({ to: c.href });
      }
      return;
    }
    if (c.goto) goToNode(c.goto, c.label);
  };

  const reset = () => {
    setNodeId(PEAKABOT_START);
    setMessages(startMessages());
  };

  return (
    <>
      {/* Bouton flottant */}
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Ouvrir PeakaBot, l’assistant PeakCL"
          data-event="peakabot_open"
          className="peakabot-btn fixed bottom-5 right-5 z-[55] flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-card shadow-glow transition-transform hover:scale-105 md:h-16 md:w-16"
        >
          <img src={AVATAR.happy} alt="" width={64} height={64} className="h-full w-full object-cover" />
          <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--brand-turquoise)] opacity-75" />
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-[var(--brand-turquoise)]" />
          </span>
        </button>
      ) : null}

      {/* Panneau de chat */}
      {open ? (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="PeakaBot, l’assistant PeakCL"
          className="fixed bottom-4 right-4 z-[70] flex max-h-[72vh] w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-3xl border border-white/10 bg-card/95 shadow-card backdrop-blur-xl sm:w-[360px]"
        >
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-white/10 bg-background/40 px-4 py-3">
            <span className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white/15">
              <img src={AVATAR[mood]} alt="PeakaBot" width={40} height={40} className="h-full w-full object-cover" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-bold">
                Peak<span className="text-gradient">a</span>Bot
              </div>
              <div className="text-[11px] text-muted-foreground">Assistant PeakCL</div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fermer PeakaBot"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Transcript */}
          <div ref={scrollRef} className="flex-1 space-y-2.5 overflow-y-auto px-4 py-4">
            {messages.map((m, i) =>
              m.from === "bot" ? (
                <div key={i} className="max-w-[85%] rounded-2xl rounded-bl-md bg-white/5 px-3.5 py-2 text-sm leading-relaxed text-foreground">
                  {m.text}
                </div>
              ) : (
                <div key={i} className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-primary-gradient px-3.5 py-2 text-sm font-medium text-primary-foreground">
                  {m.text}
                </div>
              ),
            )}
            {busy ? (
              <div className="flex max-w-[85%] items-center gap-1 rounded-2xl rounded-bl-md bg-white/5 px-3.5 py-3">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.2s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.1s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" />
              </div>
            ) : null}
          </div>

          {/* Choix */}
          <div className="flex flex-wrap gap-2 border-t border-white/10 bg-background/40 px-4 py-3">
            {node.choices.map((c) => (
              <button
                key={c.label}
                type="button"
                onClick={() => onChoice(c)}
                data-event={c.event}
                className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-[var(--brand-turquoise)] hover:text-[var(--brand-turquoise)]"
              >
                {c.label}
              </button>
            ))}
            {nodeId !== PEAKABOT_START ? (
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center rounded-full px-2 py-1.5 text-xs text-muted-foreground hover:text-foreground"
              >
                Recommencer
              </button>
            ) : null}
          </div>

          {/* Champ libre : question posée en langage naturel (répond via Claude) */}
          <form onSubmit={onSend} className="flex items-center gap-2 border-t border-white/10 bg-background/40 px-3 py-2.5">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={busy}
              placeholder="Posez votre question..."
              aria-label="Votre question"
              className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-[var(--brand-turquoise)] focus:outline-none disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              aria-label="Envoyer"
              data-event="peakabot_ask"
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-gradient text-primary-foreground transition-transform hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>

          {/* Échappatoire : question non couverte → WhatsApp */}
          <a
            href={PEAKABOT_WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            data-event="peakabot_whatsapp"
            className="flex items-center justify-center gap-2 border-t border-white/10 bg-background/60 px-4 py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:text-[var(--brand-turquoise)]"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            Une autre question ? Écrivez à Charlotte sur WhatsApp
          </a>
        </div>
      ) : null}
    </>
  );
}
