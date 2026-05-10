import React from 'react';
import { motion } from 'framer-motion';
import { colors } from '../../constants/colors';

export function ContactButton() {
  return (
    <motion.button
      className={`px-6 py-2 bg-[${colors.primary}] text-[${colors.dark}] font-bold rounded-full 
        hover:bg-[${colors.secondary}] transition-colors duration-200`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Contact us
    </motion.button>
  );
}