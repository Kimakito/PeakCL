/**
 * Configuration des traceurs. Point unique a modifier.
 *
 * Portail HubSpot : 149057275, heberge dans l'UE (app-eu1). Les comptes UE
 * servent leur script de suivi depuis `js-eu1.hs-scripts.com` et non
 * `js.hs-scripts.com` : se tromper de domaine ne provoque aucune erreur
 * visible, le suivi ne remonte simplement jamais. Verifie le 18/08/2026,
 * `https://js-eu1.hs-scripts.com/149057275.js` renvoie bien le loader HubSpot.
 *
 * L'endpoint de soumission des formulaires (`api.hsforms.com`) est en revanche
 * unique et route lui-meme vers la bonne region. Il vit dans l'edge function
 * `netlify/edge-functions/hubspot-lead.ts`, pas ici : rien de tout cela ne doit
 * partir dans le bundle client.
 */

export const HUBSPOT_PORTAL_ID = "149057275";

export const HUBSPOT_TRACKING_SRC = `https://js-eu1.hs-scripts.com/${HUBSPOT_PORTAL_ID}.js`;

/**
 * Identifiant de mesure GA4 (format `G-XXXXXXXXXX`).
 *
 * Valeur par defaut codee en dur, comme le portail HubSpot juste au-dessus, et
 * pour la meme raison : ce n'est pas un secret. Un identifiant de mesure GA4
 * est public par construction — il part dans le bundle, il est lisible dans le
 * code source de n'importe quelle page, c'est meme sa fonction. Le garder en
 * variable d'environnement n'apportait aucune protection.
 *
 * En revanche, ca creait une panne silencieuse. `VITE_GA4_ID` est une variable
 * de BUILD : elle est figee dans le bundle a la compilation, contrairement au
 * GUID HubSpot que l'edge function lit a l'execution. Elle etait absente du
 * build de production, verifie le 26/08/2026 : aucun `G-` dans les bundles
 * livres. GA4 n'etait donc jamais charge, l'evenement de conversion
 * `generate_lead` ne partait nulle part, et rien ne le signalait — ni erreur
 * de build, ni message en console, ni indice sur le site.
 *
 * `VITE_GA4_ID` reste prioritaire si elle est definie : utile pour pointer un
 * environnement de recette vers une autre propriete sans toucher au code.
 * Attention, apres l'avoir changee dans Netlify il faut REDEPLOYER, un simple
 * redemarrage ne suffit pas.
 */
const GA4_FALLBACK_ID = "G-ZCYTT94MMH";

const GA4_FROM_ENV = (import.meta.env.VITE_GA4_ID ?? "").trim();

export const GA4_MEASUREMENT_ID: string = GA4_FROM_ENV || GA4_FALLBACK_ID;

export const HAS_GA4 = /^G-[A-Z0-9]+$/i.test(GA4_MEASUREMENT_ID);
