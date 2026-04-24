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
      "Un immense merci à Charlotte pour le travail exceptionnel réalisé sur le site internet d'Adelante Voyage. Toute l'équipe est absolument ravie du résultat ! Elle a parfaitement su comprendre nos attentes et même les dépasser grâce à ses nombreuses propositions pertinentes. Charlotte a été ultra disponible tout au long du projet, très à l'écoute et toujours force de proposition.",
  },
  {
    name: "Céline G.",
    sourceLabel: "Avis Google ✓",
    dateLabel: "mars 2026",
    rating: 5,
    quote:
      "Cela faisait des mois que je repoussais la création de mon site internet. Les questions que tu m'as posées au démarrage ont permis de créer un 1er jet qui m'a bluffé car je me suis entièrement reconnue. Tu as été très réactive pour tous les petits ajustements ce qui permet à mon site d'être opérationnel avant le salon auquel je participe bientôt. C'est parfait !",
  },
]

