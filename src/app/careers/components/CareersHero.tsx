"use client";

import Image from "next/image";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
});

export function CareersHeroNew() {
  return (
    <section className={`relative bg-[#f5f3f0] overflow-hidden ${montserrat.variable}`} style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
      <div className="max-w-7xl mx-auto px-0 sm:px-2 lg:px-6 pt-8 lg:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen">
          {/* Left: Text Content */}
          <div className="relative z-10 space-y-6">
            {/* Heading with highlight */}
            <div className="relative">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight" style={{ fontFamily: 'var(--font-montserrat), sans-serif', color: '#366EF3' }}>
                <span className="relative inline-block">
                  Careers
                  <span className="absolute -bottom-1 left-0 w-full h-3 opacity-50 -z-10 rounded-sm" style={{ backgroundColor: '#366EF3' }}></span>
                </span>
              </h1>
            </div>
            
            {/* Tagline */}
            <p className="text-lg md:text-xl text-gray-600 font-normal leading-relaxed" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
              Join us to reshape the future of micro private equity
            </p>

            {/* Dark Blue Section with Text */}
            <div className="relative mt-8 lg:mt-12">
              {/* Curved decorative element */}
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-40 blur-3xl" style={{ backgroundColor: '#366EF3' }}></div>
              
              <div className="relative rounded-2xl p-6 md:p-8 lg:p-10 text-gray-50 space-y-3 shadow-xl" style={{ backgroundColor: '#366EF3' }}>
                <p className="text-sm md:text-base leading-relaxed font-light" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                  Micro private equity is transforming how entrepreneurs and funds build wealth through strategic acquisitions. At Pocket Fund, we're at the forefront of this movement, combining deep financial expertise with operational excellence.
                </p>
                <p className="text-sm md:text-base leading-relaxed font-light" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                  We're building a team that's passionate about deal-making, portfolio management, and creating lasting value for our partners.
                </p>
              </div>
            </div>

          </div>

          {/* Right: Image Grid */}
          <div className="grid grid-cols-2 gap-4 lg:gap-6">
            {/* Top Left Image */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border-2 border-white shadow-lg">
              <Image
                src="/images/Casual Cohesion Team in Modern Workspace.png"
                alt="Team in modern workspace"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>

            {/* Top Right Image */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border-2 border-white shadow-lg">
              <Image
                src="/images/Celebratory Gathering.png"
                alt="Celebratory team gathering"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>

            {/* Bottom Left Image */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border-2 border-white shadow-lg">
              <Image
                src="/images/Collaborative Meeting on Modern Sofa.png"
                alt="Collaborative team meeting"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>

            {/* Bottom Right Image */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border-2 border-white shadow-lg">
              <Image
                src="/images/Modern Office with Natural Light.png"
                alt="Modern office workspace"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
