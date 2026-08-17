import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/seo/site";
import { serviceJsonLd, breadcrumbJsonLd, faqPageJsonLd } from "@/seo/jsonld";
import { CommunityLanding } from "@/components/CommunityLanding";

/** FAQ propre a Annecy, centree video et logistique du contenu a distance. */
const FAQ = [
  {
    question: "Faut-il vraiment faire des reels ? Je déteste la vidéo.",
    answerHtml:
      "Non, pas si vous détestez ça — une vidéo forcée se voit en trois secondes et dessert plus qu'elle ne sert. Il existe deux autres voies : le format porté par vos réalisations (avant / après, détail du geste, coulisses filmées sans votre visage), et le format écrit soigné. Je pilote les comptes des 9 Poilus sur TikTok, Instagram et Facebook, donc je sais faire de la vidéo. Je sais aussi m'en passer.",
  },
  {
    question: "Vous êtes en Savoie. Comment vous récupérez mon contenu ?",
    answerHtml:
      "Un dossier partagé où vous déposez photos et vidéos quand vous en avez, et un point mensuel en visio de vingt minutes. C'est tout, et ça suffit pour tenir un rythme de deux publications par semaine. Pour les temps forts — nouvelle collection, ouverture, événement —, je monte à Annecy, comptez quarante minutes depuis Gilly-sur-Isère.",
  },
  {
    question: "Sur un marché comme Annecy, ça change quoi de déléguer ?",
    answerHtml:
      "Ça change la régularité, et à Annecy c'est ce qui vous distingue des indépendants qui publient trois fois puis disparaissent. Ce que ça ne change pas : votre offre et vos prix. Si votre positionnement n'est pas clair, aucun calendrier éditorial ne le rattrapera — on commence par ça, à l'audit gratuit, et je vous le dis si le problème est ailleurs.",
  },
];

export const Route = createFileRoute("/community-manager-annecy")({
  head: () => ({
    meta: [
      { title: "Community manager à Annecy (Haute-Savoie) · PeakCL" },
      {
        name: "description",
        content:
          "Community manager à Annecy : déléguez vos réseaux sociaux à Charlotte (PeakCL). Visuels brandés, rédaction et stratégie, formules mensuelles sans engagement.",
      },
      { property: "og:title", content: "Community manager à Annecy · PeakCL" },
      {
        property: "og:description",
        content:
          "Déléguez vos réseaux sociaux à une community manager formée, pour votre activité à Annecy. Formules mensuelles, sans engagement.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/community-manager-annecy") },
      {
        "script:ld+json": serviceJsonLd({
          name: "Community management à Annecy",
          description:
            "Gestion de réseaux sociaux pour indépendants et petites structures à Annecy : visuels brandés, rédaction, stratégie et publications régulières.",
          serviceType: "Community management",
          path: "/community-manager-annecy",
          areaServed: [{ "@type": "City", name: "Annecy" }],
        }),
      },
      {
        "script:ld+json": breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Community manager Annecy", path: "/community-manager-annecy" },
        ]),
      },
      { "script:ld+json": faqPageJsonLd(FAQ) },
    ],
    links: [{ rel: "canonical", href: absUrl("/community-manager-annecy") }],
  }),
  component: () => (
    <CommunityLanding
      city="Annecy"
      region="Haute-Savoie"
      intro="Des réseaux sociaux soignés et réguliers pour votre activité annécienne, gérés par une community manager qui pense aussi votre site et votre image. Une présence cohérente, sans y consacrer vos soirées."
      angleTitle="Community management à Annecy : une image à la hauteur"
      angleText="Annecy attire une clientèle exigeante et une forte concurrence visuelle : hôtellerie, bien-être, artisanat, tourisme. Sur ce marché, des visuels amateurs se remarquent tout de suite. Je vous apporte une identité réseaux nette, cohérente avec votre site et votre logo, et une régularité qui installe la confiance avant même le premier contact. Tout se pilote en visio, où que vous soyez dans le bassin annécien."
      localProof={{
        text: "Je n'ai pas encore de client annécien sur les réseaux, et je préfère l'écrire. Ma référence la plus parlante est Les 9 Poilus, une communauté autour des animaux de compagnie dont je pilote TikTok, Instagram et Facebook — c'est là que j'ai appris ce qui fait grossir une audience et ce qui la fait fuir. Le reste du portfolio compte des lancements de comptes pour des indépendants, du BTP à l'illustration.",
        linkLabel: "Voir le portfolio",
        linkHref: "/portfolio",
      }}
      faq={FAQ}
      pains={[
        "Vos photos sont belles, mais publiées une fois tous les quinze jours.",
        "Vous voyez passer des comptes annéciens très soignés et vous n'avez pas le temps de suivre.",
        "Votre feed ne ressemble ni à votre site, ni à votre boutique.",
        "Vous savez qu'il faudrait de la vidéo, et rien que d'y penser ça vous bloque.",
      ]}
      nearby={[
        { name: "Aix-les-Bains", href: "/community-manager-aix-les-bains" },
        { name: "Chambéry", href: "/community-manager-chambery" },
        { name: "Albertville", href: "/community-manager-albertville" },
        { name: "Site web à Annecy", href: "/agence-web-annecy" },
      ]}
    />
  ),
});
