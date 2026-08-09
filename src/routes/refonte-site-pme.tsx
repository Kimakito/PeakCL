import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/seo/site";
import { serviceJsonLd, breadcrumbJsonLd } from "@/seo/jsonld";
import { ServicePage } from "@/components/ServicePage";
import { refontePme, refontePmeHighlights } from "@/content/peakcl/services";

/**
 * Landing "Refonte de site pour PME" : page d'atterrissage des campagnes
 * sortantes (email, LinkedIn) vers les entreprises au site vieillissant.
 * Volontairement hors du hub /services : le hub reste orienté indépendants
 * et TPE, cette page parle le langage budget/résultats des PME.
 * Page FR uniquement (pas d'équivalent EN, donc pas de hreflang).
 */
export const Route = createFileRoute("/refonte-site-pme")({
  head: () => ({
    meta: [
      {
        title: "Refonte de site web pour PME en Savoie · PeakCL",
      },
      {
        name: "description",
        content:
          "Votre site date, votre entreprise non. Refonte complète sans perdre votre référencement acquis : mini-audit offert sous 72h, résultats mesurés avant et après.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/refonte-site-pme") },
      {
        "script:ld+json": serviceJsonLd({
          name: "Refonte de site web pour PME",
          description:
            "Refonte de sites web vieillissants pour PME : audit, reconstruction sur des bases saines, préservation du SEO acquis et suivi de conversion. Savoie, Haute-Savoie et à distance.",
          serviceType: "Refonte de site internet",
          path: "/refonte-site-pme",
        }),
      },
      {
        "script:ld+json": breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Refonte de site pour PME", path: "/refonte-site-pme" },
        ]),
      },
    ],
    links: [{ rel: "canonical", href: absUrl("/refonte-site-pme") }],
  }),
  component: () => (
    <ServicePage
      heroImage={{
        src: "/peakcl/assets/images/bureau-peakcl.webp",
        alt: "Bureau PeakCL avec un site web affiché à l'écran",
      }}
      eyebrow="Refonte de site web"
      title="Refonte de site pour PME"
      tagline="Votre site date, votre entreprise non. Je reprends les fondations (structure, vitesse, SEO) sans perdre votre référencement acquis, avec des résultats mesurés avant et après."
      facts={{
        audience:
          "PME et entreprises structurées de 10 à 50 salariés dont le site a plus de trois ans : lent sur mobile, design daté, contenu figé, peu de demandes entrantes.",
        area: "Savoie, Haute-Savoie et Isère sur place, partout en France à distance.",
        delay:
          "Mini-audit offert sous 72h. Audit complet en 1 semaine. Refonte : 4 à 8 semaines selon le périmètre.",
        pricing:
          "Mini-audit offert, audit complet 500 € déduits du devis de refonte, refonte sur devis, maintenance à partir de 199 €/mois.",
        process: [
          "Mini-audit offert : les 3 corrections les plus rentables sur votre site actuel",
          "Audit complet : ce qui doit changer, ce qui doit être préservé, le budget par lot",
          "Architecture et maquettes validées avant la moindre ligne de code",
          "Développement, migration des contenus et redirections 301",
          "Mesure avant et après, formation de votre équipe, 3 mois de support",
        ],
        excludes:
          "la rédaction complète de vos contenus métier, la photographie professionnelle, et les abonnements tiers (hébergement, outils), qui restent à votre charge.",
      }}
      intro={
        <div className="rounded-2xl border border-border bg-card/40 p-6 shadow-card backdrop-blur">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-turquoise)]">
            Pourquoi me confier une refonte
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            <span className="text-foreground">7 ans dans le digital</span>, dont
            plusieurs années comme développeuse sur des plateformes à fort
            trafic et la refonte complète du site corporate d'une entreprise
            internationale. J'applique aujourd'hui ce niveau d'exigence aux PME
            de Savoie et d'ailleurs. Commencez par le mini-audit offert : sous
            72h, vous savez si une refonte se justifie, et par quoi commencer.
          </p>
        </div>
      }
      highlights={refontePmeHighlights}
      highlightsTitle="Ce qu'une refonte doit vous garantir"
      highlightsSubtitle="Quatre engagements concrets, vérifiables pendant et après le projet."
      sectionTitle="🔧 De l'audit offert à la refonte complète"
      sectionSubtitle="Un parcours en 4 étapes : vous ne vous engagez qu'une fois les chiffres posés."
      items={refontePme}
      showPrices
      portfolioLink={{ to: "/portfolio", label: "Voir mes réalisations web" }}
    />
  ),
});
