import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        black: '#0f0e0b',
        'pure-black': '#000000',
        white: '#f9f9f0',
        'pure-white': '#ffffff',
        blue: '#badbee',
        coal: '#21201c',
        cream: '#efecca',
        mint: '#d5fad3',
        ash: '#3d3b34',
        tan: '#9d937c',
      },
      fontFamily: {
        season: ['Season Serif', 'Georgia', 'serif'],
        akkurat: ['Akkurat Mono', 'monospace'],
        dopis: ['Dopis Light', 'sans-serif'],
      },
      fontSize: {
        'display-hero': ['120px', { lineHeight: '114px', letterSpacing: '-3.6px' }],
        'display-large': ['90px', { lineHeight: '85.5px', letterSpacing: '-1.8px' }],
        'display-medium': ['55px', { lineHeight: '55px', letterSpacing: '-1.1px' }],
      },
      borderRadius: {
        pill: '9999px',
        sharp: '0px',
      },
      spacing: {
        '1': '5px',
        '2': '10px',
        '3': '15px',
        '4': '20px',
        '5': '25px',
        '6': '30px',
        '7': '40px',
        '8': '45px',
        '9': '50px',
        '10': '60px',
        '11': '120px',
        '12': '150px',
        '13': '180px',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'ticker': 'ticker 30s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
