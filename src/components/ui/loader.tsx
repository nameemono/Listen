import React from 'react';
import { motion } from 'motion/react';

export default function VinylLoader() {
  return (
    <div className="relative w-48 h-48 flex items-center justify-center">
      {/* Tone Arm / Needle */}
      <motion.div 
        initial={{ rotate: -45, x: 20, y: -20 }}
        animate={{ rotate: -15, x: 0, y: 0 }}
        transition={{ 
          duration: 1.5, 
          ease: "easeOut",
          delay: 0.5
        }}
        className="absolute top-0 right-0 z-20 origin-top-right"
      >
        <div className="relative">
          {/* Tone Arm Body */}
          <div className="w-32 h-2 bg-neutral-400 rounded-full shadow-lg" />
          {/* Needle Head */}
          <div className="absolute -left-2 top-0 w-6 h-4 bg-neutral-600 rounded-sm transform -rotate-12" />
          {/* Pivot Point */}
          <div className="absolute -right-2 -top-2 w-6 h-6 bg-neutral-800 rounded-full border-2 border-neutral-600" />
        </div>
      </motion.div>

      {/* Spinning Vinyl */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="relative w-40 h-40 rounded-full bg-neutral-900 shadow-2xl flex items-center justify-center border-4 border-neutral-800 overflow-hidden"
      >
        {/* Grooves */}
        <div className="absolute inset-2 rounded-full border border-white/5" />
        <div className="absolute inset-4 rounded-full border border-white/5" />
        <div className="absolute inset-6 rounded-full border border-white/5" />
        <div className="absolute inset-8 rounded-full border border-white/5" />
        <div className="absolute inset-10 rounded-full border border-white/5" />
        
        {/* White Label */}
        <div className="w-14 h-14 bg-brand-white rounded-full flex items-center justify-center shadow-inner z-10">
          {/* Spindle Hole */}
          <div className="w-2 h-2 bg-brand-black rounded-full" />
          {/* Brand Text on Label */}
          <div className="absolute text-[4px] font-bold text-brand-black/20 uppercase tracking-tighter">
            Listen HiFi
          </div>
        </div>

        {/* Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-50" />
      </motion.div>

      {/* Base / Turntable Platter Shadow */}
      <div className="absolute -bottom-4 w-44 h-4 bg-black/40 blur-xl rounded-full" />
    </div>
  );
}
