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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 15,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 15,
    });
  };

  const handleInitializeService = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate('/contact');
  };

  return (
    <motion.div
      layout
      className="relative p-6 rounded-2xl cursor-pointer overflow-hidden transform-gpu glass-card"
      style={{ transformStyle: 'preserve-3d' }}
      onClick={() => setIsExpanded(!isExpanded)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setMousePosition({ x: 0, y: 0 }); }}
      animate={{
        rotateX: mousePosition.y,
        rotateY: mousePosition.x,
        boxShadow: isHovered ? '0 0 30px var(--glow-primary)' : 'var(--shadow-card)',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="relative flex items-start gap-4" style={{ transform: 'translateZ(20px)' }}>
        <motion.div
          animate={{
            rotateY: isExpanded ? 360 : 0,
            boxShadow: isHovered ? '0 0 20px var(--glow-primary)' : 'none',
          }}
          transition={{ duration: 0.5 }}
          className="p-2.5 rounded-xl"
          style={{ background: 'color-mix(in srgb, var(--color-accent) 15%, transparent)' }}
        >
          <Icon className="w-8 h-8 accent-text" />
        </motion.div>

        <div className="flex-1">
          <motion.h3 className="text-xl font-bold mb-2 text-[var(--color-text)]" animate={{ textShadow: isHovered ? '0 0 15px var(--glow-primary)' : 'none' }}>
            {title}
          </motion.h3>
          <p className="mb-4 text-[var(--color-text-secondary)]">{description}</p>
          <AnimatePresence>
            {isExpanded && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
                <ul className="space-y-2 mb-6">
                  {features.map((feature, index) => (
                    <motion.li key={index} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="text-sm flex items-start gap-2 text-[var(--color-text-secondary)]">
                      <span className="text-lg leading-none accent-text">•</span>{feature}
                    </motion.li>
                  ))}
                </ul>
                <motion.button className="btn-outline px-6 py-2 rounded-lg font-medium" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleInitializeService}>
                  Initialize Service
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="mt-4 text-sm font-medium accent-text">{isExpanded ? "Collapse Interface" : "Expand Interface"}</div>
        </div>
      </div>
    </motion.div>
  );
}
