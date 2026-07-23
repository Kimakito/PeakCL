import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/seo/site";
import { hreflangLinks } from "@/seo/hreflang";
import { serviceJsonLd, breadcrumbJsonLd } from "@/seo/jsonld";
import { ServicePage } from "@/components/ServicePage";
import {
  automatisation,
  automatisationHighlights,
} from "@/content/peakcl/services";

export const Route = createFileRoute("/accompagnement-automatisation")({
  head: () => ({
    meta: [
      { title: "Accompagnement automatisation des processus · PeakCL" },
      {
        name: "description",
        content:
          "Consultante en automatisation des processus métier : audit, automatisations no-code (Make, Zapier), IA appliquée et formation. Gagnez du temps sur vos tâches répétitives. Sur devis.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/accompagnement-automatisation") },
      {
        "script:ld+json": serviceJsonLd({
          name: "Automatisation des processus & IA",
          description:
            "Audit, automatisations no-code (Make, Zapier), IA appliquée et formation pour les TPE de Savoie et Haute-Savoie.",
          serviceType: "Automatisation des processus métier",
          path: "/accompagnement-automatisation",
        }),
      },
      {
        "script:ld+json": breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Services", path: "/services" },
          {
            name: "Automatisation & IA",
            path: "/accompagnement-automatisation",
          },
        ]),
      },
    ],
    links: [
      { rel: "canonical", href: absUrl("/accompagnement-automatisation") },
      ...hreflangLinks("/accompagnement-automatisation"),
    ],
  }),
  component: () => (
    <ServicePage
      heroSpline="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
      eyebrow="Automatisation & IA"
      title="L’IA au service de votre TPE"
      tagline="Mettre l’intelligence artificielle et l’automatisation au travail dans votre petite structure : moins de tâches répétitives, plus de temps pour votre vrai métier."
      intro={
        <div className="rounded-2xl border border-border bg-card/40 p-6 shadow-card backdrop-blur">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-yellow)]">
            Nouveau · en cours de certification
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Je me forme pour obtenir la certification{" "}
            <span className="text-foreground">
              RS7311 « Améliorer l’efficacité de sa TPE à l’aide de l’IA »
            </span>{" "}
            (21 h, pensée pour les dirigeants de petites structures). Objectif :
            vous accompagner concrètement pour intégrer l’IA de façon
            stratégique, accessible et opérationnelle, avec des outils fiables,
            documentés et maîtrisés.
          </p>
        </div>
      }
      highlights={automatisationHighlights}
      highlightsTitle="Quatre façons de gagner du temps avec l’IA"
      highlightsSubtitle="Les quatre compétences couvertes par la certification RS7311, appliquées directement à votre activité."
      sectionTitle="⚙️ Prestations automatisation & IA"
      sectionSubtitle="De l’audit des processus à la mise en place, la formation et le suivi."
      items={automatisation}
    />
  ),
});
