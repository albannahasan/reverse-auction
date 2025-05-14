import { nextui } from "@nextui-org/theme";
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#e5771e",
        secondary: "#f4a127",
        darkPrimary: "#d34f1f", // Custom dark mode primary color
        darkSecondary: "#e69234", // Custom dark mode secondary color
        grey: {
          50: "#F7F7F7", // Light grey
          100: "#E1E1E1", // Light grey
          200: "#D0D0D5", // Grey that would be used for lighter text
          300: "#A8A8A8", // More neutral light grey
          400: "#6D6D6D", // A bit darker
          500: "#3A3A3A", // A mid-tone grey for text
          600: "#1F1F1F", // Dark grey for headings or strong text
        },
      },
      boxShadow: {
        soft: "0 8px 20px rgba(0, 0, 0, 0.15)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [nextui()],
};
export default config;
