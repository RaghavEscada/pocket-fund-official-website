"use client";

import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "./lamp";

interface LampHeroProps {
  title: string;
  subtitle?: string;
}

export function LampHero({ title, subtitle }: LampHeroProps) {
  return (
    <LampContainer>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.2,
          duration: 0.5,
          ease: "easeOut",
        }}
        className="mt-8 text-center"
        style={{ willChange: "opacity, transform" }}
      >
        <h1 className="bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-7xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </motion.div>
    </LampContainer>
  );
}





