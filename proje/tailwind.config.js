/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: '#334155',
            a: {
              color: '#2563eb',
              '&:hover': {
                color: '#1e40af',
              },
            },
            h1: {
              color: '#1e293b',
            },
            h2: {
              color: '#1e293b',
            },
            pre: {
              backgroundColor: '#f1f5f9',
              color: '#334155',
              fontWeight: '400',
              borderRadius: '0.5rem',
              paddingTop: '1rem',
              paddingRight: '1.5rem',
              paddingBottom: '1rem',
              paddingLeft: '1.5rem',
            },
            code: {
              color: '#6b21a8',
              '&::before': {
                content: '""',
              },
              '&::after': {
                content: '""',
              },
              fontWeight: '400',
              backgroundColor: '#f1f5f9',
              borderRadius: '0.25rem',
              paddingLeft: '0.25rem',
              paddingRight: '0.25rem',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 