/**
 * Consentement cookies (RGPD / recommandations CNIL).
 *
 * Le site charge deux traceurs tiers : Google Analytics 4 et le code de suivi
 * HubSpot. Les deux deposent des cookies non essentiels, donc aucun des deux ne
 * doit etre charge avant un consentement explicite. Ce module est la source
 * unique de verite de ce choix ; `Analytics.tsx` s'y abonne, `CookieConsent.tsx`
 * l'ecrit.
 *
 * Regles retenues :
 * - refuser doit etre aussi simple qu'accepter (deux boutons de meme poids) ;
 * - l'absence de choix vaut refus, jamais acceptation ;
 * - le choix est reinterroge au bout de 6 mois (recommandation CNIL) ;
 * - un changement de `CONSENT_VERSION` reinterroge tout le monde (a utiliser
 *   si on ajoute un traceur : le consentement precedent ne le couvrait pas).
 */

export const CONSENT_STORAGE_KEY = "peakcl-consent-v1";
export const CONSENT_VERSION = 1;

/** 6 mois. Au-dela, on repose la question. */
const CONSENT_MAX_AGE_MS = 182 * 24 * 60 * 60 * 1000;

export type ConsentChoice = "granted" | "denied";

export type ConsentState = {
  version: number;
  /** Mesure d'audience : GA4 + analytics HubSpot. */
  analytics: ConsentChoice;
  /** Horodatage du choix, pour la peremption a 6 mois. */
  decidedAt: number;
};

export const CONSENT_EVENT = "peakcl:consent";

function isFresh(state: ConsentState): boolean {
  if (state.version !== CONSENT_VERSION) return false;
  if (typeof state.decidedAt !== "number") return false;
  return Date.now() - state.decidedAt < CONSENT_MAX_AGE_MS;
}

/** Renvoie le choix stocke, ou `null` si aucun choix valable n'existe. */
export function readConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentState;
    if (!parsed || typeof parsed !== "object") return null;
    if (parsed.analytics !== "granted" && parsed.analytics !== "denied") return null;
    if (!isFresh(parsed)) return null;
    return parsed;
  } catch {
    return null;
  }
}

/** Ecrit le choix et previent les abonnes dans le meme tick. */
export function writeConsent(analytics: ConsentChoice): ConsentState {
  const state: ConsentState = {
    version: CONSENT_VERSION,
    analytics,
    decidedAt: Date.now(),
  };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Navigation privee ou stockage plein : on continue quand meme, le choix
    // vaut pour la session en cours via l'evenement ci-dessous.
  }
  try {
    window.dispatchEvent(new CustomEvent<ConsentState>(CONSENT_EVENT, { detail: state }));
  } catch {
    // ignore
  }
  return state;
}

/** Efface le choix pour reafficher la banniere (lien « Gerer mes cookies »). */
export function resetConsent() {
  try {
    window.localStorage.removeItem(CONSENT_STORAGE_KEY);
  } catch {
    // ignore
  }
  try {
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: null }));
  } catch {
    // ignore
  }
}

export function hasAnalyticsConsent(): boolean {
  return readConsent()?.analytics === "granted";
}
