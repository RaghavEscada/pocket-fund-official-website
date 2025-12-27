"use client";

import Image from "next/image";

export function CompanyCulture() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Inside Pocket Fund
          </h2>
          <p className="text-xl text-gray-600">
            A journey through how we work
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Image - Takes 2 columns */}
          <div className="lg:col-span-2 relative h-[500px] rounded-2xl overflow-hidden border-2 border-blue-600 shadow-lg">
            <Image
              src="/images/Collaborative Work Session in Black and White.png"
              alt="Team collaboration at Pocket Fund"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
          </div>

          {/* Side Content */}
          <div className="space-y-6">
            {/* Quote Box */}
            <div className="bg-white border-2 border-blue-600 rounded-2xl p-8 h-48 flex flex-col justify-center">
              <blockquote className="text-lg font-semibold text-gray-900 italic leading-relaxed">
                "We build wealth through strategic acquisitions, not financial engineering."
              </blockquote>
            </div>

            {/* Stats Box */}
            <div className="bg-blue-600 rounded-2xl p-8 h-48 flex flex-col justify-center">
              <div className="text-6xl font-bold text-white mb-2">10+</div>
              <div className="text-lg text-white">
                Talented employees and still counting.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
