"use client";

import { useState } from "react";
import { Marquee } from "@/components/ui/marquee";
import Image from "next/image";

// Logo data - replace with your actual logo paths
const logos = [
  { name: "TechVentures", src: "/logos/techventures.svg" },
  { name: "Growth Capital", src: "/logos/growthcapital.svg" },
  { name: "Digital Partners", src: "/logos/digitalpartners.svg" },
  { name: "Acquisition Group", src: "/logos/acquisitiongroup.svg" },
  { name: "ScaleUp Fund", src: "/logos/scaleupfund.svg" },
  { name: "Business Builders", src: "/logos/businessbuilders.svg" },
  { name: "Venture Partners", src: "/logos/venturepartners.svg" },
  { name: "Equity Holdings", src: "/logos/equityholdings.svg" },
  { name: "Strategic Capital", src: "/logos/strategiccapital.svg" },
  { name: "Portfolio Co", src: "/logos/portfolioco.svg" },
];


const LogoCard = ({ name, src }: { name: string; src: string }) => {
  const [imageError, setImageError] = useState(false);
  
  return (
    <div className="relative h-20 w-56 flex flex-col items-center justify-center mx-6 opacity-60 hover:opacity-100 transition-opacity duration-300">
      {!imageError ? (
        <Image
          src={src}
          alt={name}
          width={120}
          height={40}
          className="object-contain max-h-12 filter brightness-0 mb-2"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="h-12 flex items-center justify-center mb-2">
          <div className="w-16 h-16 bg-neutral-200 rounded-lg flex items-center justify-center">
            <span className="text-neutral-600 text-xs font-bold">{name.charAt(0)}</span>
          </div>
        </div>
      )}
      {/* Always show company name */}
      <span className="text-neutral-600 text-sm font-medium text-center">{name}</span>
    </div>
  );
};

export function LogoMarquee() {
  return (
    <div className="relative flex w-full items-center justify-center overflow-hidden py-4">
      <Marquee pauseOnHover className="[--duration:20s]">
        {logos.map((logo, index) => (
          <LogoCard key={`${logo.name}-${index}`} {...logo} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white"></div>
    </div>
  );
}

