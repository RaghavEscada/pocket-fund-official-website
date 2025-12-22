"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, Award, Play, ChevronDown } from "lucide-react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
});

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
          "inline-block text-xl md:text-2xl lg:text-3xl font-bold transition-all duration-500 tracking-tight",
          "bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 bg-clip-text text-transparent",
          "drop-shadow-sm",
          isAnimating ? "opacity-0 transform translate-y-2 scale-95" : "opacity-100 transform translate-y-0 scale-100",
          className,
        )}
        style={{ letterSpacing: '-0.01em' }}
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
    <div className={`w-full ${montserrat.variable}`} style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
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
      <div className="min-h-screen flex flex-col justify-center bg-gradient-to-b from-white via-gray-50/30 to-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#366EF3]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#366EF3]/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Content */}
            <div className="space-y-8 sm:space-y-10 text-center lg:text-left">
              {/* Badge */}
              <AnimatedDiv className="inline-flex items-center bg-gradient-to-r from-[#366EF3]/10 to-[#366EF3]/5 border border-[#366EF3]/20 rounded-full px-5 sm:px-6 py-2.5 sm:py-3 shadow-sm">
                <Award className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#366EF3' }} />
                <span className="text-xs sm:text-sm font-semibold ml-2.5" style={{ fontFamily: 'var(--font-montserrat), sans-serif', color: '#366EF3' }}>
                  First-of-its-kind Micro Private Equity Firm
                </span>
              </AnimatedDiv>

              {/* Main Headline */}
              <AnimatedDiv delay={100} className="space-y-4">
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-gray-900 leading-[1.1] tracking-tight" style={{ fontFamily: 'var(--font-montserrat), sans-serif', letterSpacing: '-0.03em' }}>
                  <span style={{ color: '#366EF3' }}>Pocket Fund</span>
                </h1>
              </AnimatedDiv>

              {/* Dynamic Subheadline - Restructured */}
              <AnimatedDiv delay={200} className="space-y-4">
                <div className="text-2xl sm:text-3xl md:text-4xl text-gray-700 font-semibold tracking-tight" style={{ fontFamily: 'var(--font-montserrat), sans-serif', letterSpacing: '-0.02em' }}>
                  Transforms Ideas Into
                </div>
                <div className="flex justify-center lg:justify-start min-h-[3rem] sm:min-h-[4rem] md:min-h-[5rem]">
                  <ContainerTextFlip
                    words={["Acquisitions", "Deal Flow", "Portfolio Companies", "Strategic Roll-Ups", "Successful Exits"]}
                    interval={1800}
                    animationDuration={400}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight"
                    textClassName="tracking-tight"
                  />
                </div>
              </AnimatedDiv>

              {/* Value Proposition */}
              <AnimatedDiv delay={300}>
                <p className="text-lg sm:text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl lg:max-w-none font-normal" style={{ fontFamily: 'var(--font-montserrat), sans-serif', letterSpacing: '0' }}>
                  Pocket Fund bridges the gap between ambitious buyers and quality deals
                </p>
              </AnimatedDiv>

              {/* CTA Buttons */}
              <AnimatedDiv delay={500} className="flex flex-col sm:flex-row gap-4 pt-6">
                <a 
                  href="/#contact" 
                  className="group px-8 sm:px-10 py-4 sm:py-5 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 text-base sm:text-lg" 
                  style={{ 
                    fontFamily: 'var(--font-montserrat), sans-serif',
                    backgroundColor: '#366EF3',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2d5dd9'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#366EF3'}
                >
                  Start Your Search
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
                <a 
                  href="/#timeline" 
                  className="group px-8 sm:px-10 py-4 sm:py-5 border-2 border-gray-300 text-gray-700 bg-white rounded-xl hover:border-[#366EF3] hover:text-[#366EF3] transition-all duration-300 flex items-center justify-center gap-2 text-base sm:text-lg font-semibold shadow-sm hover:shadow-md" 
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                >
                  <Play className="w-5 h-5" />
                  Our Process
                </a>
              </AnimatedDiv>
            </div>

            {/* Right: Enhanced Visual */}
            <AnimatedDiv delay={600} className="flex items-center justify-center mt-12 lg:mt-0">
              <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-[#366EF3]/20 to-[#366EF3]/10 rounded-3xl blur-3xl opacity-60"></div>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-[#366EF3]/10 bg-white/50 backdrop-blur-sm">
                  <LottiePlayer src="https://cdn.lottielab.com/l/5Gn1jXUt1kSREm.json" />
                </div>
              </div>
            </AnimatedDiv>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="text-center pb-12 pt-8">
          <ChevronDown className="w-6 h-6 mx-auto animate-bounce" style={{ color: '#366EF3' }} />
        </div>
      </div>

      {/* Deal Flow Section */}
      <DealFlowSection />
    </div>
  );
}
