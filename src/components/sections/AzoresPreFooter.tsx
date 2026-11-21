"use client";

import React, { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Footer } from "@/components/layout/Footer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface AzoresPreFooterProps {
  currentLang: "pt" | "en";
}

export const AzoresPreFooter: React.FC<AzoresPreFooterProps> = ({ currentLang }) => {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !videoRef.current || !contentRef.current) return;

      // Subtle cinematic parallax zoom on background video
      gsap.fromTo(
        videoRef.current,
        { scale: 1.0, yPercent: -4 },
        {
          scale: 1.08,
          yPercent: 4,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Editorial reveal for Azores monumental typography
      const azoresLines = containerRef.current.querySelectorAll(".azores-line");
      const azoresEyebrow = containerRef.current.querySelector(".azores-eyebrow");
      const azoresBtn = containerRef.current.querySelector(".azores-btn");

      if (azoresLines.length > 0) {
        const azoresTl = gsap.timeline({
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });

        if (azoresEyebrow) {
          azoresTl.from(azoresEyebrow, {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          });
        }

        azoresTl.from(
          azoresLines,
          {
            yPercent: 115,
            opacity: 0,
            duration: 1.05,
            stagger: 0.14,
            ease: "power3.out",
          },
          azoresEyebrow ? "-=0.5" : 0
        );

        if (azoresBtn) {
          azoresTl.from(
            azoresBtn,
            {
              y: 25,
              opacity: 0,
              scale: 0.95,
              duration: 0.8,
              ease: "power3.out",
            },
            "-=0.5"
          );
        }
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      id="azores-coffee"
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-[#1B120E] text-[#FAF5EE]"
    >
      {/* Cinematic Fullscreen Background Video covering Azores content + Transparent Footer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          src="/videos/acores-footer-web.mp4"
          poster="/imgs/acores-preview.jpg"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center will-change-transform"
        />
        {/* Soft dark vignette overlay so text is 100% readable while maintaining video transparency */}
        <div className="absolute inset-0 bg-black/25 z-1" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/35 z-1" />
      </div>

      {/* Central Foreground Editorial Content (Upper Section) */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center justify-center pt-28 sm:pt-36 pb-16 sm:pb-24"
      >
        {/* Eyebrow Label */}
        <div className="overflow-hidden mb-4">
          <span className="azores-eyebrow text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-[#FAF5EE]/90 block drop-shadow-md will-change-transform">
            {currentLang === "pt" ? "O Café dos Açores" : "The Azores Coffee"}
          </span>
        </div>

        {/* Monumental 3-Line Headline */}
        <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white uppercase leading-[0.95] tracking-tight font-normal drop-shadow-2xl mb-8">
          {currentLang === "pt" ? (
            <>
              <span className="block overflow-hidden py-0.5 sm:py-1">
                <span className="azores-line block will-change-transform">O Primeiro</span>
              </span>
              <span className="block overflow-hidden py-0.5 sm:py-1">
                <span className="azores-line block will-change-transform">Café</span>
              </span>
              <span className="block overflow-hidden py-0.5 sm:py-1">
                <span className="azores-line block will-change-transform">Português</span>
              </span>
            </>
          ) : (
            <>
              <span className="block overflow-hidden py-0.5 sm:py-1">
                <span className="azores-line block will-change-transform">The First</span>
              </span>
              <span className="block overflow-hidden py-0.5 sm:py-1">
                <span className="azores-line block will-change-transform">Portuguese</span>
              </span>
              <span className="block overflow-hidden py-0.5 sm:py-1">
                <span className="azores-line block will-change-transform">Coffee</span>
              </span>
            </>
          )}
        </h2>

        {/* Pill Button CTA */}
        <div className="azores-btn will-change-transform">
          <a
            href="#hero"
            className="group inline-flex items-center gap-3.5 bg-[#FAF5EE] hover:bg-white text-[#35221A] px-7 py-3 sm:px-8 sm:py-3.5 rounded-full shadow-2xl hover:shadow-white/20 transition-all duration-300 active:scale-95 border border-[#35221A]/10"
          >
            <span className="text-sm sm:text-base font-semibold tracking-wide">
              {currentLang === "pt" ? "O café dos Açores" : "The Azores coffee"}
            </span>
            <span className="w-8 h-8 rounded-full bg-delta-yellow text-[#35221A] flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 shadow-sm">
              <ArrowRight className="w-4 h-4" />
            </span>
          </a>
        </div>
      </div>

      {/* Transparent Footer matching Image 1 */}
      <div className="relative z-10 w-full border-t border-white/10 backdrop-blur-[2px]">
        <Footer currentLang={currentLang} />
      </div>
    </section>
  );
};

export default AzoresPreFooter;
