import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Wrench, Plus, Mail, Globe, Share2 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function ServiceSelectionPage() {
  const [selectedService, setSelectedService] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [domain, setDomain] = useState('');
  const [socialMedia, setSocialMedia] = useState('');
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const initialSetup = [
    { id: 'website', name: 'Website Setup', price: '$150 - $300' },
    { id: 'social', name: 'Social Media Setup', price: '$100 - $200' },
    { id: 'seo', name: 'SEO & Google My Business', price: '$100 - $200' },
  ];

  const additionalServices = [
    { id: 'posters', name: 'Promotional Posters', price: '$50 - $100' },
    { id: 'events', name: 'Event Content Creation', price: '$75 - $150' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedService && message && email) {
      navigate('/contact');
    }
  };

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
              Select Your Service
            </h1>
            <p className={`text-lg ${
              isDarkMode ? 'text-[#E2E2E2]' : 'text-[#4B5563]'
            }`}>
              Choose the service you need and tell us about your requirements
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Initial Setup Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <Wrench className={`w-6 h-6 ${
                  isDarkMode ? 'text-[#00F5FF]' : 'text-[#3B82F6]'
                }`} />
                <h2 className={`text-2xl font-bold ${
                  isDarkMode ? 'text-[#00F5FF]' : 'text-[#3B82F6]'
                }`}>
                  Initial Setup
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {initialSetup.map((service) => (
                  <motion.div
                    key={service.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                      selectedService === service.id
                        ? isDarkMode
                          ? 'bg-[#00F5FF]/10 border-[#00F5FF] shadow-lg shadow-[#00F5FF]/20'
                          : 'bg-[#3B82F6]/10 border-[#3B82F6] shadow-lg shadow-[#3B82F6]/20'
                        : isDarkMode
                          ? 'border-[#00F5FF]/20 hover:border-[#00F5FF]/50 bg-[#0A0B14]/50'
                          : 'border-[#3B82F6]/20 hover:border-[#3B82F6]/50 bg-white shadow-md hover:shadow-lg'
                    }`}
                    onClick={() => setSelectedService(service.id)}
                  >
                    <div className={`font-medium ${
                      isDarkMode ? 'text-white' : 'text-[#1F2937]'
                    }`}>
                      {service.name}
                    </div>
                    <div className={`text-sm ${
                      isDarkMode ? 'text-[#00F5FF]' : 'text-[#3B82F6]'
                    }`}>
                      {service.price}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Additional Services Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <Plus className={`w-6 h-6 ${
                  isDarkMode ? 'text-[#00F5FF]' : 'text-[#3B82F6]'
                }`} />
                <h2 className={`text-2xl font-bold ${
                  isDarkMode ? 'text-[#00F5FF]' : 'text-[#3B82F6]'
                }`}>
                  Additional Services
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {additionalServices.map((service) => (
                  <motion.div
                    key={service.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                      selectedService === service.id
                        ? isDarkMode
                          ? 'bg-[#00F5FF]/10 border-[#00F5FF] shadow-lg shadow-[#00F5FF]/20'
                          : 'bg-[#3B82F6]/10 border-[#3B82F6] shadow-lg shadow-[#3B82F6]/20'
                        : isDarkMode
                          ? 'border-[#00F5FF]/20 hover:border-[#00F5FF]/50 bg-[#0A0B14]/50'
                          : 'border-[#3B82F6]/20 hover:border-[#3B82F6]/50 bg-white shadow-md hover:shadow-lg'
                    }`}
                    onClick={() => setSelectedService(service.id)}
                  >
                    <div className={`font-medium ${
                      isDarkMode ? 'text-white' : 'text-[#1F2937]'
                    }`}>
                      {service.name}
                    </div>
                    <div className={`text-sm ${
                      isDarkMode ? 'text-[#00F5FF]' : 'text-[#3B82F6]'
                    }`}>
                      {service.price}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <Mail className={`w-6 h-6 ${
                  isDarkMode ? 'text-[#00F5FF]' : 'text-[#3B82F6]'
                }`} />
                <h2 className={`text-2xl font-bold ${
                  isDarkMode ? 'text-[#00F5FF]' : 'text-[#3B82F6]'
                }`}>
                  Contact Information
                </h2>
              </div>
              
              {/* Email Field (Required) */}
              <div>
                <label className={`block text-lg font-medium mb-2 ${
                  isDarkMode ? 'text-[#00F5FF]' : 'text-[#3B82F6]'
                }`}>
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                    isDarkMode ? 'text-[#00F5FF]/50' : 'text-[#3B82F6]/50'
                  }`} />
                  <input
                    type="email"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all ${
                      isDarkMode 
                        ? 'bg-[#0A0B14] border-[#00F5FF]/20 text-white focus:border-[#00F5FF]/50 focus:ring-2 focus:ring-[#00F5FF]/20'
                        : 'bg-[#F9FAFB] border-[#3B82F6]/30 text-[#1F2937] focus:border-[#3B82F6]/50 focus:ring-2 focus:ring-[#3B82F6]/20'
                    }`}
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Domain Field (Optional) */}
              <div>
                <label className={`block text-lg font-medium mb-2 ${
                  isDarkMode ? 'text-[#00F5FF]' : 'text-[#3B82F6]'
                }`}>
                  Domain Name <span className={`${
                    isDarkMode ? 'text-[#00F5FF]/50' : 'text-[#6B7280]'
                  }`}>(optional)</span>
                </label>
                <div className="relative">
                  <Globe className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                    isDarkMode ? 'text-[#00F5FF]/50' : 'text-[#3B82F6]/50'
                  }`} />
                  <input
                    type="text"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all ${
                      isDarkMode 
                        ? 'bg-[#0A0B14] border-[#00F5FF]/20 text-white focus:border-[#00F5FF]/50 focus:ring-2 focus:ring-[#00F5FF]/20'
                        : 'bg-[#F9FAFB] border-[#3B82F6]/30 text-[#1F2937] focus:border-[#3B82F6]/50 focus:ring-2 focus:ring-[#3B82F6]/20'
                    }`}
                    placeholder="yourdomain.com"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                  />
                </div>
              </div>

              {/* Social Media Field (Optional) */}
              <div>
                <label className={`block text-lg font-medium mb-2 ${
                  isDarkMode ? 'text-[#00F5FF]' : 'text-[#3B82F6]'
                }`}>
                  Social Media Accounts <span className={`${
                    isDarkMode ? 'text-[#00F5FF]/50' : 'text-[#6B7280]'
                  }`}>(optional)</span>
                </label>
                <div className="relative">
                  <Share2 className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                    isDarkMode ? 'text-[#00F5FF]/50' : 'text-[#3B82F6]/50'
                  }`} />
                  <input
                    type="text"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all ${
                      isDarkMode 
                        ? 'bg-[#0A0B14] border-[#00F5FF]/20 text-white focus:border-[#00F5FF]/50 focus:ring-2 focus:ring-[#00F5FF]/20'
                        : 'bg-[#F9FAFB] border-[#3B82F6]/30 text-[#1F2937] focus:border-[#3B82F6]/50 focus:ring-2 focus:ring-[#3B82F6]/20'
                    }`}
                    placeholder="@username (Instagram, Twitter, etc.)"
                    value={socialMedia}
                    onChange={(e) => setSocialMedia(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Message Box */}
            <div className="space-y-4">
              <label className={`block text-lg font-medium mb-2 ${
                isDarkMode ? 'text-[#00F5FF]' : 'text-[#3B82F6]'
              }`}>
                Tell us about your requirements
              </label>
              <textarea
                rows={6}
                className={`w-full px-4 py-3 rounded-lg border transition-all resize-none ${
                  isDarkMode 
                    ? 'bg-[#0A0B14] border-[#00F5FF]/20 text-white focus:border-[#00F5FF]/50 focus:ring-2 focus:ring-[#00F5FF]/20'
                    : 'bg-[#F9FAFB] border-[#3B82F6]/30 text-[#1F2937] focus:border-[#3B82F6]/50 focus:ring-2 focus:ring-[#3B82F6]/20'
                }`}
                placeholder="Describe your project needs and any specific requirements..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

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
              <span>Request Quote</span>
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}