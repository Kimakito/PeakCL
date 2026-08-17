import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/seo/site";
import { breadcrumbJsonLd, faqPageJsonLd, localBusinessJsonLd } from "@/seo/jsonld";
import { GeoLanding } from "@/components/GeoLanding";

/** FAQ propre a Moutiers : saisonnalite, clientele de passage, langues. */
const FAQ = [
  {
    question: "Mon activité est saisonnière. Un site tient-il debout le reste de l'année ?",
    answerHtml:
      "C'est justement l'intérêt. Vos clients d'hiver préparent leur séjour en septembre et en octobre, quand votre boutique est calme : si le site n'existe pas à ce moment-là, la réservation part ailleurs. Et l'été, ce sont les habitants de la vallée qui cherchent un artisan ou un commerce, pas les skieurs. Un site travaille sur les deux saisons ; une page Facebook alimentée seulement en janvier, non.",
  },
  {
    question: "Une partie de ma clientèle est étrangère. Vous faites des sites en anglais ?",
    answerHtml:
      "Oui, et le site que vous lisez en est la démonstration : il existe en français et en anglais, avec les balises hreflang qui indiquent à Google quelle version servir à qui. À Moûtiers, ça se justifie vite — la gare déverse chaque samedi d'hiver une clientèle qui ne lit pas le français. On traduit ce qui sert à décider (prestations, tarifs, accès, réservation), pas les 40 pages du site.",
  },
  {
    question: "Je veux que les gens réservent directement. C'est possible ?",
    answerHtml:
      "Oui. Pour Johan, à Albertville, j'ai mis en place une prise de rendez-vous en ligne reliée à son agenda — il ouvre l'atelier, les créneaux se remplissent sans qu'il décroche. Le principe vaut pour un hébergement, un institut ou un loueur de matériel. On regarde d'abord si vous êtes déjà sur une plateforme de réservation : dans ce cas on la connecte plutôt que de la doubler.",
  },
];

export const Route = createFileRoute("/agence-web-moutiers")({
  head: () => ({
    meta: [
      { title: "Création de site internet à Moûtiers (Tarentaise) · PeakCL" },
      {
        name: "description",
        content:
          "Création de site internet à Moûtiers et en Tarentaise : sites premium optimisés SEO local, pour commerces, saisonniers et hébergeurs. Audit gratuit sous 24h.",
      },
      { property: "og:title", content: "Création de site internet à Moûtiers · PeakCL" },
      {
        property: "og:description",
        content:
          "Site internet et SEO local pour les activités de Moûtiers et de la Tarentaise. Audit gratuit sous 24h.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/agence-web-moutiers") },
      {
        "script:ld+json": breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Moûtiers", path: "/agence-web-moutiers" },
        ]),
      },
      { "script:ld+json": faqPageJsonLd(FAQ) },
      {
        "script:ld+json": localBusinessJsonLd({
          city: "Moûtiers",
          region: "Savoie",
          path: "/agence-web-moutiers",
          description:
            "Agence web à Moûtiers : création de site internet et référencement local pour commerces, saisonniers et hébergeurs de Tarentaise.",
          nearbyCities: ["Albertville", "Bozel", "Aime-la-Plagne", "Salins-Fontaine"],
        }),
      },
    ],
    links: [{ rel: "canonical", href: absUrl("/agence-web-moutiers") }],
  }),
  component: Page,
});

function Page() {
  return (
    <GeoLanding
      city="Moûtiers"
      region="Savoie"
      serviceLabel="site internet"
      intro="Un site premium et rapide pour les commerces, hébergeurs et indépendants de Moûtiers et de la Tarentaise, pensé pour capter une clientèle locale comme saisonnière."
      angleTitle="Pourquoi une page Moûtiers ?"
      angleText="Moûtiers est la porte d'entrée des stations de Tarentaise : commerces de centre-ville, artisans, hébergeurs et services y vivent au rythme des saisons. Un site clair et bien référencé permet d'être trouvé toute l'année, par les habitants comme par les visiteurs de passage. Basée à Gilly-sur-Isère, à trente minutes, je connais la vallée et ses besoins."
      localExample={{
        text: "Je n'ai pas encore de client à Moûtiers même, et je ne vais pas vous inventer une réalisation en Tarentaise. Le plus proche, c'est Johan à Albertville, à trente minutes : parti de zéro, il est reparti avec logo, site, fiche Google et prise de rendez-vous en ligne — le paquet exact dont a besoin un commerce ou un artisan qui vit d'une clientèle mi-locale, mi-de passage.",
        linkLabel: "Voir le projet au portfolio",
        linkHref: "/portfolio",
      }}
      seoSection={{
        title: "Être trouvé par deux clientèles qui ne cherchent pas pareil",
        text: "À Moûtiers, vous vendez à deux publics distincts. L'habitant de la vallée tape votre métier plus la ville, souvent depuis son téléphone, et regarde d'abord la fiche Google et les avis. Le visiteur, lui, cherche des semaines à l'avance depuis chez lui, en comparant sur des critères d'accès et de tarifs — parfois en anglais. Un site qui parle aux deux ne se construit pas pareil qu'un site de centre-ville classique : pages de service claires pour les uns, informations pratiques et réservation pour les autres, et des pages qui chargent vite même avec une connexion de vallée.",
      }}
      benefits={[
        "Des pages pensées pour la clientèle locale ET pour celle qui prépare son séjour",
        "Une version anglaise possible, balises hreflang comprises",
        "Une prise de rendez-vous ou une réservation reliée à votre agenda",
        "Des pages légères, qui s'ouvrent vite en 4G dans la vallée",
      ]}
      servicesIntro="En Tarentaise, l'activité se joue sur quelques semaines : le site, les visuels et les réseaux doivent être prêts avant la saison, pas pendant. On cale le calendrier à l'envers, à partir de votre ouverture."
      faq={FAQ}
      nearby={[
        { name: "Albertville", href: "/agence-web-albertville" },
        { name: "Ugine", href: "/agence-web-ugine" },
        { name: "Beaufort", href: "/agence-web-beaufort" },
        { name: "Gilly-sur-Isère", href: "/agence-web-gilly-sur-isere" },
      ]}
    />
  );
}
