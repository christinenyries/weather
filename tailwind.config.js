/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'weather-primary': '#e9edc9',
        'weather-primary-focus': '#ccd5ae',
        'weather-primary-content': '#fefae0',
        'weather-secondary': '#faedcd',
        'weather-secondary-focus': '#d4a373'
      }
    },
    fontFamily: {
      Roboto: ['Roboto', 'sans-serif']
    },
    container: {
      padding: '2rem',
      center: true
    },
    screens: {
      sm: '640px',
      md: '768px'
    }
  },
  plugins: []
}
