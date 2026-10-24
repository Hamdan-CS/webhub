import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  isPopular?: boolean;
  planLevel: 'basic' | 'standard' | 'premium';
}

export function PricingCard({ title, price, features, isPopular, planLevel }: PricingCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  const glowIntensities = isDarkMode ? {
    basic: {
      default: 'rgba(0, 255, 255, 0)',
      hover: 'rgba(0, 255, 255, 0.2)',
      active: 'rgba(0, 255, 255, 0.3)'
    },
    standard: {
      default: 'rgba(0, 255, 255, 0)',
      hover: 'rgba(0, 255, 255, 0.3)',
      active: 'rgba(0, 255, 255, 0.4)'
    },
    premium: {
      default: 'rgba(0, 255, 255, 0)',
      hover: 'rgba(0, 255, 255, 0.4)',
      active: 'rgba(0, 255, 255, 0.5)'
    }
  } : {
    basic: {
      default: 'rgba(59, 130, 246, 0)',
      hover: 'rgba(59, 130, 246, 0.2)',
      active: 'rgba(59, 130, 246, 0.3)'
    },
    standard: {
      default: 'rgba(59, 130, 246, 0)',
      hover: 'rgba(59, 130, 246, 0.3)',
      active: 'rgba(59, 130, 246, 0.4)'
    },
    premium: {
      default: 'rgba(59, 130, 246, 0)',
      hover: 'rgba(59, 130, 246, 0.4)',
      active: 'rgba(59, 130, 246, 0.5)'
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
    });
  };

  const handleSelectPlan = () => {
    navigate('/plan-selection', { 
      state: { selectedPlan: planLevel } 
    });
  };

  return (
    <motion.div
      className={`relative p-6 rounded-xl backdrop-blur-sm transform-gpu ${
        isPopular 
          ? isDarkMode 
            ? 'bg-[#0D0B1F]/80' 
            : 'bg-white/90 shadow-2xl border border-[#3B82F6]/20'
          : isDarkMode 
            ? 'bg-[#0D0B1F]/60' 
            : 'bg-white/80 shadow-xl border border-[#3B82F6]/10'
      }`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      animate={{
        rotateX: mousePosition.y,
        rotateY: mousePosition.x,
        boxShadow: isHovered 
          ? `0 0 30px ${glowIntensities[planLevel].hover}`
          : `0 0 0px ${glowIntensities[planLevel].default}`,
      }}
      style={{
        transformStyle: 'preserve-3d',
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30
      }}
    >
      {/* Border glow effect */}
      <motion.div 
        className="absolute inset-0 rounded-xl -z-10"
        animate={{
          background: isHovered
            ? `linear-gradient(45deg, ${glowIntensities[planLevel].hover}, transparent)`
            : `linear-gradient(45deg, ${glowIntensities[planLevel].default}, transparent)`,
        }}
        style={{
          filter: 'blur(4px)',
        }}
      />

      {isPopular && (
        <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-sm ${
          isDarkMode 
            ? 'bg-gradient-to-r from-[#00FFFF]/30 to-[#00FFFF]/30 text-white'
            : 'bg-gradient-to-r from-[#3B82F6]/30 to-[#3B82F6]/30 text-[#1F2937] bg-white shadow-lg'
        }`}>
          Most Popular
        </div>
      )}
      
      <div style={{ transform: 'translateZ(20px)' }}>
        <h3 className={`text-2xl font-bold mb-4 ${
          isDarkMode ? 'text-white' : 'text-[#1F2937]'
        }`}>
          {title}
        </h3>
        <div className="mb-6">
          <span className={`text-4xl font-bold ${
            isDarkMode ? 'text-white' : 'text-[#1F2937]'
          }`}>
            {price}
          </span>
          <span className={isDarkMode ? 'text-gray-400' : 'text-[#6B7280]'}>
            /month
          </span>
        </div>
        
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li
              key={index}
              className={`flex items-start gap-2 ${
                isDarkMode ? 'text-gray-300' : 'text-[#4B5563]'
              }`}
            >
              <span className={`text-lg ${
                isDarkMode ? 'text-[#00FFFF]' : 'text-[#3B82F6]'
              }`}>•</span>
              {feature}
            </li>
          ))}
        </ul>
        
        <motion.button
          onClick={handleSelectPlan}
          className={`relative w-full px-6 py-3 rounded-lg border font-medium transition-colors duration-200 ${
            isDarkMode 
              ? 'bg-[#0D0B1F] border-[#00FFFF]/30 text-[#00FFFF] hover:bg-[#00FFFF]/10 hover:border-[#00FFFF]/50'
              : 'bg-white border-[#3B82F6]/30 text-[#3B82F6] hover:bg-[#3B82F6]/10 hover:border-[#3B82F6]/50 shadow-md'
          }`}
          animate={{
            boxShadow: isHovered
              ? `0 0 15px ${glowIntensities[planLevel].hover}`
              : `0 0 0px ${glowIntensities[planLevel].default}`,
          }}
          whileHover={{
            boxShadow: `0 0 25px ${glowIntensities[planLevel].hover}`,
          }}
          whileTap={{
            boxShadow: `0 0 30px ${glowIntensities[planLevel].active}`,
          }}
        >
          <span className="relative z-10">
            Select Plan
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
}