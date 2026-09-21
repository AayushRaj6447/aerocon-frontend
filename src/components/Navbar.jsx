import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import whiteLogo from '../assets/aerocon-white.png';

export default function Navbar({ visible = false }) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Events', href: '#events' },
    { name: 'Schedule', href: '#schedule' },
    { name: 'FAQ', href: '#faq' },
  ];

  const handleLinkClick = (e, href) => {
    if (href === '#events') {
      e.preventDefault();
      const el = document.getElementById('events');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      window.history.pushState(null, '', '#events');
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-[#09090b]/80 backdrop-blur-md border-b border-white/10 py-2.5 transition-all duration-1000 ${
        visible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand: Aerocon White Logo */}
        <a href="#" className="flex items-center">
          <img
            src={whiteLogo}
            alt="AEROCON"
            className="h-6 sm:h-7 w-auto object-contain"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-xs uppercase tracking-wider font-mono text-zinc-400 hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#events"
            onClick={(e) => handleLinkClick(e, '#events')}
            className="text-xs uppercase tracking-wider font-mono font-bold text-white hover:text-zinc-300 transition-colors flex items-center gap-0.5"
          >
            <span>Register</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </nav>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#09090b] border-b border-white/10 px-4 py-3 space-y-2 text-xs font-mono uppercase">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block py-1.5 text-zinc-400 hover:text-white"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#events"
            onClick={() => setIsOpen(false)}
            className="block py-1.5 font-bold text-white"
          >
            Register
          </a>
        </div>
      )}
    </header>
  );
}
