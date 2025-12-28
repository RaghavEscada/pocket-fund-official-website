"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const stats = [
  {
    value: "$7M+",
    label: "Revenue",
    position: "left-top"
  },
  {
    value: "72%",
    label: "Growth",
    position: "left-middle"
  },
  {
    value: "65%",
    label: "Skills",
    position: "left-bottom"
  },
  {
    value: "78%",
    label: "Impact",
    position: "right-top"
  },
  {
    value: "1%",
    label: "Designers",
    position: "right-middle"
  },
  {
    value: "10+",
    label: "Consultants",
    position: "right-bottom"
  }
];

export function RealResults() {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-2xl md:text-3xl lg:text-4xl font-normal text-neutral-900 leading-relaxed max-w-4xl mx-auto">
            We deliver tailored strategies, innovative solutions, and dedicated support to drive lasting growth
          </p>
        </motion.div>

        {/* Main Content with Image and Stats */}
        <div className="relative max-w-5xl mx-auto">
          <div className="relative flex items-center justify-center min-h-[600px] md:min-h-[700px]">
            {/* Central Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-10 w-72 h-96 md:w-96 md:h-[500px]"
            >
              <div className="relative w-full h-full rounded-3xl overflow-hidden">
                <Image
                  src="/images/People/devshah.jpg"
                  alt="Pocket Fund team member"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            {/* Stats positioned around the image with connecting lines */}
            {stats.map((stat, index) => {
              let positionClasses = "";
              let lineClasses = "";
              let lineLength = "w-[40px] md:w-[60px]";
              
              switch (stat.position) {
                case "left-top":
                  positionClasses = "absolute top-[15%] left-[-140px] md:left-[-160px]";
                  lineClasses = `absolute top-[15%] left-[-100px] md:left-[-120px] ${lineLength} h-px bg-neutral-300`;
                  break;
                case "left-middle":
                  positionClasses = "absolute top-1/2 left-[-140px] md:left-[-160px] -translate-y-1/2";
                  lineClasses = `absolute top-1/2 left-[-100px] md:left-[-120px] ${lineLength} h-px bg-neutral-300 -translate-y-1/2`;
                  break;
                case "left-bottom":
                  positionClasses = "absolute bottom-[15%] left-[-140px] md:left-[-160px]";
                  lineClasses = `absolute bottom-[15%] left-[-100px] md:left-[-120px] ${lineLength} h-px bg-neutral-300`;
                  break;
                case "right-top":
                  positionClasses = "absolute top-[15%] right-[-140px] md:right-[-160px]";
                  lineClasses = `absolute top-[15%] right-[-100px] md:right-[-120px] ${lineLength} h-px bg-neutral-300`;
                  break;
                case "right-middle":
                  positionClasses = "absolute top-1/2 right-[-140px] md:right-[-160px] -translate-y-1/2";
                  lineClasses = `absolute top-1/2 right-[-100px] md:right-[-120px] ${lineLength} h-px bg-neutral-300 -translate-y-1/2`;
                  break;
                case "right-bottom":
                  positionClasses = "absolute bottom-[15%] right-[-140px] md:right-[-160px]";
                  lineClasses = `absolute bottom-[15%] right-[-100px] md:right-[-120px] ${lineLength} h-px bg-neutral-300`;
                  break;
              }

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`${positionClasses} z-20`}
                >
                  {/* Connecting line */}
                  <div className={lineClasses} />
                  
                  {/* Stat box - rectangular with rounded edges */}
                  <div className="bg-blue-600 rounded-lg px-4 py-3 shadow-lg">
                    <div className="text-white text-lg md:text-xl font-semibold">
                      {stat.value}
                    </div>
                    <div className="text-white text-xs font-medium opacity-90">
                      {stat.label}
                    </div>
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

