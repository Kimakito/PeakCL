/**
 * Rate limiting de l'endpoint PeakaBot.
 *
 * Pourquoi : `askPeakaBot` est un POST public non authentifié qui appelle
 * l'API Anthropic sur notre compte. Les garde-fous du handler bornent le coût
 * *par appel* (12 tours, 1500 caractères, 512 tokens) mais pas le *nombre*
 * d'appels : un script en boucle vide la facture.
 *
 * Deux barrières :
 * - par IP, contre l'abus courant ;
 * - globale par jour, qui plafonne la facture même si l'attaquant tourne les IP.
 *
 * Stockage : Netlify Blobs, car le compteur doit être partagé entre instances
 * serverless (une variable en mémoire ne protège qu'une instance tiède, et
 * chaque instance froide repart à zéro). Consistance `strong` obligatoire :
 * en `eventual`, les lectures traînent jusqu'à 60s et le compteur ne sert plus
 * à rien.
 *
 * Limites assumées :
 * - Blobs n'a pas de contrôle de concurrence (last write wins), donc des
 *   incréments parallèles peuvent se perdre et le comptage sous-estime sous
 *   forte charge. C'est un ralentisseur, pas une serrure.
 * - En cas d'indisponibilité de Blobs, on laisse passer (fail-open) : couper
 *   le bot sur une panne de stockage ferait plus de dégâts que de bien.
 * - La seule protection *dure* de la facture reste un plafond de dépense côté
 *   console Anthropic. Ce module ne remplace pas ça.
 */
import { getStore } from "@netlify/blobs";
import { getRequestHeader, getRequestIP } from "@tanstack/react-start/server";

const STORE_NAME = "peakabot-rate-limit";

/** Par IP : fenêtre fixe. */
const IP_LIMIT = 12;
const IP_WINDOW_S = 300; // 5 minutes

/** Global : plafond quotidien, filet de sécurité sur la facture. */
const GLOBAL_DAILY_LIMIT = 500;

export type RateVerdict = { ok: true } | { ok: false; scope: "ip" | "global" };

/**
 * Netlify pose l'IP réelle du client dans `x-nf-client-connection-ip`. On la
 * préfère à X-Forwarded-For, que n'importe qui peut falsifier dans sa requête.
 */
function clientKey(): string {
  const netlifyIp = getRequestHeader("x-nf-client-connection-ip");
  if (netlifyIp) return netlifyIp;
  const ip = getRequestIP({ xForwardedFor: true });
  return ip || "unknown";
}

/** Isole les compteurs des deploy previews de ceux de la production. */
function contextPrefix(): string {
  return process.env.CONTEXT || "unknown";
}

function dayKey(now: number): string {
  return new Date(now).toISOString().slice(0, 10);
}

/** Lit, incrémente, réécrit. Renvoie le compteur après incrément. */
async function bump(
  store: ReturnType<typeof getStore>,
  key: string,
): Promise<number> {
  const current = await store.get(key, { type: "json" });
  const n = (typeof current?.n === "number" ? current.n : 0) + 1;
  await store.setJSON(key, { n });
  return n;
}

export async function checkRateLimit(): Promise<RateVerdict> {
  let store: ReturnType<typeof getStore>;
  try {
    store = getStore({ name: STORE_NAME, consistency: "strong" });
  } catch {
    // Blobs non configuré (dev local sans plugin Netlify) : on laisse passer.
    return { ok: true };
  }

  const now = Date.now();
  const prefix = contextPrefix();
  const window = Math.floor(now / 1000 / IP_WINDOW_S);

  try {
    const globalCount = await bump(store, `${prefix}:global:${dayKey(now)}`);
    if (globalCount > GLOBAL_DAILY_LIMIT) return { ok: false, scope: "global" };

    const ipCount = await bump(store, `${prefix}:ip:${clientKey()}:${window}`);
    if (ipCount > IP_LIMIT) return { ok: false, scope: "ip" };

    return { ok: true };
  } catch (err) {
    console.error(
      "[rate-limit] store indisponible, requête laissée passer",
      err,
    );
    return { ok: true };
  }
}
