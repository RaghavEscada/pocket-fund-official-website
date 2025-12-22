"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
});

export function CompanyCulture() {
  return (
    <section className={`py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 ${montserrat.variable}`} style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 tracking-tight" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
            Inside Pocket Fund
          </h2>
          <p className="text-xl md:text-2xl text-gray-500 italic font-normal" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
            A journey through how we work
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Image - Takes 2 columns */}
          <div className="lg:col-span-2 relative h-[500px] rounded-2xl overflow-hidden border-2 border-gray-200 shadow-lg">
            <Image
              src="/images/Collaborative Work Session in Black and White.png"
              alt="Team collaboration and work session"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
          </div>

          {/* Side Content */}
          <div className="space-y-6 h-[500px] flex flex-col justify-center">
            {/* Description Box */}
            <div className="bg-white border-2 rounded-2xl p-8 h-48 flex items-center justify-center" style={{ borderColor: '#366EF3' }}>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed font-light text-center" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                We're a team of passionate professionals dedicated to transforming micro private equity through strategic acquisitions and operational excellence.
              </p>
            </div>

            {/* Stats Box */}
            <div className="rounded-2xl p-8 h-48 flex flex-col justify-center" style={{ backgroundColor: '#366EF3' }}>
              <div className="text-6xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>+10</div>
              <div className="text-lg text-white font-normal" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                Talented employees and still counting.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

