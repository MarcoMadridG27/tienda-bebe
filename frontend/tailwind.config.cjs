/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        base: '#FFFFFF',
        mint: '#C8E6C9',
        pink: '#F8BBD0',
        blue: '#BBDEFB',
        lavender: '#E1BEE7',
        graylight: '#E0E0E0',
        text: '#333333',
      },
    },
  },
  plugins: [],
};
