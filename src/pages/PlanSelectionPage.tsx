import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Check, ArrowLeft, Send, Mail, Globe, Share2, MessageSquare } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

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
  
  // Get selected plan from navigation state or default to standard
  const initialPlan = location.state?.selectedPlan || 'standard';
  
  const [selectedPlan, setSelectedPlan] = useState<string>(initialPlan);
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const [formData, setFormData] = useState({
    email: '',
    domain: '',
    socialMedia: '',
    requirements: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const plans: Plan[] = [
    {
      id: 'basic',
      title: 'Basic Plan',
      price: '$200',
      features: [
        'Website updates',
        'Basic social media management',
        'Monthly performance reports',
        'Email support'
      ],
      planLevel: 'basic',
      backContent: {
        description: 'Ideal for small businesses or personal brands starting online.',
        detailedFeatures: [
          'Up to 2 website content updates per month',
          '3 social media posts/week (1 platform)',
          'Monthly performance report with basic insights',
          'Email support with 24–48 hr response time',
          'Google Business profile assistance (basic info setup)'
        ],
        perfectFor: 'Perfect if you\'re just starting and need light online support.'
      }
    },
    {
      id: 'standard',
      title: 'Standard Plan',
      price: '$300',
      features: [
        'Everything in Basic',
        'Advanced SEO maintenance',
        'Reputation management',
        'Priority support'
      ],
      isPopular: true,
      planLevel: 'standard',
      backContent: {
        description: 'For growing businesses needing stronger visibility and brand trust.',
        detailedFeatures: [
          'Everything in Basic Plan',
          'Up to 5 website updates/month (including blog or menu updates)',
          '4–5 posts/week across 2 platforms (Instagram + Facebook or TikTok)',
          'Advanced SEO (on-page keywords, speed, mobile optimization)',
          'Online reputation monitoring & review response',
          'Priority support via email & WhatsApp'
        ],
        perfectFor: 'Perfect for restaurants, stores, and services looking to grow fast.'
      }
    },
    {
      id: 'premium',
      title: 'Premium Plan',
      price: '$400',
      features: [
        'Everything in Standard',
        'Event promotions',
        'Influencer marketing',
        'Dedicated account manager'
      ],
      planLevel: 'premium',
      backContent: {
        description: 'All-in-one branding support for high-growth businesses.',
        detailedFeatures: [
          'Everything in Standard Plan',
          'Up to 10 website changes/month (design edits, popups, landing pages)',
          'Daily posts on 3 platforms (Instagram, Facebook, TikTok or YouTube Shorts)',
          'Event & festival-based campaign promotions (Eid, Black Friday, etc.)',
          'Influencer collaboration management (local micro-influencers)',
          'Monthly performance meeting (Zoom or in-person if local)'
        ],
        perfectFor: 'Best for brands ready to go viral and lead in their niche.'
      }
    }
  ];

  const selectedPlanData = plans.find(plan => plan.id === selectedPlan);

  const handleCardClick = (planId: string) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(planId)) {
        newSet.delete(planId);
      } else {
        newSet.add(planId);
      }
      return newSet;
    });
  };

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      navigate('/');
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
              : 'bg-[#F3F4F6] border-[#3B82F6]/10 shadow-lg'
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
            <Check className={`w-10 h-10 ${
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
            Plan Selected Successfully!
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className={`text-lg mb-8 ${
              isDarkMode ? 'text-[#E2E2E2]' : 'text-[#1F2937]'
            }`}
          >
            Thank you for choosing the {selectedPlanData?.title}. We'll get back to you soon!
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
      <div className="max-w-6xl mx-auto px-4">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate(-1)}
          className={`mb-8 flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
            isDarkMode 
              ? 'bg-[#0D0B1F]/60 border-[#00F5FF]/30 text-[#00F5FF] hover:bg-[#00F5FF]/10'
              : 'bg-white border-[#3B82F6]/30 text-[#3B82F6] hover:bg-[#3B82F6]/10 shadow-md'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Pricing
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Plan Selection Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className={`text-3xl font-bold mb-8 ${
              isDarkMode ? 'text-white' : 'text-[#1F2937]'
            }`}>
              Select Your Plan
            </h1>
            
            <div className="space-y-4">
              {plans.map((plan) => (
                <div key={plan.id} className="relative h-80" style={{ perspective: '1000px' }}>
                  <motion.div
                    className="relative w-full h-full cursor-pointer"
                    style={{ transformStyle: 'preserve-3d' }}
                    animate={{
                      rotateY: flippedCards.has(plan.id) ? 180 : 0
                    }}
                    transition={{
                      duration: 0.6,
                      type: "spring",
                      stiffness: 200,
                      damping: 20
                    }}
                    onClick={() => handleCardClick(plan.id)}
                  >
                    {/* Front Side */}
                    <motion.div
                      className={`absolute inset-0 p-6 rounded-xl border transition-all duration-300 ${
                        selectedPlan === plan.id
                          ? isDarkMode
                            ? 'bg-[#0D0B1F]/80 border-[#00F5FF] shadow-lg shadow-[#00F5FF]/20'
                            : 'bg-white border-[#3B82F6] shadow-lg shadow-[#3B82F6]/20'
                          : isDarkMode
                            ? 'bg-[#0D0B1F]/40 border-[#00F5FF]/20 hover:border-[#00F5FF]/50'
                            : 'bg-white/80 border-[#3B82F6]/20 hover:border-[#3B82F6]/50 shadow-md'
                      }`}
                      style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(0deg)'
                      }}
                    >
                      {plan.isPopular && (
                        <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-sm ${
                          isDarkMode 
                            ? 'bg-[#00F5FF]/20 text-[#00F5FF] border border-[#00F5FF]/30'
                            : 'bg-[#3B82F6]/20 text-[#3B82F6] border border-[#3B82F6]/30'
                        }`}>
                          Most Popular
                        </div>
                      )}
                      
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className={`text-xl font-bold ${
                            isDarkMode ? 'text-white' : 'text-[#1F2937]'
                          }`}>
                            {plan.title}
                          </h3>
                          <div className="mt-2">
                            <span className={`text-3xl font-bold ${
                              isDarkMode ? 'text-white' : 'text-[#1F2937]'
                            }`}>
                              {plan.price}
                            </span>
                            <span className={isDarkMode ? 'text-gray-400' : 'text-[#6B7280]'}>
                              /month
                            </span>
                          </div>
                        </div>
                        
                        <motion.button
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            selectedPlan === plan.id
                              ? isDarkMode
                                ? 'bg-[#00F5FF] border-[#00F5FF]'
                                : 'bg-[#3B82F6] border-[#3B82F6]'
                              : isDarkMode
                                ? 'border-[#00F5FF]/30'
                                : 'border-[#3B82F6]/30'
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePlanSelect(plan.id);
                          }}
                          animate={{
                            scale: selectedPlan === plan.id ? [1, 1.2, 1] : 1
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {selectedPlan === plan.id && (
                            <Check className="w-4 h-4 text-white" />
                          )}
                        </motion.button>
                      </div>
                      
                      <ul className="space-y-2 mb-4">
                        {plan.features.map((feature, index) => (
                          <li
                            key={index}
                            className={`flex items-center gap-2 ${
                              isDarkMode ? 'text-gray-300' : 'text-[#4B5563]'
                            }`}
                          >
                            <span className={`text-lg ${
                              isDarkMode ? 'text-[#00F5FF]' : 'text-[#3B82F6]'
                            }`}>•</span>
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <div className={`text-center text-sm ${
                        isDarkMode ? 'text-[#00F5FF]' : 'text-[#3B82F6]'
                      }`}>
                        Click to see detailed features
                      </div>
                    </motion.div>

                    {/* Back Side */}
                    <motion.div
                      className={`absolute inset-0 p-6 rounded-xl border ${
                        isDarkMode
                          ? 'bg-[#0D0B1F]/90 border-[#00F5FF]/50'
                          : 'bg-white border-[#3B82F6]/50 shadow-lg'
                      }`}
                      style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                      }}
                    >
                      <div className="h-full flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className={`text-xl font-bold ${
                            isDarkMode ? 'text-[#00F5FF]' : 'text-[#3B82F6]'
                          }`}>
                            {plan.title}
                          </h3>
                          <span className={`text-2xl font-bold ${
                            isDarkMode ? 'text-white' : 'text-[#1F2937]'
                          }`}>
                            {plan.price}/month
                          </span>
                        </div>

                        <p className={`text-sm mb-4 ${
                          isDarkMode ? 'text-[#E2E2E2]' : 'text-[#4B5563]'
                        }`}>
                          {plan.backContent.description}
                        </p>

                        <div className="flex-1 overflow-y-auto">
                          <ul className="space-y-2 mb-4">
                            {plan.backContent.detailedFeatures.map((feature, index) => (
                              <li
                                key={index}
                                className={`flex items-start gap-2 text-sm ${
                                  isDarkMode ? 'text-gray-300' : 'text-[#4B5563]'
                                }`}
                              >
                                <span className={`text-lg leading-none ${
                                  isDarkMode ? 'text-[#00F5FF]' : 'text-[#3B82F6]'
                                }`}>✔</span>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className={`mt-4 p-3 rounded-lg text-sm font-medium ${
                          isDarkMode 
                            ? 'bg-[#00F5FF]/10 text-[#00F5FF]'
                            : 'bg-[#3B82F6]/10 text-[#3B82F6]'
                        }`}>
                          🛠 {plan.backContent.perfectFor}
                        </div>

                        <div className={`text-center text-xs mt-3 ${
                          isDarkMode ? 'text-[#00F5FF]/70' : 'text-[#3B82F6]/70'
                        }`}>
                          Click to flip back
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`p-8 rounded-2xl backdrop-blur-lg border ${
              isDarkMode 
                ? 'bg-[#0D0B1F]/60 border-[#00F5FF]/10'
                : 'bg-white border-[#3B82F6]/10 shadow-lg'
            }`}
          >
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
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
              <h2 className={`text-2xl font-bold mb-2 ${
                isDarkMode ? 'text-white' : 'text-[#1F2937]'
              }`}>
                Contact Information
              </h2>
              <p className={`${
                isDarkMode ? 'text-[#E2E2E2]' : 'text-[#4B5563]'
              }`}>
                Tell us about your requirements
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className={`block mb-2 font-medium ${
                  isDarkMode ? 'text-[#00F5FF]' : 'text-[#3B82F6]'
                }`} htmlFor="email">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                    isDarkMode ? 'text-[#00F5FF]/50' : 'text-[#3B82F6]/50'
                  }`} />
                  <input
                    type="email"
                    id="email"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all ${
                      isDarkMode 
                        ? 'bg-[#0A0B14] border-[#00F5FF]/20 text-white focus:border-[#00F5FF]/50 focus:ring-2 focus:ring-[#00F5FF]/20'
                        : 'bg-[#F9FAFB] border-[#3B82F6]/30 text-[#1F2937] focus:border-[#3B82F6]/50 focus:ring-2 focus:ring-[#3B82F6]/20'
                    }`}
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </motion.div>

              {/* Domain Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label className={`block mb-2 font-medium ${
                  isDarkMode ? 'text-[#00F5FF]' : 'text-[#3B82F6]'
                }`} htmlFor="domain">
                  Domain Name <span className={`${
                    isDarkMode ? 'text-gray-400' : 'text-[#6B7280]'
                  }`}>(optional)</span>
                </label>
                <div className="relative">
                  <Globe className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                    isDarkMode ? 'text-[#00F5FF]/50' : 'text-[#3B82F6]/50'
                  }`} />
                  <input
                    type="text"
                    id="domain"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all ${
                      isDarkMode 
                        ? 'bg-[#0A0B14] border-[#00F5FF]/20 text-white focus:border-[#00F5FF]/50 focus:ring-2 focus:ring-[#00F5FF]/20'
                        : 'bg-[#F9FAFB] border-[#3B82F6]/30 text-[#1F2937] focus:border-[#3B82F6]/50 focus:ring-2 focus:ring-[#3B82F6]/20'
                    }`}
                    placeholder="yourdomain.com"
                    value={formData.domain}
                    onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                  />
                </div>
              </motion.div>

              {/* Social Media Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label className={`block mb-2 font-medium ${
                  isDarkMode ? 'text-[#00F5FF]' : 'text-[#3B82F6]'
                }`} htmlFor="socialMedia">
                  Social Media Accounts <span className={`${
                    isDarkMode ? 'text-gray-400' : 'text-[#6B7280]'
                  }`}>(optional)</span>
                </label>
                <div className="relative">
                  <Share2 className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                    isDarkMode ? 'text-[#00F5FF]/50' : 'text-[#3B82F6]/50'
                  }`} />
                  <input
                    type="text"
                    id="socialMedia"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all ${
                      isDarkMode 
                        ? 'bg-[#0A0B14] border-[#00F5FF]/20 text-white focus:border-[#00F5FF]/50 focus:ring-2 focus:ring-[#00F5FF]/20'
                        : 'bg-[#F9FAFB] border-[#3B82F6]/30 text-[#1F2937] focus:border-[#3B82F6]/50 focus:ring-2 focus:ring-[#3B82F6]/20'
                    }`}
                    placeholder="@username (Instagram, Twitter, etc.)"
                    value={formData.socialMedia}
                    onChange={(e) => setFormData({ ...formData, socialMedia: e.target.value })}
                  />
                </div>
              </motion.div>

              {/* Requirements Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <label className={`block mb-2 font-medium ${
                  isDarkMode ? 'text-[#00F5FF]' : 'text-[#3B82F6]'
                }`} htmlFor="requirements">
                  Tell us about your requirements
                </label>
                <textarea
                  id="requirements"
                  rows={6}
                  className={`w-full px-4 py-3 rounded-lg border transition-all resize-none ${
                    isDarkMode 
                      ? 'bg-[#0A0B14] border-[#00F5FF]/20 text-white focus:border-[#00F5FF]/50 focus:ring-2 focus:ring-[#00F5FF]/20'
                      : 'bg-[#F9FAFB] border-[#3B82F6]/30 text-[#1F2937] focus:border-[#3B82F6]/50 focus:ring-2 focus:ring-[#3B82F6]/20'
                  }`}
                  placeholder="Describe your project needs, goals, and any specific requirements..."
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  required
                />
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className={`w-full px-6 py-4 border rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 group ${
                  isDarkMode 
                    ? 'bg-[#00F5FF]/10 hover:bg-[#00F5FF]/20 border-[#00F5FF]/30 text-white'
                    : 'bg-[#3B82F6]/10 hover:bg-[#3B82F6]/20 border-[#3B82F6]/30 text-[#3B82F6]'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <span>Submit Plan Selection</span>
                <Send className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}