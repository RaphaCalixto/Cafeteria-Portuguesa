"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Globe, Menu as MenuIcon, X, Facebook, Instagram, Youtube, Linkedin, ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface NavbarProps {
  currentLang: "pt" | "en";
  onToggleLang: () => void;
}

interface SubmenuCard {
  id: string;
  title: string;
  titlePt: string;
  image: string;
  video?: string;
  target: string;
}

export const Navbar: React.FC<NavbarProps> = ({ currentLang, onToggleLang }) => {
  const [activeDropdown, setActiveDropdown] = useState<"delta-cafes" | "coffee-culture" | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (dropdown: "delta-cafes" | "coffee-culture") => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const handleMegaMenuEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // GSAP animation for Mega Menu open / close
  useGSAP(
    () => {
      if (activeDropdown && megaMenuRef.current) {
        gsap.fromTo(
          megaMenuRef.current,
          { opacity: 0, y: -12, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "cubic.out" }
        );
        gsap.fromTo(
          ".mega-card-item",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, stagger: 0.08, duration: 0.3, ease: "power2.out", delay: 0.05 }
        );
      }
    },
    { dependencies: [activeDropdown] }
  );

  const deltaCafesCards: SubmenuCard[] = [
    {
      id: "about",
      title: "Our History",
      titlePt: "A Nossa História",
      image: "https://cdn.sanity.io/images/pcdkofnf/production/cf329b54fe19b444f33439a2a2580e6f48601fdc-500x320.jpg",
      video: "https://burospaces1.fra1.cdn.digitaloceanspaces.com/delta/2026-06-19T09-23-25.595Z-menu-about.mp4",
      target: "#history",
    },
    {
      id: "acores",
      title: "The Azores Coffee",
      titlePt: "O Café dos Açores",
      image: "https://cdn.sanity.io/images/pcdkofnf/production/58196a9e00d675ce97e0b508d66d0c7dfff6c615-500x320.jpg",
      video: "https://burospaces1.fra1.cdn.digitaloceanspaces.com/delta/2026-03-10T14-16-48.360Z-acores-menu.mp4",
      target: "#products",
    },
    {
      id: "family",
      title: "Nabeiro Family",
      titlePt: "A Família Nabeiro",
      image: "https://cdn.sanity.io/images/pcdkofnf/production/f25bc355a209b988dc8a6cfa00dac898ee4af13c-504x324.jpg",
      target: "#history",
    },
  ];

  const coffeeCultureCards: SubmenuCard[] = [
    {
      id: "ciclo",
      title: "Coffee Cycle",
      titlePt: "Ciclo do Café",
      image: "https://cdn.sanity.io/images/pcdkofnf/production/360034adb2563ecae69c516bb1aa77cb83abdb01-500x320.jpg",
      video: "https://burospaces1.fra1.cdn.digitaloceanspaces.com/delta/2026-03-10T14-33-40.575Z-ciclo-menu.mp4",
      target: "#coffee-cycle",
    },
    {
      id: "academy",
      title: "Barista Academy",
      titlePt: "Academia Barista",
      image: "https://cdn.sanity.io/images/pcdkofnf/production/3cc867af6ecb9be83babd955f23e995e6c7deb8e-504x324.jpg",
      video: "https://burospaces1.fra1.cdn.digitaloceanspaces.com/delta/2026-03-10T15-05-01.687Z-academia-menu.mp4",
      target: "#coffee-culture",
    },
    {
      id: "centre",
      title: "Coffee Science Centre",
      titlePt: "Centro de Ciência do Café",
      image: "https://cdn.sanity.io/images/pcdkofnf/production/608546f91cd6e0e622cfb67d41b82fe9786d385f-500x320.jpg",
      video: "https://burospaces1.fra1.cdn.digitaloceanspaces.com/delta/2026-03-10T15-19-01.080Z-ccc-menu.mp4",
      target: "#coffee-culture",
    },
  ];

  const currentCards = activeDropdown === "delta-cafes" ? deltaCafesCards : coffeeCultureCards;
  const currentTitle =
    activeDropdown === "delta-cafes"
      ? currentLang === "pt"
        ? ["DELTA", "CAFÉS"]
        : ["ABOUT", "DELTA"]
      : currentLang === "pt"
      ? ["CULTURA", "DO CAFÉ"]
      : ["COFFEE", "CULTURE"];

  return (
    <div
      ref={containerRef}
      onMouseLeave={handleMouseLeave}
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none select-none transition-all duration-300"
    >
      {/* Top Floating Bar Wrap */}
      <div className="w-full px-3 sm:px-6 pt-3 sm:pt-4 flex items-center justify-center relative">
        {/* Language & Quiz Quick Controls (Floating left and right on larger screens) */}
        <div className="absolute right-4 sm:right-8 top-4 hidden md:flex items-center gap-2 pointer-events-auto z-10">
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-oak-950/80 hover:bg-oak-900 border border-creme-200/15 text-creme-100 text-[11px] font-sans font-medium backdrop-blur-md transition-all shadow-md cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-delta-yellow" />
            <span className="uppercase font-mono font-bold tracking-wider">{currentLang}</span>
          </button>
        </div>

        {/* 1. Main Floating Pill Navbar (Desktop & Tablet) */}
        <nav
          onMouseEnter={handleMegaMenuEnter}
          className={`hidden lg:flex items-center justify-between relative px-2 py-1.5 rounded-full backdrop-blur-xl border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.5)] pointer-events-auto transition-all duration-300 ${
            isScrolled || activeDropdown
              ? "bg-[#211814]/95 shadow-[0_20px_45px_rgba(0,0,0,0.7)]"
              : "bg-[#261c17]/85"
          }`}
          style={{
            width: "clamp(840px, 78vw, 1140px)",
            height: "56px",
          }}
        >
          {/* Left Wing Menu Items */}
          <div className="flex items-center gap-1 sm:gap-2 pl-4 flex-1">
            {/* Delta Cafés Dropdown Trigger (Opens on Hover or Click) */}
            <button
              onMouseEnter={() => handleMouseEnter("delta-cafes")}
              onClick={() => setActiveDropdown(activeDropdown === "delta-cafes" ? null : "delta-cafes")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-sans font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeDropdown === "delta-cafes"
                  ? "bg-white/15 text-white shadow-inner"
                  : "text-creme-100/90 hover:text-white hover:bg-white/10"
              }`}
            >
              <span>{currentLang === "pt" ? "DELTA CAFÉS" : "ABOUT DELTA"}</span>
              <ChevronDown
                className={`w-3 h-3 text-creme-200 transition-transform duration-300 ${
                  activeDropdown === "delta-cafes" ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Coffee Culture Dropdown Trigger (Opens on Hover or Click) */}
            <button
              onMouseEnter={() => handleMouseEnter("coffee-culture")}
              onClick={() => setActiveDropdown(activeDropdown === "coffee-culture" ? null : "coffee-culture")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-sans font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeDropdown === "coffee-culture"
                  ? "bg-white/15 text-white shadow-inner"
                  : "text-creme-100/90 hover:text-white hover:bg-white/10"
              }`}
            >
              <span>{currentLang === "pt" ? "CULTURA DO CAFÉ" : "COFFEE CULTURE"}</span>
              <ChevronDown
                className={`w-3 h-3 text-creme-200 transition-transform duration-300 ${
                  activeDropdown === "coffee-culture" ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Produtos */}
            <a
              href="#products"
              onMouseEnter={handleMouseLeave}
              onClick={() => setActiveDropdown(null)}
              className="px-3 py-1.5 rounded-full text-[11px] font-sans font-bold uppercase tracking-wider text-creme-100/90 hover:text-white hover:bg-white/10 transition-all"
            >
              {currentLang === "pt" ? "PRODUTOS" : "PRODUCTS"}
            </a>
          </div>

          {/* Center Brand Icon: The Red Delta Triangle Logo with Notch */}
          <div
            onMouseEnter={handleMouseLeave}
            className="relative flex items-center justify-center px-4 -my-3 z-20"
          >
            <Link
              href="#hero"
              onClick={() => setActiveDropdown(null)}
              aria-label="Delta Cafés Home"
              className="relative block transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer filter drop-shadow-[0_4px_12px_rgba(231,0,37,0.4)]"
            >
              {/* Exact Delta Cafés Vector Triangle Shape from Official Nuxt Bundle */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 80 80"
                className="w-12 h-12"
              >
                {/* Dark red background triangle with curved bottom */}
                <path
                  fill="#9E0212"
                  d="M0 80c.006-.003 20.106-4.837 40-4.837 19.891 0 39.989 4.834 40 4.837zm63.704-41.843C55.692 22.137 40.025.034 40 0l40 80c0-.003-8.278-25.807-16.296-41.843m-47.408 0C8.28 54.193 0 80 0 80L40 0c-.023.034-15.692 22.138-23.704 38.157"
                />
                {/* Main vibrant Delta Red triangle */}
                <path
                  fill="#E70025"
                  d="M80 80 40 0 0 80c.006-.003 20.106-4.837 40-4.837 19.891 0 39.989 4.834 40 4.837"
                />
                {/* Yellow "DELTA CAFÉS" wordmark typography */}
                <path
                  fill="#FFD300"
                  d="m32.3 69.733.21.61a2.5 2.5 0 0 1-1.022.245c-1.084 0-1.759-.776-1.759-1.82 0-.988.568-1.911 1.759-1.911.44 0 .762.093 1.016.206l-.252.646a1.6 1.6 0 0 0-.716-.192c-.737 0-.994.669-.994 1.234 0 .73.491 1.176 1.047 1.176.285-.002.536-.093.711-.194m7.708.764h.79v-1.473h1.389v-.638h-1.389v-.795h1.437v-.644h-2.227zm-3.415-3.553 1.259 3.553h-.838l-.22-.674H35.48l-.223.675h-.77l1.253-3.554zm.011 2.295-.46-1.584-.465 1.584zm9.427-3.268-.398.618h.542l.66-.618zm4.761 2.435-.257-.116c-.203-.09-.451-.194-.451-.44 0-.158.104-.395.519-.395.276 0 .53.076.739.198l.232-.599c-.294-.15-.652-.203-.971-.203-.782 0-1.281.46-1.281 1.075 0 .587.369.839.843 1.042l.263.113c.203.084.454.197.454.457 0 .296-.251.429-.581.429-.296 0-.621-.107-.824-.234l-.212.618c.229.118.576.234.996.234.731 0 1.395-.313 1.395-1.157-.003-.573-.404-.821-.864-1.022m-5.32.528h1.363v-.618h-1.363v-.728h1.411v-.638h-2.193v3.547h2.269v-.637h-1.487zm11.244-18.604h-11.501v2.463h3.917v9.413h3.065v-9.413h3.288zm-26.645 0v11.876h7.815v-2.464h-4.75v-2.244h4.75v-2.464h-4.75v-2.243h4.75v-2.464h-7.815zm30.971-.503h.127l.26.503h.268l-.282-.503c.203-.011.319-.096.319-.307 0-.125-.031-.238-.144-.308-.082-.05-.212-.054-.313-.054h-.458v1.174h.226v-.505zm0-.5h.178c.116 0 .28 0 .28.147 0 .15-.088.184-.221.184h-.237zm-17.977 1.003H40v11.876h7.019v-2.464h-3.954zm18.195.493a1.09 1.09 0 0 0 0-2.179c-.601 0-1.092.489-1.092 1.087a1.096 1.096 0 0 0 1.092 1.092m0-1.967a.88.88 0 0 1 0 1.761.88.88 0 1 1 0-1.761m-38.719 1.474H18v11.876h4.541a5.927 5.927 0 0 0 5.927-5.933c0-3.276-2.656-5.943-5.927-5.943m-.55 9.412h-.926v-6.949h.926a3.47 3.47 0 0 1 3.474 3.477 3.477 3.477 0 0 1-3.474 3.472m37.09-9.412-5.924 11.876h11.848zm0 5.356 1.984 4.056h-3.971z"
                />
              </svg>
            </Link>
          </div>

          {/* Right Wing Menu Items */}
          <div className="flex items-center justify-end gap-1 sm:gap-2 pr-4 flex-1">
            {/* Soluções de Negócio */}
            <a
              href="#business-solutions"
              onMouseEnter={handleMouseLeave}
              onClick={() => setActiveDropdown(null)}
              className="px-3 py-1.5 rounded-full text-[11px] font-sans font-bold uppercase tracking-wider text-creme-100/90 hover:text-white hover:bg-white/10 transition-all whitespace-nowrap"
            >
              {currentLang === "pt" ? "SOLUÇÕES DE NEGÓCIO" : "BUSINESS SOLUTIONS"}
            </a>

            {/* Sustentabilidade */}
            <a
              href="#sustainability"
              onMouseEnter={handleMouseLeave}
              onClick={() => setActiveDropdown(null)}
              className="px-3 py-1.5 rounded-full text-[11px] font-sans font-bold uppercase tracking-wider text-creme-100/90 hover:text-white hover:bg-white/10 transition-all whitespace-nowrap"
            >
              {currentLang === "pt" ? "SUSTENTABILIDADE" : "SUSTAINABILITY"}
            </a>

            {/* Jornal */}
            <a
              href="#journal"
              onMouseEnter={handleMouseLeave}
              onClick={() => setActiveDropdown(null)}
              className="px-3 py-1.5 rounded-full text-[11px] font-sans font-bold uppercase tracking-wider text-creme-100/90 hover:text-white hover:bg-white/10 transition-all"
            >
              {currentLang === "pt" ? "JORNAL" : "JOURNAL"}
            </a>
          </div>
        </nav>

        {/* 2. Compact Mobile Header (< 1024px) */}
        <div className="flex lg:hidden items-center justify-between w-full max-w-lg px-4 py-2 rounded-full bg-[#231b16]/90 backdrop-blur-xl border border-white/10 shadow-lg pointer-events-auto">
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 text-creme-100 text-[10px] font-mono font-bold uppercase cursor-pointer"
          >
            <Globe className="w-3 h-3 text-delta-yellow" />
            <span>{currentLang}</span>
          </button>

          <Link href="#hero" className="block cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 80 80"
              className="w-9 h-9"
            >
              <path fill="#9E0212" d="M0 80c.006-.003 20.106-4.837 40-4.837 19.891 0 39.989 4.834 40 4.837zm63.704-41.843C55.692 22.137 40.025.034 40 0l40 80c0-.003-8.278-25.807-16.296-41.843m-47.408 0C8.28 54.193 0 80 0 80L40 0c-.023.034-15.692 22.138-23.704 38.157" />
              <path fill="#E70025" d="M80 80 40 0 0 80c.006-.003 20.106-4.837 40-4.837 19.891 0 39.989 4.834 40 4.837" />
              <path fill="#FFD300" d="m32.3 69.733.21.61a2.5 2.5 0 0 1-1.022.245c-1.084 0-1.759-.776-1.759-1.82 0-.988.568-1.911 1.759-1.911.44 0 .762.093 1.016.206l-.252.646a1.6 1.6 0 0 0-.716-.192c-.737 0-.994.669-.994 1.234 0 .73.491 1.176 1.047 1.176.285-.002.536-.093.711-.194m7.708.764h.79v-1.473h1.389v-.638h-1.389v-.795h1.437v-.644h-2.227zm-3.415-3.553 1.259 3.553h-.838l-.22-.674H35.48l-.223.675h-.77l1.253-3.554zm.011 2.295-.46-1.584-.465 1.584zm9.427-3.268-.398.618h.542l.66-.618zm4.761 2.435-.257-.116c-.203-.09-.451-.194-.451-.44 0-.158.104-.395.519-.395.276 0 .53.076.739.198l.232-.599c-.294-.15-.652-.203-.971-.203-.782 0-1.281.46-1.281 1.075 0 .587.369.839.843 1.042l.263.113c.203.084.454.197.454.457 0 .296-.251.429-.581.429-.296 0-.621-.107-.824-.234l-.212.618c.229.118.576.234.996.234.731 0 1.395-.313 1.395-1.157-.003-.573-.404-.821-.864-1.022m-5.32.528h1.363v-.618h-1.363v-.728h1.411v-.638h-2.193v3.547h2.269v-.637h-1.487zm11.244-18.604h-11.501v2.463h3.917v9.413h3.065v-9.413h3.288zm-26.645 0v11.876h7.815v-2.464h-4.75v-2.244h4.75v-2.464h-4.75v-2.243h4.75v-2.464h-7.815zm30.971-.503h.127l.26.503h.268l-.282-.503c.203-.011.319-.096.319-.307 0-.125-.031-.238-.144-.308-.082-.05-.212-.054-.313-.054h-.458v1.174h.226v-.505zm0-.5h.178c.116 0 .28 0 .28.147 0 .15-.088.184-.221.184h-.237zm-17.977 1.003H40v11.876h7.019v-2.464h-3.954zm18.195.493a1.09 1.09 0 0 0 0-2.179c-.601 0-1.092.489-1.092 1.087a1.096 1.096 0 0 0 1.092 1.092m0-1.967a.88.88 0 0 1 0 1.761.88.88 0 1 1 0-1.761m-38.719 1.474H18v11.876h4.541a5.927 5.927 0 0 0 5.927-5.933c0-3.276-2.656-5.943-5.927-5.943m-.55 9.412h-.926v-6.949h.926a3.47 3.47 0 0 1 3.474 3.477 3.477 3.477 0 0 1-3.474 3.472m37.09-9.412-5.924 11.876h11.848zm0 5.356 1.984 4.056h-3.971z" />
            </svg>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-full bg-white/10 text-creme-100 hover:text-white cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* 3. Authentic Mega Menu Dropdown Panel (Replicating image 2) */}
      {activeDropdown && (
        <div
          onMouseEnter={handleMegaMenuEnter}
          onMouseLeave={handleMouseLeave}
          className="w-full px-3 sm:px-6 pt-2 flex justify-center pointer-events-auto"
        >
          <div
            ref={megaMenuRef}
            className="w-full max-w-[1140px] rounded-[24px] sm:rounded-[32px] bg-[#1e1612]/95 backdrop-blur-2xl border border-white/15 p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.85)] flex flex-col justify-between"
          >
            {/* Top Row: Grand Title on Left + 3 Media Cards on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Grand Left Title */}
              <div className="lg:col-span-3 flex flex-col justify-center">
                <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-creme-100 tracking-tight leading-[0.95] uppercase">
                  {currentTitle[0]} <br />
                  <span>{currentTitle[1]}</span>
                </h3>
              </div>

              {/* 3 Visual Cards */}
              <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {currentCards.map((card) => {
                  const isHovered = hoveredCardId === card.id;

                  return (
                    <a
                      key={card.id}
                      href={card.target}
                      onClick={() => setActiveDropdown(null)}
                      onMouseEnter={() => setHoveredCardId(card.id)}
                      onMouseLeave={() => setHoveredCardId(null)}
                      className="mega-card-item flex flex-col group cursor-pointer"
                    >
                      {/* Media container */}
                      <div className="relative aspect-[500/320] w-full rounded-2xl overflow-hidden border border-white/10 bg-oak-950 shadow-lg transition-transform duration-300 group-hover:scale-[1.03]">
                        {/* Short preview looping video if available */}
                        {card.video && (
                          <video
                            src={card.video}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover z-0"
                          />
                        )}

                        {/* Image overlay / fallback */}
                        <Image
                          src={card.image}
                          alt={card.title}
                          fill
                          sizes="350px"
                          className={`object-cover transition-opacity duration-300 ${
                            card.video ? "opacity-0 group-hover:opacity-100" : "opacity-100"
                          }`}
                          unoptimized
                        />
                        {/* Subtle dark gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                      </div>

                      {/* Card Label Underneath */}
                      <span className="mt-2.5 text-center sm:text-left text-xs sm:text-sm font-sans font-medium text-creme-100 group-hover:text-delta-yellow transition-colors">
                        {currentLang === "pt" ? card.titlePt : card.title}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Bottom Row: Social Media Links + Copyright (Exact copy from original site) */}
            <div className="border-t border-creme-200/10 mt-8 pt-4 flex items-center justify-between flex-wrap gap-4 text-xs font-sans text-creme-200/60">
              {/* Circular Social Icons */}
              <div className="flex items-center gap-2">
                <a
                  href="https://www.facebook.com/DeltaCafes"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-creme-100 transition-colors"
                >
                  <Facebook className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://www.instagram.com/delta_cafes/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-creme-100 transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://www.youtube.com/@CanalDeltaCafes"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-creme-100 transition-colors"
                >
                  <Youtube className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://www.linkedin.com/company/delta-cafes"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-creme-100 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Copyright */}
              <span className="font-mono text-[11px] text-creme-200/50">
                2026 © Delta Cafés.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 4. Mobile Slide-Down Drawer (< 1024px) */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-2 pointer-events-auto">
          <div className="w-full max-w-lg mx-auto rounded-3xl bg-[#1e1612]/98 backdrop-blur-2xl border border-white/15 p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-mono text-delta-yellow font-bold uppercase tracking-widest mb-1">
                Menu
              </span>
              <a
                href="#hero"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-display font-bold uppercase text-creme-100 py-1"
              >
                {currentLang === "pt" ? "A Casa do Café" : "The House of Coffee"}
              </a>
              <a
                href="#products"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-display font-bold uppercase text-creme-100 py-1"
              >
                {currentLang === "pt" ? "Produtos & Lotes" : "Products & Blends"}
              </a>
              <a
                href="#history"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-display font-bold uppercase text-creme-100 py-1"
              >
                {currentLang === "pt" ? "A Nossa História" : "Our History"}
              </a>
              <a
                href="#coffee-cycle"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-display font-bold uppercase text-creme-100 py-1"
              >
                {currentLang === "pt" ? "Ciclo do Café" : "Coffee Cycle"}
              </a>
              <a
                href="#coffee-culture"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-display font-bold uppercase text-creme-100 py-1"
              >
                {currentLang === "pt" ? "Cultura do Café" : "Coffee Culture"}
              </a>
              <a
                href="#sustainability"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-display font-bold uppercase text-creme-100 py-1"
              >
                {currentLang === "pt" ? "Sustentabilidade" : "Sustainability"}
              </a>
              <a
                href="#journal"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-display font-bold uppercase text-creme-100 py-1"
              >
                {currentLang === "pt" ? "Jornal" : "Journal"}
              </a>
            </div>

            <div className="border-t border-creme-200/10 pt-4 flex items-center justify-between">
              <button
                onClick={() => {
                  onToggleLang();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-creme-100 text-xs font-mono"
              >
                <Globe className="w-3.5 h-3.5 text-delta-yellow" />
                <span>Mudar Idioma ({currentLang.toUpperCase()})</span>
              </button>

              <span className="text-[10px] font-mono text-creme-200/40">2026 © Delta</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
