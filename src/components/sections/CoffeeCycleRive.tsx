"use client";

import React, { useEffect } from "react";
import { useRive, Layout, Fit, Alignment } from "@rive-app/react-canvas";

interface CoffeeCycleRiveProps {
  onStepHover?: (stepIndex: number | null) => void;
  onStepClick?: (stepIndex: number) => void;
  className?: string;
}

export const CoffeeCycleRive: React.FC<CoffeeCycleRiveProps> = ({
  className = "",
}) => {
  const { rive, RiveComponent } = useRive({
    src: "/riv/coffee-cycle.riv",
    artboard: "home-ciclo-line",
    stateMachines: "State Machine 1",
    autoplay: true,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  });

  return (
    <div className={`relative w-full h-full ${className}`}>
      {RiveComponent && <RiveComponent className="w-full h-full" />}
    </div>
  );
};

export default CoffeeCycleRive;
