import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MessageSquare, Globe2, MessageCircle, Search, Shield, PenTool } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { isDarkMode } = useTheme();

  const serviceDetails = {
    'Website Development': {
      icon: Globe2,
      description: "Custom-built responsive websites that perfectly capture your brand's essence",
      features: [
        "Custom-built responsive websites",
        "Mobile-friendly design",
        "E-commerce integration",
        "Regular maintenance and updates"
      ]
    },
    'Social Media Management': {
      icon: MessageCircle,
      description: "Strategic social media presence across all major platforms",
      features: [
        "Content creation and scheduling",
        "Community engagement",
        "Performance analytics",
        "Multi-platform management"
      ]
    },
    'SEO Services': {
      icon: Search,
      description: "Boost your visibility and reach your target audience",
      features: [
        "Keyword optimization",
        "Local SEO",
        "Google My Business management",
        "Performance tracking"
      ]
    },
    'Content Creation': {
      icon: PenTool,
      description: "Engaging content that tells your brand's story",
      features: [
        "Professional photography",
        "Video production",
        "Blog writing",
        "Graphic design"
      ]
    },
    'Online Reputation Management': {
      icon: Shield,
      description: "Build and maintain a stellar online presence",
      features: [
        "Review management",
        "Brand monitoring",
        "Response strategy",
        "Reputation building"
      ]
    }
  };

  const topics = [
    'Website Development',
    'Social Media Management',
    'SEO Services',
    'Content Creation',
    'Online Reputation Management',
    'General Inquiry'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Reset form after submission
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        topic: '',
        message: ''
      });
    }, 500);
  };

  const selectedService = formData.topic !== 'General Inquiry' ? serviceDetails[formData.topic as keyof typeof serviceDetails] : null;

  if (isSubmitted) {
    return (
      <div className={`min-h-screen pt-24 pb-12 flex items-center justify-center ${
        isDarkMode 
          ? 'bg-[#0A0B14]' 
          : 'bg-[#F9FAFB]'
      }`}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 20
          }}
          className={`p-8 rounded-2xl backdrop-blur-lg border ${
            isDarkMode 
              ? 'bg-[#0D0B1F]/60 border-[#00F5FF]/10'
              : 'bg-white border-[#3B82F6]/10 shadow-lg'
          }`}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
              isDarkMode 
                ? 'bg-[#00F5FF]/10'
                : 'bg-[#3B82F6]/10'
            }`}
          >
            <Send className={`w-10 h-10 ${
              isDarkMode ? 'text-[#00F5FF]' : 'text-[#3B82F6]'
            }`} />
          </motion.div>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`text-3xl font-bold mb-4 ${
              isDarkMode ? 'text-[#00F5FF]' : 'text-[#3B82F6]'
            }`}
          >
            Message Sent Successfully!
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className={`text-lg mb-8 ${
              isDarkMode ? 'text-[#E2E2E2]' : 'text-[#1F2937]'
            }`}
          >
            Thanks for reaching out. We'll get back to you soon!
          </motion.p>
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsSubmitted(false)}
            className={`px-6 py-3 border rounded-lg font-medium transition-all duration-200 ${
              isDarkMode 
                ? 'bg-[#00F5FF]/10 hover:bg-[#00F5FF]/20 border-[#00F5FF]/30 text-white'
                : 'bg-[#3B82F6]/10 hover:bg-[#3B82F6]/20 border-[#3B82F6]/30 text-[#3B82F6]'
            }`}
          >
            Send Another Message
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-24 pb-12 ${
      isDarkMode 
        ? 'bg-[#0A0B14]' 
        : 'bg-[#F9FAFB]'
    }`}>
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`p-8 rounded-2xl border ${
            isDarkMode 
              ? 'bg-[#0D0B1F]/60 backdrop-blur-lg border-[#00F5FF]/10'
              : 'bg-white border-[#3B82F6]/10 shadow-lg'
          }`}
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center ${
                isDarkMode 
                  ? 'bg-[#00F5FF]/10'
                  : 'bg-[#3B82F6]/10'
              }`}
            >
              <MessageSquare className={`w-8 h-8 ${
                isDarkMode ? 'text-[#00F5FF]' : 'text-[#3B82F6]'
              }`} />
            </motion.div>
            <h1 className={`text-4xl font-bold mb-4 ${
              isDarkMode ? 'neon-glow text-white' : 'neon-glow text-[#1F2937]'
            }`}>
              Get in Touch
            </h1>
            <p className={`text-lg ${
              isDarkMode ? 'text-[#E2E2E2]' : 'text-[#4B5563]'
            }`}>
              Have a question or ready to start your digital journey? We're here to help.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className={`block mb-2 ${
                isDarkMode ? 'text-[#00F5FF]' : 'text-[#3B82F6]'
              }`} htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                className={`w-full px-4 py-3 rounded-lg border transition-all ${
                  isDarkMode 
                    ? 'bg-[#0A0B14] border-[#00F5FF]/20 text-white focus:border-[#00F5FF]/50 focus:ring-2 focus:ring-[#00F5FF]/20'
                    : 'bg-[#F9FAFB] border-[#3B82F6]/30 text-[#1F2937] placeholder-[#6B7280] focus:border-[#3B82F6]/50 focus:ring-2 focus:ring-[#3B82F6]/20'
                }`}
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className={`block mb-2 ${
                isDarkMode ? 'text-[#00F5FF]' : 'text-[#3B82F6]'
              }`} htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className={`w-full px-4 py-3 rounded-lg border transition-all ${
                  isDarkMode 
                    ? 'bg-[#0A0B14] border-[#00F5FF]/20 text-white focus:border-[#00F5FF]/50 focus:ring-2 focus:ring-[#00F5FF]/20'
                    : 'bg-[#F9FAFB] border-[#3B82F6]/30 text-[#1F2937] placeholder-[#6B7280] focus:border-[#3B82F6]/50 focus:ring-2 focus:ring-[#3B82F6]/20'
                }`}
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className={`block mb-2 ${
                isDarkMode ? 'text-[#00F5FF]' : 'text-[#3B82F6]'
              }`} htmlFor="topic">
                Topic
              </label>
              <select
                id="topic"
                className={`w-full px-4 py-3 rounded-lg border transition-all ${
                  isDarkMode 
                    ? 'bg-[#0A0B14] border-[#00F5FF]/20 text-white focus:border-[#00F5FF]/50 focus:ring-2 focus:ring-[#00F5FF]/20'
                    : 'bg-[#F9FAFB] border-[#3B82F6]/30 text-[#1F2937] focus:border-[#3B82F6]/50 focus:ring-2 focus:ring-[#3B82F6]/20'
                }`}
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                required
              >
                <option value="">Select a topic</option>
                {topics.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
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
                  className={`rounded-lg p-6 border ${
                    isDarkMode 
                      ? 'bg-[#0A0B14]/50 border-[#00F5FF]/20'
                      : 'bg-[#F9FAFB] border-[#3B82F6]/20 shadow-md'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${
                      isDarkMode 
                        ? 'bg-[#00F5FF]/10'
                        : 'bg-[#3B82F6]/10'
                    }`}>
                      {selectedService && <selectedService.icon className={`w-6 h-6 ${
                        isDarkMode ? 'text-[#00F5FF]' : 'text-[#3B82F6]'
                      }`} />}
                    </div>
                    <div>
                      <h3 className={`text-xl font-semibold mb-2 ${
                        isDarkMode ? 'text-[#00F5FF]' : 'text-[#3B82F6]'
                      }`}>
                        {formData.topic}
                      </h3>
                      <p className={`mb-4 ${
                        isDarkMode ? 'text-[#E2E2E2]' : 'text-[#4B5563]'
                      }`}>
                        {selectedService.description}
                      </p>
                      <ul className="space-y-2">
                        {selectedService.features.map((feature, index) => (
                          <motion.li
                            key={feature}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`flex items-center gap-2 ${
                              isDarkMode ? 'text-[#E2E2E2]' : 'text-[#4B5563]'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              isDarkMode ? 'bg-[#00F5FF]' : 'bg-[#3B82F6]'
                            }`} />
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className={`block mb-2 ${
                isDarkMode ? 'text-[#00F5FF]' : 'text-[#3B82F6]'
              }`} htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                rows={6}
                className={`w-full px-4 py-3 rounded-lg border transition-all resize-none ${
                  isDarkMode 
                    ? 'bg-[#0A0B14] border-[#00F5FF]/20 text-white focus:border-[#00F5FF]/50 focus:ring-2 focus:ring-[#00F5FF]/20'
                    : 'bg-[#F9FAFB] border-[#3B82F6]/30 text-[#1F2937] placeholder-[#6B7280] focus:border-[#3B82F6]/50 focus:ring-2 focus:ring-[#3B82F6]/20'
                }`}
                placeholder="Tell us about your project or question..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
            </motion.div>

            <motion.button
              type="submit"
              className={`w-full px-6 py-4 border rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 group ${
                isDarkMode 
                  ? 'bg-[#00F5FF]/10 hover:bg-[#00F5FF]/20 border-[#00F5FF]/30 text-white'
                  : 'bg-[#3B82F6]/10 hover:bg-[#3B82F6]/20 border-[#3B82F6]/30 text-[#3B82F6] shadow-md hover:shadow-lg'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Send Message</span>
              <Send className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}