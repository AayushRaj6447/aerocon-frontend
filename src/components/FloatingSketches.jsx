import React from 'react';

/**
 * 2D White Outline Technical Blueprint Sketches
 * - Rocket
 * - Drone (Quadcopter)
 * - Jet (Fighter / Supersonic)
 * 
 * Rendered with very low opacity, small size, and floating gently in the background across the site.
 */

export const RocketSketch = ({ className = 'w-9 h-9' }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Nose Cone & Main Fuselage */}
    <path d="M24 4 C24 4 19 14 19 28 L29 28 C29 14 24 4 24 4 Z" />
    
    {/* Porthole / Crew Window */}
    <circle cx="24" cy="17" r="2.8" strokeWidth="1.2" />
    <circle cx="24" cy="17" r="1" fill="currentColor" opacity="0.8" />

    {/* Stage Separation Line */}
    <line x1="19" y1="23" x2="29" y2="23" strokeWidth="1.2" strokeDasharray="1.5 1.5" />

    {/* Left Delta Fin */}
    <path d="M19 25 L12 33 L19 32 Z" />
    
    {/* Right Delta Fin */}
    <path d="M29 25 L36 33 L29 32 Z" />

    {/* Center Fin / Spine */}
    <line x1="24" y1="26" x2="24" y2="33" strokeWidth="1.2" />

    {/* Engine Bell / Nozzle */}
    <path d="M21 32 L19.5 36 L28.5 36 L27 32 Z" />

    {/* Exhaust Trajectory Particles / Thrust plume */}
    <line x1="24" y1="38" x2="24" y2="44" strokeWidth="1.2" strokeDasharray="2 2" />
    <line x1="21" y1="38" x2="19.5" y2="42" strokeWidth="1.1" strokeDasharray="1.5 1.5" />
    <line x1="27" y1="38" x2="28.5" y2="42" strokeWidth="1.1" strokeDasharray="1.5 1.5" />
  </svg>
);

export const DroneSketch = ({ className = 'w-9 h-9' }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Central Fuselage Hub */}
    <rect x="20" y="20" width="8" height="8" rx="2" strokeWidth="1.4" />
    {/* Center Sensor / Lens */}
    <circle cx="24" cy="24" r="2" strokeWidth="1.2" />

    {/* 4 Diagonal Boom Arms */}
    <line x1="20" y1="20" x2="12" y2="12" strokeWidth="1.5" />
    <line x1="28" y1="20" x2="36" y2="12" strokeWidth="1.5" />
    <line x1="20" y1="28" x2="12" y2="36" strokeWidth="1.5" />
    <line x1="28" y1="28" x2="36" y2="36" strokeWidth="1.5" />

    {/* Motor Nacelles */}
    <circle cx="12" cy="12" r="2.2" strokeWidth="1.2" />
    <circle cx="36" cy="12" r="2.2" strokeWidth="1.2" />
    <circle cx="12" cy="36" r="2.2" strokeWidth="1.2" />
    <circle cx="36" cy="36" r="2.2" strokeWidth="1.2" />

    {/* Rotor Blades / Guard Arcs */}
    {/* Top Left Rotor */}
    <ellipse cx="12" cy="12" rx="6.5" ry="2.5" transform="rotate(-30 12 12)" strokeWidth="1.2" />
    {/* Top Right Rotor */}
    <ellipse cx="36" cy="12" rx="6.5" ry="2.5" transform="rotate(30 36 12)" strokeWidth="1.2" />
    {/* Bottom Left Rotor */}
    <ellipse cx="12" cy="36" rx="6.5" ry="2.5" transform="rotate(30 12 36)" strokeWidth="1.2" />
    {/* Bottom Right Rotor */}
    <ellipse cx="36" cy="36" rx="6.5" ry="2.5" transform="rotate(-30 36 36)" strokeWidth="1.2" />
  </svg>
);

export const JetSketch = ({ className = 'w-9 h-9' }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Aircraft Airframe Silhouette */}
    <path d="M24 3 L21 16 L6 27 L6 30 L21 26 L21 36 L16 40 L16 42 L23 40.5 L24 41.5 L25 40.5 L32 42 L32 40 L27 36 L27 26 L42 30 L42 27 L27 16 L24 3 Z" />
    
    {/* Cockpit Canopy */}
    <path d="M23 12 Q24 10 25 12 L25 18 Q24 19 23 18 Z" strokeWidth="1.2" />

    {/* Wing Panel / Aileron Detail Lines */}
    <line x1="12" y1="27" x2="21" y2="25" strokeWidth="1.1" strokeDasharray="1.5 1.5" />
    <line x1="36" y1="27" x2="27" y2="25" strokeWidth="1.1" strokeDasharray="1.5 1.5" />

    {/* Twin Vertical Stabilizers */}
    <line x1="20" y1="30" x2="19" y2="38" strokeWidth="1.2" />
    <line x1="28" y1="30" x2="29" y2="38" strokeWidth="1.2" />

    {/* Twin Exhaust Nozzles */}
    <line x1="22.5" y1="41" x2="22.5" y2="44" strokeWidth="1.1" strokeDasharray="1.5 1.5" />
    <line x1="25.5" y1="41" x2="25.5" y2="44" strokeWidth="1.1" strokeDasharray="1.5 1.5" />
  </svg>
);

export default function FloatingSketches() {
  const items = [
    {
      type: 'drone',
      pos: 'top-[34%] right-[12%] rotate-[10deg]',
      size: 'w-11 h-11 sm:w-13 sm:h-13',
      anim: 'floatDriftZone 16s ease-in-out infinite',
      delay: '-4s',
    },
    {
      type: 'jet',
      pos: 'top-[48%] left-[7%] rotate-[38deg]',
      size: 'w-10 h-10 sm:w-12 sm:h-12',
      anim: 'floatSway 12s ease-in-out infinite',
      delay: '-9s',
    },
    {
      type: 'rocket',
      pos: 'top-[62%] right-[7%] -rotate-[22deg]',
      size: 'w-10 h-10 sm:w-12 sm:h-12',
      anim: 'floatDeep 11s ease-in-out infinite',
      delay: '-2s',
    },
    {
      type: 'drone',
      pos: 'top-[75%] left-[6%] -rotate-[14deg]',
      size: 'w-11 h-11 sm:w-13 sm:h-13',
      anim: 'floatDriftZone 15s ease-in-out infinite',
      delay: '-11s',
    },
    {
      type: 'jet',
      pos: 'top-[87%] right-[10%] rotate-[15deg]',
      size: 'w-10 h-10 sm:w-12 sm:h-12',
      anim: 'floatSway 14s ease-in-out infinite',
      delay: '-6s',
    },
    {
      type: 'rocket',
      pos: 'top-[94%] left-[8%] rotate-[26deg]',
      size: 'w-10 h-10 sm:w-12 sm:h-12',
      anim: 'floatDeep 12s ease-in-out infinite',
      delay: '-8s',
    },
    {
      type: 'drone',
      pos: 'top-[42%] right-[4%] rotate-[6deg]',
      size: 'w-10 h-10 sm:w-12 sm:h-12',
      anim: 'floatSway 15s ease-in-out infinite',
      delay: '-5s',
    },
  ];

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {items.map((item, index) => {
        let Icon = JetSketch;
        if (item.type === 'rocket') Icon = RocketSketch;
        if (item.type === 'drone') Icon = DroneSketch;

        return (
          <div
            key={index}
            className={`absolute ${item.pos} opacity-[0.23] text-white pointer-events-none will-change-transform`}
          >
            <div
              style={{
                animation: item.anim,
                animationDelay: item.delay,
              }}
            >
              <Icon className={item.size} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

