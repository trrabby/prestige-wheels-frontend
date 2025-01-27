/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FD5C70",
        accent: "#27276D",
        third: "#FFF6F7",
        fourth: "#1ABC9C",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
