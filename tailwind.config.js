/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "open-sans": ["var(--font-open-sans)", "sans-serif"],
        merriweather: ["var(--font-merriweather)", "serif"],
        "pt-sans": ["var(--font-pt-sans)", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
