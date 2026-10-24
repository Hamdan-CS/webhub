import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { Search } from 'lucide-react';

interface TimelinePhase {
  week: string;
  title: string;
  description: string;
  status: 'done' | 'active' | 'future';
  progress: number;
}

const phases: TimelinePhase[] = [
  {
    week: 'Week 1',
    title: 'Discovery',
    description: 'Understanding your business goals, target audience, and project requirements',
    status: 'done',
    progress: 0,
  },
  {
    week: 'Week 2',
    title: 'Strategy',
    description: 'Developing comprehensive strategy and project roadmap',
    status: 'done',
    progress: 20,
  },
  {
    week: 'Week 3-4',
    title: 'Design',
    description: 'Creating wireframes, mockups, and design prototypes',
    status: 'done',
    progress: 40,
  },
  {
    week: 'Week 5-6',
    title: 'Build',
    description: 'Development and implementation of your project (Currently Active)',
    status: 'active',
    progress: 55,
  },
  {
    week: 'Week 7',
    title: 'Review',
    description: 'Testing, feedback collection, and refinements',
    status: 'future',
    progress: 70,
  },
  {
    week: 'Week 8',
    title: 'Launch',
    description: 'Final deployment and go-live',
    status: 'future',
    progress: 100,
  },
];

export function ProjectTimeline() {
  const { isDarkMode } = useTheme();
  const [hoveredPhase, setHoveredPhase] = useState<number | null>(null);
  const [searchInput, setSearchInput] = useState('');
  const [highlightedPhase, setHighlightedPhase] = useState<number | null>(null);

  const getPhaseColor = (status: 'done' | 'active' | 'future') => {
    if (status === 'done') return isDarkMode ? '#00F5FF' : '#3B82F6';
    if (status === 'active') return isDarkMode ? '#00FFFF' : '#60A5FA';
    return isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.5)';
  };

  // Calculate progress bar width based on highlighted phase
  const getCurrentProgress = () => {
    if (highlightedPhase !== null && highlightedPhase >= 0 && highlightedPhase < phases.length) {
      return `${phases[highlightedPhase].progress}%`;
    }
    return '55%'; // Default progress (Build phase)
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = searchInput.toLowerCase().trim();

    // Parse demo 1, demo 2, etc.
    const demoMatch = input.match(/demo\s*(\d+)/);
    if (demoMatch) {
      const phaseNumber = parseInt(demoMatch[1]) - 1;
      if (phaseNumber >= 0 && phaseNumber < phases.length) {
        setHighlightedPhase(phaseNumber);

        // Scroll to the phase after a short delay
        setTimeout(() => {
          const element = document.getElementById(`phase-${phaseNumber}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 300);
      } else {
        alert('Demo project not found. Please try demo 1 through demo 6.');
        setHighlightedPhase(null);
      }
    } else {
      alert('Please enter "demo 1" through "demo 6" to view project status.');
      setHighlightedPhase(null);
    }
  };

  return (
    <div
      className={`py-16 ${
        isDarkMode
          ? 'bg-gradient-to-b from-[#0A0B14] to-[#0A0B14]/95'
          : 'bg-gradient-to-b from-white to-[#F9FAFB]'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2
            className={`text-4xl md:text-5xl font-bold mb-4 ${
              isDarkMode ? 'neon-glow text-white' : 'neon-glow text-[#1F2937]'
            }`}
          >
            Project Timeline
          </h2>
          <p
            className={`text-lg max-w-2xl mx-auto mb-8 ${
              isDarkMode ? 'text-[#E2E2E2]/80' : 'text-[#4B5563]'
            }`}
          >
            Track your project progress through our 8-week delivery timeline
          </p>

          {/* Search Bar */}
          <motion.form
            onSubmit={handleSearchSubmit}
            className="max-w-md mx-auto"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="relative flex items-center gap-2">
              <div
                className={`flex-1 relative rounded-lg border transition-all ${
                  isDarkMode
                    ? 'border-[#00F5FF]/30 bg-[#0D0B1F]/40 hover:border-[#00F5FF]/50'
                    : 'border-[#3B82F6]/30 bg-white/50 hover:border-[#3B82F6]/50 shadow-sm'
                }`}
              >
                <Search
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                    isDarkMode ? 'text-[#00F5FF]/60' : 'text-[#3B82F6]/60'
                  }`}
                />
                <input
                  type="text"
                  placeholder="Enter: demo 1-6"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border-0 transition-all text-sm ${
                    isDarkMode
                      ? 'bg-transparent text-white placeholder-[#E2E2E2]/40 focus:outline-none'
                      : 'bg-transparent text-[#1F2937] placeholder-[#6B7280] focus:outline-none'
                  }`}
                />
              </div>
              <motion.button
                type="submit"
                className={`px-4 py-2 rounded-lg border font-medium transition-all ${
                  isDarkMode
                    ? 'bg-[#00F5FF]/10 hover:bg-[#00F5FF]/20 border-[#00F5FF]/30 text-[#00F5FF]'
                    : 'bg-[#3B82F6]/10 hover:bg-[#3B82F6]/20 border-[#3B82F6]/30 text-[#3B82F6]'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Search
              </motion.button>
            </div>
            <p
              className={`text-xs mt-2 ${
                isDarkMode ? 'text-[#E2E2E2]/50' : 'text-[#6B7280]'
              }`}
            >
              Try "demo 1", "demo 2", etc. to see project phases
            </p>
          </motion.form>
        </motion.div>

        {/* Timeline Container */}
        <motion.div
          className={`relative rounded-2xl p-12 border ${
            isDarkMode
              ? 'border-[#00F5FF]/20 bg-[#0D0B1F]/30 hover:border-[#00F5FF]/50'
              : 'border-[#3B82F6]/20 bg-white/40 hover:border-[#3B82F6]/50 shadow-lg'
          }`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          onMouseEnter={() => setHoveredPhase('container')}
          onMouseLeave={() => setHoveredPhase(null)}
        >
          {/* Main Timeline Line */}
          <div className="relative flex items-center justify-between mb-16">
            {/* Progress Bar Background */}
            <div
              className={`absolute top-1/2 left-0 right-0 h-1 rounded-full transform -translate-y-1/2 ${
                isDarkMode ? 'bg-[#E2E2E2]/10' : 'bg-[#4B5563]/10'
              }`}
            />

            {/* Progress Bar Fill - Dynamic */}
            <motion.div
              className="absolute top-1/2 left-0 h-1 rounded-full transform -translate-y-1/2 bg-gradient-to-r from-[#00F5FF] to-[#00FFFF]"
              initial={{ width: 0 }}
              animate={{ width: getCurrentProgress() }}
              transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
              style={{
                boxShadow: isDarkMode
                  ? '0 0 20px rgba(0, 245, 255, 0.6)'
                  : '0 0 15px rgba(59, 130, 246, 0.4)',
              }}
            />

            {/* Timeline Dots */}
            {phases.map((phase, index) => {
              const isHovered = hoveredPhase === index;
              const isHighlighted = highlightedPhase === index;

              return (
                <motion.div
                  key={index}
                  id={`phase-${index}`}
                  className="relative z-20 flex flex-col items-center group cursor-pointer"
                  onMouseEnter={() => setHoveredPhase(index)}
                  onMouseLeave={() => setHoveredPhase(null)}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  {/* Dot Background Glow */}
                  <motion.div
                    className={`absolute w-8 h-8 rounded-full ${
                      phase.status === 'active'
                        ? isDarkMode
                          ? 'bg-[#00FFFF]'
                          : 'bg-[#60A5FA]'
                        : isDarkMode
                        ? 'bg-[#00F5FF]'
                        : 'bg-[#3B82F6]'
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity:
                        (phase.status === 'active' && isHovered) || isHighlighted ? 0.4 : 0,
                      scale: (phase.status === 'active' && isHovered) || isHighlighted ? 1.8 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Main Dot */}
                  <motion.div
                    className={`w-6 h-6 rounded-full border-2 relative z-10 transition-all duration-300 ${
                      phase.status === 'done'
                        ? isDarkMode
                          ? 'bg-[#00F5FF] border-[#00F5FF]'
                          : 'bg-[#3B82F6] border-[#3B82F6]'
                        : phase.status === 'active'
                        ? isDarkMode
                          ? 'bg-[#00FFFF] border-[#00FFFF]'
                          : 'bg-[#60A5FA] border-[#60A5FA]'
                        : isDarkMode
                        ? 'bg-transparent border-[#E2E2E2]/30'
                        : 'bg-transparent border-[#4B5563]/30'
                    }`}
                    animate={{
                      boxShadow:
                        (phase.status === 'active' && isHovered) || isHighlighted
                          ? isDarkMode
                            ? '0 0 20px rgba(0, 255, 255, 0.6)'
                            : '0 0 15px rgba(96, 165, 250, 0.5)'
                          : phase.status === 'active'
                          ? isDarkMode
                            ? '0 0 10px rgba(0, 255, 255, 0.4)'
                            : '0 0 8px rgba(96, 165, 250, 0.3)'
                          : 'none',
                    }}
                    whileHover={{ scale: 1.3 }}
                    transition={{ duration: 0.2 }}
                  >
                    {phase.status === 'done' && (
                      <motion.svg
                        className="w-4 h-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        fill="white"
                        viewBox="0 0 20 20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </motion.svg>
                    )}
                  </motion.div>

                  {/* Phase Label Below Line */}
                  <motion.div
                    className="mt-12 text-center"
                    animate={{ y: isHovered || isHighlighted ? -5 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p
                      className={`text-xs font-bold tracking-widest mb-1 transition-all ${
                        isHighlighted
                          ? isDarkMode
                            ? 'text-[#00FFFF]'
                            : 'text-[#60A5FA]'
                          : isDarkMode
                          ? 'text-[#00F5FF]'
                          : 'text-[#3B82F6]'
                      }`}
                      style={{ letterSpacing: '0.1em' }}
                    >
                      {phase.week}
                    </p>
                    <p
                      className={`text-sm font-bold ${
                        isHovered || isHighlighted
                          ? isDarkMode
                            ? 'text-white'
                            : 'text-[#1F2937]'
                          : isDarkMode
                          ? 'text-[#E2E2E2]'
                          : 'text-[#4B5563]'
                      }`}
                    >
                      {phase.title}
                    </p>

                    {/* Hover Tooltip */}
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{
                        opacity: isHovered || isHighlighted ? 1 : 0,
                        y: isHovered || isHighlighted ? 0 : -10,
                      }}
                      transition={{ duration: 0.2 }}
                      className={`absolute top-full mt-4 left-1/2 transform -translate-x-1/2 z-50 px-4 py-3 rounded-lg backdrop-blur-lg whitespace-nowrap border ${
                        isDarkMode
                          ? 'bg-[#0D0B1F]/95 border-[#00F5FF]/30 text-[#E2E2E2]'
                          : 'bg-white/95 border-[#3B82F6]/30 text-[#1F2937] shadow-xl'
                      }`}
                      pointerEvents="none"
                    >
                      <p className="text-xs font-medium">{phase.description}</p>
                      <motion.div
                        className={`absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45 ${
                          isDarkMode
                            ? 'bg-[#0D0B1F]'
                            : 'bg-white'
                        }`}
                      />
                    </motion.div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Legend */}
          <motion.div
            className="mt-16 pt-8 border-t border-[#00F5FF]/20 flex flex-wrap justify-center gap-6 md:gap-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            viewport={{ once: true }}
          >
            {[
              { status: 'done', label: 'Completed', color: '#00F5FF' },
              { status: 'active', label: 'In Progress', color: '#00FFFF' },
              { status: 'future', label: 'Upcoming', color: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.5)' },
            ].map((item) => (
              <motion.div
                key={item.status}
                className="flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
              >
                <div
                  className="w-4 h-4 rounded-full border-2"
                  style={{
                    backgroundColor: item.status === 'future' ? 'transparent' : item.color,
                    borderColor: item.color,
                  }}
                />
                <span
                  className={`text-sm font-medium ${
                    isDarkMode ? 'text-[#E2E2E2]' : 'text-[#4B5563]'
                  }`}
                >
                  {item.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
