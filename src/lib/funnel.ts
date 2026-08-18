import { BOOKING_URL, bookingProvider } from "@/lib/links";

/**
 * URL de reservation du diagnostic R1.
 *
 * Les parametres `background_color` / `text_color` / `primary_color` sont
 * propres a Calendly : HubSpot Meetings les ignore et se colore depuis les
 * reglages du portail. On ne les ajoute donc que si le fournisseur est bien
 * Calendly, sinon ils polluent l'URL et cassent le lien de secours affiche
 * sous l'iframe.
 */
export const CALENDLY_R1_URL =
  bookingProvider(BOOKING_URL) === "calendly"
    ? `${BOOKING_URL}?background_color=2b0c7f&text_color=fbfe08&primary_color=b800ff`
    : BOOKING_URL;

export const BIENVENUE_PATH = "/bienvenue";
export const MERCI_BRIEF_PATH = "/merci-brief";
export const MERCI_R2_PATH = "/merci-r2";

/** Static page scanned at build time — required for Netlify Forms with SSR (POST / alone is ignored). */
export const NETLIFY_FORMS_PATH = "/netlify-forms.html";

const CALENDLY_PREFILL_KEY = "peakcl_calendly_prefill";

export type CalendlyPrefill = {
  name?: string;
  email?: string;
};

export function buildCalendlyUrl(base: string, prefill?: CalendlyPrefill) {
  const url = new URL(base);
  if (prefill?.name?.trim()) url.searchParams.set("name", prefill.name.trim());
  if (prefill?.email?.trim()) url.searchParams.set("email", prefill.email.trim());
  return url.toString();
}

export function stashCalendlyPrefill(prefill: CalendlyPrefill) {
  try {
    sessionStorage.setItem(CALENDLY_PREFILL_KEY, JSON.stringify(prefill));
  } catch {
    // ignore
  }
}

export function readCalendlyPrefill(): CalendlyPrefill {
  try {
    const raw = sessionStorage.getItem(CALENDLY_PREFILL_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as CalendlyPrefill;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function readCalendlyPrefillFromSearch(search: string): CalendlyPrefill {
  const params = new URLSearchParams(search);
  return {
    name: params.get("name") ?? undefined,
    email: params.get("email") ?? undefined,
  };
}

/** Route de l'edge function qui relaie les leads vers HubSpot. */
const HUBSPOT_LEAD_PATH = "/api/hubspot-lead";

/**
 * Formulaires exclus du CRM PeakCL.
 *
 * La com' des Pepites est une activite distincte : ses prospects n'ont rien a
 * faire dans le pipeline PeakCL, ou ils fausseraient le comptage des leads et
 * declencheraient des relances hors sujet. Le cadrage client prive
 * (`cadrage-*`) n'est pas un lead non plus, c'est un questionnaire rempli par
 * un client deja signe.
 */
function isExcludedFromCrm(formName: string, source: string): boolean {
  if (source === "la_com_des_pepites") return true;
  if (formName.startsWith("pepites")) return true;
  if (formName.startsWith("cadrage-")) return true;
  return false;
}

/**
 * Envoie une copie de la soumission a HubSpot, en plus de Netlify Forms.
 *
 * Volontairement silencieuse : un echec HubSpot ne doit jamais empecher la
 * redirection vers la page de remerciement ni afficher une erreur. Netlify a
 * deja enregistre le lead a ce stade, la donnee n'est pas perdue.
 */
async function sendToHubSpot(payload: Record<string, string>) {
  const formName = payload["form-name"] ?? "";
  if (isExcludedFromCrm(formName, payload.source ?? "")) return;

  try {
    await fetch(HUBSPOT_LEAD_PATH, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        pageUri: typeof window !== "undefined" ? window.location.href : "",
        pageName: formName,
      }),
      // La navigation vers /merci-brief suit immediatement. Sans keepalive, le
      // navigateur annule la requete en cours de vol et le lead n'arrive jamais
      // dans HubSpot, de facon parfaitement invisible.
      keepalive: true,
    });
  } catch {
    // ignore
  }
}

export async function submitNetlifyForm(form: HTMLFormElement) {
  const data = new FormData(form);
  const body = new URLSearchParams();
  const payload: Record<string, string> = {};
  for (const [key, value] of data.entries()) {
    if (typeof value !== "string") continue;
    body.append(key, value);
    // Les champs multiples (cases a cocher) arrivent en plusieurs entrees :
    // on les concatene plutot que d'ecraser, sinon seule la derniere reponse
    // remonte dans le CRM.
    payload[key] = payload[key] ? `${payload[key]}, ${value}` : value;
  }

  if (!body.get("form-name")) {
    const formName = form.getAttribute("name");
    if (formName) {
      body.set("form-name", formName);
      payload["form-name"] = formName;
    }
  }

  const res = await fetch(NETLIFY_FORMS_PATH, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!res.ok) throw new Error("netlify_form_submit_failed");

  // Apres le succes Netlify uniquement : on ne veut pas de contact HubSpot
  // pour une soumission qui a echoue cote site.
  await sendToHubSpot(payload);
}
