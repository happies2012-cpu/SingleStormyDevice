/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        glass: {
          light: 'rgba(255,255,255,0.08)',
          dark: 'rgba(0,0,0,0.2)',
          border: 'rgba(255,255,255,0.15)',
          'border-dark': 'rgba(255,255,255,0.06)',
        },
      },
      backgroundImage: {
        'mesh-1': 'radial-gradient(ellipse at top left, #6366f1 0%, transparent 50%)',
        'mesh-2': 'radial-gradient(ellipse at bottom right, #ec4899 0%, transparent 50%)',
        'mesh-3': 'radial-gradient(ellipse at center, #0ea5e9 0%, transparent 60%)',
      },
      backdropBlur: {
        xs: '2px',
        '4xl': '72px',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
        'glass-hover': '0 16px 48px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.15)',
        'glow-purple': '0 0 40px rgba(99,102,241,0.5)',
        'glow-pink': '0 0 40px rgba(236,72,153,0.5)',
        'glow-cyan': '0 0 40px rgba(14,165,233,0.5)',
      },
      animation: {
        'orb-1': 'orb1 20s ease-in-out infinite',
        'orb-2': 'orb2 25s ease-in-out infinite',
        'orb-3': 'orb3 30s ease-in-out infinite',
        'scan-line': 'scanLine 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'typing': 'typing 2s steps(20) forwards',
      },
      keyframes: {
        orb1: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(80px, -60px) scale(1.1)' },
          '66%': { transform: 'translate(-40px, 80px) scale(0.9)' },
        },
        orb2: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(-100px, -80px) scale(1.2)' },
        },
        orb3: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(60px, 100px) scale(0.8)' },
          '75%': { transform: 'translate(-80px, -40px) scale(1.1)' },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)', opacity: 0 },
          '10%': { opacity: 1 },
          '90%': { opacity: 1 },
          '100%': { transform: 'translateY(100vh)', opacity: 0 },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(99,102,241,0.3)' },
          '50%': { boxShadow: '0 0 60px rgba(99,102,241,0.7)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
};
