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
        // Palette Luxe Minimal - sobre, haut de gamme, rassurante
        'peak-yellow': '#f5df29',
        'peak-yellow-light': '#f9ec72',
        'peak-yellow-dark': '#c9b510',

        'peak-teal': '#0cc6c1',
        'peak-teal-light': '#5ededa',

        'peak-blue-light': '#1b2a3e',
        'peak-blue-dark': '#08101b',
        'peak-blue-darker': '#050b14',

        // Couleurs page bienvenue (bleu marine profond)
        'peak-navy': '#0c1d3e',
        'peak-navy-alt': '#0a1830',

        'peak-violet': '#1e0730',
        'peak-purple': '#6d0497',
        'peak-purple-light': '#af07d9',
        'peak-purple-dark': '#2a0050',

        'peak-rose': '#b98b7a',
        'peak-rose-light': '#d5b2a7',

        // Fonds sombres page (dégradés, hero, sections)
        'peak-dark': '#070f19',
        'peak-dark-mid': '#0b1422',
        'peak-dark-deep': '#101b2c',
        'peak-dark-navy': '#0f1c2e',
        'peak-dark-alt': '#131f31',

        'peak-white': '#FFFFFF',
        'peak-gray': '#e8edf4',
        'peak-gray-light': '#f3f6fb',
        'peak-gray-dark': '#1a2433',
        'peak-gray-darker': '#0f1724',
      },
      fontFamily: {
        // Polices 2026
        'title': ['"Exo 2"', 'sans-serif'],        // Titres — moderne, lisible, premium
        'body': ['"Poppins"', 'sans-serif'],        // Corps de texte — chaleureux
        'accent': ['"Exo 2"', 'sans-serif'],        // Variation accent → uppercase + tracking-widest
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
          'a:hover': { color: theme('colors.peak-teal') },
          h1: { color: theme('colors.peak-yellow'), fontFamily: theme('fontFamily.title') },
          h2: { color: theme('colors.peak-purple-light'), fontFamily: theme('fontFamily.title') },
          h3: { color: theme('colors.peak-teal'), fontFamily: theme('fontFamily.title') },
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
    'bg-peak-navy', 'bg-peak-navy-alt',
    'bg-peak-dark', 'bg-peak-dark-mid', 'bg-peak-dark-deep', 'bg-peak-dark-navy', 'bg-peak-dark-alt',
    'text-peak-yellow', 'text-peak-yellow-light',
    'text-peak-purple', 'text-peak-purple-light',
    'text-peak-teal', 'text-peak-teal-light',
    'text-peak-rose', 'text-peak-gray', 'text-peak-gray-dark',
    'border-peak-yellow', 'border-peak-purple', 'border-peak-purple-light', 'border-peak-teal',
    'from-peak-yellow', 'from-peak-yellow-light', 'from-peak-teal', 'from-peak-purple-light',
    'from-peak-dark', 'from-peak-dark-mid', 'from-peak-dark-deep', 'from-peak-blue-dark',
    'via-peak-dark-mid', 'via-peak-dark-deep', 'via-peak-dark', 'via-peak-blue-dark',
    'to-peak-dark', 'to-peak-dark-mid', 'to-peak-dark-deep', 'to-peak-dark-navy', 'to-peak-dark-alt',
    'shadow-peak-yellow', 'shadow-peak-purple',
    'animate-glow-pulse', 'animate-glow-purple', 'animate-float-up', 'animate-scale-bounce',
    'animate-pulse-attention', 'animate-border-glow',
    'gradient-text', 'gradient-text-pulse',
    'stagger-children',
    'font-title', 'font-body', 'font-accent',
    'uppercase', 'tracking-widest', 'tracking-wider'
  ]
};
