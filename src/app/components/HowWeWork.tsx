"use client";

import { motion } from 'framer-motion';
import { Search, FileText, Handshake, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const phases = [
  {
    number: '01',
    title: 'Deal Sourcing',
    description: 'Off-market focus with exclusive deal flow and proprietary networks',
    icon: Search,
  },
  {
    number: '02',
    title: 'Due Diligence',
    description: 'Technical, financial, and operational analysis with comprehensive risk assessment',
    icon: FileText,
  },
  {
    number: '03',
    title: 'Deal Structuring & Negotiation',
    description: 'Optimal terms negotiation and transaction structure optimization',
    icon: Handshake,
  },
  {
    number: '04',
    title: 'Value Creation',
    description: 'Strategic growth roadmaps and exit strategy preparation for maximum value',
    icon: TrendingUp,
  },
];

export function HowWeWork() {
  return (
    <section id="timeline" className="py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Process
          </h2>
          <p className="text-xl text-gray-600 mb-2">Core Services</p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            End-to-end acquisition support from deal sourcing to exit preparation
          </p>
        </motion.div>

        {/* Horizontal Timeline - Desktop */}
        <div className="hidden lg:block max-w-7xl mx-auto">
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-24 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
            
            <div className="grid grid-cols-4 gap-6">
              {phases.map((phase, index) => (
                <motion.div
                  key={phase.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Icon Circle */}
                  <div className="flex flex-col items-center mb-6">
                    <div className="relative z-10 w-48 h-48 mb-6">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full opacity-10 blur-xl" />
                      <div className="relative w-full h-full bg-white border-2 border-gray-200 rounded-full flex items-center justify-center hover:border-blue-400 transition-all duration-300 group">
                        <phase.icon className="w-20 h-20 text-blue-600 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                      </div>
                      {/* Number Badge */}
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg">
                        {phase.number}
                      </div>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="text-center px-2">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {phase.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {phase.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Vertical Timeline - Mobile/Tablet */}
        <div className="lg:hidden max-w-2xl mx-auto">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-10 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent" />
            
            <div className="space-y-12">
              {phases.map((phase, index) => (
                <motion.div
                  key={phase.number}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative pl-24 pr-4"
                >
                  {/* Icon Circle */}
                  <div className="absolute left-0 top-0">
                    <div className="relative w-20 h-20 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center shadow-md">
                      <phase.icon className="w-10 h-10 text-blue-600" strokeWidth={1.5} />
                    </div>
                    {/* Number Badge */}
                    <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shadow-lg">
                      {phase.number}
                    </div>
                  </div>
                  {/* Content */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {phase.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {phase.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-24"
        >
          <Link 
            href="/#contact" 
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
          >
            Start Your Journey
            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

