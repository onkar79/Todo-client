/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        'regal-blue': 'linear-gradient(90deg,#53a8ca,#6bd6ee 26%,#b0e6f1 64%,#d7e8eb 94%);',
        'primary':'rgb(83, 168, 202);'
      },
      boxShadow: {
        'default': 'rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;',
        'header':"rgba(17, 17, 26, 0.1) 0px 3px 3px"
      }
    },
  },
  plugins: [],
}

