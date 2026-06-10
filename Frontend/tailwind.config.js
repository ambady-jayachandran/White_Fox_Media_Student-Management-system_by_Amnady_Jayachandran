import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#DDE6ED",
          100: "#c8d6df",
          200: "#9DB2BF",
          500: "#526D82",
          600: "#40596d",
          700: "#27374D",
          900: "#1d2a3b",
        },
        midnight: "#27374D",
        foxgreen: {
          50: "#eefbf4",
          100: "#d8f4e4",
          500: "#24a866",
          600: "#168350",
        },
        ink: "#27374D",
      },
      boxShadow: {
        soft: "0 18px 45px -30px rgba(39, 55, 77, 0.55)",
      },
    },
  },
  plugins: [forms],
};
