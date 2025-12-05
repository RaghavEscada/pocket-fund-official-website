"use client";

import { motion } from 'framer-motion';
import { Search, FileCheck, Handshake, Users, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';

const services = [
  {
    icon: Search,
    title: 'Deal Sourcing',
    description: 'Off-market focus with exclusive deal flow and proprietary networks',
  },
  {
    icon: FileCheck,
    title: 'Due Diligence',
    description: 'Technical, financial, and operational analysis with comprehensive risk assessment',
  },
  {
    icon: Handshake,
    title: 'Deal Structuring & Negotiation',
    description: 'Optimal terms negotiation and transaction structure optimization',
  },
  {
    icon: Users,
    title: 'Transition + Operator Placement',
    description: 'Seamless handover with vetted operator matching and integration support',
  },
  {
    icon: TrendingUp,
    title: 'Growth Playbooks + Exit Prep',
    description: 'Strategic growth roadmaps and exit strategy preparation for maximum value',
  },
];

export function CoreServices() {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Process</h2>
          <p className="text-xl text-muted-foreground mb-2">Core Services</p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            End-to-end acquisition support from deal sourcing to exit preparation
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
              <Card className="p-6 h-full hover:shadow-lg transition-shadow border-2 hover:border-primary flex flex-col">
                <service.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground flex-grow">{service.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

