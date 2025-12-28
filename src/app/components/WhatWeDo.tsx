"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Search, FileText, Handshake, Users, TrendingUp, Target } from "lucide-react";

const services = [
  {
    number: "01",
    title: "Deal Sourcing",
    description: "Access proprietary deal flow through our extensive network and data-driven origination strategies.",
    icon: Search,
    color: "from-blue-500 to-blue-600",
  },
  {
    number: "02",
    title: "Due Diligence",
    description: "Comprehensive analysis combining financial rigor with operational insights to uncover true business potential.",
    icon: FileText,
    color: "from-blue-400 to-blue-500",
  },
  {
    number: "03",
    title: "Deal Structuring",
    description: "Optimize transaction structures with buyer-aligned terms and valuation discipline.",
    icon: Handshake,
    color: "from-blue-600 to-blue-700",
  },
  {
    number: "04",
    title: "Operator Placement",
    description: "Seamless transitions with vetted operators who drive growth from day one.",
    icon: Users,
    color: "from-blue-500 to-blue-600",
  },
  {
    number: "05",
    title: "Growth Acceleration",
    description: "Execute proven playbooks across revenue, operations, and talent to scale profitably.",
    icon: TrendingUp,
    color: "from-blue-400 to-blue-500",
  },
  {
    number: "06",
    title: "Exit Readiness",
    description: "Build institutional-grade reporting and KPI discipline for maximum exit value.",
    icon: Target,
    color: "from-blue-600 to-blue-700",
  },
];

export function WhatWeDo() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-blue-50 rounded-full blur-3xl opacity-20" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 mb-8">
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            <span className="text-sm font-medium tracking-wide text-neutral-600">Services</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal text-neutral-900 leading-tight max-w-4xl mx-auto mb-6">
            Reliable expertise to drive your<br />greatest success
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Full investment lifecycle capability from origination to exit
          </p>
        </motion.div>

        {/* Large Featured Services - First 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {services.slice(0, 3).map((service, index) => {
            const IconComponent = service.icon;
            const images = [
              "/images/Modern Office Concentration.png",
              "/images/Collaborative Meeting on Modern Sofa.png",
              "/images/Collaborative Work Session in Black and White.png"
            ];
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative bg-white border-2 border-neutral-200 rounded-3xl overflow-hidden hover:border-blue-600 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-100 hover:-translate-y-3 cursor-pointer"
              >
                {/* Image Background */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={images[index]}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  {/* Number Overlay */}
                  <div className="absolute top-6 left-6">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-xl">
                      <span className="text-white text-base font-semibold">{service.number}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-normal text-neutral-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Hover accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </motion.div>
            );
          })}
        </div>

        {/* Second Row - Last 3 Services */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.slice(3, 6).map((service, index) => {
            const IconComponent = service.icon;
            const images = [
              "/images/Casual Cohesion Team in Modern Workspace.png",
              "/images/Celebratory Gathering.png",
              "/images/Modern Office with Natural Light.png"
            ];
            
            return (
              <motion.div
                key={index + 3}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (index + 3) * 0.15 }}
                onMouseEnter={() => setHoveredIndex(index + 3)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative bg-white border-2 border-neutral-200 rounded-3xl overflow-hidden hover:border-blue-600 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-100 hover:-translate-y-3 cursor-pointer"
              >
                {/* Image Background */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={images[index]}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  {/* Number Overlay */}
                  <div className="absolute top-6 left-6">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-xl">
                      <span className="text-white text-base font-semibold">{service.number}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-normal text-neutral-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Hover accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
