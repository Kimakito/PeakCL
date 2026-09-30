import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/seo/site";
import { serviceJsonLd, breadcrumbJsonLd } from "@/seo/jsonld";
import { ServicePage } from "@/components/ServicePage";
import { design, designHighlights } from "@/content/peakcl/services";
import { MASCOT_GALLERY } from "@/content/peakcl/mascots";

export const Route = createFileRoute("/design")({
  head: () => ({
    meta: [
      { title: "Graphiste en Savoie : logo et identité visuelle · PeakCL" },
      {
        name: "description",
        content:
          "Graphiste en Savoie : logo dès 500 € HT, identité visuelle complète dès 1 200 € HT, supports print et visuels réseaux sociaux pour une marque cohérente.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/design") },
      {
        property: "og:title",
        content: "Graphiste en Savoie · Design graphique & identité visuelle",
      },
      {
        "script:ld+json": serviceJsonLd({
          name: "Graphisme, design graphique & identité visuelle",
          description:
            "Graphisme et identité visuelle : logo, charte graphique, supports print et visuels réseaux sociaux pour une marque cohérente et mémorable, en Savoie et Haute-Savoie.",
          serviceType: "Graphisme, identité visuelle et création de logo",
          path: "/design",
          audience:
            "Indépendants, thérapeutes, artisans et petites structures qui créent leur marque ou modernisent une image datée.",
          // Reprend le catalogue reellement affiche sur la page : les donnees
          // structurees decrivent ce que le visiteur voit, pas une offre ideale.
          offers: design.map((o) => ({ title: o.title, desc: o.desc, price: o.price })),
        }),
      },
      {
        "script:ld+json": breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Services", path: "/services" },
          { name: "Design graphique", path: "/design" },
        ]),
      },
    ],
    links: [{ rel: "canonical", href: absUrl("/design") }],
  }),
  component: () => (
    <ServicePage
      showPrices
      avatarCard="logos"
      eyebrow="Graphisme"
      title="Design graphique"
      tagline="Graphiste indépendante en Savoie, je crée une identité visuelle et des supports qui rendent votre activité (cabinet, atelier ou marque indépendante) cohérente et reconnaissable partout, du site à la fiche Google."
      facts={{
        audience:
          "Indépendants, thérapeutes, artisans et petites structures qui créent leur marque ou modernisent une image devenue datée.",
        area: "Savoie et Haute-Savoie sur place, partout en France à distance.",
        delay:
          "1 semaine pour un logo, 2 à 3 semaines pour une identité complète, 3 à 5 jours pour des supports print ou des visuels réseaux, 48h pour une bannière seule.",
        pricing:
          "Logo essentiel 500 €, identité visuelle complète à partir de 1 200 €, supports print à partir de 90 € l'unité (dégressif dès 3 supports), pack de 10 visuels réseaux à partir de 350 €. Tarifs HT. Mini-audit gratuit avant devis.",
        process: [
          "Échange sur l'activité, les valeurs et les préférences visuelles",
          "Moodboard et pistes de direction artistique",
          "Propositions de logo et allers-retours de validation",
          "Charte graphique : couleurs, typographies, usages",
          "Livraison des fichiers sources et déclinaisons web et print",
        ],
        excludes:
          "le dépôt de marque à l'INPI, l'impression physique des supports, et la photographie professionnelle.",
      }}
      intro={
        <div className="rounded-2xl border border-border bg-card/40 p-6 shadow-card backdrop-blur">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-yellow)]">
            Certifiée
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Prestations réalisées dans le cadre de la certification{" "}
            <span className="text-foreground">
              RS7068 « Créer des supports de communication avec un outil de design graphique »
            </span>
            .
          </p>
        </div>
      }
      highlights={designHighlights}
      highlightsTitle="Ce que je crée pour votre marque"
      highlightsSubtitle="De l’identité visuelle aux illustrations sur mesure, des supports cohérents sur tous vos points de contact."
      sectionTitle="🎨 Prestations design"
      sectionSubtitle="Graphisme, identité visuelle et supports pour une marque cohérente sur tous vos points de contact."
      items={design}
      gallery={MASCOT_GALLERY}
      galleryTitle="🎭 Illustration & character design"
      gallerySubtitle="Une mascotte expressive dessinée sous Illustrator : un même personnage décliné en plusieurs émotions pour donner du caractère à une marque."
      portfolioLink={{
        to: "/portfolio?cat=logos",
        label: "Voir mes logos & créations",
      }}
    />
  ),
});
