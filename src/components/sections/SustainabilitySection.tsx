"use client";

import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { ArrowRight, Leaf, Recycle, HeartHandshake, ShieldCheck } from "lucide-react";
import { sustainabilityPillars } from "@/data/deltaData";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Dynamically load the authentic Rive canvas runtime (client-only)
const SustainabilityRive = dynamic(() => import("./SustainabilityRive"), {
  ssr: false,
});

interface SustainabilitySectionProps {
  currentLang: "pt" | "en";
}

export const SustainabilitySection: React.FC<SustainabilitySectionProps> = ({
  currentLang,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const leftImgRef = useRef<HTMLDivElement>(null);
  const rightImgRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const pillarIcons = [Leaf, Recycle, HeartHandshake];

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // 1. ScrollTrigger to scrub Rive line drawings as the user scrolls
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 75%",
        end: "bottom 30%",
        scrub: 1.2,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });

      // 2. Parallax floating effect for left and right editorial photos
      if (leftImgRef.current) {
        gsap.fromTo(
          leftImgRef.current,
          { y: 40 },
          {
            y: -50,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      if (rightImgRef.current) {
        gsap.fromTo(
          rightImgRef.current,
          { y: 60 },
          {
            y: -40,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      // 3. Reveal animation for pillar cards
      gsap.fromTo(
        ".pillar-card",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.18,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".pillars-container",
            start: "top 80%",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="sustainability"
      ref={containerRef}
      className="relative w-full bg-[#1c2a20] text-[#E8F0E6] overflow-hidden"
    >
      {/* HERO WRAPPER WITH RIVE BOTANICAL DRAWINGS & FLANKING PHOTOS */}
      <div className="relative min-h-[95vh] sm:min-h-screen flex flex-col items-center justify-center pt-24 pb-20 sm:pt-32 sm:pb-28 overflow-hidden">
        {/* Rive Background Drawing Layer (Progressively drawn via scroll) */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-80 sm:opacity-95">
          <div className="w-full h-full max-w-6xl max-h-[1100px] flex items-center justify-center">
            <SustainabilityRive scrollProgress={scrollProgress} />
          </div>
        </div>

        {/* Flanking Editorial Photographs */}
        {/* Left Photo: Female Coffee Farmers Portrait (rotated -1.78deg) */}
        <div
          ref={leftImgRef}
          className="absolute z-10 left-[-15px] sm:left-4 md:left-8 lg:left-14 bottom-16 sm:bottom-28 w-44 sm:w-56 md:w-64 lg:w-72 shadow-2xl rounded-2xl overflow-hidden border border-[#E8F0E6]/15 rotate-[-1.78deg] group transition-transform duration-500 hover:rotate-0"
        >
          <div className="relative aspect-[468/586] w-full bg-[#141e17]">
            <Image
              src="/imgs/sustainability/left-farmers.jpg"
              alt="Mulheres produtoras de café Delta"
              fill
              sizes="(max-width: 640px) 180px, (max-width: 1024px) 260px, 320px"
              className="object-cover filter grayscale contrast-110 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-[#1c2a20]/20 mix-blend-multiply" />
          </div>
        </div>

        {/* Right Photo: Coffee Cherries Harvest (rotated +4deg) */}
        <div
          ref={rightImgRef}
          className="absolute z-10 right-[-15px] sm:right-4 md:right-8 lg:right-14 bottom-8 sm:bottom-16 w-48 sm:w-60 md:w-72 lg:w-80 shadow-2xl rounded-2xl overflow-hidden border border-[#E8F0E6]/15 rotate-[4deg] group transition-transform duration-500 hover:rotate-0"
        >
          <div className="relative aspect-[582/388] w-full bg-[#141e17]">
            <Image
              src="/imgs/sustainability/right-harvest.jpg"
              alt="Colheita seletiva de café no campo"
              fill
              sizes="(max-width: 640px) 200px, (max-width: 1024px) 280px, 360px"
              className="object-cover filter grayscale contrast-110 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-[#1c2a20]/20 mix-blend-multiply" />
          </div>
        </div>

        {/* Center Monumental Content */}
        <div className="relative z-20 max-w-3xl mx-auto px-6 text-center flex flex-col items-center justify-center">
          {/* Eyebrow */}
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-[#A3B899] mb-4 block drop-shadow-sm">
            {currentLang === "pt" ? "Sustentabilidade" : "Sustainability"}
          </span>

          {/* Monumental Headline */}
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-[#E8F0E6] uppercase leading-[1.04] tracking-tight font-normal mb-8 drop-shadow-lg">
            {currentLang === "pt" ? (
              <>
                <span>Impacto Positivo</span> <br />
                <span className="font-serif italic lowercase font-light text-[#A3B899]">da</span>{" "}
                <span>Origem</span>{" "}
                <span className="font-serif italic lowercase font-light text-[#A3B899]">até</span> <br />
                <span className="font-serif italic lowercase font-light text-[#A3B899]">à</span>{" "}
                <span>Chávena</span>
              </>
            ) : (
              <>
                <span>Positive Impact</span> <br />
                <span className="font-serif italic lowercase font-light text-[#A3B899]">from</span>{" "}
                <span>the origin</span>{" "}
                <span className="font-serif italic lowercase font-light text-[#A3B899]">to</span> <br />
                <span className="font-serif italic lowercase font-light text-[#A3B899]">the</span>{" "}
                <span>cup</span>
              </>
            )}
          </h2>

          {/* Pill CTA Button */}
          <div>
            <a
              href="#pillars"
              className="group inline-flex items-center gap-3.5 bg-[#E8F0E6] hover:bg-white text-[#18231C] px-7 py-3 sm:px-8 sm:py-3.5 rounded-full shadow-2xl transition-all duration-300 active:scale-95 border border-[#E8F0E6]/20"
            >
              <span className="text-sm sm:text-base font-semibold tracking-wide">
                {currentLang === "pt" ? "Sustentabilidade" : "Sustainability"}
              </span>
              <span className="w-8 h-8 rounded-full bg-[#18231C] text-[#E8F0E6] flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 shadow-sm">
                <ArrowRight className="w-4 h-4" />
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* DETAILED SUSTAINABILITY PILLARS SECTION */}
      <div id="pillars" className="pillars-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-28 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sustainabilityPillars.map((pillar, index) => {
            const IconComponent = pillarIcons[index] || Leaf;
            return (
              <div
                key={pillar.title}
                className="pillar-card bg-[#141f17]/75 backdrop-blur-sm border border-[#E8F0E6]/10 hover:border-[#A3B899]/40 rounded-3xl p-8 shadow-xl transition-all duration-500 hover:-translate-y-2 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="p-3.5 rounded-2xl bg-[#1c2a20] text-[#A3B899] border border-[#A3B899]/20 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-2xl sm:text-3xl font-bold text-delta-yellow">
                      {pillar.metric}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl text-[#E8F0E6] mb-3 group-hover:text-[#A3B899] transition-colors">
                    {currentLang === "pt" ? pillar.titlePt : pillar.title}
                  </h3>

                  <p className="text-sm text-[#E8F0E6]/75 font-sans leading-relaxed">
                    {currentLang === "pt" ? pillar.textPt : pillar.text}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#E8F0E6]/10 flex items-center text-xs font-semibold uppercase tracking-wider text-[#A3B899]">
                  <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-1.5">
                    {currentLang === "pt" ? "Saber mais" : "Learn more"} &rarr;
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SustainabilitySection;
