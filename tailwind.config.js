/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        y: 'inset 0 8px 8px -8px rgb(0 0 0 / 30%), inset 0 -8px 8px -8px rgb(0 0 0 / 30%)',
      },
      borderWidth: {
        1: '1px',
      },
      backgroundColor: {
        green: '#5cb85c',
      },
      textColor: {
        green: '#5cb85c',
      },
      borderColor: {
        green: '#5cb85c',
      },
    },
  },
  plugins: [],
};
