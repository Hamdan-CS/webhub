import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface NavItemProps {
  label: string;
  isActive?: boolean;
  hasDropdown?: boolean;
  children?: React.ReactNode;
}

export function NavItem({ label, isActive, hasDropdown, children }: NavItemProps) {
  const [isHovered, setIsHovered] = React.useState(false);

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
    <div className="relative group">
      <motion.div
        className={`flex items-center gap-1 px-4 py-2 rounded-full cursor-pointer
          ${isActive ? 'bg-[#00F5FF]/10 text-[#00F5FF]' : 'text-white'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={{
          boxShadow: isHovered ? glowIntensities.hover.shadow : glowIntensities.default.shadow,
          textShadow: isHovered ? glowIntensities.hover.text : glowIntensities.default.text,
        }}
        whileHover={{ scale: 1.05 }}
      >
        {/* Border glow */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            opacity: isHovered ? 1 : 0,
            background: `linear-gradient(45deg, ${isHovered ? glowIntensities.hover.border : glowIntensities.default.border}, transparent)`,
          }}
          transition={{ duration: 0.2 }}
        />
        
        {/* Content */}
        <span className="relative z-10">{label}</span>
        {hasDropdown && (
          <ChevronDown className="w-4 h-4 relative z-10" />
        )}
      </motion.div>
      
      {hasDropdown && children && (
        <div className="absolute left-0 mt-2 w-48 py-2 bg-[#0D0B1F] rounded-lg shadow-xl opacity-0 invisible 
          group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-[#00F5FF]/10">
          {children}
        </div>
      )}
    </div>
  );
}