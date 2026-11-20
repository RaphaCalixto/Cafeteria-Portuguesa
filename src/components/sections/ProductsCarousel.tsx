"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { productsData } from "@/data/deltaData";
import { CoffeeProduct } from "@/types/delta";
import { ProductsInfiniteRibbon } from "./ProductsInfiniteRibbon";
import { Sparkles, X, ChevronRight, Info, Check } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProductsCarouselProps {
  currentLang: "pt" | "en";
}

export const ProductsCarousel: React.FC<ProductsCarouselProps> = ({ currentLang }) => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedProduct, setSelectedProduct] = useState<CoffeeProduct | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);

  const filters = [
    { id: "all", labelPt: "Todos os Lotes", labelEn: "All Blends" },
    { id: "heritage", labelPt: "Lotes Clássicos", labelEn: "Heritage Blends" },
    { id: "origins", labelPt: "Origens Únicas", labelEn: "Single Origins" },
    { id: "bio", labelPt: "Biológico", labelEn: "Organic Bio" },
  ];

  const filteredProducts = productsData.filter((p) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "heritage") return p.id === "lote-chavena" || p.id === "roast-portugal";
    if (activeFilter === "origins") return p.id !== "lote-chavena" && p.id !== "roast-portugal" && p.id !== "bio";
    if (activeFilter === "bio") return p.id === "bio";
    return true;
  });

  useGSAP(
    () => {
      if (cardsGridRef.current) {
        gsap.fromTo(
          cardsGridRef.current.children,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsGridRef.current,
              start: "top 80%",
            },
          }
        );
      }
    },
    { dependencies: [activeFilter], scope: containerRef }
  );

  return (
    <section
      id="products"
      ref={containerRef}
      className="relative pt-12 pb-24 sm:pb-32 bg-oak-950 text-creme-100 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-delta-darkRed/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] rounded-full bg-delta-yellow/5 blur-[120px] pointer-events-none" />

      {/* 1. EXACT REPLICA: Infinite Colorful Cards Ribbon (From Video) */}
      <div className="mb-20">
        <div className="text-center mb-6 px-4">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-delta-yellow font-bold">
            {currentLang === "pt" ? "Coleção Contínua • Arraste ou Passe o Cursor" : "Continuous Collection • Drag or Hover"}
          </span>
        </div>
        <ProductsInfiniteRibbon
          onSelectProduct={(p) => setSelectedProduct(p)}
          currentLang={currentLang}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-delta-red/30 bg-delta-red/10 text-delta-red text-xs uppercase tracking-[0.2em] font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            {currentLang === "pt" ? "Catálogo Completo" : "Complete Portfolio"}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-creme-50 tracking-tight leading-tight">
            {currentLang === "pt" ? (
              <>
                Há muito de Portugal <br />
                <span className="italic text-delta-yellow">em cada lote Delta.</span>
              </>
            ) : (
              <>
                There is a lot of Portugal <br />
                <span className="italic text-delta-yellow">in every Delta blend.</span>
              </>
            )}
          </h2>
          <p className="mt-5 text-sm sm:text-base text-creme-200/80 font-sans max-w-xl mx-auto leading-relaxed">
            {currentLang === "pt"
              ? "Desde a torra lenta dos lotes históricos até às colheitas raras das origens mais remotas do mundo. Selecione para ver notas e intensidades."
              : "From the slow artisanal roasting of historic blends to rare single-origin harvests from across the globe. Select any lot to inspect taste profiles."}
          </p>

          {/* Filter Tabs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeFilter === f.id
                    ? "bg-delta-red text-white shadow-glow scale-105"
                    : "bg-oak-900/70 border border-creme-200/10 text-creme-200 hover:text-white hover:border-creme-200/30"
                }`}
              >
                {currentLang === "pt" ? f.labelPt : f.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid with Original Card Colors */}
        <div
          ref={cardsGridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
        >
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className="group relative bg-oak-900/60 hover:bg-oak-900 border border-creme-200/10 hover:border-creme-200/30 rounded-2xl p-6 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
            >
              {/* Badge & Origin */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full text-white border border-white/20"
                    style={{ backgroundColor: product.bgAccent }}
                  >
                    {product.badge}
                  </span>
                  <span className="text-[11px] font-sans text-creme-200/70 truncate">
                    {product.origin}
                  </span>
                </div>

                {/* Package Container with Product Background Tone */}
                <div
                  className="relative w-full h-56 sm:h-64 my-4 rounded-xl flex items-center justify-center transition-transform duration-500 overflow-visible"
                  style={{ backgroundColor: `${product.bgAccent}20` }}
                >
                  <div className="relative w-40 h-52 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-1">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-contain filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.5)]"
                      unoptimized
                    />
                  </div>
                </div>

                {/* Product Name */}
                <h3 className="font-serif text-xl sm:text-2xl text-creme-50 group-hover:text-delta-yellow transition-colors mt-2">
                  {product.name}
                </h3>

                {/* Tasting Notes */}
                <p className="mt-2 text-xs text-creme-200/80 leading-relaxed line-clamp-2">
                  {product.notes}
                </p>
              </div>

              {/* Bottom Card Area: Intensity Meter & Action */}
              <div className="mt-6 pt-4 border-t border-creme-200/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-creme-200/60 block font-medium">
                    {currentLang === "pt" ? "Intensidade" : "Intensity"}:{" "}
                    <strong className="text-delta-yellow font-bold text-xs">{product.intensity}/12</strong>
                  </span>
                  {/* Visual dots intensity meter */}
                  <div className="flex gap-1 mt-1.5">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <span
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full transition-colors ${
                          i < product.intensity ? "bg-delta-red" : "bg-oak-800"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProduct(product);
                  }}
                  className="p-2.5 rounded-full bg-oak-800 hover:bg-delta-red text-creme-100 hover:text-white transition-colors cursor-pointer shadow-sm"
                  aria-label="Ver Detalhes do Café"
                >
                  <Info className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Quick-View Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-oak-900 border border-creme-200/20 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-oak-800 text-creme-200 hover:text-white hover:bg-oak-700 transition-colors cursor-pointer z-10"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
              {/* Product Visual with Authentic Colored Background */}
              <div
                className="relative w-full h-64 sm:h-80 flex items-center justify-center rounded-2xl p-4 border border-white/10 shadow-inner"
                style={{ backgroundColor: selectedProduct.bgAccent }}
              >
                <div className="relative w-48 h-64">
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    fill
                    className="object-contain filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.6)]"
                    unoptimized
                  />
                </div>
              </div>

              {/* Product Details */}
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-widest font-bold text-delta-yellow mb-2">
                  {selectedProduct.badge} • {selectedProduct.origin}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-creme-50 mb-3">
                  {selectedProduct.name}
                </h3>

                <div className="mb-4">
                  <span className="text-xs text-creme-200/70 font-semibold uppercase tracking-wider block mb-1">
                    {currentLang === "pt" ? "Perfil de Torra" : "Roast Profile"}: {selectedProduct.roast}
                  </span>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-creme-100 font-bold">
                      {currentLang === "pt" ? "Intensidade" : "Intensity"} {selectedProduct.intensity}/12
                    </span>
                    <div className="flex gap-1">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <span
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < selectedProduct.intensity ? "bg-delta-red" : "bg-oak-700"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-creme-200/90 leading-relaxed font-sans mb-6">
                  {selectedProduct.notes}
                </p>

                <div className="space-y-2 text-xs text-creme-200/80 mb-6">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-delta-yellow" />
                    <span>{currentLang === "pt" ? "Grãos selecionados com certificação ética" : "Ethically certified selected beans"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-delta-yellow" />
                    <span>{currentLang === "pt" ? "Moagem ideal para espresso e prensa" : "Optimized grind for espresso & moka"}</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedProduct(null)}
                  className="w-full py-3.5 rounded-full bg-delta-red hover:bg-delta-darkRed text-white text-xs uppercase tracking-widest font-bold transition-all shadow-glow flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{currentLang === "pt" ? "Explorar na Loja" : "Explore in Shop"}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
