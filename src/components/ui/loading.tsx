"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Only show loading on first visit
    const hasLoaded = sessionStorage.getItem("hasLoadedBefore");
    
    if (!hasLoaded) {
      setIsLoading(true);
      sessionStorage.setItem("hasLoadedBefore", "true");
      
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
        >
          {/* Logo zoom-in animation */}
          <motion.div
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ 
              scale: [0.3, 1.1, 1],
              opacity: [0, 1, 1]
            }}
            transition={{ 
              duration: 1.5,
              times: [0, 0.7, 1],
              ease: [0.34, 1.56, 0.64, 1]
            }}
            className="relative"
          >
            {/* Glow effect behind logo */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"
              style={{ transform: 'translate(-10%, -10%)', width: '120%', height: '120%' }}
            />
            
            {/* Logo */}
            <div className="relative w-48 h-48 md:w-64 md:h-64">
              <Image
                src="/Logo/pflogobg.webp"
                alt="Pocket Fund Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>

          {/* Loading text below logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="absolute bottom-32 flex flex-col items-center gap-4"
          >
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              Pocket Fund
            </h2>
            
            {/* Loading dots */}
            <div className="flex gap-1.5">
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: index * 0.2,
                    ease: "easeInOut",
                  }}
                  className="w-2 h-2 rounded-full bg-blue-600"
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

