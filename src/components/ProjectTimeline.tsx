import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { Search } from 'lucide-react';

interface TimelinePhase { week: string; title: string; description: string; status: 'done' | 'active' | 'future'; progress: number; }

const phases: TimelinePhase[] = [
  { week: 'Week 1', title: 'Discovery', description: 'Understanding your business goals, target audience, and project requirements', status: 'done', progress: 0 },
  { week: 'Week 2', title: 'Strategy', description: 'Developing comprehensive strategy and project roadmap', status: 'done', progress: 20 },
  { week: 'Week 3-4', title: 'Design', description: 'Creating wireframes, mockups, and design prototypes', status: 'done', progress: 40 },
  { week: 'Week 5-6', title: 'Build', description: 'Development and implementation of your project (Currently Active)', status: 'active', progress: 55 },
  { week: 'Week 7', title: 'Review', description: 'Testing, feedback collection, and refinements', status: 'future', progress: 70 },
  { week: 'Week 8', title: 'Launch', description: 'Final deployment and go-live', status: 'future', progress: 100 },
];

export function ProjectTimeline() {
  const { isDarkMode } = useTheme();
  const [hoveredPhase, setHoveredPhase] = useState<number | null>(null);
  const [searchInput, setSearchInput] = useState('');
  const [highlightedPhase, setHighlightedPhase] = useState<number | null>(null);

  const getCurrentProgress = () => {
    if (highlightedPhase !== null && highlightedPhase >= 0 && highlightedPhase < phases.length) {
      return `${phases[highlightedPhase].progress}%`;
    }
    return '55%';
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = searchInput.toLowerCase().trim();
    const demoMatch = input.match(/demo\s*(\d+)/);
    if (demoMatch) {
      const phaseNumber = parseInt(demoMatch[1]) - 1;
      if (phaseNumber >= 0 && phaseNumber < phases.length) {
        setHighlightedPhase(phaseNumber);
        setTimeout(() => {
          const element = document.getElementById(`phase-${phaseNumber}`);
          if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 tracking-tight text-[var(--color-text)]">Project Timeline</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8 text-[var(--color-text-secondary)]">Track your project progress through our 8-week delivery timeline</p>
          <motion.form onSubmit={handleSearchSubmit} className="max-w-md mx-auto" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} viewport={{ once: true }}>
            <div className="relative flex items-center gap-2">
              <div className="flex-1 relative rounded-lg border glass-card" style={{ borderColor: 'var(--color-border-strong)' }}>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: 'var(--color-text-muted)' }} />
                <input type="text" placeholder="Enter: demo 1-6" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} className="w-full pl-10 pr-4 py-2 rounded-lg border-0 transition-all text-sm bg-transparent text-[var(--color-text)] focus:outline-none" />
              </div>
              <motion.button type="submit" className="btn-outline px-4 py-2 rounded-lg font-medium" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Search</motion.button>
            </div>
            <p className="text-xs mt-2 text-[var(--color-text-muted)]">Try "demo 1", "demo 2", etc. to see project phases</p>
          </motion.form>
        </motion.div>

        <motion.div className="relative rounded-2xl p-12 border glass-card" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <div className="relative flex items-center justify-between mb-16">
            <div className="absolute top-1/2 left-0 right-0 h-1 rounded-full transform -translate-y-1/2" style={{ background: 'color-mix(in srgb, var(--color-text-secondary) 10%, transparent)' }} />
            <motion.div className="absolute top-1/2 left-0 h-1 rounded-full transform -translate-y-1/2" style={{ background: 'linear-gradient(to right, var(--color-accent), var(--color-accent-2))' }} initial={{ width: 0 }} animate={{ width: getCurrentProgress() }} transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }} />
            {phases.map((phase, index) => {
              const isHovered = hoveredPhase === index;
              const isHighlighted = highlightedPhase === index;
              return (
                <motion.div key={index} id={`phase-${index}`} className="relative z-20 flex flex-col items-center group cursor-pointer" onMouseEnter={() => setHoveredPhase(index)} onMouseLeave={() => setHoveredPhase(null)} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }} viewport={{ once: true }}>
                  <motion.div className="w-6 h-6 rounded-full border-2 relative z-10 transition-all duration-300" style={{ background: phase.status === 'future' ? 'transparent' : 'var(--color-accent)', borderColor: phase.status === 'future' ? 'var(--color-border-strong)' : 'var(--color-accent)', boxShadow: (phase.status === 'active' && (isHovered || isHighlighted)) ? '0 0 20px var(--glow-primary)' : phase.status === 'active' ? '0 0 10px var(--glow-primary)' : 'none' }} whileHover={{ scale: 1.3 }}>
                    {phase.status === 'done' && <svg className="w-4 h-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" fill="white" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                  </motion.div>
                  <div className="mt-12 text-center" style={{ transform: (isHovered || isHighlighted) ? 'translateY(-5px)' : 'none', transition: 'transform 0.2s' }}>
                    <p className="text-xs font-bold tracking-widest mb-1" style={{ color: isHighlighted ? 'var(--color-accent-2-light)' : 'var(--color-accent-light)', letterSpacing: '0.1em' }}>{phase.week}</p>
                    <p className="text-sm font-bold" style={{ color: (isHovered || isHighlighted) ? 'var(--color-text)' : 'var(--color-text-secondary)' }}>{phase.title}</p>
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: (isHovered || isHighlighted) ? 1 : 0, y: (isHovered || isHighlighted) ? 0 : -10 }} transition={{ duration: 0.2 }} className="absolute top-full mt-4 left-1/2 transform -translate-x-1/2 z-50 px-4 py-3 rounded-lg glass-card whitespace-nowrap" style={{ pointerEvents: 'none' }}>
                      <p className="text-xs font-medium text-[var(--color-text-secondary)]">{phase.description}</p>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-16 pt-8 border-t flex flex-wrap justify-center gap-6 md:gap-12" style={{ borderColor: 'var(--color-border)' }}>
            {[
              { label: 'Completed', color: 'var(--color-accent)', bg: 'var(--color-accent)' },
              { label: 'In Progress', color: 'var(--color-accent-2-light)', bg: 'var(--color-accent-2-light)' },
              { label: 'Upcoming', color: 'transparent', bg: 'transparent' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full border-2" style={{ background: item.bg, borderColor: item.color === 'transparent' ? 'var(--color-border-strong)' : item.color }} />
                <span className="text-sm font-medium text-[var(--color-text-secondary)]">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
