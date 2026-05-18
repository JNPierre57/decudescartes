/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        hud: '#f7941d',
        spaceBlue: '#5fb2ff',
        offwhite: '#f6f3eb',
        deep: '#030408'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        hud: '0 0 0 1px rgba(247,148,29,0.4), 0 10px 40px rgba(3,4,8,0.6)'
      }
    }
  },
  plugins: []
};
