import { createFileRoute } from "@tanstack/react-router";
import { serviceJsonLd, breadcrumbJsonLd } from "@/seo/jsonld";
import { canonicalLink, hreflangLinks, ogLocaleMeta } from "@/seo/hreflang";
import { ServicePage } from "@/components/ServicePage";
import { sitesWebEn, sitesWebHighlightsEn } from "@/content/peakcl/services.en";

export const Route = createFileRoute("/en/web-development")({
  head: () => ({
    meta: [
      { title: "Custom website development · PeakCL" },
      {
        name: "description",
        content:
          "Showcase sites, e-commerce and redesigns: custom-built, fast, SEO-optimized websites, with support from start to finish. On request.",
      },
      { property: "og:type", content: "website" },
      ...ogLocaleMeta("/sites-web", "en"),
      {
        "script:ld+json": serviceJsonLd({
          name: "Custom website development",
          description:
            "Showcase sites, e-commerce and redesigns: custom, fast websites optimized for search, delivered for clients working internationally and remotely.",
          serviceType: "Website development",
          path: "/en/web-development",
        }),
      },
      {
        "script:ld+json": breadcrumbJsonLd([
          { name: "Home", path: "/en" },
          { name: "Services", path: "/en/services" },
          { name: "Web development", path: "/en/web-development" },
        ]),
      },
    ],
    links: [canonicalLink("/sites-web", "en"), ...hreflangLinks("/sites-web")],
  }),
  component: () => (
    <ServicePage
      heroImage={{
        src: "/peakcl/assets/images/bureau-peakcl.webp",
        alt: "PeakCL workspace with a website displayed on screen",
      }}
      eyebrow="Web development"
      title="Custom websites"
      tagline="Showcase sites, e-commerce and redesigns: fast, optimized and built to turn your visitors into customers."
      highlights={sitesWebHighlightsEn}
      highlightsTitle="What I bring to your website"
      highlightsSubtitle="A fast, well-ranked site built to convert, on every screen."
      sectionTitle="💻 Web services"
      sectionSubtitle="Custom sites, tailored to the client, with support from start to finish."
      items={sitesWebEn}
      portfolioLink={{ to: "/en/portfolio", label: "See my web projects" }}
    />
  ),
});
