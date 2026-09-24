/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#061B1D', 2: '#09282B' },
        'dark-teal': { DEFAULT: '#09282B', light: '#0F3A3F' },
        'off-white': '#F8F6F7',
        lime: { DEFAULT: '#D7F264', dark: '#C0E046' },
      },
      fontFamily: {
        display: ['"moret-variable"', '"Moret"', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'lime-glow': '0 12px 40px -8px rgba(215, 242, 100, 0.45)',
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        'marquee-fast': 'marquee 7s linear infinite',
        'spin-slow': 'spin 4s linear infinite',
        'bounce-down': 'bounceDown 1.4s ease-in-out infinite',
        'ken-burns': 'kenBurns 24s ease-out forwards',
        'nuvem-lenta': 'nuvemDrift 40s ease-in-out infinite alternate',
        'nuvem-media': 'nuvemDrift 26s ease-in-out infinite alternate-reverse',
        'nuvem-rapida': 'nuvemDrift 18s ease-in-out infinite alternate',
        'pop-heart': 'popHeart 0.9s ease-out forwards',
      },
      keyframes: {
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        bounceDown: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.6' },
          '50%': { transform: 'translateY(8px)', opacity: '1' },
        },
        kenBurns: { '0%': { transform: 'scale(1.12)' }, '100%': { transform: 'scale(1)' } },
        nuvemDrift: {
          '0%': { transform: 'translateX(-2.5%)' },
          '100%': { transform: 'translateX(2.5%)' },
        },
        popHeart: {
          '0%': { transform: 'translate(-50%,-50%) scale(0.3) rotate(-15deg)', opacity: '0' },
          '30%': { transform: 'translate(-50%,-50%) scale(1.15) rotate(-8deg)', opacity: '1' },
          '100%': { transform: 'translate(-50%,-90%) scale(1) rotate(0)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
