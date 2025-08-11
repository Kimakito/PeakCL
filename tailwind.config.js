/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./assets/**/*.js"],
  theme: {
    extend: {
      colors: {
        // Ajout de ma palette de couleurs
        'primary-blue': '#00bcd4', // Un bleu foncé (comme l'était ton blue-950) pour le fond
        'secondary-violet': '#5e35b1', // Un violet plus clair
        'accent-blue': '#1a237e', // Ton turquoise vif
        'accent-yellow': '#ffc107', // Un jaune doré
        'gray-light': '#e5e7eb', // Un gris clair pour les textes secondaires
        'gray-dark': '#374151', // Un gris foncé pour les contrastes
      },
      // Ajout d'une animation custom pour les dégradés
      animation: {
        'gradient-pulse': 'gradient-pulse 4s ease infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'fade-in': 'fade-in 0.6s ease-out forwards',
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
        }
      },
    },
  },
  plugins: [],
};