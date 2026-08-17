import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/seo/site";
import { breadcrumbJsonLd, faqPageJsonLd, localBusinessJsonLd } from "@/seo/jsonld";
import { GeoLanding } from "@/components/GeoLanding";

/** FAQ propre a Ugine (bloc visible + JSON-LD FAQPage). */
const FAQ = [
  {
    question: "Vous avez une référence à Ugine ?",
    answerHtml:
      "Oui : Peak Training. Mathilde est coach certifiée CrossFit, Pilates et musculation, elle accompagnait déjà des dizaines de clients à Ugine — mais en ligne, elle n'existait pas. Je lui ai construit son identité complète : logo, site vitrine à son énergie, et les visuels qu'elle publie sur ses réseaux.",
  },
  {
    question: "J'ai déjà une page Instagram qui tourne. Le site est-il vraiment utile ?",
    answerHtml:
      "Question que j'entends toutes les semaines, et ma réponse n'est pas « les deux, bien sûr ». Instagram vous fait connaître, il ne vous fait pas trouver : personne ne tape « coach sportif Ugine » dans Instagram, on le tape dans Google. Et vous ne possédez pas votre compte — un blocage, et vos 2 000 abonnés disparaissent avec. Le site est le seul endroit qui vous appartient.",
  },
  {
    question: "Je suis artisan à Ugine, avec un petit budget. Vous travaillez quand même ?",
    answerHtml:
      "Oui, mais on ajuste le périmètre, pas la qualité. Une landing page bien faite (une à deux semaines) vaut mieux qu'un site de huit pages à moitié rempli. On commence par ce qui vous rapporte des appels, on ajoute le reste quand l'activité suit. Le devis part sous 48h ouvrées et l'audit est gratuit : vous saurez où vous en êtes sans avoir rien signé.",
  },
];

export const Route = createFileRoute("/agence-web-ugine")({
  head: () => ({
    meta: [
      { title: "Création de site internet à Ugine (Savoie) · PeakCL" },
      {
        name: "description",
        content:
          "Création de site internet à Ugine : sites premium avec référencement SEO local inclus. Basée juste à côté, à Gilly-sur-Isère. Audit gratuit sous 24h.",
      },
      { property: "og:title", content: "Création de site internet à Ugine · PeakCL" },
      {
        property: "og:description",
        content:
          "Site internet et SEO local pour les commerces et artisans d'Ugine. Audit gratuit sous 24h.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/agence-web-ugine") },
      {
        "script:ld+json": breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Ugine", path: "/agence-web-ugine" },
        ]),
      },
      { "script:ld+json": faqPageJsonLd(FAQ) },
      {
        "script:ld+json": localBusinessJsonLd({
          city: "Ugine",
          region: "Savoie",
          path: "/agence-web-ugine",
          description:
            "Agence web à Ugine : création de site internet et référencement local pour artisans, commerces et indépendants du Val d’Arly.",
          nearbyCities: ["Albertville", "Marthod", "Faverges", "Flumet"],
        }),
      },
    ],
    links: [{ rel: "canonical", href: absUrl("/agence-web-ugine") }],
  }),
  component: Page,
});

function Page() {
  return (
    <GeoLanding
      city="Ugine"
      region="Savoie"
      serviceLabel="site internet"
      intro="Un site premium, rapide et clair pour les commerces, artisans et indépendants uginois, pensé pour transformer les recherches locales en prises de contact."
      angleTitle="Pourquoi une page Ugine ?"
      angleText="Pour ressortir quand un habitant du bassin cherche « création site internet Ugine », sans se noyer parmi des agences lointaines. Basée à Gilly-sur-Isère, à quelques minutes d'Ugine, je connais le tissu local entre vallée de l'Arly et Albertville : commerces de centre-ville, artisans et petites structures qui ont besoin d'une présence en ligne nette."
      localExample={{
        text: "Mathilde, de Peak Training, est coach certifiée CrossFit, Pilates et musculation à Ugine. Elle avait déjà des dizaines de clients et zéro existence en ligne : quelqu'un qui entendait parler d'elle ne trouvait rien en cherchant son nom. On a construit son identité de bout en bout — logo, site vitrine à son énergie, supports visuels pour ses réseaux.",
        linkLabel: "Voir le projet au portfolio",
        linkHref: "/portfolio",
      }}
      seoSection={{
        title: "Être visible à Ugine avant vos concurrents",
        text: "Ugine a une particularité que les agences lointaines ignorent : la ville vit à la fois de son industrie et d'un petit centre de commerces et d'artisans, coincée entre Albertville et le val d'Arly. Vos clients ne tapent pas « Savoie », ils tapent « Ugine » — parfois « Albertville » quand ils comparent. On travaille donc les deux, avec des balises rédigées une par une, une structure de contenu hiérarchisée, un maillage vers vos pages de service et une fiche Google Business Profile complète.",
      }}
      benefits={[
        "Un positionnement sur Ugine ET sur le bassin d'Albertville, pas l'un ou l'autre",
        "Une landing page rapide si le budget impose de commencer petit",
        "Des visuels réutilisables sur vos réseaux, aux mêmes couleurs que le site",
        "Une interlocutrice à quinze minutes, joignable sans passer par un standard",
      ]}
      servicesIntro="À Ugine, mes clients sont des indépendants qui font tout eux-mêmes et n'ont pas une soirée à passer sur Canva. L'intérêt de tout confier à la même personne, c'est que le logo, le site et les publications sortent cohérents sans que vous ayez à arbitrer."
      faq={FAQ}
      nearby={[
        { name: "Albertville", href: "/agence-web-albertville" },
        { name: "Gilly-sur-Isère", href: "/agence-web-gilly-sur-isere" },
        { name: "Beaufort", href: "/agence-web-beaufort" },
        { name: "Moûtiers", href: "/agence-web-moutiers" },
      ]}
    />
  );
}
