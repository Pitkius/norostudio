/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#1A1410",
          soft: "#3D2E24",
          mute: "#7A6556"
        },
        paper: {
          DEFAULT: "#EDE6DC",
          deep: "#E0D5C8",
          raised: "#F5F0E8"
        },
        moss: {
          DEFAULT: "#5C3A24",
          bright: "#7A4B2E",
          pale: "#E8D7C6"
        },
        copper: {
          DEFAULT: "#A05C2E",
          soft: "#C4895A"
        },
        primary: {
          DEFAULT: "#5C3A24",
          foreground: "#F5F0E8"
        },
        muted: {
          light: "#E0D5C8",
          dark: "#3D2E24"
        }
      },
      boxShadow: {
        soft: "0 18px 50px rgba(26, 20, 16, 0.1)"
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      letterSpacing: {
        brand: "-0.03em"
      }
    }
  },
  plugins: []
};
