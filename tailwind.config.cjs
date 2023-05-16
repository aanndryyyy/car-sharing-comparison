/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        gray: colors.gray,
        green: {
          DEFAULT: "#60B941",
          light: "#7AD959"
        }
      },
    }
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}