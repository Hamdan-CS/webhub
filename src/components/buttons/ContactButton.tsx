import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

interface ContactButtonProps {
  className?: string;
  onClick?: () => void;
  isScrolled?: boolean;
}

export function ContactButton({ className = '', onClick, isScrolled }: ContactButtonProps) {
  const { isDarkMode } = useTheme();
  
  return (
    <motion.button
      onClick={onClick}
      className={`
        px-6 py-2.5 
        font-bold text-sm
        rounded-lg
        transition-all duration-300
        ${isScrolled 
          ? isDarkMode
            ? 'bg-white/45 text-[#00FFFF] border border-[#00FFFF]/30' 
            : 'bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/30 shadow-md'
          : isDarkMode
            ? 'bg-white text-black'
            : 'bg-[#3B82F6] text-white shadow-lg'
        }
        ${className}
      `}
      whileHover={{ 
        boxShadow: isDarkMode 
          ? '0 0 20px rgba(0, 255, 255, 0.3)'
          : '0 0 20px rgba(59, 130, 246, 0.3)',
        textShadow: isScrolled && isDarkMode ? '0 0 8px rgba(0, 255, 255, 0.5)' : 'none',
        scale: 1.02 
      }}
      whileTap={{ scale: 0.98 }}
    >
      Contact Us
    </motion.button>
  );
}