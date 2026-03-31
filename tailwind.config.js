/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: {
          light: "#f9fafb",
          dark: "#020617"
        },
        foreground: {
          light: "#020617",
          dark: "#f9fafb"
        },
        primary: {
          DEFAULT: "#6366f1",
          foreground: "#ffffff"
        },
        muted: {
          light: "#e5e7eb",
          dark: "#1f2937"
        }
      },
      boxShadow: {
        soft: "0 18px 45px rgba(15,23,42,0.25)"
      }
    }
  },
  plugins: []
};

