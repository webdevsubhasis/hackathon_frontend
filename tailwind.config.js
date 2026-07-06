/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#080B14',
          900: '#0B1220',
          800: '#111A2E',
          700: '#182645',
        },
        accent: {
          DEFAULT: '#6C5CE7',
          light: '#8B7CF6',
          dark: '#5544C9',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px rgba(108, 92, 231, 0.25)',
      },
    },
  },
  plugins: [],
};
