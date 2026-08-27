import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/seo/site";
import { breadcrumbJsonLd, faqPageJsonLd, localBusinessJsonLd } from "@/seo/jsonld";
import { GeoLanding } from "@/components/GeoLanding";

/** FAQ propre a Aix-les-Bains, centree sur l'arbitrage WordPress / sur-mesure. */
const FAQ = [
  {
    question: "WordPress ou sur-mesure : vous poussez lequel ?",
    answerHtml:
      "Aucun des deux par principe, et je me méfie des prestataires qui n'en proposent qu'un. Je pose une seule question : allez-vous publier vous-même ? Si oui — actualités, tarifs de saison, nouvelles prestations — WordPress, parce que vous devez pouvoir modifier sans me rappeler ni me payer. Si non, le sur-mesure est plus rapide, plus léger et n'a aucune mise à jour de sécurité à surveiller.",
  },
  {
    question: "Je veux gérer mon site seule ensuite. C'est possible ?",
    answerHtml:
      "C'est même un cas que j'ai déjà traité en entier. Une praticienne en ostéopathie animale avait installé son WordPress : j'ai construit toutes les pages, rédigé tous les contenus, puis je lui ai laissé les clés. Depuis, elle publie seule. Je livre le site, je vous forme sur vos pages, et je m'efface — pas d'abonnement obligatoire pour changer une ligne.",
  },
  {
    question: "Mon site actuel est un thème acheté qui rame. Vous refaites ou vous réparez ?",
    answerHtml:
      "Je regarde d'abord, gratuitement, et je vous dis franchement lequel des deux vaut votre argent. Un thème premium bourré d'extensions se répare rarement : on gagne deux secondes de chargement en en supprimant la moitié, et on casse la mise en page. Quand le contenu est bon, je le récupère intégralement — c'est le contenant qu'on change, pas votre texte ni vos photos.",
  },
];

export const Route = createFileRoute("/agence-web-aix-les-bains")({
  head: () => ({
    meta: [
      // « agence wordpress aix-les-bains » remonte en impressions sans aucun
      // clic : le mot WordPress n'apparaissait nulle part sur la page. Il est
      // légitime ici — une partie du portfolio est livrée sous WordPress.
      { title: "Création de site internet à Aix-les-Bains · WordPress & sur mesure" },
      {
        name: "description",
        content:
          "Agence web à Aix-les-Bains : création de site WordPress ou sur-mesure, avec référencement local. Vous gardez la main sur votre site. Audit gratuit sous 24h.",
      },
      { property: "og:title", content: "Agence web & WordPress à Aix-les-Bains · PeakCL" },
      {
        property: "og:description",
        content:
          "Agence web à Aix-les-Bains : site WordPress ou sur-mesure, optimisé SEO local. Audit gratuit sous 24h.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/agence-web-aix-les-bains") },
      {
        "script:ld+json": breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Aix-les-Bains", path: "/agence-web-aix-les-bains" },
        ]),
      },
      { "script:ld+json": faqPageJsonLd(FAQ) },
      {
        "script:ld+json": localBusinessJsonLd({
          city: "Aix-les-Bains",
          region: "Savoie",
          path: "/agence-web-aix-les-bains",
          description:
            "Agence web à Aix-les-Bains : création de site WordPress ou codé sur mesure et référencement local pour commerces, hébergeurs et indépendants du bassin aixois.",
          nearbyCities: ["Chambéry", "Le Bourget-du-Lac", "Grésy-sur-Aix", "Rumilly"],
          services: [
            "Agence web Aix-les-Bains",
            "Agence WordPress Aix-les-Bains",
            "Création de site WordPress",
            "Site codé sur mesure",
            "Référencement local (SEO)",
          ],
        }),
      },
    ],
    links: [{ rel: "canonical", href: absUrl("/agence-web-aix-les-bains") }],
  }),
  component: Page,
});

function Page() {
  return (
    <GeoLanding
      city="Aix-les-Bains"
      region="Savoie"
      headline={
        <>
          Création de site internet à <span className="text-gradient">Aix-les-Bains</span> ·
          WordPress
        </>
      }
      intro="Un site WordPress ou codé sur mesure, rapide et structuré pour convertir les visiteurs locaux en prises de contact."
      angleTitle="Local, mais premium."
      angleText="Une page locale sert à attirer des recherches ciblées (Aix-les-Bains + service) et à convertir vite avec une offre claire et un design haut de gamme. Idéal pour les indépendants et commerces qui veulent une image à la hauteur de leur travail."
      localExample={{
        text: "Je préfère être honnête : mes deux références WordPress ne sont pas aixoises. L'une est une praticienne en ostéopathie animale, à qui j'ai construit toutes les pages avant de lui laisser les clés — elle publie seule depuis. L'autre est Le Juste Plan, cabinet d'architecture, avec présentation des projets en pleine page et formulaire de demande d'étude. Ce sont exactement les deux profils que je croise à Aix-les-Bains : le praticien qui veut son autonomie, et l'activité qui se vend par l'image.",
        linkLabel: "Voir les projets au portfolio",
        linkHref: "/portfolio",
      }}
      benefits={[
        "L'arbitrage WordPress / sur-mesure tranché par votre besoin d'autonomie, pas par ma préférence",
        "Une formation sur vos propres pages, pour publier sans me rappeler",
        "Vos accès, votre hébergement, votre nom de domaine : tout à votre nom",
        "Une fiche Google soignée, décisive quand le client compare avant de réserver",
      ]}
      servicesIntro="Autour du lac du Bourget, une bonne partie de la clientèle compare en ligne avant de pousser une porte : thermalisme, hébergement, praticiens du bien-être. Site, identité et réseaux doivent donc raconter la même chose au même moment."
      seoSection={{
        title: "Agence WordPress à Aix-les-Bains : reprendre la main sur votre site",
        text: "WordPress ou sur-mesure, je ne vends pas une chapelle : je choisis selon votre besoin d'autonomie. WordPress si vous voulez publier vos actualités, vos offres de saison ou vos tarifs sans me rappeler — je construis le site, je le sécurise, je vous forme et je vous laisse les clés. Sur-mesure si la performance et l'originalité priment. Dans les deux cas, même exigence : balises rédigées une par une, structure claire, chargement rapide et fiche Google Business Profile travaillée pour les recherches du bassin aixois.",
      }}
      faq={FAQ}
      nearby={[
        { name: "Chambéry", href: "/agence-web-chambery" },
        { name: "Albertville", href: "/agence-web-albertville" },
        { name: "Annecy", href: "/agence-web-annecy" },
        { name: "Gilly-sur-Isère", href: "/agence-web-gilly-sur-isere" },
      ]}
    />
  );
}
