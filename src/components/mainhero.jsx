import React from 'react';
import ParticleText from './ParticleText';
import './mainhero.css';

export default function MainHero({ onComplete }) {
  return (
    <div
      className="w-full h-full relative flex items-center justify-center"
      style={{ width: '100%', height: '100%', background: 'transparent' }}
    >
      <ParticleText
        text="AEROCON"
        particleSize={2.5}
        density={2}
        color="#ffffff"
        highlightColor="#ffffff"
        scatter={400}
        gatherDuration={2800}
        stagger={600}
        pointerRepel={50}
        repelRadius={150}
        idleDrift={0.6}
        trigger="mount"
        fontSize="clamp(5rem, 18vw, 14rem)"
        fontWeight={900}
        fontFamily="inherit"
        glow={false}
        onComplete={onComplete}
      />
    </div>
  );
}
