import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0B0B0A',
        charcoal: '#151515',
        moss: '#4F6B3A',
        mossSoft: '#7E8F67',
        ivory: '#E8DDC8',
        fog: '#8A867D',
        line: '#06C755'
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Noto Serif TC', 'serif'],
        sans: ['Inter', 'Noto Sans TC', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        glow: '0 0 80px rgba(126, 143, 103, 0.22)'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
}
export default config
