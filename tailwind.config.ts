// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Editorial theme palette (values live in app/globals.css)
        ed: {
          bg: 'rgb(var(--ed-bg) / <alpha-value>)',
          surface: 'rgb(var(--ed-surface) / <alpha-value>)',
          line: 'rgb(var(--ed-line) / <alpha-value>)',
          text: 'rgb(var(--ed-text) / <alpha-value>)',
          muted: 'rgb(var(--ed-muted) / <alpha-value>)',
          accent: 'rgb(var(--ed-accent) / <alpha-value>)',
          ink: 'rgb(var(--ed-accent-ink) / <alpha-value>)',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
