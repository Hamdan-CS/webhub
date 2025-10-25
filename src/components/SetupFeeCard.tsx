import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

interface FeeItem {
  name: string;
  price: string;
  note: string | null;
}

interface SetupFeeCardProps {
  title: string;
  description: string;
  items: FeeItem[];
}

export function SetupFeeCard({ title, description, items }: SetupFeeCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const glowIntensities = isDarkMode ? {
    default: {
      shadow: '0 0 0px rgba(255, 255, 255, 0)',
      border: 'rgba(0, 245, 255, 0.1)',
      text: '0 0 0px rgba(255, 255, 255, 0)'
    },
    hover: {
      shadow: '0 0 20px rgba(255, 255, 255, 0.2)',
      border: 'rgba(0, 245, 255, 0.5)',
      text: '0 0 8px rgba(255, 255, 255, 0.5)'
    }
  } : {
    default: {
      shadow: '0 0 0px rgba(59, 130, 246, 0)',
      border: 'rgba(59, 130, 246, 0.1)',
      text: '0 0 0px rgba(59, 130, 246, 0)'
    },
    hover: {
      shadow: '0 0 20px rgba(59, 130, 246, 0.2)',
      border: 'rgba(59, 130, 246, 0.5)',
      text: '0 0 8px rgba(59, 130, 246, 0.5)'
    }
  };

  const handleGetStarted = () => {
    navigate('/service-selection');
  };

  return (
    <motion.div 
      className={`relative p-6 rounded-xl backdrop-blur-sm overflow-hidden ${
        isDarkMode 
          ? 'bg-[#0D0B1F]/60' 
          : 'bg-white/80 shadow-xl border border-[#3B82F6]/10'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        boxShadow: isHovered 
          ? isDarkMode 
            ? '0 0 20px rgba(0, 245, 255, 0.2)'
            : '0 0 20px rgba(59, 130, 246, 0.2)'
          : '0 0 0px rgba(0, 245, 255, 0)'
      }}
    >
      {/* Border glow effect */}
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

      <div className="relative z-10">
        <motion.h3 
          className={`text-2xl font-bold mb-2 ${
            isDarkMode ? 'text-white' : 'text-[#1F2937]'
          }`}
          animate={{
            textShadow: isHovered ? glowIntensities.hover.text : glowIntensities.default.text
          }}
        >
          {title}
        </motion.h3>
        <p className={`mb-6 ${
          isDarkMode ? 'text-gray-400' : 'text-[#4B5563]'
        }`}>
          {description}
        </p>
        
        <ul className="space-y-4">
          {items.map((item, index) => (
            <li
              key={index}
              className={`border-b pb-4 last:border-0 ${
                isDarkMode 
                  ? 'border-[#00F5FF]/10' 
                  : 'border-[#3B82F6]/10'
              }`}
            >
              <div className="flex justify-between items-start">
                <span className={isDarkMode ? 'text-[#E2E2E2]' : 'text-[#1F2937]'}>
                  {item.name}
                </span>
                <span className={`font-bold ${
                  isDarkMode ? 'text-white' : 'text-[#1F2937]'
                }`}>
                  {item.price}
                </span>
              </div>
              {item.note && (
                <p className={`text-sm mt-1 ${
                  isDarkMode ? 'text-gray-500' : 'text-[#6B7280]'
                }`}>
                  {item.note}
                </p>
              )}
            </li>
          ))}
        </ul>
        
        <motion.button
          onClick={handleGetStarted}
          className={`relative w-full mt-6 px-6 py-3 rounded-lg border font-medium transition-all duration-200 ${
            isDarkMode 
              ? 'bg-[#0D0B1F] border-[#00F5FF]/30 text-white hover:bg-[#00F5FF]/10 hover:border-[#00F5FF]/50'
              : 'bg-white border-[#3B82F6]/30 text-[#3B82F6] hover:bg-[#3B82F6]/10 hover:border-[#3B82F6]/50 shadow-md'
          }`}
          animate={{
            boxShadow: isHovered 
              ? isDarkMode 
                ? '0 0 15px rgba(0, 245, 255, 0.2)'
                : '0 0 15px rgba(59, 130, 246, 0.2)'
              : '0 0 0px rgba(0, 245, 255, 0)'
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative z-10">
            Get Started
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
}