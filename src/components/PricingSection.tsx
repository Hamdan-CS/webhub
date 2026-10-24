import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PricingCard } from './PricingCard';
import { LoadingScreen } from './LoadingScreen';

export function PricingSection() {
  const [showLoading, setShowLoading] = useState(false);

  const handlePlanSelect = () => {
    setShowLoading(true);
    setTimeout(() => setShowLoading(false), 2000);
  };

  const plans = [
    {
      title: 'Basic Plan',
      price: '$200',
      features: [
        'Website updates',
        'Basic social media management',
        'Monthly performance reports',
        'Email support'
      ],
      planLevel: 'basic'
    },
    {
      title: 'Standard Plan',
      price: '$300',
      features: [
        'Everything in Basic',
        'Advanced SEO maintenance',
        'Reputation management',
        'Priority support'
      ],
      isPopular: true,
      planLevel: 'standard'
    },
    {
      title: 'Premium Plan',
      price: '$400',
      features: [
        'Everything in Standard',
        'Event promotions',
        'Influencer marketing',
        'Dedicated account manager'
      ],
      planLevel: 'premium'
    }
  ];

  return (
    <div className="relative py-20 overflow-hidden" id="pricing">
      <AnimatePresence>
        {showLoading && <LoadingScreen />}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl font-bold mb-4 glitch"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            Choose Your Plan
          </motion.h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Select a plan that fits your needs and watch your digital presence transform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" onClick={handlePlanSelect}>
          {plans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </div>
  );
}