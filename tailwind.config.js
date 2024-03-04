/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      zIndex: {
        navbar: '2000',
        sidebar: '3000',
      },
    },
  },
  plugins: [],
};
