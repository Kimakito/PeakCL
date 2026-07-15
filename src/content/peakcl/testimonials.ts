export type PeakclTestimonial = {
  name: string
  sourceLabel?: string
  dateLabel?: string
  rating: 1 | 2 | 3 | 4 | 5
  quote: string
}

export const peakclTestimonials: PeakclTestimonial[] = [
  {
    name: "Victor G.",
    sourceLabel: "Adelante Voyage · Avis Google ✓",
    rating: 5,
    quote:
      "Charlotte a compris nos attentes et a livré un site à la hauteur de nos ambitions, avec beaucoup de réactivité et de sens pratique.",
  },
  {
    name: "Mathilde T.",
    sourceLabel: "Avis Google ✓",
    dateLabel: "mai 2026",
    rating: 5,
    quote:
      "Charlotte a très vite compris mes besoins et m’a proposé une direction plus moderne, plus claire et plus adaptée à mon activité.",
  },
  {
    name: "Céline G.",
    sourceLabel: "Avis Google ✓",
    dateLabel: "mars 2026",
    rating: 5,
    quote:
      "Les questions posées au démarrage ont permis de créer un premier jet très juste, puis de livrer un site opérationnel à temps.",
  },
  {
    name: "Camille Daldosso",
    sourceLabel: "Plumes Poils & Compagnie · Avis Google ✓",
    dateLabel: "juin 2026",
    rating: 5,
    quote:
      "Une collaboration très fluide, avec beaucoup de réactivité, d’idées et de conseils concrets pour faire avancer le projet.",
  },
]

