import React from 'react';
import { motion } from 'framer-motion';
import { ServiceCard } from './ServiceCard';
import type { Service } from '../types/service';

interface ServicesGridProps {
  services: Service[];
}

export function ServicesGrid({ services }: ServicesGridProps) {
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {services.map((service, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <ServiceCard {...service} />
        </motion.div>
      ))}
    </motion.div>
  );
}