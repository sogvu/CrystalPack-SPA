/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          emerald: '#0F5132',
          lightEmerald: '#198754',
          accentRed: '#DC3545',
          lightBg: '#F8F9FA',
          pureWhite: '#FFFFFF',
          textDark: '#1A202C',
          textGray: '#718096',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        premium: '0 8px 30px rgba(0, 0, 0, 0.04)',
        glass: '0 8px 32px 0 rgba(15, 81, 50, 0.08)',
      }
    },
  },
  plugins: [],
}
