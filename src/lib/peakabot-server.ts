/**
 * Server function PeakaBot (option B) : appelle Claude Haiku côté serveur.
 * La clé ANTHROPIC_API_KEY reste sur le serveur (jamais exposée au navigateur).
 *
 * Dégradation gracieuse : sans clé configurée, ou en cas d'erreur API, on
 * renvoie un message qui invite à écrire sur WhatsApp, sans jamais planter.
 */
import { createServerFn } from "@tanstack/react-start";
import Anthropic from "@anthropic-ai/sdk";
import { PEAKABOT_SYSTEM_PROMPT } from "@/lib/peakabot-prompt";
import { checkRateLimit } from "@/lib/rate-limit";

export type ChatRole = "user" | "assistant";
export type ChatTurn = { role: ChatRole; content: string };
export type AskInput = { messages: ChatTurn[] };

const MAX_TURNS = 12; // garde-fou : on ne renvoie que la fin de la conversation
const MAX_CHARS = 1500; // garde-fou : longueur max d'un message
const FALLBACK =
  "Désolée, je ne peux pas répondre à ça pour le moment. Le mieux, c'est d'écrire directement à Charlotte sur WhatsApp, elle vous répondra rapidement.";
const RATE_LIMITED =
  "On a beaucoup échangé d'un coup, je fais une petite pause. Pour continuer tout de suite, écrivez directement à Charlotte sur WhatsApp, elle vous répondra rapidement.";

/** Nettoie et borne l'historique reçu du client. */
function sanitize(messages: ChatTurn[]): ChatTurn[] {
  const cleaned = messages
    .filter(
      (m) =>
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim(),
    )
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }))
    .slice(-MAX_TURNS);
  // L'API exige que le premier message soit "user" : on retire les tours assistant en tête.
  const firstUser = cleaned.findIndex((m) => m.role === "user");
  return firstUser === -1 ? [] : cleaned.slice(firstUser);
}

export const askPeakaBot = createServerFn({ method: "POST" })
  .validator((input: AskInput) => {
    if (!input || !Array.isArray(input.messages))
      throw new Error("messages requis");
    return { messages: sanitize(input.messages) } satisfies AskInput;
  })
  .handler(async ({ data }: { data: AskInput }): Promise<{ text: string }> => {
    // Variable Netlify nommée "Peakcl_site" ; ANTHROPIC_API_KEY reste prioritaire.
    const apiKey = process.env.ANTHROPIC_API_KEY ?? process.env.Peakcl_site;
    if (!apiKey) return { text: FALLBACK };
    if (
      !data.messages.length ||
      data.messages[data.messages.length - 1].role !== "user"
    ) {
      return { text: FALLBACK };
    }

    // Après les rejets gratuits ci-dessus : seules les requêtes qui allaient
    // réellement appeler l'API consomment du quota.
    const verdict = await checkRateLimit();
    if (!verdict.ok) {
      console.warn(
        `[peakabot] requête bloquée par le rate limit (${verdict.scope})`,
      );
      return { text: RATE_LIMITED };
    }

    try {
      const client = new Anthropic({ apiKey });
      const response = await client.messages.create({
        model: "claude-haiku-4-5",
        max_tokens: 512,
        system: [
          {
            type: "text",
            text: PEAKABOT_SYSTEM_PROMPT,
            cache_control: { type: "ephemeral" },
          },
        ],
        messages: data.messages,
      });
      const text = response.content
        .filter((b): b is Anthropic.TextBlock => b.type === "text")
        .map((b) => b.text)
        .join("")
        .trim();
      return { text: text || FALLBACK };
    } catch {
      return { text: FALLBACK };
    }
  });
