import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

interface StatCell {
  number: string;
  label: string;
  icon: React.ReactNode;
}

const statRows: StatCell[][] = [
  [
    {
      number: '500+',
      label: 'Businesses',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      number: '68%',
      label: 'Traffic Growth',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 17" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      ),
    },
    {
      number: '4.2×',
      label: 'ROI',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
    },
  ],
  [
    {
      number: '4.9★',
      label: 'Satisfaction',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
    },
    {
      number: '8',
      label: 'wks Launch Time',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
    {
      number: '98%',
      label: 'Retention',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 11l3 3L22 4" />
          <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ],
];

export function InfographicsStatsStrip() {
  const { isDarkMode } = useTheme();
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);

  const iconColor = isDarkMode ? '#00F5FF' : '#3B82F6';
  const numberColor = isDarkMode ? '#00F5FF' : '#3B82F6';
  const labelColor = isDarkMode ? '#A0AEC0' : '#9CA3AF';

  return (
    <div
      className={`py-16 ${
        isDarkMode
          ? 'bg-gradient-to-b from-[#0A0B14] to-[#0A0B14]/95'
          : 'bg-gradient-to-b from-white to-[#F9FAFB]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Container with shared border and glow */}
        <motion.div
          className={`relative rounded-2xl p-8 border transition-all duration-300 ${
            isDarkMode
              ? 'border-[#00F5FF]/20 hover:border-[#00F5FF]/50 bg-[#0D0B1F]/30'
              : 'border-[#3B82F6]/20 hover:border-[#3B82F6]/50 bg-white/40 shadow-lg'
          }`}
          onMouseEnter={() => setHoveredCell('container')}
          onMouseLeave={() => setHoveredCell(null)}
          animate={{
            boxShadow:
              hoveredCell === 'container'
                ? isDarkMode
                  ? '0 0 40px rgba(0, 245, 255, 0.25), inset 0 0 40px rgba(0, 245, 255, 0.05)'
                  : '0 0 40px rgba(59, 130, 246, 0.2), inset 0 0 40px rgba(59, 130, 246, 0.03)'
                : 'none',
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Glow background effect */}
          <motion.div
            className={`absolute inset-0 rounded-2xl blur-xl -z-10 ${
              isDarkMode ? 'bg-[#00F5FF]' : 'bg-[#3B82F6]'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: hoveredCell === 'container' ? 0.15 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {statRows[0].map((stat, idx) => {
              const cellId = `row1-${idx}`;
              const isHovered = hoveredCell === cellId;

              return (
                <motion.div
                  key={cellId}
                  className={`relative p-6 rounded-xl transition-all duration-300 cursor-pointer group overflow-hidden ${
                    isDarkMode
                      ? 'bg-[#0D0B1F]/40 hover:bg-[#0D0B1F]/60'
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                  onMouseEnter={() => setHoveredCell(cellId)}
                  onMouseLeave={() => setHoveredCell(null)}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Radial gradient background on hover */}
                  <motion.div
                    className={`absolute inset-0 rounded-xl ${
                      isDarkMode
                        ? 'bg-radial-gradient'
                        : 'bg-radial-gradient'
                    }`}
                    style={{
                      backgroundImage: isHovered
                        ? isDarkMode
                          ? 'radial-gradient(circle at center, rgba(0, 245, 255, 0.15) 0%, rgba(0, 245, 255, 0.05) 50%, transparent 100%)'
                          : 'radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.02) 50%, transparent 100%)'
                        : 'none',
                    }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center text-center">
                    {/* Icon */}
                    <motion.div
                      className="mb-3"
                      style={{ color: iconColor }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {stat.icon}
                    </motion.div>

                    {/* Number with glow */}
                    <motion.div
                      className="text-4xl md:text-5xl font-bold mb-2 font-mono"
                      style={{
                        color: numberColor,
                      }}
                      animate={{
                        textShadow: isHovered
                          ? isDarkMode
                            ? [
                                '0 0 10px rgba(0, 245, 255, 0.5)',
                                '0 0 20px rgba(0, 245, 255, 0.3)',
                                '0 0 10px rgba(0, 245, 255, 0.5)',
                              ]
                            : [
                                '0 0 10px rgba(59, 130, 246, 0.4)',
                                '0 0 20px rgba(59, 130, 246, 0.2)',
                                '0 0 10px rgba(59, 130, 246, 0.4)',
                              ]
                          : 'none',
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: isHovered ? Infinity : 0,
                        ease: 'easeInOut',
                      }}
                    >
                      {stat.number}
                    </motion.div>

                    {/* Label */}
                    <p
                      className="text-sm font-medium"
                      style={{ color: labelColor }}
                    >
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {statRows[1].map((stat, idx) => {
              const cellId = `row2-${idx}`;
              const isHovered = hoveredCell === cellId;

              return (
                <motion.div
                  key={cellId}
                  className={`relative p-6 rounded-xl transition-all duration-300 cursor-pointer group overflow-hidden ${
                    isDarkMode
                      ? 'bg-[#0D0B1F]/40 hover:bg-[#0D0B1F]/60'
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                  onMouseEnter={() => setHoveredCell(cellId)}
                  onMouseLeave={() => setHoveredCell(null)}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Radial gradient background on hover */}
                  <motion.div
                    className={`absolute inset-0 rounded-xl ${
                      isDarkMode
                        ? 'bg-radial-gradient'
                        : 'bg-radial-gradient'
                    }`}
                    style={{
                      backgroundImage: isHovered
                        ? isDarkMode
                          ? 'radial-gradient(circle at center, rgba(0, 245, 255, 0.15) 0%, rgba(0, 245, 255, 0.05) 50%, transparent 100%)'
                          : 'radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.02) 50%, transparent 100%)'
                        : 'none',
                    }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center text-center">
                    {/* Icon */}
                    <motion.div
                      className="mb-3"
                      style={{ color: iconColor }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {stat.icon}
                    </motion.div>

                    {/* Number with glow */}
                    <motion.div
                      className="text-4xl md:text-5xl font-bold mb-2 font-mono"
                      style={{
                        color: numberColor,
                      }}
                      animate={{
                        textShadow: isHovered
                          ? isDarkMode
                            ? [
                                '0 0 10px rgba(0, 245, 255, 0.5)',
                                '0 0 20px rgba(0, 245, 255, 0.3)',
                                '0 0 10px rgba(0, 245, 255, 0.5)',
                              ]
                            : [
                                '0 0 10px rgba(59, 130, 246, 0.4)',
                                '0 0 20px rgba(59, 130, 246, 0.2)',
                                '0 0 10px rgba(59, 130, 246, 0.4)',
                              ]
                          : 'none',
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: isHovered ? Infinity : 0,
                        ease: 'easeInOut',
                      }}
                    >
                      {stat.number}
                    </motion.div>

                    {/* Label */}
                    <p
                      className="text-sm font-medium"
                      style={{ color: labelColor }}
                    >
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
