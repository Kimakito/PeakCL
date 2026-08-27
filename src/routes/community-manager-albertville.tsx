import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/seo/site";
import { serviceJsonLd, breadcrumbJsonLd, faqPageJsonLd } from "@/seo/jsonld";
import { CommunityLanding } from "@/components/CommunityLanding";

/** FAQ propre a Albertville (bloc visible + JSON-LD FAQPage). */
const FAQ = [
  {
    question: "Vous publiez à ma place, mais qui prend les photos ?",
    answerHtml:
      "Les deux fonctionnent, et on tranche à l'appel. Soit vous m'envoyez vos photos au fil de l'eau depuis votre téléphone — un chantier fini, un produit qui sort, votre cabinet le matin — et je m'occupe du reste. Soit on cale une session de prises de vue sur place : je suis à cinq minutes d'Albertville, ça se fait en une matinée et ça alimente deux à trois mois de publications.",
  },
  {
    question: "Je n'ai aucun compte pour l'instant. Vous partez de zéro ?",
    answerHtml:
      "Oui, et c'est parfois plus simple. Pour Johan, de La Vieille Roue à Albertville, j'ai créé la page Facebook et écrit les premières publications en même temps que son site et sa fiche Google. Un compte neuf, bien nommé et cohérent avec le logo, vaut mieux qu'un vieux profil personnel rempli de photos de vacances.",
  },
  {
    question: "Je m'engage sur combien de temps ?",
    answerHtml:
      "Sur le mois en cours. Les formules vont de 4 à 20 publications par mois et s'arrêtent quand vous le décidez — pas de douze mois signés d'avance. En revanche, je vous préviens honnêtement : sous trois mois, on ne voit pas grand-chose. Les réseaux, c'est de la répétition, et un mois d'essai ne prouve rien.",
  },
];

export const Route = createFileRoute("/community-manager-albertville")({
  head: () => ({
    meta: [
      { title: "Gestion des réseaux sociaux à Albertville · Community manager · PeakCL" },
      {
        name: "description",
        content:
          "Community manager à Albertville : déléguez vos réseaux sociaux à Charlotte (PeakCL). Visuels brandés, rédaction et stratégie, formules mensuelles sans engagement.",
      },
      { property: "og:title", content: "Community manager à Albertville · PeakCL" },
      {
        property: "og:description",
        content:
          "Déléguez vos réseaux sociaux à une community manager formée, à Albertville. Formules mensuelles, sans engagement.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/community-manager-albertville") },
      {
        "script:ld+json": serviceJsonLd({
          name: "Community management à Albertville",
          description:
            "Gestion de réseaux sociaux pour indépendants et petites structures à Albertville : visuels brandés, rédaction, stratégie et publications régulières.",
          serviceType: "Community management",
          path: "/community-manager-albertville",
          areaServed: [{ "@type": "City", name: "Albertville" }],
        }),
      },
      {
        "script:ld+json": breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Community manager Albertville", path: "/community-manager-albertville" },
        ]),
      },
      { "script:ld+json": faqPageJsonLd(FAQ) },
    ],
    links: [{ rel: "canonical", href: absUrl("/community-manager-albertville") }],
  }),
  component: () => (
    <CommunityLanding
      city="Albertville"
      region="Savoie"
      intro="Déléguez vos réseaux sociaux à une community manager formée, basée juste à côté, à Gilly-sur-Isère. Une présence régulière et cohérente avec votre site et votre image, sans y passer vos soirées."
      angleTitle="Community management à Albertville : local et cohérent"
      angleText="Le tissu albertvillois est fait d'indépendants, d'artisans et de commerces qui n'ont pas le temps d'alimenter Instagram ou Facebook chaque semaine. Je prends le relais avec des visuels à vos couleurs et une ligne éditoriale claire, pensés pour donner envie de vous contacter. Étant à quelques minutes d'Albertville, je peux aussi vous rencontrer pour les shootings ou les temps forts."
      localProof={{
        text: "Johan, de La Vieille Roue (Jantes 73) à Albertville, n'avait rien : ni site, ni logo, ni page. J'ai lancé sa page Facebook et écrit ses premières publications en même temps que le reste de sa communication, pour que le premier client qui cherche son atelier trouve la même image partout.",
        linkLabel: "Voir le projet au portfolio",
        linkHref: "/portfolio",
      }}
      faq={FAQ}
      pains={[
        "Vous postez une photo de chantier quand vous y pensez, soit tous les deux mois.",
        "Votre page Facebook date de l'ouverture et n'a plus bougé depuis.",
        "Vos concurrents du bassin publient chaque semaine, et ça se voit.",
        "Vous finissez à 19h : Canva après le service ou après l'atelier, non.",
      ]}
      nearby={[
        { name: "Chambéry", href: "/community-manager-chambery" },
        { name: "Annecy", href: "/community-manager-annecy" },
        { name: "Aix-les-Bains", href: "/community-manager-aix-les-bains" },
        { name: "Site web à Albertville", href: "/agence-web-albertville" },
      ]}
    />
  ),
});
