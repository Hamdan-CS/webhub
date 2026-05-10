import React from 'react';
import { Hexagon } from 'lucide-react';
import { motion } from 'framer-motion';
import { colors } from '../../constants/colors';

export function Logo() {
  return (
    <motion.div 
      className="flex items-center gap-2"
      whileHover={{ scale: 1.05 }}
    >
      <Hexagon className={`w-8 h-8 text-[${colors.primary}]`} />
      <span className={`text-xl font-bold bg-gradient-to-r from-[${colors.primary}] to-[${colors.secondary}] bg-clip-text text-transparent`}>
        Calibri
      </span>
    </motion.div>
  );
}