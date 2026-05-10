import React from 'react';
import { motion } from 'framer-motion';
import { colors } from '../constants/colors';

interface CTAButtonProps {
  children: React.ReactNode;
}

export function CTAButton({ children }: CTAButtonProps) {
  return (
    <motion.button
      className="relative group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Outer glow layer */}
      <div className={`absolute inset-0 rounded-lg blur-xl bg-gradient-to-r from-[${colors.primary}]/30 via-[${colors.secondary}]/30 to-[${colors.primary}]/30 group-hover:blur-2xl transition-all duration-300`} />
      
      {/* Inner glow layer */}
      <div className={`absolute inset-0 rounded-lg blur-md bg-gradient-to-r from-[${colors.primary}]/40 via-[${colors.secondary}]/40 to-[${colors.primary}]/40 opacity-75 group-hover:opacity-100 transition-all duration-300`} />
      
      {/* Button content */}
      <div className={`relative px-8 py-4 rounded-lg bg-[${colors.dark}] border border-[${colors.primary}]/30 text-[${colors.primary}] font-medium`}>
        <motion.span
          animate={{
            textShadow: [
              `0 0 8px ${colors.primary}80`,
              `0 0 16px ${colors.primary}40`,
              `0 0 8px ${colors.primary}80`,
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          {children}
        </motion.span>
      </div>
    </motion.button>
  );
}