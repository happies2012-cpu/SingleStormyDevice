import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext.jsx';

const orbs = [
  {
    className: 'top-[-20%] left-[-10%] w-[700px] h-[700px]',
    lightColor: 'rgba(99,102,241,0.25)',
    darkColor: 'rgba(99,102,241,0.18)',
    animate: {
      x: [0, 80, -40, 0],
      y: [0, -60, 80, 0],
      scale: [1, 1.1, 0.9, 1],
    },
    duration: 22,
  },
  {
    className: 'bottom-[-20%] right-[-10%] w-[600px] h-[600px]',
    lightColor: 'rgba(236,72,153,0.2)',
    darkColor: 'rgba(236,72,153,0.15)',
    animate: {
      x: [0, -100, 60, 0],
      y: [0, 80, -60, 0],
      scale: [1, 0.85, 1.15, 1],
    },
    duration: 28,
  },
  {
    className: 'top-[40%] left-[40%] w-[500px] h-[500px]',
    lightColor: 'rgba(14,165,233,0.15)',
    darkColor: 'rgba(14,165,233,0.12)',
    animate: {
      x: [0, 60, -80, 0],
      y: [0, -100, 40, 0],
      scale: [1, 1.2, 0.8, 1],
    },
    duration: 32,
  },
  {
    className: 'top-[20%] right-[15%] w-[400px] h-[400px]',
    lightColor: 'rgba(245,158,11,0.12)',
    darkColor: 'rgba(245,158,11,0.08)',
    animate: {
      x: [0, -50, 70, 0],
      y: [0, 70, -50, 0],
      scale: [1, 1.05, 0.95, 1],
    },
    duration: 18,
  },
];

export const AnimatedBackground = ({ intensity = 1 }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {/* Base gradient */}
      <div className={`absolute inset-0 transition-colors duration-700 ${
        isDark
          ? 'bg-gradient-to-br from-[#020208] via-[#0a0a1a] to-[#000510]'
          : 'bg-gradient-to-br from-[#f0f4ff] via-[#fafbff] to-[#eef2ff]'
      }`} />

      {/* Animated gradient orbs */}
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-[80px] ${orb.className}`}
          style={{
            background: isDark ? orb.darkColor : orb.lightColor,
            opacity: intensity,
          }}
          animate={orb.animate}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(${isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'} 1px, transparent 1px),
            linear-gradient(90deg, ${isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'} 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Scan line (dark mode only) */}
      {isDark && (
        <motion.div
          className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent"
          animate={{ y: ['-100vh', '100vh'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear', repeatDelay: 4 }}
        />
      )}

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px',
        }}
      />
    </div>
  );
};
