/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Minimalist Moss Green Theme - Sinh Thái Thông Minh
        moss: {
          50: '#f8faf8',
          100: '#f0f4f0',
          200: '#e1e8e1',
          300: '#bbc5bb',
          400: '#8f9f8f',
          500: '#5d7a5d',
          600: '#4a6b4a',
          700: '#3d5a3d',
          800: '#2f4a2f',
          900: '#1f3a1f',
        },
        primary: {
          50: '#f8faf8',
          100: '#f0f4f0',
          200: '#e1e8e1',
          300: '#bbc5bb',
          400: '#8f9f8f',
          500: '#5d7a5d',
          600: '#4a6b4a',
          700: '#3d5a3d',
          800: '#2f4a2f',
          900: '#1f3a1f',
        },
        // Simplified gray scale for minimalist design
        gray: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        'vietnamese': ['Inter', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
}
