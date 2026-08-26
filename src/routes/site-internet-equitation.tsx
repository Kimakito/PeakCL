import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/seo/site";
import { breadcrumbJsonLd, faqPageJsonLd, serviceJsonLd } from "@/seo/jsonld";
import { MetierLanding } from "@/components/MetierLanding";

/** FAQ propre au monde du cheval. Alimente aussi le JSON-LD FAQPage. */
const FAQ = [
  {
    question: "Je travaille sur plusieurs départements. Comment on gère le référencement ?",
    answerHtml:
      "C'est le cas de figure le plus courant dans le monde du cheval : on est itinérant, la clientèle est dispersée, et une seule commune ne suffit pas. Pour Mordant Équin, dentiste équin, j'ai construit un référencement géolocalisé sur un rayon de 250 km plutôt que sur une ville unique. C'est plus long à installer qu'un simple « + Chambéry », mais c'est la seule approche qui correspond au métier.",
  },
  {
    question: "Mes clients sont surtout sur Facebook. Un site sert encore à quelque chose ?",
    answerHtml:
      "Facebook est excellent pour animer une communauté existante, mauvais pour être découvert par quelqu'un qui ne vous connaît pas. Un propriétaire qui vient d'arriver dans la région tape « cours équitation » et le nom de sa vallée : ce sont des sites et des fiches Google qui ressortent. Les deux se complètent — le site attire, le réseau entretient.",
  },
  {
    question: "Il faut des photos de chevaux professionnelles ?",
    answerHtml:
      "Non, mais il faut des photos nettes et récentes, et c'est là que ça coince souvent. Une photo de cours prise un matin de printemps vaut mieux qu'une image achetée où le cheval n'a rien à voir avec les vôtres. Je vous dis quoi photographier — installations, chevaux, ambiance d'un cours, vous en situation — et je m'occupe du reste.",
  },
  {
    question: "Vous connaissez le milieu, ou vous découvrez ?",
    answerHtml:
      "J'ai travaillé avec une monitrice d'équitation western, une dentiste équin et une boutique d'équipement équestre. Je ne prétends pas connaître votre discipline mieux que vous — mais je sais déjà que le vocabulaire, les attentes et le cycle de décision d'un propriétaire de cheval n'ont rien à voir avec ceux d'un client de commerce classique.",
  },
];

export const Route = createFileRoute("/site-internet-equitation")({
  head: () => ({
    meta: [
      { title: "Création de site internet pour l'équitation et le monde du cheval · PeakCL" },
      {
        name: "description",
        content:
          "Site internet pour moniteurs, centres équestres, dentistes équins et professionnels du cheval : référencement géolocalisé, présentation des cours, galerie. À partir de 2 000 € HT.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/site-internet-equitation") },
      {
        "script:ld+json": breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Site internet équitation", path: "/site-internet-equitation" },
        ]),
      },
      { "script:ld+json": faqPageJsonLd(FAQ) },
      {
        "script:ld+json": serviceJsonLd({
          name: "Création de site internet pour le monde du cheval",
          description:
            "Création de site internet pour moniteurs d'équitation, centres équestres, professionnels de santé équine et boutiques équestres : référencement géolocalisé et présentation des prestations.",
          serviceType: "Création de site internet pour l'équitation",
          path: "/site-internet-equitation",
          audience:
            "Moniteurs et monitrices d'équitation, centres équestres, écuries, dentistes équins, ostéopathes équins, fermes pédagogiques et boutiques équestres.",
          offers: [
            {
              title: "Site vitrine équestre sur mesure",
              desc: "Présentation des cours et prestations, galerie, référencement géolocalisé sur votre zone d'intervention réelle.",
              price: "2 000 €",
            },
            {
              title: "Boutique équestre en ligne",
              desc: "Catalogue, paiement en ligne et migration d'une boutique existante.",
              price: "À partir de 3 800 €",
            },
          ],
        }),
      },
    ],
    links: [{ rel: "canonical", href: absUrl("/site-internet-equitation") }],
  }),
  component: Page,
});

function Page() {
  return (
    <MetierLanding
      eyebrow="Équitation & monde du cheval"
      headline="Création de site internet pour l'équitation"
      intro="Moniteur, centre équestre, dentiste équin, boutique : le monde du cheval fonctionne au bouche-à-oreille et aux groupes Facebook. C'est solide, mais ça ne va chercher personne de nouveau. Un site, si."
      problem={{
        title: "Un métier itinérant ne se réfère pas comme un commerce de centre-ville",
        text: "La plupart des professionnels du cheval interviennent sur une zone large, pas dans une boutique. Les conseils SEO classiques — « mettez votre ville partout » — ne fonctionnent donc pas : ils vous rendent invisible à quinze kilomètres. Il faut construire la page autour de votre zone d'intervention réelle, de vos disciplines et de votre spécialité, pas autour d'un code postal.",
      }}
      limit="Ce que je ne fais pas : de la photo équestre professionnelle. Je vous guide sur ce qu'il faut prendre et j'optimise les fichiers, mais pour un shooting de niveau catalogue, mieux vaut un photographe spécialisé — et le site est construit pour accueillir ces photos-là plus tard."
      benefits={[
        "Un référencement construit sur votre zone d'intervention réelle, pas sur une seule commune",
        "Une page par discipline ou prestation, pour capter chaque façon de vous chercher",
        "Une galerie qui montre les installations, les chevaux et l'ambiance d'un cours",
        "Des tarifs et des formules lisibles, pour éviter dix messages avant le premier cours",
        "Une intégration Facebook ou Instagram, là où votre communauté est déjà active",
      ]}
      pages={[
        {
          title: "Vos prestations, une par une",
          desc: "Cours particuliers, stages, pension, soins, interventions à domicile : chacune mérite sa page. C'est ce qui vous fait apparaître sur les recherches précises.",
        },
        {
          title: "Votre zone d'intervention",
          desc: "Pour un métier itinérant, c'est la page qui fait tout le travail de référencement local — vallées, départements, rayon d'intervention.",
        },
        {
          title: "Tarifs et formules",
          desc: "Cartes de cours, forfaits, tarifs de déplacement. Les afficher filtre les demandes et vous épargne des allers-retours.",
        },
        {
          title: "Galerie et cadre de travail",
          desc: "Carrière, box, chevaux, matériel : un propriétaire veut voir où son cheval va passer du temps avant de vous appeler.",
        },
      ]}
      proofs={[
        {
          name: "LM Équitation Western",
          role: "Monitrice · Savoie",
          text: "Maya, monitrice western, voulait attirer de nouveaux élèves en Savoie. J'ai bâti sa vitrine locale : galerie, présentation des cours et pages optimisées pour les recherches d'équitation western dans le département — une discipline de niche, donc une vraie occasion de sortir en tête.",
          siteUrl: "https://lm-equitation-western.fr/",
        },
        {
          name: "Mordant Équin",
          role: "Dentiste équin · Savoie",
          text: "Laura pratique la dentisterie équine moderne, une spécialité rare et indispensable. Site construit autour d'un référencement géolocalisé précis, pour être trouvée par les propriétaires de chevaux en Savoie et Haute-Savoie, dans un rayon de 250 km.",
          siteUrl: "https://mordant-equin.fr/",
        },
        {
          name: "Natural Riders",
          role: "E-commerce équestre · PrestaShop",
          text: "Une boutique d'équipement naturel pour cavaliers coincée sur Jimdo, trop limité pour vendre sérieusement. J'ai migré toute la boutique vers PrestaShop : catalogue, photos et charte graphique repris un par un, sans rien perdre en route.",
          siteUrl: "https://www.naturalriders.fr/",
        },
      ]}
      pricing="Site vitrine sur mesure : 2 000 € HT. Version WordPress si vous voulez publier vos stages vous-même : à partir de 2 500 € HT. Boutique en ligne ou migration : à partir de 3 800 € HT. Refonte d'un site existant : à partir de 1 200 € HT."
      faq={FAQ}
      related={[
        { label: "Site internet thérapeute", href: "/site-internet-therapeute" },
        { label: "Agence web Albertville", href: "/agence-web-albertville" },
        { label: "Community manager en Savoie", href: "/community-manager-savoie" },
        { label: "Création de sites web", href: "/sites-web" },
        { label: "Portfolio", href: "/portfolio" },
      ]}
    />
  );
}
