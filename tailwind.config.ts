import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#0ea5e9',
          dark: '#0b172a',
          accent: '#c084fc'
        }
      }
    }
  },
  plugins: []
};

export default config;
