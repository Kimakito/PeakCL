import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/seo/site";
import { serviceJsonLd, breadcrumbJsonLd, faqPageJsonLd } from "@/seo/jsonld";
import { CommunityLanding } from "@/components/CommunityLanding";

/** FAQ propre a Aix-les-Bains : clientele de passage, choix des reseaux, sortie facile. */
const FAQ = [
  {
    question: "Ma clientèle est de passage. Sur quel réseau faut-il être ?",
    answerHtml:
      "Un seul, bien tenu, plutôt que trois à l'abandon. Pour une activité qui vit du passage à Aix — bien-être, restauration, hébergement —, Instagram fait le gros du travail parce que les gens y cherchent des images avant de réserver. Mais votre fiche Google Business Profile pèse souvent plus lourd que tout le reste sur ce type de clientèle, et elle se travaille en même temps.",
  },
  {
    question: "TikTok, c'est utile pour mon activité ?",
    answerHtml:
      "Pas systématiquement, et je refuse de l'ajouter juste pour gonfler une formule. Je l'ai lancé pour DoodleIdoo, illustratrice, en même temps qu'Instagram : sur un travail visuel qui se montre en train de se faire, c'est pertinent. Sur un institut ou un cabinet dont la clientèle a plutôt 45 ans, le temps passé serait mieux investi ailleurs. On tranche à l'audit, gratuitement.",
  },
  {
    question: "Si je ne suis pas satisfaite, je peux arrêter ?",
    answerHtml:
      "Oui, à la fin du mois en cours, sans discussion ni pénalité — c'est le principe des formules mensuelles. Vous partez avec vos comptes, vos accès et vos visuels : ils sont à vous, pas à moi. Je préfère qu'on se quitte proprement plutôt que de tenir quelqu'un par un contrat d'un an.",
  },
];

export const Route = createFileRoute("/community-manager-aix-les-bains")({
  head: () => ({
    meta: [
      { title: "Community manager à Aix-les-Bains · PeakCL" },
      {
        name: "description",
        content:
          "Community manager à Aix-les-Bains : déléguez vos réseaux sociaux à Charlotte (PeakCL). Visuels brandés, rédaction et stratégie, formules mensuelles sans engagement.",
      },
      { property: "og:title", content: "Community manager à Aix-les-Bains · PeakCL" },
      {
        property: "og:description",
        content:
          "Déléguez vos réseaux sociaux à une community manager formée, pour votre activité à Aix-les-Bains. Formules mensuelles, sans engagement.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/community-manager-aix-les-bains") },
      {
        "script:ld+json": serviceJsonLd({
          name: "Community management à Aix-les-Bains",
          description:
            "Gestion de réseaux sociaux pour indépendants et petites structures à Aix-les-Bains : visuels brandés, rédaction, stratégie et publications régulières.",
          serviceType: "Community management",
          path: "/community-manager-aix-les-bains",
          areaServed: [{ "@type": "City", name: "Aix-les-Bains" }],
        }),
      },
      {
        "script:ld+json": breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Community manager Aix-les-Bains", path: "/community-manager-aix-les-bains" },
        ]),
      },
      { "script:ld+json": faqPageJsonLd(FAQ) },
    ],
    links: [{ rel: "canonical", href: absUrl("/community-manager-aix-les-bains") }],
  }),
  component: () => (
    <CommunityLanding
      city="Aix-les-Bains"
      region="Savoie"
      intro="Une gestion de réseaux sociaux régulière et à votre image pour votre activité aixoise, par une community manager qui maîtrise aussi votre site et votre identité visuelle. Vous déléguez, la cohérence suit."
      angleTitle="Community management à Aix-les-Bains : capter une clientèle de passage"
      angleText="Entre thermalisme, lac et tourisme, Aix-les-Bains vit beaucoup de sa clientèle de passage : bien-être, restauration, hébergement, commerces. Des réseaux actifs et rassurants font souvent la différence au moment du choix. Je construis cette présence régulière, alignée sur votre site et votre logo, pour transformer les curieux en clients. Pilotage à distance, avec un point mensuel clair."
      localProof={{
        text: "Pas encore de client aixois côté réseaux, autant l'écrire. Le cas le plus proche de vos enjeux est DoodleIdoo, illustratrice : compte Instagram et compte TikTok lancés de zéro, en même temps que son portfolio en ligne. Une activité qui se vend par l'image, exactement comme la plupart des commerces et praticiens du bord du lac.",
        linkLabel: "Voir le portfolio",
        linkHref: "/portfolio",
      }}
      faq={FAQ}
      pains={[
        "La saison démarre et vos réseaux sont restés à l'automne dernier.",
        "Vos photos sont prises à la va-vite entre deux clients.",
        "Vous êtes sur trois réseaux, deux sont à l'abandon.",
        "Un curieux compare trois adresses au bord du lac : la vôtre paraît la moins active.",
      ]}
      nearby={[
        { name: "Chambéry", href: "/community-manager-chambery" },
        { name: "Annecy", href: "/community-manager-annecy" },
        { name: "Albertville", href: "/community-manager-albertville" },
        { name: "Site web à Aix-les-Bains", href: "/agence-web-aix-les-bains" },
      ]}
    />
  ),
});
