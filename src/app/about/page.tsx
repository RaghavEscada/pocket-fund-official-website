import { LampHero } from "@/components/ui/lamp-hero";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <LampHero 
        title="About Pocket Fund" 
        subtitle="Learn about our mission to transform the micro private equity landscape"
      />
      {/* Page content will be added here */}
    </div>
  );
}
