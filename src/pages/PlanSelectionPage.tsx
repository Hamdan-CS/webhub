import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Check, ArrowLeft, Send, Mail, Globe, Share2, MessageSquare } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { submitServiceRequest } from '../services/contactApi';

interface Plan {
  id: string;
  title: string;
  price: string;
  features: string[];
  planLevel: 'basic' | 'standard' | 'premium';
  isPopular?: boolean;
  backContent: {
    description: string;
    detailedFeatures: string[];
    perfectFor: string;
  };
}

export function PlanSelectionPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const initialPlan = location.state?.selectedPlan || 'standard';
  const [selectedPlan, setSelectedPlan] = useState<string>(initialPlan);
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const [formData, setFormData] = useState({ email: '', domain: '', socialMedia: '', requirements: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const plans: Plan[] = [
    {
      id: 'basic', title: 'Basic Plan', price: '$200',
      features: ['Website updates', 'Basic social media management', 'Monthly performance reports', 'Email support'],
      planLevel: 'basic',
      backContent: {
        description: 'Ideal for small businesses or personal brands starting online.',
        detailedFeatures: ['Up to 2 website content updates per month', '3 social media posts/week (1 platform)', 'Monthly performance report with basic insights', 'Email support with 24-48 hr response time', 'Google Business profile assistance (basic info setup)'],
        perfectFor: "Perfect if you're just starting and need light online support."
      }
    },
    {
      id: 'standard', title: 'Standard Plan', price: '$300',
      features: ['Everything in Basic', 'Advanced SEO maintenance', 'Reputation management', 'Priority support'],
      isPopular: true, planLevel: 'standard',
      backContent: {
        description: 'For growing businesses needing stronger visibility and brand trust.',
        detailedFeatures: ['Everything in Basic Plan', 'Up to 5 website updates/month (including blog or menu updates)', '4-5 posts/week across 2 platforms (Instagram + Facebook or TikTok)', 'Advanced SEO (on-page keywords, speed, mobile optimization)', 'Online reputation monitoring & review response', 'Priority support via email & WhatsApp'],
        perfectFor: 'Perfect for restaurants, stores, and services looking to grow fast.'
      }
    },
    {
      id: 'premium', title: 'Premium Plan', price: '$400',
      features: ['Everything in Standard', 'Event promotions', 'Influencer marketing', 'Dedicated account manager'],
      planLevel: 'premium',
      backContent: {
        description: 'All-in-one branding support for high-growth businesses.',
        detailedFeatures: ['Everything in Standard Plan', 'Up to 10 website changes/month (design edits, popups, landing pages)', 'Daily posts on 3 platforms (Instagram, Facebook, TikTok or YouTube Shorts)', 'Event & festival-based campaign promotions (Eid, Black Friday, etc.)', 'Influencer collaboration management (local micro-influencers)', 'Monthly performance meeting (Zoom or in-person if local)'],
        perfectFor: 'Best for brands ready to go viral and lead in their niche.'
      }
    }
  ];

  const selectedPlanData = plans.find(plan => plan.id === selectedPlan);

  const handleCardClick = (planId: string) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(planId)) newSet.delete(planId); else newSet.add(planId);
      return newSet;
    });
  };

  const handlePlanSelect = (planId: string) => setSelectedPlan(planId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await submitServiceRequest({ selectedService: selectedPlan, email: formData.email, domain: formData.domain, socialMedia: formData.socialMedia, message: formData.requirements });
      setIsSubmitted(true);
      setTimeout(() => { setIsSubmitted(false); navigate('/'); }, 3000);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to submit. Please try again.';
      alert(message);
    } finally { setIsLoading(false); }
  };

  const inputClass = isDarkMode
    ? 'w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--color-bg)] border text-[var(--color-text)] focus:ring-2 transition-all'
    : 'w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--color-bg-elevated)] border text-[var(--color-text)] focus:ring-2 transition-all';
  const inputStyle = { borderColor: 'var(--color-border-strong)' };

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center px-4">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 20 }} className="glass-card p-12 text-center max-w-xl w-full">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }} className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ background: 'color-mix(in srgb, var(--color-accent) 15%, transparent)' }}>
            <Check className="w-10 h-10 accent-text" />
          </motion.div>
          <h2 className="font-display text-3xl font-bold mb-4 accent-text">Plan Selected Successfully!</h2>
          <p className="text-lg mb-8 text-[var(--color-text-secondary)]">Thank you for choosing the {selectedPlanData?.title}. We'll get back to you soon!</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.button onClick={() => navigate(-1)} className="mb-8 flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 btn-outline" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <ArrowLeft className="w-4 h-4" />Back to Pricing
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Plan Selection */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="font-display text-3xl font-bold mb-8 text-[var(--color-text)]">Select Your Plan</h1>
            <div className="space-y-4">
              {plans.map((plan) => (
                <div key={plan.id} className="relative h-80" style={{ perspective: '1000px' }}>
                  <motion.div className="relative w-full h-full cursor-pointer" style={{ transformStyle: 'preserve-3d' }} animate={{ rotateY: flippedCards.has(plan.id) ? 180 : 0 }} transition={{ duration: 0.6, type: 'spring', stiffness: 200, damping: 20 }} onClick={() => handleCardClick(plan.id)}>
                    {/* Front */}
                    <motion.div className="absolute inset-0 p-6 rounded-xl border" style={{ backfaceVisibility: 'hidden', background: selectedPlan === plan.id ? 'color-mix(in srgb, var(--color-accent) 8%, var(--color-bg-surface))' : 'var(--color-bg-surface)', borderColor: selectedPlan === plan.id ? 'var(--color-accent)' : 'var(--color-border)', boxShadow: selectedPlan === plan.id ? '0 0 24px var(--glow-primary)' : 'var(--shadow-card)' }}>
                      {plan.isPopular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-2))' }}>Most Popular</div>
                      )}
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-[var(--color-text)]">{plan.title}</h3>
                          <div className="mt-2"><span className="text-3xl font-bold text-[var(--color-text)]">{plan.price}</span><span className="text-[var(--color-text-muted)]">/month</span></div>
                        </div>
                        <motion.button className="w-6 h-6 rounded-full border-2 flex items-center justify-center" style={{ background: selectedPlan === plan.id ? 'var(--color-accent)' : 'transparent', borderColor: selectedPlan === plan.id ? 'var(--color-accent)' : 'var(--color-border-strong)' }} onClick={(e) => { e.stopPropagation(); handlePlanSelect(plan.id); }} animate={{ scale: selectedPlan === plan.id ? [1, 1.2, 1] : 1 }} transition={{ duration: 0.3 }}>
                          {selectedPlan === plan.id && <Check className="w-4 h-4 text-white" />}
                        </motion.button>
                      </div>
                      <ul className="space-y-2 mb-4">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-[var(--color-text-secondary)]"><span className="accent-text">•</span>{feature}</li>
                        ))}
                      </ul>
                      <div className="text-center text-sm accent-text">Click to see detailed features</div>
                    </motion.div>
                    {/* Back */}
                    <motion.div className="absolute inset-0 p-6 rounded-xl border" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', background: 'var(--color-bg-surface)', borderColor: 'var(--color-border-strong)', boxShadow: 'var(--shadow-elevated)' }}>
                      <div className="h-full flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-xl font-bold accent-text">{plan.title}</h3>
                          <span className="text-2xl font-bold text-[var(--color-text)]">{plan.price}/month</span>
                        </div>
                        <p className="text-sm mb-4 text-[var(--color-text-secondary)]">{plan.backContent.description}</p>
                        <div className="flex-1 overflow-y-auto">
                          <ul className="space-y-2 mb-4">
                            {plan.backContent.detailedFeatures.map((feature, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]"><span className="accent-text">✔</span>{feature}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="mt-4 p-3 rounded-lg text-sm font-medium accent-text" style={{ background: 'color-mix(in srgb, var(--color-accent) 10%, transparent)' }}>{plan.backContent.perfectFor}</div>
                        <div className="text-center text-xs mt-3 text-[var(--color-text-muted)]">Click to flip back</div>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="glass-card p-8">
            <div className="text-center mb-8">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.3 }} className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ background: 'color-mix(in srgb, var(--color-accent) 15%, transparent)' }}>
                <MessageSquare className="w-8 h-8 accent-text" />
              </motion.div>
              <h2 className="font-display text-2xl font-bold mb-2 text-[var(--color-text)]">Contact Information</h2>
              <p className="text-[var(--color-text-secondary)]">Tell us about your requirements</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                { label: 'Email Address', icon: Mail, id: 'email', placeholder: 'your.email@example.com', required: true, value: formData.email, set: (v: string) => setFormData({ ...formData, email: v }) },
                { label: 'Domain Name', icon: Globe, id: 'domain', placeholder: 'yourdomain.com', required: false, value: formData.domain, set: (v: string) => setFormData({ ...formData, domain: v }) },
                { label: 'Social Media Accounts', icon: Share2, id: 'socialMedia', placeholder: '@username (Instagram, Twitter, etc.)', required: false, value: formData.socialMedia, set: (v: string) => setFormData({ ...formData, socialMedia: v }) },
              ].map((field, i) => (
                <motion.div key={field.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1 }}>
                  <label className="block mb-2 font-medium accent-text">{field.label}{field.required && <span className="text-red-500"> *</span>}</label>
                  <div className="relative">
                    <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--color-text-muted)' }} />
                    <input type={field.id === 'email' ? 'email' : 'text'} className={inputClass} style={inputStyle} placeholder={field.placeholder} value={field.value} onChange={(e) => field.set(e.target.value)} required={field.required} />
                  </div>
                </motion.div>
              ))}

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                <label className="block mb-2 font-medium accent-text">Tell us about your requirements</label>
                <textarea rows={6} className={`${inputClass} resize-none`} style={inputStyle} placeholder="Describe your project needs, goals, and any specific requirements..." value={formData.requirements} onChange={(e) => setFormData({ ...formData, requirements: e.target.value })} required />
              </motion.div>

              <motion.button type="submit" disabled={isLoading} className="btn-accent w-full px-6 py-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60" whileHover={{ scale: isLoading ? 1 : 1.01 }} whileTap={{ scale: 0.99 }}>
                <span>{isLoading ? 'Submitting...' : 'Submit Plan Selection'}</span>
                {!isLoading && <Send className="w-5 h-5" />}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
