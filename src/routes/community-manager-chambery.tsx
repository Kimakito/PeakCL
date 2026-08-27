import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/seo/site";
import { serviceJsonLd, breadcrumbJsonLd, faqPageJsonLd } from "@/seo/jsonld";
import { CommunityLanding } from "@/components/CommunityLanding";

/** FAQ propre a Chambery, orientee B2B et professions liberales. */
const FAQ = [
  {
    question: "Mon activité est B2B. LinkedIn plutôt qu'Instagram ?",
    answerHtml:
      "Souvent oui, et je préfère le dire plutôt que de vous vendre quatre réseaux. Pour SETIC Fluides, bureau d'études en thermique et sécurité incendie, j'ai créé la page LinkedIn et le calendrier éditorial qui va avec — leurs clients sont des maîtres d'ouvrage et des architectes, ils ne sont pas sur Instagram. À Chambéry, avec les zones d'activité et les professions libérales, ce cas revient souvent.",
  },
  {
    question: "Qui répond aux commentaires et aux messages privés ?",
    answerHtml:
      "Vous, sauf demande contraire, et c'est volontaire. Je publie, je surveille et je vous signale ce qui appelle une réponse, mais un prospect qui demande un tarif ou un patient qui pose une question mérite votre réponse, pas la mienne. Je peux traiter les messages courants si vous me donnez le cadre, à condition qu'il soit écrit noir sur blanc.",
  },
  {
    question: "Au bout de combien de publications on voit quelque chose ?",
    answerHtml:
      "Comptez trois mois à raison de deux publications par semaine avant de juger, et ne regardez pas les likes : regardez les messages reçus et les gens qui vous disent « je vous ai vu passer ». Le rapport mensuel que je vous envoie est fait pour ça — court, lisible, sans capture de statistiques qui ne vous sert à rien.",
  },
];

export const Route = createFileRoute("/community-manager-chambery")({
  head: () => ({
    meta: [
      { title: "Gestion des réseaux sociaux à Chambéry · Community manager · PeakCL" },
      {
        name: "description",
        content:
          "Community manager à Chambéry : déléguez vos réseaux sociaux à Charlotte (PeakCL). Visuels brandés, rédaction et stratégie, formules mensuelles sans engagement.",
      },
      { property: "og:title", content: "Community manager à Chambéry · PeakCL" },
      {
        property: "og:description",
        content:
          "Déléguez vos réseaux sociaux à une community manager formée, pour votre activité à Chambéry. Formules mensuelles, sans engagement.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/community-manager-chambery") },
      {
        "script:ld+json": serviceJsonLd({
          name: "Community management à Chambéry",
          description:
            "Gestion de réseaux sociaux pour indépendants et petites structures à Chambéry : visuels brandés, rédaction, stratégie et publications régulières.",
          serviceType: "Community management",
          path: "/community-manager-chambery",
          areaServed: [{ "@type": "City", name: "Chambéry" }],
        }),
      },
      {
        "script:ld+json": breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Community manager Chambéry", path: "/community-manager-chambery" },
        ]),
      },
      { "script:ld+json": faqPageJsonLd(FAQ) },
    ],
    links: [{ rel: "canonical", href: absUrl("/community-manager-chambery") }],
  }),
  component: () => (
    <CommunityLanding
      city="Chambéry"
      region="Savoie"
      intro="Une présence sur les réseaux sociaux régulière et à votre image, gérée par une community manager qui maîtrise aussi votre site et votre identité visuelle. Vous gardez votre temps, vos réseaux avancent."
      angleTitle="Community management à Chambéry : sortir du lot"
      angleText="Chambéry concentre commerces, professions libérales et jeunes structures qui se disputent l'attention sur Instagram et LinkedIn. Se démarquer demande une ligne éditoriale nette et des visuels reconnaissables, pas des posts au hasard. Je construis cette régularité pour vous, alignée sur votre site et votre logo, et je pilote tout à distance avec un point mensuel simple."
      localProof={{
        text: "SETIC Fluides, bureau d'études savoyard en thermique, fluides et sécurité incendie, n'avait aucune présence en ligne. En plus du site et du logo, j'ai créé leur page LinkedIn et le calendrier éditorial qui l'alimente : sur ce métier, une publication utile vaut mieux que dix posts d'ambiance.",
        linkLabel: "Voir le projet au portfolio",
        linkHref: "/portfolio",
      }}
      faq={FAQ}
      pains={[
        "Votre LinkedIn dort depuis la création du compte.",
        "Vous publiez trois fois en janvier, plus rien jusqu'en septembre.",
        "Vos visuels sortent d'un modèle Canva que trois cabinets chambériens utilisent aussi.",
        "Vous n'avez pas le temps, entre les rendez-vous et l'administratif.",
      ]}
      nearby={[
        { name: "Aix-les-Bains", href: "/community-manager-aix-les-bains" },
        { name: "Albertville", href: "/community-manager-albertville" },
        { name: "Annecy", href: "/community-manager-annecy" },
        { name: "Site web à Chambéry", href: "/agence-web-chambery" },
      ]}
    />
  ),
});
