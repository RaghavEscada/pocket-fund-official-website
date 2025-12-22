import { CareersHeroNew as CareersHero } from "./components/CareersHero";
import { CompanyCulture } from "./components/CompanyCulture";
import { WhatWeOffer } from "./components/WhatWeOffer";
import { JobsTable } from "./components/JobsTable";
import { Testimonial } from "./components/Testimonial";
import { CareersBenefits } from "./components/CareersBenefits";

export default function CareersPage() {
  return (
    <div className="min-h-screen">
      <CareersHero />
      <CompanyCulture />
      <WhatWeOffer />
      <JobsTable />
      <Testimonial />
      <CareersBenefits />
    </div>
  );
}
