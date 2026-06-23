import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F7F5F2',
        'deep-blue': '#173340',
        'electric-blue': '#0A24E3',
        cyan: '#6DCCF2',
        orange: '#E3664F',
        yellow: '#FFCD63',
        border: '#e8e4de',
      },
      fontFamily: {
        sans: ['var(--font-lexend)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      animation: {
        'fade-slide-in': 'fadeSlideIn 0.4s ease forwards',
        'fade-in': 'fadeIn 0.35s ease forwards',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'draw-check': 'drawCheck 0.6s ease 0.3s forwards',
      },
      keyframes: {
        fadeSlideIn: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.5)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        drawCheck: {
          '0%': { strokeDashoffset: '100' },
          '100%': { strokeDashoffset: '0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
