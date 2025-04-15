/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-purple': '#4b2e83',
        'primary-gold': '#FCCE5A',
        'accent-purple': '#c5b4e3',
      },
    },
  },
  plugins: [],
};
