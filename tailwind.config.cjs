/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: 'class',
  content: [
    './src/assets/**/*.{html,js,jsx,tx,tsx}',
    './src/components/**/*.{vue,js}',
    './src/App.vue',
  ],
  theme: {
    fontFamily: {
      'body': ['Jetbrains Mono', 'monospace'],
      'h1': ['Fieldwork Black', 'sans-serif'],
      'hf': ['Fieldwork Bold', 'sans-serif'],
    },
    extend: {
      colors: {
        'clr-800': '#161B21',
        'clr-600': '#212933',
        'clr-400': '#455364',
        'clr-200': '#9EA7B3',
        'clr-100': '#DDE4EC',
        'clr-blue': '#00A7AF',
        'clr-orange': '#FF5850',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    // require("@tailwindcss/forms"),
    // require("@tailwindcss/typography"),
    // require("@tailwindcss/line-clamp"),
  ],
}
