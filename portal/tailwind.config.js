/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-teal': {
          DEFAULT: '#09282B',
          light: '#0F3A3F',
          soft: '#14494E',
        },
        'off-white': '#F8F6F7',
        'lime': {
          DEFAULT: '#D7F264',
          dark: '#C0E046',
        },
        'light-green': '#DFEFC5',
        'soft-green': '#EDF5DC',
      },
      fontFamily: {
        serif: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        display: ['"moret-variable"', '"Moret"', 'Georgia', 'serif'],
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
      },
      fontSize: {
        hero: ['clamp(3rem, 8vw, 6rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        h2: ['clamp(2rem, 4.5vw, 3rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'lime-glow': '0 12px 40px -8px rgba(215, 242, 100, 0.4)',
        card: '0 8px 30px rgba(9, 40, 43, 0.08)',
        'card-lg': '0 20px 60px rgba(9, 40, 43, 0.12)',
      },
      // ── MOTION TOKENS (a "design system" do movimento — ver MOTION-PLAYBOOK §1) ──
      // Curvas-assinatura da casa. Use SEMPRE estas (ex.: `ease-out-expo`) em vez
      // de `transition-all`/`ease` default ou béziers soltos espalhados pelo código.
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)', // ASSINATURA: reveals, entradas
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)', // entrada contida (hover/foco)
        'in-out-quart': 'cubic-bezier(0.76, 0, 0.24, 1)', // movimento A→B, painéis
        'in-quart': 'cubic-bezier(0.5, 0, 0.75, 0)', // saídas (exit)
      },
      // Durações nomeadas dos tokens (fast/base/slow/cinematic).
      transitionDuration: {
        instant: '100ms',
        fast: '180ms',
        base: '280ms',
        slow: '450ms',
        cinematic: '700ms',
      },
      animation: {
        'petal-float': 'petalFloat 15s ease-in-out infinite',
      },
      keyframes: {
        petalFloat: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '50%': { transform: 'translate(10px, -20px) rotate(15deg)' },
        },
      },
    },
  },
  plugins: [],
}
