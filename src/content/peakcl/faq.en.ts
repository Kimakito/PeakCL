import type { PeakclFaqItem } from "./faq";

/**
 * English FAQ for the /en home. Same shape as {@link peakclFaqHome}, aimed at
 * international remote clients (no Savoie/Alps anchoring in the pitch).
 */
export const peakclFaqHomeEn: PeakclFaqItem[] = [
  {
    question: "How long does it take to build a site and actually get it live?",
    answerHtml:
      "It depends on the scope (site only vs. site + logo + social + Google). The goal is to move fast without cutting corners: we lock the structure and the tone, then I build. The timeline also depends on how quickly you can share the basics (services, area, photos).",
  },
  {
    question: "Will my site be found on Google?",
    answerHtml:
      "Yes. I put the foundations in place (structure, titles, performance, indexing). From there, visibility builds over time, especially with a Google Business Profile and useful content. I help you start on clean, durable ground.",
  },
  {
    question: "Why have a website if I already have Instagram / Facebook?",
    answerHtml:
      "Social platforms are useful, but you don't control them (algorithms, restrictions, account bans). Your site is your home base: one clear place where people quickly understand what you do, with a simple way to get in touch. And search engines send people to web pages and business listings first, not to your posts.",
  },
  {
    question: "I don't have time to prepare the content. How does that work?",
    answerHtml:
      "That's exactly the heart of my approach: I ask the right questions, structure everything, and write/organise it with you. You don't need to show up with a perfect brief. We start from what you already have, and we move forward.",
  },
  {
    question: "Do you only work with local clients, or remotely too?",
    answerHtml:
      "I work with clients worldwide, fully remotely (video call, phone, email). Time zones and distance are never a problem. <a href='/en/about' class='underline'>More about me →</a>",
  },
];
