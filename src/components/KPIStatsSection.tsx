import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

interface KPICard { value: string; label: string; delta: string; deltaPercent: string; progress: number; }

const kpiData: KPICard[] = [
  { value: '500+', label: 'CLIENTS SERVED', delta: '↑', deltaPercent: '24%', progress: 85 },
  { value: '98%', label: 'CLIENT RETENTION', delta: '↑', deltaPercent: '3%', progress: 92 },
  { value: '4.2×', label: 'AVG ROI', delta: '↑', deltaPercent: '0.6×', progress: 78 },
  { value: '12k+', label: 'PAGES DESIGNED', delta: '↑', deltaPercent: '31%', progress: 88 },
];

export function KPIStatsSection() {
  const { isDarkMode } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' } }),
  };

  const statColors = isDarkMode
    ? ['var(--color-accent-light)', 'var(--color-accent-2-light)', '#F472B6', '#FBBF24']
    : ['var(--color-accent)', 'var(--color-accent-2)', '#EC4899', '#F59E0B'];

  return (
    <>
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <div className="w-16 h-1 mx-auto mb-6 rounded-full" style={{ background: 'linear-gradient(to right, transparent, var(--color-accent), transparent)' }} />
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 tracking-tight text-[var(--color-text)]">Our Impact in Numbers</h2>
            <p className="text-lg max-w-2xl mx-auto text-[var(--color-text-secondary)]">Real results from real partnerships. Watch how we transform digital presence for businesses like yours.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {kpiData.map((kpi, index) => (
              <motion.div key={index} custom={index} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative group">
                <motion.div className="relative p-8 rounded-2xl glass-card" whileHover={{ boxShadow: '0 0 30px var(--glow-primary)', y: -5 }} transition={{ duration: 0.3 }}>
                  <div className="text-5xl md:text-6xl font-bold mb-1 font-display" style={{ color: statColors[index] }}>{kpi.value}</div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-bold text-green-400">{kpi.delta}</span>
                    <span className="text-base font-semibold text-green-400">{kpi.deltaPercent}</span>
                  </div>
                  <h3 className="text-xs md:text-sm font-bold tracking-widest mb-4 text-[var(--color-text-secondary)]" style={{ fontFamily: 'monospace', letterSpacing: '0.15em' }}>{kpi.label}</h3>
                  <div className="h-0.5 rounded-full overflow-hidden" style={{ background: 'color-mix(in srgb, var(--color-text-secondary) 10%, transparent)' }}>
                    <motion.div className="h-full rounded-full" style={{ background: statColors[index] }} initial={{ width: 0 }} whileInView={{ width: `${kpi.progress}%` }} transition={{ delay: index * 0.1 + 0.6, duration: 0.8, ease: 'easeOut' }} viewport={{ once: true }} />
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.div className="flex justify-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }} viewport={{ once: true }}>
            <motion.button onClick={() => setIsModalOpen(true)} className="btn-outline px-8 py-3 rounded-xl font-medium" whileHover={{ scale: 1.05, boxShadow: '0 0 20px var(--glow-primary)' }} whileTap={{ scale: 0.95 }}>
              View Case Studies & Outcomes
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Outcomes Modal */}
      <motion.div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${isModalOpen ? 'pointer-events-auto' : 'pointer-events-none'}`} initial={{ opacity: 0 }} animate={{ opacity: isModalOpen ? 1 : 0 }} transition={{ duration: 0.3 }} onClick={() => setIsModalOpen(false)}>
        <div className="absolute inset-0" style={{ background: isDarkMode ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.5)' }} />
        <motion.div className="relative max-w-2xl w-full max-h-[80vh] overflow-y-auto rounded-2xl glass-card" initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: isModalOpen ? 1 : 0, scale: isModalOpen ? 1 : 0.9, y: isModalOpen ? 0 : 20 }} transition={{ duration: 0.3 }} onClick={(e) => e.stopPropagation()}>
          <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 p-2 rounded-lg transition-colors hover:bg-[var(--color-bg-elevated)] accent-text" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <div className="p-8 border-b" style={{ borderColor: 'var(--color-border)' }}>
            <h2 className="font-display text-3xl font-bold mb-2 text-[var(--color-text)]">Case Studies & Success Outcomes</h2>
            <p className="text-[var(--color-text-secondary)]">Discover how our clients achieved remarkable results</p>
          </div>
          <div className="p-8 space-y-6">
            {[
              { title: 'E-Commerce Platform Redesign', result: '+287% Revenue', desc: 'Complete website overhaul with modern design, improved UX, and optimized checkout flow resulted in significantly higher conversion rates and customer satisfaction.', tags: ['Web Design', 'UX Optimization', 'SEO'] },
              { title: 'Social Media Growth Strategy', result: '+540% Engagement', desc: 'Strategic content creation, audience targeting, and community management led to massive organic growth and stronger brand loyalty.', tags: ['Social Media', 'Content Strategy', 'Community'] },
              { title: 'SEO & Content Marketing Overhaul', result: '+420% Organic Traffic', desc: 'In-depth keyword research, technical SEO improvements, and quality content creation pushed rankings to the first page for high-intent keywords.', tags: ['SEO', 'Content', 'Technical'] },
            ].map((study, i) => (
              <div key={i} className="p-6 rounded-lg border glass-card" style={{ borderColor: 'var(--color-border)' }}>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-[var(--color-text)]">{study.title}</h3>
                  <span className="text-green-400 font-bold text-sm">{study.result}</span>
                </div>
                <p className="text-sm mb-4 text-[var(--color-text-secondary)]">{study.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {study.tags.map(tag => <span key={tag} className="text-xs px-3 py-1 rounded-full accent-text" style={{ background: 'color-mix(in srgb, var(--color-accent) 15%, transparent)' }}>{tag}</span>)}
                </div>
              </div>
            ))}
            <motion.button className="btn-outline w-full py-3 rounded-xl font-medium" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>Start Your Success Story</motion.button>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
