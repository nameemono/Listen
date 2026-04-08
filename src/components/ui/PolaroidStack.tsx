"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PolaroidItem {
  name: string;
  image: string;
}

interface PolaroidStackProps {
  items: PolaroidItem[];
  selectedIndex: number;
}

export const PolaroidStack = ({ items, selectedIndex }: PolaroidStackProps) => {
  // We only show a few "decorative" ones behind the selected one
  // or a default set if none selected.
  
  const getRotation = (index: number) => {
    const rotations = [-6, 4, -2, 8, -5, 3];
    return rotations[index % rotations.length];
  };

  return (
    <div className="relative w-64 h-80 mx-auto mt-12 md:mt-0">
      <AnimatePresence mode="popLayout">
        {items.map((item, index) => {
          const isSelected = selectedIndex === index;
          const isVisible = isSelected || (selectedIndex === -1 && index < 3);
          
          if (!isVisible && !isSelected) return null;

          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.8, y: 20, rotate: getRotation(index) }}
              animate={{ 
                opacity: 1, 
                scale: isSelected ? 1.1 : 1,
                y: isSelected ? -20 : 0,
                rotate: isSelected ? 0 : getRotation(index),
                zIndex: isSelected ? 50 : 10 - index,
              }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="absolute inset-0 bg-white p-3 pb-12 shadow-2xl border border-gray-200"
              style={{ transformOrigin: "center bottom" }}
            >
              <div className="w-full h-full overflow-hidden bg-gray-100">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute bottom-2 left-0 right-0 text-center">
                <span className="font-serif italic text-gray-800 text-sm tracking-tight">
                  {item.name}
                </span>
              </div>
              
              {/* Polaroid Texture/Shadow Overlay */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-black/5 to-transparent" />
            </motion.div>
          );
        })}
      </AnimatePresence>
      
      {/* Default placeholder if nothing is selected and we want a "stack" look */}
      {selectedIndex === -1 && (
        <div className="absolute inset-0 flex items-center justify-center text-brand-white/10 uppercase tracking-[0.2em] text-[10px] border border-dashed border-white/10 rounded-sm">
          Select a drink
        </div>
      )}
    </div>
  );
};
