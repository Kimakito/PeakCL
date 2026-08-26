import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/seo/site";
import { breadcrumbJsonLd, faqPageJsonLd, serviceJsonLd } from "@/seo/jsonld";
import { MetierLanding } from "@/components/MetierLanding";

/** FAQ propre aux praticiens de santé et du bien-être. Alimente aussi le JSON-LD. */
const FAQ = [
  {
    question: "Je suis soumis à des règles déontologiques. Vous connaissez les limites ?",
    answerHtml:
      "Oui, et c'est une vraie contrainte de rédaction. Selon votre profession, la publicité comparative, les promesses de résultat et certains témoignages sont encadrés ou interdits. Un site conforme ne dit pas « le meilleur ostéopathe de Savoie » : il explique la pratique, le déroulé d'une séance et les cas traités. C'est moins spectaculaire, et c'est plus efficace — un patient cherche à être rassuré, pas à être vendu.",
  },
  {
    question: "Mes patients me trouvent déjà par le bouche-à-oreille. À quoi sert un site ?",
    answerHtml:
      "Le bouche-à-oreille amène le nom, pas la décision. Quelqu'un à qui on vous a recommandé va vous chercher sur Google avant d'appeler : il veut vérifier vos horaires, votre adresse, votre formation, et à quoi ressemble une séance. S'il ne trouve rien, le doute s'installe au pire moment. Le site ne remplace pas la recommandation, il la convertit.",
  },
  {
    question: "Est-ce que je peux mettre la prise de rendez-vous en ligne ?",
    answerHtml:
      "Oui, et c'est souvent le meilleur gain de temps du projet. Doctolib, Cal.com ou un autre outil selon votre profession : je l'intègre au site pour que le patient réserve sans vous appeler. C'est ce que j'ai fait pour l'atelier de Johan (Jantes 73), sur un tout autre métier, avec le même effet : moins d'appels pendant les heures de consultation.",
  },
  {
    question: "Est-ce que je pourrai mettre le site à jour toute seule ?",
    answerHtml:
      "Si c'est important pour vous, on part sur WordPress et je vous forme à la prise en main. C'est le choix qu'on a fait avec la praticienne d'Ostéo Animal Care : elle avait installé son WordPress, j'ai construit toutes les pages et rédigé tous les contenus, puis je lui ai laissé les clés. Depuis, elle publie seule. Si vous préférez ne pas y toucher, un site sur mesure avec un forfait de maintenance à 99 €/mois est plus simple à vivre.",
  },
];

export const Route = createFileRoute("/site-internet-therapeute")({
  head: () => ({
    meta: [
      { title: "Création de site internet pour thérapeute et praticien · PeakCL" },
      {
        name: "description",
        content:
          "Site internet pour thérapeutes, ostéopathes et praticiens du bien-être : expliquer votre pratique, rassurer, faire prendre rendez-vous. À partir de 2 000 € HT. Mini-audit gratuit.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/site-internet-therapeute") },
      {
        "script:ld+json": breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Site internet pour thérapeute", path: "/site-internet-therapeute" },
        ]),
      },
      { "script:ld+json": faqPageJsonLd(FAQ) },
      {
        "script:ld+json": serviceJsonLd({
          name: "Création de site internet pour thérapeute",
          description:
            "Création de site internet pour thérapeutes, praticiens du bien-être et professions de santé : présentation de la pratique, réassurance et prise de rendez-vous en ligne.",
          serviceType: "Création de site internet pour thérapeute",
          path: "/site-internet-therapeute",
          audience:
            "Thérapeutes, ostéopathes, praticiens du bien-être et professionnels de santé en cabinet, en Savoie et partout en France à distance.",
          offers: [
            {
              title: "Site vitrine praticien sur mesure",
              desc: "Présentation de la pratique, déroulé d'une séance, informations pratiques et prise de rendez-vous en ligne.",
              price: "2 000 €",
            },
            {
              title: "Site praticien WordPress autonome",
              desc: "Site que vous mettez à jour vous-même, avec formation à la prise en main.",
              price: "À partir de 2 500 €",
            },
          ],
        }),
      },
    ],
    links: [{ rel: "canonical", href: absUrl("/site-internet-therapeute") }],
  }),
  component: Page,
});

function Page() {
  return (
    <MetierLanding
      eyebrow="Thérapeutes & praticiens"
      headline="Création de site internet pour thérapeute"
      intro="Un patient qui hésite ne cherche pas un argumentaire : il cherche à savoir à qui il va confier son corps ou celui de son animal. Un site de praticien a un seul travail — lever le doute avant le premier appel."
      problem={{
        title: "Ce qui bloque un patient, c'est l'inconnu, pas le prix",
        text: "Sur les sites de praticiens que j'audite, je retrouve presque toujours les mêmes manques : on ne sait pas comment se passe une séance, on ne trouve pas les horaires, on ne voit jamais le cabinet, et la formation de la praticienne est noyée dans un paragraphe. Résultat : la personne referme l'onglet. Ce n'est pas un problème de design, c'est un problème de réassurance — et ça se corrige page par page.",
      }}
      limit="Une limite honnête : je ne suis pas une agence spécialisée santé et je ne rédige pas de contenu médical à votre place. J'écris la structure et les textes de présentation, vous validez tout ce qui touche à votre pratique. Sur les professions réglementées, c'est vous qui tranchez ce qui est publiable."
      benefits={[
        "Une page qui explique le déroulé d'une séance, de la prise de rendez-vous à la sortie",
        "Votre formation et vos certifications mises en avant, pas cachées en bas de page",
        "Les informations pratiques trouvables en trois secondes : adresse, accès, horaires, tarifs",
        "La prise de rendez-vous en ligne intégrée, pour arrêter d'être appelée en consultation",
        "Un ton conforme à votre déontologie : on explique, on ne promet pas de résultat",
      ]}
      pages={[
        {
          title: "Qui vous êtes, vraiment",
          desc: "Formation, parcours, approche. C'est la deuxième page la plus visitée d'un site de praticien, et souvent la plus mal écrite.",
        },
        {
          title: "Une page par motif de consultation",
          desc: "Les gens ne cherchent pas votre spécialité, ils cherchent leur problème. Une page par motif, c'est autant de portes d'entrée sur Google.",
        },
        {
          title: "Le déroulé d'une séance",
          desc: "Durée, ce qui se passe, comment s'habiller, combien de séances prévoir. Cette page fait plus pour la prise de rendez-vous que n'importe quel argument.",
        },
        {
          title: "Infos pratiques et prise de rendez-vous",
          desc: "Adresse, parking, transports, horaires, tarifs, moyens de paiement — et un bouton de réservation qui marche sur mobile.",
        },
      ]}
      proofs={[
        {
          name: "Laboratoire Sanchez Randon",
          role: "Prothésiste dentaire · Chambéry",
          text: "25 ans d'expertise, et un site géré par une agence qui a coupé l'abonnement du jour au lendemain. J'ai repris le site en urgence, réhébergé, puis refondu entièrement : des pages spécialisées implants, prothèses et logiciels Exocad / 3Shape, plus le fil Instagram intégré.",
          siteUrl: "https://prothesiste-sanchezrandon-chambery.fr/",
        },
        {
          name: "Ostéo Animal Care",
          role: "Ostéopathie animale · WordPress",
          text: "Une praticienne qui voulait garder la main sur son site. Elle avait installé son WordPress : j'ai construit toutes les pages et écrit tous les contenus, puis je lui ai laissé les clés. Depuis, elle publie seule — c'est exactement l'objectif quand l'autonomie compte plus que le sur-mesure.",
          siteUrl: "https://osteo-animalcare.ch/",
        },
        {
          name: "Mordant Équin",
          role: "Dentiste équin · Savoie",
          text: "Laura pratique la dentisterie équine moderne, une spécialité rare. Le site est construit autour d'un référencement géolocalisé précis, pour qu'elle soit trouvée par les propriétaires de chevaux dans un rayon de 250 km — un cas typique de praticienne itinérante.",
          siteUrl: "https://mordant-equin.fr/",
        },
      ]}
      pricing="Site vitrine sur mesure : 2 000 € HT. Version WordPress, que vous mettez à jour vous-même, formation comprise : à partir de 2 500 € HT. Refonte d'un site existant : à partir de 1 200 € HT. Maintenance optionnelle : 99 €/mois. Devis précis sous 48h ouvrées après l'appel."
      faq={FAQ}
      related={[
        { label: "Agence web Chambéry", href: "/agence-web-chambery" },
        { label: "Agence web Albertville", href: "/agence-web-albertville" },
        { label: "Site internet équitation", href: "/site-internet-equitation" },
        { label: "Création de sites web", href: "/sites-web" },
        { label: "Portfolio", href: "/portfolio" },
      ]}
    />
  );
}
