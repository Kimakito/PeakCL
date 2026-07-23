import { createFileRoute } from "@tanstack/react-router";
import { serviceJsonLd, breadcrumbJsonLd } from "@/seo/jsonld";
import { canonicalLink, hreflangLinks, ogLocaleMeta } from "@/seo/hreflang";
import { ServicePage } from "@/components/ServicePage";
import {
  automatisationEn,
  automatisationHighlightsEn,
} from "@/content/peakcl/services.en";

export const Route = createFileRoute("/en/automation")({
  head: () => ({
    meta: [
      { title: "Process automation support · PeakCL" },
      {
        name: "description",
        content:
          "Business process automation consultant: audit, no-code automations (Make, Zapier), applied AI and training. Win back time on your repetitive tasks. On request.",
      },
      { property: "og:type", content: "website" },
      ...ogLocaleMeta("/accompagnement-automatisation", "en"),
      {
        "script:ld+json": serviceJsonLd({
          name: "Process automation & AI",
          description:
            "Audit, no-code automations (Make, Zapier), applied AI and training for small businesses.",
          serviceType: "Business process automation",
          path: "/en/automation",
        }),
      },
      {
        "script:ld+json": breadcrumbJsonLd([
          { name: "Home", path: "/en" },
          { name: "Services", path: "/en/services" },
          { name: "Automation & AI", path: "/en/automation" },
        ]),
      },
    ],
    links: [
      canonicalLink("/accompagnement-automatisation", "en"),
      ...hreflangLinks("/accompagnement-automatisation"),
    ],
  }),
  component: () => (
    <ServicePage
      heroSpline="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
      eyebrow="Automation & AI"
      title="AI at work in your small business"
      tagline="Put artificial intelligence and automation to work in your small team: fewer repetitive tasks, more time for the work that matters."
      intro={
        <div className="rounded-2xl border border-border bg-card/40 p-6 shadow-card backdrop-blur">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-yellow)]">
            New · certification in progress
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            I am training for the{" "}
            <span className="text-foreground">
              RS7311 "Improving your small business efficiency with AI"
              certification
            </span>{" "}
            (21 hours, designed for leaders of small teams). The goal: to
            support you concretely in bringing AI in strategically, accessibly
            and operationally, with tools that are reliable, documented and
            under control.
          </p>
        </div>
      }
      highlights={automatisationHighlightsEn}
      highlightsTitle="Four ways to win back time with AI"
      highlightsSubtitle="The four skills covered by the RS7311 certification, applied directly to your business."
      sectionTitle="⚙️ Automation & AI services"
      sectionSubtitle="From process audit to setup, training and follow-up."
      items={automatisationEn}
    />
  ),
});
