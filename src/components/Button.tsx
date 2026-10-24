import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export function Button({ children, variant = 'primary', className = '' }: ButtonProps) {
  return (
    <motion.button
      className={`relative px-6 py-3 rounded-xl font-medium text-base overflow-hidden group ${variant === 'primary' ? 'btn-accent' : 'btn-outline'} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
    </motion.button>
  );
}
