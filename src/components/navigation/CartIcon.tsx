import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

interface CartIconProps {
  count?: number;
}

export function CartIcon({ count = 0 }: CartIconProps) {
  return (
    <motion.div 
      className="relative cursor-pointer"
      whileHover={{ scale: 1.1 }}
    >
      <ShoppingCart className="w-6 h-6 text-white" />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center 
          bg-[#FFD700] text-[#0D0B1F] text-xs font-bold rounded-full">
          {count}
        </span>
      )}
    </motion.div>
  );
}