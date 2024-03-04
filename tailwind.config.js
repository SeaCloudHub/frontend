/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      zIndex: {
        navbar: '1498',
        sidebar: '1499',
      },
    },
  },
  plugins: [],
};
