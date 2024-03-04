import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'custom-red': 'rgb(208, 24, 100)',
        'custom-green': '#8b8f8a',
        'custom-blue': '#1d98cc',
        'custom-gray': 'aqua',
        'custom-pink': '#e2187d',
        'custom-purple': '#6d1b7b',
      },
      maxWidth: {
        '800': '800px'
      },
    },
  },
  plugins: [],
};
export default config;
