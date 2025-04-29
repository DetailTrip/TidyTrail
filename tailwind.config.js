/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tidy: {
          green: '#3F7D20',    // Spruce Green → Main brand color
          blue: '#1B3A4B',     // Deep Ocean → Dark text color
          gold: '#E8AA4C',     // Harvest Gold → CTA accent color
          mist: '#EEF5F2',     // Mint Mist → Backgrounds
          slate: '#1F2937',    // Night Slate → Optional dark footer
        },
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
