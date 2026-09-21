import React from 'react';
import { Shield, Compass, Award, ExternalLink } from 'lucide-react';

export default function Sponsors() {
  const sponsors = [
    { tier: 'Title Partner', name: 'AeroDynamics Propulsion Labs', category: 'Rocketry & CFD' },
    { tier: 'Powered By', name: 'Vortex UAV Systems', category: 'Autonomous Flight' },
    { tier: 'Associate Partner', name: 'SpaceForge Materials', category: 'Aerospace Alloys' },
    { tier: 'Technical Society', name: 'National Aeronautics Forum', category: 'Symposium & Papers' },
    { tier: 'Flight Arena Partner', name: 'SkyPulse Drone League', category: 'FPV Arena' },
    { tier: 'Tooling Partner', name: 'SimuFlight CAD Solutions', category: 'Generative Design' },
  ];

  return (
    <section className="py-20 bg-zinc-50 border-b border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 text-xs font-mono tracking-widest text-zinc-500 uppercase mb-2">
            <Compass className="w-3.5 h-3.5 text-black" />
            <span>INDUSTRY & ALLIANCES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-black">
            Backed By Aerospace Pioneers.
          </h2>
          <p className="text-sm text-zinc-600 mt-2">
            Proudly supported by leading organizations advancing aeronautics, defense technology, and space exploration.
          </p>
        </div>

        {/* Sponsor Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {sponsors.map((s, idx) => (
            <div
              key={idx}
              className="bg-white p-5 border border-black/15 hover:border-black transition-all duration-200 text-center flex flex-col justify-between group shadow-sm"
            >
              <div className="text-[9px] font-mono uppercase text-zinc-400 mb-3 tracking-wider">
                {s.tier}
              </div>
              <div className="py-2">
                <h4 className="text-sm font-bold text-black group-hover:text-zinc-800 transition-colors leading-snug">
                  {s.name}
                </h4>
              </div>
              <div className="mt-3 pt-2 border-t border-zinc-100 text-[10px] font-mono text-zinc-500">
                {s.category}
              </div>
            </div>
          ))}
        </div>

        {/* Call to sponsor */}
        <div className="mt-12 p-6 bg-white border border-black/15 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-3xl mx-auto">
          <div>
            <h4 className="text-base font-bold text-black">Interested in sponsoring AEROCON 2026?</h4>
            <p className="text-xs text-zinc-600 mt-0.5">Partner with AeroSoc to scout top aerospace talent and showcase your cutting-edge flight technologies.</p>
          </div>
          <a
            href="mailto:partners@aerosoc.org"
            className="px-5 py-2.5 bg-black text-white text-xs font-mono uppercase font-semibold hover:bg-zinc-800 transition-colors whitespace-nowrap"
          >
            Sponsorship Brochure
          </a>
        </div>
      </div>
    </section>
  );
}

