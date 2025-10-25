import React from 'react';
import { motion } from 'framer-motion';

export function LoadingScreen() {
  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="loading-text mb-4">INITIALIZING INTERFACE</h2>
        <div className="h-2 w-48 bg-[#111] rounded-full overflow-hidden mx-auto">
          <motion.div
            className="h-full bg-gradient-to-r from-[#FF2E63]/30 via-[#bc13fe]/30 to-[#00F5FF]/30"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 2, ease: "linear" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}