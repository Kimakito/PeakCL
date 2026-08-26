import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/seo/site";
import { breadcrumbJsonLd, faqPageJsonLd, serviceJsonLd } from "@/seo/jsonld";
import { MetierLanding } from "@/components/MetierLanding";

/**
 * FAQ propre aux artisans : questions réellement posées en rendez-vous, pas un
 * bloc générique recopié d'une page à l'autre. Elle alimente le texte visible
 * ET le JSON-LD FAQPage, d'où la constante partagée.
 */
const FAQ = [
  {
    question: "J'ai déjà une page Facebook. J'ai vraiment besoin d'un site ?",
    answerHtml:
      "Une page Facebook ne sort pas quand quelqu'un tape « rénovation salle de bain » plus le nom de sa commune : Google renvoie des sites et des fiches Google Business Profile. Et une page Facebook ne vous appartient pas — si le compte saute, tout part avec. Chez Stéphane (SP Services Rénovation), on a gardé Instagram, qui marchait bien pour lui, et je l'ai intégré directement dans le site : les photos de chantier alimentent les deux d'un coup.",
  },
  {
    question: "Je n'ai pas de belles photos de mes chantiers, ça va poser problème ?",
    answerHtml:
      "C'est le point qui bloque le plus souvent, et c'est réglable. Des photos prises au téléphone, en pleine lumière, avant/après, font parfaitement l'affaire — mieux que des images de banque qu'un client reconnaît au premier coup d'œil. Je vous dis quoi photographier et sous quel angle, et je m'occupe du recadrage et de l'optimisation.",
  },
  {
    question: "Combien de temps ça prend, et qu'est-ce que ça me demande à moi ?",
    answerHtml:
      "Trois à cinq semaines pour un site vitrine, et le devis part sous 48h ouvrées après notre appel. De votre côté : une heure d'échange au départ, vos photos de chantiers, et une relecture. Ce qui rallonge un projet, ce n'est jamais la technique, c'est le temps de rassembler les photos — autant le savoir avant de commencer.",
  },
  {
    question: "Est-ce que ça me fera vraiment sortir sur Google ?",
    answerHtml:
      "Sur le nom de votre entreprise, oui, rapidement. Sur des recherches du type « métier + commune », c'est un travail de fond : structure du site, contenus, et surtout une fiche Google Business Profile tenue à jour avec des photos et des avis. Je fais les deux ensemble, parce qu'un site sans fiche Google, pour un artisan, c'est la moitié du chemin.",
  },
];

export const Route = createFileRoute("/site-internet-artisan")({
  head: () => ({
    meta: [
      { title: "Création de site internet pour artisan · Savoie · PeakCL" },
      {
        name: "description",
        content:
          "Site internet pour artisans et entreprises du bâtiment : galerie de chantiers, fiche Google Business Profile et formulaire de devis. À partir de 2 000 € HT. Mini-audit gratuit.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/site-internet-artisan") },
      {
        "script:ld+json": breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Site internet pour artisan", path: "/site-internet-artisan" },
        ]),
      },
      { "script:ld+json": faqPageJsonLd(FAQ) },
      {
        "script:ld+json": serviceJsonLd({
          name: "Création de site internet pour artisan",
          description:
            "Création de site internet pour artisans, entreprises de rénovation et du bâtiment : galerie de chantiers, référencement local et demandes de devis.",
          serviceType: "Création de site internet pour artisan",
          path: "/site-internet-artisan",
          audience:
            "Artisans, entreprises de rénovation, du bâtiment et des travaux, en Savoie et partout en France à distance.",
          offers: [
            {
              title: "Site vitrine artisan sur mesure",
              desc: "Galerie de chantiers, pages métier, formulaire de devis et fiche Google Business Profile.",
              price: "2 000 €",
            },
            {
              title: "Refonte de site artisan",
              desc: "Modernisation d'un site existant sans perdre le référencement acquis.",
              price: "À partir de 1 200 €",
            },
          ],
        }),
      },
    ],
    links: [{ rel: "canonical", href: absUrl("/site-internet-artisan") }],
  }),
  component: Page,
});

function Page() {
  return (
    <MetierLanding
      eyebrow="Artisans & bâtiment"
      headline="Création de site internet pour artisan"
      intro="Vos clients cherchent un artisan sur Google avant de demander à leurs voisins. S'ils ne trouvent qu'une page Facebook et deux photos floues, ils appellent le concurrent qui a un site. On répare ça."
      problem={{
        title: "Le problème n'est presque jamais le travail, c'est ce qu'on en voit",
        text: "Les artisans que j'accompagne font tous un travail que leurs clients recommandent. Ce qui manque, c'est la preuve visible : des photos de chantiers rangées, une page par prestation pour que Google sache quoi proposer, un moyen simple de demander un devis sans décrocher le téléphone à 19h. Un site d'artisan ne sert pas à faire joli, il sert à faire arriver des demandes déjà à moitié convaincues.",
      }}
      limit="Ce que je ne fais pas : promettre une première place sur Google. Sur le nom de votre entreprise, c'est rapide. Sur « métier + commune », c'est un travail de fond que je mène avec vous — et je vous dis dès l'appel si votre secteur est très concurrentiel."
      benefits={[
        "Une galerie de chantiers avant/après, qui remplace un long discours",
        "Une page par prestation, pour ressortir sur chaque type de recherche",
        "Un formulaire de devis qui vous arrive par e-mail, avec les bonnes questions déjà posées",
        "Votre fiche Google Business Profile créée ou reprise en même temps que le site",
        "Vos photos Instagram remontées automatiquement sur le site, si vous publiez déjà",
      ]}
      pages={[
        {
          title: "Vos réalisations, chantier par chantier",
          desc: "La page la plus consultée d'un site d'artisan. Avant/après, type de chantier, commune : c'est ce qui décide un client hésitant.",
        },
        {
          title: "Une page par prestation",
          desc: "Salle de bain, terrasse, électricité, isolation : une page chacune. Google ne peut pas vous proposer sur une recherche que votre site ne mentionne nulle part.",
        },
        {
          title: "Votre zone d'intervention",
          desc: "Les communes que vous desservez, écrites noir sur blanc. C'est la première question que se pose un visiteur, et la première information que cherche Google.",
        },
        {
          title: "Une demande de devis structurée",
          desc: "Type de travaux, surface, délai souhaité, photos. Vous recevez une demande exploitable au lieu d'un « bonjour, c'est combien ? ».",
        },
      ]}
      proofs={[
        {
          name: "SP Services Rénovation",
          role: "Artisan rénovation · Isère",
          text: "Stéphane est polyvalent : salles de bain, terrasses, électricité. Le site met en avant sa galerie de chantiers, avec un formulaire de contact et son fil Instagram intégré pour que ses nouvelles réalisations remontent toutes seules. J'ai aussi repris son logo, créé sa fiche Google Business Profile et lancé ses pages Facebook et Instagram.",
          siteUrl: "https://sp-renovation-73.fr/",
        },
        {
          name: "Jantes 73 · La Vieille Roue",
          role: "Artisan automobile · Albertville",
          text: "Johan partait littéralement de zéro : ni logo, ni site, ni adresse professionnelle. J'ai monté l'ensemble — logo, charte, site, flyers, fiche Google, page Facebook, adresse e-mail pro et prise de rendez-vous en ligne. Il n'a eu qu'à ouvrir l'atelier.",
          siteUrl: "https://lavieilleroue.fr/",
        },
        {
          name: "SETIC Fluides",
          role: "Bureau d'études · BTP · Savoie",
          text: "Spécialisés en thermique, fluides et sécurité incendie, ils travaillaient sans aucune présence en ligne. Site institutionnel sobre, mettant en valeur leurs expertises techniques et leurs projets en Savoie et Rhône-Alpes, plus la création de leur page LinkedIn et un calendrier éditorial.",
          siteUrl: "https://setic-fluides.netlify.app/",
        },
      ]}
      pricing="Site vitrine sur mesure : 2 000 € HT. Version WordPress, si vous voulez gérer vos chantiers vous-même : à partir de 2 500 € HT. Refonte d'un site existant : à partir de 1 200 € HT. Devis précis sous 48h ouvrées après l'appel, acompte de 30 à 50 % à la signature."
      faq={FAQ}
      related={[
        { label: "Agence web Albertville", href: "/agence-web-albertville" },
        { label: "Agence web Chambéry", href: "/agence-web-chambery" },
        { label: "Création de sites web", href: "/sites-web" },
        { label: "Logo & identité visuelle", href: "/creation-logo-albertville" },
        { label: "Portfolio", href: "/portfolio" },
      ]}
    />
  );
}
