import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        PRIMARY: "#DEEDED",
        SECONDARY: "#2E3156",
        TERTIARY: "#C9DDE2",
        NORMAL: "#DDCBD0",
        FIGHTING: "#FCC1B0",
        FLYING: "#B2D2E8",
        POISON: "#CFB7ED",
        GROUND: "#F4D1A6",
        ROCK: "#C5AEA8",
        BUG: "#C1E0C8",
        GHOST: "#D7C2D7",
        STEEL: "#C2D4CE",
        FIRE: "#EDC2C4",
        WATER: "#CBD5ED",
        GRASS: "#C0D4C8",
        ELECTRIC: "#E2E2A0",
        PSYCHIC: "#DDC0CF",
        ICE: "#C7D7DF",
        DRAGON: "#CADCDF",
        DARK: "#C6C5E3",
        FAIRY: "#E4C0CF",
        UNKNOWN: "#C0DFDD",
        SHADOW: "#CACACA",
        BORDERCARD:"#7c83a1",
        PASTELBLUE:'#b0d2d2',
        BLUEGREY:'#93b2b2',
        DROPDOWNCOLOR:'#c9dde2'
      },
    },
  },
  plugins: [],
};
export default config;
