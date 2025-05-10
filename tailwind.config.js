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
        // Design token aliases
        primary: '#3F7D20',       // brand green
        secondary: '#1B3A4B',     // brand navy
        accent: '#E8AA4C',        // gold
        background: '#F9FAFB',    // section bg
        muted: '#6B7280',         // subtle text/icons
        sectionAlt: '#F3F4F6',    // soft alt rows
        border: '#E5E7EB',        // card borders
        card: '#FFFFFF',          // white card bg
        highlight: '#FFF8EC',     // soft gold highlight
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
