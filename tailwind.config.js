/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#56772A',     // Forest Green
        secondary: '#6D8BA6',   // Steel Blue
        accent: '#FBB13C',      // Golden Yellow
        lightgreen: '#EEF9F3',  // Light Green
        skyblue: '#94C0E9',     // Sky Blue
        offWhite: '#FAFAFA',    // Off-White
      },
      fontFamily: {
        display: ['"Lato"', 'sans-serif'],
        body: ['"Open Sans"', 'sans-serif'],
        accent: ['"Quicksand"', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};