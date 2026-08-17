import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/seo/site";
import { breadcrumbJsonLd, faqPageJsonLd, localBusinessJsonLd } from "@/seo/jsonld";
import { GeoLanding } from "@/components/GeoLanding";

/** FAQ propre a Annecy (bloc visible + JSON-LD FAQPage). */
const FAQ = [
  {
    question: "Vous êtes en Savoie, pas à Annecy. C'est un problème ?",
    answerHtml:
      "Pour le travail, non : tout se pilote en visio et je livre des clients partout en France. Pour la rencontre, comptez quarante minutes depuis Gilly-sur-Isère, et je me déplace volontiers pour un premier rendez-vous ou un shooting. La vraie question n'est pas la distance, c'est de savoir si je connais votre métier — et là, le portfolio répond mieux que moi.",
  },
  {
    question: "Pourquoi vos tarifs ne sont pas affichés ?",
    answerHtml:
      "Parce qu'un prix affiché sans connaître votre projet est un prix faux, et qu'à Annecy vous trouverez des devis allant de 800 € à 15 000 € pour la même phrase « site vitrine ». Je préfère un appel, puis un devis chiffré ligne par ligne sous 48h ouvrées. Vous saurez ce que vous payez et ce que vous ne payez pas.",
  },
  {
    question: "En combien de temps je remonte sur Google à Annecy ?",
    answerHtml:
      "Pas en trois semaines, et quiconque vous le promet sur un marché comme Annecy vous ment. Comptez plutôt trois à six mois pour installer des positions sur vos requêtes métier, plus vite sur votre nom et sur les recherches « près de moi » si la fiche Google Business Profile est bien remplie. Ce que je garantis, c'est le travail de fond : structure, contenus, performance. Pas un classement.",
  },
];

export const Route = createFileRoute("/agence-web-annecy")({
  head: () => ({
    meta: [
      { title: "Création de site web à Annecy (Haute-Savoie) · PeakCL" },
      {
        name: "description",
        content:
          "Création & refonte de sites web premium à Annecy. Un site rapide, clair et pensé pour générer des prises de contact. Audit gratuit sous 24h.",
      },
      {
        property: "og:title",
        content: "Création de site web à Annecy · PeakCL",
      },
      {
        property: "og:description",
        content: "Création & refonte de sites web premium à Annecy. Audit gratuit sous 24h.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/agence-web-annecy") },
      {
        "script:ld+json": breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Annecy", path: "/agence-web-annecy" },
        ]),
      },
      {
        "script:ld+json": faqPageJsonLd(FAQ),
      },
      {
        "script:ld+json": localBusinessJsonLd({
          city: "Annecy",
          region: "Haute-Savoie",
          path: "/agence-web-annecy",
          description:
            "Agence web à Annecy : création de site internet, refonte et référencement local pour indépendants, commerces et professions libérales du bassin annécien.",
          nearbyCities: ["Annecy-le-Vieux", "Seynod", "Cran-Gevrier", "Rumilly"],
        }),
      },
    ],
    links: [{ rel: "canonical", href: absUrl("/agence-web-annecy") }],
  }),
  component: Page,
});

function Page() {
  return (
    <GeoLanding
      city="Annecy"
      region="Haute-Savoie"
      intro="Un site premium, rapide et structuré pour convertir les visiteurs locaux en prises de contact."
      angleTitle="Un site qui fait le tri."
      angleText="Annecy est concurrentiel : l'objectif est une page et une structure qui rassurent, positionnent haut de gamme, et transforment en demandes qualifiées. On vise la qualité du contact, pas seulement le volume de visites."
      localExample={{
        text: "Autant le dire tout de suite : je n'ai pas encore de vitrine annécienne à vous montrer. Ma cliente la plus proche est Laura, de Mordant Équin, dentiste équine — son site est référencé sur un rayon de 250 km, Haute-Savoie comprise, parce que ses clients ne sont pas au coin de la rue mais dans les écuries de la région. C'est ce travail-là que je sais faire pour Annecy : viser les gens qui vous cherchent, où qu'ils habitent, plutôt que de me contenter du nom de la ville.",
        linkLabel: "Voir le portfolio",
        linkHref: "/portfolio",
      }}
      seoSection={{
        title: "Se référencer à Annecy quand on n'est pas le plus gros budget",
        text: "Annecy attire des prestataires haut de gamme et, avec eux, des budgets de communication conséquents. Se battre sur « agence web Annecy » n'a aucun sens pour un indépendant, et je ne vous le proposerai pas. Ce qui marche : vos requêtes métier, votre quartier, vos spécialités précises, et une fiche Google Business Profile complète pour capter les recherches « près de moi ». Structure de contenu hiérarchisée, balises rédigées une par une, temps de chargement tenus — le reste, c'est de la patience.",
      }}
      benefits={[
        "Un ciblage sur vos requêtes métier plutôt que sur le mot le plus cher",
        "Des signaux de confiance travaillés : avis, réalisations, temps de chargement",
        "Un devis chiffré ligne par ligne, sans forfait opaque",
        "Une réponse franche si votre projet ne justifie pas un site complet",
      ]}
      servicesIntro="À Annecy, vos futurs clients comparent trois prestataires avant de vous écrire. Ce qui fait pencher, c'est rarement le catalogue de services : c'est la cohérence entre ce que dit votre site, ce que montrent vos réseaux et ce que promet votre logo."
      faq={FAQ}
      nearby={[
        { name: "Aix-les-Bains", href: "/agence-web-aix-les-bains" },
        { name: "Chambéry", href: "/agence-web-chambery" },
        { name: "Albertville", href: "/agence-web-albertville" },
        { name: "Gilly-sur-Isère", href: "/agence-web-gilly-sur-isere" },
      ]}
    />
  );
}
