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
        accent: "#D78742",
        beige: "#F5F0E8",
        "beige-dark": "#EDE6D6",
        graphite: "#1E1E1E",
        "gray-text": "#5C5C5C",
      },
      fontFamily: {
        mansory: ["var(--font-mansory)", "serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
