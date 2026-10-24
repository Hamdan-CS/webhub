import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Send, Rocket, User, Mail, Globe, FileText } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function ProjectFormPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    domain: '',
    message: '',
    documents: null as File[] | null
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const { isDarkMode } = useTheme();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, documents: Array.from(e.target.files) });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        domain: '',
        message: '',
        documents: null
      });
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 20
          }}
          className={`p-12 rounded-2xl backdrop-blur-lg border text-center max-w-xl w-full ${
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
            <Rocket className={`w-10 h-10 ${
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
            Project Launched Successfully!
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className={`text-lg mb-8 ${
              isDarkMode ? 'text-[#E2E2E2]' : 'text-[#1F2937]'
            }`}
          >
            Thank you for starting your project with us. We'll get back to you soon!
          </motion.p>
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
              <Rocket className={`w-8 h-8 ${
                isDarkMode ? 'text-[#00F5FF]' : 'text-[#3B82F6]'
              }`} />
            </motion.div>
            <h1 className={`text-4xl font-bold mb-4 ${
              isDarkMode ? 'neon-glow text-white' : 'neon-glow text-[#1F2937]'
            }`}>
              Launch Your Project
            </h1>
            <p className={`text-lg ${
              isDarkMode ? 'text-[#E2E2E2]' : 'text-[#4B5563]'
            }`}>
              Let's bring your vision to life together
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className={`block mb-2 font-medium ${
                isDarkMode ? 'text-[#00F5FF]' : 'text-[#3B82F6]'
              }`} htmlFor="name">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Name *
                </div>
              </label>
              <input
                type="text"
                id="name"
                required
                className={`w-full px-4 py-3 rounded-lg border transition-all placeholder-gray-400 ${
                  isDarkMode 
                    ? 'bg-[#0A0B14] border-[#00F5FF]/20 text-white focus:border-[#00F5FF]/50 focus:ring-2 focus:ring-[#00F5FF]/20'
                    : 'bg-[#F9FAFB] border-[#3B82F6]/30 text-[#1F2937] focus:border-[#3B82F6]/50 focus:ring-2 focus:ring-[#3B82F6]/20'
                }`}
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </motion.div>

            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className={`block mb-2 font-medium ${
                isDarkMode ? 'text-[#00F5FF]' : 'text-[#3B82F6]'
              }`} htmlFor="email">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Email *
                </div>
              </label>
              <input
                type="email"
                id="email"
                required
                className={`w-full px-4 py-3 rounded-lg border transition-all placeholder-gray-400 ${
                  isDarkMode 
                    ? 'bg-[#0A0B14] border-[#00F5FF]/20 text-white focus:border-[#00F5FF]/50 focus:ring-2 focus:ring-[#00F5FF]/20'
                    : 'bg-[#F9FAFB] border-[#3B82F6]/30 text-[#1F2937] focus:border-[#3B82F6]/50 focus:ring-2 focus:ring-[#3B82F6]/20'
                }`}
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </motion.div>

            {/* Domain Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className={`block mb-2 font-medium ${
                isDarkMode ? 'text-[#00F5FF]' : 'text-[#3B82F6]'
              }`} htmlFor="domain">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Domain <span className={`font-normal ${
                    isDarkMode ? 'text-gray-400' : 'text-[#6B7280]'
                  }`}>(optional)</span>
                </div>
              </label>
              <input
                type="text"
                id="domain"
                className={`w-full px-4 py-3 rounded-lg border transition-all placeholder-gray-400 ${
                  isDarkMode 
                    ? 'bg-[#0A0B14] border-[#00F5FF]/20 text-white focus:border-[#00F5FF]/50 focus:ring-2 focus:ring-[#00F5FF]/20'
                    : 'bg-[#F9FAFB] border-[#3B82F6]/30 text-[#1F2937] focus:border-[#3B82F6]/50 focus:ring-2 focus:ring-[#3B82F6]/20'
                }`}
                placeholder="yourdomain.com"
                value={formData.domain}
                onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
              />
            </motion.div>

            {/* Document Upload Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="relative"
            >
              <label className={`block mb-2 font-medium ${
                isDarkMode ? 'text-[#00F5FF]' : 'text-[#3B82F6]'
              }`}>
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Upload Documents <span className={`font-normal ${
                    isDarkMode ? 'text-gray-400' : 'text-[#6B7280]'
                  }`}>(optional - DOCX, PDF, etc.)</span>
                </div>
              </label>
              <div className="relative">
                <input
                  type="file"
                  multiple
                  accept=".docx,.doc,.pdf,.txt,.jpg,.jpeg,.png"
                  className="hidden"
                  id="documents"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="documents"
                  className={`flex items-center justify-center w-full px-4 py-6 border-2 border-dashed rounded-lg cursor-pointer transition-all group ${
                    isDarkMode 
                      ? 'border-[#00F5FF]/30 hover:border-[#00F5FF]/50 bg-[#0A0B14]/50'
                      : 'border-[#3B82F6]/30 hover:border-[#3B82F6]/50 bg-[#F9FAFB] hover:bg-[#F3F4F6]'
                  }`}
                >
                  <div className="text-center">
                    <Upload className={`w-8 h-8 mx-auto mb-2 group-hover:scale-110 transition-transform ${
                      isDarkMode ? 'text-[#00F5FF]' : 'text-[#3B82F6]'
                    }`} />
                    <p className={isDarkMode ? 'text-[#E2E2E2]' : 'text-[#1F2937]'}>
                      Drag & drop files here or click to browse
                    </p>
                    <p className={`text-sm mt-1 ${
                      isDarkMode ? 'text-[#E2E2E2]/60' : 'text-[#6B7280]'
                    }`}>
                      Supported: DOCX, PDF, TXT, JPG, PNG (max 10MB each)
                    </p>
                  </div>
                </label>
              </div>
              {formData.documents && formData.documents.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className={`text-sm font-medium ${
                    isDarkMode ? 'text-[#00F5FF]' : 'text-[#3B82F6]'
                  }`}>
                    Uploaded files:
                  </p>
                  {Array.from(formData.documents).map((file, index) => (
                    <div key={index} className={`flex items-center gap-2 text-sm p-3 rounded-lg border ${
                      isDarkMode 
                        ? 'text-[#E2E2E2] bg-[#0A0B14] border-[#00F5FF]/10'
                        : 'text-[#1F2937] bg-[#F9FAFB] border-[#3B82F6]/10'
                    }`}>
                      <FileText className={`w-4 h-4 ${
                        isDarkMode ? 'text-[#00F5FF]' : 'text-[#3B82F6]'
                      }`} />
                      <span className="flex-1">{file.name}</span>
                      <span className={isDarkMode ? 'text-[#E2E2E2]/60' : 'text-[#6B7280]'}>
                        ({(file.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Message Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label className={`block mb-2 font-medium ${
                isDarkMode ? 'text-[#00F5FF]' : 'text-[#3B82F6]'
              }`} htmlFor="message">
                <div className="flex items-center gap-2">
                  <Send className="w-5 h-5" />
                  Message *
                </div>
              </label>
              <textarea
                id="message"
                required
                rows={6}
                className={`w-full px-4 py-3 rounded-lg border transition-all resize-none placeholder-gray-400 ${
                  isDarkMode 
                    ? 'bg-[#0A0B14] border-[#00F5FF]/20 text-white focus:border-[#00F5FF]/50 focus:ring-2 focus:ring-[#00F5FF]/20'
                    : 'bg-[#F9FAFB] border-[#3B82F6]/30 text-[#1F2937] focus:border-[#3B82F6]/50 focus:ring-2 focus:ring-[#3B82F6]/20'
                }`}
                placeholder="Tell us about your project vision, requirements, goals, and any specific details you'd like us to know..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className={`w-full px-6 py-4 border rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 group ${
                isDarkMode 
                  ? 'bg-[#00F5FF]/10 hover:bg-[#00F5FF]/20 border-[#00F5FF]/30 text-white'
                  : 'bg-[#3B82F6]/10 hover:bg-[#3B82F6]/20 border-[#3B82F6]/30 text-[#3B82F6] shadow-md hover:shadow-lg'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <span>Launch Project</span>
              <Rocket className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:scale-110" />
            </motion.button>
          </form>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className={`mt-8 text-center text-sm ${
              isDarkMode ? 'text-[#E2E2E2]/60' : 'text-[#6B7280]'
            }`}
          >
            <p>We'll review your project details and get back to you within 24 hours.</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}