"use client";

import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface SliderItem {
  name: string;
  image: string;
}

interface ImageAutoSliderProps {
  items: SliderItem[];
  selectedIndex: number;
}

export const ImageAutoSlider = ({ items, selectedIndex }: ImageAutoSliderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  // Handle manual selection
  useEffect(() => {
    if (selectedIndex !== -1 && containerRef.current) {
      const itemWidth = 320 + 24; // w-80 (320px) + gap-6 (24px)
      const targetX = -(selectedIndex * itemWidth);
      
      controls.start({
        x: targetX,
        transition: { type: "spring", stiffness: 100, damping: 20 }
      });
    }
  }, [selectedIndex, controls]);

  // Infinite scroll animation (only if no item is selected)
  useEffect(() => {
    if (selectedIndex === -1) {
      controls.start({
        x: [0, -(items.length * (320 + 24))],
        transition: {
          duration: 30,
          ease: "linear",
          repeat: Infinity
        }
      });
    }
  }, [selectedIndex, controls, items.length]);

  // Duplicate items for seamless loop if needed, 
  // but for "scroll to" we might want a clean list.
  // We'll use a single list for now to make "scroll to index" reliable.
  const displayItems = items;

  return (
    <section className="w-full bg-brand-black py-20 overflow-hidden relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-charcoal/50 to-brand-black z-0" />
      
      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <p className="text-brand-silver uppercase tracking-[0.3em] text-[10px] mb-2">Visual Palette</p>
          <h2 className="text-3xl font-display font-light italic font-serif">Drink Gallery</h2>
        </div>

        <div className="scroll-container w-full relative">
          {/* Masking gradients */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-brand-black to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-brand-black to-transparent z-20 pointer-events-none" />

          <div className="px-[10%]">
            <motion.div 
              animate={controls}
              className="flex gap-6 w-max"
            >
              {displayItems.map((item, index) => (
                <motion.div
                  key={index}
                  animate={{ 
                    scale: selectedIndex === index ? 1.05 : 0.95,
                    opacity: selectedIndex === -1 || selectedIndex === index ? 1 : 0.4
                  }}
                  className="flex-shrink-0 w-64 md:w-80 group"
                >
                  <div className="aspect-square rounded-sm overflow-hidden shadow-2xl border border-white/5 mb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="text-center">
                    <p className={`text-[10px] uppercase tracking-[0.2em] transition-colors duration-500 ${selectedIndex === index ? 'text-brand-orange font-bold' : 'text-brand-white/40'}`}>
                      {item.name}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-brand-black to-transparent z-20" />
    </section>
  );
};
