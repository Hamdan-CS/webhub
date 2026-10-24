import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Upload, 
  FileText, 
  Send, 
  CheckCircle,
  AlertCircle,
  Loader
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  position?: string;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  workMode: string;
  cv: File | null;
  coverLetter: File | null;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  workMode?: string;
  cv?: string;
  coverLetter?: string;
}

export function ApplicationModal({ isOpen, onClose, position = '' }: ApplicationModalProps) {
  const { isDarkMode } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    workMode: '',
    cv: null,
    coverLetter: null,
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const workModeOptions = [
    { value: '', label: 'Select work mode' },
    { value: 'remote', label: 'Remote' },
    { value: 'onsite', label: 'On-site' },
    { value: 'hybrid', label: 'Hybrid' }
  ];

  const validateFile = (file: File): string | null => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      return 'Only PDF, DOC, and DOCX files are allowed';
    }
    
    if (file.size > 5 * 1024 * 1024) { // 5MB
      return 'File size must be less than 5MB';
    }
    
    return null;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.workMode) {
      newErrors.workMode = 'Please select a work mode';
    }

    if (!formData.cv) {
      newErrors.cv = 'CV is required';
    } else {
      const cvError = validateFile(formData.cv);
      if (cvError) {
        newErrors.cv = cvError;
      }
    }

    if (formData.coverLetter) {
      const coverLetterError = validateFile(formData.coverLetter);
      if (coverLetterError) {
        newErrors.coverLetter = coverLetterError;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'cv' | 'coverLetter') => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, [field]: file }));
    
    // Clear error when file is selected
    if (file && errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare form data for submission
      const submitFormData = new FormData();
      submitFormData.append('fullName', formData.fullName);
      submitFormData.append('email', formData.email);
      submitFormData.append('phone', formData.phone);
      submitFormData.append('workMode', formData.workMode);
      submitFormData.append('message', formData.message);
      submitFormData.append('position', position);
      
      if (formData.cv) {
        submitFormData.append('cv', formData.cv);
      }
      
      if (formData.coverLetter) {
        submitFormData.append('coverLetter', formData.coverLetter);
      }

      // Submit to Node.js backend
      const response = await fetch('http://localhost:3001/apply', {
        method: 'POST',
        body: submitFormData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit application');
      }

      const result = await response.json();
      console.log('Application submitted successfully:', result);

      setIsSubmitted(true);
      setShowConfetti(true);
      
      // Hide confetti after animation
      setTimeout(() => setShowConfetti(false), 3000);
      
      // Reset form and close modal after success message
      setTimeout(() => {
        setIsSubmitted(false);
        setIsSubmitting(false);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          workMode: '',
          cv: null,
          coverLetter: null,
          message: ''
        });
        setErrors({});
        onClose();
      }, 4000);

    } catch (error) {
      console.error('Submission error:', error);
      
      // Show error to user
      alert(`Failed to submit application: ${error.message}`);
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting && !isSubmitted) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
        onClick={handleClose}
      >
        {/* Confetti Animation */}
        <AnimatePresence>
          {showConfetti && (
            <div className="fixed inset-0 pointer-events-none z-60">
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: ['#00F5FF', '#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1'][i % 5],
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  initial={{ scale: 0, rotate: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    rotate: [0, 180, 360],
                    y: [0, -100, 100],
                    x: [0, Math.random() * 200 - 100],
                  }}
                  transition={{
                    duration: 3,
                    ease: "easeOut",
                    delay: Math.random() * 0.5,
                  }}
                />
              ))}
            </div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border ${
            isDarkMode
              ? 'bg-[#0D0B1F]/95 border-[#00F5FF]/20 backdrop-blur-xl'
              : 'bg-white/95 border-[#3B82F6]/20 backdrop-blur-xl shadow-2xl'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Success State */}
          <AnimatePresence>
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0 flex items-center justify-center z-10 rounded-2xl"
                style={{
                  backgroundColor: isDarkMode ? 'rgba(13, 11, 31, 0.98)' : 'rgba(255, 255, 255, 0.98)'
                }}
              >
                <div className="text-center p-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
                      isDarkMode ? 'bg-[#00F5FF]/20' : 'bg-[#3B82F6]/20'
                    }`}
                  >
                    <CheckCircle className={`w-10 h-10 ${
                      isDarkMode ? 'text-[#00F5FF]' : 'text-[#3B82F6]'
                    }`} />
                  </motion.div>
                  
                  <motion.h3
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className={`text-2xl font-bold mb-4 ${
                      isDarkMode ? 'text-[#00F5FF]' : 'text-[#3B82F6]'
                    }`}
                  >
                    🎉 Thank you for applying!
                  </motion.h3>
                  
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className={`text-lg ${
                      isDarkMode ? 'text-[#E2E2E2]' : 'text-[#1F2937]'
                    }`}
                  >
                    You're one step closer to becoming part of WebHub. We'll review your profile and get back to you shortly.
                  </motion.p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Header */}
          <div className={`flex items-center justify-between p-6 border-b ${
            isDarkMode ? 'border-[#00F5FF]/10' : 'border-[#3B82F6]/10'
          }`}>
            <div>
              <h2 className={`text-2xl font-bold ${
                isDarkMode ? 'text-white' : 'text-[#1F2937]'
              }`}>
                Apply Now
              </h2>
              {position && (
                <p className={`text-sm mt-1 ${
                  isDarkMode ? 'text-[#00F5FF]' : 'text-[#3B82F6]'
                }`}>
                  Position: {position}
                </p>
              )}
            </div>
            <button
              onClick={handleClose}
              disabled={isSubmitting || isSubmitted}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode
                  ? 'hover:bg-[#00F5FF]/10 text-[#E2E2E2] hover:text-[#00F5FF]'
                  : 'hover:bg-[#3B82F6]/10 text-[#4B5563] hover:text-[#3B82F6]'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Full Name */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-[#00F5FF]' : 'text-[#3B82F6]'
              }`}>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name *
                </div>
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                className={`w-full px-4 py-3 rounded-lg border transition-all ${
                  errors.fullName
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                    : isDarkMode
                      ? 'bg-[#0A0B14] border-[#00F5FF]/20 text-white focus:border-[#00F5FF]/50 focus:ring-[#00F5FF]/20'
                      : 'bg-[#F9FAFB] border-[#3B82F6]/30 text-[#1F2937] focus:border-[#3B82F6]/50 focus:ring-[#3B82F6]/20'
                } focus:ring-2`}
                placeholder="Enter your full name"
                disabled={isSubmitting}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-[#00F5FF]' : 'text-[#3B82F6]'
              }`}>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address *
                </div>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className={`w-full px-4 py-3 rounded-lg border transition-all ${
                  errors.email
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                    : isDarkMode
                      ? 'bg-[#0A0B14] border-[#00F5FF]/20 text-white focus:border-[#00F5FF]/50 focus:ring-[#00F5FF]/20'
                      : 'bg-[#F9FAFB] border-[#3B82F6]/30 text-[#1F2937] focus:border-[#3B82F6]/50 focus:ring-[#3B82F6]/20'
                } focus:ring-2`}
                placeholder="your.email@example.com"
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-[#00F5FF]' : 'text-[#3B82F6]'
              }`}>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone Number *
                </div>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className={`w-full px-4 py-3 rounded-lg border transition-all ${
                  errors.phone
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                    : isDarkMode
                      ? 'bg-[#0A0B14] border-[#00F5FF]/20 text-white focus:border-[#00F5FF]/50 focus:ring-[#00F5FF]/20'
                      : 'bg-[#F9FAFB] border-[#3B82F6]/30 text-[#1F2937] focus:border-[#3B82F6]/50 focus:ring-[#3B82F6]/20'
                } focus:ring-2`}
                placeholder="+1 (555) 123-4567"
                disabled={isSubmitting}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Work Mode */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-[#00F5FF]' : 'text-[#3B82F6]'
              }`}>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Mode of Working *
                </div>
              </label>
              <select
                value={formData.workMode}
                onChange={(e) => setFormData(prev => ({ ...prev, workMode: e.target.value }))}
                className={`w-full px-4 py-3 rounded-lg border transition-all ${
                  errors.workMode
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                    : isDarkMode
                      ? 'bg-[#0A0B14] border-[#00F5FF]/20 text-white focus:border-[#00F5FF]/50 focus:ring-[#00F5FF]/20'
                      : 'bg-[#F9FAFB] border-[#3B82F6]/30 text-[#1F2937] focus:border-[#3B82F6]/50 focus:ring-[#3B82F6]/20'
                } focus:ring-2`}
                disabled={isSubmitting}
              >
                {workModeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.workMode && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.workMode}
                </p>
              )}
            </div>

            {/* CV Upload */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-[#00F5FF]' : 'text-[#3B82F6]'
              }`}>
                <div className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Upload CV *
                </div>
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileChange(e, 'cv')}
                  className="hidden"
                  id="cv-upload"
                  disabled={isSubmitting}
                />
                <label
                  htmlFor="cv-upload"
                  className={`flex items-center justify-center w-full px-4 py-6 border-2 border-dashed rounded-lg cursor-pointer transition-all ${
                    errors.cv
                      ? 'border-red-500 hover:border-red-400'
                      : isDarkMode
                        ? 'border-[#00F5FF]/30 hover:border-[#00F5FF]/50 bg-[#0A0B14]/50'
                        : 'border-[#3B82F6]/30 hover:border-[#3B82F6]/50 bg-[#F9FAFB] hover:bg-[#F3F4F6]'
                  } ${isSubmitting ? 'cursor-not-allowed opacity-50' : ''}`}
                >
                  <div className="text-center">
                    <Upload className={`w-8 h-8 mx-auto mb-2 ${
                      isDarkMode ? 'text-[#00F5FF]' : 'text-[#3B82F6]'
                    }`} />
                    <p className={isDarkMode ? 'text-[#E2E2E2]' : 'text-[#1F2937]'}>
                      {formData.cv ? formData.cv.name : 'Click to upload CV'}
                    </p>
                    <p className={`text-sm mt-1 ${
                      isDarkMode ? 'text-[#E2E2E2]/60' : 'text-[#6B7280]'
                    }`}>
                      PDF, DOC, DOCX (max 5MB)
                    </p>
                  </div>
                </label>
              </div>
              {errors.cv && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.cv}
                </p>
              )}
            </div>

            {/* Cover Letter Upload */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-[#00F5FF]' : 'text-[#3B82F6]'
              }`}>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Upload Cover Letter (Optional)
                </div>
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileChange(e, 'coverLetter')}
                  className="hidden"
                  id="cover-letter-upload"
                  disabled={isSubmitting}
                />
                <label
                  htmlFor="cover-letter-upload"
                  className={`flex items-center justify-center w-full px-4 py-6 border-2 border-dashed rounded-lg cursor-pointer transition-all ${
                    errors.coverLetter
                      ? 'border-red-500 hover:border-red-400'
                      : isDarkMode
                        ? 'border-[#00F5FF]/30 hover:border-[#00F5FF]/50 bg-[#0A0B14]/50'
                        : 'border-[#3B82F6]/30 hover:border-[#3B82F6]/50 bg-[#F9FAFB] hover:bg-[#F3F4F6]'
                  } ${isSubmitting ? 'cursor-not-allowed opacity-50' : ''}`}
                >
                  <div className="text-center">
                    <FileText className={`w-8 h-8 mx-auto mb-2 ${
                      isDarkMode ? 'text-[#00F5FF]' : 'text-[#3B82F6]'
                    }`} />
                    <p className={isDarkMode ? 'text-[#E2E2E2]' : 'text-[#1F2937]'}>
                      {formData.coverLetter ? formData.coverLetter.name : 'Click to upload cover letter'}
                    </p>
                    <p className={`text-sm mt-1 ${
                      isDarkMode ? 'text-[#E2E2E2]/60' : 'text-[#6B7280]'
                    }`}>
                      PDF, DOC, DOCX (max 5MB)
                    </p>
                  </div>
                </label>
              </div>
              {errors.coverLetter && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.coverLetter}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-[#00F5FF]' : 'text-[#3B82F6]'
              }`}>
                Message (Optional)
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                rows={4}
                className={`w-full px-4 py-3 rounded-lg border transition-all resize-none ${
                  isDarkMode
                    ? 'bg-[#0A0B14] border-[#00F5FF]/20 text-white focus:border-[#00F5FF]/50 focus:ring-[#00F5FF]/20'
                    : 'bg-[#F9FAFB] border-[#3B82F6]/30 text-[#1F2937] focus:border-[#3B82F6]/50 focus:ring-[#3B82F6]/20'
                } focus:ring-2`}
                placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                disabled={isSubmitting}
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={`w-full px-6 py-4 rounded-lg border font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                isDarkMode
                  ? 'bg-[#00F5FF]/10 border-[#00F5FF]/30 text-[#00F5FF] hover:bg-[#00F5FF]/20 hover:border-[#00F5FF]/50'
                  : 'bg-[#3B82F6]/10 border-[#3B82F6]/30 text-[#3B82F6] hover:bg-[#3B82F6]/20 hover:border-[#3B82F6]/50'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
              whileHover={!isSubmitting ? { scale: 1.02 } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
            >
              {isSubmitting ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Sending Application...</span>
                </>
              ) : (
                <>
                  <span>Send Application</span>
                  <Send className="w-5 h-5" />
                </>
              )}
            </motion.button>

            {/* Honeypot field for spam protection */}
            <input
              type="text"
              name="website"
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
            />
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}