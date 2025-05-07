// tailwind.config.js
import plugin from 'tailwindcss/plugin'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tidy: {
          green: '#3F7D20',
          blue: '#1B3A4B',
          gold: '#E8AA4C',
          mist: '#EEF5F2',
          slate: '#1F2937',
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

  // ✅ Add this plugin
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.section-spacing': {
          paddingTop: '6rem',
          paddingBottom: '6rem',
        },
      });
    }),
  ],
};
