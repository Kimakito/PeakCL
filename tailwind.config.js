/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./assets/**/*.js"],
  theme: {
    extend: {
      colors: {
        // Nouvelle palette de couleurs basée sur le logo PeakCL
        'peak-blue-light': '#00BDBF', // Le turquoise du logo
        'peak-blue-dark': '#011526', // Un bleu très foncé, presque noir pour le fond
        'peak-yellow': '#F9CD00', // Le jaune vif
        'peak-violet': '#522A80', // Le violet du logo
        'peak-gray': '#F3F4F6', // Un gris clair pour les textes
        'peak-gray-dark': '#1F2937', // Un gris foncé pour les contrastes
      },
      // Ajout d'une animation custom pour les dégradés
      animation: {
        'gradient-pulse': 'gradient-pulse 4s ease infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'bg-gradient-shift': 'bg-gradient-shift 10s ease infinite', // Nouvelle animation pour le fond
      },
      // Définition de l'animation
      keyframes: {
        'gradient-pulse': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'fade-in-up': {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'bg-gradient-shift': {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' },
        },
      },
    },
  },
  plugins: [],
};