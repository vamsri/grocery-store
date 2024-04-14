/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  content: [],
  theme: {
    extend: {
      height: {
        '100': "100px",
        '240': '240px',  // Custom height for 100px
        '360': '360px',  // Custom height for 140px
        '480': '480px',  // Custom height for 160px
        '540': '540px',   // Custom height for 180px
        '640': '640px',
        '800': '800px',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};