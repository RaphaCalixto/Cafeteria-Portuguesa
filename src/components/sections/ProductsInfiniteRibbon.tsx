"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { productsData } from "@/data/deltaData";
import { CoffeeProduct } from "@/types/delta";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface ProductsInfiniteRibbonProps {
  onSelectProduct?: (product: CoffeeProduct) => void;
  currentLang: "pt" | "en";
}

export const ProductsInfiniteRibbon: React.FC<ProductsInfiniteRibbonProps> = ({
  onSelectProduct,
  currentLang,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);

  // Triple products list for seamless infinite loop
  const items = [...productsData, ...productsData, ...productsData];

  const posRef = useRef({
    currentX: 0,
    speed: 0.25, // Significantly slowed down as requested (veludo, calmo e cinematográfico)
    isDragging: false,
    startX: 0,
    prevX: 0,
    trackWidth: 0,
  });

  useGSAP(
    () => {
      if (!trackRef.current) return;

      const singleSetWidth = trackRef.current.scrollWidth / 3;
      posRef.current.trackWidth = singleSetWidth;

      const tickerFunc = () => {
        if (!trackRef.current) return;
        const state = posRef.current;

        if (!state.isDragging) {
          // Slow, smooth glide (0.24px per frame), almost pauses on hover (0.04px)
          const target = isHovered ? 0.04 : 0.24;
          state.speed += (target - state.speed) * 0.05;
          state.currentX -= state.speed;

          // Seamless boundary wrapping
          if (state.currentX <= -singleSetWidth) {
            state.currentX += singleSetWidth;
          } else if (state.currentX > 0) {
            state.currentX -= singleSetWidth;
          }

          gsap.set(trackRef.current, {
            x: state.currentX,
            force3D: true,
          });
        }
      };

      gsap.ticker.add(tickerFunc);

      return () => {
        gsap.ticker.remove(tickerFunc);
      };
    },
    { dependencies: [isHovered], scope: containerRef }
  );

  // Pointer drag handling (suave e com inércia)
  const handlePointerDown = (e: React.PointerEvent) => {
    posRef.current.isDragging = true;
    posRef.current.startX = e.clientX;
    posRef.current.prevX = posRef.current.currentX;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!posRef.current.isDragging || !trackRef.current) return;
    const dx = e.clientX - posRef.current.startX;
    let nextX = posRef.current.prevX + dx;
    const singleSet = posRef.current.trackWidth;

    if (singleSet > 0) {
      while (nextX <= -singleSet) nextX += singleSet;
      while (nextX > 0) nextX -= singleSet;
    }

    posRef.current.currentX = nextX;
    gsap.set(trackRef.current, { x: nextX, force3D: true });
  };

  const handlePointerUp = () => {
    posRef.current.isDragging = false;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden select-none py-12 bg-oak-1000 cursor-grab active:cursor-grabbing border-y border-creme-200/5"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={() => {
        handlePointerUp();
        setIsHovered(false);
        setActiveItemIndex(null);
      }}
      onMouseEnter={() => setIsHovered(true)}
    >
      {/* Soft Vignette Shadows only at the extreme edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-oak-1000 to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-oak-1000 to-transparent z-20 pointer-events-none" />

      {/* Infinite Card Track */}
      <div
        ref={trackRef}
        className="flex items-start gap-4 sm:gap-5 will-change-transform py-6"
        style={{ width: "max-content" }}
      >
        {items.map((product, idx) => {
          const isThisHovered = activeItemIndex === idx;

          const categoryLabel =
            product.id === "lote-chavena"
              ? "Lote Histórico"
              : product.id === "roast-portugal"
              ? "Torrado"
              : product.id === "bio"
              ? "Biológico"
              : "Origem";

          return (
            <div
              key={`${product.id}-${idx}`}
              onMouseEnter={() => setActiveItemIndex(idx)}
              onClick={() => onSelectProduct?.(product)}
              className="flex-shrink-0 flex flex-col items-center group cursor-pointer"
              style={{
                width: "clamp(210px, 16vw, 290px)",
              }}
            >
              {/* Colored Card Container */}
              <div
                className="relative w-full rounded-2xl flex items-center justify-center transition-all duration-500 overflow-visible shadow-xl group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] group-hover:-translate-y-1"
                style={{
                  backgroundColor: product.bgAccent,
                  height: "clamp(125px, 9.8vw, 175px)",
                }}
              >
                {/* 3D Pop-out Floating Coffee Bag with Realistic Drop Shadow */}
                <div className="relative w-3/4 h-[125%] transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-110 -translate-y-2">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 180px, 280px"
                    className="object-contain filter drop-shadow-[0_15px_22px_rgba(0,0,0,0.48)]"
                    unoptimized
                    draggable={false}
                  />
                </div>
              </div>

              {/* Title, Subtitle, and Directional Arrow */}
              <div
                className={`mt-4 flex flex-col items-center text-center transition-all duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] ${
                  isThisHovered
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-1.5"
                }`}
              >
                <span className="font-serif italic text-xs tracking-wide text-creme-200/70 mb-0.5">
                  {categoryLabel}
                </span>

                <h4 className="font-sans font-bold text-sm sm:text-base tracking-[0.16em] text-creme-50 uppercase leading-none text-delta-yellow">
                  {product.name.replace(/^Origem\s+/i, "")}
                </h4>

                <div className="mt-1.5 flex items-center justify-center text-creme-200/80 group-hover:text-delta-yellow transition-transform group-hover:translate-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                    className="w-4 h-4 stroke-current stroke-2"
                  >
                    <path
                      d="M4.167 10h11.666m-4.166-4.167L15.833 10l-4.166 4.167"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
