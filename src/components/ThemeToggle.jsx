import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext.jsx';
import { clsx } from 'clsx';

export const ThemeToggle = ({ className = '' }) => {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={clsx(
        'relative flex items-center gap-2 px-4 py-2.5 rounded-xl',
        'border transition-all duration-300 font-medium text-sm',
        isDark
          ? 'bg-white/[0.06] border-white/[0.12] text-white/80 hover:bg-white/[0.1] hover:border-white/[0.2]'
          : 'bg-black/[0.05] border-black/[0.1] text-black/70 hover:bg-black/[0.08] hover:border-black/[0.15]',
        'backdrop-blur-xl shadow-glass',
        className
      )}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.2 }}
        >
          {isDark
            ? <Sun size={15} className="text-amber-400" />
            : <Moon size={15} className="text-indigo-600" />
          }
        </motion.div>
      </AnimatePresence>
      <span>{isDark ? 'LIGHT MODE' : 'DARK MODE'}</span>
    </motion.button>
  );
};
