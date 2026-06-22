import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#eef6ff",
          100: "#d9ebff",
          500: "#1d5ea8",
          700: "#113f7a",
          800: "#0d315f",
          900: "#092243",
          950: "#06172f"
        },
        sand: "#f7f3ec",
        mist: "#f5f8fb",
        saffron: "#d9902f"
      },
      boxShadow: {
        soft: "0 20px 60px rgba(9, 34, 67, 0.08)",
        card: "0 18px 36px rgba(9, 34, 67, 0.10)"
      }
    }
  },
  plugins: []
};

export default config;
