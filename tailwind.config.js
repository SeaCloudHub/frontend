/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        '4em': '4em',
        '3em': '3em',
        '3.5em': '3.5em',
        '1.5em': '1.5em',
        '2em': '2em',
        '1.17em': '1.17em',
        '1em': '1em',
        '0.83em': '0.83em',
        '0.67em': '0.67em',
      },
      zIndex: {
        navbar: '1498',
        sidebar: '1499',
      },
    },
  },
  plugins: [],
};
