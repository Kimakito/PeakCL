import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/seo/site";
import { breadcrumbJsonLd, faqPageJsonLd, serviceJsonLd } from "@/seo/jsonld";
import { MetierLanding } from "@/components/MetierLanding";

/** FAQ propre aux commerces. Alimente aussi le JSON-LD FAQPage. */
const FAQ = [
  {
    question: "J'ai une boutique physique. Un site sert vraiment à quelque chose ?",
    answerHtml:
      "C'est même là que ça se joue. Quelqu'un qui passe devant votre vitrine vous a déjà trouvé. Le site travaille pour tous les autres : celui qui cherche vos horaires un dimanche, celui qui vérifie si vous avez le produit avant de se déplacer, celui qui vient d'emménager. Un commerce sans site n'existe pas pour eux — et sa fiche Google, souvent incomplète, décide à sa place.",
  },
  {
    question: "Faut-il vendre en ligne, ou juste montrer ?",
    answerHtml:
      "Les deux sont légitimes, et la mauvaise réponse coûte cher. Une boutique en ligne, c'est un catalogue à tenir, des stocks, des livraisons, des retours — un deuxième métier. Beaucoup de commerces gagnent davantage avec une vitrine claire qui fait venir en magasin qu'avec un e-commerce mal alimenté. On tranche à l'appel, selon ce que vous êtes prêt à gérer chaque semaine.",
  },
  {
    question: "Je change souvent de produits, je vais devoir vous appeler à chaque fois ?",
    answerHtml:
      "Non, et c'est un point à cadrer dès le départ. Si vos nouveautés changent chaque semaine, on part sur une base que vous gérez vous-même, avec une formation à la prise en main. Si votre offre bouge deux fois par an, le sur-mesure est plus rapide et plus solide. Le bon choix dépend de votre rythme, pas de ma préférence.",
  },
  {
    question: "Et si je vends déjà sur une plateforme ?",
    answerHtml:
      "Une place de marché vous apporte du volume mais pas de clientèle : elle garde la relation, les données et une commission. Votre site est le seul endroit où un client vous appartient. L'un n'exclut pas l'autre — c'est ce que fait Natural Riders, dont j'ai migré la boutique vers PrestaShop pour qu'elle cesse de dépendre d'un outil trop limité.",
  },
];

export const Route = createFileRoute("/site-internet-commercant")({
  head: () => ({
    meta: [
      { title: "Création de site internet pour commerçant · Savoie · PeakCL" },
      {
        name: "description",
        content:
          "Site internet pour commerces et boutiques : vitrine, horaires, fiche Google et vente en ligne quand elle se justifie. À partir de 2 000 € HT. Mini-audit gratuit.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/site-internet-commercant") },
      {
        "script:ld+json": breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Site internet pour commerçant", path: "/site-internet-commercant" },
        ]),
      },
      { "script:ld+json": faqPageJsonLd(FAQ) },
      {
        "script:ld+json": serviceJsonLd({
          name: "Création de site internet pour commerçant",
          description:
            "Création de site internet pour commerces de proximité et boutiques : vitrine, référencement local, fiche Google Business Profile et vente en ligne.",
          serviceType: "Création de site internet pour commerçant",
          path: "/site-internet-commercant",
          audience:
            "Commerces de proximité, boutiques, ateliers ouverts au public et vendeurs en ligne, en Savoie et partout en France à distance.",
          offers: [
            {
              title: "Vitrine de commerce",
              desc: "Horaires, adresse, produits phares, fiche Google Business Profile et parcours vers la boutique.",
              price: "2 000 €",
            },
            {
              title: "Boutique en ligne",
              desc: "Catalogue, paiement, stocks et livraisons, ou migration d'une boutique existante.",
              price: "À partir de 3 800 €",
            },
          ],
        }),
      },
    ],
    links: [{ rel: "canonical", href: absUrl("/site-internet-commercant") }],
  }),
  component: Page,
});

function Page() {
  return (
    <MetierLanding
      eyebrow="Commerces & boutiques"
      headline="Création de site internet pour commerçant"
      intro="Un client sur deux vérifie en ligne avant de pousser la porte. S'il ne trouve ni vos horaires, ni vos produits, ni à quoi ressemble l'intérieur, il ne se déplace pas — et vous ne saurez jamais qu'il a hésité."
      problem={{
        title: "Le site d'un commerce ne remplace pas la vitrine, il la précède",
        text: "La plupart des commerces que j'accompagne ont une fiche Google à moitié remplie et rien derrière. Résultat : les horaires sont faux une semaine sur deux, personne ne sait ce que vous vendez vraiment, et la concurrence à trois rues d'ici sort avant vous. Le travail n'est pas de faire un beau site : c'est de faire en sorte qu'un inconnu à deux kilomètres sache en dix secondes ce que vous vendez, où vous êtes et quand vous êtes ouvert.",
      }}
      limit="Une limite honnête : je n'ai pas encore accompagné de commerce alimentaire ni de restaurant. Mes références sont un atelier automobile et une boutique en ligne. Le travail se ressemble beaucoup, mais je préfère vous le dire plutôt que de vous inventer une expérience du secteur."
      benefits={[
        "Des horaires et une adresse justes, au même endroit sur le site et sur Google",
        "Vos produits phares montrés, pas seulement listés",
        "Une fiche Google Business Profile créée ou reprise avec le site",
        "Un parcours clair vers la boutique : itinéraire, téléphone, réservation",
        "La vente en ligne si — et seulement si — votre organisation peut la suivre",
      ]}
      pages={[
        {
          title: "Ce que vous vendez, en images",
          desc: "Les produits phares, la gamme, les marques. C'est la première chose qu'un visiteur cherche, et souvent la seule information absente.",
        },
        {
          title: "Horaires, accès et stationnement",
          desc: "La page la plus consultée d'un site de commerce, de loin. Elle doit être juste, à jour, et lisible sur un téléphone en pleine rue.",
        },
        {
          title: "L'intérieur du commerce",
          desc: "Des photos du lieu rassurent bien plus qu'un texte. On se projette, on sait où on met les pieds, on se déplace.",
        },
        {
          title: "Boutique en ligne, si elle se justifie",
          desc: "Catalogue, paiement, livraisons. On ne l'ouvre que si vous pouvez l'alimenter chaque semaine — sinon elle dessert.",
        },
      ]}
      proofs={[
        {
          name: "Jantes 73 · La Vieille Roue",
          role: "Atelier automobile · Albertville",
          text: "Johan ouvrait son atelier et partait de zéro : ni logo, ni site, ni adresse professionnelle. J'ai monté l'ensemble — logo, charte, site, flyers, fiche Google Business Profile, page Facebook et prise de rendez-vous en ligne. Il n'a eu qu'à ouvrir : les clients ont suivi.",
          siteUrl: "https://lavieilleroue.fr/",
        },
        {
          name: "Natural Riders",
          role: "Boutique équestre en ligne · PrestaShop",
          text: "Une boutique d'équipement coincée sur Jimdo, trop limité pour vendre sérieusement. J'ai migré tout le catalogue vers PrestaShop : produits, photos et charte graphique repris un par un, sans rien perdre en route.",
          siteUrl: "https://www.naturalriders.fr/",
        },
      ]}
      pricing="Vitrine de commerce sur mesure : 2 000 € HT. Version WordPress, que vous mettez à jour vous-même : à partir de 2 500 € HT. Boutique en ligne ou migration : à partir de 3 800 € HT. Refonte d'un site existant : à partir de 1 200 € HT."
      faq={FAQ}
      related={[
        { label: "Agence web Albertville", href: "/agence-web-albertville" },
        { label: "Site internet artisan", href: "/site-internet-artisan" },
        { label: "Site internet tourisme", href: "/site-internet-tourisme" },
        { label: "Création de sites web", href: "/sites-web" },
        { label: "Portfolio", href: "/portfolio" },
      ]}
    />
  );
}
