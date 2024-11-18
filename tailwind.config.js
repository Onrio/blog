/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // or 'media' if you prefer
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      borderColor: {
        'custom-gray-dark': 'hsl(215 27.9% 16.9%)',
        'custom-gray': 'hsl(220 13% 91%)',
      },
      colors: {
        'text-light': 'hsl(229, 10%, 37%)',
      },
    },
  },
  plugins: [],
};
