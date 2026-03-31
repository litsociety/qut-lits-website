/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: { 
    extend: {
      fontFamily: {
        'rubik': ['Rubik', 'sans-serif'],
        'tomorrow': ['Tomorrow', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translate3d(0, 0, 0)' },
          '100%': { transform: 'translate3d(-50%, 0, 0)' },
        },
      },
      animation: {
        marquee: 'marquee 24s linear infinite',
      },
      colors: {
        'primary': '#c8c8c8',
        'secondary': '#888888',
        'dark-blue': '#0a0a0a',
        'dark-purple': '#161616',
        'purple': '#666666',
        'pink': '#999999',
        'orange': '#cccccc',
        'emerald': '#aaaaaa',
        'ruby': '#888888',
        'sapphire': '#aaaaaa',
      }
    } 
  },
  plugins: [],
}
