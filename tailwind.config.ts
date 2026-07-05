import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg:       '#141311',
        raised:   '#1e1d1a',
        card:     '#242320',
        concrete: '#2e2c28',
        accent:   '#d4191b',
        'accent-soft': '#e8413f',
        muted:    '#b8b2a6',
        dim:      '#8f8a80',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body:    ['var(--font-body)', 'sans-serif'],
        mono:    ['var(--font-mono)', 'monospace'],
        arabic:  ['var(--font-arabic)', 'sans-serif'],
      },
      screens: {
        xs: '390px',
      },
    },
  },
  plugins: [],
}
export default config
