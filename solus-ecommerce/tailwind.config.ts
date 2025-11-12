import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#c9a66b',
        background: '#faf8f5',
      },
      letterSpacing: {
        luxury: '0.08em',
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
export default config
