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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 15,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 15,
    });
  };

  const handleSelectPlan = () => {
    navigate('/plan-selection', { state: { selectedPlan: planLevel } });
  };

  return (
    <motion.div
      className={`relative p-6 rounded-2xl transform-gpu glass-card ${isPopular ? 'ring-2' : ''}`}
      style={{ transformStyle: 'preserve-3d', boxShadow: isPopular ? '0 0 24px var(--glow-primary)' : 'var(--shadow-card)' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setMousePosition({ x: 0, y: 0 }); }}
      animate={{
        rotateX: mousePosition.y,
        rotateY: mousePosition.x,
        boxShadow: isHovered ? '0 0 30px var(--glow-primary)' : isPopular ? '0 0 24px var(--glow-primary)' : 'var(--shadow-card)',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold text-white" style={{ background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-2))' }}>
          Most Popular
        </div>
      )}
      <div style={{ transform: 'translateZ(20px)' }}>
        <h3 className="text-2xl font-bold mb-4 text-[var(--color-text)]">{title}</h3>
        <div className="mb-6">
          <span className="text-4xl font-bold text-[var(--color-text)]">{price}</span>
          <span className="text-[var(--color-text-muted)]">/month</span>
        </div>
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-[var(--color-text-secondary)]">
              <span className="text-lg accent-text">•</span>{feature}
            </li>
          ))}
        </ul>
        <motion.button onClick={handleSelectPlan} className="btn-outline relative w-full px-6 py-3 rounded-xl font-medium transition-all duration-200" whileHover={{ boxShadow: '0 0 25px var(--glow-primary)' }} whileTap={{ scale: 0.98 }}>
          Select Plan
        </motion.button>
      </div>
    </motion.div>
  );
}
