import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg:       '#0d0c0a',
        raised:   '#181614',
        card:     '#1f1d1a',
        concrete: '#2b2925',
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
