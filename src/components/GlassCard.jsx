import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { useTheme } from '../contexts/ThemeContext.jsx';

export const GlassCard = ({
  children,
  className = '',
  hover = false,
  glow = false,
  glowColor = 'indigo',
  padding = 'p-6',
  animate = true,
  delay = 0,
  onClick,
  style,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const glowColors = {
    indigo: 'hover:shadow-glow-purple',
    pink: 'hover:shadow-glow-pink',
    cyan: 'hover:shadow-glow-cyan',
  };

  const card = (
    <div
      onClick={onClick}
      style={style}
      className={clsx(
        'relative rounded-2xl border transition-all duration-300',
        isDark
          ? 'bg-white/[0.04] border-white/[0.08] hover:bg-white/[0.07] hover:border-white/[0.15]'
          : 'bg-white/60 border-white/80 hover:bg-white/80 hover:border-white/90',
        'backdrop-blur-2xl shadow-glass',
        hover && 'cursor-pointer hover:-translate-y-1.5',
        hover && glow && glowColors[glowColor],
        padding,
        className
      )}
    >
      {/* Inner top highlight */}
      <div className={clsx(
        'absolute inset-x-0 top-0 h-px rounded-t-2xl',
        isDark
          ? 'bg-gradient-to-r from-transparent via-white/15 to-transparent'
          : 'bg-gradient-to-r from-transparent via-white/90 to-transparent'
      )} />
      {children}
    </div>
  );

  if (!animate) return card;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={hover ? { scale: 1.01 } : undefined}
    >
      {card}
    </motion.div>
  );
};
