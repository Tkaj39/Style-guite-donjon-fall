/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#f0f2ff',
          100: '#e2e5ff',
          200: '#c8cdff',
          300: '#a8b0ff',
          400: '#8591ff',  // = accentLight z tokens.js
          500: '#6576ff',  // = accent z tokens.js  ← hlavní hodnota
          600: '#4455ee',  // = accentDim z tokens.js
          700: '#3344cc',
          800: '#2a36a8',
          900: '#252f85',
          950: '#151a4d',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
