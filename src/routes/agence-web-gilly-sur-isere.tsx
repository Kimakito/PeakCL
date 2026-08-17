import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/seo/site";
import { breadcrumbJsonLd, faqPageJsonLd, localBusinessJsonLd } from "@/seo/jsonld";
import { GeoLanding } from "@/components/GeoLanding";

/** FAQ propre a Gilly-sur-Isere, ou PeakCL est reellement domiciliee. */
const FAQ = [
  {
    question: "Vous êtes vraiment basée à Gilly-sur-Isère ?",
    answerHtml:
      "Oui, l'adresse est réelle et c'est de là que je travaille — pas une domiciliation prise pour faire local. C'est aussi pour ça que cette page existe alors que Gilly est un village : quand quelqu'un du coin cherche qui fait des sites par ici, autant qu'il trouve la personne qui habite à côté plutôt qu'une agence lyonnaise avec une page « Savoie » automatique.",
  },
  {
    question: "Vous ne travaillez que dans le coin ?",
    answerHtml:
      "Non, et ce serait dommage. Le portfolio compte des clients en Isère, à Grenoble, et jusqu'en Suisse. Le local, c'est un confort — on peut se voir, je connais le terrain — pas une limite. Ce qui change entre un client d'à côté et un client à distance, c'est le nombre de cafés, pas la qualité du site.",
  },
  {
    question: "Concrètement, on se rencontre où ?",
    answerHtml:
      "Chez vous, dans votre atelier, votre cabinet, ou autour d'un café à Albertville — je suis à cinq minutes. Je préfère venir sur place au moins une fois : voir l'endroit où vous travaillez m'apprend plus sur ce que doit dire votre site qu'une heure de brief en visio. Ensuite, tout le suivi se fait à distance pour ne pas vous prendre vos journées.",
  },
];

export const Route = createFileRoute("/agence-web-gilly-sur-isere")({
  head: () => ({
    meta: [
      { title: "Création de site internet à Gilly-sur-Isère · PeakCL" },
      {
        name: "description",
        content:
          "Création & refonte de sites web à Gilly-sur-Isère, près d’Albertville. Site rapide, clair, pensé pour générer des prises de contact. Audit gratuit sous 24h.",
      },
      {
        property: "og:title",
        content: "Création de site internet à Gilly-sur-Isère · PeakCL",
      },
      {
        property: "og:description",
        content: "Création & refonte de sites web à Gilly-sur-Isère. Audit gratuit sous 24h.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/agence-web-gilly-sur-isere") },
      {
        "script:ld+json": breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Gilly-sur-Isère", path: "/agence-web-gilly-sur-isere" },
        ]),
      },
      { "script:ld+json": faqPageJsonLd(FAQ) },
      {
        "script:ld+json": localBusinessJsonLd({
          city: "Gilly-sur-Isère",
          region: "Savoie",
          path: "/agence-web-gilly-sur-isere",
          description:
            "Agence web basée à Gilly-sur-Isère : création de site internet et référencement local pour les indépendants et artisans de la vallée de la Tarentaise.",
          nearbyCities: ["Albertville", "Tours-en-Savoie", "Grignon", "Frontenex"],
        }),
      },
    ],
    links: [{ rel: "canonical", href: absUrl("/agence-web-gilly-sur-isere") }],
  }),
  component: Page,
});

function Page() {
  return (
    <GeoLanding
      city="Gilly-sur-Isère"
      region="Savoie"
      serviceLabel="site internet"
      intro="Un site premium, rapide et structuré pour convertir les visiteurs en prises de contact, localement et partout en France."
      angleTitle="Être visible sur « création de site internet Gilly-sur-Isère »."
      angleText="Pour remonter sur Google, il faut une page dédiée, avec une intention claire, un contenu utile (pas du blabla) et des signaux de confiance : portfolio, avis, performance. Juste à côté d'Albertville, je suis sur place."
      localExample={{
        text: "Ici, je ne suis pas « présente » : j'habite là. PeakCL, c'est une seule personne, Charlotte, et c'est de Gilly que partent le code, les logos et les publications de mes clients. Vous ne serez jamais transféré à un chef de projet qui n'a pas assisté au brief, et le numéro que vous appelez est le mien. Sur un village, c'est mesurable autrement : les clients du bassin, je les recroise au marché.",
        linkLabel: "Qui suis-je",
        linkHref: "/qui-suis-je",
      }}
      seoSection={{
        title: "Une page pour un village : pourquoi ça se défend",
        text: "Personne ne tape « création de site internet Gilly-sur-Isère » par milliers, et je n'ai pas fait cette page pour le volume. Elle sert à deux choses : dire clairement où je suis domiciliée — Google croise l'adresse du site, la fiche Google Business Profile et les mentions ailleurs sur le web pour juger si une entreprise locale est crédible — et donner un point de départ aux recherches du bassin, qui basculent vite sur « Albertville ». Cohérence d'adresse partout, balises propres, maillage vers les pages voisines.",
      }}
      benefits={[
        "Une adresse réelle en Savoie, cohérente entre le site, la fiche Google et les mentions légales",
        "La même personne du premier appel à la mise en ligne",
        "Une rencontre possible sur place, à cinq minutes d'Albertville",
        "Un travail livré aussi bien à distance : Isère, Grenoble, Suisse",
      ]}
      servicesIntro="Site, identité et réseaux au même endroit, ce n'est pas un argument de vente ici : c'est la seule façon de tenir une cohérence quand on est une petite structure et qu'on n'a le temps de briefer personne."
      faq={FAQ}
      nearby={[
        { name: "Albertville", href: "/agence-web-albertville" },
        { name: "Chambéry", href: "/agence-web-chambery" },
        { name: "Aix-les-Bains", href: "/agence-web-aix-les-bains" },
        { name: "Annecy", href: "/agence-web-annecy" },
      ]}
    />
  );
}
