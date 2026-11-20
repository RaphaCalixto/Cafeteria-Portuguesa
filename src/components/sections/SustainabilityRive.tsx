"use client";

import React, { useEffect } from "react";
import { useRive, Layout, Fit, Alignment } from "@rive-app/react-canvas";

interface SustainabilityRiveProps {
  scrollProgress: number;
  className?: string;
}

export const SustainabilityRive: React.FC<SustainabilityRiveProps> = ({
  scrollProgress,
  className = "",
}) => {
  const { rive, RiveComponent } = useRive({
    src: "/rives/sustainability.riv",
    artboard: "home_sustenta-Ilustra",
    animations: "Timeline 29",
    autoplay: false,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  });

  useEffect(() => {
    if (!rive) return;
    try {
      // Timeline 29 duration (scrub based on scroll progress 0.0 -> 1.0)
      const duration = 2.0;
      const targetTime = Math.max(0, Math.min(scrollProgress * duration, duration));
      rive.scrub("Timeline 29", targetTime);
    } catch {
      // Graceful fallback if scrubbing method differs across Rive canvas versions
      try {
        rive.play("Timeline 29");
      } catch {
        // Ignore
      }
    }
  }, [rive, scrollProgress]);

  return (
    <div className={`relative w-full h-full ${className}`}>
      {RiveComponent && <RiveComponent className="w-full h-full" />}
    </div>
  );
};

export default SustainabilityRive;
