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
        'pulse-ring': {
          '0%, 100%': { boxShadow: '0 8px 20px rgba(0, 0, 0, 0.30), 0 0 0 0 rgba(200, 200, 200, 0)' },
          '50%': { boxShadow: '0 8px 20px rgba(0, 0, 0, 0.30), 0 0 0 8px rgba(200, 200, 200, 0.12)' },
        },
        'gradient-pan': {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        'rise-in': {
          '0%': { transform: 'translateY(12px)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        marquee: 'marquee 24s linear infinite',
        'pulse-ring': 'pulse-ring 2.4s ease-in-out infinite',
        'gradient-pan': 'gradient-pan 3s linear infinite',
        'rise-in': 'rise-in 0.5s ease-out both',
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
