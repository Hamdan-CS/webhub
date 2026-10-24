import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

interface StatCell { number: string; label: string; icon: React.ReactNode; }

const statRows: StatCell[][] = [
  [
    { number: '500+', label: 'Businesses', icon: <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg> },
    { number: '68%', label: 'Traffic Growth', icon: <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 17" /><polyline points="17 6 23 6 23 12" /></svg> },
    { number: '4.2×', label: 'ROI', icon: <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg> },
  ],
  [
    { number: '4.9★', label: 'Satisfaction', icon: <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg> },
    { number: '8', label: 'wks Launch Time', icon: <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg> },
    { number: '98%', label: 'Retention', icon: <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4" /><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
  ],
];

export function InfographicsStatsStrip() {
  const { isDarkMode } = useTheme();
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);

  const accentColor = isDarkMode ? 'var(--color-accent-light)' : 'var(--color-accent)';

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="relative rounded-2xl p-8 border glass-card"
          onMouseEnter={() => setHoveredCell('container')} onMouseLeave={() => setHoveredCell(null)}
          animate={{ boxShadow: hoveredCell === 'container' ? '0 0 40px var(--glow-primary)' : 'var(--shadow-card)' }}
          transition={{ duration: 0.3 }}
        >
          {[statRows[0], statRows[1]].map((row, rowIdx) => (
            <div key={rowIdx} className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${rowIdx === 0 ? 'mb-6' : ''}`}>
              {row.map((stat, idx) => {
                const cellId = `row${rowIdx}-${idx}`;
                const isHovered = hoveredCell === cellId;
                return (
                  <motion.div key={cellId} className="relative p-6 rounded-xl cursor-pointer transition-all duration-300 overflow-hidden" style={{ background: 'var(--color-bg-elevated)' }} onMouseEnter={() => setHoveredCell(cellId)} onMouseLeave={() => setHoveredCell(null)} whileHover={{ scale: 1.02 }}>
                    <div className="relative z-10 flex flex-col items-center text-center">
                      <motion.div className="mb-3" style={{ color: accentColor }} whileHover={{ scale: 1.1 }}>{stat.icon}</motion.div>
                      <motion.div className="text-4xl md:text-5xl font-bold mb-2 font-display" style={{ color: accentColor }} animate={{ textShadow: isHovered ? '0 0 20px var(--glow-primary)' : 'none' }}>{stat.number}</motion.div>
                      <p className="text-sm font-medium text-[var(--color-text-secondary)]">{stat.label}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
