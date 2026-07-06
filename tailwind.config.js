/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/main.js",
    "./src/**/*.{js,ts,jsx,tsx,html,css}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["ElMessiri", "sans-serif"],
      },
    },
  },
  plugins: [],
};
