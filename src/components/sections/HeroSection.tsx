"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface HeroSectionProps {
  currentLang: "pt" | "en";
}

interface SlideData {
  id: string;
  number: string;
  title: string;
  ctaText: string;
  ctaHref: string;
  bgImage: string;
  thumbImage: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ currentLang }) => {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const widgetsRef = useRef<HTMLDivElement>(null);

  // Tab 02 ("O primeiro café Português.") is active by default per Image 2
  const [activeSlide, setActiveSlide] = useState<number>(1);

  const slides: SlideData[] = [
    {
      id: "01",
      number: "01",
      title: currentLang === "pt" ? "Delta, café com coração." : "Delta, coffee with heart.",
      ctaText: currentLang === "pt" ? "Sobre a Delta" : "About Delta",
      ctaHref: "#history",
      bgImage: "https://cdn.sanity.io/images/pcdkofnf/production/f0f69aff81fd15fba09ca70bcdf43e5e9fca029c-1280x720.jpg",
      thumbImage: "/imgs/hero/tab_01.png",
    },
    {
      id: "02",
      number: "02",
      title: currentLang === "pt" ? "O primeiro café Português." : "The first Portuguese coffee.",
      ctaText: currentLang === "pt" ? "O Café dos Açores" : "The Azores Coffee",
      ctaHref: "#azores-coffee",
      bgImage: "/imgs/hero/azores-cherries-clean.jpg",
      thumbImage: "/imgs/hero/tab_02.png",
    },
    {
      id: "03",
      number: "03",
      title: currentLang === "pt" ? "Há muito Portugal em Delta." : "There is a lot of Portugal in Delta.",
      ctaText: currentLang === "pt" ? "Conheça a Delta" : "Discover Delta",
      ctaHref: "#products",
      bgImage: "https://cdn.sanity.io/images/pcdkofnf/production/2ea2e09733aaa2f44783df1adcc4a1f86938bfa8-206x124.jpg",
      thumbImage: "/imgs/hero/tab_03.png",
    },
  ];

  const currentSlide = slides[activeSlide];

  useGSAP(
    () => {
      if (!textRef.current) return;
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
    },
    { dependencies: [activeSlide], scope: containerRef }
  );

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-[100svh] min-h-[640px] flex flex-col justify-between overflow-hidden bg-[#18110E] text-[#FAF5EE] select-none"
    >
      {/* Background Layer with Smooth Fade Transitions */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              activeSlide === idx ? "opacity-100 z-1" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={slide.bgImage}
              alt={slide.title}
              fill
              priority={idx === 1}
              sizes="100vw"
              className="object-cover object-center filter brightness-[0.88] contrast-[1.05]"
            />
          </div>
        ))}

        {/* Soft Vignette Gradients for Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 z-2" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30 z-2" />
      </div>

      {/* Top Spacer for Floating Navbar */}
      <div className="w-full h-24 relative z-10" />

      {/* Main Mid Section: Bottom-Left Headline & Floating Right Widgets */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-6 sm:px-10 lg:px-14 flex-1 flex flex-col justify-end pb-8">
        <div className="flex flex-col lg:flex-row items-end justify-between gap-8 w-full">
          {/* Bottom-Left Editorial Headline & Pill CTA */}
          <div ref={textRef} className="max-w-xl w-full">
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#FAF5EE] tracking-tight leading-[0.98] font-normal drop-shadow-2xl">
              {activeSlide === 1 ? (
                <>
                  O primeiro café <br />
                  Português.
                </>
              ) : activeSlide === 0 ? (
                <>
                  Delta, café <br />
                  com coração.
                </>
              ) : (
                <>
                  Há muito Portugal <br />
                  em Delta.
                </>
              )}
            </h1>

            <div className="mt-6">
              <a
                href={currentSlide.ctaHref}
                className="group inline-flex items-center gap-3 bg-[#FAF5EE] hover:bg-white text-[#35221A] px-6 py-2.5 sm:px-7 sm:py-3 rounded-full shadow-2xl transition-all duration-300 active:scale-95 border border-[#35221A]/10"
              >
                <span className="text-xs sm:text-sm font-semibold tracking-wide">
                  {currentSlide.ctaText}
                </span>
                <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#35221A] text-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 shadow-sm">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </a>
            </div>
          </div>

          {/* Floating Right Widgets Cluster matching Image 2 */}
          <div
            ref={widgetsRef}
            className="flex flex-col gap-2.5 max-w-[340px] w-full self-end lg:self-auto"
          >
            {/* Top Row: Card A (Azores Pack) & Card B (Delta House) */}
            <div className="grid grid-cols-2 gap-2.5">
              {/* Card A: Produtos -> O café dos Açores */}
              <a
                href="#azores-coffee"
                className="group bg-[#18110E]/60 hover:bg-[#18110E]/80 backdrop-blur-md rounded-2xl border border-white/10 p-2.5 flex flex-col justify-between shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between bg-black/40 px-2.5 py-1 rounded-full text-[10px] text-white/90 font-medium mb-1">
                  <span>Produtos</span>
                  <ArrowRight className="w-3 h-3 text-white/70 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div className="flex-1 flex items-center justify-center py-1">
                  <Image
                    src="/imgs/hero/card_azores_pack.png"
                    alt="O café dos Açores"
                    width={72}
                    height={72}
                    className="object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="text-[11px] text-white/90 font-medium text-center block tracking-wide">
                  O café dos Açores
                </span>
              </a>

              {/* Card B: DELTA HOUSE */}
              <a
                href="https://www.thedeltahouse.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[#FAF5EE] hover:bg-white text-[#35221A] rounded-2xl p-2.5 shadow-xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <svg viewBox="0 0 100 86" className="w-3 h-3 fill-delta-red">
                      <polygon points="50,0 100,86 0,86" />
                    </svg>
                    <span className="font-bold text-[9px] sm:text-[10px] tracking-wider uppercase text-[#35221A]">
                      DELTA HOUSE
                    </span>
                  </div>
                  <span className="text-xs text-[#35221A]/70 font-bold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                    ↗
                  </span>
                </div>
                <div className="flex-1 flex items-center justify-center py-1">
                  <Image
                    src="/imgs/hero/deltahouse_products.png"
                    alt="Produtos Delta em casa"
                    width={100}
                    height={44}
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="text-[9.5px] sm:text-[10px] text-[#35221A]/80 font-medium leading-tight text-center">
                  Produtos Delta em casa, com a Delta House
                </p>
              </a>
            </div>

            {/* Bottom Row: Card C (Quiz Delta) */}
            <a
              href="#quiz"
              className="group bg-[#18110E]/65 hover:bg-[#18110E]/85 backdrop-blur-md rounded-2xl border border-white/10 p-3 shadow-xl flex flex-col gap-2 transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between text-white/95 text-xs font-semibold">
                <span className="tracking-wide">Quiz Delta</span>
                <ArrowRight className="w-3.5 h-3.5 text-white/70 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 relative flex-shrink-0">
                  <Image
                    src="/imgs/hero/quiz_ring.png"
                    alt="Quiz Ring"
                    fill
                    className="object-contain animate-[spin_12s_linear_infinite]"
                  />
                </div>
                <p className="text-[10px] sm:text-[11px] text-white/80 font-normal leading-snug">
                  Quanto sabes sobre café? Descobre num quiz rápido e encontra o café à tua medida.
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Horizontal Slider Tabs matching Image 2 */}
      <div className="relative z-10 w-full border-t border-white/15 bg-black/25 backdrop-blur-md">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-3 max-w-2xl py-3 gap-4 sm:gap-6">
            {slides.map((slide, idx) => {
              const isActive = activeSlide === idx;
              return (
                <button
                  key={slide.id}
                  onClick={() => setActiveSlide(idx)}
                  className={`group relative text-left flex items-center gap-3 transition-opacity duration-300 cursor-pointer pt-2 ${
                    isActive ? "opacity-100" : "opacity-50 hover:opacity-80"
                  }`}
                >
                  {/* Active Indicator Top Progress Line */}
                  {isActive && (
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-white rounded-full" />
                  )}

                  {/* Thumbnail Image */}
                  <div className="relative w-12 h-8 sm:w-16 sm:h-10 rounded-md overflow-hidden flex-shrink-0 border border-white/10">
                    <Image
                      src={slide.thumbImage}
                      alt={slide.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Number & Title */}
                  <div className="min-w-0">
                    <span className="block text-[10px] sm:text-[11px] font-semibold text-white/70 leading-none mb-1">
                      {slide.number}
                    </span>
                    <span className="block text-[11px] sm:text-xs text-white font-medium leading-tight truncate">
                      {slide.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
