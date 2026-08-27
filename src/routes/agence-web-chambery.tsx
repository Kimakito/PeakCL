import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/seo/site";
import { breadcrumbJsonLd, faqPageJsonLd, localBusinessJsonLd } from "@/seo/jsonld";
import { GeoLanding } from "@/components/GeoLanding";

/** FAQ propre a Chambery (bloc visible + JSON-LD FAQPage). */
const FAQ = [
  {
    question: "Mon site est chez une agence qui ne répond plus. Vous pouvez le reprendre ?",
    answerHtml:
      "Oui, c'est exactement ce que j'ai fait pour le Laboratoire Sanchez Randon, prothésiste dentaire à Chambéry : leur agence avait arrêté l'abonnement du jour au lendemain, site compris. J'ai repris le site en urgence, je l'ai réhébergé, puis refondu entièrement. Première chose à vérifier de votre côté : à quel nom est déposé votre nom de domaine. S'il est au nom de l'agence et pas au vôtre, dites-le-moi dès l'appel, ça change la marche à suivre.",
  },
  {
    question: "Chambéry est saturé. Une petite structure peut-elle vraiment ressortir ?",
    answerHtml:
      "Sur « site internet Chambéry », vous vous battez contre des agences qui y consacrent un budget que vous n'avez pas — je ne vais pas vous vendre l'inverse. Sur « prothésiste dentaire Chambéry » ou « ostéopathe Chambéry centre », c'est une tout autre affaire, et c'est là qu'on joue. On vise vos requêtes métier et votre quartier, pas le mot le plus large.",
  },
  {
    question: "Vous travaillez avec des professionnels de santé et des thérapeutes ?",
    answerHtml:
      "C'est une bonne partie de mon travail : prothésiste dentaire, ostéopathie animale, médiation animale, dentisterie équine. Ces métiers ont une contrainte commune — il faut inspirer confiance avant même le premier appel, sans tomber dans la promesse de résultat que la déontologie interdit. Un site de thérapeute qui ressemble à une pub, ça dessert. On travaille plutôt la clarté : qui vous êtes, ce que vous traitez, comment on prend rendez-vous.",
  },
];

export const Route = createFileRoute("/agence-web-chambery")({
  head: () => ({
    meta: [
      // Les deux requêtes GSC de cette page (« agence web chambéry » et
      // « création site internet chambéry ») étaient absentes du title, qui
      // parlait de « site web » : 0 clic pour ~33e position. Le title les
      // reprend maintenant mot pour mot.
      { title: "Création de site internet à Chambéry (Savoie) · Agence web" },
      {
        name: "description",
        content:
          "Agence web à Chambéry : création de site internet premium, rapide et optimisé pour le référencement local. Pensé pour générer des prises de contact. Audit gratuit sous 24h.",
      },
      { property: "og:title", content: "Agence web à Chambéry · Création de site internet" },
      {
        property: "og:description",
        content:
          "Agence web à Chambéry : création de site internet premium et SEO local. Audit gratuit sous 24h.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/agence-web-chambery") },
      {
        "script:ld+json": breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Chambéry", path: "/agence-web-chambery" },
        ]),
      },
      { "script:ld+json": faqPageJsonLd(FAQ) },
      {
        "script:ld+json": localBusinessJsonLd({
          city: "Chambéry",
          region: "Savoie",
          path: "/agence-web-chambery",
          description:
            "Agence web à Chambéry : création de site internet, refonte et référencement local pour indépendants, professions libérales et commerces du bassin chambérien.",
          nearbyCities: ["Aix-les-Bains", "La Motte-Servolex", "Saint-Alban-Leysse", "Montmélian"],
          services: [
            "Agence web Chambéry",
            "Création de site internet Chambéry",
            "Refonte de site web",
            "Référencement local (SEO)",
          ],
        }),
      },
    ],
    links: [{ rel: "canonical", href: absUrl("/agence-web-chambery") }],
  }),
  component: Page,
});

function Page() {
  return (
    <GeoLanding
      city="Chambéry"
      region="Savoie"
      serviceLabel="site internet"
      intro="Un site internet premium, rapide et structuré pour convertir les visiteurs chambériens en prises de contact."
      angleTitle="Pour être choisi, il faut d'abord être trouvé."
      angleText="L'objectif : une page Chambéry qui se positionne sur Google, rassure avec des preuves, et envoie vers un appel à l'action clair. Chambéry est un marché actif, une présence en ligne nette fait la différence."
      localExample={{
        text: "Le Laboratoire Sanchez Randon, prothésiste dentaire à Chambéry, m'a appelée dans une situation que je vois trop souvent : 25 ans d'expertise, et une agence qui coupe l'abonnement du jour au lendemain — site inclus. J'ai récupéré le site en urgence, réhébergé, puis refondu entièrement, avec des pages dédiées aux implants, aux prothèses et aux flux Exocad / 3Shape que leurs dentistes partenaires recherchent nommément.",
        linkLabel: "Voir le projet au portfolio",
        linkHref: "/portfolio",
      }}
      benefits={[
        "Des pages par spécialité, parce qu'à Chambéry on vous cherche par acte, pas par raison sociale",
        "Un hébergement et un nom de domaine à VOTRE nom, jamais au mien",
        "Une reprise possible si votre site actuel est bloqué chez un prestataire",
        "Un site que vos confrères et vos patients peuvent lire depuis leur téléphone en salle d'attente",
      ]}
      servicesIntro="Beaucoup de mes clients chambériens arrivent avec un site hérité : fait par un stagiaire, un cousin, ou une agence partie sans laisser d'adresse. On repart de ce qui est récupérable, et on refait le reste proprement."
      seoSection={{
        title: "Création de site internet à Chambéry : être visible sur votre bassin",
        text: "Chambéry est le bassin le plus concurrentiel de Savoie : préfecture, université, zones d'activité de Bissy et de Savoie Technolac. Y ouvrir un site ne suffit pas, il faut apparaître sur les recherches locales. Chaque site que je livre part avec des balises title et méta rédigées une par une, une structure de contenu hiérarchisée, un maillage vers vos pages de service et des temps de chargement tenus. On travaille aussi votre fiche Google Business Profile, qui pèse lourd sur les recherches « près de moi » du secteur chambérien.",
      }}
      faq={FAQ}
      nearby={[
        { name: "Aix-les-Bains", href: "/agence-web-aix-les-bains" },
        { name: "Albertville", href: "/agence-web-albertville" },
        { name: "Annecy", href: "/agence-web-annecy" },
        { name: "Gilly-sur-Isère", href: "/agence-web-gilly-sur-isere" },
      ]}
    />
  );
}
