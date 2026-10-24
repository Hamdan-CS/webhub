import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface ScrollIndicatorProps { onClick?: () => void; }

export function ScrollIndicator({ onClick }: ScrollIndicatorProps) {
  const [showIndicator, setShowIndicator] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = Math.min((currentScroll / totalHeight) * 100, 100);
      setScrollProgress(progress);
      setShowIndicator(currentScroll > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const accent = isDarkMode ? 'var(--color-accent-light)' : 'var(--color-accent)';
  const trackBg = isDarkMode ? 'rgba(17, 24, 39, 0.6)' : 'rgba(241, 244, 249, 0.8)';

  return (
    <AnimatePresence>
      {showIndicator && (
        <motion.div className="fixed right-2 top-1/2 transform -translate-y-1/2 z-40 cursor-pointer" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} transition={{ duration: 0.5 }} onClick={onClick}>
          <div className="relative">
            <div className="w-2 h-32 rounded-full border relative" style={{ background: trackBg, borderColor: 'var(--color-border-strong)' }}>
              <motion.div className="absolute top-0 left-0 w-2 rounded-full transition-all duration-300 ease-out" style={{ height: `${scrollProgress}%`, background: `linear-gradient(to bottom, var(--color-accent), var(--color-accent-2))`, boxShadow: '0 0 12px var(--glow-primary)' }} />
            </div>
            <motion.div className="relative mt-4" animate={{ y: scrollProgress < 95 ? [0, -8, 0] : 0 }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
              <motion.div className="relative w-12 h-12 rounded-full flex items-center justify-center glass-card" style={{ borderColor: 'var(--color-border-strong)' }} whileHover={{ scale: 1.2, boxShadow: '0 0 30px var(--glow-primary)' }} whileTap={{ scale: 0.9 }}>
                <motion.div animate={{ y: scrollProgress < 95 ? [0, 2, 0] : 0, rotate: scrollProgress >= 95 ? 180 : 0 }} transition={{ duration: scrollProgress < 95 ? 1.5 : 0.3, repeat: scrollProgress < 95 ? Infinity : 0, ease: 'easeInOut' }}>
                  <ChevronDown className="w-6 h-6 relative z-10" style={{ color: accent }} />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
