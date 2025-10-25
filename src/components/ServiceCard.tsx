import React, { useState } from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

interface ServiceCardProps {
  title: string;
  description: string;
  features: string[];
  Icon: LucideIcon;
}

export function ServiceCard({ title, description, features, Icon }: ServiceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const glowIntensities = isDarkMode ? {
    default: {
      shadow: '0 0 0px rgba(255,185,0,0)',
      border: 'rgba(255,185,0,0)',
      text: '0 0 0px rgba(255,185,0,0)'
    },
    hover: {
      shadow: '0 0 30px rgba(255,185,0,0.2)',
      border: 'rgba(255,185,0,0.3)',
      text: '0 0 15px rgba(255,185,0,0.5)'
    }
  } : {
    default: {
      shadow: '0 0 0px rgba(59,130,246,0)',
      border: 'rgba(59,130,246,0)',
      text: '0 0 0px rgba(59,130,246,0)'
    },
    hover: {
      shadow: '0 0 30px rgba(59,130,246,0.2)',
      border: 'rgba(59,130,246,0.3)',
      text: '0 0 15px rgba(59,130,246,0.5)'
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
    });
  };

  const handleInitializeService = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(`Navigating to contact page for ${title}`);
    navigate('/contact');
  };

  return (
    <motion.div
      layout
      className={`relative p-6 rounded-xl backdrop-blur-sm transition-all duration-300 cursor-pointer overflow-hidden transform-gpu ${
        isExpanded 
          ? isDarkMode 
            ? 'bg-[#0D0B1F]/90' 
            : 'bg-white/90 shadow-xl border border-[#3B82F6]/10'
          : isDarkMode 
            ? 'bg-[#0D0B1F]/60' 
            : 'bg-white/60 shadow-lg border border-[#3B82F6]/5'
      }`}
      onClick={() => setIsExpanded(!isExpanded)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      animate={{
        rotateX: mousePosition.y,
        rotateY: mousePosition.x,
        boxShadow: isHovered ? glowIntensities.hover.shadow : glowIntensities.default.shadow,
      }}
      style={{ transformStyle: 'preserve-3d' }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30
      }}
    >
      {/* Glow border effect */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        animate={{
          opacity: isHovered ? 1 : 0,
          background: `linear-gradient(45deg, ${isHovered ? glowIntensities.hover.border : glowIntensities.default.border}, transparent)`
        }}
        transition={{ duration: 0.2 }}
        style={{
          filter: 'blur(8px)',
        }}
      />

      <div className="relative flex items-start gap-4" style={{ transform: 'translateZ(20px)' }}>
        <motion.div
          animate={{
            rotateY: isExpanded ? 360 : 0,
            boxShadow: isHovered 
              ? isDarkMode 
                ? '0 0 20px rgba(255,185,0,0.3)' 
                : '0 0 20px rgba(59,130,246,0.3)'
              : '0 0 0px rgba(255,185,0,0)',
          }}
          transition={{ duration: 0.5 }}
          className={`p-2 rounded-lg ${
            isDarkMode 
              ? 'bg-gradient-to-r from-[#FFB300]/20 via-[#FFD700]/20 to-[#FFA500]/20'
              : 'bg-gradient-to-r from-[#3B82F6]/20 via-[#60A5FA]/20 to-[#3B82F6]/20'
          }`}
        >
          <Icon className={`w-8 h-8 transition-all ${
            isHovered 
              ? isDarkMode 
                ? 'text-[#FFD700]' 
                : 'text-[#3B82F6]'
              : isDarkMode 
                ? 'text-[#FFB300]' 
                : 'text-[#60A5FA]'
          }`} />
        </motion.div>

        <div className="flex-1">
          <motion.h3 
            className={`text-xl font-bold mb-2 ${
              isDarkMode ? 'text-white' : 'text-[#1F2937]'
            }`}
            animate={{ 
              textShadow: isHovered ? glowIntensities.hover.text : glowIntensities.default.text
            }}
          >
            {title}
          </motion.h3>
          <p className={`mb-4 ${
            isDarkMode ? 'text-gray-300' : 'text-[#4B5563]'
          }`}>
            {description}
          </p>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ul className="space-y-2 mb-6">
                  {features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`text-sm flex items-start gap-2 ${
                        isDarkMode ? 'text-gray-300' : 'text-[#4B5563]'
                      }`}
                    >
                      <span className={`text-lg leading-none ${
                        isDarkMode ? 'text-[#FFD700]' : 'text-[#3B82F6]'
                      }`}>•</span>
                      {feature}
                    </motion.li>
                  ))}
                </ul>
                <motion.button
                  className={`px-6 py-2 rounded-lg border font-medium transition-all duration-300 transform-gpu ${
                    isDarkMode 
                      ? 'bg-[#0D0B1F] border-[#FFD700]/30 text-[#FFD700] hover:bg-[#FFD700]/10 hover:border-[#FFD700]/50'
                      : 'bg-white border-[#3B82F6]/30 text-[#3B82F6] hover:bg-[#3B82F6]/10 hover:border-[#3B82F6]/50 shadow-md'
                  }`}
                  animate={{
                    boxShadow: isHovered 
                      ? isDarkMode 
                        ? '0 0 20px rgba(255,185,0,0.3)' 
                        : '0 0 20px rgba(59,130,246,0.3)'
                      : '0 0 0px rgba(255,185,0,0)'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleInitializeService}
                >
                  Initialize Service
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div
            layout
            className={`mt-4 text-sm font-medium ${
              isDarkMode ? 'text-[#FFD700]' : 'text-[#3B82F6]'
            }`}
          >
            {isExpanded ? "Collapse Interface" : "Expand Interface"}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}