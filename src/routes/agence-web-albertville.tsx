import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/seo/site";
import { breadcrumbJsonLd, faqPageJsonLd, localBusinessJsonLd } from "@/seo/jsonld";
import { GeoLanding } from "@/components/GeoLanding";

/**
 * FAQ propre a Albertville : questions reellement posees ici, et references du
 * bassin nommees. Elle alimente le bloc visible ET le JSON-LD FAQPage, d'ou la
 * constante partagee entre head() et le composant.
 */
const FAQ = [
  {
    question: "Vous avez déjà créé des sites pour des entreprises d'Albertville ?",
    answerHtml:
      "Oui, deux que vous pouvez aller voir. Johan, de La Vieille Roue (Jantes 73), partait de zéro : pas de logo, pas de site, pas d'adresse pro. J'ai tout lancé, du logo à la fiche Google jusqu'à la prise de rendez-vous en ligne. Et Céline, architecte d'intérieur chez C'mieux comme ça, pour qui il fallait qu'on comprenne sa philosophie dès la page d'accueil. Deux métiers opposés, deux sites qui ne se ressemblent pas.",
  },
  {
    question: "Je suis à Albertville, on peut se rencontrer avant de signer ?",
    answerHtml:
      "Oui, et je le recommande pour un premier projet. Je suis à Gilly-sur-Isère, à cinq minutes du centre d'Albertville. On peut se voir chez vous, dans votre atelier ou votre cabinet — c'est souvent là que je comprends le mieux ce que le site doit raconter. Si vous préférez la visio, ça marche aussi.",
  },
  {
    question: "Combien de temps avant que mon site soit en ligne ?",
    answerHtml:
      "Trois à cinq semaines pour un site vitrine, une à deux semaines pour une landing page. Le devis, lui, part sous 48h ouvrées après notre appel. Ce qui rallonge un projet, ce n'est presque jamais la technique : c'est le temps que vous mettez à me fournir vos textes et vos photos. Je vous le dis dès le départ pour qu'on cale un rythme tenable.",
  },
];

export const Route = createFileRoute("/agence-web-albertville")({
  head: () => ({
    meta: [
      // Le title porte les deux requêtes GSC de cette page : « agence web
      // albertville » et « agence seo albertville ». Elles partagent la même
      // intention (prestataire local), donc la même URL — les séparer sur deux
      // pages créerait une cannibalisation.
      { title: "Création de site internet à Albertville · Agence web & SEO" },
      {
        name: "description",
        content:
          "Agence web à Albertville : création de site internet et référencement SEO local pour être trouvé sur les recherches du bassin albertvillois. Audit gratuit sous 24h.",
      },
      { property: "og:title", content: "Agence web à Albertville · PeakCL" },
      {
        property: "og:description",
        content:
          "Agence web à Albertville : création de sites internet et référencement SEO local. Audit gratuit sous 24h.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/agence-web-albertville") },
      {
        "script:ld+json": breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Albertville", path: "/agence-web-albertville" },
        ]),
      },
      { "script:ld+json": faqPageJsonLd(FAQ) },
      {
        "script:ld+json": localBusinessJsonLd({
          city: "Albertville",
          region: "Savoie",
          path: "/agence-web-albertville",
          description:
            "Agence web et SEO à Albertville : création de site internet, identité visuelle et référencement local pour indépendants, artisans et commerces du bassin albertvillois.",
          nearbyCities: ["Gilly-sur-Isère", "Ugine", "Moûtiers", "Beaufort"],
          services: [
            "Agence web Albertville",
            "Agence SEO Albertville",
            "Création de site internet",
            "Référencement local (SEO)",
            "Création de logo",
          ],
        }),
      },
    ],
    links: [{ rel: "canonical", href: absUrl("/agence-web-albertville") }],
  }),
  component: Page,
});

function Page() {
  return (
    <GeoLanding
      city="Albertville"
      region="Savoie"
      serviceLabel="site internet"
      intro="Un site premium (site internet), rapide et structuré pour convertir les visiteurs locaux en prises de contact."
      angleTitle="Pourquoi une page Albertville ?"
      angleText="Pour être trouvée quand quelqu'un cherche « création site web Albertville », et pour rassurer avec une offre claire, locale et orientée résultats. Basée à Gilly-sur-Isère, juste à côté, je connais le tissu d'indépendants et d'artisans du bassin albertvillois."
      localExample={{
        text: "Johan, de La Vieille Roue (Jantes 73), avait ce projet d'atelier en tête depuis des années et démarrait sans rien : ni logo, ni site, ni adresse professionnelle. J'ai monté l'ensemble — logo, charte, site vitrine, flyers, fiche Google Business Profile, page Facebook, prise de rendez-vous en ligne. Il a ouvert l'atelier, les clients ont suivi. Céline, architecte d'intérieur à Albertville, avait le problème inverse : une activité installée et une phrase signature (« Votre habitat s'adapte à vous, et non l'inverse ! ») que son site devait faire passer en trois secondes.",
        linkLabel: "Voir les deux au portfolio",
        linkHref: "/portfolio",
      }}
      benefits={[
        "Une page qui répond aux recherches « Albertville + votre métier », pas juste à votre nom",
        "Une fiche Google Business Profile travaillée en même temps que le site",
        "Des photos de vos vraies réalisations, pas des banques d'images génériques",
        "Une interlocutrice à cinq minutes, qui peut passer à l'atelier ou au cabinet",
      ]}
      servicesIntro="Sur le bassin albertvillois, la plupart de mes clients arrivent avec un seul morceau : un logo fait à la va-vite, ou une page Facebook sans site derrière. Je reprends l'ensemble pour que ça raconte enfin la même histoire."
      seoSection={{
        title: "Agence SEO à Albertville : être trouvée avant vos concurrents",
        text: "Au-delà du design, chaque site est construit avec des bases de référencement local propres : balises titres et méta cohérentes, structure de contenu claire, maillage vers vos pages clés et temps de chargement optimisé. L'objectif : que votre agence ou activité albertvilloise apparaisse quand vos clients potentiels cherchent vos services à Albertville, pas seulement votre nom.",
      }}
      faq={FAQ}
      nearby={[
        { name: "Gilly-sur-Isère", href: "/agence-web-gilly-sur-isere" },
        { name: "Chambéry", href: "/agence-web-chambery" },
        { name: "Aix-les-Bains", href: "/agence-web-aix-les-bains" },
        { name: "Annecy", href: "/agence-web-annecy" },
      ]}
    />
  );
}
