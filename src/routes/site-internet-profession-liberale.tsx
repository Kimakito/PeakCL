import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/seo/site";
import { breadcrumbJsonLd, faqPageJsonLd, serviceJsonLd } from "@/seo/jsonld";
import { MetierLanding } from "@/components/MetierLanding";

/** FAQ propre aux professions libérales et cabinets. Alimente le JSON-LD. */
const FAQ = [
  {
    question: "Ma profession est réglementée. Que puis-je vraiment publier ?",
    answerHtml:
      "C'est la première question à traiter, et elle conditionne toute la rédaction. Selon votre ordre ou votre profession, la publicité comparative, les promesses de résultat et certains témoignages sont encadrés ou interdits. Un site conforme n'annonce pas « le meilleur cabinet de la région » : il expose des domaines d'intervention, une méthode et un parcours. C'est moins spectaculaire et bien plus efficace — un client cherche à être rassuré, pas à être vendu. Vous validez tout ce qui touche à votre exercice.",
  },
  {
    question: "Mes clients viennent par recommandation. À quoi bon un site ?",
    answerHtml:
      "La recommandation donne le nom, pas la décision. Quelqu'un à qui l'on vous a conseillé va vous chercher avant d'appeler : il veut vérifier vos domaines, votre parcours, votre adresse, et se faire une idée de la personne. S'il ne trouve rien, ou une page datée de huit ans, le doute s'installe au pire moment. Le site ne remplace pas la recommandation, il la transforme en rendez-vous.",
  },
  {
    question: "Je n'ai pas le temps d'alimenter un site.",
    answerHtml:
      "Alors on n'en construit pas un qui l'exige. Un cabinet n'a pas besoin d'un blog : il a besoin de pages stables et justes — domaines d'intervention, honoraires ou fourchettes, déroulé d'une mission, prise de rendez-vous. Ces pages se rédigent une fois. Si vous voulez publier, on met en place ce qu'il faut ; sinon, un forfait de maintenance à 99 €/mois suffit à ce que le site reste à jour et sécurisé sans vous.",
  },
  {
    question: "Vous avez déjà travaillé pour des cabinets ?",
    answerHtml:
      "Oui : le cabinet de Johanna Alfonso, avocate à Grenoble, un cabinet d'architecture, et Cime Stratégie, en assistanat de direction auprès de dirigeants. Trois exercices différents avec la même contrainte de fond — inspirer confiance avant le premier échange, sans jamais promettre un résultat.",
  },
];

export const Route = createFileRoute("/site-internet-profession-liberale")({
  head: () => ({
    meta: [
      { title: "Création de site internet pour profession libérale et cabinet · PeakCL" },
      {
        name: "description",
        content:
          "Site internet pour avocats, cabinets de conseil et professions libérales : domaines d'intervention, réassurance et prise de rendez-vous, dans le respect de votre déontologie. À partir de 2 000 € HT.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/site-internet-profession-liberale") },
      {
        "script:ld+json": breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          {
            name: "Site internet profession libérale",
            path: "/site-internet-profession-liberale",
          },
        ]),
      },
      { "script:ld+json": faqPageJsonLd(FAQ) },
      {
        "script:ld+json": serviceJsonLd({
          name: "Création de site internet pour profession libérale",
          description:
            "Création de site internet pour avocats, cabinets de conseil, experts et professions libérales : domaines d'intervention, réassurance et prise de rendez-vous.",
          serviceType: "Création de site internet pour profession libérale",
          path: "/site-internet-profession-liberale",
          audience:
            "Avocats, cabinets de conseil, experts, consultants et professions libérales réglementées, en Savoie et partout en France à distance.",
          offers: [
            {
              title: "Site de cabinet sur mesure",
              desc: "Domaines d'intervention, parcours, honoraires et prise de rendez-vous, rédigés dans le respect de la déontologie.",
              price: "2 000 €",
            },
            {
              title: "Refonte d'un site de cabinet",
              desc: "Modernisation d'un site daté sans perdre le référencement acquis.",
              price: "À partir de 1 200 €",
            },
          ],
        }),
      },
    ],
    links: [{ rel: "canonical", href: absUrl("/site-internet-profession-liberale") }],
  }),
  component: Page,
});

function Page() {
  return (
    <MetierLanding
      eyebrow="Professions libérales & cabinets"
      headline="Création de site internet pour profession libérale"
      intro="Un client qui vous confie un dossier, un litige ou ses comptes ne compare pas des prix : il cherche à savoir à qui il parle. Le site d'un cabinet a un seul travail — lever le doute avant le premier rendez-vous."
      problem={{
        title: "Ce qui bloque un client, c'est l'opacité, pas le tarif",
        text: "Sur les sites de cabinets que j'audite, je retrouve toujours les mêmes manques : on ne sait pas exactement quels dossiers vous traitez, rien n'indique comment se déroule une mission, les honoraires sont absents, et le parcours du fondateur tient en une ligne. Le visiteur referme. Ce n'est pas un problème de design : c'est un problème de réassurance, et il se corrige page par page — dans les limites que votre déontologie impose.",
      }}
      limit="Ce que je ne fais pas : rédiger du contenu juridique, comptable ou technique à votre place, ni décider de ce qui est publiable dans votre profession. J'écris la structure et les textes de présentation, vous validez tout ce qui touche à votre exercice. Sur les professions réglementées, c'est vous qui tranchez."
      benefits={[
        "Une page par domaine d'intervention, pour être trouvé sur le besoin et pas sur votre nom",
        "Votre parcours et vos qualifications mis en avant, pas relégués en bas de page",
        "Le déroulé d'une mission expliqué : ce qui se passe, dans quel ordre, sous quel délai",
        "Des honoraires ou des fourchettes affichés quand votre profession l'autorise",
        "Un ton conforme à votre déontologie : on expose, on ne promet pas de résultat",
      ]}
      pages={[
        {
          title: "Une page par domaine d'intervention",
          desc: "Personne ne cherche « avocat » : on cherche « rupture conventionnelle » ou « litige de voisinage ». Une page par domaine, c'est autant de portes d'entrée.",
        },
        {
          title: "Qui vous êtes, vraiment",
          desc: "Parcours, formations, barreau ou ordre, années d'exercice. C'est la deuxième page la plus visitée d'un site de cabinet, et souvent la plus vite expédiée.",
        },
        {
          title: "Comment se déroule une mission",
          desc: "Premier échange, pièces à fournir, étapes, délais. Cette page fait davantage pour la prise de rendez-vous que n'importe quel argument.",
        },
        {
          title: "Honoraires et premier contact",
          desc: "Modalités, fourchettes quand c'est permis, et un formulaire qui recueille l'essentiel sans transformer la demande en dossier.",
        },
      ]}
      proofs={[
        {
          name: "Cabinet Johanna Alfonso",
          role: "Avocate · Grenoble",
          text: "Un cabinet dont le site devait inspirer confiance dès la première seconde, sans tomber dans la promesse de résultat que la déontologie interdit. Site professionnel sous Jekyll et React, structuré autour de ses domaines et de la prise de contact.",
          siteUrl: "https://www.alfonso-avocat.fr/",
        },
        {
          name: "Le Juste Plan",
          role: "Cabinet d'architecture",
          text: "Un cabinet qui cherchait à valoriser une approche singulière. Portfolio WordPress haut de gamme créé intégralement, projets présentés en pleine page et interface de demande d'étude personnalisée, pour que les demandes arrivent déjà cadrées.",
          siteUrl: "https://lejusteplan.fr/",
        },
        {
          name: "Cime Stratégie",
          role: "Assistanat de direction · Savoie",
          text: "Aurélie accompagne des dirigeants de TPE et PME : gestion administrative, organisation, pilotage. Site WordPress structuré autour de ses quatre domaines d'intervention et d'un rendez-vous découverte, qu'elle alimente seule.",
          siteUrl: "https://cime-strategie.fr/",
        },
      ]}
      pricing="Site de cabinet sur mesure : 2 000 € HT. Version WordPress, que vous mettez à jour vous-même : à partir de 2 500 € HT. Refonte d'un site existant : à partir de 1 200 € HT. Maintenance optionnelle : 99 €/mois."
      faq={FAQ}
      related={[
        { label: "Agence web Chambéry", href: "/agence-web-chambery" },
        { label: "Site internet thérapeute", href: "/site-internet-therapeute" },
        {
          label: "Site internet architecte d'intérieur",
          href: "/site-internet-architecte-interieur",
        },
        { label: "Refonte de site pour PME", href: "/refonte-site-pme" },
        { label: "Portfolio", href: "/portfolio" },
      ]}
    />
  );
}
