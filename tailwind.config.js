/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'primary-text': '#2C3E50',
        'background-main': '#F8F5F2',
        'background-card': '#FFFFFF',
        'accent-primary': '#E87A5D',
        'accent-secondary': '#A9A9A9',
        'highlight-calm': '#77ACA2',
        // Keeping old colors in case they are referenced elsewhere or for quick revert, can be cleaned up later.
        'prussian-blue': '#0C2D48',
        'timberwolf': '#D9CDC2',
        'linen': '#FFF6EC',
        'buff': '#DBAD75',
        'persian-orange': '#D08968',
        'rosy-brown': '#B88C84',
        'moss-green': '#8A9A5B',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 