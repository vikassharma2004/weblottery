import React from "react";
import { HeroSection } from "../../components/hero";
import { HowItWorks } from "../../components/HowItWorks";
import { SecuritySection } from "../../components/SecuritySection";
import { Footer } from "../../layouts/footer";
import { SupportSection } from "../../components/SupportSection";
import { FeaturesSection } from "../../components/FeaturesSection";
import { useUserStore } from "../../store/AuthStrore";
export default function HomePage() {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      {/* HERO */}
      <React.Suspense
        fallback={<div className="py-20 text-center">Loading...</div>}
      >
        <HeroSection />
      </React.Suspense>

      {/* HOW IT WORKS */}
      <React.Suspense
        fallback={<div className="py-20 text-center">Loading...</div>}
      >
        <HowItWorks />
      </React.Suspense>

      {/* SECURITY */}
      <React.Suspense
        fallback={<div className="py-20 text-center">Loading...</div>}
      >
        <SecuritySection />
      </React.Suspense>

      {/* SUPPORT */}
      <React.Suspense
        fallback={<div className="py-20 text-center">Loading...</div>}
      >
        <SupportSection />
      </React.Suspense>

      {/* EXTRA FEATURES */}
      <React.Suspense
        fallback={<div className="py-20 text-center">Loading...</div>}
      >
        <FeaturesSection />
      </React.Suspense>
      <Footer />
    </div>
  );
}
