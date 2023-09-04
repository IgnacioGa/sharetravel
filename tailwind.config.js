/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./public/assets/**/*.svg",
    "./node_modules/flowbite-react/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
        inter: ["Inter", "sans-serif"]
      },
      colors: {
        "primary-orange": "#FF5722"
      }
    }
  },
  variants: {
    fill: ['hover', 'focus'], // this line does the trick
  },
  plugins: [require("flowbite/plugin")]
};
