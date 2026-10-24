import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Phone, MapPin, Upload, FileText, Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface ApplicationModalProps { isOpen: boolean; onClose: () => void; position?: string; }
interface FormData { fullName: string; email: string; phone: string; workMode: string; cv: File | null; coverLetter: File | null; message: string; }
interface FormErrors { fullName?: string; email?: string; phone?: string; workMode?: string; cv?: string; coverLetter?: string; }

export function ApplicationModal({ isOpen, onClose, position = '' }: ApplicationModalProps) {
  const { isDarkMode } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [formData, setFormData] = useState<FormData>({ fullName: '', email: '', phone: '', workMode: '', cv: null, coverLetter: null, message: '' });
  const [errors, setErrors] = useState<FormErrors>({});

  const workModeOptions = [
    { value: '', label: 'Select work mode' },
    { value: 'remote', label: 'Remote' },
    { value: 'onsite', label: 'On-site' },
    { value: 'hybrid', label: 'Hybrid' },
  ];

  const validateFile = (file: File): string | null => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) return 'Only PDF, DOC, and DOCX files are allowed';
    if (file.size > 5 * 1024 * 1024) return 'File size must be less than 5MB';
    return null;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email address';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.workMode) newErrors.workMode = 'Please select a work mode';
    if (!formData.cv) newErrors.cv = 'CV is required';
    else { const cvError = validateFile(formData.cv); if (cvError) newErrors.cv = cvError; }
    if (formData.coverLetter) { const clError = validateFile(formData.coverLetter); if (clError) newErrors.coverLetter = clError; }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'cv' | 'coverLetter') => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, [field]: file }));
    if (file && errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const submitFormData = new FormData();
      submitFormData.append('fullName', formData.fullName);
      submitFormData.append('email', formData.email);
      submitFormData.append('phone', formData.phone);
      submitFormData.append('workMode', formData.workMode);
      submitFormData.append('message', formData.message);
      submitFormData.append('position', position);
      if (formData.cv) submitFormData.append('cv', formData.cv);
      if (formData.coverLetter) submitFormData.append('coverLetter', formData.coverLetter);

      const response = await fetch('http://localhost:3001/apply', { method: 'POST', body: submitFormData });
      if (!response.ok) { const errorData = await response.json(); throw new Error(errorData.error || 'Failed to submit application'); }

      setIsSubmitted(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      setTimeout(() => {
        setIsSubmitted(false); setIsSubmitting(false);
        setFormData({ fullName: '', email: '', phone: '', workMode: '', cv: null, coverLetter: null, message: '' });
        setErrors({}); onClose();
      }, 4000);
    } catch (error) {
      console.error('Submission error:', error);
      alert(`Failed to submit application: ${(error as Error).message}`);
      setIsSubmitting(false);
    }
  };

  const handleClose = () => { if (!isSubmitting && !isSubmitted) onClose(); };

  if (!isOpen) return null;

  const inputBaseClass = isDarkMode
    ? 'w-full px-4 py-3 rounded-xl bg-[var(--color-bg)] border text-[var(--color-text)] focus:ring-2 transition-all'
    : 'w-full px-4 py-3 rounded-xl bg-[var(--color-bg-elevated)] border text-[var(--color-text)] focus:ring-2 transition-all';

  const fieldStyle = (hasError?: string) => ({
    borderColor: hasError ? '#EF4444' : 'var(--color-border-strong)',
  });

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)' }} onClick={handleClose}>
        <AnimatePresence>
          {showConfetti && (
            <div className="fixed inset-0 pointer-events-none z-[60]">
              {[...Array(50)].map((_, i) => (
                <motion.div key={i} className="absolute w-2 h-2 rounded-full" style={{ backgroundColor: ['var(--color-accent)', 'var(--color-accent-2)', '#FBBF24', '#F472B6', '#34D399'][i % 5], left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }} initial={{ scale: 0, rotate: 0 }} animate={{ scale: [0, 1, 0], rotate: [0, 180, 360], y: [0, -100, 100], x: [0, Math.random() * 200 - 100] }} transition={{ duration: 3, ease: 'easeOut', delay: Math.random() * 0.5 }} />
              ))}
            </div>
          )}
        </AnimatePresence>

        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl glass-card" onClick={(e) => e.stopPropagation()}>
          <AnimatePresence>
            {isSubmitted && (
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="absolute inset-0 flex items-center justify-center z-10 rounded-2xl" style={{ background: isDarkMode ? 'rgba(17,24,39,0.98)' : 'rgba(255,255,255,0.98)' }}>
                <div className="text-center p-8">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 200 }} className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ background: 'color-mix(in srgb, var(--color-accent) 20%, transparent)' }}>
                    <CheckCircle className="w-10 h-10 accent-text" />
                  </motion.div>
                  <h3 className="font-display text-2xl font-bold mb-4 accent-text">Thank you for applying!</h3>
                  <p className="text-lg text-[var(--color-text-secondary)]">You're one step closer to becoming part of WebHub. We'll review your profile and get back to you shortly.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'var(--color-border)' }}>
            <div>
              <h2 className="font-display text-2xl font-bold text-[var(--color-text)]">Apply Now</h2>
              {position && <p className="text-sm mt-1 accent-text">Position: {position}</p>}
            </div>
            <button onClick={handleClose} disabled={isSubmitting || isSubmitted} className="p-2 rounded-lg transition-colors hover:bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)] disabled:opacity-50 disabled:cursor-not-allowed">
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {[
              { label: 'Full Name', icon: User, id: 'fullName', type: 'text', placeholder: 'Enter your full name', required: true },
              { label: 'Email Address', icon: Mail, id: 'email', type: 'email', placeholder: 'your.email@example.com', required: true },
              { label: 'Phone Number', icon: Phone, id: 'phone', type: 'tel', placeholder: '+1 (555) 123-4567', required: true },
            ].map((field) => (
              <div key={field.id}>
                <label className="block text-sm font-medium mb-2 accent-text"><div className="flex items-center gap-2"><field.icon className="w-4 h-4" />{field.label}{field.required && ' *'}</div></label>
                <input type={field.type} value={formData[field.id as keyof FormData] as string} onChange={(e) => setFormData(prev => ({ ...prev, [field.id]: e.target.value }))} className={`${inputBaseClass} focus:ring-2`} style={fieldStyle(errors[field.id as keyof FormErrors])} placeholder={field.placeholder} disabled={isSubmitting} />
                {errors[field.id as keyof FormErrors] && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors[field.id as keyof FormErrors]}</p>}
              </div>
            ))}

            {/* Work Mode */}
            <div>
              <label className="block text-sm font-medium mb-2 accent-text"><div className="flex items-center gap-2"><MapPin className="w-4 h-4" />Mode of Working *</div></label>
              <select value={formData.workMode} onChange={(e) => setFormData(prev => ({ ...prev, workMode: e.target.value }))} className={`${inputBaseClass} focus:ring-2`} style={fieldStyle(errors.workMode)} disabled={isSubmitting}>
                {workModeOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
              </select>
              {errors.workMode && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.workMode}</p>}
            </div>

            {/* CV Upload */}
            {[
              { label: 'Upload CV', icon: Upload, id: 'cv', required: true, file: formData.cv, error: errors.cv },
              { label: 'Upload Cover Letter (Optional)', icon: FileText, id: 'coverLetter', required: false, file: formData.coverLetter, error: errors.coverLetter },
            ].map((upload) => (
              <div key={upload.id}>
                <label className="block text-sm font-medium mb-2 accent-text"><div className="flex items-center gap-2"><upload.icon className="w-4 h-4" />{upload.label}{upload.required && ' *'}</div></label>
                <div className="relative">
                  <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => handleFileChange(e, upload.id as 'cv' | 'coverLetter')} className="hidden" id={`${upload.id}-upload`} disabled={isSubmitting} />
                  <label htmlFor={`${upload.id}-upload`} className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed rounded-xl cursor-pointer transition-all" style={{ borderColor: upload.error ? '#EF4444' : 'var(--color-border-strong)', background: 'var(--color-bg-elevated)', opacity: isSubmitting ? 0.5 : 1 }}>
                    <div className="text-center">
                      <upload.icon className="w-8 h-8 mx-auto mb-2 accent-text" />
                      <p className="text-[var(--color-text)]">{upload.file ? upload.file.name : `Click to upload ${upload.id === 'cv' ? 'CV' : 'cover letter'}`}</p>
                      <p className="text-sm mt-1 text-[var(--color-text-muted)]">PDF, DOC, DOCX (max 5MB)</p>
                    </div>
                  </label>
                </div>
                {upload.error && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{upload.error}</p>}
              </div>
            ))}

            {/* Message */}
            <div>
              <label className="block text-sm font-medium mb-2 accent-text">Message (Optional)</label>
              <textarea value={formData.message} onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))} rows={4} className={`${inputBaseClass} resize-none focus:ring-2`} style={fieldStyle()} placeholder="Tell us why you're interested in this position and what makes you a great fit..." disabled={isSubmitting} />
            </div>

            <motion.button type="submit" disabled={isSubmitting} className="btn-accent w-full px-6 py-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed" whileHover={!isSubmitting ? { scale: 1.02 } : {}} whileTap={!isSubmitting ? { scale: 0.98 } : {}}>
              {isSubmitting ? <><Loader className="w-5 h-5 animate-spin" /><span>Sending Application...</span></> : <><span>Send Application</span><Send className="w-5 h-5" /></>}
            </motion.button>

            <input type="text" name="website" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
