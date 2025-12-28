"use client";

import { useEffect, useRef, useState } from "react";
import { LogoMarquee } from "./LogoMarquee";

// Responsive Lottie Player Component
const LottiePlayer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 400, height: 400 });
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const containerWidth = container.offsetWidth;
        const size = Math.min(containerWidth, 500);
        setDimensions({ width: size, height: size });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
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
      className="w-full flex justify-center items-center overflow-hidden relative"
    >
      <div className="relative" style={{ width: dimensions.width, height: dimensions.height }}>
        {shouldLoad ? (
          <iframe
            src="https://cdn.lottielab.com/l/5Gn1jXUt1kSREm.html"
            className="w-full h-full border-0"
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
            className="w-full h-full bg-neutral-50 flex items-center justify-center"
            style={{
              minWidth: '280px',
              minHeight: '280px',
              maxWidth: '500px',
              maxHeight: '500px'
            }}
          >
            <div className="animate-pulse text-neutral-400">Loading...</div>
          </div>
        )}
      </div>
    </div>
  );
};

export function HomeHero() {
  return (
    <section className="min-h-screen flex items-center bg-white">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
          {/* Left: Content */}
          <div className="max-w-2xl">
            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-neutral-900 mb-8 leading-tight">
              Acquiring, Operating, and Scaling Profitable Small Businesses
            </h1>
            
            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-neutral-600 mb-6 leading-relaxed">
              Micro-acquisitions, buy-side advisory, and operator-led growth for enduring value creation.
            </p>
            
            {/* Supporting Line */}
            <p className="text-lg text-neutral-500 mb-12">
              Deal sourcing. Diligence. Structuring. Operations. Exit readiness.
            </p>
            
            {/* CTA */}
            <a 
              href="/contact" 
              className="inline-block px-8 py-4 border-2 border-neutral-900 text-neutral-900 font-medium tracking-wide hover:bg-neutral-900 hover:text-white transition-all duration-300 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Partner With Us
            </a>
          </div>

          {/* Right: Lottie Animation */}
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-md lg:max-w-lg">
              <LottiePlayer />
            </div>
          </div>
        </div>

        {/* Logo Marquee - Visible in first viewport */}
        <div className="mt-8">
          <LogoMarquee />
        </div>
      </div>
    </section>
  );
}
