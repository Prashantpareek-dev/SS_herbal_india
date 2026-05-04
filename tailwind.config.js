/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4CAF50',
          dark: '#2D7A3E',
          light: '#E8F5E9',
        },
        secondary: {
          DEFAULT: '#2196F3',
          dark: '#1976D2',
          light: '#E3F2FD',
        },
        accent: {
          DEFAULT: '#FF9800',
          dark: '#F57C00',
        }
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0,0,0,0.1)',
        'card-hover': '0 8px 16px rgba(0,0,0,0.15)',
      }
    },
  },
  plugins: [],
}
