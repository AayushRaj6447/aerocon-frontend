import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Calendar, Clock, MapPin, Phone, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { eventsData } from '../data/eventsData';
import FlipCard from './FlipCard';
import StargazingModal from './StargazingModal';

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
  const [isStargazingModalOpen, setIsStargazingModalOpen] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isStargazingModalOpen) {
          setIsStargazingModalOpen(false);
        } else if (activeEvent) {
          setActiveEvent(null);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeEvent, isStargazingModalOpen]);

  return (
    <section id="events" className="py-24 bg-[#09090b] border-b border-white/10 relative">
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
              <div className="w-full h-[450px]">
                <FlipCard
                  className="w-full h-full"
                  width="100%"
                  height={450}
                  radius={16}
                  tilt={true}
                  tiltMax={12}
                  glare={true}
                  glareOpacity={0.25}
                  hoverScale={1.03}
                  perspective={1100}
                  background="#0d0d10"
                  color="#f5f5f5"
                  shadow={true}
                  shadowColor="#000000"
                  shadowOpacity={0.45}
                  flipOnClick={false}
                  draggable={false}
                  onClick={() => setActiveEvent(evt)}
                  front={
                    <div className="w-full h-full bg-zinc-900/70 flex flex-col justify-between p-6 sm:p-7 relative overflow-hidden backdrop-blur-sm cursor-pointer group select-none rounded-[inherit]">
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
                        <h3 className="text-2xl font-bold text-white tracking-tight mb-1 group-hover:text-white transition-colors">
                          {evt.title}
                        </h3>
                        <div className="text-xs font-mono text-zinc-400 font-semibold tracking-wider mb-4">
                          {evt.tagline}
                        </div>

                        {evt.perk && (
                          <div className="p-2 bg-zinc-800/60 border border-white/10 text-[11px] font-mono text-zinc-300 flex items-center gap-1.5 mb-3">
                            <span className="text-white font-bold">&bull;</span>
                            <span>{evt.perk}</span>
                          </div>
                        )}
                      </div>

                      {/* Metadata: Date, Time, Venue */}
                      <div className="py-3 px-4 bg-zinc-950/80 border border-white/10 font-mono text-xs text-zinc-400 space-y-2 my-auto">
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

                      {/* Bottom Callout */}
                      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400 group-hover:text-white transition-colors">
                        <span>BRIEFING</span>
                        <div className="flex items-center gap-1 font-semibold">
                          <span>View Event Briefing</span>
                          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
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

      {/* ==================== DEDICATED EVENT PAGE VIEW ==================== */}
      <AnimatePresence>
        {activeEvent && (
          <motion.div
            key="event-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-start sm:justify-center p-3 sm:p-6 md:p-8 lg:p-12 overflow-y-auto"
            onClick={(e) => {
              if (e.target === e.currentTarget) setActiveEvent(null);
            }}
          >
            <motion.div
              key="event-modal-dialog"
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-6xl w-full flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-12 xl:gap-16 relative my-auto py-8 sm:py-4 px-1 sm:px-4"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveEvent(null)}
                className="fixed top-3 right-3 sm:absolute sm:-top-7 sm:right-0 p-2 bg-white text-black hover:bg-zinc-200 transition-colors z-50 flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider shadow-lg"
                aria-label="Close event briefing"
              >
                <span>Close</span>
                <X className="w-4 h-4" />
              </button>

              {/* LEFT SIDE: Name written separately and static in bold sans-serif */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 max-w-lg lg:max-w-xl flex flex-col justify-center select-text pt-4 sm:pt-4 lg:pt-0"
              >
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <span className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase px-2.5 py-1 bg-white text-black font-bold">
                    {activeEvent.category}
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-mono text-zinc-500 tracking-wider">
                    {activeEvent.isStargazing ? 'SPECIAL NIGHT EVENT' : 'OFFICIAL COMPETITION'}
                  </span>
                </div>

                {/* Event Name written separately, static */}
                <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-sans font-black tracking-tight text-white uppercase leading-[0.9] mb-2 sm:mb-3">
                  {activeEvent.title}
                </h2>

                {activeEvent.collab && (
                  <div className="text-xs sm:text-sm font-mono text-zinc-300 font-semibold tracking-wider mb-2">
                    {activeEvent.collab}
                  </div>
                )}

                <p className="text-xs sm:text-sm font-mono text-zinc-400 tracking-wide max-w-md">
                  {activeEvent.tagline}
                </p>
              </motion.div>

              {/* RIGHT SIDE: The Card (WITH THE SAME FLIPCARD 3D TILT, GLARE, HOVERSCALE EFFECT) */}
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex-shrink-0 w-full sm:w-auto flex justify-center items-center select-text"
              >
                <div className="w-full max-w-[480px] sm:w-[460px] lg:w-[480px] h-[430px]">
                  <FlipCard
                    className="w-full h-full"
                    width="100%"
                    height={430}
                    radius={16}
                    tilt={true}
                    tiltMax={10}
                    glare={true}
                    glareOpacity={0.25}
                    hoverScale={1.02}
                    perspective={1100}
                    background="#0d0d10"
                    color="#f5f5f5"
                    shadow={true}
                    shadowColor="#000000"
                    shadowOpacity={0.45}
                    flipOnClick={false}
                    draggable={false}
                    front={
                      <div className="w-full h-full p-4 sm:p-6 shadow-2xl relative flex flex-col justify-between rounded-[inherit]">

                        {/* Card Header */}
                        <div className="flex items-center justify-between pb-2.5 border-b border-white/10 mb-3">
                          <span className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-zinc-400">
                            {activeEvent.isStargazing ? 'ASTRONOMY BRIEFING' : 'OFFICIAL EVENT SPECIFICATION'}
                          </span>
                          <span className="text-[10px] sm:text-[11px] font-mono text-zinc-500">
                            AEROCON 2026
                          </span>
                        </div>

                        {/* Metadata Grid (Venue, Date, Time) - Clean Font Only */}
                        <div className="grid grid-cols-3 gap-2 font-mono text-xs mb-3">
                          <div className="p-2 sm:p-2.5 bg-zinc-950 border border-white/10 rounded-sm">
                            <div className="flex items-center gap-1 text-zinc-500 text-[10px] uppercase mb-0.5">
                              <MapPin className="w-3 h-3 text-white" />
                              <span>Venue</span>
                            </div>
                            <div className="text-[11px] sm:text-sm font-bold text-white uppercase truncate">
                              {activeEvent.venue}
                            </div>
                          </div>

                          <div className="p-2 sm:p-2.5 bg-zinc-950 border border-white/10 rounded-sm">
                            <div className="flex items-center gap-1 text-zinc-500 text-[10px] uppercase mb-0.5">
                              <Calendar className="w-3 h-3 text-white" />
                              <span>Date</span>
                            </div>
                            <div className="text-[11px] sm:text-sm font-bold text-white uppercase truncate">
                              {activeEvent.date}
                            </div>
                          </div>

                          <div className="p-2 sm:p-2.5 bg-zinc-950 border border-white/10 rounded-sm">
                            <div className="flex items-center gap-1 text-zinc-500 text-[10px] uppercase mb-0.5">
                              <Clock className="w-3 h-3 text-white" />
                              <span>Time</span>
                            </div>
                            <div className="text-[11px] sm:text-sm font-bold text-white uppercase truncate">
                              {activeEvent.time}
                            </div>
                          </div>
                        </div>

                        {/* Description in Clean Typography */}
                        <p className="text-xs text-zinc-300 leading-relaxed mb-3">
                          {activeEvent.shortDesc}
                        </p>

                        {/* Perks / Highlights */}
                        {activeEvent.perk && (
                          <div className="p-2 bg-zinc-950 border border-white/10 text-xs font-mono text-zinc-300 flex items-center gap-2 mb-3 rounded-sm">
                            <span className="text-white font-bold">&bull;</span>
                            <span className="truncate">{activeEvent.perk}</span>
                          </div>
                        )}

                        {/* Student Coordinators */}
                        {activeEvent.contacts && activeEvent.contacts.length > 0 && (
                          <div className="p-2 sm:p-2.5 bg-zinc-950 border border-white/10 font-mono text-xs mb-3 rounded-sm">
                            <div className="text-[10px] text-zinc-500 uppercase mb-1">
                              Student Coordinators
                            </div>
                            <div className="flex flex-wrap gap-x-6 gap-y-1">
                              {activeEvent.contacts.map((c, i) => (
                                <a
                                  key={i}
                                  href={`tel:${c.phone.replace(/\s+/g, '')}`}
                                  className="text-zinc-300 hover:text-white flex items-center gap-1.5"
                                >
                                  <Phone className="w-3 h-3 text-zinc-500" />
                                  <span>{c.name}: <strong className="text-white">{c.phone}</strong></span>
                                </a>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="pt-3 border-t border-white/10 flex items-center gap-3">
                          {activeEvent.isStargazing ? (
                            <button
                              type="button"
                              onClick={() => setIsStargazingModalOpen(true)}
                              className="w-full py-2.5 px-6 bg-white text-black font-sans font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 shadow-lg"
                            >
                              <span>Book Your Slot</span>
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          ) : activeEvent.formUrl ? (
                            <a
                              href={activeEvent.formUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full py-2.5 px-6 bg-white text-black font-sans font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 shadow-lg"
                            >
                              <span>Register on Form</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          ) : (
                            <div className="w-full py-2.5 px-6 bg-white text-black font-sans font-bold text-xs uppercase tracking-wider text-center shadow-lg">
                              <span>Open to All &bull; {activeEvent.venue}</span>
                            </div>
                          )}
                        </div>

                      </div>
                    }
                  />
                </div>
              </motion.div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stargazing Slot Booking Modal */}
      <StargazingModal
        isOpen={isStargazingModalOpen}
        onClose={() => setIsStargazingModalOpen(false)}
      />
    </section>
  );
}
