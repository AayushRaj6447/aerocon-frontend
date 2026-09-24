import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Calendar, Clock, MapPin, Phone, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { eventsData } from '../data/eventsData';
import FlipCard from './FlipCard';

// Component for scroll-triggered card entrance from below
function ScrollRevealCard({ children, index }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`transition-all duration-700 ease-out transform ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-16'
      }`}
      style={{
        transitionDelay: `${(index % 3) * 120}ms`
      }}
    >
      {children}
    </div>
  );
}

export default function Events() {
  const [activeEvent, setActiveEvent] = useState(null);

  // Close modal on Escape key & manage body scroll lock
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeEvent) {
        setActiveEvent(null);
      }
    };

    if (activeEvent) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeEvent]);

  return (
    <section id="events" className="py-24 bg-transparent border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 block mb-2">
            AEROCON 2026 // 7 OFFICIAL ATTRACTIONS & EVENTS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Events & Competitions.
          </h2>

        </div>

        {/* Event Cards Grid with FlipCard 3D Hover/Tilt & Scroll Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventsData.map((evt, idx) => (
            <ScrollRevealCard key={evt.id} index={idx}>
              <div className="w-full h-[450px] relative z-20">
                <FlipCard
                  className="w-full h-full"
                  width="100%"
                  height={450}
                  radius={16}
                  tilt={false}
                  tiltMax={12}
                  glare={false}
                  glareOpacity={0.25}
                  hoverScale={1}
                  perspective={1100}
                  background="#0e0e12"
                  color="#f5f5f5"
                  shadow={true}
                  shadowColor="#000000"
                  shadowOpacity={0.45}
                  flipOnClick={false}
                  draggable={false}
                  onClick={() => setActiveEvent(evt)}
                  front={
                    <div className="w-full h-full bg-[#0e0e12] border border-white/15 flex flex-col justify-between p-6 sm:p-7 relative overflow-hidden cursor-pointer group select-none rounded-[inherit] shadow-2xl">
                      {/* Top Section */}
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 bg-white text-black font-bold">
                            {evt.category}
                          </span>
                          {evt.collab && (
                            <span className="text-[10px] font-mono text-zinc-400 font-semibold">
                              {evt.collab}
                            </span>
                          )}
                        </div>

                        {/* Title & Tagline */}
                        <h3 className="text-2xl font-bold text-white tracking-tight mb-1">
                          {evt.title}
                        </h3>
                        <div className="text-xs font-mono text-zinc-400 font-semibold tracking-wider mb-4">
                          {evt.tagline}
                        </div>

                        {evt.perk && (
                          <div className="p-2 bg-zinc-800 border border-white/10 text-[11px] font-mono text-zinc-300 flex items-center gap-1.5 mb-3">
                            <span className="text-white font-bold">&bull;</span>
                            <span>{evt.perk}</span>
                          </div>
                        )}
                      </div>

                      {/* Metadata: Date, Time, Venue */}
                      <div className="py-3 px-4 bg-zinc-950 border border-white/10 font-mono text-xs text-zinc-400 space-y-2 my-auto">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-zinc-500">
                            <Calendar className="w-3.5 h-3.5 text-white" /> Date
                          </span>
                          <span className="font-bold text-white">{evt.date}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-zinc-500">
                            <Clock className="w-3.5 h-3.5 text-white" /> Boarding Time
                          </span>
                          <span className="font-semibold text-white">{evt.time}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-zinc-500">
                            <MapPin className="w-3.5 h-3.5 text-white" /> Venue
                          </span>
                          <span className="font-bold text-white">{evt.venue}</span>
                        </div>
                      </div>

                      {/* Bottom Callout - Event Brief Highlighting */}
                      <div className="pt-3 border-t border-white/10 group-hover:border-white/30 flex items-center justify-between text-xs font-mono text-zinc-400 group-hover:text-white transition-all duration-200">
                        <div className="flex items-center gap-1.5 font-semibold">
                          <span className="group-hover:underline underline-offset-4 decoration-white/50">View Event Briefing</span>
                          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform text-zinc-400 group-hover:text-white" />
                        </div>
                      </div>
                    </div>
                  }
                />
              </div>
            </ScrollRevealCard>
          ))}
        </div>
      </div>

      {/* ==================== DEDICATED EVENT POPUP CARD VIEW ==================== */}
      <AnimatePresence>
        {activeEvent && (
          <motion.div
            key="event-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
            onClick={(e) => {
              if (e.target === e.currentTarget) setActiveEvent(null);
            }}
          >
            <motion.div
              key="event-modal-dialog"
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#0e0e12] border border-white/20 rounded-2xl max-w-xl w-full p-5 sm:p-7 shadow-2xl relative text-white my-auto flex flex-col space-y-4 max-h-[90vh] overflow-y-auto"
            >
              {/* Floating Popup Card Header */}
              <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-0.5 bg-white text-black font-bold rounded-xs">
                      {activeEvent.category}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400 tracking-wider">
                      {activeEvent.isStargazing ? 'SPECIAL NIGHT EVENT' : 'OFFICIAL COMPETITION'}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-sans font-black tracking-tight text-white uppercase leading-none">
                    {activeEvent.title}
                  </h2>
                  {activeEvent.collab && (
                    <span className="text-xs font-mono text-zinc-300 font-semibold tracking-wider block mt-1">
                      {activeEvent.collab}
                    </span>
                  )}
                </div>

                {/* Close Button Inside Popup Header */}
                <button
                  type="button"
                  onClick={() => setActiveEvent(null)}
                  className="px-3 py-1.5 bg-white text-black hover:bg-zinc-200 transition-colors flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider rounded-md shadow-md shrink-0 cursor-pointer"
                  aria-label="Close modal"
                >
                  <span>CLOSE</span>
                  <X className="w-4 h-4 text-black" />
                </button>
              </div>

              {/* Description Paragraph */}
              <p className="text-xs sm:text-sm font-mono text-zinc-300 leading-relaxed">
                {activeEvent.shortDesc}
              </p>

              {/* Metadata Grid (Venue, Date, Time) - Clean, Un-truncated */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 font-mono text-xs">
                <div className="p-2.5 bg-zinc-950 border border-white/10 rounded-xl">
                  <div className="flex items-center gap-1 text-zinc-500 text-[10px] uppercase mb-1">
                    <MapPin className="w-3.5 h-3.5 text-white shrink-0" />
                    <span>Venue</span>
                  </div>
                  <div className="text-xs font-bold text-white break-words">
                    {activeEvent.venue}
                  </div>
                </div>

                <div className="p-2.5 bg-zinc-950 border border-white/10 rounded-xl">
                  <div className="flex items-center gap-1 text-zinc-400 text-[10px] uppercase mb-1">
                    <Calendar className="w-3.5 h-3.5 text-white shrink-0" />
                    <span>Date</span>
                  </div>
                  <div className="text-xs font-bold text-white break-words">
                    {activeEvent.date}
                  </div>
                </div>

                <div className="p-2.5 bg-zinc-950 border border-white/10 rounded-xl">
                  <div className="flex items-center gap-1 text-zinc-400 text-[10px] uppercase mb-1">
                    <Clock className="w-3.5 h-3.5 text-white shrink-0" />
                    <span>Time</span>
                  </div>
                  <div className="text-xs font-bold text-white break-words">
                    {activeEvent.time}
                  </div>
                </div>
              </div>

              {/* Key Specs / Highlights */}
              {activeEvent.perk && (
                <div className="p-3 bg-zinc-950 border border-white/10 text-xs font-mono text-zinc-300 flex items-start gap-2 rounded-xl">
                  <span className="text-white font-bold shrink-0">&bull;</span>
                  <span className="leading-snug">{activeEvent.perk}</span>
                </div>
              )}

              {/* Student Coordinators Contacts */}
              {activeEvent.contacts && activeEvent.contacts.length > 0 && (
                <div className="p-3 bg-zinc-950 border border-white/10 font-mono text-xs rounded-xl space-y-1">
                  <div className="text-[10px] text-zinc-500 uppercase font-semibold">
                    Student Coordinators
                  </div>
                  <div className="flex flex-wrap gap-x-6 gap-y-1">
                    {activeEvent.contacts.map((c, i) => (
                      <a
                        key={i}
                        href={`tel:${c.phone.replace(/\s+/g, '')}`}
                        className="text-zinc-300 hover:text-white flex items-center gap-1.5 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5 text-zinc-500" />
                        <span>{c.name}: <strong className="text-white">{c.phone}</strong></span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Register / Action Button */}
              <div className="pt-2">
                {activeEvent.formUrl ? (
                  <a
                    href={activeEvent.formUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-6 bg-white text-black font-mono font-bold text-xs sm:text-sm rounded-xl hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 shadow-xl"
                  >
                    <span>{activeEvent.isStargazing ? 'Book Your Slot' : 'Register on Form'}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ) : (
                  <div className="w-full py-3 px-6 bg-white text-black font-mono font-bold text-xs sm:text-sm text-center shadow-xl rounded-xl">
                    <span>Open to All &bull; {activeEvent.venue}</span>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
