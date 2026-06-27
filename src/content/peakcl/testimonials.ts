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
    name: "Mathilde T.",
    sourceLabel: "Avis Google ✓",
    dateLabel: "mai 2026",
    rating: 5,
    quote:
      "Je ne peux que recommander Charlotte. Je l'ai contacté pour mon site internet, je voulais en faire un depuis longtemps mais je ne savais pas par où commencer. Elle a été très professionnelle et a très vite cerné mes besoins. Elle m'a proposé des supers versions qui correspondaient très bien à mon domaine et à mes envies. Elle a aussi pu me proposer un logo bien plus dynamique et moderne que celui que j'avais. Bref, 100% satisfaite ! Elle est professionnelle, avisée, s'adapte à vos besoins et investie dans son travail.",
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

