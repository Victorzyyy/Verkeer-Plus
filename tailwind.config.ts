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
        muted:    '#d8d1c4',
        dim:      '#a9a195',
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
