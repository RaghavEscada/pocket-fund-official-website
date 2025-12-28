"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

const phases = [
  {
    number: '01',
    title: 'Deal Sourcing',
    description: 'We analyze your goals and create a customized strategy designed to drive measurable success for your business needs and exploring more opportunities.',
    image: '/images/Modern Office Concentration.png',
    position: 'left' as const,
  },
  {
    number: '02',
    title: 'Due Diligence',
    description: 'Comprehensive analysis combining financial rigor with operational insights to uncover true business potential and ensure sound investment decisions.',
    image: '/images/Collaborative Meeting on Modern Sofa.png',
    position: 'right' as const,
  },
  {
    number: '03',
    title: 'Deal Structuring',
    description: 'From implementation to optimization, we provide ongoing guidance and adjustments to ensure long-term growth for you and your business with Pocket Fund.',
    image: '/images/Collaborative Work Session in Black and White.png',
    position: 'left' as const,
  },
  {
    number: '04',
    title: 'Value Creation',
    description: 'Strategic growth roadmaps and exit strategy preparation for maximum value creation and sustainable business development.',
    image: '/images/Casual Cohesion Team in Modern Workspace.png',
    position: 'right' as const,
  },
];

export function HowWeWork() {
  return (
    <section id="timeline" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 mb-8">
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            <span className="text-sm font-medium tracking-wide text-neutral-600">Our Process</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal text-neutral-900 leading-tight max-w-4xl mx-auto">
            A proven process to achieve<br />your biggest goals
          </h2>
        </motion.div>

        {/* Timeline with Alternating Layout */}
        <div className="relative max-w-6xl mx-auto">
          {/* Central Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-neutral-200 hidden lg:block" />

          {/* Timeline Items */}
          <div className="space-y-32 lg:space-y-40">
            {phases.map((phase, index) => {
              const isLeft = phase.position === 'left';
              
              return (
                <motion.div
                  key={phase.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex flex-col lg:flex-row items-center gap-8 lg:gap-12 ${
                    isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Content Side */}
                  <div className={`w-full lg:w-1/2 ${isLeft ? 'lg:pr-12' : 'lg:pl-12'}`}>
                    {/* Number Badge */}
                    <div className="inline-flex items-center mb-6">
                      <div className="w-12 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">{phase.number}</span>
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-normal text-neutral-900 mb-6">
                      {phase.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-lg text-neutral-600 leading-relaxed mb-6">
                      {phase.description}
                    </p>
                    
                    {/* Discover More Link */}
                    <a 
                      href="#"
                      className="inline-flex items-center text-neutral-900 underline underline-offset-4 hover:text-blue-600 transition-colors"
                    >
                      Discover More →
                    </a>
                  </div>

                  {/* Image Side */}
                  <div className={`w-full lg:w-1/2 ${isLeft ? 'lg:pl-12' : 'lg:pr-12'}`}>
                    <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden">
                      <Image
                        src={phase.image}
                        alt={phase.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Timeline Badge on Central Line */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 hidden lg:flex items-center justify-center w-12 h-12 bg-white border-2 border-blue-600 rounded-full z-10">
                    <span className="text-blue-600 text-sm font-medium">{phase.number}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
