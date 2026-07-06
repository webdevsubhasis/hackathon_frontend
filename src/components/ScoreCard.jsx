import React from 'react';
import { motion } from 'framer-motion';

const colorFor = (score) => {
  if (score >= 75) return { ring: '#1BA362', text: 'text-emerald-400' };
  if (score >= 50) return { ring: '#D19E14', text: 'text-amber-400' };
  return { ring: '#D14343', text: 'text-red-400' };
};

export default function ScoreCard({ label, score = 0, icon: Icon, delay = 0 }) {
  const { ring, text } = colorFor(score);
  const circumference = 2 * Math.PI * 34;
  const offset = circumference - (score / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="glass-card p-5 flex items-center gap-4 hover:border-accent/30 transition-colors"
    >
      <div className="relative w-20 h-20 shrink-0">
        <svg viewBox="0 0 80 80" className="w-20 h-20 -rotate-90">
          <circle cx="40" cy="40" r="34" fill="none" stroke="#1E2A47" strokeWidth="7" />
          <motion.circle
            cx="40" cy="40" r="34" fill="none" stroke={ring} strokeWidth="7" strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, delay: delay + 0.2, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`font-bold text-lg ${text}`}>{Math.round(score)}</span>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2 text-slate-400 mb-1">
          {Icon && <Icon size={15} />}
          <span className="text-xs uppercase tracking-wide font-medium">{label}</span>
        </div>
        <p className="text-sm text-slate-500">out of 100</p>
      </div>
    </motion.div>
  );
}
