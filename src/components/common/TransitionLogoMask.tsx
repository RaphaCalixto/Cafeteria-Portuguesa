"use client";

import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { DeltaLogo } from "./DeltaLogo";

interface TransitionLogoMaskProps {
  onComplete?: () => void;
}

export const TransitionLogoMask: React.FC<TransitionLogoMaskProps> = ({
  onComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isDone, setIsDone] = useState(false);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsDone(true);
          onComplete?.();
        },
      });

      // 1. Initial appearance of the Delta logo & tagline
      tl.fromTo(
        logoWrapperRef.current,
        { scale: 0.7, opacity: 0, y: 20 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
        }
      )
        .fromTo(
          textRef.current,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.4"
        )
        // 2. Subtle pulse to build anticipation
        .to(logoWrapperRef.current, {
          scale: 1.08,
          duration: 0.5,
          ease: "power1.inOut",
        })
        // 3. Cinematic zoom-through mask expansion
        .to(textRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        })
        .to(
          logoWrapperRef.current,
          {
            scale: 22,
            opacity: 0,
            duration: 1.1,
            ease: "power4.inOut",
          },
          "-=0.2"
        )
        .to(
          containerRef.current,
          {
            opacity: 0,
            autoAlpha: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        );
    },
    { scope: containerRef }
  );

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-oak-950 pointer-events-none overflow-hidden select-none"
      style={{ willChange: "opacity" }}
    >
      {/* Background radial gradient warmth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-delta-darkRed/20 via-oak-950 to-oak-1000" />

      {/* Center triangle logo container */}
      <div
        ref={logoWrapperRef}
        className="relative z-10 flex flex-col items-center justify-center origin-center"
        style={{ willChange: "transform, opacity" }}
      >
        <DeltaLogo size={110} className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-glow" />
      </div>

      {/* Slogan */}
      <p
        ref={textRef}
        className="relative z-10 mt-6 text-creme-100 tracking-[0.25em] text-xs uppercase font-sans font-medium"
        style={{ willChange: "opacity, transform" }}
      >
        O café da sua vida
      </p>
    </div>
  );
};
