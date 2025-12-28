"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "CEO, TechStart Inc.",
    image: "/images/People/adarsh.jpeg",
    quote: "Pocket Fund transformed our acquisition strategy. Their operator-led approach helped us scale three businesses in record time."
  },
  {
    name: "James Carter",
    role: "Founder, Digital Ventures",
    image: "/images/People/aniket.jpeg",
    quote: "The due diligence process was thorough and insightful. We avoided costly mistakes thanks to their expertise."
  },
  {
    name: "Emily Ross",
    role: "Portfolio Manager, Growth Capital",
    image: "/images/People/devshah.jpg",
    quote: "Their deal sourcing network is unmatched. We've closed more deals in 6 months than in the previous 2 years."
  },
  {
    name: "Daniel Lee",
    role: "Acquisition Entrepreneur",
    image: "/images/People/adarsh.jpeg",
    quote: "From structuring to exit, Pocket Fund was with us every step. The value creation was exceptional."
  }
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 mb-8">
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            <span className="text-sm font-medium tracking-wide text-neutral-600">Testimonials</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal text-neutral-900 leading-tight max-w-4xl mx-auto">
            Meet the experts behind<br />your business success
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer"
              >
                {/* Image */}
                <div className="relative w-full h-full">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Gradient overlay - faded edges */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
                  
                  {/* Name and Role overlay at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="text-white font-medium text-lg mb-1">
                      {testimonial.name}
                    </div>
                    <div className="text-white/90 text-sm">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={nextTestimonial}
              className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

