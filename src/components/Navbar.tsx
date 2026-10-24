import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { ContactButton } from './buttons/ContactButton';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section && location.pathname === '/') {
      section.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = `/#${sectionId}`;
    }
  };

  const navLinks = [
    { label: 'Services', id: 'services' },
    { label: 'Pricing', id: 'pricing' },
    { label: 'Careers', href: '/careers' },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent opacity-60" />

      <motion.nav
        className={`fixed top-0.5 left-0 right-0 z-50 transition-all duration-400 ${
          isScrolled
            ? isDarkMode
              ? 'bg-[#0A0F1C]/80 backdrop-blur-xl border-b border-[var(--color-border)]'
              : 'bg-white/80 backdrop-blur-xl border-b border-[var(--color-border)] shadow-sm'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative w-9 h-9 preserve-3d">
                <div
                  className="absolute inset-0 rounded-lg btn-accent flex items-center justify-center text-white font-bold text-lg font-display"
                  style={{ background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-2))' }}
                >
                  W
                </div>
                <div
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"
                  style={{ background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-2))' }}
                />
              </div>
              <span className="font-display text-xl font-bold tracking-tight text-[var(--color-text)]">
                WebHub
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) =>
                link.href ? (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="relative text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors duration-200 group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-accent to-accent-2 transition-all duration-300 group-hover:w-full" />
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={`#${link.id}`}
                    onClick={(e) => handleSectionClick(e, link.id!)}
                    className="relative text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors duration-200 group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-accent to-accent-2 transition-all duration-300 group-hover:w-full" />
                  </a>
                )
              )}

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="relative p-2 rounded-lg border transition-all duration-200 hover:scale-110"
                style={{
                  background: 'var(--color-bg-surface)',
                  borderColor: 'var(--color-border-strong)',
                  color: 'var(--color-accent-light)',
                }}
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                aria-label="Toggle theme"
              >
                <motion.div
                  animate={{ rotate: isDarkMode ? 0 : 180 }}
                  transition={{ duration: 0.4 }}
                  key={isDarkMode ? 'sun' : 'moon'}
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </motion.div>
              </button>

              <Link to="/contact">
                <ContactButton isScrolled={isScrolled} />
              </Link>
            </div>

            {/* Mobile */}
            <div className="flex lg:hidden items-center gap-3">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg border"
                style={{
                  background: 'var(--color-bg-surface)',
                  borderColor: 'var(--color-border-strong)',
                  color: 'var(--color-accent-light)',
                }}
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg border"
                style={{
                  background: 'var(--color-bg-surface)',
                  borderColor: 'var(--color-border-strong)',
                  color: 'var(--color-text)',
                }}
                aria-label="Menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden border-t"
              style={{
                background: isDarkMode ? 'rgba(10, 15, 28, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                borderColor: 'var(--color-border)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <div className="px-4 py-4 space-y-3">
                {navLinks.map((link) =>
                  link.href ? (
                    <Link
                      key={link.label}
                      to={link.href}
                      className="block px-4 py-3 rounded-lg text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-elevated)] transition-all"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      key={link.label}
                      href={`#${link.id}`}
                      onClick={(e) => {
                        handleSectionClick(e, link.id!);
                        setIsMobileMenuOpen(false);
                      }}
                      className="block px-4 py-3 rounded-lg text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-elevated)] transition-all"
                    >
                      {link.label}
                    </a>
                  )
                )}
                <Link to="/contact" className="block px-4 py-3">
                  <ContactButton isScrolled={true} />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
