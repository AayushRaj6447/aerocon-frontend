import React from 'react';
import { Compass, ExternalLink } from 'lucide-react';
import { speakersData } from '../data/speakersData';

export default function Speakers() {
  return (
    <section id="speakers" className="py-24 bg-white border-b border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-black/10 pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-zinc-500 uppercase mb-2">
              <Compass className="w-3.5 h-3.5 text-black" />
              <span>KEYNOTE VOICES // JURY OF AEROCON</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-black">
              Distinguished Speakers & Mentors.
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-zinc-600 mt-4 md:mt-0 font-normal">
            Gain direct insights from space veterans, defense aviators, and deep-tech aerospace founders guiding the next generation of engineers.
          </p>
        </div>

        {/* Speakers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {speakersData.map((speaker) => (
            <div
              key={speaker.id}
              className="bg-white border border-black/15 flex flex-col justify-between shadow-sm"
            >
              <div>
                {/* Speaker Image */}
                <div className="relative aspect-square overflow-hidden bg-zinc-100 border-b border-black/10">
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-full h-full object-cover grayscale contrast-125 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-xs text-white font-mono">{speaker.bio}</span>
                  </div>
                </div>

                {/* Speaker Info */}
                <div className="p-6">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-1">
                    {speaker.affiliation}
                  </span>
                  <h3 className="text-xl font-bold text-black mb-1 group-hover:text-zinc-800 transition-colors">
                    {speaker.name}
                  </h3>
                  <p className="text-xs font-mono text-zinc-600 mb-4">
                    {speaker.role}
                  </p>
                  
                  <div className="p-3 bg-zinc-50 border border-zinc-200">
                    <span className="text-[9px] font-mono uppercase text-zinc-400 block mb-0.5">Keynote Topic</span>
                    <p className="text-xs font-medium text-zinc-800 leading-snug">
                      "{speaker.topic}"
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-0">
                <div className="pt-4 border-t border-zinc-100 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                  <span>AEROCON 2026 GUEST</span>
                  <span className="text-black font-semibold">CONFIRMED</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

