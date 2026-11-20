"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Sparkles, RotateCcw, X, Check, Award } from "lucide-react";
import confetti from "canvas-confetti";

interface DeltaQuizProps {
  currentLang: "pt" | "en";
}

// 12 Authentic Packs for Wave 1
const wave1Packs = [
  { name: "Colombia", src: "/imgs/packs/colombia.png" },
  { name: "Vietnam", src: "/imgs/packs/vietnam.png" },
  { name: "Lote Chávena", src: "/imgs/packs/chavena.png" },
  { name: "Roast Portugal", src: "/imgs/packs/portugal.png" },
  { name: "Timor", src: "/imgs/packs/timor.png" },
  { name: "Cuba", src: "/imgs/packs/cuba.png" },
  { name: "Brazil", src: "/imgs/packs/brazil.png" },
  { name: "Angola", src: "/imgs/packs/angola.png" },
  { name: "Ethiopia", src: "/imgs/packs/ethiopia.png" },
  { name: "Bio", src: "/imgs/packs/bio.png" },
  { name: "Colombia", src: "/imgs/packs/colombia.png" },
  { name: "Lote Chávena", src: "/imgs/packs/chavena.png" },
];

// 12 Authentic Packs for Wave 2 (offset in phase by 50% for continuous 2-column loop)
const wave2Packs = [
  { name: "Roast Portugal", src: "/imgs/packs/portugal.png" },
  { name: "Brazil", src: "/imgs/packs/brazil.png" },
  { name: "Colombia", src: "/imgs/packs/colombia.png" },
  { name: "Timor", src: "/imgs/packs/timor.png" },
  { name: "Lote Chávena", src: "/imgs/packs/chavena.png" },
  { name: "Angola", src: "/imgs/packs/angola.png" },
  { name: "Bio", src: "/imgs/packs/bio.png" },
  { name: "Cuba", src: "/imgs/packs/cuba.png" },
  { name: "Vietnam", src: "/imgs/packs/vietnam.png" },
  { name: "Ethiopia", src: "/imgs/packs/ethiopia.png" },
  { name: "Roast Portugal", src: "/imgs/packs/portugal.png" },
  { name: "Brazil", src: "/imgs/packs/brazil.png" },
];

interface QuestionData {
  questionPt: string;
  questionEn: string;
  options: {
    textPt: string;
    textEn: string;
    profile: "intense" | "heritage" | "aromatic" | "bio";
  }[];
}

const questions: QuestionData[] = [
  {
    questionPt: "Como começa o seu ritual de café pela manhã?",
    questionEn: "How do you start your morning coffee ritual?",
    options: [
      {
        textPt: "Um espresso curto, denso e vigoroso para despertar com intensidade total.",
        textEn: "A short, dense, and vigorous espresso shot to wake up with total energy.",
        profile: "intense",
      },
      {
        textPt: "Uma chávena aveludada, equilibrada e com o aroma clássico da bica portuguesa.",
        textEn: "A velvety, balanced cup with the classic aroma of the Portuguese bica.",
        profile: "heritage",
      },
      {
        textPt: "Um café aromático saboreado com calma, com notas florais e frutadas.",
        textEn: "An aromatic coffee savored at a relaxed pace, with floral and fruity notes.",
        profile: "aromatic",
      },
      {
        textPt: "Um café biológico limpo e consciente, cultivado em harmonia com a natureza.",
        textEn: "A clean and mindful organic coffee, grown in harmony with nature.",
        profile: "bio",
      },
    ],
  },
  {
    questionPt: "Que notas de sabor mais despertam os seus sentidos?",
    questionEn: "Which sensory taste notes most awaken your senses?",
    options: [
      {
        textPt: "Cacau negro amargo, tosta intensa e madeiras aromáticas nobres.",
        textEn: "Dark bitter cocoa, intense roastiness, and noble aromatic woods.",
        profile: "intense",
      },
      {
        textPt: "Avelãs tostadas, caramelo dourado e creme denso de cor avelã.",
        textEn: "Toasted hazelnuts, golden caramel, and dense hazelnut crema.",
        profile: "heritage",
      },
      {
        textPt: "Frutos silvestres, jasmim suave e acidez cítrica viva e elegante.",
        textEn: "Wild berries, gentle jasmine, and vibrant, elegant citrus acidity.",
        profile: "aromatic",
      },
      {
        textPt: "Cereais tostados frescos, mel silvestre e pureza natural sustentável.",
        textEn: "Fresh toasted cereals, wild honey, and sustainable natural purity.",
        profile: "bio",
      },
    ],
  },
  {
    questionPt: "Qual é o seu método favorito de preparação?",
    questionEn: "What is your preferred brewing method?",
    options: [
      {
        textPt: "Máquina de espresso clássica com pressão calibrada a 9 bar.",
        textEn: "Classic espresso machine with pressure calibrated at 9 bars.",
        profile: "intense",
      },
      {
        textPt: "Chávena Delta de porcelana aquecida no balcão do café.",
        textEn: "Pre-warmed Delta porcelain cup right at the neighborhood café counter.",
        profile: "heritage",
      },
      {
        textPt: "Filtro manual, Chemex ou prensa francesa para extrair aromas sutis.",
        textEn: "Pour-over filter, Chemex, or French press to unlock subtle aromas.",
        profile: "aromatic",
      },
      {
        textPt: "Cafeteira italiana moka ou extração ecológica em grão moído na hora.",
        textEn: "Moka stovetop pot or freshly ground eco-conscious beans.",
        profile: "bio",
      },
    ],
  },
  {
    questionPt: "O que é que mais valoriza na experiência do café?",
    questionEn: "What do you value most in your coffee experience?",
    options: [
      {
        textPt: "A energia revigorante e a densidade marcante do primeiro gole.",
        textEn: "The invigorating energy and striking density of the first sip.",
        profile: "intense",
      },
      {
        textPt: "A partilha e o calor humano à mesa com família e amigos.",
        textEn: "Sharing and human warmth around the table with family and friends.",
        profile: "heritage",
      },
      {
        textPt: "A descoberta sensorial das origens e terroirs exóticos do mundo.",
        textEn: "The sensory discovery of distant origins and exotic terroirs.",
        profile: "aromatic",
      },
      {
        textPt: "A rastreabilidade ética, cultivo sustentável e respeito pelo planeta.",
        textEn: "Ethical traceability, sustainable agriculture, and care for the planet.",
        profile: "bio",
      },
    ],
  },
];

interface QuizResult {
  titlePt: string;
  titleEn: string;
  namePt: string;
  nameEn: string;
  descPt: string;
  descEn: string;
  notesPt: string;
  notesEn: string;
  intensity: number;
  pack: string;
  tagPt: string;
  tagEn: string;
}

const resultsData: Record<"intense" | "heritage" | "aromatic" | "bio", QuizResult> = {
  intense: {
    titlePt: "Perfil Intenso & Vigoroso",
    titleEn: "Intense & Vigorous Profile",
    namePt: "Delta Origens Angola",
    nameEn: "Delta Origins Angola",
    descPt:
      "A força bruta do Robusta africano de altitude. Um café encorpado, cremoso, com notas pronunciadas de cacau negro e madeira nobre tostada.",
    descEn:
      "The raw power of high-altitude African Robusta. Full-bodied, densely creamy, with pronounced notes of dark cocoa and noble toasted wood.",
    notesPt: "Cacau Negro • Pimenta Suave • Madeiras Nobres",
    notesEn: "Dark Cocoa • Mild Pepper • Noble Woods",
    intensity: 10,
    pack: "/imgs/packs/angola.png",
    tagPt: "Intensidade Máxima",
    tagEn: "Maximum Intensity",
  },
  heritage: {
    titlePt: "Perfil Clássico Português",
    titleEn: "Classic Portuguese Heritage",
    namePt: "Delta Lote Chávena",
    nameEn: "Delta Lote Chávena",
    descPt:
      "A alma da bica portuguesa desde 1961. Um equilíbrio milimétrico entre Arabicas e Robustas que produz um creme espesso cor de avelã e final persistente.",
    descEn:
      "The soul of the Portuguese espresso since 1961. A master blend of Arabica and Robusta yielding a thick hazelnut crema and lingering finish.",
    notesPt: "Avelã Tostada • Caramelo Dourado • Creme Aveludado",
    notesEn: "Toasted Hazelnut • Golden Caramel • Velvety Crema",
    intensity: 9,
    pack: "/imgs/packs/chavena.png",
    tagPt: "Ícone de Tradição",
    tagEn: "Heritage Icon",
  },
  aromatic: {
    titlePt: "Perfil Aromático & Floral",
    titleEn: "Aromatic & Floral Terroir",
    namePt: "Delta Origens Colombia",
    nameEn: "Delta Origins Colombia",
    descPt:
      "Colheita de alta montanha nos Andes colombianos. 100% Arabica lavado, delicado e luminoso, com vibrante acidez cítrica e notas doces de frutas vermelhas.",
    descEn:
      "High-mountain harvest in the Colombian Andes. 100% washed Arabica, delicate and bright, with vibrant citrus acidity and sweet red fruit notes.",
    notesPt: "Frutos Vermelhos • Flor de Laranjeira • Acidez Cítrica",
    notesEn: "Red Berries • Orange Blossom • Vibrant Citrus",
    intensity: 7,
    pack: "/imgs/packs/colombia.png",
    tagPt: "Sensorial Refinado",
    tagEn: "Sensory Refinement",
  },
  bio: {
    titlePt: "Perfil Biológico & Sustentável",
    titleEn: "Organic & Sustainable Balance",
    namePt: "Delta Bio Organic",
    nameEn: "Delta Bio Organic",
    descPt:
      "Grãos 100% biológicos certificados, cultivados sem fertilizantes químicos nem pesticidas. Um café puro, equilibrado, aromático e com pegada neutra.",
    descEn:
      "100% certified organic beans grown without chemical fertilizers or pesticides. A pure, balanced, aromatic cup with an eco-conscious footprint.",
    notesPt: "Cereais Tostados • Mel Silvestre • Pureza Natural",
    notesEn: "Toasted Cereals • Wild Honey • Natural Purity",
    intensity: 8,
    pack: "/imgs/packs/bio.png",
    tagPt: "100% Biológico",
    tagEn: "100% Organic",
  },
};

export const DeltaQuiz: React.FC<DeltaQuizProps> = ({ currentLang }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wave1Refs = useRef<(HTMLDivElement | null)[]>([]);
  const wave2Refs = useRef<(HTMLDivElement | null)[]>([]);

  // Interactive Quiz State
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<("intense" | "heritage" | "aromatic" | "bio")[]>([]);
  const [resultKey, setResultKey] = useState<"intense" | "heritage" | "aromatic" | "bio" | null>(null);

  // 60/120 FPS HIGH-PERFORMANCE CONTINUOUS OUTWARD LOOP (AUTONOMOUS VIDEO/GIF STYLE)
  // Perfectly calibrated elliptical orbit where packs continuously move outward away from center,
  // forming 2 distinct columns on left and right, leaving center 100% unobstructed,
  // and smoothly fading out into transparency as they pass the outer boundary.
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();
    let accumulatedTime = 0;
    const cycleDuration = 8.5; // 8.5 seconds per wave expansion cycle

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      accumulatedTime += dt;
      const time = accumulatedTime;

      const container = containerRef.current;
      if (!container) return;

      const W = container.clientWidth;
      const H = container.clientHeight;
      const cx = W / 2;
      const cy = H / 2;

      // Calibrated Elliptical radii:
      // Rx is wide horizontally: keeps packs far out on sides (2 columns), leaving center completely open!
      // Ry is compact vertically: keeps packs inside the screen without clipping!
      let Rx = W * 0.38;
      let Ry = H * 0.36;

      if (W >= 1440) {
        Rx = Math.min(W * 0.38, 720);
        Ry = Math.min(H * 0.36, 360);
      } else if (W >= 1024) {
        Rx = Math.min(W * 0.37, 560);
        Ry = Math.min(H * 0.35, 300);
      } else if (W >= 640) {
        Rx = Math.min(W * 0.35, 420);
        Ry = Math.min(H * 0.33, 250);
      } else {
        Rx = W * 0.35;
        Ry = H * 0.32;
      }

      // Slow celestial rotation (140s per full 360 revolution)
      const systemAngle = (time * (360 / 140)) % 360;

      // Two waves offset by 50% in phase:
      // Wave 1 starts at inner ring, Wave 2 starts at outer ring.
      // There are ALWAYS 2 distinct concentric columns visible at any second!
      const waves = [
        { refs: wave1Refs.current, offset: 0.0 },
        { refs: wave2Refs.current, offset: 0.5 },
      ];

      waves.forEach(({ refs, offset }) => {
        // p in [0, 1)
        const p = ((time / cycleDuration) + offset) % 1;

        // Radial expansion factor:
        // At p=0 (inner column): r = 0.80
        // At p=0.50 (outer column): r = 1.12
        // At p=1.0 (far exit): r = 1.45
        const r = 0.80 + 0.65 * p;

        // Scale factor: packs grow as they travel outward from inner to outer
        const scale = 0.85 + 0.35 * p;

        // Opacity:
        // Smooth fade-in as it appears at the inner column (p from 0 to 0.08)
        // Solid opacity 1.0 throughout inner column and transition to outer column (p from 0.08 to 0.50)
        // Smooth fade-out as it moves past outer column towards screen edges (p from 0.50 to 1.0)
        let opacity = 1.0;
        if (p < 0.08) {
          opacity = p / 0.08;
        } else if (p > 0.50) {
          opacity = Math.max(0, 1.0 - (p - 0.50) / 0.45);
        }

        // Natural spiral curve (-20deg outward) matching the real Delta Cafés video
        const spiralAngle = -20 * p;

        refs.forEach((el, idx) => {
          if (!el) return;
          const baseAngle = idx * (360 / refs.length);
          const totalAngle = (baseAngle + systemAngle + spiralAngle) * (Math.PI / 180);

          const x = cx + Rx * r * Math.cos(totalAngle);
          const y = cy + Ry * r * Math.sin(totalAngle);

          el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`;
          el.style.opacity = `${opacity}`;
        });
      });

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleSelectOption = (profile: "intense" | "heritage" | "aromatic" | "bio") => {
    const nextAnswers = [...answers, profile];
    setAnswers(nextAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Calculate profile counts
      const counts: Record<string, number> = {};
      nextAnswers.forEach((p) => {
        counts[p] = (counts[p] || 0) + 1;
      });
      let highest: "intense" | "heritage" | "aromatic" | "bio" = "heritage";
      let maxCount = 0;
      Object.entries(counts).forEach(([k, count]) => {
        if (count > maxCount) {
          maxCount = count;
          highest = k as "intense" | "heritage" | "aromatic" | "bio";
        }
      });
      setResultKey(highest);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#E31837", "#FFB81C", "#FAF5EE", "#35221A"],
        });
      } catch {
        // Fallback gracefully
      }
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setResultKey(null);
  };

  const currentQ = questions[currentStep];
  const activeResult = resultKey ? resultsData[resultKey] : null;

  return (
    <section
      id="quiz"
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#F4E4D2] text-[#35221A] min-h-[95vh] sm:min-h-screen flex items-center justify-center py-20 sm:py-28"
      style={{
        backgroundImage: "url(/imgs/product/product-bg-tile.png)",
        backgroundRepeat: "repeat",
        backgroundSize: "320px",
      }}
    >
      {/* CONTINUOUS 2-COLUMN RADIAL LOOPING SYSTEM (VIDEO/GIF STYLE) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* WAVE 1 PACKS */}
        {wave1Packs.map((pack, idx) => (
          <div
            key={`wave1-${idx}`}
            ref={(el) => {
              wave1Refs.current[idx] = el;
            }}
            className="absolute top-0 left-0 pointer-events-none will-change-transform"
            style={{
              transform: "translate3d(-9999px, -9999px, 0)",
              opacity: 0,
            }}
          >
            <div className="relative w-28 h-40 sm:w-36 sm:h-48 md:w-40 md:h-52 lg:w-44 lg:h-60 drop-shadow-2xl">
              <Image
                src={pack.src}
                alt={pack.name}
                fill
                sizes="(max-width: 640px) 120px, (max-width: 1024px) 160px, 200px"
                className="object-contain filter brightness-95"
                unoptimized
              />
            </div>
          </div>
        ))}

        {/* WAVE 2 PACKS */}
        {wave2Packs.map((pack, idx) => (
          <div
            key={`wave2-${idx}`}
            ref={(el) => {
              wave2Refs.current[idx] = el;
            }}
            className="absolute top-0 left-0 pointer-events-none will-change-transform"
            style={{
              transform: "translate3d(-9999px, -9999px, 0)",
              opacity: 0,
            }}
          >
            <div className="relative w-28 h-40 sm:w-36 sm:h-48 md:w-40 md:h-52 lg:w-44 lg:h-60 drop-shadow-2xl">
              <Image
                src={pack.src}
                alt={pack.name}
                fill
                sizes="(max-width: 640px) 120px, (max-width: 1024px) 160px, 200px"
                className="object-contain filter brightness-95"
                unoptimized
              />
            </div>
          </div>
        ))}
      </div>

      {/* Center Hero Content (Completely Clear and Unobstructed) */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center flex flex-col items-center justify-center">
        {/* Eyebrow Subtitle */}
        <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-[#35221A]/70 mb-3 block">
          Delta Quiz
        </span>

        {/* Grand Headline */}
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#35221A] leading-[1.08] font-normal tracking-tight">
          {currentLang === "pt"
            ? "Vem descobrir o teu perfil de café"
            : "Discover your coffee profile"}
        </h2>

        {/* Descriptive Text */}
        <p className="mt-5 text-sm sm:text-base md:text-lg text-[#35221A]/80 leading-relaxed font-sans max-w-md mx-auto">
          {currentLang === "pt"
            ? "Da intensidade ao equilíbrio, vem conhecer as características do sabor que mais combina com o teu paladar."
            : "From dark intensity to balanced harmony, discover the sensory character that best complements your unique palate."}
        </p>

        {/* CTA Button: Iniciar Quiz */}
        <div className="mt-8">
          <button
            onClick={() => {
              handleReset();
              setIsQuizOpen(true);
            }}
            id="start-button"
            aria-label="Iniciar Quiz Delta"
            className="group inline-flex items-center gap-3.5 bg-white/95 hover:bg-white text-[#35221A] px-7 py-3 sm:px-8 sm:py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-[#35221A]/10 active:scale-95"
          >
            <span className="text-sm sm:text-base font-semibold tracking-wide">
              {currentLang === "pt" ? "Iniciar Quiz" : "Start Quiz"}
            </span>
            <span className="w-8 h-8 rounded-full bg-delta-yellow text-[#35221A] flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 shadow-sm">
              <ArrowRight className="w-4 h-4" />
            </span>
          </button>
        </div>
      </div>

      {/* Interactive Quiz Modal */}
      {isQuizOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-fadeIn">
          <div
            className="relative w-full max-w-2xl bg-[#FAF5EE] rounded-3xl p-6 sm:p-10 shadow-2xl border border-[#35221A]/15 text-[#35221A] overflow-hidden"
            style={{
              backgroundImage: "url(/imgs/product/product-bg-tile.png)",
              backgroundRepeat: "repeat",
              backgroundSize: "320px",
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsQuizOpen(false)}
              className="absolute top-5 right-5 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#35221A] flex items-center justify-center shadow-sm transition-transform hover:scale-105"
              aria-label="Fechar Quiz"
            >
              <X className="w-4 h-4" />
            </button>

            {!activeResult ? (
              /* Quiz Questions State */
              <div className="space-y-8">
                {/* Step & Progress Bar */}
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#35221A]/70 mb-3">
                    <span className="flex items-center gap-1.5 text-delta-red font-bold">
                      <Sparkles className="w-3.5 h-3.5" />
                      {currentLang === "pt" ? "Delta Quiz" : "Delta Coffee Quiz"}
                    </span>
                    <span>
                      {currentLang === "pt"
                        ? `Pergunta ${currentStep + 1} de ${questions.length}`
                        : `Question ${currentStep + 1} of ${questions.length}`}
                    </span>
                  </div>

                  {/* Progress Bar Track */}
                  <div className="w-full h-1.5 bg-[#35221A]/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-delta-red transition-all duration-500 rounded-full"
                      style={{
                        width: `${((currentStep + 1) / questions.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Question Title */}
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#35221A] leading-snug">
                    {currentLang === "pt" ? currentQ.questionPt : currentQ.questionEn}
                  </h3>
                </div>

                {/* Options List */}
                <div className="space-y-3">
                  {currentQ.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelectOption(opt.profile)}
                      className="w-full text-left p-4 sm:p-5 rounded-2xl bg-white/80 hover:bg-white border border-[#35221A]/10 hover:border-delta-red/40 shadow-sm hover:shadow-md transition-all duration-200 group flex items-start gap-4 active:scale-[0.99]"
                    >
                      <span className="w-6 h-6 rounded-full border border-[#35221A]/20 flex items-center justify-center text-xs font-bold text-[#35221A]/60 group-hover:bg-delta-red group-hover:text-white group-hover:border-delta-red transition-colors shrink-0 mt-0.5">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="text-sm sm:text-base text-[#35221A]/90 font-medium leading-relaxed">
                        {currentLang === "pt" ? opt.textPt : opt.textEn}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Quiz Result State */
              <div className="space-y-6 text-center animate-fadeIn">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-delta-yellow/30 border border-delta-yellow/60 text-[#35221A] text-xs font-bold uppercase tracking-wider">
                  <Award className="w-4 h-4 text-delta-darkRed" />
                  <span>{currentLang === "pt" ? activeResult.tagPt : activeResult.tagEn}</span>
                </div>

                <div className="relative w-36 h-48 sm:w-44 sm:h-56 mx-auto my-2 drop-shadow-2xl">
                  <Image
                    src={activeResult.pack}
                    alt={activeResult.namePt}
                    fill
                    sizes="200px"
                    className="object-contain"
                    unoptimized
                  />
                </div>

                <div>
                  <h3 className="font-serif text-3xl sm:text-4xl text-[#35221A] mb-2">
                    {currentLang === "pt" ? activeResult.namePt : activeResult.nameEn}
                  </h3>
                  <div className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#35221A]/70 mb-3">
                    <span>{currentLang === "pt" ? "Intensidade" : "Intensity"}</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#35221A] text-white">
                      {activeResult.intensity}/10
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-[#35221A]/85 max-w-lg mx-auto leading-relaxed">
                    {currentLang === "pt" ? activeResult.descPt : activeResult.descEn}
                  </p>
                </div>

                <div className="p-3.5 bg-white/70 rounded-2xl border border-[#35221A]/10 max-w-md mx-auto text-xs text-[#35221A]/80 font-medium">
                  <span className="font-bold text-[#35221A] block mb-0.5">
                    {currentLang === "pt" ? "Notas Aromáticas" : "Aromatic Notes"}
                  </span>
                  {currentLang === "pt" ? activeResult.notesPt : activeResult.notesEn}
                </div>

                <div className="flex items-center justify-center gap-3 pt-3">
                  <button
                    onClick={handleReset}
                    className="px-5 py-2.5 rounded-full bg-white/80 hover:bg-white text-[#35221A] text-xs sm:text-sm font-semibold tracking-wide border border-[#35221A]/15 inline-flex items-center gap-2 transition-all shadow-sm"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{currentLang === "pt" ? "Refazer Quiz" : "Retake Quiz"}</span>
                  </button>

                  <button
                    onClick={() => setIsQuizOpen(false)}
                    className="px-6 py-2.5 rounded-full bg-delta-red hover:bg-delta-darkRed text-white text-xs sm:text-sm font-bold uppercase tracking-wider inline-flex items-center gap-2 transition-all shadow-md"
                  >
                    <span>{currentLang === "pt" ? "Concluir" : "Complete"}</span>
                    <Check className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
