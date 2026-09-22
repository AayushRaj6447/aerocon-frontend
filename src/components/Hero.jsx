import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Clock, MapPin, ArrowRight, Search } from 'lucide-react';
import MainHero from './mainhero';
import StargazingModal from './StargazingModal';
import FlipCard from './FlipCard';
import { RocketSketch, DroneSketch, JetSketch } from './FloatingSketches';
import { stargazingData } from '../data/eventsData';

export default function Hero({ isReady = false, onHeroComplete }) {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('book');

  // Countdown timer to 25 September 2026, 05:30 PM (Inaugural Drone Show)
  const calculateTimeLeft = () => {
    const eventDate = new Date('2026-09-25T17:30:00');
    const now = new Date();
    const difference = eventDate - now;

    if (difference <= 0) {
      return { days: '00', hours: '00', minutes: '00', seconds: '00' };
    }

    return {
      days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, '0'),
      hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, '0'),
      minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, '0'),
      seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, '0'),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Track vertical scroll progress to transition horizontally (only AEROCON -> STARGAZING)
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!containerRef.current) return;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = containerRef.current.getBoundingClientRect();
          const total = rect.height - window.innerHeight;
          if (total > 0) {
            const current = -rect.top;
            const progress = Math.min(Math.max(current / total, 0), 1);
            setScrollProgress(progress);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <section
        ref={containerRef}
        className="relative h-[220vh] bg-transparent text-white select-none border-b border-white/10"
      >
        {/* Sticky 100vh Viewport */}
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-transparent bg-grid-pattern flex items-center justify-center">

          {/* ==================== SLIDE 1: AEROCON + COUNTDOWN ==================== */}
          <div
            className="absolute inset-0 w-full h-full flex flex-col justify-between items-center pt-14 pb-8 sm:pb-12 will-change-transform"
            style={{
              transform: `translateX(-${scrollProgress * 105}vw)`,
              opacity: Math.max(0, 1 - scrollProgress * 2),
              pointerEvents: scrollProgress > 0.6 ? 'none' : 'auto'
            }}
          >
            {/* Full-screen Particle Canvas for AEROCON */}
            <div className="absolute inset-0 w-full h-full pointer-events-auto">
              <MainHero onComplete={onHeroComplete} />
            </div>

            {/* Ambient Hero Floating Sketches (Uniformly framing the main text) */}
            {/* Top-Left Flank */}
            <div className="absolute top-[20%] left-[8%] sm:left-[12%] opacity-[0.22] text-white pointer-events-none -rotate-[25deg]">
              <div style={{ animation: 'floatSway 12s ease-in-out infinite', animationDelay: '-2s' }}>
                <JetSketch className="w-10 h-10 sm:w-12 sm:h-12" />
              </div>
            </div>

            {/* Top-Right Flank */}
            <div className="absolute top-[20%] right-[8%] sm:right-[12%] opacity-[0.22] text-white pointer-events-none rotate-[25deg]">
              <div style={{ animation: 'floatDeep 12s ease-in-out infinite', animationDelay: '-6s' }}>
                <RocketSketch className="w-10 h-10 sm:w-12 sm:h-12" />
              </div>
            </div>

            {/* Bottom-Center (Above Countdown) */}
            <div className="absolute bottom-[23%] left-1/2 -translate-x-1/2 opacity-[0.20] text-white pointer-events-none">
              <div style={{ animation: 'floatDriftZone 14s ease-in-out infinite', animationDelay: '-4s' }}>
                <DroneSketch className="w-10 h-10 sm:w-12 sm:h-12" />
              </div>
            </div>

            {/* Spacers */}
            <div className="h-2 relative z-10 pointer-events-none"></div>
            <div className="pointer-events-none"></div>

            {/* Countdown Timer */}
            <div
              className={`relative z-10 flex items-center justify-center gap-3 sm:gap-8 md:gap-14 font-mono text-center px-4 transition-all duration-1000 ${
                isReady
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-6 pointer-events-none'
              }`}
            >
              <div>
                <span className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight font-mono">
                  {timeLeft.days}
                </span>
                <span className="block text-[9px] sm:text-xs text-zinc-500 uppercase tracking-widest mt-1">
                  Days
                </span>
              </div>
              <span className="text-xl sm:text-3xl md:text-4xl text-zinc-700 font-light -mt-3 sm:-mt-4 select-none">:</span>
              <div>
                <span className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight font-mono">
                  {timeLeft.hours}
                </span>
                <span className="block text-[9px] sm:text-xs text-zinc-500 uppercase tracking-widest mt-1">
                  Hours
                </span>
              </div>
              <span className="text-xl sm:text-3xl md:text-4xl text-zinc-700 font-light -mt-3 sm:-mt-4 select-none">:</span>
              <div>
                <span className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight font-mono">
                  {timeLeft.minutes}
                </span>
                <span className="block text-[9px] sm:text-xs text-zinc-500 uppercase tracking-widest mt-1">
                  Minutes
                </span>
              </div>
              <span className="text-xl sm:text-3xl md:text-4xl text-zinc-700 font-light -mt-3 sm:-mt-4 select-none">:</span>
              <div>
                <span className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight font-mono">
                  {timeLeft.seconds}
                </span>
                <span className="block text-[9px] sm:text-xs text-zinc-500 uppercase tracking-widest mt-1">
                  Seconds
                </span>
              </div>
            </div>
          </div>

          {/* ==================== SLIDE 2: STARGAZING ==================== */}
          <div
            className="absolute inset-0 w-full h-full flex items-center justify-center p-3 sm:p-6 md:p-8 lg:p-12 overflow-y-auto will-change-transform"
            style={{
              transform: `translateX(${(1 - scrollProgress) * 105}vw)`,
              opacity: Math.min(1, Math.max(0, (scrollProgress - 0.2) * 1.8)),
              pointerEvents: scrollProgress < 0.4 ? 'none' : 'auto'
            }}
          >
            <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-12 xl:gap-16 py-6 sm:py-0">

              {/* LEFT SIDE: Name written separately on the left side, static in bold sans-serif */}
              <div className="flex-1 max-w-lg lg:max-w-xl flex flex-col justify-center select-text">
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <span className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase px-2.5 py-1 bg-white text-black font-bold">
                    {stargazingData.category}
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-mono text-zinc-500 tracking-wider">
                    SPECIAL NIGHT EVENT
                  </span>
                </div>

                <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-sans font-black tracking-tight text-white uppercase leading-[0.9] mb-2 sm:mb-3">
                  {stargazingData.title}
                </h2>

                <p className="text-xs sm:text-sm font-mono text-zinc-400 tracking-wide max-w-md">
                  {stargazingData.tagline}
                </p>
              </div>

              {/* RIGHT SIDE: The Card (With 3D tilt, glare, hoverScale from FlipCard) */}
              <div className="flex-shrink-0 w-full sm:w-auto flex justify-center items-center select-text">
                <div className="w-full max-w-[480px] sm:w-[460px] lg:w-[480px] h-[395px]">
                  <FlipCard
                    className="w-full h-full"
                    width="100%"
                    height={395}
                    radius={16}
                    tilt={true}
                    tiltMax={10}
                    glare={true}
                    glareOpacity={0.25}
                    hoverScale={1.02}
                    perspective={1100}
                    background="#0e0e12"
                    color="#f5f5f5"
                    shadow={true}
                    shadowColor="#000000"
                    shadowOpacity={0.45}
                    flipOnClick={false}
                    draggable={false}
                    front={
                      <div className="w-full h-full bg-[#0e0e12] p-4 sm:p-6 shadow-2xl relative flex flex-col justify-between rounded-[inherit]">

                        {/* Card Header */}
                        <div className="flex items-center justify-between pb-2.5 border-b border-white/10 mb-3">
                          <span className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-zinc-400">
                            TELESCOPE ARRAY SPECIFICATION
                          </span>
                          <span className="text-[10px] sm:text-[11px] font-mono text-zinc-500">
                            AEROCON 2026
                          </span>
                        </div>

                        {/* Metadata Grid (Venue, Date, Time) */}
                        <div className="grid grid-cols-3 gap-2 font-mono text-xs mb-3">
                          <div className="p-2 sm:p-2.5 bg-zinc-950 border border-white/10 rounded-sm">
                            <div className="flex items-center gap-1 text-zinc-500 text-[10px] uppercase mb-0.5">
                              <MapPin className="w-3 h-3 text-white" />
                              <span>Venue</span>
                            </div>
                            <div className="text-[11px] sm:text-sm font-bold text-white uppercase truncate">
                              {stargazingData.venue}
                            </div>
                          </div>

                          <div className="p-2 sm:p-2.5 bg-zinc-950 border border-white/10 rounded-sm">
                            <div className="flex items-center gap-1 text-zinc-500 text-[10px] uppercase mb-0.5">
                              <Calendar className="w-3.5 h-3.5 text-white" />
                              <span>Date</span>
                            </div>
                            <div className="text-[11px] sm:text-sm font-bold text-white uppercase truncate">
                              {stargazingData.date}
                            </div>
                          </div>

                          <div className="p-2 sm:p-2.5 bg-zinc-950 border border-white/10 rounded-sm">
                            <div className="flex items-center gap-1 text-zinc-500 text-[10px] uppercase mb-0.5">
                              <Clock className="w-3 h-3 text-white" />
                              <span>Time</span>
                            </div>
                            <div className="text-[11px] sm:text-sm font-bold text-white uppercase truncate">
                              {stargazingData.time}
                            </div>
                          </div>
                        </div>

                        {/* Description in Clean Typography */}
                        <p className="text-xs text-zinc-300 leading-relaxed mb-3">
                          {stargazingData.shortDesc}
                        </p>

                        {/* Perks */}
                        {stargazingData.perk && (
                          <div className="p-2 bg-zinc-950 border border-white/10 text-xs font-mono text-zinc-300 flex items-center gap-2 mb-3 rounded-sm">
                            <span className="text-white font-bold">&bull;</span>
                            <span className="truncate">{stargazingData.perk}</span>
                          </div>
                        )}

                        {/* CTA & Booking Button */}
                        <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
                          <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5">
                            <button
                              type="button"
                              onClick={() => {
                                setModalMode('book');
                                setIsModalOpen(true);
                              }}
                              className="w-full sm:w-auto px-6 py-2.5 bg-white text-black font-sans font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 shadow-lg"
                            >
                              <span>Book Your Slot</span>
                              <ArrowRight className="w-4 h-4" />
                            </button>
                            <span className="text-[10px] sm:text-[11px] font-mono text-zinc-500">
                              Lawn Circle &bull; Free Admission
                            </span>
                          </div>

                          {/* Just below Book Your Slot: View Your Slot */}
                          <button
                            type="button"
                            onClick={() => {
                              setModalMode('view');
                              setIsModalOpen(true);
                            }}
                            className="text-left text-[11px] font-mono text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-1.5 underline underline-offset-4"
                          >
                            <Search className="w-3 h-3 text-zinc-400" />
                            <span>Already booked? View / Download Your Slot Pass</span>
                          </button>
                        </div>

                      </div>
                    }
                  />
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Stargazing Slot Booking Modal */}
      <StargazingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialMode={modalMode}
      />
    </>
  );
}
