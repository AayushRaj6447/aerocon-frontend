import React from 'react';
import { ArrowUp } from 'lucide-react';
import whiteLogo from '../assets/aerocon-white.png';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#09090b] text-white border-t border-white/10 pt-12 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img src={whiteLogo} alt="AEROCON" className="h-8 w-auto object-contain" />
            <div className="border-l border-white/20 pl-3">
              <span className="text-[9px] uppercase tracking-widest font-mono text-zinc-500 block">
                Conducted By
              </span>
              <span className="text-xs font-bold tracking-wider uppercase text-white">
                AeroSoc
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-zinc-400">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#events" className="hover:text-white transition-colors">Events</a>
            <a href="#schedule" className="hover:text-white transition-colors">Schedule</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs font-mono font-semibold text-white hover:text-zinc-300"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="pt-6 text-center text-xs font-mono text-zinc-500">
          &copy; {new Date().getFullYear()} AeroSoc. All Rights Reserved &bull; AEROCON 2026 (26 - 27 Sept).
        </div>
      </div>
    </footer>
  );
}
