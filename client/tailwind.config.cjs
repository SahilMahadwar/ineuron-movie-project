const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: colors.red,
      },
    },
    fontFamily: {
      display: ["InterVariable"],
      body: ["InterVariable"],
    },
  },
  plugins: [],
};
