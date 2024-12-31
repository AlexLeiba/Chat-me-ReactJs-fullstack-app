import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '640px', // Small screens (default)
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      // colors: {
      //   background: 'var(--background)',
      //   foreground: 'var(--foreground)',
      // },
    },
    fontSize: {
      // Headings
      // h1 / display-xl desktop
      '9xl': ['52px', { lineHeight: '64px', fontWeight: 500 }],
      // h1 display-mobile
      '7xl': ['36px', { lineHeight: '48px', fontWeight: 500 }],
      // h2 / display-lg desktop
      '8xl': ['44px', { lineHeight: '54px', fontWeight: 500 }],
      // h2 mobile
      '6xl': ['32px', { lineHeight: '42px', fontWeight: 500 }],
      // h3 / display-md desktop
      '5xl': ['36px', { lineHeight: '48px', fontWeight: 500 }],
      // h3 mobile
      '4xl': ['28px', { lineHeight: '38px', fontWeight: 500 }],
      // h4 / display-sm desktop
      '3xl': ['28px', { lineHeight: '38px', fontWeight: 500 }],
      // h4 mobile
      '2xl': ['24px', { lineHeight: '32px', fontWeight: 500 }],
      // h5 / display-xs desktop

      // Paragraphs
      xl: ['20px', { lineHeight: '30px' }],
      l: ['18px', { lineHeight: '28px' }],
      base: ['14px', { lineHeight: '22px' }],
      s: ['14px', { lineHeight: '22px' }],
      xs: ['12px', { lineHeight: '18px' }],
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      'light',
      'dark',
      'cupcake',
      'bumblebee',
      'emerald',
      'corporate',
      'synthwave',
      'retro',
      'cyberpunk',
      'valentine',
      'halloween',
      'garden',
      'forest',
      'aqua',
      'lofi',
      'pastel',
      'fantasy',
      'wireframe',
      'black',
      'luxury',
      'dracula',
      'cmyk',
      'autumn',
      'business',
      'acid',
      'lemonade',
      'night',
      'coffee',
      'winter',
      'dim',
      'nord',
      'sunset',
    ],
  },
} satisfies Config;
