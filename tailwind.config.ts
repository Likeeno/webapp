import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          background: '#F1F7FF',
          text: '#2D323D',
          highlight: '#279EFD',
        },
      },
      fontFamily: {
        peyda: ['Peyda', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
