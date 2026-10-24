import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ServicesGrid } from '../components/ServicesGrid';
import { PricingSection } from '../components/PricingSection';
import { SetupFeesSection } from '../components/SetupFeesSection';
import { ScrollIndicator } from '../components/ScrollIndicator';
import { Footer } from '../components/Footer';
import { KPIStatsSection } from '../components/KPIStatsSection';
import { InfographicsStatsStrip } from '../components/InfographicsStatsStrip';
import { Hero3D } from '../components/Hero3D';
import { services } from '../data/services';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export function HomePage() {
  const navigate = useNavigate();

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      const yOffset = -80;
      const y = servicesSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleLaunchClick = () => navigate('/project-form');
  const handleCTAClick = () => navigate('/project-form');

  return (
    <>
      {/* Hero Section with 3D */}
      <div className="relative overflow-hidden pt-24 min-h-screen flex items-center mesh-bg">
        <div className="absolute inset-0 cyber-grid opacity-40" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                style={{
                  background: 'var(--color-bg-surface)',
                  border: '1px solid var(--color-border-strong)',
                }}
              >
                <Sparkles className="w-4 h-4 accent-text" />
                <span className="text-sm font-medium text-[var(--color-text-secondary)]">
                  Digital experiences that shine
                </span>
              </motion.div>

              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1] tracking-tight">
                <span className="text-[var(--color-text)]">Welcome to </span>
                <span
                  className="bg-clip-text text-transparent"
                  style={{ background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-2))', WebkitBackgroundClip: 'text' }}
                >
                  WebHub
                </span>
              </h1>

              <p
                className="text-xl md:text-2xl font-medium mb-4"
                style={{ color: 'var(--color-accent-light)' }}
              >
                Making Your Business Shine Online
              </p>

              <p className="text-lg text-[var(--color-text-secondary)] mb-10 max-w-xl leading-relaxed">
                We specialize in enhancing your business's online presence through custom website design,
                social media management, SEO, content creation, and online reputation management.
              </p>

              <div className="flex flex-wrap gap-4">
                <motion.button
                  onClick={handleLaunchClick}
                  className="btn-accent px-6 py-3.5 rounded-xl font-semibold text-base flex items-center gap-2"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Launch Your Project
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
                <motion.button
                  onClick={scrollToServices}
                  className="btn-outline px-6 py-3.5 rounded-xl font-semibold text-base"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Explore Services
                </motion.button>
              </div>
            </motion.div>

            {/* Right: 3D Hero */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Hero3D />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div
              className="w-16 h-1 mx-auto mb-6 rounded-full"
              style={{ background: 'linear-gradient(to right, transparent, var(--color-accent), transparent)' }}
            />
            <p className="text-lg font-medium text-[var(--color-text-secondary)]">
              Discover our comprehensive digital solutions
            </p>
          </motion.div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-16" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
          <div className="text-center mb-12">
            <motion.h2
              className="font-display text-4xl md:text-5xl font-bold mb-4 tracking-tight text-[var(--color-text)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Digital Evolution Services
            </motion.h2>
            <motion.p
              className="max-w-2xl mx-auto text-[var(--color-text-secondary)] text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
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
      <InfographicsStatsStrip />

      {/* CTA */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-30" />
        <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 tracking-tight text-[var(--color-text)]">
            Ready to Transform Your Digital Presence?
          </h2>
          <p className="mb-8 text-lg text-[var(--color-text-secondary)]">
            Let's create something extraordinary together.
          </p>
          <motion.button
            onClick={handleCTAClick}
            className="btn-accent px-8 py-4 rounded-xl font-semibold text-lg flex items-center gap-2 mx-auto"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            Initialize Project
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      <ScrollIndicator onClick={scrollToServices} />
      <KPIStatsSection />
      <Footer />
    </>
  );
}
