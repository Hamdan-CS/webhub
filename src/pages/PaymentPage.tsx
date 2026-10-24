import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Calendar, Lock, CheckCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function PaymentPage() {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { isDarkMode } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const inputClass = isDarkMode
    ? 'w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--color-bg)] border text-[var(--color-text)] focus:ring-2 transition-all'
    : 'w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--color-bg-elevated)] border text-[var(--color-text)] focus:ring-2 transition-all';

  const inputStyle = {
    borderColor: 'var(--color-border-strong)',
  };

  const focusRingStyle = {
    '--tw-ring-color': 'var(--color-accent)',
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="glass-card p-12 text-center max-w-xl w-full"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
            style={{ background: 'color-mix(in srgb, var(--color-accent) 15%, transparent)' }}
          >
            <CheckCircle className="w-10 h-10 accent-text" />
          </motion.div>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-display text-3xl font-bold mb-4 accent-text"
          >
            Payment Successful!
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg mb-8 text-[var(--color-text-secondary)]"
          >
            Thank you for your payment. Your transaction has been completed successfully.
          </motion.p>
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsSubmitted(false)}
            className="btn-outline px-6 py-3 rounded-xl font-medium"
          >
            Make Another Payment
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
              style={{ background: 'color-mix(in srgb, var(--color-accent) 15%, transparent)' }}
            >
              <CreditCard className="w-8 h-8 accent-text" />
            </motion.div>
            <h1 className="font-display text-4xl font-bold mb-4 tracking-tight text-[var(--color-text)]">
              Payment Details
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)]">
              Complete your payment securely
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-sm font-medium mb-2 accent-text" htmlFor="cardNumber">
                Card Number
              </label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--color-text-muted)' }} />
                <input
                  type="text"
                  id="cardNumber"
                  className={inputClass}
                  style={{ ...inputStyle, ...focusRingStyle }}
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                  required
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-sm font-medium mb-2 accent-text" htmlFor="cardName">
                Cardholder Name
              </label>
              <input
                type="text"
                id="cardName"
                className={inputClass}
                style={{ ...inputStyle, ...focusRingStyle }}
                placeholder="John Doe"
                value={formData.cardName}
                onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                required
              />
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-sm font-medium mb-2 accent-text" htmlFor="expiryDate">
                  Expiry Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--color-text-muted)' }} />
                  <input
                    type="text"
                    id="expiryDate"
                    className={inputClass}
                    style={{ ...inputStyle, ...focusRingStyle }}
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                    required
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-sm font-medium mb-2 accent-text" htmlFor="cvv">
                  CVV
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--color-text-muted)' }} />
                  <input
                    type="password"
                    id="cvv"
                    maxLength={4}
                    className={inputClass}
                    style={{ ...inputStyle, ...focusRingStyle }}
                    placeholder="123"
                    value={formData.cvv}
                    onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                    required
                  />
                </div>
              </motion.div>
            </div>

            <motion.button
              type="submit"
              className="btn-accent w-full px-6 py-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 group mt-8"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <span>Complete Payment</span>
              <Lock className="w-5 h-5 transition-transform group-hover:scale-110" />
            </motion.button>
          </form>

          <div className="mt-8 flex items-center justify-center gap-2 text-[var(--color-text-muted)] text-sm">
            <Lock className="w-4 h-4" />
            <span>Your payment information is secure and encrypted</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
