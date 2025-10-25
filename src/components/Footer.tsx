import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Linkedin, Rocket, ExternalLink } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function Footer() {
  const { isDarkMode } = useTheme();

  const socialLinks = [
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://instagram.com/',
      color: isDarkMode ? '#E4405F' : '#E4405F'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: 'https://facebook.com/abu.hamdan.7731',
      color: isDarkMode ? '#1877F2' : '#1877F2'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/abuhamdan-cs',
      color: isDarkMode ? '#0A66C2' : '#0A66C2'
    }
  ];

  return (
    <footer className={`relative py-16 border-t ${
      isDarkMode 
        ? 'bg-[#0A0B14] border-[#00F5FF]/10'
        : 'bg-[#F9FAFB] border-[#3B82F6]/10'
    }`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 cyber-grid opacity-20" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-8">
          
          {/* Social Media Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className={`text-lg ${
              isDarkMode ? 'text-[#E2E2E2]' : 'text-[#4B5563]'
            }`}>
              Follow our journey on Instagram, Facebook, and LinkedIn.
            </p>
            
            <div className="flex justify-center items-center gap-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative p-4 rounded-full border transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-[#0D0B1F]/60 border-[#00F5FF]/20 hover:border-[#00F5FF]/50'
                      : 'bg-white border-[#3B82F6]/20 hover:border-[#3B82F6]/50 shadow-md hover:shadow-lg'
                  }`}
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: isDarkMode 
                      ? '0 0 20px rgba(0, 245, 255, 0.3)'
                      : '0 0 20px rgba(59, 130, 246, 0.3)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle, ${social.color}20, transparent 70%)`,
                      filter: 'blur(8px)'
                    }}
                  />
                  
                  <social.icon 
                    className={`w-6 h-6 relative z-10 transition-colors duration-300 ${
                      isDarkMode ? 'text-[#00F5FF]' : 'text-[#3B82F6]'
                    } group-hover:text-[${social.color}]`}
                    style={{ color: 'inherit' }}
                  />
                  
                  {/* Tooltip */}
                  <div className={`absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none ${
                    isDarkMode 
                      ? 'bg-[#0D0B1F] text-[#00F5FF] border border-[#00F5FF]/30'
                      : 'bg-white text-[#3B82F6] border border-[#3B82F6]/30 shadow-lg'
                  }`}>
                    {social.name}
                    <div className={`absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent ${
                      isDarkMode ? 'border-t-[#0D0B1F]' : 'border-t-white'
                    }`} />
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className={`w-24 h-1 mx-auto rounded-full ${
              isDarkMode 
                ? 'bg-gradient-to-r from-[#00F5FF]/30 via-[#00F5FF] to-[#00F5FF]/30'
                : 'bg-gradient-to-r from-[#3B82F6]/30 via-[#3B82F6] to-[#3B82F6]/30'
            }`}
          />

          {/* Careers Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center justify-center gap-3">
              <Rocket className={`w-6 h-6 ${
                isDarkMode ? 'text-[#00F5FF]' : 'text-[#3B82F6]'
              }`} />
              <p className={`text-lg ${
                isDarkMode ? 'text-[#E2E2E2]' : 'text-[#4B5563]'
              }`}>
                <span className={`font-semibold ${
                  isDarkMode ? 'text-[#00F5FF]' : 'text-[#3B82F6]'
                }`}>
                  Careers at WebHub
                </span>
                {' — '}
                Passionate about digital? Join our team.
              </p>
            </div>
            
            <motion.a
              href="/careers"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg border font-medium transition-all duration-200 group ${
                isDarkMode 
                  ? 'bg-[#0D0B1F]/60 border-[#00F5FF]/30 text-[#00F5FF] hover:bg-[#00F5FF]/10 hover:border-[#00F5FF]/50'
                  : 'bg-white border-[#3B82F6]/30 text-[#3B82F6] hover:bg-[#3B82F6]/10 hover:border-[#3B82F6]/50 shadow-md hover:shadow-lg'
              }`}
              whileHover={{ 
                scale: 1.05,
                boxShadow: isDarkMode 
                  ? '0 0 20px rgba(0, 245, 255, 0.3)'
                  : '0 0 20px rgba(59, 130, 246, 0.3)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Join Our Team</span>
              <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </motion.a>
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className={`pt-8 border-t text-sm ${
              isDarkMode 
                ? 'border-[#00F5FF]/10 text-[#E2E2E2]/60'
                : 'border-[#3B82F6]/10 text-[#6B7280]'
            }`}
          >
            <p>© 2024 WebHub. All rights reserved.</p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}