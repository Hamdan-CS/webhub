import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export function Button({ children, variant = 'primary', className = '' }: ButtonProps) {
  const [isHovered, setIsHovered] = React.useState(false);
  
  const baseStyles = "relative px-6 py-3 rounded-lg font-medium text-lg overflow-hidden group";
  
  const variants = {
    primary: "bg-[#0D0B1F] border border-[#00F5FF]/30 text-white",
    secondary: "bg-[#0D0B1F] border border-[#00F5FF]/30 text-white"
  };

  const glowIntensities = {
    default: {
      shadow: '0 0 0px rgba(0, 245, 255, 0)',
      text: '0 0 0px rgba(0, 245, 255, 0)',
      border: 'rgba(0, 245, 255, 0.1)'
    },
    hover: {
      shadow: '0 0 20px rgba(0, 245, 255, 0.3)',
      text: '0 0 8px rgba(0, 245, 255, 0.8)',
      border: 'rgba(0, 245, 255, 0.5)'
    }
  };

  return (
    <motion.button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        boxShadow: isHovered ? glowIntensities.hover.shadow : glowIntensities.default.shadow,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Animated border glow */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        animate={{
          opacity: isHovered ? 1 : 0.3,
          background: `linear-gradient(45deg, ${isHovered ? glowIntensities.hover.border : glowIntensities.default.border}, transparent)`,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Button content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        <motion.span
          animate={{
            textShadow: isHovered ? glowIntensities.hover.text : glowIntensities.default.text,
          }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.span>
      </span>
    </motion.button>
  );
}