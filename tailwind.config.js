/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          900: "#0c2e54",
          800: "#1e3a5f",
          700: "#2e4a7f",
          600: "#3d5a9f",
          100: "#e0e7ff",
          50: "#f0f4ff",
        },
        yellow: {
          400: "#fbbf24",
          300: "#fcd34d",
        },
      },
    },
  },
  plugins: [],
}
