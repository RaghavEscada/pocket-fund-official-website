"use client";

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { ShoppingCart, Lightbulb, Database, Users, Target, Zap } from 'lucide-react';

const services = [
  {
    icon: ShoppingCart,
    title: 'Micro Acquisitions',
    description: 'SaaS, newsletters, mobile apps, and niche content sites under $100K',
  },
  {
    icon: Lightbulb,
    title: 'Buy-Side Advisory',
    description: 'For solo buyers, creators, funds, and family offices',
  },
  {
    icon: Database,
    title: 'Deal Flow Engine',
    description: 'Surfaces 30–50 off-market opportunities weekly',
  },
  {
    icon: Users,
    title: 'Operator Placement',
    description: 'Revenue-linked incentives post-acquisition',
  },
  {
    icon: Target,
    title: 'Exit Planning',
    description: 'For portfolio companies with 6–18 month windows',
  },
  {
    icon: Zap,
    title: 'Growth Acceleration',
    description: 'AI workflows, automation, and operational excellence',
  },
];

export function WhatWeDo() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">What We Do</h2>
          <p className="text-xl text-gray-600">
            We are not just investors. We are <span className="text-blue-600 font-semibold">builders</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full"
            >
              <Card className="p-6 h-full hover:shadow-lg transition-all border-2 hover:border-blue-600 bg-white flex flex-col">
                <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{service.title}</h3>
                <p className="text-gray-600 flex-grow">{service.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
