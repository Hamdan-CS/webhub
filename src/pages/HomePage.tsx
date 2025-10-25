import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { ServicesGrid } from '../components/ServicesGrid';
import { PricingSection } from '../components/PricingSection';
import { SetupFeesSection } from '../components/SetupFeesSection';
import { CTAButton } from '../components/CTAButton';
import { ScrollIndicator } from '../components/ScrollIndicator';
import { Footer } from '../components/Footer';
import { services } from '../data/services';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

export function HomePage() {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      const yOffset = -80; // Account for navbar height
      const y = servicesSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleLaunchClick = () => {
    console.log('Launch button clicked!'); // Debug log
    navigate('/project-form');
  };

  const handleCTAClick = () => {
    console.log('CTA button clicked!'); // Debug log
    navigate('/project-form');
  };

  return (
    <>
      {/* Hero Section - First Page */}
      <div className={`relative overflow-hidden pt-60 min-h-screen flex items-center ${
        isDarkMode 
          ? 'bg-gradient-to-br from-[#00F5FF]/10 via-[#40E0D0]/5 to-[#00F5FF]/10'
          : 'bg-gradient-to-br from-[#3B82F6]/5 via-[#60A5FA]/3 to-[#3B82F6]/5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div 
            className="text-center relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className={`text-5xl md:text-7xl font-bold mb-6 ${
                isDarkMode ? 'neon-glow text-white' : 'neon-glow text-[#1F2937]'
              }`}
              animate={{ 
                textShadow: isDarkMode 
                  ? [
                      "0 0 5px rgba(0, 245, 255, 0.5)",
                      "0 0 15px rgba(0, 245, 255, 0.5)",
                      "0 0 5px rgba(0, 245, 255, 0.5)"
                    ]
                  : [
                      "0 0 5px rgba(59, 130, 246, 0.3)",
                      "0 0 15px rgba(59, 130, 246, 0.3)",
                      "0 0 5px rgba(59, 130, 246, 0.3)"
                    ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Welcome to WebHub
            </motion.h1>
            <motion.p 
              className={`text-2xl md:text-3xl font-poppins mb-4 ${
                isDarkMode ? 'text-[#00F5FF]' : 'text-[#3B82F6]'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Making Your Business Shine Online
            </motion.p>
            <motion.p 
              className={`text-xl md:text-2xl font-rubnik mb-10 max-w-3xl mx-auto ${
                isDarkMode ? 'text-[#E2E2E2]' : 'text-[#4B5563]'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              We specialize in enhancing your business's online presence through custom website design, 
              social media management, SEO, content creation, and online reputation management. 
              Our mission is to help businesses like yours connect with customers, boost visibility, 
              and achieve growth in the digital landscape.
            </motion.p>
            <div className="flex gap-4 justify-center">
              <motion.button
                onClick={handleLaunchClick}
                className={`relative px-6 py-3 rounded-lg font-medium text-lg overflow-hidden group border transition-all duration-200 ${
                  isDarkMode 
                    ? 'bg-[#0D0B1F] border-[#00F5FF]/30 text-white hover:bg-[#00F5FF]/10'
                    : 'bg-white border-[#3B82F6]/30 text-[#3B82F6] hover:bg-[#3B82F6]/10 shadow-lg'
                }`}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: isDarkMode 
                    ? '0 0 20px rgba(0, 245, 255, 0.3)'
                    : '0 0 20px rgba(59, 130, 246, 0.3)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Launch Your Project</span>
              </motion.button>
              <motion.button
                onClick={scrollToServices}
                className={`relative px-6 py-3 rounded-lg font-medium text-lg overflow-hidden group border transition-all duration-200 ${
                  isDarkMode 
                    ? 'bg-[#0D0B1F] border-[#00F5FF]/30 text-white hover:bg-[#00F5FF]/10'
                    : 'bg-white border-[#3B82F6]/30 text-[#3B82F6] hover:bg-[#3B82F6]/10 shadow-lg'
                }`}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: isDarkMode 
                    ? '0 0 20px rgba(0, 245, 255, 0.3)'
                    : '0 0 20px rgba(59, 130, 246, 0.3)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span>Explore Services</span>
                </span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Spacer Section - Creates breathing room between hero and services */}
      <div className={`py-32 ${
        isDarkMode 
          ? 'bg-gradient-to-b from-[#0A0B14] to-[#0A0B14]/95'
          : 'bg-gradient-to-b from-white to-[#F9FAFB]'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className={`w-24 h-1 mx-auto mb-8 rounded-full ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-[#00F5FF]/30 via-[#00F5FF] to-[#00F5FF]/30'
                  : 'bg-gradient-to-r from-[#3B82F6]/30 via-[#3B82F6] to-[#3B82F6]/30'
              }`}
              animate={{
                scaleX: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.p 
              className={`text-lg font-medium ${
                isDarkMode ? 'text-[#E2E2E2]/80' : 'text-[#4B5563]'
              }`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Discover our comprehensive digital solutions
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Services Section */}
      <div className={`py-20 ${
        isDarkMode 
          ? 'bg-[#0A0B14]/95'
          : 'bg-[#F9FAFB]'
      }`} id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
          <div className="text-center mb-16">
            <motion.h2 
              className={`text-4xl font-bold mb-4 ${
                isDarkMode ? 'neon-glow text-white' : 'neon-glow text-[#1F2937]'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Digital Evolution Services
            </motion.h2>
            <motion.p 
              className={`max-w-2xl mx-auto ${
                isDarkMode ? 'text-[#E2E2E2]' : 'text-[#4B5563]'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              Future-proof solutions designed to elevate your digital presence beyond imagination.
            </motion.p>
          </div>
          <ServicesGrid services={services} />
        </div>
      </div>

      <SetupFeesSection />
      <PricingSection />

      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-30" />
        <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${
            isDarkMode ? 'neon-glow text-white' : 'neon-glow text-[#1F2937]'
          }`}>
            Ready to Transform Your Digital Presence?
          </h2>
          <p className={`mb-8 ${
            isDarkMode ? 'text-[#E2E2E2]' : 'text-[#4B5563]'
          }`}>
            Let's create something extraordinary together.
          </p>
          <motion.button
            onClick={handleCTAClick}
            className={`relative group px-8 py-4 rounded-lg border font-medium transition-all duration-200 ${
              isDarkMode 
                ? 'bg-[#0D0B1F] border-[#00F5FF]/30 text-[#00F5FF] hover:bg-[#00F5FF]/10'
                : 'bg-white border-[#3B82F6]/30 text-[#3B82F6] hover:bg-[#3B82F6]/10 shadow-lg'
            }`}
            whileHover={{ 
              scale: 1.05,
              boxShadow: isDarkMode 
                ? '0 0 20px rgba(0, 245, 255, 0.3)'
                : '0 0 20px rgba(59, 130, 246, 0.3)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Initialize Project</span>
          </motion.button>
        </div>
      </div>

      {/* Scroll Indicator - Only shows after scrolling past first page */}
      <ScrollIndicator onClick={scrollToServices} />
      
      {/* Footer */}
      <Footer />
    </>
  );
}