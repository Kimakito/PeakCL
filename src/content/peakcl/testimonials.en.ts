import type { PeakclTestimonial } from "./testimonials";

/**
 * English testimonials for the /en home. Same shape and same order as
 * {@link peakclTestimonials}: names, sources, dates and ratings are kept
 * unchanged; only the quote text is translated to natural English.
 *
 * Keep this list in sync when a review is added on the French side — an /en
 * visitor seeing four reviews where /fr shows six reads as a stale site.
 */
export const peakclTestimonialsEn: PeakclTestimonial[] = [
  {
    name: "Laura",
    sourceLabel: "Mordant Équin · Google review ✓",
    logoUrl: "/peakcl/assets/logo/mordant-equin.png",
    dateLabel: "August 2026",
    rating: 5,
    quote:
      "Support that was reassuring, genuinely enriching and truly tailored to me as I started out on my own.",
  },
  {
    name: "Émilie Bailleux",
    sourceLabel: "Natural Riders · Google review ✓",
    logoUrl: "/peakcl/assets/logo/natural_riders.avif",
    dateLabel: "July 2026",
    rating: 5,
    quote:
      "She guided me through choosing the right hosting and the right platform. Charlotte is responsive and really understood the very specific needs of my site.",
  },
  {
    name: "Camille Daldosso",
    sourceLabel: "Plumes Poils & Compagnie · Google review ✓",
    logoUrl: "/peakcl/assets/logo/plumespoilsetcie.png",
    dateLabel: "June 2026",
    rating: 5,
    quote:
      "Huge thanks to Charlotte for her responsiveness, her expertise, her ideas and her advice. She pinned down exactly what I needed while bringing plenty of her own suggestions.",
  },
  {
    name: "Mathilde T.",
    sourceLabel: "Peak Training · Google review ✓",
    logoUrl: "/peakcl/assets/logo/Peak-training.png",
    dateLabel: "May 2026",
    rating: 5,
    quote:
      "Charlotte grasped my needs very quickly and steered me toward a fresher, clearer direction that fit my business much better.",
  },
  {
    name: "Céline G.",
    sourceLabel: "C'mieux comme ça · Google review ✓",
    logoUrl: "/peakcl/assets/logo/cmieuxcommeca.webp",
    dateLabel: "March 2026",
    rating: 5,
    quote:
      "The questions she asked at the start led to a first draft that was spot on, and then to a fully working site delivered on time.",
  },
  {
    name: "Victor G.",
    sourceLabel: "Adelante Voyage · Google review ✓",
    logoUrl: "/peakcl/assets/logo/logo-adelante.webp",
    rating: 5,
    quote:
      "Charlotte understood exactly what we were after and delivered a site that lived up to our ambitions, with great responsiveness and real practical sense.",
  },
];
