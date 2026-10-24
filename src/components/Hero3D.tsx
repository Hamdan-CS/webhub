import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

export function Hero3D() {
  const { isDarkMode } = useTheme();

  return (
    <div className="relative w-full h-[400px] md:h-[500px] perspective-2000 flex items-center justify-center">
      {/* Outer rotating ring */}
      <motion.div
        className="absolute w-72 h-72 md:w-96 md:h-96 preserve-3d rotate-3d-slow"
        style={{ animationDuration: '30s' }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-2xl border"
            style={{
              transform: `rotateY(${(180 / 6) * i}deg) translateZ(140px)`,
              borderColor: isDarkMode ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0.1)',
              background: isDarkMode
                ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.03), rgba(6, 182, 212, 0.02))'
                : 'linear-gradient(135deg, rgba(99, 102, 241, 0.02), rgba(14, 165, 233, 0.01))',
            }}
          />
        ))}
      </motion.div>

      {/* Middle ring - opposite rotation */}
      <motion.div
        className="absolute w-52 h-52 md:w-64 md:h-64 preserve-3d"
        animate={{ rotateY: [0, -360], rotateX: [0, -360] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-full border-2"
            style={{
              transform: `rotateY(${(180 / 4) * i}deg) translateZ(100px)`,
              borderColor: isDarkMode ? 'rgba(6, 182, 212, 0.2)' : 'rgba(14, 165, 233, 0.15)',
            }}
          />
        ))}
      </motion.div>

      {/* Central floating cube */}
      <motion.div
        className="relative w-28 h-28 md:w-36 md:h-36 preserve-3d"
        animate={{
          rotateX: [0, 360],
          rotateY: [0, 360],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        {/* Cube faces */}
        {[
          { transform: 'translateZ(48px)', label: 'W' },
          { transform: 'rotateY(180deg) translateZ(48px)', label: 'H' },
          { transform: 'rotateY(90deg) translateZ(48px)', label: 'U' },
          { transform: 'rotateY(-90deg) translateZ(48px)', label: 'B' },
          { transform: 'rotateX(90deg) translateZ(48px)', label: '' },
          { transform: 'rotateX(-90deg) translateZ(48px)', label: '' },
        ].map((face, i) => (
          <div
            key={i}
            className="absolute inset-0 flex items-center justify-center rounded-xl border backdrop-blur-sm"
            style={{
              transform: face.transform,
              background: isDarkMode
                ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(6, 182, 212, 0.08))'
                : 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(14, 165, 233, 0.05))',
              borderColor: isDarkMode ? 'rgba(99, 102, 241, 0.3)' : 'rgba(99, 102, 241, 0.2)',
              boxShadow: isDarkMode ? 'inset 0 0 20px rgba(99, 102, 241, 0.1)' : 'none',
            }}
          >
            <span
              className="font-display text-2xl md:text-3xl font-bold"
              style={{ color: isDarkMode ? '#818CF8' : '#6366F1' }}
            >
              {face.label}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Floating orbs */}
      {[
        { size: 12, x: -160, y: -80, delay: 0, color: 'var(--color-accent)' },
        { size: 8, x: 140, y: -100, delay: 1, color: 'var(--color-accent-2)' },
        { size: 16, x: 120, y: 120, delay: 2, color: 'var(--color-accent)' },
        { size: 10, x: -130, y: 100, delay: 1.5, color: 'var(--color-accent-2)' },
        { size: 6, x: 0, y: -160, delay: 0.5, color: 'var(--color-accent-light)' },
      ].map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: '50%',
            top: '50%',
            background: orb.color,
            boxShadow: `0 0 ${orb.size * 3}px ${orb.color}`,
          }}
          animate={{
            x: [orb.x, orb.x + 30, orb.x - 20, orb.x],
            y: [orb.y, orb.y - 30, orb.y + 20, orb.y],
            scale: [1, 1.3, 0.8, 1],
            opacity: [0.6, 1, 0.7, 0.6],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: orb.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Glow base */}
      <div
        className="absolute bottom-0 w-64 h-32 rounded-full blur-3xl opacity-40"
        style={{ background: 'radial-gradient(ellipse, var(--glow-primary), transparent 70%)' }}
      />
    </div>
  );
}
