/**
 * English content for the Services pages (Web, Community management, Design,
 * Automation support) consumed by the ServicePage component.
 *
 * Types are imported from services.ts (the French source of truth). Only the
 * human-readable strings are translated: prices, emojis and structural keys
 * stay identical so both language versions share the same rendering logic.
 */

import type {
  CatalogItem,
  Forfait,
  ServiceHighlight,
} from "@/content/peakcl/services";

/* ── Web ─────────────────────────────────────────────────────── */

export const sitesWebEn: CatalogItem[] = [
  {
    title: "Custom-coded showcase site",
    desc: "A fully hand-coded site, with no CMS and no plugin dependencies. Top performance, architecture controlled end to end, and a result that stays unique and durable.",
    price: "On request",
    delay: "Timeline: 3 to 5 weeks",
    included: [
      "Needs analysis & wireframing",
      "Custom HTML/CSS/JS development",
      "Up to 6 pages (Home, About, Services, Portfolio, Blog, Contact)",
      "Responsive design (mobile-first)",
      "Contact form & third-party integrations",
      "On-page SEO & performance optimization (Lighthouse)",
      "Hosting recommendation & go-live",
      "3 months of support included",
    ],
  },
  {
    title: "WordPress showcase site",
    desc: "A professional WordPress site with a back office so you can manage your content on your own. Ideal for editing your pages without calling a developer.",
    delay: "Timeline: 3 to 5 weeks",
    included: [
      "Needs analysis & wireframing",
      "Premium theme integration or child-theme development",
      "Up to 6 pages (Home, About, Services, Portfolio, Blog, Contact)",
      "Responsive design & mobile optimization",
      "Contact form & Google Maps",
      "On-page SEO optimization (Yoast / RankMath)",
      "Training on how to use the back office",
      "1 month of support included",
    ],
  },
  {
    title: "E-commerce site",
    desc: "A complete, secure online store. Platform recommended to fit your project: Shopify, PrestaShop or WooCommerce.",
    price: "On request",
    delay: "Timeline: 4 to 7 weeks",
    included: [
      "Audit & platform recommendation based on your needs",
      "Full store configuration",
      "Integration of up to 30 products",
      "Payment gateways (Stripe, PayPal, and more)",
      "Stock & order management",
      "Legal pages (terms of sale, legal notice, privacy policy)",
      "SEO & loading-speed optimization",
      "User training & documentation",
    ],
  },
  {
    title: "Landing page / sales page",
    desc: "A single high-converting page to promote an offer, an event or a product.",
    price: "On request",
    delay: "Timeline: 1 to 2 weeks",
    included: [
      "Conversion-focused copywriting (AIDA structure)",
      "Custom, responsive design & development",
      "Capture form / CTA integration",
      "Connection to an emailing tool (Mailchimp, Brevo, and more)",
      "Performance testing & optimization",
    ],
  },
  {
    title: "Redesign of an existing site",
    desc: "Modernizing an outdated site: new design, better user experience, better performance.",
    price: "On request",
    delay: "Depending on the current site's complexity",
    included: [
      "UX/UI audit and analysis of current performance",
      "New responsive design (mobile-first)",
      "Migration & preservation of existing content",
      "301 redirects & SEO preservation",
      "Core Web Vitals optimization",
      "Cross-browser & cross-device testing",
    ],
  },
  {
    title: "Maintenance & technical support",
    desc: "A monthly plan to keep your site secure, stable and up to date.",
    price: "99 €/month",
    delay: "3-month minimum commitment",
    included: [
      "CMS, plugin & theme updates",
      "Weekly backups",
      "Uptime monitoring",
      "Bug fixes & minor adjustments",
      "Monthly performance report",
      "Priority email support",
    ],
  },
  {
    title: "Technical SEO optimization",
    desc: "Audit and optimization to improve your ranking on Google and grow your organic traffic.",
    price: "500 €",
    delay: "Report delivered in 1 week",
    included: [
      "Full SEO audit (technical, content, backlinks)",
      "Prioritized recommendations report",
      "Speed optimization (Core Web Vitals)",
      "Technical error fixes (404s, duplicates, sitemap, and more)",
      "Schema.org structured data markup",
      "Monthly ranking tracking (3 months included)",
    ],
  },
];

/* ── Design ──────────────────────────────────────────────────── */

export const designEn: CatalogItem[] = [
  {
    title: "Complete visual identity",
    desc: "Logo, colors, typography and brand guidelines for a consistent, memorable brand.",
    price: "On request",
    delay: "Timeline: 1 to 2 weeks",
    included: [
      "Positioning questionnaire & brief",
      "3 logo proposals (AI, SVG, PNG, PDF)",
      "Brand guidelines (colors, typography, usage)",
      "Variation kit (light background, dark background, black & white)",
      "Source files + usage guide",
      "2 rounds of revisions included",
    ],
  },
  {
    title: "Print materials",
    desc: "Flyers, brochures, business cards and posters ready to print.",
    price: "On request",
    delay: "Sliding rate from 3 items onward",
    included: [
      "Business cards (front/back)",
      "A5 or A4 flyers (front/back)",
      "Sales brochures (4 to 8 pages)",
      "Posters (A3/A2)",
      "Print-ready HD files (CMYK + bleed)",
    ],
  },
  {
    title: "Social media visuals",
    desc: "A pack of 10 branded, reusable templates to run your social channels with a professional look.",
    price: "On request",
    delay: "Timeline: 3 to 5 days",
    included: [
      "10 templates (posts, stories, covers)",
      "Per-platform variations (Instagram, Facebook, LinkedIn, TikTok)",
      "Recommended formats (1:1, 4:5, 9:16, 16:9)",
      "Editable files (Canva Pro or Figma)",
      "Usage guide",
    ],
  },
  {
    title: "Email & newsletter template",
    desc: "A responsive design in your brand style, compatible with all mail clients and emailing platforms.",
    price: "On request",
    delay: "Timeline: 3 to 5 days",
    included: [
      "Responsive design (mobile & desktop)",
      "Integration into your tool (Mailchimp, Brevo, ActiveCampaign, and more)",
      "Modular, reusable template",
      "Cross-client compatibility testing",
      "HTML file + documentation",
    ],
  },
  {
    title: "Digital display banners",
    desc: "Display banners for your campaigns, in standard or custom formats.",
    price: "On request",
    delay: "Delivery within 48h",
    included: [
      "Standard formats (728x90, 300x250, 160x600, 320x50, and more)",
      "Static variations (image or GIF)",
      "Compliance with each platform's specifications",
      "Up to 5 formats included",
    ],
  },
];

/* ── Community management ─────────────────────────────────────── */

export const cmForfaitsEn: Forfait[] = [
  {
    emoji: "🌱",
    name: "Essential",
    freq: "4 posts/month (1/week)",
    inclus: ["4 branded visuals", "4 captions + hashtags", "Monthly report"],
    price: "200 €/month",
  },
  {
    emoji: "⭐",
    name: "Standard",
    freq: "8 posts/month (2/week)",
    inclus: ["8 branded visuals", "8 captions + hashtags", "Monthly report"],
    price: "400 €/month",
    highlight: true,
  },
  {
    emoji: "🚀",
    name: "Dynamic",
    freq: "12 posts/month (3/week)",
    inclus: [
      "12 visuals",
      "12 captions + hashtags",
      "1 story/week",
      "Monthly report",
    ],
    price: "650 €/month",
  },
  {
    emoji: "🔥",
    name: "Intensive",
    freq: "20 posts/month (5/week, excluding LinkedIn)",
    inclus: [
      "20 visuals",
      "20 captions + hashtags",
      "Stories + Reels (2/month)",
      "Monthly report",
    ],
    price: "900 €/month",
  },
  {
    emoji: "🎯",
    name: "Custom",
    freq: "Frequency defined together",
    inclus: [
      "Tailored volume",
      "All platforms",
      "Strategic guidance",
      "Monthly report",
    ],
    price: "On request",
  },
];

export const communityEn: CatalogItem[] = [
  {
    title: "Social media audit",
    desc: "A full analysis of your social presence to identify strengths, gaps and opportunities.",
    price: "On request",
    delay: "Delivered in 5 business days",
    included: [
      "Analysis of your existing accounts (engagement, frequency, tone, and more)",
      "Benchmark of 3 competitors",
      "Audit of your target audience and personas",
      "Strategic recommendations (platforms, formats, frequency)",
      "Illustrated PDF report with a prioritized action plan",
    ],
  },
  {
    title: "Content on demand",
    desc: "One-off content creation with no monthly commitment. Ideal for a specific need or to test the collaboration.",
    price: "Pack of 20 pieces: 380 €",
    included: [
      "Post (caption + visual): 20 to 30 €/each",
      "Animated story: 30 to 50 €/each",
      "Reel / short video: 80 to 150 €/each",
      "SEO blog article (800-1200 words): 120 to 180 €",
      "Written and designed newsletter: 150 to 250 €",
      "1-month editorial calendar: 180 €",
    ],
  },
  {
    title: "Social media training",
    desc: "One-on-one or group training to take your channels into your own hands.",
    price: "200 €/half-day · 350 €/day",
    included: [
      "Choose your modules: content creation, algorithms, Canva, analytics",
      "In person or by video call",
      "Personalized training materials provided",
      "Hands-on exercises on your own accounts",
      "1h of post-training follow-up included",
    ],
  },
];

/* ── Automation support ──────────────────────────────────────── */

export const automatisationEn: CatalogItem[] = [
  {
    title: "Audit & process mapping",
    desc: "You lose time on repetitive tasks and you are not sure where to start.",
    delay: "Delivered: 1 to 2 weeks (depending on the number of processes)",
    included: [
      "Scoping interview and inventory of time-consuming tasks",
      "Mapping of your current processes (clear diagram)",
      "Spotting the high-impact automation points",
      "Estimate of the time and budget saved",
      "Prioritized AI action plan (quick wins first)",
    ],
  },
  {
    title: "Setting up no-code automations",
    desc: "You want to connect your tools and cut out the copy-pasting between apps.",
    delay: "Indicative timeline: 1 to 4 weeks (depending on complexity)",
    included: [
      "Automated workflows (Make, Zapier, n8n as needed)",
      "Connecting your tools (CRM, email, calendar, invoicing, forms, and more)",
      "Testing, hardening and error handling",
      "Clear documentation for each automation",
      "Onboarding support included",
    ],
    notIncluded: [
      "Platform subscriptions (Make, Zapier, etc.)",
      "Custom API development (optional)",
    ],
  },
  {
    title: "AI applied to your content & data",
    desc: "You want to save time on writing, sorting, analysis or follow-ups.",
    included: [
      "Content generation (emails, posts, product sheets, summaries) with human review",
      "Summarizing and analyzing large volumes of data (customer feedback, dashboards)",
      "AI assistants and agents connected to your tools",
      "Safeguards and human validation wherever it matters",
    ],
  },
  {
    title: "Training & growing your autonomy",
    desc: "You want to understand your automations and evolve them yourself.",
    delay: "Format: remote or on-site sessions",
    included: [
      "Getting to grips with no-code tools (Make / Zapier)",
      "Best practices and a method to automate without breaking things",
      "Practical cases on your own processes",
      "Reusable training materials",
    ],
  },
  {
    title: "Consultant support (ongoing)",
    desc: "You want automation that lives and improves over time.",
    delay: "Commitment: defined to fit your needs",
    included: [
      "Regular follow-up and workflow optimization",
      "New automations as needs arise",
      "Monitoring and fixes",
      "Advisory input on your organization and tools",
    ],
  },
];

export const automatisationHighlightsEn: ServiceHighlight[] = [
  {
    emoji: "🗺️",
    title: "Map your AI opportunities",
    desc: "We pinpoint, across your processes, where AI genuinely saves time. You leave with a clear AI action plan, prioritized over 30 days.",
  },
  {
    emoji: "✍️",
    title: "Generate your content with AI",
    desc: "Emails, posts, product sheets, visuals: produce faster and in your own style, with systematic human review.",
  },
  {
    emoji: "📊",
    title: "Analyze your data",
    desc: "Summarize customer feedback, dashboards and large documents to decide faster, without getting caught out by AI bias.",
  },
  {
    emoji: "⚙️",
    title: "Automate your repetitive tasks",
    desc: "Connect your tools (Make, Zapier, n8n): email sorting, follow-ups, monitoring, CRM leads. No more copy-pasting between apps.",
  },
];

export const sitesWebHighlightsEn: ServiceHighlight[] = [
  {
    emoji: "🎯",
    title: "A site built to convert",
    desc: "A clear structure, a guided journey and calls to action in the right place: your visitors understand and take action.",
  },
  {
    emoji: "⚡",
    title: "Fast and well ranked",
    desc: "Optimized code, Core Web Vitals in the green and careful on-page SEO: Google and your visitors find you faster.",
  },
  {
    emoji: "📱",
    title: "Flawless on mobile",
    desc: "Mobile-first design: your site stays crisp and comfortable on phone, tablet and desktop.",
  },
  {
    emoji: "🛠️",
    title: "Self-managed or fully handled",
    desc: "Custom-built or WordPress to fit your needs: manage your content yourself, or let me handle everything through maintenance.",
  },
];

export const designHighlightsEn: ServiceHighlight[] = [
  {
    emoji: "✨",
    title: "An identity that looks like you",
    desc: "Consistent logo, colors and typography: a brand that is recognizable at a glance, across every one of your materials.",
  },
  {
    emoji: "🖼️",
    title: "Ready-to-use materials",
    desc: "Business cards, flyers, social visuals: finalized files, adapted and delivered in the right formats.",
  },
  {
    emoji: "🎭",
    title: "Illustration & characters",
    desc: "Custom mascots and illustrations to give your brand personality and help you stand out.",
  },
  {
    emoji: "📐",
    title: "Clear guidelines to follow",
    desc: "A simple guide to your brand's rules: you stay consistent, even when you create your own visuals.",
  },
];

export const communityHighlightsEn: ServiceHighlight[] = [
  {
    emoji: "🗓️",
    title: "A steady presence",
    desc: "An editorial calendar and scheduled posts: you stay visible without thinking about it every day.",
  },
  {
    emoji: "🎨",
    title: "Visuals in your brand style",
    desc: "Posts, stories and carousels consistent with your brand, designed to stop the scroll.",
  },
  {
    emoji: "💬",
    title: "An engaged community",
    desc: "The right tone, replies to comments and messages: a trusting relationship with your audience.",
  },
  {
    emoji: "📈",
    title: "Choices guided by the numbers",
    desc: "Tracking your stats and adjusting regularly: we keep what works and drop what does not land.",
  },
];
