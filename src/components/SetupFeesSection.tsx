import React from 'react';
import { motion } from 'framer-motion';
import { SetupFeeCard } from './SetupFeeCard';
import { useTheme } from '../contexts/ThemeContext';

export function SetupFeesSection() {
  const { isDarkMode } = useTheme();

  const setupFees = {
    title: "Initial Setup",
    description: "One-time fee covering website, social media, SEO, and initial content creation",
    items: [
      { name: "Website Setup", price: "$150 - $300", note: "depending on complexity" },
      { name: "Social Media Setup", price: "$100 - $200", note: "includes account creation and initial posts" },
      { name: "SEO & Google My Business", price: "$100 - $200", note: null },
    ]
  };

  const additionalServices = {
    title: "Additional Services",
    description: "À la carte services for specific needs",
    items: [
      { name: "Promotional Posters", price: "$50 - $100", note: "per poster, varies with complexity" },
      { name: "Event Content Creation", price: "$75 - $150", note: "per event, includes all materials" }
    ]
  };

  return (
    <div className="relative py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 className="font-display text-4xl font-bold mb-4 tracking-tight text-[var(--color-text)]" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>Flexible Options</motion.h2>
          <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto text-lg">Transparent pricing structure designed to fit your needs</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <SetupFeeCard {...setupFees} />
          <SetupFeeCard {...additionalServices} />
        </div>
      </div>
    </div>
  );
}
