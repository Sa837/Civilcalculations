import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-poppins)', 'Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Light Mode Colors
        background: {
          DEFAULT: '#F8F9FA',
          dark: '#121212',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          dark: '#1E1E1E',
        },
        heading: {
          DEFAULT: '#212529',
          dark: '#F1F3F5',
        },
        body: {
          DEFAULT: '#343A40',
          dark: '#CED4DA',
        },
        primary: {
          DEFAULT: '#2C7BE5',
          dark: '#4DABF7',
        },
        secondary: {
          DEFAULT: '#00B894',
          dark: '#51CF66',
        },
        error: {
          DEFAULT: '#E03131',
          dark: '#FF6B6B',
        },
        accent: {
          DEFAULT: "#2C7BE5",
          foreground: "#ffffff",
        },
      },
      boxShadow: {
        soft: "0 4px 20px rgba(0,0,0,0.08)",
        card: "0 2px 12px rgba(0,0,0,0.06)",
        hover: "0 8px 30px rgba(0,0,0,0.12)",
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '20px',
      },
      backgroundImage: {
        'grid-slate':
          'linear-gradient(to right, rgba(100,116,139,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(100,116,139,0.08) 1px, transparent 1px)'
      },
      backgroundSize: {
        'grid-16': '16px 16px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      }
    },
  },
  plugins: [],
}

export default config



