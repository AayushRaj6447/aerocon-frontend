/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        aerospace: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
          950: '#09090b',
        }
      },
      fontFamily: {
        sans: ['Bebas Neue', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
      /*
       * Tailwind tracking scale — recalibrated for Bebas Neue.
       * Default values were designed for normal proportional fonts.
       * Bebas Neue is condensed all-caps and needs more air at every level.
       */
      letterSpacing: {
        tighter:  '0.02em',   // large hero text only
        tight:    '0.04em',   // large headings (h1/h2)
        normal:   '0.06em',   // default body / h3
        wide:     '0.09em',   // medium labels, h4-h6
        wider:    '0.14em',   // small uppercase labels
        widest:   '0.22em',   // tiny caps / monospaced badges
      },
      animation: {
        'float-slow': 'float 7s ease-in-out infinite',
        'float-alt': 'floatAlt 10s ease-in-out infinite',
        'float-drift': 'floatDrift 15s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'grid-scroll': 'gridScroll 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        floatAlt: {
          '0%, 100%': { transform: 'translate(0px, 0px)' },
          '50%': { transform: 'translate(-8px, -14px)' },
        },
        floatDrift: {
          '0%, 100%': { transform: 'translate(0px, 0px)' },
          '33%': { transform: 'translate(10px, -10px)' },
          '66%': { transform: 'translate(-8px, -18px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        gridScroll: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '40px 40px' },
        }
      }
    },
  },
  plugins: [],
};

