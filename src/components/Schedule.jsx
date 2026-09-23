import React, { useState } from 'react';
import { Clock, MapPin, Calendar } from 'lucide-react';
import { scheduleData } from '../data/scheduleData';

export default function Schedule() {
  const [activeDay, setActiveDay] = useState('day0');

  const days = [
    { key: 'day0', label: 'Day 00', date: '25.09.2026' },
    { key: 'day1', label: 'Day 01', date: '26.09.2026' },
    { key: 'day2', label: 'Day 02', date: '27.09.2026' },
  ];

  const currentSchedule = scheduleData[activeDay];

  return (
    <section id="schedule" className="py-20 bg-transparent border-b border-white/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Simple Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 block mb-2">
            TIMELINE // 25, 26 & 27 SEPT 2026
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Event Schedule.
          </h2>
        </div>

        {/* Day Switcher */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
          {days.map((day) => (
            <button
              key={day.key}
              onClick={() => setActiveDay(day.key)}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 font-mono text-xs sm:text-sm uppercase font-bold tracking-wider border transition-colors ${
                activeDay === day.key
                  ? 'bg-white text-black border-white'
                  : 'bg-zinc-900 text-zinc-400 border-white/15 hover:border-white/40'
              }`}
            >
              {day.label} &bull; {day.date}
            </button>
          ))}
        </div>

        {/* Schedule List */}
        <div className="bg-zinc-900/40 border border-white/10 divide-y divide-white/10 shadow-sm">
          {currentSchedule.items.map((item, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 group hover:bg-zinc-900/70 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 bg-zinc-800 text-white border border-white/15">
                    {item.time}
                  </span>
                  {item.collab && (
                    <span className="text-[10px] font-mono text-zinc-400 font-semibold">
                      {item.collab}
                    </span>
                  )}
                </div>
                <h4 className="text-xl font-bold text-white group-hover:text-zinc-200 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs font-mono text-zinc-400 font-semibold">{item.tagline}</p>
                <p className="text-xs sm:text-sm text-zinc-400 max-w-lg">{item.desc}</p>
              </div>

              <div className="sm:text-right shrink-0">
                <div className="inline-flex sm:flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800/80 border border-white/10 text-xs font-mono text-white font-semibold">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{item.venue}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
