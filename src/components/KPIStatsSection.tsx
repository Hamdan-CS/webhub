import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

interface KPICard {
  value: string;
  label: string;
  delta: string;
  deltaPercent: string;
  progress: number;
}

const kpiData: KPICard[] = [
  {
    value: '500+',
    label: 'CLIENTS SERVED',
    delta: '↑',
    deltaPercent: '24%',
    progress: 85,
  },
  {
    value: '98%',
    label: 'CLIENT RETENTION',
    delta: '↑',
    deltaPercent: '3%',
    progress: 92,
  },
  {
    value: '4.2×',
    label: 'AVG ROI',
    delta: '↑',
    deltaPercent: '0.6×',
    progress: 78,
  },
  {
    value: '12k+',
    label: 'PAGES DESIGNED',
    delta: '↑',
    deltaPercent: '31%',
    progress: 88,
  },
];

export function KPIStatsSection() {
  const { isDarkMode } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: 'easeOut',
      },
    }),
  };

  const colors = [
    isDarkMode ? '#00F5FF' : '#3B82F6', // Cyan for dark, Blue for light
    isDarkMode ? '#40E0D0' : '#60A5FA', // Turquoise for dark, Light blue for light
    isDarkMode ? '#FF006E' : '#EC4899', // Pink
    isDarkMode ? '#FFB703' : '#F59E0B', // Orange
  ];

  return (
    <>
      <div
        className={`py-20 ${
          isDarkMode
            ? 'bg-gradient-to-b from-[#0A0B14] to-[#0A0B14]/95'
            : 'bg-gradient-to-b from-[#F9FAFB] to-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              className={`w-24 h-1 mx-auto mb-6 rounded-full ${
                isDarkMode
                  ? 'bg-gradient-to-r from-[#00F5FF]/30 via-[#00F5FF] to-[#00F5FF]/30'
                  : 'bg-gradient-to-r from-[#3B82F6]/30 via-[#3B82F6] to-[#3B82F6]/30'
              }`}
              animate={{
                scaleX: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <h2
              className={`text-4xl md:text-5xl font-bold mb-4 ${
                isDarkMode ? 'neon-glow text-white' : 'neon-glow text-[#1F2937]'
              }`}
            >
              Our Impact in Numbers
            </h2>
            <p
              className={`text-lg max-w-2xl mx-auto ${
                isDarkMode ? 'text-[#E2E2E2]/80' : 'text-[#4B5563]'
              }`}
            >
              Real results from real partnerships. Watch how we transform digital presence
              for businesses like yours.
            </p>
          </motion.div>

          {/* KPI Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {kpiData.map((kpi, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative group"
              >
                {/* Glow background on hover */}
                <motion.div
                  className={`absolute inset-0 rounded-xl blur-lg -z-10 ${
                    isDarkMode ? 'bg-[#00F5FF]' : 'bg-[#3B82F6]'
                  }`}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.3 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Card */}
                <motion.div
                  className={`relative p-8 rounded-xl backdrop-blur-sm border transition-all duration-300 ${
                    isDarkMode
                      ? 'bg-[#0D0B1F]/60 border-[#00F5FF]/20 hover:border-[#00F5FF]/50'
                      : 'bg-white/80 border-[#3B82F6]/20 hover:border-[#3B82F6]/50 shadow-lg'
                  }`}
                  whileHover={{
                    boxShadow: isDarkMode
                      ? '0 0 30px rgba(0, 245, 255, 0.3)'
                      : '0 0 30px rgba(59, 130, 246, 0.3)',
                    y: -5,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Large Number */}
                  <motion.div
                    className="mb-2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div
                      className="text-5xl md:text-6xl font-bold mb-1 font-mono"
                      style={{ color: colors[index] }}
                    >
                      {kpi.value}
                    </div>
                  </motion.div>

                  {/* Delta Indicator */}
                  <motion.div
                    className="flex items-center gap-2 mb-4"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.4, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <span className="text-lg font-bold text-green-400">
                      {kpi.delta}
                    </span>
                    <span className="text-base font-semibold text-green-400">
                      {kpi.deltaPercent}
                    </span>
                  </motion.div>

                  {/* Label - DM Mono Uppercase */}
                  <h3
                    className={`text-xs md:text-sm font-bold tracking-widest mb-4 ${
                      isDarkMode ? 'text-[#E2E2E2]' : 'text-[#4B5563]'
                    }`}
                    style={{ fontFamily: 'monospace', letterSpacing: '0.15em' }}
                  >
                    {kpi.label}
                  </h3>

                  {/* Progress Bar */}
                  <motion.div
                    className={`h-0.5 rounded-full overflow-hidden ${
                      isDarkMode
                        ? 'bg-[#E2E2E2]/10'
                        : 'bg-[#4B5563]/10'
                    }`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: colors[index] }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${kpi.progress}%` }}
                      transition={{
                        delay: index * 0.1 + 0.6,
                        duration: 0.8,
                        ease: 'easeOut',
                      }}
                      viewport={{ once: true }}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* View Outcomes Button */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={() => setIsModalOpen(true)}
              className={`relative group px-8 py-3 rounded-lg border font-medium transition-all duration-200 ${
                isDarkMode
                  ? 'bg-[#0D0B1F] border-[#00F5FF]/50 text-[#00F5FF] hover:bg-[#00F5FF]/10'
                  : 'bg-white border-[#3B82F6]/50 text-[#3B82F6] hover:bg-[#3B82F6]/10 shadow-lg'
              }`}
              whileHover={{
                scale: 1.05,
                boxShadow: isDarkMode
                  ? '0 0 20px rgba(0, 245, 255, 0.3)'
                  : '0 0 20px rgba(59, 130, 246, 0.3)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">View Case Studies & Outcomes</span>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Outcomes Modal */}
      <motion.div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
          isModalOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isModalOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        onClick={() => setIsModalOpen(false)}
      >
        {/* Backdrop */}
        <motion.div
          className={`absolute inset-0 ${
            isDarkMode ? 'bg-black/70' : 'bg-black/50'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isModalOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Modal Content */}
        <motion.div
          className={`relative max-w-2xl w-full max-h-[80vh] overflow-y-auto rounded-xl ${
            isDarkMode
              ? 'bg-[#0D0B1F]/95 border border-[#00F5FF]/30'
              : 'bg-white/95 border border-[#3B82F6]/30 shadow-2xl'
          }`}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: isModalOpen ? 1 : 0, scale: isModalOpen ? 1 : 0.9, y: isModalOpen ? 0 : 20 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <motion.button
            onClick={() => setIsModalOpen(false)}
            className={`absolute top-4 right-4 p-2 rounded-lg transition-colors ${
              isDarkMode
                ? 'hover:bg-[#00F5FF]/20 text-[#00F5FF]'
                : 'hover:bg-[#3B82F6]/20 text-[#3B82F6]'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>

          {/* Modal Header */}
          <div className="p-8 border-b border-[#00F5FF]/20">
            <h2
              className={`text-3xl font-bold mb-2 ${
                isDarkMode ? 'text-white' : 'text-[#1F2937]'
              }`}
            >
              Case Studies & Success Outcomes
            </h2>
            <p
              className={`${
                isDarkMode ? 'text-[#E2E2E2]/70' : 'text-[#4B5563]'
              }`}
            >
              Discover how our clients achieved remarkable results
            </p>
          </div>

          {/* Modal Body */}
          <div className="p-8 space-y-6">
            {/* Case Study 1 */}
            <div
              className={`p-6 rounded-lg border ${
                isDarkMode
                  ? 'border-[#00F5FF]/20 bg-[#0D0B1F]/50'
                  : 'border-[#3B82F6]/20 bg-[#F9FAFB]'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <h3
                  className={`text-lg font-bold ${
                    isDarkMode ? 'text-white' : 'text-[#1F2937]'
                  }`}
                >
                  E-Commerce Platform Redesign
                </h3>
                <span className="text-green-400 font-bold text-sm">+287% Revenue</span>
              </div>
              <p
                className={`text-sm mb-4 ${
                  isDarkMode ? 'text-[#E2E2E2]/70' : 'text-[#4B5563]'
                }`}
              >
                Complete website overhaul with modern design, improved UX, and optimized checkout flow
                resulted in significantly higher conversion rates and customer satisfaction.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Web Design', 'UX Optimization', 'SEO'].map((tag) => (
                  <span
                    key={tag}
                    className={`text-xs px-3 py-1 rounded-full ${
                      isDarkMode
                        ? 'bg-[#00F5FF]/20 text-[#00F5FF]'
                        : 'bg-[#3B82F6]/20 text-[#3B82F6]'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Case Study 2 */}
            <div
              className={`p-6 rounded-lg border ${
                isDarkMode
                  ? 'border-[#00F5FF]/20 bg-[#0D0B1F]/50'
                  : 'border-[#3B82F6]/20 bg-[#F9FAFB]'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <h3
                  className={`text-lg font-bold ${
                    isDarkMode ? 'text-white' : 'text-[#1F2937]'
                  }`}
                >
                  Social Media Growth Strategy
                </h3>
                <span className="text-green-400 font-bold text-sm">+540% Engagement</span>
              </div>
              <p
                className={`text-sm mb-4 ${
                  isDarkMode ? 'text-[#E2E2E2]/70' : 'text-[#4B5563]'
                }`}
              >
                Strategic content creation, audience targeting, and community management led to massive
                organic growth and stronger brand loyalty.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Social Media', 'Content Strategy', 'Community'].map((tag) => (
                  <span
                    key={tag}
                    className={`text-xs px-3 py-1 rounded-full ${
                      isDarkMode
                        ? 'bg-[#00F5FF]/20 text-[#00F5FF]'
                        : 'bg-[#3B82F6]/20 text-[#3B82F6]'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Case Study 3 */}
            <div
              className={`p-6 rounded-lg border ${
                isDarkMode
                  ? 'border-[#00F5FF]/20 bg-[#0D0B1F]/50'
                  : 'border-[#3B82F6]/20 bg-[#F9FAFB]'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <h3
                  className={`text-lg font-bold ${
                    isDarkMode ? 'text-white' : 'text-[#1F2937]'
                  }`}
                >
                  SEO & Content Marketing Overhaul
                </h3>
                <span className="text-green-400 font-bold text-sm">+420% Organic Traffic</span>
              </div>
              <p
                className={`text-sm mb-4 ${
                  isDarkMode ? 'text-[#E2E2E2]/70' : 'text-[#4B5563]'
                }`}
              >
                In-depth keyword research, technical SEO improvements, and quality content creation pushed
                rankings to the first page for high-intent keywords.
              </p>
              <div className="flex flex-wrap gap-2">
                {['SEO', 'Content', 'Technical'].map((tag) => (
                  <span
                    key={tag}
                    className={`text-xs px-3 py-1 rounded-full ${
                      isDarkMode
                        ? 'bg-[#00F5FF]/20 text-[#00F5FF]'
                        : 'bg-[#3B82F6]/20 text-[#3B82F6]'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <motion.button
              className={`w-full py-3 rounded-lg border font-medium transition-all duration-200 ${
                isDarkMode
                  ? 'bg-[#00F5FF]/10 border-[#00F5FF]/50 text-[#00F5FF] hover:bg-[#00F5FF]/20'
                  : 'bg-[#3B82F6]/10 border-[#3B82F6]/50 text-[#3B82F6] hover:bg-[#3B82F6]/20'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Start Your Success Story
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
