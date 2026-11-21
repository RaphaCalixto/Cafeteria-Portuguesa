"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { ArrowRight, X, Heart, Calendar } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface BrandManifestoProps {
  currentLang: "pt" | "en";
}

interface MemoryPhoto {
  id: string;
  title: string;
  titlePt: string;
  tooltip: string;
  tooltipPt: string;
  year?: string;
  image: string;
  aspect: string;
  position: {
    top: string;
    left?: string;
    right?: string;
    width: string;
  };
  rotation: number;
  storyPt: string;
  storyEn: string;
}

export const BrandManifesto: React.FC<BrandManifestoProps> = ({ currentLang }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<MemoryPhoto | null>(null);

  const memoryPhotos: MemoryPhoto[] = [
    {
      id: "expo98",
      title: "The official coffee of Expo’98",
      titlePt: "O café oficial da Expo ’98",
      tooltip: "The official coffee of Expo’98",
      tooltipPt: "O café oficial da Expo ’98",
      year: "1998",
      image: "https://cdn.sanity.io/images/pcdkofnf/production/da6cb5e4ba52bf708af9b2400e057ed6e7f2af1a-349x269.png",
      aspect: "aspect-[349/269]",
      position: { top: "12%", left: "4%", width: "clamp(120px, 12vw, 190px)" },
      rotation: -3,
      storyPt: "Em 1998, a Delta foi o café oficial da Exposição Mundial de Lisboa, acolhendo milhões de visitantes de todo o mundo com o autêntico sabor português.",
      storyEn: "In 1998, Delta served as the official coffee of the Lisbon World Exposition, welcoming millions of global visitors with Portuguese warmth."
    },
    {
      id: "deltanic",
      title: "The sugar packets",
      titlePt: "Os pacotes de açúcar colecionáveis",
      tooltip: "The sugar packets",
      tooltipPt: "Os pacotes de açúcar",
      year: "1997",
      image: "https://cdn.sanity.io/images/pcdkofnf/production/5b21088ca92b191a19f4194cc69c74192cb87b5d-328x468.png",
      aspect: "aspect-[328/468]",
      position: { top: "45%", left: "24%", width: "clamp(100px, 9.5vw, 160px)" },
      rotation: 2,
      storyPt: "O célebre pacote de açúcar 'Deltanic - É bom, caramba! Deixe-se naufragar por este aroma', que se tornou objeto cult de colecionismo em Portugal.",
      storyEn: "The famous 'Deltanic - É bom, caramba!' sugar packet parody that became a cultural icon in Portuguese cafés."
    },
    {
      id: "sala",
      title: "Wake up every day with António Sala",
      titlePt: "Acordar todos os dias com António Sala",
      tooltip: "Wake up every day with António Sala",
      tooltipPt: "Acordar com António Sala",
      year: "1980",
      image: "https://cdn.sanity.io/images/pcdkofnf/production/c57f070dd85d15b92018d6dc1ad6d79b79887072-332x254.png",
      aspect: "aspect-[332/254]",
      position: { top: "68%", left: "2%", width: "clamp(125px, 11vw, 180px)" },
      rotation: 1,
      storyPt: "Uma parceria inesquecível na rádio e televisão que deu voz aos despertares matinais de várias gerações de portugueses.",
      storyEn: "An unforgettable radio and television partnership that gave voice to mornings for entire generations of Portuguese families."
    },
    {
      id: "family",
      title: "Family roots in Campo Maior",
      titlePt: "As raízes de Campo Maior",
      tooltip: "Family roots",
      tooltipPt: "Raízes de Campo Maior",
      year: "1965",
      image: "https://cdn.sanity.io/images/pcdkofnf/production/f25bc355a209b988dc8a6cfa00dac898ee4af13c-504x324.jpg",
      aspect: "aspect-[504/324]",
      position: { top: "86%", left: "18%", width: "clamp(95px, 8.5vw, 140px)" },
      rotation: -2,
      storyPt: "O retrato da família Nabeiro em Campo Maior, unidos pelos valores inegociáveis de proximidade, solidariedade e dedicação ao trabalho.",
      storyEn: "The Nabeiro family in Campo Maior, united by values of proximity, solidarity, and personal dedication."
    },
    {
      id: "roasting-warehouse",
      title: "Delta cups: a porcelain heritage",
      titlePt: "Chávenas Delta: herança em porcelana",
      tooltip: "Delta cups: a porcelain heritage",
      tooltipPt: "Herança em porcelana",
      year: "1961",
      image: "https://cdn.sanity.io/images/pcdkofnf/production/68c7b46bbe4cc69656bb64d17a71a9a29788f006-288x218.png",
      aspect: "aspect-[288/218]",
      position: { top: "8%", right: "4%", width: "clamp(115px, 11vw, 185px)" },
      rotation: 2,
      storyPt: "As primeiras máquinas de torra manual e o nascimento do design de chávena espessa que mantém a temperatura perfeita do espresso.",
      storyEn: "The first manual roasting drums and the bespoke porcelain cup designed to retain the perfect espresso temperature."
    },
    {
      id: "foundation",
      title: "Delta Foundation",
      titlePt: "Fundação Coração Delta",
      tooltip: "Delta Foundation",
      tooltipPt: "Fundação Delta",
      year: "1994",
      image: "https://cdn.sanity.io/images/pcdkofnf/production/c0c8079c3fc884c1d097d773ff9c7e9deba0e12f-216x310.png",
      aspect: "aspect-[216/310]",
      position: { top: "44%", right: "22%", width: "clamp(85px, 8vw, 130px)" },
      rotation: -2,
      storyPt: "A Fundação criada para cuidar da infância, dos idosos e da educação em Campo Maior e no Alentejo, prolongando a solidariedade de Rui Nabeiro.",
      storyEn: "The foundation created to support children, the elderly, and education in the Alentejo community."
    },
    {
      id: "calendar",
      title: "The calendar craze",
      titlePt: "A tradição dos calendários",
      tooltip: "The calendar craze",
      tooltipPt: "A febre dos calendários",
      year: "1975",
      image: "https://cdn.sanity.io/images/pcdkofnf/production/4964395f83fc72a4a5fb8b25e1c99205ac4f03af-250x358.png",
      aspect: "aspect-[250/358]",
      position: { top: "58%", right: "2%", width: "clamp(110px, 11.5vw, 180px)" },
      rotation: 3,
      storyPt: "A famosa homenagem a Fernando Pessoa na mesa de café: 'Todos as pessoas bebem café Delta'. Peça histórica que marcou a publicidade portuguesa.",
      storyEn: "The iconic Fernando Pessoa café table tribute: 'Todos as pessoas bebem café Delta', an enduring piece of Portuguese graphic culture."
    }
  ];

  useGSAP(
    () => {
      if (!containerRef.current || !cameraRef.current) return;

      // 0. Editorial Typography Entrance Reveal (appearing effect with mask slide-up & stagger)
      const manifestoLines = containerRef.current.querySelectorAll(".manifesto-line");
      const manifestoBtn = containerRef.current.querySelector(".manifesto-btn");
      const manifestoDesc = containerRef.current.querySelector(".manifesto-desc");

      if (manifestoLines.length > 0) {
        const textTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".manifesto-header",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });

        textTl.from(manifestoLines, {
          yPercent: 115,
          opacity: 0,
          duration: 1.0,
          stagger: 0.12,
          ease: "power3.out",
        });

        if (manifestoBtn) {
          textTl.from(
            manifestoBtn,
            {
              y: 25,
              opacity: 0,
              duration: 0.8,
              ease: "power3.out",
            },
            "-=0.5"
          );
        }

        if (manifestoDesc) {
          textTl.from(
            manifestoDesc,
            {
              y: 20,
              opacity: 0,
              duration: 0.9,
              ease: "power3.out",
            },
            "-=0.6"
          );
        }
      }

      // 1. Visibly expressive continuous floating animation on cards (organic levitation in 2D space)
      const floaters = cameraRef.current.querySelectorAll(".ambient-float");
      floaters.forEach((el, i) => {
        const yDistance = 20 + (i % 4) * 4; // 20px, 24px, 28px, 32px de deslocamento vertical
        const xDistance = (i % 2 === 0 ? 1 : -1) * (5 + (i % 3) * 3); // 5px a 11px de deriva lateral orgânica
        const duration = 3.0 + (i % 4) * 0.45; // 3.0s a 4.35s de ciclo rítmico suave
        const rotAngle = (i % 2 === 0 ? 1 : -1) * (2.0 + (i % 3) * 0.8); // 2.0° a 3.6° de balanço

        gsap.to(el, {
          y: `-=${yDistance}`,
          x: `+=${xDistance}`,
          rotation: `+=${rotAngle}`,
          duration: duration,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: (i * 0.35) % 1.6,
        });
      });

      // 2. Animated Floating Constellation Lines & Orbits (expressive fluid motion)
      const linesGroup1 = cameraRef.current.querySelector(".constellation-lines-1");
      const linesGroup2 = cameraRef.current.querySelector(".constellation-lines-2");
      const orbitsGroup = cameraRef.current.querySelector(".constellation-orbits");
      const orbitsDashes = cameraRef.current.querySelectorAll(".constellation-dash");

      if (linesGroup1) {
        gsap.to(linesGroup1, {
          y: -18,
          x: 8,
          scale: 1.03,
          transformOrigin: "center center",
          duration: 3.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      if (linesGroup2) {
        gsap.to(linesGroup2, {
          y: 16,
          x: -8,
          scale: 0.97,
          transformOrigin: "center center",
          duration: 4.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 0.4,
        });
      }

      if (orbitsGroup) {
        gsap.to(orbitsGroup, {
          scale: 1.04,
          rotation: 2.5,
          y: -10,
          transformOrigin: "center center",
          duration: 5.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      if (orbitsDashes.length > 0) {
        gsap.to(orbitsDashes, {
          strokeDashoffset: -100,
          duration: 25,
          repeat: -1,
          ease: "none",
        });
      }

      // 3. Parallax scroll effect on anchors
      const anchors = cameraRef.current.querySelectorAll(".floating-card-anchor");
      anchors.forEach((anchor, i) => {
        const speed = ((i % 3) + 1) * 16;
        gsap.to(anchor, {
          y: -speed,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="history"
      ref={containerRef}
      className="relative py-20 sm:py-32 bg-oak-1000 text-creme-100 overflow-hidden select-none"
    >
      {/* 1. Header Typography Area (Replicating exact video style) */}
      <div className="manifesto-header max-w-4xl mx-auto px-4 text-center relative z-20 mb-8 sm:mb-12">
        <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-creme-100 uppercase font-bold">
          <span className="block overflow-hidden py-0.5 sm:py-1">
            <span className="manifesto-line block will-change-transform">SINCE 1961,</span>
          </span>
          <span className="block overflow-hidden py-0.5 sm:py-1">
            <span className="manifesto-line block will-change-transform">
              COFFEE <span className="font-serif italic font-normal text-delta-yellow lowercase text-3xl sm:text-5xl md:text-6xl mx-2">that</span>
            </span>
          </span>
          <span className="block overflow-hidden py-0.5 sm:py-1">
            <span className="manifesto-line block will-change-transform">AWAKENS</span>
          </span>
          <span className="block overflow-hidden py-0.5 sm:py-1">
            <span className="manifesto-line block will-change-transform">STORIES</span>
          </span>
        </h2>

        {/* History pill button */}
        <div className="manifesto-btn mt-8 flex justify-center will-change-transform">
          <a
            href="#history-map"
            className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-oak-800/80 hover:bg-oak-700/90 border border-creme-200/15 text-creme-100 text-xs sm:text-sm font-sans font-medium transition-all duration-300 shadow-md group"
          >
            <span>{currentLang === "pt" ? "A História da Delta" : "History of Delta"}</span>
            <div className="w-5 h-5 rounded-full bg-oak-900/80 flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-3 h-3 text-delta-yellow" />
            </div>
          </a>
        </div>

        {/* Story description paragraph */}
        <p className="manifesto-desc mt-6 text-sm sm:text-base text-creme-200/80 font-sans max-w-xl mx-auto leading-relaxed will-change-transform">
          {currentLang === "pt"
            ? "A Delta Cafés nasceu em Campo Maior do sonho de uma família. Hoje, faz parte do quotidiano de milhões de pessoas, preservando a essência que a tornou única."
            : "Delta Cafés was born in Campo Maior from a family’s dream. Today, it is part of the daily lives of millions, while preserving the essence that made it unique."}
        </p>
      </div>

      {/* 2. Constellation Interactive Canvas with Floating Cards & Floating Lines */}
      <div
        id="history-map"
        ref={cameraRef}
        className="relative w-full max-w-[1300px] mx-auto h-[620px] sm:h-[750px] md:h-[880px] lg:h-[950px] overflow-hidden"
      >
        {/* Animated & Floating Constellation SVG Connecting Lines */}
        <svg
          viewBox="0 0 1236 1040"
          fill="none"
          className="absolute inset-0 w-full h-full pointer-events-none opacity-60 transition-opacity duration-700"
        >
          {/* Orbits Group (Gently floats, breathes, expands, and rotates) */}
          <g className="constellation-orbits will-change-transform">
            <ellipse
              cx="618"
              cy="520"
              rx="519"
              ry="435"
              stroke="#deb89f"
              strokeWidth="1.5"
              strokeDasharray="6 6"
              className="constellation-dash"
              opacity="0.9"
            />
            <ellipse
              cx="618"
              cy="520"
              rx="320"
              ry="260"
              stroke="#deb89f"
              strokeWidth="1.2"
              strokeDasharray="4 4"
              className="constellation-dash"
              opacity="0.75"
            />
          </g>

          {/* Floating Connecting Lines Group 1 (Left to Center) */}
          <g className="constellation-lines-1 will-change-transform">
            {/* Center to Expo '98 */}
            <path
              d="M 618 520 Q 320 280 140 180"
              stroke="#deb89f"
              strokeWidth="1.3"
            />
            {/* Center to Deltanic / Sugar packets */}
            <path
              d="M 618 520 Q 450 490 320 470"
              stroke="#deb89f"
              strokeWidth="1.4"
            />
            {/* Center to António Sala */}
            <path
              d="M 618 520 Q 300 640 130 710"
              stroke="#deb89f"
              strokeWidth="1.3"
            />
            {/* Center to Family */}
            <path
              d="M 618 520 Q 380 750 250 860"
              stroke="#deb89f"
              strokeWidth="1.2"
            />
          </g>

          {/* Floating Connecting Lines Group 2 (Right to Center) */}
          <g className="constellation-lines-2 will-change-transform">
            {/* Center to Roasting factory / Cup */}
            <path
              d="M 618 520 Q 880 260 1090 150"
              stroke="#deb89f"
              strokeWidth="1.3"
            />
            {/* Center to Foundation */}
            <path
              d="M 618 520 Q 790 470 910 460"
              stroke="#deb89f"
              strokeWidth="1.4"
            />
            {/* Center to Fernando Pessoa Calendar */}
            <path
              d="M 618 520 Q 920 590 1100 630"
              stroke="#deb89f"
              strokeWidth="1.3"
            />
            {/* Center to Spain 1986 */}
            <path
              d="M 618 520 Q 800 760 910 890"
              stroke="#deb89f"
              strokeWidth="1.2"
            />
          </g>
        </svg>

        {/* Centerpiece Photo: Toddler Rui Nabeiro with Chair in Campo Maior */}
        <div
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
          style={{
            top: "70%",
            left: "50%",
            width: "clamp(130px, 13vw, 200px)",
          }}
        >
          {/* Ambient gentle bobbing wrapper for centerpiece */}
          <div className="ambient-float will-change-transform">
            <div
              onClick={() =>
                setSelectedPhoto({
                  id: "rui-child",
                  title: "Rui Nabeiro in Campo Maior",
                  titlePt: "Rui Nabeiro na infância em Campo Maior",
                  tooltip: "Rui Nabeiro (Campo Maior)",
                  tooltipPt: "Rui Nabeiro (Campo Maior)",
                  image:
                    "https://cdn.sanity.io/images/pcdkofnf/production/306aed7832fb7bcdee6138ceb3d8bd6fb0fb723f-694x911.png",
                  aspect: "aspect-[694/911]",
                  position: { top: "54%", left: "42%", width: "clamp(120px, 14vw, 210px)" },
                  rotation: 0,
                  storyPt:
                    "A fotografia mais emblemática das origens da Delta: Rui Nabeiro ainda criança em Campo Maior, junto a uma cadeira. Aqui começou o sonho que transformaria a cafeicultura portuguesa.",
                  storyEn:
                    "The iconic childhood portrait of Rui Nabeiro in Campo Maior, standing next to a chair. The humble beginning of a vision that would touch millions.",
                })
              }
              className="cursor-pointer transition-transform duration-500 hover:scale-105 group"
            >
              <div className="p-1 sm:p-1.5 bg-creme-100 rounded-sm shadow-[0_20px_35px_rgba(0,0,0,0.6)] border border-creme-200/30">
                <div className="relative aspect-[694/911] w-full overflow-hidden">
                  <Image
                    src="https://cdn.sanity.io/images/pcdkofnf/production/306aed7832fb7bcdee6138ceb3d8bd6fb0fb723f-694x911.png"
                    alt="Rui Nabeiro childhood in Campo Maior"
                    fill
                    sizes="220px"
                    className="object-cover filter sepia-[0.35] contrast-[1.05]"
                    unoptimized
                  />
                </div>
              </div>
              {/* Caption */}
              <div className="text-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] uppercase tracking-widest text-delta-yellow font-bold">
                  Campo Maior
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Orbiting Historical Polaroid Cards with Expressive Floating */}
        {memoryPhotos.map((photo) => {
          const isHovered = hoveredCard === photo.id;

          return (
            <div
              key={photo.id}
              className="floating-card-anchor absolute z-20"
              style={{
                top: photo.position.top,
                left: photo.position.left,
                right: photo.position.right,
                width: photo.position.width,
              }}
            >
              {/* Ambient Floating Wrapper (Continuous GSAP Levitation) */}
              <div className="ambient-float will-change-transform">
                {/* Interactive Card with Hover Transition */}
                <div
                  onClick={() => setSelectedPhoto(photo)}
                  onMouseEnter={() => setHoveredCard(photo.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="cursor-pointer transition-all duration-400 ease-[cubic-bezier(0.19,1,0.22,1)]"
                  style={{
                    transform: `rotate(${photo.rotation}deg) ${
                      isHovered ? "scale(1.10) translateY(-8px)" : "scale(1)"
                    }`,
                  }}
                >
                  {/* Tooltip Pill */}
                  <div
                    className={`absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-full bg-oak-950/95 border border-creme-200/20 text-[10px] sm:text-[11px] font-sans font-medium text-creme-100 shadow-xl pointer-events-none transition-all duration-200 ${
                      isHovered
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-1.5"
                    }`}
                  >
                    <span>{currentLang === "pt" ? photo.tooltipPt : photo.tooltip}</span>
                  </div>

                  {/* Polaroid White Card Frame */}
                  <div className="p-1 sm:p-2 bg-creme-100/95 rounded-lg shadow-[0_12px_24px_rgba(0,0,0,0.5)] hover:shadow-[0_24px_45px_rgba(0,0,0,0.7)] transition-shadow">
                    <div className={`relative w-full ${photo.aspect} overflow-hidden rounded-[4px]`}>
                      <Image
                        src={photo.image}
                        alt={photo.title}
                        fill
                        sizes="200px"
                        className="object-cover filter contrast-[1.05]"
                        unoptimized
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* 1986 Spain Flag Badge with Floating Wrapper */}
        <div
          className="floating-card-anchor absolute z-20"
          style={{ top: "91%", right: "23%" }}
        >
          <div className="ambient-float will-change-transform">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-oak-950/90 border border-creme-200/15 shadow-md cursor-pointer hover:scale-105 transition-transform">
              <span className="text-sm">🇪🇸</span>
              <span className="text-[10px] font-mono text-delta-yellow font-bold">1986</span>
              <span className="text-[10px] font-sans text-creme-200/80">
                {currentLang === "pt" ? "Início da atividade em Espanha" : "Start of activity in Spain"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal for Selected History Photo */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative w-full max-w-lg bg-oak-900 border border-creme-200/20 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-oak-800 text-creme-200 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-creme-200/10 mb-6 bg-creme-100/10 flex items-center justify-center p-2">
              <div className="relative w-full h-full">
                <Image
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-delta-yellow font-bold mb-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>{selectedPhoto.year || "Histórico"}</span>
            </div>

            <h3 className="font-serif text-2xl text-creme-50 mb-3">
              {currentLang === "pt" ? selectedPhoto.titlePt : selectedPhoto.title}
            </h3>

            <p className="text-sm text-creme-200/90 font-sans leading-relaxed">
              {currentLang === "pt" ? selectedPhoto.storyPt : selectedPhoto.storyEn}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
