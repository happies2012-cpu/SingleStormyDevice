import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { useTheme } from '../contexts/ThemeContext.jsx';

export const GlassButton = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  loading = false,
  disabled = false,
  onClick,
  className = '',
  type = 'button',
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const sizes = {
    sm: 'px-4 py-2 text-xs gap-1.5',
    md: 'px-6 py-3 text-sm gap-2',
    lg: 'px-8 py-4 text-base gap-2.5',
    xl: 'px-10 py-5 text-lg gap-3',
  };

  const variants = {
    primary: clsx(
      'bg-gradient-to-r from-indigo-600 to-violet-600',
      'hover:from-indigo-500 hover:to-violet-500',
      'border border-indigo-500/30',
      'text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40',
    ),
    secondary: clsx(
      isDark
        ? 'bg-white/[0.06] border-white/[0.12] text-white/90 hover:bg-white/[0.12] hover:border-white/[0.2]'
        : 'bg-black/[0.04] border-black/[0.1] text-black/80 hover:bg-black/[0.08] hover:border-black/[0.15]',
      'border backdrop-blur-xl',
    ),
    ghost: clsx(
      isDark
        ? 'text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10'
        : 'text-indigo-600 hover:text-indigo-700 hover:bg-indigo-500/10',
      'border border-transparent hover:border-indigo-500/20',
    ),
    danger: 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 border border-red-500/30 text-white',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      className={clsx(
        'relative inline-flex items-center justify-center font-semibold rounded-xl',
        'transition-all duration-200 select-none',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        sizes[size],
        variants[variant],
        className
      )}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
        </svg>
      )}
      {!loading && icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      {!loading && iconRight && <span className="flex-shrink-0">{iconRight}</span>}
    </motion.button>
  );
};
