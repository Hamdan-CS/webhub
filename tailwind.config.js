/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        rubik: ['Rubik', 'sans-serif'],
      },
      colors: {
        // Semantic tokens mapped to CSS variables
        bg: 'var(--color-bg)',
        'bg-surface': 'var(--color-bg-surface)',
        'bg-elevated': 'var(--color-bg-elevated)',
        accent: {
          DEFAULT: 'var(--color-accent)',
          light: 'var(--color-accent-light)',
        },
        'accent-2': {
          DEFAULT: 'var(--color-accent-2)',
          light: 'var(--color-accent-2-light)',
        },
        text: {
          DEFAULT: 'var(--color-text)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
        },
        border: 'var(--color-border)',
        'border-strong': 'var(--color-border-strong)',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        elevated: 'var(--shadow-elevated)',
        glow: '0 0 30px var(--glow-primary)',
        'glow-2': '0 0 30px var(--glow-secondary)',
      },
      borderRadius: {
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      animation: {
        'float-3d': 'float-3d 6s ease-in-out infinite',
        'rotate-3d': 'rotate-3d 20s linear infinite',
      },
    },
  },
  plugins: [],
};
