import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Linkedin, Rocket, ExternalLink } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function Footer() {
  const { isDarkMode } = useTheme();

  const socialLinks = [
    { name: 'Instagram', icon: Instagram, url: 'https://instagram.com/' },
    { name: 'Facebook', icon: Facebook, url: 'https://facebook.com/abu.hamdan.7731' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/abuhamdan-cs' },
  ];

  return (
    <footer className="relative py-16 border-t" style={{ background: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="space-y-6">
            <p className="text-lg text-[var(--color-text-secondary)]">Follow our journey on Instagram, Facebook, and LinkedIn.</p>
            <div className="flex justify-center items-center gap-6">
              {socialLinks.map((social, index) => (
                <motion.a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="group relative p-4 rounded-full border transition-all duration-300 glass-card" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1, duration: 0.5 }} viewport={{ once: true }}>
                  <social.icon className="w-6 h-6 relative z-10 accent-text transition-colors duration-300" />
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none glass-card">{social.name}</div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <div className="w-24 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(to right, transparent, var(--color-accent), transparent)' }} />

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} viewport={{ once: true }} className="space-y-4">
            <div className="flex items-center justify-center gap-3">
              <Rocket className="w-6 h-6 accent-text" />
              <p className="text-lg text-[var(--color-text-secondary)]">
                <span className="font-semibold accent-text">Careers at WebHub</span> — Passionate about digital? Join our team.
              </p>
            </div>
            <motion.a href="/careers" className="btn-outline inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 group" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <span>Join Our Team</span>
              <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </motion.a>
          </motion.div>

          <div className="pt-8 border-t text-sm text-[var(--color-text-muted)]" style={{ borderColor: 'var(--color-border)' }}>
            <p>&copy; 2024 WebHub. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
