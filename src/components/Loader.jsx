import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function Loader({ label = 'Loading...', fullScreen = false }) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.1, ease: 'linear' }}
        className="w-10 h-10 rounded-full border-2 border-accent/20 border-t-accent flex items-center justify-center"
      >
        <Sparkles size={14} className="text-accent" />
      </motion.div>
      <p className="text-sm text-slate-400 font-medium tracking-wide">{label}</p>
    </div>
  );

  if (fullScreen) {
    return <div className="min-h-screen flex items-center justify-center bg-navy-950">{content}</div>;
  }
  return <div className="py-16 flex items-center justify-center">{content}</div>;
}
