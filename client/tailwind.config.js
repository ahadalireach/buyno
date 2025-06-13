/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        "1000px": "1050px",
        "1100px": "1110px",
        "800px": "800px",
        "1300px": "1300px",
        "400px": "400px",
      },
      animation: {
        "spin-clockwise": "spin-clockwise 1.2s linear infinite",
      },
      keyframes: {
        "spin-clockwise": {
          to: { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
};
