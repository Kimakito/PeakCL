/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
    "./_includes/**/*.html",
    "./_layouts/**/*.html",
    "./_posts/**/*.md",
    "./_pages/**/*.md",
    "./*.html",
    "./**/*.md",
    "./src/**/*.{html,js,md}"
  ],
  theme: {
    extend: {
      colors: {
        // Nouvelle palette de couleurs basée sur le logo PeakCL
        'peak-blue-light': '#00BDBF', 
        'peak-blue-dark': '#011526', 
        'peak-yellow': '#F9CD00', 
        'peak-violet': '#522A80', 
        'peak-gray': '#F3F4F6', 
        'peak-gray-dark': '#1F2937', 
      },
      fontFamily: {
        // Polices personnalisées
        'title': ['"Exo 2"', 'sans-serif'], // Pour les titres
        'body': ['Nunito', 'sans-serif'],   // Pour le texte courant
      },
      animation: {
        'gradient-pulse': 'gradient-pulse 4s ease infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'bg-gradient-shift': 'bg-gradient-shift 10s ease infinite',
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
        },
        'bg-gradient-shift': {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' },
        },
      },
    },
    typography: (theme) => ({
      DEFAULT: {
        css: {
          color: theme('colors.peak-gray'),
          a: { color: theme('colors.peak-yellow') },
          h1: { color: theme('colors.peak-yellow') },
          h2: { color: theme('colors.peak-yellow') },
          h3: { color: theme('colors.peak-yellow') },
          strong: { color: theme('colors.peak-gray') },
        },
      },
      invert: {
        css: {
          color: theme('colors.peak-gray'),
          a: { color: theme('colors.peak-yellow') },
          h1: { color: theme('colors.peak-yellow') },
          h2: { color: theme('colors.peak-yellow') },
        },
      },
    }),
  },
    plugins: [
    require('@tailwindcss/typography'),
  ],
  // évite que "prose" soit purgé si ta chaîne de build est stricte
  safelist: [
    'prose', 'prose-sm', 'prose-lg', 'prose-xl', 'prose-invert'
  ]
};
