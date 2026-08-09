/**
 * Inventaire des pages locales (ville x prestation).
 *
 * Ce fichier ne listait que 4 villes sur les 14 pages locales reellement
 * publiees, et n'etait importe nulle part : il decrivait un etat du site qui
 * n'existait plus. Il sert desormais de source unique a la generation de
 * llms.txt et au bloc « villes » du footer, pour qu'une page ajoutee ne puisse
 * plus etre oubliee dans l'un des deux.
 *
 * Toute nouvelle page ville doit etre ajoutee ICI en plus de son fichier de
 * route et du sitemap.
 */

export type GeoService = "site" | "community" | "logo";

export type GeoPage = {
  /** Slug de la route, sans slash initial. */
  slug: string;
  city: string;
  /** Departement ou zone affichee. */
  regionLine: string;
  /** Prestation ciblee par la page — deux pages d'une meme ville ne doivent
   *  jamais partager le meme service, sous peine de cannibalisation. */
  service: GeoService;
  shortPitch: string;
};

export const geoPages: GeoPage[] = [
  // ── Creation de sites web ─────────────────────────────────────
  {
    slug: "agence-web-albertville",
    city: "Albertville",
    regionLine: "Savoie",
    service: "site",
    shortPitch:
      "Agence web et SEO a Albertville : creation de site internet et referencement local.",
  },
  {
    slug: "agence-web-chambery",
    city: "Chambéry",
    regionLine: "Savoie",
    service: "site",
    shortPitch:
      "Agence web a Chambery : creation de site internet premium et referencement local.",
  },
  {
    slug: "agence-web-annecy",
    city: "Annecy",
    regionLine: "Haute-Savoie",
    service: "site",
    shortPitch:
      "Creation et refonte de site web premium a Annecy (Haute-Savoie).",
  },
  {
    slug: "agence-web-aix-les-bains",
    city: "Aix-les-Bains",
    regionLine: "Savoie",
    service: "site",
    shortPitch:
      "Agence web et WordPress a Aix-les-Bains : site sur mesure ou WordPress, avec SEO local.",
  },
  {
    slug: "agence-web-gilly-sur-isere",
    city: "Gilly-sur-Isère",
    regionLine: "Savoie",
    service: "site",
    shortPitch:
      "Creation de site internet a Gilly-sur-Isere, commune d'etablissement de PeakCL.",
  },
  {
    slug: "agence-web-ugine",
    city: "Ugine",
    regionLine: "Savoie",
    service: "site",
    shortPitch:
      "Creation de site internet a Ugine, avec referencement local inclus.",
  },
  {
    slug: "agence-web-moutiers",
    city: "Moûtiers",
    regionLine: "Savoie",
    service: "site",
    shortPitch:
      "Creation de site internet a Moutiers et en Tarentaise : commerces, saisonniers, hebergeurs.",
  },
  {
    slug: "agence-web-beaufort",
    city: "Beaufort",
    regionLine: "Savoie",
    service: "site",
    shortPitch:
      "Creation de site internet a Beaufort et dans le Beaufortain : producteurs, artisans, hebergeurs.",
  },

  // ── Community management ──────────────────────────────────────
  {
    slug: "community-manager-savoie",
    city: "Savoie",
    regionLine: "Savoie",
    service: "community",
    shortPitch:
      "Community manager en Savoie : gestion des reseaux sociaux, visuels brandes et redaction.",
  },
  {
    slug: "community-manager-albertville",
    city: "Albertville",
    regionLine: "Savoie",
    service: "community",
    shortPitch:
      "Community manager a Albertville : deleguer ses reseaux sociaux.",
  },
  {
    slug: "community-manager-chambery",
    city: "Chambéry",
    regionLine: "Savoie",
    service: "community",
    shortPitch: "Community manager a Chambery : deleguer ses reseaux sociaux.",
  },
  {
    slug: "community-manager-annecy",
    city: "Annecy",
    regionLine: "Haute-Savoie",
    service: "community",
    shortPitch: "Community manager a Annecy : deleguer ses reseaux sociaux.",
  },
  {
    slug: "community-manager-aix-les-bains",
    city: "Aix-les-Bains",
    regionLine: "Savoie",
    service: "community",
    shortPitch:
      "Community manager a Aix-les-Bains : deleguer ses reseaux sociaux.",
  },

  // ── Identite visuelle ─────────────────────────────────────────
  {
    slug: "creation-logo-albertville",
    city: "Albertville",
    regionLine: "Savoie",
    service: "logo",
    shortPitch:
      "Creation de logo et identite visuelle a Albertville : logo, charte, declinaisons web et print.",
  },
];

/** Libelle lisible d'une prestation, pour les listes generees. */
export const GEO_SERVICE_LABEL: Record<GeoService, string> = {
  site: "Création de site internet",
  community: "Community management",
  logo: "Identité visuelle",
};

/** Pages d'une prestation donnee, dans l'ordre de declaration. */
export function geoPagesFor(service: GeoService): GeoPage[] {
  return geoPages.filter((p) => p.service === service);
}
