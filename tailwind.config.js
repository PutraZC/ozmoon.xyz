/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        zekken: {
          obsidian: '#242424',
          tunic: '#6c16c7',
          hair: '#320a5c',
          skin: '#fefafa',
        },
        rosario: {
          light: '#ffbefa',
          base: '#fda1e1',
          deep: '#ff3fa9',
          critical: '#c03a3a',
        },
        sao: {
          glass: 'rgba(255, 255, 255, 0.1)',
          border: 'rgba(255, 255, 255, 0.3)',
          warning: '#de7e00',
        }
      },
      fontFamily: {
        header: ['Futura PT', 'Jost', 'Spartan', 'sans-serif'],
        body: ['Inter', 'DM Sans', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}