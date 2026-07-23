import { createFileRoute } from "@tanstack/react-router";
import { serviceJsonLd, breadcrumbJsonLd } from "@/seo/jsonld";
import { canonicalLink, hreflangLinks, ogLocaleMeta } from "@/seo/hreflang";
import { ServicePage } from "@/components/ServicePage";
import { designEn, designHighlightsEn } from "@/content/peakcl/services.en";
import { MASCOT_GALLERY } from "@/content/peakcl/mascots";

export const Route = createFileRoute("/en/design")({
  head: () => ({
    meta: [
      { title: "Graphic design & visual identity · PeakCL" },
      {
        name: "description",
        content:
          "Logo, brand guidelines, print materials and social media visuals: a consistent, memorable brand. On request.",
      },
      { property: "og:type", content: "website" },
      ...ogLocaleMeta("/design", "en"),
      {
        "script:ld+json": serviceJsonLd({
          name: "Graphic design & visual identity",
          description:
            "Logo, brand guidelines, print materials and social media visuals for a consistent, memorable brand.",
          serviceType: "Visual identity and logo design",
          path: "/en/design",
        }),
      },
      {
        "script:ld+json": breadcrumbJsonLd([
          { name: "Home", path: "/en" },
          { name: "Services", path: "/en/services" },
          { name: "Graphic design", path: "/en/design" },
        ]),
      },
    ],
    links: [canonicalLink("/design", "en"), ...hreflangLinks("/design")],
  }),
  component: () => (
    <ServicePage
      avatarCard="logos"
      eyebrow="Graphic design"
      title="Graphic design"
      tagline="A visual identity and materials that make your brand consistent and memorable."
      intro={
        <div className="rounded-2xl border border-border bg-card/40 p-6 shadow-card backdrop-blur">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-yellow)]">
            Certified
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Work delivered under the{" "}
            <span className="text-foreground">
              RS7068 "Create communication materials with a graphic design tool"
              certification
            </span>
            .
          </p>
        </div>
      }
      highlights={designHighlightsEn}
      highlightsTitle="What I create for your brand"
      highlightsSubtitle="From visual identity to custom illustrations, consistent materials across every touchpoint."
      sectionTitle="🎨 Design services"
      sectionSubtitle="Visual identity and materials for a brand that stays consistent across every touchpoint."
      items={designEn}
      gallery={MASCOT_GALLERY}
      galleryTitle="🎭 Illustration & character design"
      gallerySubtitle="An expressive mascot drawn in Illustrator: one character declined into several emotions to give a brand personality."
      portfolioLink={{
        to: "/en/portfolio?cat=logos",
        label: "See my logos & creations",
      }}
    />
  ),
});
