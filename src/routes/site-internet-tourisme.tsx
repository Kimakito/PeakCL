import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/seo/site";
import { breadcrumbJsonLd, faqPageJsonLd, serviceJsonLd } from "@/seo/jsonld";
import { MetierLanding } from "@/components/MetierLanding";

/** FAQ propre au tourisme et aux activités de loisirs. Alimente le JSON-LD. */
const FAQ = [
  {
    question: "Mon activité est saisonnière. Le site sert-il toute l'année ?",
    answerHtml:
      "C'est justement l'intérêt. Une activité saisonnière se prépare hors saison : les gens réservent leurs vacances en janvier, cherchent une sortie une semaine avant, comparent trois mois à l'avance. Un site travaille pendant que vous êtes fermé — et c'est là qu'il rapporte le plus. La saison, elle, se joue sur les avis et les photos.",
  },
  {
    question: "Je suis sur des plateformes de réservation. C'est suffisant ?",
    answerHtml:
      "Elles apportent du volume et prennent une commission sur chaque réservation, en gardant la relation client. Votre site est le seul canal où une réservation vous appartient entièrement. Le bon calcul n'est pas de les quitter, mais de récupérer progressivement les clients qui vous connaissent déjà — ceux qui reviennent, à qui la plateforme n'apporte plus rien.",
  },
  {
    question: "Faut-il traduire le site ?",
    answerHtml:
      "Ça dépend d'où viennent vos visiteurs, et la réponse est dans vos statistiques, pas dans une intuition. Si une part réelle de votre clientèle est étrangère, une version anglaise se justifie — je l'ai fait pour ce site même. Sinon c'est du contenu à maintenir en double pour rien. On regarde les chiffres avant de décider.",
  },
  {
    question: "Vous connaissez le tourisme de montagne ?",
    answerHtml:
      "J'ai travaillé avec une agence de voyage et une ferme pédagogique, et je vis en Savoie, entre Albertville et la Tarentaise. Je connais le rythme des saisons, la clientèle mi-locale mi-de passage et la concurrence des offices de tourisme sur les recherches génériques. Je ne prétends pas connaître votre station mieux que vous.",
  },
];

export const Route = createFileRoute("/site-internet-tourisme")({
  head: () => ({
    meta: [
      { title: "Création de site internet pour le tourisme et les loisirs · PeakCL" },
      {
        name: "description",
        content:
          "Site internet pour hébergeurs, activités de loisirs et agences de voyage : réservation, saisonnalité, photos et référencement local. À partir de 2 000 € HT.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/site-internet-tourisme") },
      {
        "script:ld+json": breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Site internet tourisme", path: "/site-internet-tourisme" },
        ]),
      },
      { "script:ld+json": faqPageJsonLd(FAQ) },
      {
        "script:ld+json": serviceJsonLd({
          name: "Création de site internet pour le tourisme",
          description:
            "Création de site internet pour hébergeurs, activités de loisirs, fermes pédagogiques et agences de voyage : réservation, saisonnalité et référencement local.",
          serviceType: "Création de site internet pour le tourisme",
          path: "/site-internet-tourisme",
          audience:
            "Hébergeurs, gîtes, activités de loisirs, fermes pédagogiques, agences de voyage et prestataires de tourisme, en Savoie et partout en France.",
          offers: [
            {
              title: "Site vitrine tourisme",
              desc: "Offre, tarifs saisonniers, galerie, accès et prise de contact ou de réservation.",
              price: "2 000 €",
            },
            {
              title: "Version anglaise du site",
              desc: "Traduction et référencement du site dans une seconde langue, quand la clientèle étrangère le justifie.",
            },
          ],
        }),
      },
    ],
    links: [{ rel: "canonical", href: absUrl("/site-internet-tourisme") }],
  }),
  component: Page,
});

function Page() {
  return (
    <MetierLanding
      eyebrow="Tourisme & loisirs"
      headline="Création de site internet pour le tourisme"
      intro="Personne ne réserve une activité ou un hébergement sans avoir vu à quoi ça ressemble. Dans le tourisme, le site n'accompagne pas la décision : il la déclenche, souvent des mois avant la venue."
      problem={{
        title: "Une saison se gagne hors saison",
        text: "Vos clients décident quand vous êtes fermé. Ils cherchent en janvier pour juillet, comparent trois offres un dimanche soir, et tranchent sur des photos et un tarif lisible. Les sites de tourisme que j'audite ont presque tous le même défaut : de belles images trop lourdes qui mettent six secondes à s'afficher, des tarifs absents « pour donner envie d'appeler », et aucune information pratique. Résultat, le visiteur retourne sur la plateforme de réservation qui, elle, répond à ses questions — et prend sa commission.",
      }}
      limit="Une limite honnête : je n'ai pas encore livré de site pour un hôtel ni pour un gîte. Mes références en tourisme sont une agence de voyage et une ferme pédagogique, plus un média de sport outdoor en cours. Le socle est le même — photos, saisonnalité, réservation — mais je préfère le dire que de vous inventer une expérience de l'hébergement."
      benefits={[
        "Des photos qui donnent envie, cadrées et optimisées pour ne pas ralentir le site",
        "Des tarifs et des périodes lisibles, sans avoir à écrire pour les demander",
        "Un parcours de réservation ou de contact court, qui marche sur un téléphone en déplacement",
        "Un référencement pensé pour la vallée ou le bassin, pas seulement pour votre commune",
        "Une version anglaise si vos statistiques la justifient — pas par principe",
      ]}
      pages={[
        {
          title: "L'expérience, pas la description",
          desc: "Ce qu'on voit, ce qu'on fait, combien de temps ça dure, pour qui c'est. Un visiteur achète une journée, pas une prestation.",
        },
        {
          title: "Tarifs et saisons",
          desc: "Haute et basse saison, groupes, enfants, durée. Les afficher évite dix messages par semaine et filtre les demandes hors budget.",
        },
        {
          title: "Accès et informations pratiques",
          desc: "Route, parking, équipement à prévoir, météo. Dans le tourisme de montagne, c'est la page qui rassure avant de réserver.",
        },
        {
          title: "Réserver ou demander",
          desc: "Un formulaire court, ou un outil de réservation intégré. Chaque champ en trop est une réservation en moins.",
        },
      ]}
      proofs={[
        {
          name: "Adelante Voyages",
          role: "Agence de voyage · France",
          text: "Une agence dont les attentes étaient précises et les ambitions élevées. J'ai livré le site sous Jekyll avec un catalogue de voyages et un tableau de bord sur mesure pour qu'ils le gèrent eux-mêmes.",
          siteUrl: "https://adelantevoyages.fr/",
        },
        {
          name: "Plumes Poils & Compagnie",
          role: "Ferme pédagogique itinérante · Savoie",
          text: "Camille intervient en médiation animale et se déplace avec ses animaux. Le site devait faire comprendre en quelques secondes une activité qu'on ne connaît pas, et rendre la prise de contact évidente pour les écoles, les EHPAD et les familles.",
          siteUrl: "https://plumespoilscie.fr/",
        },
        {
          name: "Rock The Outdoor",
          role: "Média & boutique parapente · en cours",
          text: "Guillaume édite un média 100 % parapente doublé d'une boutique. Refonte fonctionnelle en cours : structure, performances et parcours entre les articles et la vente. Le visuel reste le sien.",
          siteUrl: "https://paragliding.rocktheoutdoor.com/",
        },
      ]}
      pricing="Site vitrine sur mesure : 2 000 € HT. Version WordPress, que vous alimentez au fil des saisons : à partir de 2 500 € HT. Boutique ou réservation en ligne : à partir de 3 800 € HT. Refonte d'un site existant : à partir de 1 200 € HT."
      faq={FAQ}
      related={[
        { label: "Agence web Moûtiers", href: "/agence-web-moutiers" },
        { label: "Agence web Annecy", href: "/agence-web-annecy" },
        { label: "Site internet commerçant", href: "/site-internet-commercant" },
        { label: "Création de sites web", href: "/sites-web" },
        { label: "Portfolio", href: "/portfolio" },
      ]}
    />
  );
}
