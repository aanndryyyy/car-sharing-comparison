const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        brand: {
          bolt: '#34D186',
          citybee: '#FF3802',
          elmo: '#215FDF'
          beast: '#000000',
          avis: '#D4002A'
        }
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
};