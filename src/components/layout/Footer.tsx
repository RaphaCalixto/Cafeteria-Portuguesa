"use client";

import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Youtube, Linkedin } from "lucide-react";

interface FooterProps {
  currentLang: "pt" | "en";
}

export const Footer: React.FC<FooterProps> = ({ currentLang }) => {
  return (
    <footer className="w-full bg-transparent text-[#FAF5EE] pt-12 pb-10 px-6 sm:px-10 lg:px-16 z-20 relative select-none">
      <div className="max-w-[1440px] mx-auto">
        {/* Main Grid matching Image 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12">
          {/* Column 1: Logo, Secondary Links & Socials (Cols 1-3) */}
          <div className="lg:col-span-3 flex flex-col justify-between space-y-8">
            <div>
              {/* White Line-Art Delta Triangle Logo */}
              <Link href="#hero" className="inline-block group mb-8">
                <svg
                  viewBox="0 0 60 52"
                  className="w-14 h-12 transition-transform duration-300 group-hover:scale-105"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M30 4 L56 48 L4 48 Z"
                    stroke="#FAF5EE"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <text
                    x="30"
                    y="31"
                    textAnchor="middle"
                    fill="#FAF5EE"
                    fontSize="9"
                    fontWeight="800"
                    fontFamily="sans-serif"
                    letterSpacing="0.1em"
                  >
                    DELTA
                  </text>
                  <text
                    x="30"
                    y="41"
                    textAnchor="middle"
                    fill="#FAF5EE"
                    fontSize="6"
                    fontWeight="600"
                    fontFamily="sans-serif"
                    letterSpacing="0.15em"
                  >
                    1961
                  </text>
                </svg>
              </Link>

              {/* Secondary Navigation Links */}
              <ul className="space-y-2 text-xs sm:text-[13px] text-[#FAF5EE]/85 font-medium tracking-wide">
                <li>
                  <a
                    href="https://www.thedeltahouse.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-delta-yellow transition-colors block py-0.5"
                  >
                    Loja Online Delta House
                  </a>
                </li>
                <li>
                  <a
                    href="https://gruponabeiro.com/oportunidades"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-delta-yellow transition-colors block py-0.5"
                  >
                    Recrutamento
                  </a>
                </li>
                <li>
                  <a
                    href="https://provedoria.gruponabeiro.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-delta-yellow transition-colors block py-0.5"
                  >
                    Provedoria do Cliente
                  </a>
                </li>
                <li>
                  <a
                    href="https://gruponabeiro.com/comunicados-de-imprensa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-delta-yellow transition-colors block py-0.5"
                  >
                    Centro de Imprensa
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Icons (White Circles) */}
            <div className="flex items-center gap-3 pt-4">
              <a
                href="https://www.facebook.com/DeltaCafes"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full border border-[#FAF5EE]/80 flex items-center justify-center text-[#FAF5EE] hover:bg-[#FAF5EE] hover:text-[#1B120E] transition-all duration-300"
              >
                <Facebook className="w-3.5 h-3.5 fill-current" />
              </a>
              <a
                href="https://www.instagram.com/delta_cafes/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full border border-[#FAF5EE]/80 flex items-center justify-center text-[#FAF5EE] hover:bg-[#FAF5EE] hover:text-[#1B120E] transition-all duration-300"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.youtube.com/user/deltacafesportugal"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full border border-[#FAF5EE]/80 flex items-center justify-center text-[#FAF5EE] hover:bg-[#FAF5EE] hover:text-[#1B120E] transition-all duration-300"
              >
                <Youtube className="w-3.5 h-3.5 fill-current" />
              </a>
              <a
                href="https://www.linkedin.com/company/delta-cafes"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full border border-[#FAF5EE]/80 flex items-center justify-center text-[#FAF5EE] hover:bg-[#FAF5EE] hover:text-[#1B120E] transition-all duration-300"
              >
                <Linkedin className="w-3.5 h-3.5 fill-current" />
              </a>
            </div>
          </div>

          {/* Column 2: DELTA CAFÉS (Cols 4-5) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-white">
              DELTA CAFÉS
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-[13px] text-[#FAF5EE]/80 font-medium tracking-wide">
              <li>
                <a href="#history" className="hover:text-delta-yellow transition-colors block">
                  A nossa História
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-delta-yellow transition-colors block">
                  Sobre a Delta
                </a>
              </li>
              <li>
                <a href="#azores-coffee" className="hover:text-delta-yellow transition-colors block">
                  O café dos Açores
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: CULTURA DO CAFÉ (Cols 6-8) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-white">
              CULTURA DO CAFÉ
            </h4>
            <div className="space-y-3 text-xs sm:text-[13px] text-[#FAF5EE]/80 font-medium tracking-wide">
              <div>
                <a href="#coffee-cycle" className="text-white/95 hover:text-delta-yellow transition-colors font-medium">
                  Ciclo do Café
                </a>
                <ul className="mt-1.5 ml-3 space-y-1 text-xs text-[#FAF5EE]/70 font-normal">
                  <li>
                    <a href="#coffee-cycle" className="hover:text-delta-yellow transition-colors block">
                      Origens
                    </a>
                  </li>
                  <li>
                    <a href="#coffee-cycle" className="hover:text-delta-yellow transition-colors block">
                      Blend
                    </a>
                  </li>
                  <li>
                    <a href="#coffee-cycle" className="hover:text-delta-yellow transition-colors block">
                      Torra
                    </a>
                  </li>
                  <li>
                    <a href="#coffee-cycle" className="hover:text-delta-yellow transition-colors block">
                      Prova
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <a href="#coffee-culture" className="hover:text-delta-yellow transition-colors block">
                  Academia Barista
                </a>
              </div>
              <div>
                <a href="#coffee-culture" className="hover:text-delta-yellow transition-colors block">
                  Centro de Ciência do Café
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: SINGLE TOPICS LIST (Cols 9-10) */}
          <div className="lg:col-span-2 space-y-3.5">
            <ul className="space-y-3 text-xs sm:text-[13px] font-bold uppercase tracking-[0.16em] text-white">
              <li>
                <a href="#products" className="hover:text-delta-yellow transition-colors block">
                  PRODUTOS
                </a>
              </li>
              <li>
                <a href="#solutions" className="hover:text-delta-yellow transition-colors block">
                  SOLUÇÕES DE NEGÓCIO
                </a>
              </li>
              <li>
                <a href="#sustainability" className="hover:text-delta-yellow transition-colors block">
                  SUSTENTABILIDADE
                </a>
              </li>
              <li>
                <a href="#journal" className="hover:text-delta-yellow transition-colors block">
                  JORNAL
                </a>
              </li>
              <li>
                <a
                  href="https://dddelta.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-delta-yellow transition-colors block"
                >
                  D DE DELTA
                </a>
              </li>
              <li>
                <a href="#quiz" className="hover:text-delta-yellow transition-colors block">
                  QUIZ
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: CONTACTS (Cols 11-12) */}
          <div className="lg:col-span-2 space-y-6 text-right lg:text-left">
            <div>
              <h5 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FAF5EE]/70 mb-1">
                E-MAIL
              </h5>
              <a
                href="mailto:info@gruponabeiro.com"
                className="text-xs sm:text-[13px] text-white hover:text-delta-yellow transition-colors font-medium"
              >
                info@gruponabeiro.com
              </a>
            </div>

            <div>
              <h5 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FAF5EE]/70 mb-1">
                APOIO AO CLIENTE
              </h5>
              <a
                href="tel:808200644"
                className="text-sm sm:text-base font-bold text-white hover:text-delta-yellow transition-colors block tracking-wide"
              >
                808 20 06 44*
              </a>
            </div>

            <div>
              <h5 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FAF5EE]/70 mb-1">
                ASSISTÊNCIA TÉCNICA
              </h5>
              <a
                href="tel:800204110"
                className="text-sm sm:text-base font-bold text-white hover:text-delta-yellow transition-colors block tracking-wide"
              >
                800 20 41 10*
              </a>
              <span className="text-[10px] text-[#FAF5EE]/60 block mt-1">
                *custo para a rede fixa nacional
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Legal / Copyright Row */}
        <div className="pt-6 border-t border-[#FAF5EE]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#FAF5EE]/60">
          <div>
            2026 © Delta Cafés — Grupo Nabeiro. Todos os direitos reservados.
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <a href="/legal/politica-de-privacidade" className="hover:text-white transition-colors">
              Política de Privacidade
            </a>
            <a href="/legal/termos-e-condicoes" className="hover:text-white transition-colors">
              Termos e Condições
            </a>
            <a href="/legal/politica-de-cookies" className="hover:text-white transition-colors">
              Política de Cookies
            </a>
            <a
              href="https://www.livroreclamacoes.pt"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Livro de Reclamações
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
