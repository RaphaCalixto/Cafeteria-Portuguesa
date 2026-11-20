import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        delta: {
          red: "#E70025",
          darkRed: "#9E0212",
          yellow: "#FFD300",
        },
        oak: {
          100: "#D5CFC9",
          200: "#ACA59E",
          300: "#90877E",
          400: "#74695E",
          500: "#594B3E",
          600: "#4A3E33",
          700: "#3B3229",
          800: "#342923",
          900: "#2C251F",
          950: "#231B16",
          1000: "#181818",
        },
        creme: {
          50: "#FCF3ED",
          100: "#F8EAE0",
          200: "#F2DECE",
          300: "#E6CDBC",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      boxShadow: {
        card: "0 20px 40px -15px rgba(24, 18, 14, 0.08)",
        "card-hover": "0 30px 60px -12px rgba(24, 18, 14, 0.16)",
        glow: "0 0 40px -10px rgba(231, 0, 37, 0.3)",
      },
      animation: {
        "float-slow": "float 8s ease-in-out infinite",
        "pulse-subtle": "pulseSubtle 4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.85" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
