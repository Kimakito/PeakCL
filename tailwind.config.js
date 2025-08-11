// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  // ... (le reste du code)
  theme: {
    extend: {
      colors: {
        // ... (tes couleurs)
      },
      animation: {
        'gradient-pulse': 'gradient-pulse 4s ease infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'fade-in': 'fade-in 0.6s ease-out forwards',
      },
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