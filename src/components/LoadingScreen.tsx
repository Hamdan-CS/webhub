import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

export function LoadingScreen() {
  const { isDarkMode } = useTheme();
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: isDarkMode ? 'rgba(10,15,28,0.95)' : 'rgba(250,251,252,0.95)' }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} className="text-center">
        <h2 className="font-display text-xl font-bold tracking-widest mb-4 accent-text">INITIALIZING INTERFACE</h2>
        <div className="h-2 w-48 rounded-full overflow-hidden mx-auto" style={{ background: 'var(--color-bg-elevated)' }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(to right, var(--color-accent), var(--color-accent-2))' }}
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 2, ease: 'linear' }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
