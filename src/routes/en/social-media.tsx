import { createFileRoute } from "@tanstack/react-router";
import { serviceJsonLd, breadcrumbJsonLd } from "@/seo/jsonld";
import { canonicalLink, hreflangLinks, ogLocaleMeta } from "@/seo/hreflang";
import { ServicePage } from "@/components/ServicePage";
import {
  communityEn,
  cmForfaitsEn,
  communityHighlightsEn,
} from "@/content/peakcl/services.en";

export const Route = createFileRoute("/en/social-media")({
  head: () => ({
    meta: [
      { title: "Social media management · PeakCL" },
      {
        name: "description",
        content:
          "Social media strategy and content: monthly plans, audit, content on demand and training. Stay visible without spending your evenings on it. On request.",
      },
      { property: "og:type", content: "website" },
      ...ogLocaleMeta("/community-management", "en"),
      {
        "script:ld+json": serviceJsonLd({
          name: "Social media management",
          description:
            "Social media strategy and content: monthly plans, audit, content on demand and training, for freelancers and small businesses.",
          serviceType: "Social media management",
          path: "/en/social-media",
        }),
      },
      {
        "script:ld+json": breadcrumbJsonLd([
          { name: "Home", path: "/en" },
          { name: "Services", path: "/en/services" },
          { name: "Social media", path: "/en/social-media" },
        ]),
      },
    ],
    links: [
      canonicalLink("/community-management", "en"),
      ...hreflangLinks("/community-management"),
    ],
  }),
  component: () => (
    <ServicePage
      heroImage={{
        src: "/peakcl/assets/images/iphone.webp",
        alt: "Social media content displayed on an iPhone",
      }}
      eyebrow="Social media"
      title="Social media management"
      tagline="For therapists and independents: stay visible and consistent on your channels, and build trust, without spending your evenings on it. Clear plans, no long-term commitment."
      highlights={communityHighlightsEn}
      highlightsTitle="What I handle for your channels"
      highlightsSubtitle="A steady presence that looks like your brand, without eating up your evenings."
      forfaits={cmForfaitsEn}
      forfaitsTitle="📱 Monthly plans"
      forfaitsNote="Prices exclude tax · visual revisions included · optional +1 extra platform available. No fixed-term commitment."
      sectionTitle="On demand & support"
      sectionSubtitle="A one-off need or a wish to go independent: audit, single pieces of content and training."
      items={communityEn}
      showPrices
      socials={[
        {
          handle: "la_communaute_des_9_poilus",
          url: "https://www.instagram.com/la_communaute_des_9_poilus/",
          name: "La Communauté des 9 Poilus",
          desc: "Daily life of a nine-strong tribe: 2 humans, 6 cats, 2 horses and 1 dog. Everyday content, a warm tone and active community management.",
        },
        {
          handle: "haltere_ego_c",
          url: "https://www.instagram.com/haltere_ego_c/",
          name: "Haltère Ego",
          desc: "Living with endometriosis through sport: CrossFit, horse riding, running and Hyrox. Personal story, awareness and regular posts.",
        },
        {
          handle: "lesmondesdejbl",
          url: "https://www.facebook.com/lesmondesdejbl",
          name: "Les Mondes de JBL",
          platform: "facebook",
          desc: "An author's page: first novel published, second in the works. Reader community management and news around his worlds.",
        },
      ]}
      socialsTitle="📲 Accounts I run"
      socialsSubtitle="While your projects get underway, here are a couple of accounts I manage day to day to keep my hand in: posting rhythm, visuals and community management."
    />
  ),
});
