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
        // Palette Premium 2026 - Psychologie des couleurs pour conversion
        'peak-yellow': '#f9cd00',           // Or pur - Urgence & Action
        'peak-yellow-light': '#FFF44F',     // Or clair - Accents secondaires
        'peak-yellow-dark': '#FFA500',      // Or foncé - Hover states
        
        'peak-teal': '#00BCD4',             // Cyan-blue - Confiance & Accessibilité
        'peak-teal-light': '#4DD0E1',       // Cyan clair
        
        'peak-blue-light': '#00bdbf',       // Cyan luminux - Confiance & Accessibilité
        'peak-blue-dark': '#011526',        // Bleu foncé Navy - Trust base
        'peak-blue-darker': '#060A11',      // Bleu très foncé
        
        'peak-violet': '#522a80',           // Violet profond - Premium & Créativité
        'peak-purple': '#6B46C1',           // Violet profond - Premium & Créativité
        'peak-purple-light': '#9F7AEA',     // Violet clair
        'peak-purple-dark': '#5A2D82',      // Violet très foncé
        
        'peak-rose': '#F87171',             // Rose/Coral - Humanité & Approche
        'peak-rose-light': '#FCA5A5',       // Rose clair
        
        'peak-white': '#FFFFFF',            // Blanc - Pureté
        'peak-gray': '#F3F4F6',             // Gris très clair
        'peak-gray-light': '#F9FAFB',       // Gris ultra-clair
        'peak-gray-dark': '#1F2937',        // Gris foncé
        'peak-gray-darker': '#111827',      // Gris très foncé
      },
      fontFamily: {
        // Polices Premium 2026
        'title': ['"Playfair Display"', 'serif'],  // Titres principaux - Prestige
        'subtitle': ['"Raleway"', 'sans-serif'],   // Sous-titres - Accessible
        'body': ['"Poppins"', 'sans-serif'],       // Texte courant - Chaleur
        'accent': ['"Caveat"', 'cursive'],         // Signature - Humanité
        'exo': ['"Exo 2"', 'sans-serif'],          // Fallback pour compat
      },
      animation: {
        // Animations Legacy (compatible)
        'gradient-pulse': 'gradient-pulse 4s ease infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'bg-gradient-shift': 'bg-gradient-shift 10s ease infinite',
        
        // Animations Premium 2026 (définies dans animations-premium.css)
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'glow-purple': 'glow-purple 2s ease-in-out infinite',
        'float-up': 'float-up 3s ease-in-out infinite',
        'float-rotate': 'float-rotate 4s ease-in-out infinite',
        'slide-in-left': 'slide-in-left 0.6s ease-out forwards',
        'slide-in-right': 'slide-in-right 0.6s ease-out forwards',
        'slide-in-up': 'slide-in-up 0.6s ease-out forwards',
        'scale-bounce': 'scale-bounce 2s ease-in-out infinite',
        'scale-pop': 'scale-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'pulse-attention': 'pulse-attention 1.5s ease-in-out infinite',
        'bounce-light': 'bounce-light 2s ease-in-out infinite',
        'text-reveal': 'text-reveal 0.8s ease-out forwards',
        'border-glow': 'border-glow 2s ease-in-out infinite',
        'slider-scroll': 'slider-scroll 30s linear infinite',
      },
      keyframes: {
        // Keyframes Legacy
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
        'slider-scroll': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
    typography: (theme) => ({
      DEFAULT: {
        css: {
          color: theme('colors.peak-gray'),
          a: { color: theme('colors.peak-yellow'), transition: 'color 0.3s ease' },
          'a:hover': { color: theme('colors.peak-yellow-dark') },
          h1: { color: theme('colors.peak-yellow'), fontFamily: theme('fontFamily.title') },
          h2: { color: theme('colors.peak-purple'), fontFamily: theme('fontFamily.title') },
          h3: { color: theme('colors.peak-teal'), fontFamily: theme('fontFamily.subtitle') },
          h4: { color: theme('colors.peak-purple-light') },
          strong: { color: theme('colors.peak-gray-dark'), fontWeight: '700' },
          code: { color: theme('colors.peak-rose'), backgroundColor: theme('colors.peak-gray-light'), padding: '2px 6px', borderRadius: '4px' },
        },
      },
      invert: {
        css: {
          color: theme('colors.peak-gray'),
          a: { color: theme('colors.peak-yellow') },
          h1: { color: theme('colors.peak-yellow') },
          h2: { color: theme('colors.peak-purple-light') },
        },
      },
    }),
  },
    plugins: [
    require('@tailwindcss/typography'),
  ],
  // Safelist pour Tailwind purge
  safelist: [
    'prose', 'prose-sm', 'prose-lg', 'prose-xl', 'prose-invert',
    'bg-peak-yellow', 'bg-peak-yellow-light', 'bg-peak-yellow-dark',
    'bg-peak-purple', 'bg-peak-purple-light', 'bg-peak-purple-dark',
    'bg-peak-teal', 'bg-peak-teal-light',
    'bg-peak-rose', 'bg-peak-rose-light',
    'bg-peak-blue-dark', 'bg-peak-blue-darker',
    'text-peak-yellow', 'text-peak-purple', 'text-peak-teal', 'text-peak-rose',
    'border-peak-yellow', 'border-peak-purple', 'border-peak-teal',
    'shadow-peak-yellow', 'shadow-peak-purple',
    'animate-glow-pulse', 'animate-glow-purple', 'animate-float-up', 'animate-scale-bounce',
    'animate-pulse-attention', 'animate-border-glow',
    'gradient-text', 'gradient-text-pulse',
    'stagger-children'
  ]
};
