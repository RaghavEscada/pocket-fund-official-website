import { LampHero } from "@/components/ui/lamp-hero";
import { CompanyCulture } from "./components/CompanyCulture";
import { WhatWeOffer } from "./components/WhatWeOffer";
import { JobsTable } from "./components/JobsTable";
import { Testimonial } from "./components/Testimonial";
import { CareersBenefits } from "./components/CareersBenefits";

export default function CareersPage() {
  return (
    <div className="min-h-screen">
      <LampHero 
        title="Join Our Team" 
        subtitle="Build your career in private equity with Pocket Fund"
      />
      <CompanyCulture />
      <WhatWeOffer />
      <JobsTable />
      <Testimonial />
      <CareersBenefits />
    </div>
  );
}
