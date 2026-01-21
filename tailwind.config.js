/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Bone + Sage foundation
        'white-smoke': '#F2F4EF',
        'smoke-dark': '#BFDCD1',
        // Forest green (primary CTA + accents)
        'mint': {
          50: '#EDF5F1',
          100: '#DCE9E1',
          200: '#C1D6C8',
          300: '#97B59F',
          400: '#6C9A7B',
          500: '#1E4B32',
          600: '#0B2F1C',
          700: '#082416',
          800: '#061A11',
        },
        // Sand + Olive accents
        'claret': {
          50: '#F2EEE8',
          100: '#E7DED1',
          200: '#D6CEC2',
          300: '#BFB5A6',
          400: '#9E9486',
          500: '#7F917A',
          600: '#657463',
          700: '#4F5A4A',
          800: '#3B4436',
        },
        // Neutral ink
        'charcoal': {
          50: '#F5F6F4',
          100: '#E3E6E2',
          200: '#C7CCC6',
          300: '#A7AFA7',
          400: '#818A80',
          500: '#636B63',
          600: '#495149',
          700: '#353B35',
          800: '#242824',
          900: '#191D19',
          950: '#111311',
        },
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.06)',
        'card': '0 2px 8px 0 rgba(0, 0, 0, 0.08)',
        'lifted': '0 4px 12px 0 rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}
