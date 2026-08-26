import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/seo/site";
import { breadcrumbJsonLd, faqPageJsonLd, serviceJsonLd } from "@/seo/jsonld";
import { MetierLanding } from "@/components/MetierLanding";

/** FAQ propre aux métiers de l'aménagement. Alimente aussi le JSON-LD FAQPage. */
const FAQ = [
  {
    question: "Mon travail est visuel. Est-ce qu'un site ne va pas l'abîmer ?",
    answerHtml:
      "C'est le risque, et c'est pour ça qu'un site de projet se construit à l'envers des autres : on part des images, pas du texte. Grandes photos en pleine largeur, pas de cadre superflu, chargement rapide pour que rien ne s'affiche en flou. Pour Le Juste Plan, cabinet d'architecture, les projets sont présentés en pleine page pour cette raison précise.",
  },
  {
    question: "Comment on fait comprendre une approche, et pas seulement un style ?",
    answerHtml:
      "En la mettant en première ligne, littéralement. Céline, de C'mieux comme ça, a une phrase signature : « Votre habitat s'adapte à vous, et non l'inverse ! ». Il fallait qu'un visiteur la comprenne en trois secondes, avant même de faire défiler. C'est ce genre d'arbitrage — quoi mettre en haut, quoi couper — qui distingue un portfolio d'un vrai site commercial.",
  },
  {
    question: "Je reçois des demandes trop vagues. Le site peut y faire quelque chose ?",
    answerHtml:
      "Oui, et c'est souvent le meilleur retour sur investissement du projet. Un formulaire de demande d'étude qui pose les bonnes questions — type de bien, surface, budget d'enveloppe, délai, niveau de prestation attendu — filtre en amont. Vous passez moins de temps en premier rendez-vous sur des projets hors périmètre.",
  },
  {
    question: "WordPress ou sur mesure, pour un portfolio ?",
    answerHtml:
      "Si vous ajoutez un projet tous les mois et voulez le faire seul, WordPress est le bon choix : c'est ce que j'ai fait pour Le Juste Plan. Si vos réalisations changent rarement et que vous voulez le rendu le plus rapide et le plus maîtrisé possible, le sur-mesure gagne. Je vous dis lequel je recommande à l'appel, selon votre rythme de publication — pas selon ma préférence.",
  },
];

export const Route = createFileRoute("/site-internet-architecte-interieur")({
  head: () => ({
    meta: [
      { title: "Création de site internet pour architecte d'intérieur · PeakCL" },
      {
        name: "description",
        content:
          "Site internet pour architectes d'intérieur et décorateurs : portfolio de réalisations en pleine page, approche mise en avant et demandes d'étude qualifiées. À partir de 2 000 € HT.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/site-internet-architecte-interieur") },
      {
        "script:ld+json": breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          {
            name: "Site internet architecte d'intérieur",
            path: "/site-internet-architecte-interieur",
          },
        ]),
      },
      { "script:ld+json": faqPageJsonLd(FAQ) },
      {
        "script:ld+json": serviceJsonLd({
          name: "Création de site internet pour architecte d'intérieur",
          description:
            "Création de site internet pour architectes d'intérieur, décorateurs et cabinets d'architecture : portfolio de réalisations et demandes d'étude qualifiées.",
          serviceType: "Création de site internet pour architecte d'intérieur",
          path: "/site-internet-architecte-interieur",
          audience:
            "Architectes d'intérieur, décorateurs, cabinets d'architecture et maîtres d'œuvre, en Savoie et partout en France à distance.",
          offers: [
            {
              title: "Portfolio sur mesure",
              desc: "Réalisations en pleine page, chargement optimisé pour les images lourdes, formulaire de demande d'étude.",
              price: "2 000 €",
            },
            {
              title: "Portfolio WordPress autonome",
              desc: "Vous ajoutez vos projets vous-même, avec formation à la prise en main.",
              price: "À partir de 2 500 €",
            },
          ],
        }),
      },
    ],
    links: [{ rel: "canonical", href: absUrl("/site-internet-architecte-interieur") }],
  }),
  component: Page,
});

function Page() {
  return (
    <MetierLanding
      eyebrow="Architectes d'intérieur & décorateurs"
      headline="Création de site internet pour architecte d'intérieur"
      intro="Votre métier se juge à l'œil, en quelques secondes. Un site qui charge lentement, compresse mal vos images ou noie vos projets dans du texte vous dessert plus qu'il ne vous sert."
      problem={{
        title: "Un portfolio n'est pas un site commercial",
        text: "La plupart des sites d'architectes d'intérieur montrent bien les réalisations et ne disent rien du reste : combien coûte une mission, comment elle se déroule, ce qui est inclus, à quel moment vous intervenez. Le visiteur admire, puis part sans écrire, parce qu'il ne sait pas s'il est dans votre périmètre. La galerie déclenche l'envie ; ce sont les pages autour qui déclenchent le message.",
      }}
      limit="Une limite : je ne fais pas de rendu 3D ni de retouche architecturale. Je travaille à partir de vos photos et de vos visuels — je les optimise, je les mets en scène, mais je ne les fabrique pas."
      benefits={[
        "Des réalisations en pleine page, sans cadre parasite ni image dégradée",
        "Un chargement rapide malgré des visuels lourds, condition d'un bon référencement",
        "Votre approche formulée en haut de page, pas cachée dans un « à propos »",
        "Un formulaire de demande d'étude qui qualifie le projet avant le premier rendez-vous",
        "Le choix assumé entre autonomie (WordPress) et rendu maîtrisé (sur mesure)",
      ]}
      pages={[
        {
          title: "Chaque projet, sa page",
          desc: "Avant/après, contraintes du lieu, arbitrages, matériaux. Une page par réalisation, c'est aussi une porte d'entrée de plus sur Google.",
        },
        {
          title: "Votre méthode, étape par étape",
          desc: "Première visite, relevé, plans, suivi de chantier. Un client qui comprend le déroulé se projette — et négocie moins.",
        },
        {
          title: "Périmètre et budget d'entrée",
          desc: "Le sujet que presque personne n'affiche. Une fourchette d'enveloppe évite les rendez-vous inutiles des deux côtés.",
        },
        {
          title: "Demande d'étude qualifiée",
          desc: "Type de bien, surface, délai, budget, photos. Vous recevez un dossier, pas un « bonjour, je voudrais des informations ».",
        },
      ]}
      proofs={[
        {
          name: "C'mieux comme ça",
          role: "Architecte d'intérieur · Albertville",
          text: "Céline a une phrase signature : « Votre habitat s'adapte à vous, et non l'inverse ! ». Il fallait que le site transmette cette philosophie au premier coup d'œil. Site élégant, galerie de réalisations soignée, formulaire qui convertit. J'ai aussi retravaillé son logo — qui n'était pas de moi à l'origine — pour qu'il tienne sur tous les supports.",
          siteUrl: "https://www.cmieuxcommeca.com/",
        },
        {
          name: "Le Juste Plan",
          role: "Architecture · WordPress",
          text: "Un cabinet qui cherchait à valoriser une approche singulière. Portfolio WordPress haut de gamme créé intégralement, projets présentés en pleine page et interface de demande d'étude personnalisée — pour que les demandes arrivent déjà cadrées.",
          siteUrl: "https://lejusteplan.fr/",
        },
        {
          name: "SETIC Fluides",
          role: "Bureau d'études · BTP · Savoie",
          text: "Voisin de métier : thermique, fluides et sécurité incendie, sans aucune présence en ligne. Site institutionnel sobre mettant en valeur les expertises techniques et les projets menés en Savoie et Rhône-Alpes, plus la création de la page LinkedIn.",
          siteUrl: "https://setic-fluides.netlify.app/",
        },
      ]}
      pricing="Portfolio sur mesure : 2 000 € HT. Version WordPress, que vous alimentez vous-même : à partir de 2 500 € HT. Refonte d'un site existant : à partir de 1 200 € HT. Identité visuelle complète en complément : à partir de 500 € HT."
      faq={FAQ}
      related={[
        { label: "Agence web Albertville", href: "/agence-web-albertville" },
        { label: "Site internet artisan", href: "/site-internet-artisan" },
        { label: "Design graphique", href: "/design" },
        { label: "Création de sites web", href: "/sites-web" },
        { label: "Portfolio", href: "/portfolio" },
      ]}
    />
  );
}
