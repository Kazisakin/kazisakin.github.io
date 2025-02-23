// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    // If you have any other folders containing .tsx
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config
