import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MessageSquare, Globe2, MessageCircle, Search, Shield, PenTool } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { submitContactForm } from '../services/contactApi';
import { ProjectTimeline } from '../components/ProjectTimeline';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '', email: '', topic: '', message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { isDarkMode } = useTheme();

  const serviceDetails = {
    'Website Development': {
      icon: Globe2,
      description: "Custom-built responsive websites that perfectly capture your brand's essence",
      features: ["Custom-built responsive websites", "Mobile-friendly design", "E-commerce integration", "Regular maintenance and updates"]
    },
    'Social Media Management': {
      icon: MessageCircle,
      description: "Strategic social media presence across all major platforms",
      features: ["Content creation and scheduling", "Community engagement", "Performance analytics", "Multi-platform management"]
    },
    'SEO Services': {
      icon: Search,
      description: "Boost your visibility and reach your target audience",
      features: ["Keyword optimization", "Local SEO", "Google My Business management", "Performance tracking"]
    },
    'Content Creation': {
      icon: PenTool,
      description: "Engaging content that tells your brand's story",
      features: ["Professional photography", "Video production", "Blog writing", "Graphic design"]
    },
    'Online Reputation Management': {
      icon: Shield,
      description: "Build and maintain a stellar online presence",
      features: ["Review management", "Brand monitoring", "Response strategy", "Reputation building"]
    }
  };

  const topics = [
    'Website Development', 'Social Media Management', 'SEO Services',
    'Content Creation', 'Online Reputation Management', 'General Inquiry'
  ];

  const inputClass = isDarkMode
    ? 'w-full px-4 py-3 rounded-xl bg-[var(--color-bg)] border text-[var(--color-text)] focus:ring-2 transition-all'
    : 'w-full px-4 py-3 rounded-xl bg-[var(--color-bg-elevated)] border text-[var(--color-text)] focus:ring-2 transition-all';

  const inputStyle = { borderColor: 'var(--color-border-strong)' };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitContactForm({
        name: formData.name, email: formData.email, topic: formData.topic, message: formData.message,
      });
      setIsSubmitted(true);
      setTimeout(() => {
        setFormData({ name: '', email: '', topic: '', message: '' });
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error submitting form. Please try again.';
      alert(message);
    }
  };

  const selectedService = formData.topic !== 'General Inquiry' && formData.topic !== '' ? serviceDetails[formData.topic as keyof typeof serviceDetails] : null;

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="glass-card p-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
            style={{ background: 'color-mix(in srgb, var(--color-accent) 15%, transparent)' }}
          >
            <Send className="w-10 h-10 accent-text" />
          </motion.div>
          <h2 className="font-display text-3xl font-bold mb-4 accent-text">Message Sent Successfully!</h2>
          <p className="text-lg mb-8 text-[var(--color-text-secondary)]">
            Thanks for reaching out. We'll get back to you soon!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsSubmitted(false)}
            className="btn-outline px-6 py-3 rounded-xl font-medium"
          >
            Send Another Message
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
              style={{ background: 'color-mix(in srgb, var(--color-accent) 15%, transparent)' }}
            >
              <MessageSquare className="w-8 h-8 accent-text" />
            </motion.div>
            <h1 className="font-display text-4xl font-bold mb-4 tracking-tight text-[var(--color-text)]">
              Get in Touch
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)]">
              Have a question or ready to start your digital journey? We're here to help.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <label className="block mb-2 text-sm font-medium accent-text" htmlFor="name">Name</label>
              <input type="text" id="name" className={inputClass} style={inputStyle} placeholder="Your name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <label className="block mb-2 text-sm font-medium accent-text" htmlFor="email">Email</label>
              <input type="email" id="email" className={inputClass} style={inputStyle} placeholder="your.email@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <label className="block mb-2 text-sm font-medium accent-text" htmlFor="topic">Topic</label>
              <select id="topic" className={inputClass} style={inputStyle} value={formData.topic} onChange={(e) => setFormData({ ...formData, topic: e.target.value })} required>
                <option value="">Select a topic</option>
                {topics.map((topic) => <option key={topic} value={topic}>{topic}</option>)}
              </select>
            </motion.div>

            <AnimatePresence mode="wait">
              {selectedService && (
                <motion.div
                  key={formData.topic}
                  initial={{ opacity: 0, height: 0, y: -20 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-xl p-6 border"
                  style={{ background: 'var(--color-bg-elevated)', borderColor: 'var(--color-border-strong)' }}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg" style={{ background: 'color-mix(in srgb, var(--color-accent) 12%, transparent)' }}>
                      {selectedService && <selectedService.icon className="w-6 h-6 accent-text" />}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 accent-text">{formData.topic}</h3>
                      <p className="mb-4 text-[var(--color-text-secondary)]">{selectedService.description}</p>
                      <ul className="space-y-2">
                        {selectedService.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                            <span className="w-1.5 h-1.5 rounded-full accent-text" style={{ background: 'var(--color-accent)' }} />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
              <label className="block mb-2 text-sm font-medium accent-text" htmlFor="message">Message</label>
              <textarea id="message" rows={6} className={`${inputClass} resize-none`} style={inputStyle} placeholder="Tell us about your project or question..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required />
            </motion.div>

            <motion.button
              type="submit"
              className="btn-accent w-full px-6 py-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 group"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <span>Send Message</span>
              <Send className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </form>
        </motion.div>
      </div>
      <ProjectTimeline />
    </div>
  );
}
