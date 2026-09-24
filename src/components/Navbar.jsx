import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import whiteLogo from '../assets/aerocon-white.png';

export default function Navbar({ visible = true }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('schedule');

  const navLinks = [
    { name: 'Schedule', href: '#schedule' },
    { name: 'Events', href: '#events' },
    { name: 'About', href: '#about' },
    { name: 'FAQ', href: '#faq' },
  ];

  // Scroll spy to highlight active navbar item
  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = ['schedule', 'events', 'about', 'faq'];
      const scrollPosition = window.scrollY + 120;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);

    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', ' ');
      return;
    }

    const targetId = href.replace('#', '');
    
    // Wait brief frame for mobile drawer to collapse so offset calculations are accurate
    setTimeout(() => {
      const el = document.getElementById(targetId);
      if (el) {
        const headerOffset = 70;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth'
        });
        window.history.pushState(null, '', href);
      }
    }, 50);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-[#09090b]/80 backdrop-blur-md border-b border-white/10 py-2.5 transition-all duration-300 ${
        visible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand: Aerocon White Logo */}
        <a
          href="#"
          onClick={(e) => handleLinkClick(e, '#')}
          className="flex items-center cursor-pointer"
        >
          <img
            src={whiteLogo}
            alt="AEROCON"
            className="h-6 sm:h-7 w-auto object-contain"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => {
            const isCurrent = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`text-xs uppercase tracking-wider font-mono transition-colors relative py-1 ${
                  isCurrent ? 'text-white font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {link.name}
                {isCurrent && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-full" />
                )}
              </a>
            );
          })}
          <a
            href="#events"
            onClick={(e) => handleLinkClick(e, '#events')}
            className="text-xs uppercase tracking-wider font-mono font-bold text-black bg-white px-3 py-1.5 hover:bg-zinc-200 transition-colors flex items-center gap-1 shadow-sm"
          >
            <span>Register</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </nav>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 text-white focus:outline-none rounded bg-zinc-900 border border-white/15"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#09090b]/95 backdrop-blur-xl border-b border-white/15 px-5 py-4 space-y-3 text-xs font-mono uppercase animate-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => {
            const isCurrent = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`block py-2 text-sm flex items-center justify-between border-b border-white/5 ${
                  isCurrent ? 'text-white font-bold pl-2 border-l-2 border-l-white bg-zinc-900/50' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <span>{link.name}</span>
                {isCurrent && <span className="text-[10px] text-zinc-500 font-normal">Active</span>}
              </a>
            );
          })}
          <a
            href="#events"
            onClick={(e) => handleLinkClick(e, '#events')}
            className="block w-full text-center py-2.5 mt-2 font-bold text-black bg-white hover:bg-zinc-200 transition-colors flex items-center justify-center gap-1 text-xs"
          >
            <span>Register Now</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      )}
    </header>
  );
}
