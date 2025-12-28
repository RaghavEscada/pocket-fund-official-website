"use client";

import { motion } from "framer-motion";
import { MessageCircle, Cloud, Globe, Database, Headphones, Zap } from "lucide-react";

const benefits = [
  {
    icon: MessageCircle,
    title: "Unlimited consultations",
    description: "Schedule as many strategy sessions as needed for your business growth and development."
  },
  {
    icon: Cloud,
    title: "Tailored solutions",
    description: "Get customized strategies designed to fit your unique business goals and challenges."
  },
  {
    icon: Globe,
    title: "Expert insights",
    description: "Leverage industry-leading expertise to make informed acquisition decisions."
  },
  {
    icon: Database,
    title: "Data strategies",
    description: "Make confident moves with insights backed by research and comprehensive analytics."
  },
  {
    icon: Headphones,
    title: "Ongoing support",
    description: "Stay ahead with continuous guidance and recommendation throughout your journey."
  },
  {
    icon: Zap,
    title: "Seamless execution",
    description: "From planning to implementation, we ensure a smooth and efficient process."
  }
];

export function KeyBenefits() {
  return (
    <section className="py-32 bg-white">
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
            <span className="text-sm font-medium tracking-wide text-neutral-600">Features</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal text-neutral-900 leading-tight max-w-4xl mx-auto">
            Key benefits that set us apart<br />from other firms
          </h2>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                {/* Icon */}
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-200/50">
                  <IconComponent className="w-7 h-7 text-white" strokeWidth={1.5} />
                </div>
                
                {/* Title */}
                <h3 className="text-xl md:text-2xl font-normal text-neutral-900 mb-3">
                  {benefit.title}
                </h3>
                
                {/* Description */}
                <p className="text-neutral-600 leading-relaxed text-[15px]">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

