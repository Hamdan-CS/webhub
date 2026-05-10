import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Calendar, Lock, CheckCircle } from 'lucide-react';

export function PaymentPage() {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="bg-[#0D0B1F]/60 p-12 rounded-2xl backdrop-blur-lg border border-[#00F5FF]/10 text-center max-w-xl w-full"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#00F5FF]/10 flex items-center justify-center"
          >
            <CheckCircle className="w-10 h-10 text-[#00F5FF]" />
          </motion.div>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold mb-4 text-[#00F5FF]"
          >
            Payment Successful!
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-[#E2E2E2] text-lg mb-8"
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
            className="px-6 py-3 bg-[#00F5FF]/10 hover:bg-[#00F5FF]/20 border border-[#00F5FF]/30 rounded-lg text-white font-medium transition-all duration-200"
          >
            Make Another Payment
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#0D0B1F]/60 p-8 rounded-2xl backdrop-blur-lg border border-[#00F5FF]/10"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#00F5FF]/10 flex items-center justify-center"
            >
              <CreditCard className="w-8 h-8 text-[#00F5FF]" />
            </motion.div>
            <h1 className="text-4xl font-bold mb-4 neon-glow">Payment Details</h1>
            <p className="text-[#E2E2E2] text-lg">
              Complete your payment securely
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-[#00F5FF] mb-2" htmlFor="cardNumber">
                Card Number
              </label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00F5FF]/50" />
                <input
                  type="text"
                  id="cardNumber"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#0A0B14] border border-[#00F5FF]/20 text-white focus:border-[#00F5FF]/50 focus:ring-2 focus:ring-[#00F5FF]/20 transition-all"
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
              <label className="block text-[#00F5FF] mb-2" htmlFor="cardName">
                Cardholder Name
              </label>
              <input
                type="text"
                id="cardName"
                className="w-full px-4 py-3 rounded-lg bg-[#0A0B14] border border-[#00F5FF]/20 text-white focus:border-[#00F5FF]/50 focus:ring-2 focus:ring-[#00F5FF]/20 transition-all"
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
                <label className="block text-[#00F5FF] mb-2" htmlFor="expiryDate">
                  Expiry Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00F5FF]/50" />
                  <input
                    type="text"
                    id="expiryDate"
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#0A0B14] border border-[#00F5FF]/20 text-white focus:border-[#00F5FF]/50 focus:ring-2 focus:ring-[#00F5FF]/20 transition-all"
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
                <label className="block text-[#00F5FF] mb-2" htmlFor="cvv">
                  CVV
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00F5FF]/50" />
                  <input
                    type="password"
                    id="cvv"
                    maxLength={4}
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#0A0B14] border border-[#00F5FF]/20 text-white focus:border-[#00F5FF]/50 focus:ring-2 focus:ring-[#00F5FF]/20 transition-all"
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
              className="w-full px-6 py-4 bg-[#00F5FF]/10 hover:bg-[#00F5FF]/20 border border-[#00F5FF]/30 rounded-lg text-white font-medium transition-all duration-200 flex items-center justify-center gap-2 group mt-8"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Complete Payment</span>
              <Lock className="w-5 h-5 transition-transform group-hover:scale-110" />
            </motion.button>
          </form>

          <div className="mt-8 flex items-center justify-center gap-2 text-[#E2E2E2] text-sm">
            <Lock className="w-4 h-4" />
            <span>Your payment information is secure and encrypted</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}