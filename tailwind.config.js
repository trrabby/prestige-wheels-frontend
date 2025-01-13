/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F1C40F", // Golden yellow
        accent: "#2C3E50", // Dark blue-gray
        third: "#9B59B6", // Vibrant red
        fourth: "#1ABC9C", // Turquoise
      },
    },
  },
  plugins: [],
};
