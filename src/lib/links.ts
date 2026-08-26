/** Liens centralisés du site (réseaux, plateformes freelance, contact). */
export const SOCIAL = {
  instagram: "https://www.instagram.com/peakcl73/",
  facebook: "https://www.facebook.com/PeakCL73",
  linkedin: "https://www.linkedin.com/in/charlotte-lacroix-peakcl/",
  tiktok: "https://www.tiktok.com/@peakcl5",
  whatsapp: "https://wa.me/33743517627",
} as const;

/** Plateformes freelance — à n'afficher QUE dans le footer. */
export const FREELANCE = {
  malt: "https://www.malt.fr/profile/peakcldev",
  fiverr: "https://fr.fiverr.com/s/99W6WYa",
  comeup: "https://comeup.com/fr/@PeakCL",
} as const;

/**
 * URL de prise de rendez-vous. POINT UNIQUE A MODIFIER.
 *
 * Migration Calendly -> HubSpot Meetings (aout 2026). Le motif n'est pas la
 * qualite de Calendly, qui fait tres bien le travail, mais le fait que
 * l'integration Calendly vers HubSpot demarre au plan payant Calendly : sur le
 * plan gratuit, un rendez-vous pris ne cree jamais ni contact ni activite dans
 * le CRM. HubSpot Meetings le fait nativement et gratuitement.
 *
 * Pour basculer : remplacer la valeur ci-dessous par le lien de reunion
 * HubSpot (Bibliotheque > Reunions > Copier le lien), qui ressemble a
 * `https://meetings-eu1.hubspot.com/charlotte-lacroix`. Tout le site suit :
 * boutons, embed et widget s'adaptent seuls au fournisseur detecte.
 *
 * Tant que cette constante pointe vers Calendly, le comportement actuel est
 * strictement conserve. Aucun deploiement n'est bloque par cette migration.
 */
export const BOOKING_URL = "https://calendly.com/peakcl73/faisons-connaissance";

/** Detecte le fournisseur a partir de l'URL, pour choisir le bon embed. */
export function bookingProvider(url: string = BOOKING_URL): "hubspot" | "calendly" {
  return url.includes("hubspot.com") ? "hubspot" : "calendly";
}

export const CONTACT = {
  email: "charlotte@peakcl.com",
  phoneTel: "tel:+33743517627",
  phoneDisplay: "07 43 51 76 27",
  /** @deprecated Utiliser BOOKING_URL. Conserve pour compatibilite. */
  calendly: BOOKING_URL,
} as const;
