import React from "react";
import Hero from "../components/Hero";
import TransitionCircle from "../components/TransitionCircle";
import WhyChooseUs from "../components/WhyChooseUs";
import PromotionalBanner from "../components/PromotionalBanner";

import WhatWeDo from "../components/WhatWeDo";
import CategoriesSection from "../components/CategoriesSection";
import TestimonialsSection from "../components/TestimonialsSection";
import BrandPartners from "../components/BrandPartners";
import BridalPackagesHome from "../components/BridalPackagesHome";
import LocalSeoSection from "../components/LocalSeoSection";
import FaqSection from "../components/FaqSection";

export default function Home() {
  return (
    <div>
      <div className="relative">
        <Hero />
        <TransitionCircle />
      </div>
      {/* The container below provides the background for all subsequent sections, ensuring a seamless transition */}
      <div className="bg-[#FDFCF9] relative">
        <WhyChooseUs />
      </div>
      <LocalSeoSection />
      <CategoriesSection />
      <BridalPackagesHome />
      <div className="bg-[#FDFCF9] relative">
        <WhatWeDo />
        <PromotionalBanner />
        <BrandPartners />
        <TestimonialsSection />
      </div>
      <FaqSection />
    </div>
  );
}