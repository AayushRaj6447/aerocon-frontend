import React from 'react';
import FadeContent from './FadeContent';

export default function MainHero({ onComplete }) {
  return (
    <div
      className="w-full h-full relative flex items-center justify-center text-center p-4 select-none"
      style={{ width: '100%', height: '100%', background: 'transparent' }}
    >
      <FadeContent
        blur={true}
        duration={1200}
        ease="power2.out"
        initialOpacity={0}
        onComplete={onComplete}
        className="flex flex-col items-center justify-center max-w-5xl mx-auto"
      >

        <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-black tracking-tight text-white uppercase leading-none drop-shadow-2xl">
          AEROCON
        </h1>
        <div className="mt-4 flex items-center justify-center gap-3 text-xs sm:text-sm font-mono text-zinc-400 tracking-widest uppercase">
          <span>25-27 SEPT 2026</span>
          <span className="text-zinc-600">&bull;</span>
          <span>BIT MESRA</span>
        </div>
      </FadeContent>
    </div>
  );
}
