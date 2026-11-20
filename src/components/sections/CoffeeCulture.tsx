"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { ArrowRight, X, MapPin, Sparkles, BookOpen, Users } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CoffeeCultureProps {
  currentLang: "pt" | "en";
}

export const CoffeeCulture: React.FC<CoffeeCultureProps> = ({ currentLang }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedCulture, setSelectedCulture] = useState<"ccc" | "barista" | null>(null);

  useGSAP(
    () => {
      // Reveal animations for left title, vertical card, and right rows
      gsap.fromTo(
        ".culture-headline",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".culture-vertical-card",
        { opacity: 0, scale: 0.95, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        ".culture-row-item",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.25,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="coffee-culture"
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#F4E4D2] text-[#35221A]"
      style={{
        backgroundImage: "url(/imgs/product/product-bg-tile.png)",
        backgroundRepeat: "repeat",
        backgroundSize: "320px",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          {/* Left Column: Title, Vertical Card, and Manifesto Paragraph */}
          <div className="lg:col-span-5 flex flex-col justify-between culture-headline">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-delta-red block mb-2">
                {currentLang === "pt" ? "Património & Tradição" : "Heritage & Craft"}
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#35221A] leading-[1.08] font-normal tracking-tight">
                {currentLang === "pt" ? "A Cultura do Café" : "The Culture of Coffee"}
              </h2>
            </div>

            {/* Vertical Image/Card filling the middle space */}
            <div className="culture-vertical-card my-6 lg:my-8 group relative w-full h-72 sm:h-80 md:h-96 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-[#35221A]/10 bg-[#e8d7c4]">
              <Image
                src="/imgs/culture/culture-vertical.jpg"
                alt="Cultura do Café Delta - Grãos e Mestria"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105 filter brightness-95"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#231B16]/85 via-[#231B16]/20 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300" />

              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-delta-yellow block mb-1">
                    {currentLang === "pt" ? "Tradição Viva • Desde 1961" : "Living Heritage • Since 1961"}
                  </span>
                  <p className="text-sm font-serif italic text-white/95 leading-snug">
                    {currentLang === "pt"
                      ? "A paixão pela torra lenta e a arte do expresso perfeito."
                      : "The passion for artisanal roasting and the art of the perfect cup."}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 group-hover:bg-delta-red transition-colors shadow-sm">
                  <Sparkles className="w-4 h-4 text-delta-yellow" />
                </div>
              </div>
            </div>

            {/* Narrative Paragraph at Bottom */}
            <div>
              <p className="text-[#35221A]/85 text-base sm:text-lg leading-relaxed font-sans max-w-md">
                {currentLang === "pt"
                  ? "Os rituais, hábitos e arte do café constituem um património vivo que faz parte do dia a dia de milhões e milhões de pessoas. No Centro de Ciência do Café e na Academia Barista celebramos, divulgamos e interpretamos esta cultura. Partilhando ciência, emoção e a arte da preparação, olhamos pelo futuro da tradição que nos é mais querida."
                  : "The rituals, habits, and art of coffee constitute a living heritage that is part of the daily life of millions and millions of people. At the Coffee Science Centre and Barista Academy, we celebrate, share, and interpret this culture. Combining science, emotion, and the craft of preparation, we safeguard the future of our most cherished tradition."}
              </p>
            </div>
          </div>

          {/* Right Column: Stacked Rows */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-10 sm:gap-12">
            {/* Row 1: Centro de Ciência do Café */}
            <div className="culture-row-item grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start">
              {/* Title & Button */}
              <div className="md:col-span-5 flex flex-col justify-between h-full pt-1">
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#35221A] font-normal leading-tight">
                    {currentLang === "pt" ? "Centro de Ciência do Café" : "Coffee Science Centre"}
                  </h3>
                </div>

                <div className="mt-6 md:mt-10">
                  <button
                    onClick={() => setSelectedCulture("ccc")}
                    aria-label="Explorar Centro de Ciência do Café"
                    className="group inline-flex items-center gap-3 bg-white/80 hover:bg-white text-[#35221A] px-5 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all duration-300 border border-[#35221A]/10 active:scale-95"
                  >
                    <span className="text-xs sm:text-sm font-semibold tracking-wide">
                      {currentLang === "pt" ? "Explorar" : "Explore"}
                    </span>
                    <span className="w-7 h-7 rounded-full bg-[#35221A] text-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 shadow-sm">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </button>
                </div>
              </div>

              {/* Image & Description */}
              <div className="md:col-span-7 flex flex-col gap-4">
                <div
                  onClick={() => setSelectedCulture("ccc")}
                  className="relative w-full h-52 sm:h-60 rounded-lg overflow-hidden shadow-sm cursor-pointer group bg-[#e8d7c4]"
                >
                  <Image
                    src="/imgs/culture/ccc.jpg"
                    alt="Centro de Ciência do Café"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-[#35221A]/5 group-hover:bg-transparent transition-colors duration-300" />
                </div>
                <p className="text-[#35221A]/80 text-sm sm:text-base leading-relaxed font-sans">
                  {currentLang === "pt"
                    ? "Neste espaço imersivo, o universo do café está à descoberta através de experiências, equipamentos interativos e exposições. Aqui respondem-se a curiosidades, exploram-se histórias e ilumina-se o património cultural e científico português na área do café."
                    : "In this immersive space, the coffee universe is ready to be discovered through interactive experiences, exhibits, and living greenhouse environments. Here, curiosities are uncovered, stories are explored, and Portuguese scientific and cultural coffee heritage is brought to life."}
                </p>
              </div>
            </div>

            {/* Subtle separator line */}
            <div className="w-full h-px bg-[#35221A]/15" />

            {/* Row 2: Academia Barista */}
            <div className="culture-row-item grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start">
              {/* Title & Button */}
              <div className="md:col-span-5 flex flex-col justify-between h-full pt-1">
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#35221A] font-normal leading-tight">
                    {currentLang === "pt" ? "Academia Barista" : "Barista Academy"}
                  </h3>
                </div>

                <div className="mt-6 md:mt-10">
                  <button
                    onClick={() => setSelectedCulture("barista")}
                    aria-label="Explorar Academia Barista"
                    className="group inline-flex items-center gap-3 bg-white/80 hover:bg-white text-[#35221A] px-5 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all duration-300 border border-[#35221A]/10 active:scale-95"
                  >
                    <span className="text-xs sm:text-sm font-semibold tracking-wide">
                      {currentLang === "pt" ? "Explorar" : "Explore"}
                    </span>
                    <span className="w-7 h-7 rounded-full bg-[#35221A] text-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 shadow-sm">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </button>
                </div>
              </div>

              {/* Image & Description */}
              <div className="md:col-span-7 flex flex-col gap-4">
                <div
                  onClick={() => setSelectedCulture("barista")}
                  className="relative w-full h-52 sm:h-60 rounded-lg overflow-hidden shadow-sm cursor-pointer group bg-[#e8d7c4]"
                >
                  <Image
                    src="/imgs/culture/barista.jpg"
                    alt="Academia Barista CCC"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-[#35221A]/5 group-hover:bg-transparent transition-colors duration-300" />
                </div>
                <p className="text-[#35221A]/80 text-sm sm:text-base leading-relaxed font-sans">
                  {currentLang === "pt"
                    ? "Na Academia Barista partilhamos a arte e a paixão pelo café, com um foco muito especial na formação. A nossa equipa de especialistas parte do expresso para mostrar a vanguarda da criatividade e saber — bem como os resultados surpreendentes que resultam da inovação técnica."
                    : "At the Barista Academy, we share the art and passion for coffee, with a dedicated focus on master education. Our team of specialists builds from espresso to showcase the forefront of creativity, science, and the surprising sensory outcomes unlocked by technical innovation."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Detail Modal on Click "Explorar" */}
      {selectedCulture && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-fadeIn">
          <div
            className="relative w-full max-w-3xl bg-[#FAF5EE] rounded-3xl overflow-hidden shadow-2xl border border-[#35221A]/15 text-[#35221A]"
            style={{
              backgroundImage: "url(/imgs/product/product-bg-tile.png)",
              backgroundRepeat: "repeat",
              backgroundSize: "320px",
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedCulture(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#35221A] flex items-center justify-center shadow-md transition-transform hover:scale-105"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Header */}
            <div className="relative w-full h-64 sm:h-72">
              <Image
                src={selectedCulture === "ccc" ? "/imgs/culture/ccc.jpg" : "/imgs/culture/barista.jpg"}
                alt={selectedCulture === "ccc" ? "Centro de Ciência do Café" : "Academia Barista"}
                fill
                sizes="100vw"
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FAF5EE] via-transparent to-black/30" />
              <div className="absolute bottom-4 left-6 flex items-center gap-2 px-3 py-1 bg-white/90 rounded-full text-xs font-semibold uppercase tracking-wider text-[#35221A] shadow-sm">
                <MapPin className="w-3.5 h-3.5 text-delta-red" />
                <span>{selectedCulture === "ccc" ? "Campo Maior, Alentejo" : "Lisboa & Porto, Portugal"}</span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-delta-red block mb-1">
                  {selectedCulture === "ccc"
                    ? currentLang === "pt"
                      ? "Museu & Ciência Imersiva"
                      : "Interactive Science & Museum"
                    : currentLang === "pt"
                    ? "Formação & Mestria Barista"
                    : "Master Barista Training"}
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-[#35221A]">
                  {selectedCulture === "ccc"
                    ? currentLang === "pt"
                      ? "Centro de Ciência do Café"
                      : "Coffee Science Centre"
                    : currentLang === "pt"
                    ? "Academia Barista Delta"
                    : "Delta Barista Academy"}
                </h3>
              </div>

              <p className="text-[#35221A]/85 text-sm sm:text-base leading-relaxed">
                {selectedCulture === "ccc"
                  ? currentLang === "pt"
                    ? "Inaugurado pelo Comendador Rui Nabeiro em Campo Maior, o Centro de Ciência do Café é um equipamento cultural e científico único na Península Ibérica. Integra estufas botânicas vivas com espécies Arábica e Robusta de todo o globo, áreas de degustação sensorial e uma viagem interativa pela botânica, torra e química do café."
                    : "Inaugurated by Commander Rui Nabeiro in Campo Maior, the Coffee Science Centre is a premier cultural and scientific institution. It features living botanical greenhouses with Coffea Arabica and Canephora plants from across the globe, sensory testing labs, and an interactive journey through coffee chemistry, history, and craftsmanship."
                  : currentLang === "pt"
                  ? "A Academia Barista é o polo de excelência onde a equipa Delta forma profissionais e amantes do café. Desde a extração calibrada do expresso até à criação de texturas aveludadas de leite e latte art, aqui a ciência e a estética unem-se para transformar cada chávena numa obra de arte."
                  : "The Barista Academy is the centre of excellence where the Delta team trains both coffee professionals and enthusiastic home brewers. From precision espresso extraction to silky milk texturing and latte art, science and sensory aesthetics combine to make every cup an exquisite masterpiece."}
              </p>

              {/* Highlights Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-4 bg-white/70 rounded-2xl border border-[#35221A]/10 flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-delta-red">
                    <Sparkles className="w-4 h-4" />
                    <span>{selectedCulture === "ccc" ? "Estufa Viva" : "Latte Art"}</span>
                  </div>
                  <span className="text-xs text-[#35221A]/70">
                    {selectedCulture === "ccc"
                      ? "Plantas reais de múltiplos terroirs"
                      : "Técnicas de texturização e desenho"}
                  </span>
                </div>

                <div className="p-4 bg-white/70 rounded-2xl border border-[#35221A]/10 flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-delta-red">
                    <BookOpen className="w-4 h-4" />
                    <span>{selectedCulture === "ccc" ? "Laboratório" : "Certificação"}</span>
                  </div>
                  <span className="text-xs text-[#35221A]/70">
                    {selectedCulture === "ccc"
                      ? "Provas sensoriais guiadas"
                      : "Cursos certificados SCA & Delta"}
                  </span>
                </div>

                <div className="p-4 bg-white/70 rounded-2xl border border-[#35221A]/10 flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-delta-red">
                    <Users className="w-4 h-4" />
                    <span>{selectedCulture === "ccc" ? "Visitas Guiadas" : "Workshops"}</span>
                  </div>
                  <span className="text-xs text-[#35221A]/70">
                    {selectedCulture === "ccc"
                      ? "Para famílias, escolas e especialistas"
                      : "Turmas práticas com mestres baristas"}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedCulture(null)}
                  className="px-6 py-3 rounded-full bg-delta-red hover:bg-delta-darkRed text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-md inline-flex items-center gap-2"
                >
                  <span>{selectedCulture === "ccc" ? (currentLang === "pt" ? "Conhecer Espaço" : "Discover Center") : (currentLang === "pt" ? "Conhecer Formações" : "View Courses")}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setSelectedCulture(null)}
                  className="px-6 py-3 rounded-full bg-white/80 hover:bg-white text-[#35221A] text-xs sm:text-sm font-semibold tracking-wide border border-[#35221A]/15 transition-all"
                >
                  {currentLang === "pt" ? "Fechar" : "Close"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
