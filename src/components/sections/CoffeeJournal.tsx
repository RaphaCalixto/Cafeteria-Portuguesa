"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { journalArticles } from "@/data/deltaData";
import { Calendar, Clock, ArrowUpRight, BookOpen } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CoffeeJournalProps {
  currentLang: "pt" | "en";
}

export const CoffeeJournal: React.FC<CoffeeJournalProps> = ({ currentLang }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".journal-item",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
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
      id="journal"
      ref={containerRef}
      className="relative py-24 sm:py-36 bg-oak-1000 text-creme-100 overflow-hidden border-t border-creme-200/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-creme-200/20 bg-oak-900 text-creme-200 text-xs uppercase tracking-[0.2em] font-semibold mb-4">
            <BookOpen className="w-3.5 h-3.5 text-delta-yellow" />
            {currentLang === "pt" ? "Publicação Editorial" : "Editorial Stories"}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-creme-50 leading-tight">
            {currentLang === "pt" ? (
              <>
                O Jornal do Café: <br />
                <span className="italic text-delta-yellow">histórias, cultura e inovação.</span>
              </>
            ) : (
              <>
                The Coffee Journal: <br />
                <span className="italic text-delta-yellow">stories, culture & innovation.</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-creme-200/80 font-sans max-w-xl mx-auto">
            {currentLang === "pt"
              ? "Celebrando pessoas, lugares e momentos especiais reunidos à volta de uma chávena de café com coração."
              : "Celebrating people, places, and memorable moments gathered around a warm cup of coffee with heart."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {journalArticles.map((article) => (
            <article
              key={article.title}
              className="journal-item bg-oak-900/60 border border-creme-200/10 hover:border-creme-200/30 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-2 group flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="relative w-full h-56 overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105 filter brightness-95"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-oak-900 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 bg-oak-950/90 backdrop-blur-md px-3 py-1 rounded-full text-delta-yellow text-[10px] font-bold uppercase tracking-wider">
                    {currentLang === "pt" ? article.categoryPt : article.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-[11px] text-creme-200/60 uppercase tracking-wider mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-delta-red" />
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-delta-yellow" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl text-creme-50 leading-snug group-hover:text-delta-yellow transition-colors">
                    {currentLang === "pt" ? article.titlePt : article.title}
                  </h3>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-delta-red group-hover:text-delta-yellow transition-colors">
                <span>{currentLang === "pt" ? "Ler Artigo Completo" : "Read Full Article"}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
