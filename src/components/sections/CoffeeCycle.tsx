"use client";

import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { ArrowRight, X, Sparkles, Flame, Layers, Coffee, Check, Volume2 } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Dynamically load the authentic Rive canvas runtime (client-only)
const CoffeeCycleRive = dynamic(() => import("./CoffeeCycleRive"), {
  ssr: false,
});

interface CoffeeCycleProps {
  currentLang: "pt" | "en";
}

interface CycleStage {
  id: string;
  num: string;
  name: string;
  namePt: string;
  tagline: string;
  taglinePt: string;
  coords: { left: string; top: string }; // Position percentages for titles
  badge: string;
  badgePt: string;
  highlights: { label: string; value: string; labelPt: string; valuePt: string }[];
  description: string;
  descriptionPt: string;
  iconType: "origens" | "torra" | "blend" | "prova";
}

export const CoffeeCycle: React.FC<CoffeeCycleProps> = ({ currentLang }) => {
  const [activeStage, setActiveStage] = useState<CycleStage | null>(null);
  const [hoveredStageId, setHoveredStageId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);

  const stages: CycleStage[] = [
    {
      id: "origens",
      num: "01",
      name: "Origins",
      namePt: "Origens",
      tagline: "Where the story begins",
      taglinePt: "Onde a história nasce",
      coords: { left: "25.75%", top: "85%" },
      badge: "Terroir & Microclimates",
      badgePt: "Terroir & Microclimas",
      highlights: [
        { label: "Altitude", value: "800m - 2,200m", labelPt: "Altitude", valuePt: "800m - 2.200m" },
        { label: "Harvest", value: "100% Selective Picking", labelPt: "Colheita", valuePt: "100% Manual Seletiva" },
        { label: "Origins", value: "Brazil, Colombia, Angola, Timor, Vietnam", labelPt: "Origens", valuePt: "Brasil, Colômbia, Angola, Timor, Vietname" },
      ],
      description:
        "Hand-picked at peak ripeness across high-altitude plantations in Latin America, Africa, and Asia. Volcanic soils and distinct equatorial microclimates yield beans packed with rich, complex sugars.",
      descriptionPt:
        "Cerejas colhidas à mão no ponto ótimo de maturação em plantações de grande altitude na América Latina, África e Ásia. Solos vulcânicos e microclimas equatoriais nutrem grãos repletos de densidade e doçura natural.",
      iconType: "origens",
    },
    {
      id: "torra",
      num: "02",
      name: "Roast",
      namePt: "Torra",
      tagline: "Awakening the bean's soul",
      taglinePt: "O despertar da alma do grão",
      coords: { left: "41.5%", top: "48%" },
      badge: "Artisanal Thermodynamic Curve",
      badgePt: "Curva Térmica Artesanal",
      highlights: [
        { label: "Roast Temp", value: "185°C - 215°C", labelPt: "Temperatura", valuePt: "185°C - 215°C" },
        { label: "Profile", value: "Slow Drum Roasting", labelPt: "Método", valuePt: "Torra Lenta em Tambor" },
        { label: "Aromas", value: "800+ Natural Compounds", labelPt: "Aromas", valuePt: "+800 Compostos Naturais" },
      ],
      description:
        "Master roasting calibrated to the exact humidity and density of each harvest. Convective heat and thermodynamic precision trigger caramelization, revealing notes of cocoa, nuts, and noble spices without burning delicate acids.",
      descriptionPt:
        "Torra mestra calibrada para a humidade e densidade exatas de cada lote. O calor por convecção em tambores tradicionais carameliza os açúcares, libertando mais de 800 notas aromáticas sem queimar os ácidos nobres.",
      iconType: "torra",
    },
    {
      id: "blend",
      num: "03",
      name: "Blend",
      namePt: "Blend",
      tagline: "The master alchemical harmony",
      taglinePt: "A harmonia alquímica secreta",
      coords: { left: "58%", top: "75%" },
      badge: "Secret Family Heritage",
      badgePt: "Alquimia Secreta Delta",
      highlights: [
        { label: "Varieties", value: "Noble Arabica & Robusta", labelPt: "Variedades", valuePt: "Arábicas Nobres & Robustas" },
        { label: "Balance", value: "Crema, Acidity, Body", labelPt: "Equilíbrio", valuePt: "Crema, Acidez, Corpo" },
        { label: "Consistency", value: "Unchanged since 1961", labelPt: "Consistência", valuePt: "Inalterada desde 1961" },
      ],
      description:
        "The signature secret of Delta: masterfully combining the delicate floral aromatics and refined citrus acidity of high-grown Arabicas with the deep body, rich crema, and chocolate finish of fine Robustas.",
      descriptionPt:
        "A assinatura inconfundível da Delta: casar a acidez floral e cítrica dos Arábicas de altitude com o corpo vigoroso, a crema aveludada cor de avelã e a persistência achocolatada das melhores Robustas.",
      iconType: "blend",
    },
    {
      id: "prova",
      num: "04",
      name: "Tasting",
      namePt: "Prova",
      tagline: "The crowning moment in porcelain",
      taglinePt: "A coroação na chávena de porcelana",
      coords: { left: "74.2%", top: "45%" },
      badge: "Sensory Quality Protocol",
      badgePt: "Protocolo Sensorial de Excelência",
      highlights: [
        { label: "Extraction", value: "9 bars at 90°C", labelPt: "Extração", valuePt: "9 bar de pressão a 90°C" },
        { label: "Porcelain", value: "Thermal Retaining Delta Cup", labelPt: "Porcelana", valuePt: "Chávena Espessa Delta" },
        { label: "Validation", value: "Certified Master Tasters", labelPt: "Aprovação", valuePt: "Mestres Provadores Certificados" },
      ],
      description:
        "The sensory climax. Before any blend leaves Campo Maior, certified Q-Graders and master tasters cup every batch. When extracted at 9 bars into pre-warmed porcelain, it delivers the iconic golden-hazel crema and velvety mouthfeel.",
      descriptionPt:
        "O clímax sensorial. Antes de cada lote sair de Campo Maior, mestres provadores avaliam aroma, corpo e final de boca. Na chávena de porcelana quente a 9 bar de pressão, o café revela o icónico creme aveludado e o sabor eterno.",
      iconType: "prova",
    },
  ];

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Parallax scroll on background video
      const bgVideo = sectionRef.current.querySelector(".background-video");
      if (bgVideo) {
        gsap.to(bgVideo, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Title reveal animation
      const title = sectionRef.current.querySelector(".cycle-title");
      if (title) {
        gsap.fromTo(
          title,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
            },
          }
        );
      }

      // Floating wave animation on SVG decorative path
      const pathGlow = sectionRef.current.querySelector(".path-ambient-float");
      if (pathGlow) {
        gsap.to(pathGlow, {
          y: -8,
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Floating steam pulses for icons
      const steams = sectionRef.current.querySelectorAll(".steam-float");
      steams.forEach((steam, i) => {
        gsap.to(steam, {
          y: -6,
          opacity: 0.35,
          duration: 1.8 + i * 0.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.3,
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="coffee-cycle"
      ref={sectionRef}
      className="relative min-h-[780px] sm:min-h-[880px] lg:min-h-[960px] py-20 sm:py-28 bg-[#18110E] text-creme-100 overflow-hidden flex flex-col justify-between select-none"
    >
      {/* 1. Authentic Background Video (Streaming directly from Delta's CDN) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="background-video w-full h-[120%] object-cover object-right md:object-center filter brightness-[0.85] contrast-[1.10]"
          src="https://burospaces1.fra1.cdn.digitaloceanspaces.com/delta/2026-03-17T12-24-57.271Z-ciclo.mp4"
        />
        {/* Subtle dark gradient overlay to ensure contrast matching the original video */}
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-oak-1000/70 via-transparent to-oak-1000/80" />
      </div>

      {/* 2. Header Area (Matching authentic typography in the user video) */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 mt-2 sm:mt-6">
        <h2 className="cycle-title font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-none text-creme-100 uppercase font-bold flex items-baseline justify-center flex-wrap gap-x-3 gap-y-1">
          {currentLang === "pt" ? (
            <>
              <span className="text-2xl sm:text-3xl md:text-5xl font-light lowercase text-creme-200/90 -translate-y-2 sm:-translate-y-4">
                o
              </span>
              <span>CICLO</span>
              <span className="text-xl sm:text-2xl md:text-4xl font-normal lowercase text-creme-200/90 mx-1">
                do
              </span>
              <span>CAFÉ</span>
            </>
          ) : (
            <>
              <span className="text-2xl sm:text-3xl md:text-5xl font-light lowercase text-creme-200/90 -translate-y-2 sm:-translate-y-4">
                the
              </span>
              <span>JOURNEY</span>
              <span className="text-xl sm:text-2xl md:text-4xl font-serif italic text-delta-yellow font-normal lowercase mx-2">
                of
              </span>
              <span>COFFEE</span>
            </>
          )}
        </h2>
      </div>

      {/* 3. Center Interactive Journey Canvas (Rive Engine + SVG Precision Vectors) */}
      <div
        ref={canvasWrapperRef}
        className="relative z-10 w-full max-w-[1700px] mx-auto my-auto overflow-x-auto overflow-y-hidden scrollbar-none py-4"
      >
        <div className="relative min-w-[980px] sm:min-w-[1150px] lg:min-w-full w-full aspect-[3400/1280] mx-auto">
          {/* Authentic Rive Runtime Canvas (Loads official .riv vector asset) */}
          <div className="absolute inset-0 z-0">
            <CoffeeCycleRive />
          </div>

          {/* SVG Vector Path and Interactive Stage Hotspots */}
          <svg
            viewBox="0 0 3400 1280"
            fill="none"
            className="path-ambient-float absolute inset-0 w-full h-full pointer-events-none z-10 opacity-90"
          >
            {/* Dashed entry curve coming from offscreen left */}
            <path
              d="M 120 220 Q 380 400 680 720"
              stroke="#c6e864"
              strokeWidth="3"
              strokeDasharray="14 14"
              opacity="0.8"
            />

            {/* Glowing Lime-Green Spline connecting the 4 stages */}
            <path
              d="M 680 720 C 740 780 780 1020 900 1020 C 1020 1020 1060 620 1280 420 C 1410 300 1560 300 1680 480 C 1800 660 1880 1000 2060 980 C 2200 960 2280 620 2480 440 C 2620 320 2740 380 2860 520"
              stroke="#c6e864"
              strokeWidth="4"
              strokeLinecap="round"
              className="filter drop-shadow-[0_0_8px_rgba(198,232,100,0.5)]"
            />

            {/* Dashed exit curve continuing to the right */}
            <path
              d="M 2860 520 Q 3020 680 3280 820"
              stroke="#c6e864"
              strokeWidth="3"
              strokeDasharray="14 14"
              opacity="0.6"
            />

            {/* Stage 1: Origens Circular Ring */}
            <circle
              cx="880"
              cy="880"
              r="280"
              stroke="#c6e864"
              strokeWidth="3.5"
              fill="none"
              opacity="0.85"
            />

            {/* Stage 4: Prova Circular Ring */}
            <circle
              cx="2520"
              cy="580"
              r="285"
              stroke="#c6e864"
              strokeWidth="3.5"
              fill="none"
              opacity="0.85"
            />
          </svg>

          {/* Interactive Step Hotspots positioned exactly as in original CSS */}
          {stages.map((stage, idx) => {
            const isHovered = hoveredStageId === stage.id;

            return (
              <div
                key={stage.id}
                style={{
                  left: stage.coords.left,
                  top: stage.coords.top,
                  transform: "translate(-50%, -50%)",
                }}
                className="absolute z-20 flex flex-col items-center group cursor-pointer"
                onMouseEnter={() => setHoveredStageId(stage.id)}
                onMouseLeave={() => setHoveredStageId(null)}
                onClick={() => setActiveStage(stage)}
              >
                {/* Clickable Touch/Hover Hitbox Area */}
                <div className="relative flex flex-col items-center">
                  {/* Subtle pulsing indicator ring on hover */}
                  <div
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isHovered
                        ? "bg-creme-100/20 scale-125 shadow-[0_0_25px_rgba(198,232,100,0.6)]"
                        : "bg-transparent scale-100"
                    }`}
                  >
                    <div className="w-3 h-3 rounded-full bg-delta-yellow animate-ping opacity-60" />
                  </div>

                  {/* Stage Label Text matching authentic style */}
                  <div className="mt-2 text-center transition-transform duration-300 group-hover:scale-110">
                    <span className="block font-sans text-xs sm:text-sm font-semibold tracking-wide text-creme-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] group-hover:text-delta-yellow transition-colors">
                      {currentLang === "pt" ? stage.namePt : stage.name}
                    </span>
                    <span className="block text-[9px] sm:text-[10px] text-creme-200/70 font-mono tracking-widest uppercase">
                      {stage.num}
                    </span>
                  </div>

                  {/* Floating tooltip pill on hover */}
                  <div
                    className={`absolute -top-10 whitespace-nowrap px-3 py-1 rounded-full bg-oak-950/90 border border-creme-200/20 text-[10px] font-sans font-medium text-creme-100 shadow-xl pointer-events-none transition-all duration-200 ${
                      isHovered
                        ? "opacity-100 -translate-y-1 scale-100"
                        : "opacity-0 translate-y-1 scale-95"
                    }`}
                  >
                    <span>{currentLang === "pt" ? stage.taglinePt : stage.tagline}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Description Paragraph and CTA Button (Identical to original site & video) */}
      <div className="relative z-10 max-w-3xl mx-auto text-center px-4 mb-4 sm:mb-8 flex flex-col items-center gap-6">
        <p className="text-xs sm:text-sm md:text-base text-creme-200/90 font-sans max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          {currentLang === "pt"
            ? "O café nasce na origem, ganha alma na torra, equilíbrio no blend e expressão na chávena. Um ritual que a Delta aperfeiçoa há mais de 60 anos."
            : "Coffee begins at the origin, finds its soul in the roast, its balance in the blend, and its fullest expression in the cup. A ritual Delta has perfected over 60 years."}
        </p>

        {/* Authentic Pill Button */}
        <button
          onClick={() => setActiveStage(stages[0])}
          className="inline-flex items-center gap-3 px-6 py-2.5 sm:px-7 sm:py-3 rounded-full bg-[#f4ebe1] hover:bg-white text-oak-950 font-sans font-medium text-xs sm:text-sm transition-all duration-300 shadow-xl group cursor-pointer"
        >
          <span>{currentLang === "pt" ? "O Ciclo do Café" : "The Coffee Cycle"}</span>
          <div className="w-5 h-5 rounded-full bg-oak-950 text-creme-100 flex items-center justify-center group-hover:translate-x-1 transition-transform">
            <ArrowRight className="w-3 h-3 text-delta-yellow" />
          </div>
        </button>
      </div>

      {/* 5. Interactive Stage Detail Modal (Exploring Delta's Craftsmanship) */}
      {activeStage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setActiveStage(null)}
        >
          <div
            className="relative w-full max-w-xl bg-oak-900 border border-creme-200/20 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button */}
            <button
              onClick={() => setActiveStage(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-oak-800 text-creme-200 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Badge & Stage Number */}
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-delta-yellow/15 border border-delta-yellow/30 text-[10px] font-mono font-bold text-delta-yellow uppercase tracking-widest">
                {activeStage.num} · {currentLang === "pt" ? activeStage.badgePt : activeStage.badge}
              </span>
            </div>

            {/* Stage Title */}
            <h3 className="font-display text-2xl sm:text-3xl text-creme-50 uppercase font-bold tracking-tight mb-2">
              {currentLang === "pt" ? activeStage.namePt : activeStage.name}
            </h3>
            <p className="font-serif italic text-delta-yellow/90 text-sm mb-6">
              "{currentLang === "pt" ? activeStage.taglinePt : activeStage.tagline}"
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 p-4 rounded-2xl bg-oak-950/70 border border-creme-200/10">
              {activeStage.highlights.map((h, i) => (
                <div key={i} className="text-center sm:text-left">
                  <span className="block text-[10px] font-mono text-creme-200/60 uppercase tracking-widest">
                    {currentLang === "pt" ? h.labelPt : h.label}
                  </span>
                  <span className="block text-xs font-semibold text-creme-100 mt-0.5">
                    {currentLang === "pt" ? h.valuePt : h.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Detailed Story Narrative */}
            <p className="text-xs sm:text-sm text-creme-200/90 font-sans leading-relaxed mb-6">
              {currentLang === "pt" ? activeStage.descriptionPt : activeStage.description}
            </p>

            {/* Step Navigation Tabs */}
            <div className="flex items-center justify-between pt-4 border-t border-creme-200/10">
              <div className="flex gap-2">
                {stages.map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setActiveStage(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                      activeStage.id === st.id
                        ? "bg-delta-red text-white shadow-md"
                        : "bg-oak-800 text-creme-200/70 hover:text-white"
                    }`}
                  >
                    {st.num}
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  const nextIndex = (stages.findIndex((s) => s.id === activeStage.id) + 1) % stages.length;
                  setActiveStage(stages[nextIndex]);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-sans text-delta-yellow hover:underline cursor-pointer"
              >
                <span>{currentLang === "pt" ? "Seguinte" : "Next"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CoffeeCycle;
