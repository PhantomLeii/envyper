const theme = require("@envyper/tailwind-config/tailwind.config");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./*.tsx",
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme,
  plugins: [],
};
