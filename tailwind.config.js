/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        gray: {
          950: '#0a0a12',
          900: '#121220',
          800: '#1e1e30',
          700: '#2a2a3c',
          600: '#3e3e52',
          500: '#575770',
          400: '#8e8ea0',
          300: '#b2b2c2',
          200: '#d1d1dc',
          100: '#e6e6ef',
        },
        purple: {
          500: '#7c3aed',
          400: '#9563f7',
        },
        blue: {
          600: '#2563eb',
          500: '#3b82f6',
          400: '#60a5fa',
        }
      },
      animation: {
        'pulse': 'pulse 1.5s infinite',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        }
      }
    },
  },
  plugins: [],
};