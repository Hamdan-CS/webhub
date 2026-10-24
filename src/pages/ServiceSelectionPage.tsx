import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Wrench, Plus, Mail, Globe, Share2 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { submitServiceRequest } from '../services/contactApi';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !message || !email) { alert('Please fill in all required fields'); return; }
    try {
      await submitServiceRequest({ selectedService, email, domain, socialMedia, message });
      alert('Service request submitted successfully!');
      setSelectedService(''); setMessage(''); setEmail(''); setDomain(''); setSocialMedia('');
      navigate('/contact');
    } catch (error) {
      alert('Error submitting request. Please try again.');
      console.error(error);
    }
  };

  const inputClass = isDarkMode
    ? 'w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--color-bg)] border text-[var(--color-text)] focus:ring-2 transition-all'
    : 'w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--color-bg-elevated)] border text-[var(--color-text)] focus:ring-2 transition-all';
  const inputStyle = { borderColor: 'var(--color-border-strong)' };

  const selectCardClass = (isSelected: boolean) =>
    `p-4 rounded-xl border cursor-pointer transition-all duration-200 ${isSelected ? 'border-transparent' : ''}`;
  const selectCardStyle = (isSelected: boolean) => ({
    background: isSelected ? 'color-mix(in srgb, var(--color-accent) 10%, transparent)' : 'var(--color-bg-elevated)',
    borderColor: isSelected ? 'var(--color-accent)' : 'var(--color-border)',
    boxShadow: isSelected ? '0 0 20px var(--glow-primary)' : 'none',
  });

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="glass-card p-8">
          <div className="text-center mb-12">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }} className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ background: 'color-mix(in srgb, var(--color-accent) 15%, transparent)' }}>
              <MessageSquare className="w-8 h-8 accent-text" />
            </motion.div>
            <h1 className="font-display text-4xl font-bold mb-4 tracking-tight text-[var(--color-text)]">Select Your Service</h1>
            <p className="text-lg text-[var(--color-text-secondary)]">Choose the service you need and tell us about your requirements</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <Wrench className="w-6 h-6 accent-text" />
                <h2 className="text-2xl font-bold text-[var(--color-text)]">Initial Setup</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {initialSetup.map((service) => (
                  <motion.div key={service.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={selectCardClass(selectedService === service.id)} style={selectCardStyle(selectedService === service.id)} onClick={() => setSelectedService(service.id)}>
                    <div className="font-medium text-[var(--color-text)]">{service.name}</div>
                    <div className="text-sm accent-text">{service.price}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <Plus className="w-6 h-6 accent-text" />
                <h2 className="text-2xl font-bold text-[var(--color-text)]">Additional Services</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {additionalServices.map((service) => (
                  <motion.div key={service.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={selectCardClass(selectedService === service.id)} style={selectCardStyle(selectedService === service.id)} onClick={() => setSelectedService(service.id)}>
                    <div className="font-medium text-[var(--color-text)]">{service.name}</div>
                    <div className="text-sm accent-text">{service.price}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="w-6 h-6 accent-text" />
                <h2 className="text-2xl font-bold text-[var(--color-text)]">Contact Information</h2>
              </div>

              <div>
                <label className="block text-lg font-medium mb-2 accent-text">Email Address <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--color-text-muted)' }} />
                  <input type="email" className={inputClass} style={inputStyle} placeholder="your.email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
              </div>

              <div>
                <label className="block text-lg font-medium mb-2 accent-text">Domain Name <span className="text-[var(--color-text-muted)]">(optional)</span></label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--color-text-muted)' }} />
                  <input type="text" className={inputClass} style={inputStyle} placeholder="yourdomain.com" value={domain} onChange={(e) => setDomain(e.target.value)} />
                </div>
              </div>

              <div>
                <label className="block text-lg font-medium mb-2 accent-text">Social Media Accounts <span className="text-[var(--color-text-muted)]">(optional)</span></label>
                <div className="relative">
                  <Share2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--color-text-muted)' }} />
                  <input type="text" className={inputClass} style={inputStyle} placeholder="@username (Instagram, Twitter, etc.)" value={socialMedia} onChange={(e) => setSocialMedia(e.target.value)} />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-lg font-medium mb-2 accent-text">Tell us about your requirements</label>
              <textarea rows={6} className={`${inputClass} resize-none`} style={inputStyle} placeholder="Describe your project needs and any specific requirements..." value={message} onChange={(e) => setMessage(e.target.value)} required />
            </div>

            <motion.button type="submit" className="btn-accent w-full px-6 py-4 rounded-xl font-semibold transition-all duration-200" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
              Request Quote
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
