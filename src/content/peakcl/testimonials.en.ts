import type { PeakclTestimonial } from "./testimonials";

/**
 * English testimonials for the /en home. Same shape as
 * {@link peakclTestimonials}: names, sources, dates and ratings are kept
 * unchanged; only the quote text is translated to natural English.
 */
export const peakclTestimonialsEn: PeakclTestimonial[] = [
  {
    name: "Victor G.",
    sourceLabel: "Adelante Voyage · Google review ✓",
    rating: 5,
    quote:
      "Charlotte understood exactly what we were after and delivered a site that lived up to our ambitions, with great responsiveness and real practical sense.",
  },
  {
    name: "Mathilde T.",
    sourceLabel: "Google review ✓",
    dateLabel: "May 2026",
    rating: 5,
    quote:
      "Charlotte grasped my needs very quickly and steered me toward a fresher, clearer direction that fit my business much better.",
  },
  {
    name: "Céline G.",
    sourceLabel: "Google review ✓",
    dateLabel: "March 2026",
    rating: 5,
    quote:
      "The questions she asked at the start led to a first draft that was spot on, and then to a fully working site delivered on time.",
  },
  {
    name: "Camille Daldosso",
    sourceLabel: "Plumes Poils & Compagnie · Google review ✓",
    dateLabel: "June 2026",
    rating: 5,
    quote:
      "A really smooth collaboration, with plenty of responsiveness, ideas and concrete advice to keep the project moving.",
  },
];
