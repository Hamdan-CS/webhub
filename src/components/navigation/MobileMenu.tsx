import React from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileMenuProps {
  children: React.ReactNode;
}

export function MobileMenu({ children }: MobileMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="lg:hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="text-white p-2"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-0 right-0 bg-[#0D0B1F] border-t border-[#FFD700]/10"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}