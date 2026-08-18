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
 * Renseigne via la variable d'environnement `VITE_GA4_ID` dans Netlify.
 * Tant qu'elle est vide, GA4 n'est tout simplement pas charge : le site
 * fonctionne, la banniere s'affiche, seul le tag manque. C'est volontaire,
 * pour que le deploiement ne depende pas de la creation de la propriete GA4.
 */
export const GA4_MEASUREMENT_ID: string = import.meta.env.VITE_GA4_ID ?? "";

export const HAS_GA4 = /^G-[A-Z0-9]+$/i.test(GA4_MEASUREMENT_ID);
