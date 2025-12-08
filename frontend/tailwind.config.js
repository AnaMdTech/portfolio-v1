/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a", // Deep Black
        surface: "#121212", // Slightly lighter black
        primary: "#00f3ff", // Neon Cyan
        secondary: "#bd00ff", // Neon Purple
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};
