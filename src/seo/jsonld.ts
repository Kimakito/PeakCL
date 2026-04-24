import { absUrl } from "@/seo/site";

export type JsonLd = Record<string, unknown>;

export function organizationJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PeakCL",
    url: absUrl("/"),
    logo: absUrl("/peakcl/PeakCL.svg"),
    email: "peakcl73@gmail.com",
    sameAs: ["https://www.linkedin.com/in/charlotte-lacroix-peakcl/"],
  };
}

export function professionalServiceJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "PeakCL",
    url: absUrl("/"),
    email: "peakcl73@gmail.com",
    areaServed: ["Savoie", "Haute-Savoie", "France"],
    address: {
      "@type": "PostalAddress",
      addressRegion: "Savoie",
      addressCountry: "FR",
    },
  };
}

export function faqPageJsonLd(items: Array<{ question: string; answerHtml: string }>): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.question,
      acceptedAnswer: {
        "@type": "Answer",
        // Keep as text to avoid embedded HTML in JSON-LD
        text: i.answerHtml.replace(/<[^>]*>/g, ""),
      },
    })),
  };
}

export function breadcrumbJsonLd(crumbs: Array<{ name: string; path: string }>): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: c.name,
      item: absUrl(c.path),
    })),
  };
}

