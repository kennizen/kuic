import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "selector",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      height: {
        "navbar-height": "var(--navbar-height)",
      },
      boxShadow: {
        "70": "rgba(17, 17, 26, 0.1) 0px 0px 16px;",
      },
    },
  },
  plugins: [],
};
export default config;
