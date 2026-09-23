import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';
import MainHero from './mainhero';
import FlipCard from './FlipCard';
import { RocketSketch, DroneSketch, JetSketch } from './FloatingSketches';
import { stargazingData } from '../data/eventsData';

export default function Hero({ isReady = false, onHeroComplete }) {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const day0 = scheduleData.day0;
  const day1 = scheduleData.day1;
  const day2 = scheduleData.day2;
  const featuredEvent = day0.items[0]; // Drone Show — only event on Day 00

  return (
    <>
      <section
        id="hero"
        className="relative h-screen min-h-[640px] bg-transparent text-white overflow-hidden border-b border-white/10 flex flex-col"
      >
        {/* Background grid */}
        <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-50" />

        {/* Scan line */}
        <div
          className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none"
          style={{ animation: 'scanLine 8s linear infinite', top: 0 }}
        />

        {/* ── HEADER LABEL ──────────────────────────── */}
        <div
          className="relative z-10 px-6 sm:px-10 lg:px-16 pt-20 pb-3 flex items-center gap-3 flex-shrink-0 timeline-header-enter"
          style={{ animationDelay: '0ms' }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-white dot-pulse flex-shrink-0" />
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-white font-semibold">
            Full Event Timeline
          </span>
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-[10px] font-mono text-zinc-500 tracking-widest hidden sm:block">
            3 DAYS · 7 EVENTS · BIT MESRA
          </span>
        </div>

        {/* ── MAIN CONTENT AREA ─────────────────────── */}
        <div className="relative z-10 flex-1 px-6 sm:px-10 lg:px-16 pb-5 overflow-hidden flex flex-col gap-3">

          {/* ── ROW 1: DAY 00 FEATURED BANNER ──────── */}
          <div
            className="timeline-enter flex-shrink-0"
            style={{ animationDelay: '80ms' }}
          >
            <div className="border border-white/15 bg-white/[0.03] relative overflow-hidden group hover:border-white/30 hover:bg-white/[0.06] transition-all duration-300">
              {/* Left accent — thicker for featured */}
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-white" />

              <div className="pl-5 pr-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4">
                {/* Day badge + date */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-white dot-pulse" />
                    <span className="text-[11px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 bg-white text-black border border-white">
                      Day 00
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 tracking-wider">25 Sep 2026</span>
                </div>

                {/* Divider */}
                <div className="hidden sm:block w-px h-8 bg-white/15 flex-shrink-0" />

                {/* Time + Venue */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900 border border-white/10 px-2 py-0.5">
                    {featuredEvent.time}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-zinc-200 bg-zinc-900 border border-white/10 px-2 py-0.5">
                    {featuredEvent.venue}
                  </span>
                </div>

                {/* Divider */}
                <div className="hidden sm:block w-px h-8 bg-white/15 flex-shrink-0" />

                {/* Event info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white leading-none">
                      {featuredEvent.title}
                    </h3>
                    <span className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase">
                      {featuredEvent.tagline}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1.5 max-w-xl leading-relaxed">
                    {featuredEvent.desc}
                  </p>
                </div>

                {/* Inauguration tag */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 border border-white/20 text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-300 flex-shrink-0">
                  <Zap className="w-3 h-3 text-yellow-400" />
                  Inauguration
                </div>
              </div>
            </div>
          </div>

          {/* ── ROW 2: DAY 01 + DAY 02 COLUMNS ──────── */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 overflow-hidden min-h-0">

            {/* DAY 01 */}
            <div
              className="timeline-enter flex flex-col overflow-hidden min-h-0"
              style={{ animationDelay: '160ms' }}
            >
              {/* Day 01 header */}
              <div className="flex items-center justify-between mb-2 flex-shrink-0 border-t-2 border-white pt-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white dot-pulse" style={{ animationDelay: '600ms' }} />
                  <span className="text-[11px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 bg-white text-black border border-white">
                    Day 01
                  </span>
                </div>
                <span className="text-[10px] font-mono text-zinc-500 tracking-wider">26 Sep 2026</span>
              </div>

              {/* Day 01 events */}
              <div className="flex-1 flex flex-col gap-2 min-h-0 overflow-hidden">
                {day1.items.map((item, iIdx) => (
                  <DayEventCard
                    key={iIdx}
                    item={item}
                    delay={240 + iIdx * 60}
                    barCls="bg-white/30 group-hover:bg-white"
                    isStargazing={item.title === 'STARGAZING'}
                    onBook={() => { setModalMode('book'); setIsModalOpen(true); }}
                    onView={() => { setModalMode('view'); setIsModalOpen(true); }}
                  />
                ))}
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

              {/* LEFT SIDE: Name written separately on the left side */}
              <div className="flex-1 max-w-lg lg:max-w-xl flex flex-col justify-center select-text">
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <span className="text-[10px] sm:text-[11px] font-mono tracking-wider px-2.5 py-1 bg-white text-black font-semibold">
                    Night Sky Observation
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-mono text-zinc-400 tracking-wider">
                    Special Night Event
                  </span>
                </div>

                <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-sans font-black tracking-tight text-white leading-[0.95] mb-2 sm:mb-3">
                  Stargazing
                </h2>

                <p className="text-xs sm:text-sm text-zinc-400 tracking-wide max-w-md leading-relaxed">
                  Peer deep into the cosmos through high-powered astronomical telescopes under guided constellation tours.
                </p>
              </div>

              {/* RIGHT SIDE: The Card (Clean, uncluttered, normal casing) */}
              <div className="flex-shrink-0 w-full sm:w-auto flex justify-center items-center select-text">
                <div className="w-full max-w-[480px] sm:w-[460px] lg:w-[480px] min-h-[415px]">
                  <FlipCard
                    className="w-full h-full"
                    width="100%"
                    height={415}
                    radius={16}
                    tilt={false}
                    tiltMax={10}
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
                    front={
                      <div className="w-full h-full bg-[#0e0e12] p-5 sm:p-7 shadow-2xl relative flex flex-col justify-between rounded-[inherit]">

                        {/* Card Header */}
                        <div className="flex items-center justify-between pb-2.5 border-b border-white/10 mb-3.5">
                          <span className="text-[11px] font-mono text-zinc-400 font-medium">
                            Telescope Array Specification
                          </span>
                          <span className="text-[11px] font-mono text-zinc-500">
                            Aerocon 2026
                          </span>
                        </div>

                        {/* Metadata Grid (Venue, Date, Time) - Normal Casing */}
                        <div className="grid grid-cols-3 gap-2.5 font-mono text-xs mb-3.5">
                          <div className="p-2.5 bg-zinc-950 border border-white/10 rounded-sm">
                            <div className="flex items-center gap-1 text-zinc-400 text-[10px] mb-0.5">
                              <MapPin className="w-3 h-3 text-white" />
                              <span>Venue</span>
                            </div>
                            <div className="text-[11px] sm:text-xs font-semibold text-white truncate">
                              {stargazingData.venue}
                            </div>
                          </div>

                          <div className="p-2.5 bg-zinc-950 border border-white/10 rounded-sm">
                            <div className="flex items-center gap-1 text-zinc-400 text-[10px] mb-0.5">
                              <Calendar className="w-3.5 h-3.5 text-white" />
                              <span>Date</span>
                            </div>
                            <div className="text-[11px] sm:text-xs font-semibold text-white truncate">
                              {stargazingData.date}
                            </div>
                          </div>

                          <div className="p-2.5 bg-zinc-950 border border-white/10 rounded-sm">
                            <div className="flex items-center gap-1 text-zinc-400 text-[10px] mb-0.5">
                              <Clock className="w-3 h-3 text-white" />
                              <span>Time</span>
                            </div>
                            <div className="text-[11px] sm:text-xs font-semibold text-white truncate">
                              {stargazingData.time}
                            </div>
                          </div>
                        </div>

                        {/* Description in Clean Typography */}
                        <p className="text-xs text-zinc-300 leading-relaxed mb-3">
                          Guided night sky observation with high-powered astronomical telescopes. Observe lunar craters, Saturn's planetary rings, Jupiter's Galilean moons, and deep-sky star clusters.
                        </p>

                        {/* Perks */}
                        {stargazingData.perk && (
                          <div className="p-2 bg-zinc-950 border border-white/10 text-xs font-mono text-zinc-300 flex items-center gap-2 mb-3.5 rounded-sm">
                            <span className="text-emerald-400 font-bold">&bull;</span>
                            <span className="truncate">{stargazingData.perk}</span>
                          </div>
                        )}

                        {/* CTA & Booking Button */}
                        <div className="pt-3.5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                          <a
                            href="https://form.jotform.com/262655686665070"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto px-6 py-2.5 bg-white text-black font-semibold text-xs rounded-sm hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 shadow-lg"
                          >
                            <span>Book Your Slot</span>
                            <ArrowRight className="w-4 h-4" />
                          </a>
                          <span className="text-[11px] font-mono text-zinc-400">
                            Lawn Circle &bull; Free Admission
                          </span>
                        </div>

                      </div>
                    }
                  />
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ── BOTTOM STRIP ─────────────────────────── */}
        <div
          className="relative z-10 px-6 sm:px-10 lg:px-16 py-2.5 border-t border-white/8 flex items-center justify-between flex-shrink-0 timeline-header-enter"
          style={{ animationDelay: '480ms' }}
        >
          <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">
            AEROSOC · BIT MESRA · AEROCON 2026
          </span>
          <a
            href="#events"
            className="text-[9px] font-mono text-zinc-500 hover:text-white transition-colors uppercase tracking-widest flex items-center gap-1"
          >
            See Event Cards <ArrowRight className="w-2.5 h-2.5" />
          </a>
        </div>
      </section>
    </>
  );
}

function DayEventCard({ item, delay, barCls, isStargazing, onBook, onView }) {
  const isClosing = item.title?.toLowerCase().includes('valedictory');
  return (
    <div
      className="timeline-enter group relative flex-1 min-h-0"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Left accent bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-[3px] transition-colors duration-300 ${barCls}`} />

      <div className="pl-4 pr-3 py-2.5 h-full flex flex-col justify-between border border-white/10 group-hover:border-white/25 bg-white/[0.02] group-hover:bg-white/[0.05] transition-all duration-300">
        {/* Top */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900 border border-white/8 px-1.5 py-0.5 leading-none">
                {item.time}
              </span>
              {item.collab && (
                <span className="text-[9px] font-mono text-zinc-600">{item.collab}</span>
              )}
            </div>
            <span className="text-[10px] font-mono font-bold text-zinc-300 bg-zinc-900 border border-white/8 px-2 py-0.5 leading-none flex-shrink-0">
              {item.venue}
            </span>
          </div>

          <h3 className={`font-black uppercase leading-none tracking-tight text-white group-hover:text-zinc-100 transition-colors ${isClosing ? 'text-base' : 'text-xl sm:text-2xl'}`}>
            {item.title}
          </h3>
          <p className="text-[10px] font-mono text-zinc-600 tracking-widest uppercase mt-1">
            {item.tagline}
          </p>
        </div>

        {/* Bottom */}
        <div className="mt-1.5">
          <p className="text-[11px] text-zinc-500 leading-relaxed line-clamp-1">
            {item.desc}
          </p>
          {isStargazing && (
            <div className="mt-1.5 flex items-center gap-2">
              <button type="button" onClick={onBook}
                className="inline-flex items-center gap-1 px-2 py-0.5 bg-white text-black font-mono font-bold text-[9px] uppercase tracking-wider hover:bg-zinc-200 transition-colors">
                Book Slot <ArrowRight className="w-2 h-2" />
              </button>
              <button type="button" onClick={onView}
                className="inline-flex items-center gap-1 text-[9px] font-mono text-zinc-500 hover:text-white transition-colors underline underline-offset-2">
                <Search className="w-2 h-2" /> View
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
