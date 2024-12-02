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
        bluePrincipal: "#0f7c9b"
      },
      animation:{
        pulsar: 'pulsar 3s ease-in-out infinite',
      },
      keyframes: {
        pulsar: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}

