import React, { useState } from 'react';
import { ArrowRight, Search, Zap } from 'lucide-react';
import { scheduleData } from '../data/scheduleData';
import StargazingModal from './StargazingModal';

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('book');

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

            {/* DAY 02 */}
            <div
              className="timeline-enter flex flex-col overflow-hidden min-h-0"
              style={{ animationDelay: '220ms' }}
            >
              {/* Day 02 header */}
              <div className="flex items-center justify-between mb-2 flex-shrink-0 border-t-2 border-zinc-600 pt-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-zinc-400 dot-pulse" style={{ animationDelay: '900ms' }} />
                  <span className="text-[11px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 bg-zinc-800 text-zinc-200 border border-zinc-600">
                    Day 02
                  </span>
                </div>
                <span className="text-[10px] font-mono text-zinc-500 tracking-wider">27 Sep 2026</span>
              </div>

              {/* Day 02 events */}
              <div className="flex-1 flex flex-col gap-2 min-h-0 overflow-hidden">
                {day2.items.map((item, iIdx) => (
                  <DayEventCard
                    key={iIdx}
                    item={item}
                    delay={300 + iIdx * 60}
                    barCls="bg-zinc-600 group-hover:bg-zinc-300"
                    isStargazing={item.title === 'STARGAZING'}
                    onBook={() => { setModalMode('book'); setIsModalOpen(true); }}
                    onView={() => { setModalMode('view'); setIsModalOpen(true); }}
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

      <StargazingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialMode={modalMode}
      />
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
