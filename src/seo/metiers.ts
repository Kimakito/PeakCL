/**
 * Inventaire des pages métier (« création de site internet pour X »).
 *
 * Pendant des pages villes : le site couvrait 13 requêtes géographiques et
 * zéro requête métier, alors que c'est là que se trouvent les recherches à
 * intention commerciale les moins concurrentielles (« site internet
 * thérapeute », « site internet artisan »). Une page ville et une page métier
 * ne se cannibalisent pas : elles répondent à deux façons différentes de
 * chercher le même prestataire.
 *
 * Règle de contenu : une page métier ne se crée que si de VRAIS clients de ce
 * métier existent au portfolio. Sans preuve de première main, la page devient
 * du remplissage générique — exactement ce que Google et les moteurs IA
 * écartent, et exactement ce qu'on cherche à ne pas produire ici.
 *
 * Toute nouvelle page métier doit être ajoutée ICI en plus de son fichier de
 * route et du sitemap : le footer et llms.txt sont dérivés de cette liste.
 */

export type MetierPage = {
  /** Slug de la route, sans slash initial. */
  slug: string;
  /** Libellé court, utilisé dans le footer. */
  label: string;
  shortPitch: string;
};

export const metierPages: MetierPage[] = [
  {
    slug: "site-internet-artisan",
    label: "Site internet artisan",
    shortPitch:
      "Creation de site internet pour artisans et entreprises du batiment : galerie de chantiers, fiche Google et demandes de devis.",
  },
  {
    slug: "site-internet-therapeute",
    label: "Site internet thérapeute",
    shortPitch:
      "Creation de site internet pour therapeutes, praticiens et professions de sante : rassurer, expliquer, faire prendre rendez-vous.",
  },
  {
    slug: "site-internet-equitation",
    label: "Site internet équitation",
    shortPitch:
      "Creation de site internet pour le monde du cheval : moniteurs, centres equestres, dentistes equins et professionnels itinerants.",
  },
  {
    slug: "site-internet-architecte-interieur",
    label: "Site internet architecte d'intérieur",
    shortPitch:
      "Creation de site internet pour architectes d'interieur et decorateurs : portfolio de realisations et demandes d'etude qualifiees.",
  },
];
