"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, Award, Play, ChevronDown } from "lucide-react";

// Compact Text Flip Component
const cn = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

export interface ContainerTextFlipProps {
  words?: string[];
  interval?: number;
  className?: string;
  textClassName?: string;
  animationDuration?: number;
}

export function ContainerTextFlip({
  words = ["Acquisitions", "Deal Flow", "Portfolio Companies", "Strategic Roll-Ups", "Successful Exits"],
  interval = 2500,
  className,
  textClassName,
  animationDuration = 500,
}: ContainerTextFlipProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsAnimating(true);

      setTimeout(() => {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        setIsAnimating(false);
      }, animationDuration / 2);
    }, interval);

    return () => clearInterval(intervalId);
  }, [words, interval, animationDuration]);

  return (
    <div className="relative inline-block">
      <span
        className={cn(
          "inline-block text-xl md:text-2xl lg:text-3xl font-bold transition-all duration-500",
          "bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 bg-clip-text text-transparent",
          "drop-shadow-sm",
          isAnimating ? "opacity-0 transform translate-y-2 scale-95" : "opacity-100 transform translate-y-0 scale-100",
          className,
        )}
      >
        {words[currentWordIndex]}
      </span>
    </div>
  );
}

// FIXED: Responsive Lottie Player Component with lazy loading
const LottiePlayer = ({ src }: { src: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 400, height: 400 });
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const containerWidth = container.offsetWidth;
        // Make it responsive with proper aspect ratio
        const size = Math.min(containerWidth, 500);
        setDimensions({ width: size, height: size });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    // Lazy load iframe after a short delay to prioritize critical content
    const loadTimer = setTimeout(() => {
      setShouldLoad(true);
    }, 500);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      clearTimeout(loadTimer);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full flex justify-center items-center rounded-2xl overflow-hidden relative"
    >
      <div className="relative" style={{ width: dimensions.width, height: dimensions.height }}>
        {shouldLoad ? (
          <iframe
            src="https://cdn.lottielab.com/l/5Gn1jXUt1kSREm.html"
            className="w-full h-full border-0 rounded-2xl"
            title="Lottie Animation"
            frameBorder="0"
            loading="lazy"
            style={{
              minWidth: '280px',
              minHeight: '280px',
              maxWidth: '500px',
              maxHeight: '500px'
            }}
          />
        ) : (
          <div 
            className="w-full h-full bg-gray-100 rounded-2xl flex items-center justify-center"
            style={{
              minWidth: '280px',
              minHeight: '280px',
              maxWidth: '500px',
              maxHeight: '500px'
            }}
          >
            <div className="animate-pulse text-gray-400">Loading...</div>
          </div>
        )}
        {/* Badge overlay - positioned more precisely with Process text and rounded edges */}
        <div className="absolute bottom-2 right-2 w-32 h-12 bg-white rounded-lg opacity-100 z-10 flex items-center justify-center shadow-md">
          <span className="text-xs font-semibold text-gray-700">Process</span>
        </div>
      </div>
    </div>
  );
};

// Optimized Animation component
const AnimatedDiv = ({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !inView) {
          setTimeout(() => setInView(true), delay);
          observer.disconnect(); // Stop observing after animation
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay, inView]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
};

// Enhanced Deal Flow Section
const DealFlowSection = () => {
  return (
    <div className="py-8 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)`
        }}></div>
      </div>
    </div>
  );
};

// Main Hero Component
export function HomeHero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="w-full">
      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 0.4; transform: scale(1.1); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        
        .floating { animation: float 6s ease-in-out infinite; }
        .pulse-glow { animation: pulse-glow 4s ease-in-out infinite; }
        .duration-800 { transition-duration: 800ms; }
        .duration-600 { transition-duration: 600ms; }
      `}</style>

      {/* Hero Section */}
      <div className="min-h-screen flex flex-col justify-center bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left: Content */}
            <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
              {/* Badge */}
              <AnimatedDiv className="inline-flex items-center bg-blue-100 border border-blue-200 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-6 sm:mb-8">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mr-2 sm:mr-3" />
                <span className="text-xs sm:text-sm font-semibold text-blue-800">First-of-its-kind Micro Private Equity Firm</span>
              </AnimatedDiv>

              {/* Main Headline */}
              <AnimatedDiv delay={100}>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                  <span className="text-blue-600">Pocket Fund</span>
                </h1>
              </AnimatedDiv>

              {/* Dynamic Subheadline - Restructured */}
              <AnimatedDiv delay={200} className="space-y-3 sm:space-y-4">
                <div className="text-xl sm:text-2xl md:text-3xl text-gray-700 font-medium">
                  Transforms Ideas Into
                </div>
                <div className="flex justify-center lg:justify-start">
                  <ContainerTextFlip
                    words={["Acquisitions", "Deal Flow", "Portfolio Companies", "Strategic Roll-Ups", "Successful Exits"]}
                    interval={1800}
                    animationDuration={400}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
                  />
                </div>
              </AnimatedDiv>

              {/* Value Proposition */}
              <AnimatedDiv delay={300}>
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl lg:max-w-none">
                  Pocket Fund bridges the gap between ambitious buyers and quality deals
                </p>
              </AnimatedDiv>

              {/* CTA Buttons */}
              <AnimatedDiv delay={500} className="flex flex-col sm:flex-row gap-4 pt-4">
                <a href="/#contact" className="group px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2">
                  Start Your Search
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
                <a href="/#timeline" className="group px-6 sm:px-8 py-3 sm:py-4 border-2 border-gray-200 text-gray-700 bg-white rounded-xl hover:border-blue-200 hover:text-blue-600 transition-all duration-300 flex items-center justify-center gap-2">
                  <Play className="w-5 h-5" />
                  Our Process
                </a>
              </AnimatedDiv>
            </div>

            {/* Right: Enhanced Visual */}
            <AnimatedDiv delay={600} className="flex items-center justify-center mt-8 lg:mt-0">
              <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 rounded-3xl blur-3xl opacity-10"></div>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 bg-white/10 backdrop-blur-sm">
                  <LottiePlayer src="https://cdn.lottielab.com/l/5Gn1jXUt1kSREm.json" />
                </div>
              </div>
            </AnimatedDiv>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="text-center pb-8">
          <ChevronDown className="w-6 h-6 text-gray-400 mx-auto animate-bounce" />
        </div>
      </div>

      {/* Deal Flow Section */}
      <DealFlowSection />
    </div>
  );
}
