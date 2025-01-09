/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      keyframes: {
        wheelShake: {
          '0%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-10deg)' }, // Gira a la izquierda
          '50%': { transform: 'rotate(10deg)' },  // Gira a la derecha
          '75%': { transform: 'rotate(-5deg)' },  // Regresa un poco a la izquierda
          '100%': { transform: 'rotate(0deg)' },  // Vuelve a su posición original
        },
      },
      animation: {
        wheelShake: 'wheelShake 0.7s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

