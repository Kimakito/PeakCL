import type { Config, Context } from "@netlify/edge-functions";

/**
 * Relais des formulaires du site vers HubSpot (API Forms v3, non authentifiee).
 *
 * Pourquoi cote serveur et pas un simple `fetch` depuis le navigateur :
 * l'endpoint HubSpot accepte pourtant le CORS. Mais `api.hsforms.com` figure
 * dans les listes de blocage de uBlock Origin et de la plupart des bloqueurs
 * integres aux navigateurs. Un lead sur cinq environ serait perdu sans que rien
 * ne le signale. Passer par l'edge, c'est une requete same-origin vers
 * `/api/hubspot-lead` que personne ne bloque.
 *
 * Ce relais ne remplace pas Netlify Forms, il s'ajoute. Le formulaire continue
 * de poster vers Netlify (qui reste le filet de securite et l'archive), et le
 * client appelle ensuite cette route. Si HubSpot tombe ou si le GUID est
 * mauvais, la soumission est deja enregistree ailleurs : on ne perd jamais un
 * lead a cause du CRM.
 *
 * Configuration attendue dans Netlify (Site settings > Environment variables) :
 * - HUBSPOT_PORTAL_ID  : 149057275 (valeur par defaut si absent)
 * - HUBSPOT_FORM_GUID  : GUID du formulaire HubSpot qui recoit les leads
 *
 * Tant que HUBSPOT_FORM_GUID est absent, la route repond 200 sans rien envoyer.
 * C'est delibere : le site peut etre deploye avant que le formulaire HubSpot
 * existe, sans casser le tunnel.
 */

const DEFAULT_PORTAL_ID = "149057275";

/**
 * Champs envoyes tels quels a HubSpot. Ils doivent tous exister sur le
 * formulaire HubSpot cible, sinon l'API rejette TOUTE la soumission avec une
 * erreur `INVALID_FORM_FIELDS`. D'ou le choix de n'utiliser que des proprietes
 * de contact natives : aucune propriete personnalisee a creer.
 */
const HUBSPOT_FIELDS = [
  "email",
  "firstname",
  "lastname",
  "phone",
  "company",
  "website",
  "message",
] as const;

/** Champs techniques du site, jamais recopies dans le recapitulatif. */
const INTERNAL_FIELDS = new Set([
  "form-name",
  "bot-field",
  "subject",
  "email",
  "name",
  "fullName",
  "prenom_nom",
  "phone",
  "telephone",
  "message",
]);

/** Etiquettes lisibles pour le recapitulatif depose dans la note HubSpot. */
const LABELS: Record<string, string> = {
  leadType: "Type de demande",
  source: "Source",
  instagram: "Instagram",
  besoin: "Besoin",
  revenueRange: "Chiffre d'affaires actuel",
  goalRevenue: "Objectif",
  painPoints: "Problematique",
  importanceSolve: "Importance de resoudre",
  ableAlone: "Capable seul(e)",
  importanceOnlinePresence: "Importance presence en ligne",
  opennessToSupport: "Ouvert a un accompagnement",
  commitment: "Engagement",
  ca_actuel: "Chiffre d'affaires actuel",
  objectif_prochains_mois: "Objectif prochains mois",
  problematique: "Problematique",
  ratingCall1: "Note appel 1",
  budget: "Budget",
  objectif: "Objectif",
  infosNecessaires: "Informations necessaires",
  readyToDecide: "Pret a decider",
  reasonIfNot: "Raison si non",
};

function splitName(full: string): { firstname: string; lastname: string } {
  const parts = full.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { firstname: "", lastname: "" };
  if (parts.length === 1) return { firstname: parts[0], lastname: "" };
  return { firstname: parts[0], lastname: parts.slice(1).join(" ") };
}

/** Recupere le cookie de suivi HubSpot pour rattacher la soumission a la visite. */
function readHubspotUtk(cookieHeader: string | null): string | undefined {
  if (!cookieHeader) return undefined;
  const match = cookieHeader.match(/(?:^|;\s*)hubspotutk=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : undefined;
}

export default async (request: Request, context: Context): Promise<Response> => {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ ok: false, error: "method_not_allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const portalId = Netlify.env.get("HUBSPOT_PORTAL_ID") || DEFAULT_PORTAL_ID;
  const formGuid = Netlify.env.get("HUBSPOT_FORM_GUID");

  let payload: Record<string, unknown>;
  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "bad_json" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Piege a robots : le champ honeypot rempli signale un bot. On repond 200
  // pour ne pas lui apprendre qu'il a ete detecte, mais on n'envoie rien.
  if (typeof payload["bot-field"] === "string" && payload["bot-field"].trim() !== "") {
    return new Response(JSON.stringify({ ok: true, skipped: "honeypot" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!formGuid) {
    return new Response(JSON.stringify({ ok: true, skipped: "no_form_guid" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const str = (key: string): string => {
    const v = payload[key];
    if (typeof v === "string") return v.trim();
    if (Array.isArray(v)) return v.filter((x) => typeof x === "string").join(", ");
    if (typeof v === "number" || typeof v === "boolean") return String(v);
    return "";
  };

  const email = str("email");
  if (!email) {
    // Sans email, HubSpot ne peut pas dedupliquer : le contact serait cree en
    // double a chaque soumission. On prefere ne rien envoyer.
    return new Response(JSON.stringify({ ok: true, skipped: "no_email" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const rawName = str("fullName") || str("name") || str("prenom_nom");
  const { firstname, lastname } = splitName(rawName);

  // Recapitulatif : tout ce que le formulaire contient et qui n'a pas de
  // propriete HubSpot dediee finit ici, lisible sur la fiche contact.
  const extras: string[] = [];
  for (const [key, value] of Object.entries(payload)) {
    if (INTERNAL_FIELDS.has(key)) continue;
    const text = str(key);
    if (!text) continue;
    extras.push(`${LABELS[key] ?? key} : ${text}`);
  }

  const messageParts = [str("message"), extras.length ? extras.join("\n") : ""].filter(Boolean);

  const values: Record<string, string> = {
    email,
    firstname,
    lastname,
    phone: str("phone") || str("telephone"),
    company: str("company"),
    website: str("website") || str("instagram"),
    message: messageParts.join("\n\n"),
  };

  const fields = HUBSPOT_FIELDS.filter((name) => values[name] !== "").map((name) => ({
    objectTypeId: "0-1",
    name,
    value: values[name],
  }));

  const pageUri = str("pageUri") || request.headers.get("referer") || "";
  const pageName = str("pageName") || str("form-name") || "Formulaire PeakCL";
  const hutk = readHubspotUtk(request.headers.get("cookie"));

  const body = {
    fields,
    context: {
      ...(hutk ? { hutk } : {}),
      pageUri,
      pageName,
      ipAddress: context.ip,
    },
    legalConsentOptions: {
      consent: {
        consentToProcess: true,
        text: "En envoyant ce formulaire, j'accepte que PeakCL traite mes donnees pour me recontacter.",
      },
    },
  };

  try {
    const res = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
    );

    if (!res.ok) {
      // On journalise le detail : les erreurs HubSpot sont explicites
      // (champ absent du formulaire, GUID inconnu, portail errone) et c'est
      // la seule facon de les diagnostiquer sans reproduire la soumission.
      const detail = await res.text();
      console.error("[hubspot-lead] rejet HubSpot", res.status, detail.slice(0, 500));
      return new Response(JSON.stringify({ ok: false, status: res.status }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (err) {
    console.error("[hubspot-lead] echec reseau", err);
    return new Response(JSON.stringify({ ok: false, error: "network" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const config: Config = {
  path: "/api/hubspot-lead",
};
