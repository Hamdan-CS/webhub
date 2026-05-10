import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface ScrollIndicatorProps {
  onClick?: () => void;
}

export function ScrollIndicator({ onClick }: ScrollIndicatorProps) {
  const [showIndicator, setShowIndicator] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      // Calculate total scrollable height
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      
      // Calculate scroll progress as percentage
      const progress = Math.min((currentScroll / totalHeight) * 100, 100);
      setScrollProgress(progress);
      
      // Show indicator after scrolling past the first page (hero section)
      const heroHeight = window.innerHeight;
      setShowIndicator(currentScroll > heroHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll);
    // Initial calculation
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const colors = isDarkMode ? {
    primary: '#00F5FF',
    secondary: '#40E0D0',
    background: '#0D0B1F',
    track: 'rgba(13, 11, 31, 0.6)',
    glow: 'rgba(0, 245, 255, 0.3)',
    glowHover: 'rgba(0, 245, 255, 0.6)'
  } : {
    primary: '#3B82F6',
    secondary: '#60A5FA',
    background: '#FFFFFF',
    track: 'rgba(243, 244, 246, 0.8)',
    glow: 'rgba(59, 130, 246, 0.3)',
    glowHover: 'rgba(59, 130, 246, 0.6)'
  };

  return (
    <AnimatePresence>
      {showIndicator && (
        <motion.div
          className="fixed right-2 top-1/2 transform -translate-y-1/2 z-40 cursor-pointer"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.5 }}
          onClick={onClick}
        >
          {/* Enhanced 3D Vertical scroll track */}
          <div className="relative">
            {/* 3D Background track with depth */}
            <div 
              className="w-2 h-32 rounded-full border relative"
              style={{
                background: `linear-gradient(135deg, ${colors.track}, ${colors.background})`,
                borderColor: `${colors.primary}20`,
                boxShadow: `
                  inset 2px 2px 4px rgba(0, 0, 0, 0.2),
                  inset -2px -2px 4px rgba(255, 255, 255, 0.1),
                  0 0 10px ${colors.glow}
                `
              }}
            >
              {/* Inner highlight for 3D effect */}
              <div 
                className="absolute inset-0 w-1 h-full rounded-full ml-0.5"
                style={{
                  background: `linear-gradient(90deg, rgba(255, 255, 255, 0.2), transparent)`
                }}
              />
            </div>
            
            {/* Real-time scroll progress indicator */}
            <motion.div
              className="absolute top-0 left-0 w-2 rounded-full transition-all duration-300 ease-out"
              style={{
                height: `${scrollProgress}%`,
                background: `linear-gradient(to bottom, ${colors.primary}, ${colors.secondary})`,
                boxShadow: `
                  0 0 15px ${colors.glow},
                  inset 1px 1px 2px rgba(255, 255, 255, 0.3),
                  inset -1px -1px 2px rgba(0, 0, 0, 0.2)
                `
              }}
            />
            
            {/* Progress indicator tip with pulsing effect */}
            <motion.div
              className="absolute left-0 w-2 h-1 rounded-full"
              style={{
                top: `${Math.min(scrollProgress, 96)}%`,
                background: `radial-gradient(circle, ${colors.primary}, ${colors.secondary})`,
                boxShadow: `
                  0 0 20px ${colors.glowHover},
                  0 0 10px ${colors.primary}
                `
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Enhanced glowing effect with 3D depth */}
            <motion.div
              className="absolute inset-0 w-2 rounded-full blur-sm"
              style={{
                height: `${scrollProgress}%`,
                background: `linear-gradient(to bottom, ${colors.glow}, ${colors.glowHover})`,
              }}
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Floating particles that follow scroll progress */}
            <div className="absolute inset-0 pointer-events-none">
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  className="absolute w-1 h-1 rounded-full"
                  style={{
                    backgroundColor: colors.primary,
                    left: `${-10 + index * 8}px`,
                    top: `${Math.min(scrollProgress + (index * 5), 95)}%`,
                    boxShadow: `0 0 6px ${colors.glow}`,
                    opacity: scrollProgress > (index * 20) ? 1 : 0.3
                  }}
                  animate={{
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: index * 0.4,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </div>

          {/* Enhanced 3D Scroll button at bottom */}
          <motion.div
            className="relative mt-4"
            animate={{
              y: scrollProgress < 95 ? [0, -8, 0] : 0,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* 3D Glowing background with depth */}
            <motion.div
              className="absolute inset-0 rounded-full blur-lg"
              animate={{
                background: [
                  `radial-gradient(circle, ${colors.glow} 0%, transparent 70%)`,
                  `radial-gradient(circle, ${colors.glowHover} 0%, transparent 70%)`,
                  `radial-gradient(circle, ${colors.glow} 0%, transparent 70%)`,
                ],
                scale: [1, 1.4, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Enhanced 3D main button */}
            <motion.div
              className="relative w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm"
              style={{
                background: `linear-gradient(135deg, ${colors.background}, ${colors.track})`,
                border: `2px solid ${colors.primary}40`,
                boxShadow: `
                  0 0 25px ${colors.glow},
                  inset 2px 2px 4px rgba(255, 255, 255, 0.2),
                  inset -2px -2px 4px rgba(0, 0, 0, 0.2),
                  0 4px 8px rgba(0, 0, 0, 0.3)
                `
              }}
              whileHover={{ 
                scale: 1.2,
                boxShadow: `
                  0 0 35px ${colors.glowHover},
                  inset 2px 2px 6px rgba(255, 255, 255, 0.3),
                  inset -2px -2px 6px rgba(0, 0, 0, 0.3),
                  0 6px 12px rgba(0, 0, 0, 0.4)
                `,
                borderColor: `${colors.primary}90`
              }}
              whileTap={{ scale: 0.9 }}
            >
              {/* Inner highlight for 3D button effect */}
              <div 
                className="absolute inset-1 rounded-full"
                style={{
                  background: `linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent 50%)`
                }}
              />
              
              <motion.div
                animate={{
                  y: scrollProgress < 95 ? [0, 2, 0] : 0,
                  rotate: scrollProgress >= 95 ? 180 : 0
                }}
                transition={{
                  duration: scrollProgress < 95 ? 1.5 : 0.3,
                  repeat: scrollProgress < 95 ? Infinity : 0,
                  ease: "easeInOut"
                }}
              >
                <ChevronDown 
                  className="w-6 h-6 relative z-10" 
                  style={{ 
                    color: colors.primary,
                    filter: `drop-shadow(0 0 4px ${colors.glow})`
                  }} 
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Enhanced floating particles effect around button */}
          <div className="absolute inset-0 pointer-events-none">
            {[0, 1, 2, 3].map((index) => (
              <motion.div
                key={index}
                className="absolute w-1.5 h-1.5 rounded-full"
                style={{
                  backgroundColor: colors.primary,
                  left: `${15 + Math.cos(index * 1.5) * 25}px`,
                  top: `${50 + Math.sin(index * 1.5) * 25}px`,
                  boxShadow: `0 0 8px ${colors.glow}`,
                  opacity: scrollProgress > (index * 25) ? 1 : 0.3
                }}
                animate={{
                  scale: [0.8, 1.2, 0.8],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.5,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}