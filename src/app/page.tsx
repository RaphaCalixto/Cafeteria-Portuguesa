"use client";

import React, { useState } from "react";
import { TransitionLogoMask } from "@/components/common/TransitionLogoMask";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { BrandManifesto } from "@/components/sections/BrandManifesto";
import { CoffeeCycle } from "@/components/sections/CoffeeCycle";
import { CoffeeCulture } from "@/components/sections/CoffeeCulture";
import { DeltaQuiz } from "@/components/sections/DeltaQuiz";
import { SustainabilitySection } from "@/components/sections/SustainabilitySection";
import { AzoresPreFooter } from "@/components/sections/AzoresPreFooter";

export default function Home() {
  const [currentLang, setCurrentLang] = useState<"pt" | "en">("pt");

  const handleToggleLang = () => {
    setCurrentLang((prev) => (prev === "pt" ? "en" : "pt"));
  };

  return (
    <main className="relative min-h-screen bg-oak-1000 text-creme-100 selection:bg-delta-red selection:text-white">
      {/* 1. Cinematic Delta Logo Mask Preloader Transition */}
      <TransitionLogoMask />

      {/* 2. Responsive Navigation Bar */}
      <Navbar currentLang={currentLang} onToggleLang={handleToggleLang} />

      {/* 3. Hero Section */}
      <HeroSection currentLang={currentLang} />

      {/* 4. Brand History & Rui Nabeiro Manifesto */}
      <BrandManifesto currentLang={currentLang} />

      {/* 5. Coffee Cycle ("The Journey of Coffee") */}
      <CoffeeCycle currentLang={currentLang} />

      {/* 6. Coffee Culture (Centro de Ciência do Café & Academia Barista) */}
      <CoffeeCulture currentLang={currentLang} />

      {/* 7. Delta Interactive Coffee Profile Quiz */}
      <DeltaQuiz currentLang={currentLang} />

      {/* 8. Positive Impact & Sustainability */}
      <SustainabilitySection currentLang={currentLang} />

      {/* 9. O Café dos Açores - O Primeiro Café Português & Rodapé Transparente */}
      <AzoresPreFooter currentLang={currentLang} />
    </main>
  );
}
