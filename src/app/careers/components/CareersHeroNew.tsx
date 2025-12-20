"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export function CareersHeroNew() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Come join us!
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
              We're already heads down working hard, but would love to have your added expertise on the team.
            </p>
            <Button
              onClick={() => {
                document.getElementById('open-positions')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              See open roles
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          {/* Right: Image */}
          <div className="relative h-[500px] lg:h-[600px] rounded-lg overflow-hidden border-2 border-blue-100">
            <div className="w-full h-full bg-blue-50 flex items-center justify-center">
              {/* Placeholder - replace with actual image */}
              <div className="text-blue-400 text-center p-8">
                <p className="text-lg mb-2">Office Image</p>
                <p className="text-sm">Add your team/office image here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

