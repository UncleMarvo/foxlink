// import type { Config } from 'tailwindcss'

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light mode palette
        'light-bg': '#F3F3E0',
        'light-primary': '#27548A',
        'light-secondary': '#183B4E',
        'light-accent': '#DDA853',
        // Dark mode palette
        'dark-bg': '#092635',
        'dark-primary': '#1B4242',
        'dark-secondary': '#5C8374',
        'dark-accent': '#9EC8B9',
      },
    },
  },
  safelist: [
    'bg-light-primary', 'text-light-bg', 'bg-dark-primary', 'text-dark-bg',
    'bg-light-secondary', 'bg-dark-secondary',
    'bg-light-accent', 'bg-dark-accent',
    'text-light-primary', 'text-dark-primary',
    'text-light-secondary', 'text-dark-secondary',
    'text-light-accent', 'text-dark-accent'
  ],
  plugins: [],
};
