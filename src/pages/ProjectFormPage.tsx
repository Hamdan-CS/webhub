import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Send, Rocket, User, Mail, Globe, FileText } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function ProjectFormPage() {
  const [formData, setFormData] = useState({
    name: '', email: '', domain: '', message: '',
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
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', domain: '', message: '', documents: null });
    }, 3000);
  };

  const inputClass = isDarkMode
    ? 'w-full px-4 py-3 rounded-xl bg-[var(--color-bg)] border text-[var(--color-text)] focus:ring-2 transition-all'
    : 'w-full px-4 py-3 rounded-xl bg-[var(--color-bg-elevated)] border text-[var(--color-text)] focus:ring-2 transition-all';
  const inputStyle = { borderColor: 'var(--color-border-strong)' };

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center px-4">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 20 }} className="glass-card p-12 text-center max-w-xl w-full">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }} className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ background: 'color-mix(in srgb, var(--color-accent) 15%, transparent)' }}>
            <Rocket className="w-10 h-10 accent-text" />
          </motion.div>
          <h2 className="font-display text-3xl font-bold mb-4 accent-text">Project Launched Successfully!</h2>
          <p className="text-lg mb-8 text-[var(--color-text-secondary)]">Thank you for starting your project with us. We'll get back to you soon!</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="glass-card p-8">
          <div className="text-center mb-12">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }} className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ background: 'color-mix(in srgb, var(--color-accent) 15%, transparent)' }}>
              <Rocket className="w-8 h-8 accent-text" />
            </motion.div>
            <h1 className="font-display text-4xl font-bold mb-4 tracking-tight text-[var(--color-text)]">Launch Your Project</h1>
            <p className="text-lg text-[var(--color-text-secondary)]">Let's bring your vision to life together</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {[
              { label: 'Name', icon: User, id: 'name', placeholder: 'Enter your full name', value: formData.name, required: true },
              { label: 'Email', icon: Mail, id: 'email', placeholder: 'your.email@example.com', value: formData.email, required: true },
              { label: 'Domain (optional)', icon: Globe, id: 'domain', placeholder: 'yourdomain.com', value: formData.domain, required: false },
            ].map((field, i) => (
              <motion.div key={field.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.1 }}>
                <label className="block mb-2 font-medium accent-text" htmlFor={field.id}>
                  <div className="flex items-center gap-2"><field.icon className="w-5 h-5" />{field.label}{field.required && ' *'}</div>
                </label>
                <input type={field.id === 'email' ? 'email' : 'text'} id={field.id} required={field.required} className={inputClass} style={inputStyle} placeholder={field.placeholder} value={field.value} onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })} />
              </motion.div>
            ))}

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="relative">
              <label className="block mb-2 font-medium accent-text">
                <div className="flex items-center gap-2"><FileText className="w-5 h-5" />Upload Documents <span className="font-normal text-[var(--color-text-muted)]">(optional - DOCX, PDF, etc.)</span></div>
              </label>
              <div className="relative">
                <input type="file" multiple accept=".docx,.doc,.pdf,.txt,.jpg,.jpeg,.png" className="hidden" id="documents" onChange={handleFileChange} />
                <label htmlFor="documents" className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed rounded-xl cursor-pointer transition-all group" style={{ borderColor: 'var(--color-border-strong)', background: 'var(--color-bg-elevated)' }}>
                  <div className="text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2 accent-text group-hover:scale-110 transition-transform" />
                    <p className="text-[var(--color-text)]">Drag & drop files here or click to browse</p>
                    <p className="text-sm mt-1 text-[var(--color-text-muted)]">Supported: DOCX, PDF, TXT, JPG, PNG (max 10MB each)</p>
                  </div>
                </label>
              </div>
              {formData.documents && formData.documents.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium accent-text">Uploaded files:</p>
                  {Array.from(formData.documents).map((file, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm p-3 rounded-lg border" style={{ background: 'var(--color-bg-elevated)', borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}>
                      <FileText className="w-4 h-4 accent-text" />
                      <span className="flex-1">{file.name}</span>
                      <span className="text-[var(--color-text-muted)]">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
              <label className="block mb-2 font-medium accent-text" htmlFor="message">
                <div className="flex items-center gap-2"><Send className="w-5 h-5" />Message *</div>
              </label>
              <textarea id="message" required rows={6} className={`${inputClass} resize-none`} style={inputStyle} placeholder="Tell us about your project vision, requirements, goals, and any specific details you'd like us to know..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
            </motion.div>

            <motion.button type="submit" className="btn-accent w-full px-6 py-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 group" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
              <span>Launch Project</span>
              <Rocket className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:scale-110" />
            </motion.button>
          </form>

          <p className="mt-8 text-center text-sm text-[var(--color-text-muted)]">We'll review your project details and get back to you within 24 hours.</p>
        </motion.div>
      </div>
    </div>
  );
}
