import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // <— WAJIB untuk toggle manual

  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // scan semua file di src
  ],

  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};

export default config;
