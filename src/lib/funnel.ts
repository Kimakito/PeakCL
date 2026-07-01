/** R1 diagnostic — Calendly event type */
export const CALENDLY_R1_URL =
  "https://calendly.com/peakcl73/faisons-connaissance?background_color=2b0c7f&text_color=fbfe08&primary_color=b800ff";

export const BIENVENUE_PATH = "/bienvenue";
export const MERCI_BRIEF_PATH = "/merci-brief";

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

export async function submitNetlifyForm(form: HTMLFormElement) {
  const data = new FormData(form);
  const body = new URLSearchParams();
  for (const [key, value] of data.entries()) {
    if (typeof value === "string") body.append(key, value);
  }

  if (!body.get("form-name")) {
    const formName = form.getAttribute("name");
    if (formName) body.set("form-name", formName);
  }

  const res = await fetch(NETLIFY_FORMS_PATH, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!res.ok) throw new Error("netlify_form_submit_failed");
}
