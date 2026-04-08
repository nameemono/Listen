import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import VinylLoader from './ui/loader';

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onLoadingComplete) {
        setTimeout(onLoadingComplete, 1000); // Wait for fade out animation
      }
    }, 3500); // Show loader for 3.5 seconds

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-brand-black flex flex-col items-center justify-center"
        >
          <VinylLoader />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-12 text-center"
          >
            <div className="flex flex-col items-center">
              <img 
                src="https://i.postimg.cc/zfCwyxrL/Screenshot-2026-04-08-184553-(1).png" 
                alt="Listen HiFi Cafe Logo" 
                className="h-20 w-auto object-contain brightness-0 invert"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="mt-8 text-[10px] uppercase tracking-[0.4em] text-brand-orange font-bold animate-pulse">
              Preparing the needle & preloading the map...
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
