import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ContactButton } from './buttons/ContactButton';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section && location.pathname === '/') {
      section.scrollIntoView({ behavior: 'smooth' });
    } else if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
    }
  };

  return (
    <>
      {/* Top line with theme-aware colors */}
      <div className={`fixed top-0 left-0 right-0 z-[60] h-2 ${
        isDarkMode 
          ? 'bg-gradient-to-r from-[#00FFFF]/30 via-[#00FFFF] to-[#00FFFF]/30'
          : 'bg-gradient-to-r from-[#3B82F6]/30 via-[#3B82F6] to-[#3B82F6]/30'
      }`} />
      
      <motion.nav 
        className={`fixed top-6 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? isDarkMode
              ? 'bg-[#0A0B14]/45 backdrop-blur-md shadow-lg shadow-[#00FFFF]/5 border-b border-[#00FFFF]/10'
              : 'bg-white/80 backdrop-blur-md shadow-lg shadow-black/5 border-b border-[#3B82F6]/10'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/">
              <motion.div 
                className={`text-xl font-bold ${
                  isDarkMode ? 'text-[#00FFFF]' : 'text-[#3B82F6]'
                }`}
                whileHover={{ 
                  scale: 1.05,
                  textShadow: isDarkMode 
                    ? "0 0 8px rgba(0, 255, 255, 0.5)"
                    : "0 0 8px rgba(59, 130, 246, 0.5)"
                }}
              >
                WebHub
              </motion.div>
            </Link>
            
            <div className="flex items-center space-x-8">
              <motion.a
                href="#services"
                onClick={(e) => handleSectionClick(e, 'services')}
                className={`relative transition-colors ${
                  isDarkMode ? 'text-[#00FFFF]' : 'text-[#3B82F6]'
                }`}
                whileHover={{ 
                  scale: 1.1,
                  textShadow: isDarkMode 
                    ? "0 0 8px rgba(0, 255, 255, 0.5)"
                    : "0 0 8px rgba(59, 130, 246, 0.5)"
                }}
              >
                <span className="relative z-10">Services</span>
                <motion.div
                  className={`absolute -bottom-1 left-0 w-full h-0.5 ${
                    isDarkMode ? 'bg-[#00FFFF]' : 'bg-[#3B82F6]'
                  }`}
                  initial={{ scaleX: 0 }}
                  whileHover={{ 
                    scaleX: 1,
                    boxShadow: isDarkMode 
                      ? "0 0 8px rgba(0, 255, 255, 0.5)"
                      : "0 0 8px rgba(59, 130, 246, 0.5)"
                  }}
                  transition={{ duration: 0.2 }}
                />
              </motion.a>
              <motion.a
                href="#pricing"
                onClick={(e) => handleSectionClick(e, 'pricing')}
                className={`relative transition-colors ${
                  isDarkMode ? 'text-[#00FFFF]' : 'text-[#3B82F6]'
                }`}
                whileHover={{ 
                  scale: 1.1,
                  textShadow: isDarkMode 
                    ? "0 0 8px rgba(0, 255, 255, 0.5)"
                    : "0 0 8px rgba(59, 130, 246, 0.5)"
                }}
              >
                <span className="relative z-10">Pricing</span>
                <motion.div
                  className={`absolute -bottom-1 left-0 w-full h-0.5 ${
                    isDarkMode ? 'bg-[#00FFFF]' : 'bg-[#3B82F6]'
                  }`}
                  initial={{ scaleX: 0 }}
                  whileHover={{ 
                    scaleX: 1,
                    boxShadow: isDarkMode 
                      ? "0 0 8px rgba(0, 255, 255, 0.5)"
                      : "0 0 8px rgba(59, 130, 246, 0.5)"
                  }}
                  transition={{ duration: 0.2 }}
                />
              </motion.a>
              
              {/* Theme Toggle Button */}
              <motion.button
                onClick={toggleTheme}
                className={`relative p-2 rounded-full border transition-all duration-200 ${
                  isDarkMode 
                    ? 'bg-[#0D0B1F]/60 border-[#00FFFF]/30 text-[#00FFFF] hover:bg-[#00FFFF]/10'
                    : 'bg-white/60 border-[#3B82F6]/30 text-[#3B82F6] hover:bg-[#3B82F6]/10 shadow-md'
                }`}
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: isDarkMode 
                    ? "0 0 15px rgba(0, 255, 255, 0.3)"
                    : "0 0 15px rgba(59, 130, 246, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                <motion.div
                  animate={{ rotate: isDarkMode ? 0 : 180 }}
                  transition={{ duration: 0.3 }}
                >
                  {isDarkMode ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </motion.div>
              </motion.button>
              
              <Link to="/contact">
                <ContactButton isScrolled={isScrolled} />
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  );
}