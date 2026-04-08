"use client";

import { cn } from "@/src/lib/utils";
import React from "react";
import { motion } from "framer-motion";

interface CinematicSwitchProps {
  isOn: boolean;
  onToggle: () => void;
}

export default function CinematicSwitch({ isOn, onToggle }: CinematicSwitchProps) {
  return (
    <div className="flex items-center justify-center">
      {/* Switch Container */}
      <div
        className="flex items-center gap-4 p-3 rounded-2xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm shadow-xl cursor-pointer"
        onClick={onToggle}
      >
        {/* 'FEATURED' Label */}
        <span className={`text-[10px] font-bold tracking-widest transition-colors duration-300 ${!isOn ? "text-brand-orange" : "text-zinc-700"}`}>
          FEATURED
        </span>

        {/* Switch Track */}
        <motion.div
          className="relative w-14 h-7 rounded-full shadow-inner"
          initial={false}
          animate={{
            backgroundColor: isOn ? "#451a03" : "#27272a", // Dark orange-ish vs Zinc-800
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Switch Thumb */}
          <motion.div
            className="absolute top-1 left-1 w-5 h-5 rounded-full border border-white/10 shadow-md"
            initial={false}
            animate={{
              x: isOn ? 28 : 0,
              backgroundColor: isOn ? "#FF6B01" : "#52525b", // Brand Orange vs Zinc-600
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            whileTap={{ scale: 0.9 }}
          >
            {/* Thumb Highlight (Gloss) */}
            <div className="absolute top-1 left-1.5 w-2 h-1 bg-white/30 rounded-full blur-[1px]" />
          </motion.div>
        </motion.div>

        {/* 'FULL MENU' Label */}
        <span className={`text-[10px] font-bold tracking-widest transition-colors duration-300 ${isOn ? "text-brand-orange drop-shadow-[0_0_8px_rgba(255,107,1,0.5)]" : "text-zinc-700"}`}>
          FULL MENU
        </span>
      </div>
    </div>
  );
}
