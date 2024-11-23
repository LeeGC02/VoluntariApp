/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        beige: "rgb(250, 246, 240)", 
        orangePrincipal: "#e8402a",
      },
    },
  },
  plugins: [],
}

