import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      colors: {
        surface: "#FAFAF8",
        border: "#E5E3DC",
        muted: "#9C9A94",
        accent: {
          green: "#16A34A",
          red: "#DC2626",
          amber: "#D97706",
          blue: "#2563EB",
        },
      },
    },
  },
  plugins: [],
};

export default config;
