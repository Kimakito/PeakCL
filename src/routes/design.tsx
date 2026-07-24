import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/seo/site";
import { hreflangLinks } from "@/seo/hreflang";
import { serviceJsonLd, breadcrumbJsonLd } from "@/seo/jsonld";
import { ServicePage } from "@/components/ServicePage";
import { design, designHighlights } from "@/content/peakcl/services";
import { MASCOT_GALLERY } from "@/content/peakcl/mascots";

export const Route = createFileRoute("/design")({
  head: () => ({
    meta: [
      { title: "Design graphique & identité visuelle en Savoie · PeakCL" },
      {
        name: "description",
        content:
          "Logo, charte graphique, supports print et visuels réseaux sociaux : une marque cohérente et mémorable. Sur devis.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/design") },
      {
        "script:ld+json": serviceJsonLd({
          name: "Design graphique & identité visuelle",
          description:
            "Logo, charte graphique, supports print et visuels réseaux sociaux pour une marque cohérente et mémorable, en Savoie et Haute-Savoie.",
          serviceType: "Identité visuelle et création de logo",
          path: "/design",
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
    links: [
      { rel: "canonical", href: absUrl("/design") },
      ...hreflangLinks("/design"),
    ],
  }),
  component: () => (
    <ServicePage
      avatarCard="logos"
      eyebrow="Design graphique"
      title="Design graphique"
      tagline="Une identité visuelle et des supports qui rendent votre activité — cabinet, atelier ou marque indépendante — cohérente et reconnaissable partout, du site à la fiche Google."
      intro={
        <div className="rounded-2xl border border-border bg-card/40 p-6 shadow-card backdrop-blur">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-yellow)]">
            Certifiée
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Prestations réalisées dans le cadre de la certification{" "}
            <span className="text-foreground">
              RS7068 « Créer des supports de communication avec un outil de
              design graphique »
            </span>
            .
          </p>
        </div>
      }
      highlights={designHighlights}
      highlightsTitle="Ce que je crée pour votre marque"
      highlightsSubtitle="De l’identité visuelle aux illustrations sur mesure, des supports cohérents sur tous vos points de contact."
      sectionTitle="🎨 Prestations design"
      sectionSubtitle="Identité visuelle et supports pour une marque cohérente sur tous vos points de contact."
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
