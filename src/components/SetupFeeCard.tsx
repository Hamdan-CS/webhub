import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

interface FeeItem { name: string; price: string; note: string | null; }
interface SetupFeeCardProps { title: string; description: string; items: FeeItem[]; }

export function SetupFeeCard({ title, description, items }: SetupFeeCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const handleGetStarted = () => navigate('/service-selection');

  return (
    <motion.div
      className="relative p-6 rounded-2xl overflow-hidden glass-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{ boxShadow: isHovered ? '0 0 24px var(--glow-primary)' : 'var(--shadow-card)' }}
    >
      <div className="relative z-10">
        <h3 className="font-display text-2xl font-bold mb-2 text-[var(--color-text)]">{title}</h3>
        <p className="mb-6 text-[var(--color-text-secondary)]">{description}</p>
        <ul className="space-y-4">
          {items.map((item, index) => (
            <li key={index} className="border-b pb-4 last:border-0" style={{ borderColor: 'var(--color-border)' }}>
              <div className="flex justify-between items-start">
                <span className="text-[var(--color-text)]">{item.name}</span>
                <span className="font-bold text-[var(--color-text)]">{item.price}</span>
              </div>
              {item.note && <p className="text-sm mt-1 text-[var(--color-text-muted)]">{item.note}</p>}
            </li>
          ))}
        </ul>
        <motion.button onClick={handleGetStarted} className="btn-outline relative w-full mt-6 px-6 py-3 rounded-xl font-medium transition-all duration-200" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          Get Started
        </motion.button>
      </div>
    </motion.div>
  );
}
