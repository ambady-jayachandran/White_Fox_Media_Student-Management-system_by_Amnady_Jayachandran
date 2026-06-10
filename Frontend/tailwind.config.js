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
          50: "#f0f8ff",
          100: "#d9edff",
          200: "#b8ddff",
          500: "#1d7ed8",
          600: "#0f63b8",
          700: "#0b4e91",
          900: "#082f5f",
        },
        foxgreen: {
          50: "#eefbf4",
          100: "#d8f4e4",
          500: "#24a866",
          600: "#168350",
        },
        ink: "#071827",
      },
      boxShadow: {
        soft: "0 14px 35px -24px rgba(8, 47, 95, 0.45)",
      },
    },
  },
  plugins: [forms],
};
