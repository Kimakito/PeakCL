import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/seo/site";
import { breadcrumbJsonLd, faqPageJsonLd, localBusinessJsonLd } from "@/seo/jsonld";
import { GeoLanding } from "@/components/GeoLanding";

/** FAQ propre a Beaufort : vente en ligne, temps a y consacrer, budget. */
const FAQ = [
  {
    question: "Je produis, je ne code pas. Combien de temps ça va me prendre ?",
    answerHtml:
      "Deux à trois heures de votre temps sur l'ensemble du projet, réparties en un appel de cadrage et deux allers-retours de validation. Le reste, c'est mon travail. La seule chose que je ne peux pas faire à votre place, c'est vous donner des photos correctes de vos produits et de votre atelier — et sur un savoir-faire du Beaufortain, ce sont elles qui vendent, pas mes textes.",
  },
  {
    question: "Je veux vendre mes produits en ligne. C'est un autre budget ?",
    answerHtml:
      "Oui, et c'est une décision à prendre en connaissance de cause : une boutique, ce sont des commandes à préparer, des colis à expédier et des retours à gérer, en plus de votre production. J'ai migré la boutique de Natural Riders de Jimdo vers PrestaShop, catalogue et photos repris un par un, donc je sais faire. Mais pour beaucoup de producteurs, une vitrine avec les points de vente et un formulaire de commande suffit largement la première année. Je vous le dirai franchement.",
  },
  {
    question: "Vous montez jusqu'ici ou tout se fait à distance ?",
    answerHtml:
      "Je monte. Gilly-sur-Isère - Beaufort, c'est une petite demi-heure par la vallée du Doron, et je préfère voir l'exploitation, la coopérative ou le gîte avant d'écrire quoi que ce soit. Ensuite, le suivi se fait par téléphone et par mail : vous n'allez pas redescendre à chaque validation en pleine saison d'alpage.",
  },
];

export const Route = createFileRoute("/agence-web-beaufort")({
  head: () => ({
    meta: [
      { title: "Création de site internet à Beaufort (Beaufortain) · PeakCL" },
      {
        name: "description",
        content:
          "Création de site internet à Beaufort et dans le Beaufortain : sites premium optimisés SEO local pour producteurs, artisans et hébergeurs. Audit gratuit sous 24h.",
      },
      { property: "og:title", content: "Création de site internet à Beaufort · PeakCL" },
      {
        property: "og:description",
        content:
          "Site internet et SEO local pour les activités de Beaufort et du Beaufortain. Audit gratuit sous 24h.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/agence-web-beaufort") },
      {
        "script:ld+json": breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Beaufort", path: "/agence-web-beaufort" },
        ]),
      },
      { "script:ld+json": faqPageJsonLd(FAQ) },
      {
        "script:ld+json": localBusinessJsonLd({
          city: "Beaufort",
          region: "Savoie",
          path: "/agence-web-beaufort",
          description:
            "Agence web à Beaufort : création de site internet et référencement local pour producteurs, artisans et hébergeurs du Beaufortain.",
          nearbyCities: ["Albertville", "Arêches", "Queige", "Villard-sur-Doron"],
        }),
      },
    ],
    links: [{ rel: "canonical", href: absUrl("/agence-web-beaufort") }],
  }),
  component: Page,
});

function Page() {
  return (
    <GeoLanding
      city="Beaufort"
      region="Savoie"
      serviceLabel="site internet"
      intro="Un site premium et rapide pour les producteurs, artisans et hébergeurs du Beaufortain, pensé pour valoriser un savoir-faire local et capter les visiteurs de la vallée."
      angleTitle="Pourquoi une page Beaufort ?"
      angleText="Le Beaufortain vit de son terroir et de son tourisme de montagne : producteurs, artisans, gîtes et activités de plein air y ont tout à gagner d'une vitrine en ligne soignée. Un site clair et bien référencé fait la différence quand un visiteur cherche un hébergement ou un produit local avant de monter dans la vallée. Basée à Gilly-sur-Isère, je travaille avec les acteurs du bassin albertvillois et du Beaufortain."
      localExample={{
        text: "Pas de client dans le Beaufortain à ce jour, autant vous le dire plutôt que d'habiller la page. Ce que j'ai fait de plus proche de vos enjeux : la boutique Natural Riders, coincée sur Jimdo et incapable de vendre sérieusement, que j'ai migrée vers PrestaShop — catalogue, photos et charte repris un par un, sans rien perdre en route. Et côté valorisation d'un savoir-faire, le site de Camille (Plumes Poils & Compagnie), qui devait faire comprendre en une page une activité que personne ne connaît de l'extérieur.",
        linkLabel: "Voir les projets au portfolio",
        linkHref: "/portfolio",
      }}
      seoSection={{
        title: "Un terroir se référence sur son nom, pas sur des mots génériques",
        text: "Dans le Beaufortain, votre atout de référencement est déjà là : le nom du produit et celui du lieu. « Beaufort », « Arêches », « Roselend », « vente directe », « alpage » — ce sont ces mots que tapent les visiteurs, bien plus que « fromagerie Savoie ». Un site bien construit les place là où ils comptent : titres de pages, structure, textes de vos fiches produits, et fiche Google Business Profile avec vos horaires réels de vente. Ajoutez des pages qui s'ouvrent vite, parce qu'on vous cherche souvent depuis la voiture, avec une barre de réseau.",
      }}
      benefits={[
        "Vos vraies photos d'atelier et d'alpage mises en valeur, pas des images de banque",
        "Vos horaires et points de vente à jour sur le site comme sur Google",
        "Un choix assumé entre vitrine et vraie boutique en ligne, selon ce que vous pouvez expédier",
        "Une visite sur place avant d'écrire la moindre ligne",
      ]}
      servicesIntro="Un savoir-faire du Beaufortain se raconte en images autant qu'en mots : logo, site et publications partent des mêmes photos et des mêmes couleurs, pour que le visiteur retrouve la même maison partout."
      faq={FAQ}
      nearby={[
        { name: "Albertville", href: "/agence-web-albertville" },
        { name: "Ugine", href: "/agence-web-ugine" },
        { name: "Moûtiers", href: "/agence-web-moutiers" },
        { name: "Gilly-sur-Isère", href: "/agence-web-gilly-sur-isere" },
      ]}
    />
  );
}
