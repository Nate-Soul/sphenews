/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding:{
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      }
    },
    extend: {
      colors: {
        'main': '#41e6e6',
        'main-200': '#b9e7e7',
        'main-700': '#40c5c5',
        'secondary': '#fddebd',
        'secondary-700': '#fccda1',
      },
      boxShadow: {
        'custom': '0 0 4px 0 rgba(65, 230, 230, .60)',
      },
      zIndex: {
        'lg': '9999',
        'xl': '99999',
        '2xl': '999999',
      },
      screens: {
        'xs': '360px',
      },
    },
  },
  plugins: [],
}
