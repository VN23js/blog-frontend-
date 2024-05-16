/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],

  theme: {
    extend: {
      lineClamp: {
        7: "7"
      }
    }
  },
  darkMode: "class",
  plugins: [nextui()]
};
