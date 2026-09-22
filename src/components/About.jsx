import React from 'react';
import { Plane, Cpu, Rocket } from 'lucide-react';

export default function About() {
  const highlights = [
    {
      icon: Cpu,
      title: 'Code & Simulate',
      desc: 'High-fidelity flight control algorithms, MATLAB modeling, and system simulations.'
    },
    {
      icon: Rocket,
      title: 'Assemble & Launch',
      desc: 'High-power rocketry, component auctions, and payload deployment missions.'
    },
    {
      icon: Plane,
      title: 'Glide & Compete',
      desc: 'Aeromodelling endurance, aerodynamic gliders, and national aviation trivia.'
    }
  ];

  return (
    <section id="about" className="py-24 bg-transparent border-b border-white/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Concise Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 block mb-2">
            ABOUT AEROCON & AEROSOC
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            From Blueprint to Flight.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-3">
            AEROCON is the flagship event organized by <strong>AeroSoc</strong> (The Aerospace Society), bringing together student innovators to compete in flight design, rocketry, simulation, and aero-strategy.
          </p>
        </div>

        {/* 3 Simple Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-zinc-900/50 p-6 border border-white/10 shadow-sm hover:border-white/30 transition-colors"
              >
                <div className="w-10 h-10 bg-white text-black flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1.5">{item.title}</h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
