import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, ArrowRight, ArrowUpRight, Zap, Sparkles } from 'lucide-react';
import { JetSketch, RocketSketch, DroneSketch } from './FloatingSketches';

export default function Hero({ isReady = true, onHeroComplete }) {
  const [activeDay, setActiveDay] = useState('all');

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

  const day1Events = [
    {
      time: '10:00 AM',
      venue: 'ROOM 220',
      title: 'Simulation Zero',
      collab: 'Aerocon x MATLAB',
      tagline: 'Code. Simulate. Fly.',
      desc: 'Flight simulation and dynamic control challenge. Optimize flight algorithms in MATLAB & Simulink with exciting rewards.',
      anchor: 'simulation-zero',
    },
    {
      time: '01:00 PM',
      venue: 'ROOM 217',
      title: 'Aerobid Wars',
      tagline: 'Bid. Build. Dominate.',
      desc: 'High-stakes aerospace component bidding war. Form your squad, bid strategically, assemble your craft, and battle.',
      anchor: 'aerobid-wars',
    },
    {
      time: '03:00 PM',
      venue: 'ROOM 219',
      title: 'Sky Breach',
      tagline: 'Design. Assemble. Launch.',
      desc: 'Rocketry design, payload integration, and high-altitude launch mission. Build your launch vehicle and pierce the sky.',
      anchor: 'sky-breach',
    },
    {
      time: '07:00 PM - 08:00 PM',
      venue: 'LAWN CIRCLE',
      title: 'Stargazing · Session I',
      tagline: 'Telescope Array Observation',
      desc: 'Guided night sky observation with high-powered astronomical telescopes. Observe lunar craters, Saturn, and star clusters.',
      isStargazing: true,
      bookingUrl: 'https://form.jotform.com/262655686665070',
      anchor: 'stargazing',
    },
  ];

  const day2Events = [
    {
      time: '10:00 AM',
      venue: 'ROOM 220',
      title: 'Twist and Fly',
      tagline: 'Wind. Release. Glide.',
      desc: 'Precision aeromodelling rubber-powered glider endurance contest. Maximize airtime glide with aerodynamic tuning.',
      anchor: 'twist-and-fly',
    },
    {
      time: '01:00 PM',
      venue: 'ROOM 217',
      title: 'AeroQuiz',
      tagline: 'Think. Compete. Conquer.',
      desc: 'Rapid-fire trivia and buzzer rounds on aircraft, space missions, rocketry milestones, and defense tech.',
      anchor: 'aeroquiz',
    },
    {
      time: '04:30 PM',
      venue: 'MAIN HALL',
      title: 'Valedictory & Prize Distribution',
      tagline: 'Celebration & Awards',
      desc: 'Announcement of winners, distribution of cash prizes, trophies, mementos, and the grand conclave closing ceremony.',
      isValedictory: true,
    },
    {
      time: '07:00 PM - 08:00 PM',
      venue: 'LAWN CIRCLE',
      title: 'Stargazing · Session II',
      tagline: 'Deep Sky Constellation Tour',
      desc: 'Final night telescope observation session. High-magnification planetary observation and astrophotography mounts provided.',
      isStargazing: true,
      bookingUrl: 'https://form.jotform.com/262655686665070',
      anchor: 'stargazing',
    },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-transparent text-white pt-20 pb-12 sm:pt-28 sm:pb-20 px-3.5 sm:px-6 lg:px-12 flex flex-col justify-between border-b border-white/10 overflow-hidden"
    >
      {/* Background Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      {/* Ambient Floating Sketches Framing the Edges */}
      <div className="absolute top-[12%] left-[4%] sm:left-[6%] opacity-[0.16] text-white pointer-events-none -rotate-[20deg] hidden md:block">
        <div style={{ animation: 'floatSway 14s ease-in-out infinite' }}>
          <JetSketch className="w-12 h-12 lg:w-14 lg:h-14" />
        </div>
      </div>
      <div className="absolute top-[14%] right-[4%] sm:right-[6%] opacity-[0.16] text-white pointer-events-none rotate-[20deg] hidden md:block">
        <div style={{ animation: 'floatDeep 14s ease-in-out infinite', animationDelay: '-4s' }}>
          <RocketSketch className="w-12 h-12 lg:w-14 lg:h-14" />
        </div>
      </div>
      <div className="absolute bottom-[8%] right-[5%] opacity-[0.14] text-white pointer-events-none rotate-[10deg] hidden lg:block">
        <div style={{ animation: 'floatSway 16s ease-in-out infinite', animationDelay: '-7s' }}>
          <DroneSketch className="w-14 h-14" />
        </div>
      </div>

      {/* ── TOP HEADER & COUNTDOWN ───────────────────────── */}
      <div className="relative z-10 max-w-6xl w-full mx-auto mb-6 sm:mb-10">
        
        {/* Sub-header Conclave Tag */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-white/10 mb-4 sm:mb-6 text-[10px] sm:text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-white dot-pulse" />
            <span className="uppercase tracking-[0.15em] sm:tracking-[0.2em] text-zinc-400 font-semibold">
              AeroSoc BIT Mesra Presents
            </span>
          </div>
          <div className="text-zinc-500 uppercase tracking-wider">
            3 Days &bull; 8 Sessions &bull; 25–27 Sep 2026
          </div>
        </div>

        {/* Hero Title & Countdown Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 sm:gap-6">
          <div>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-sans font-black tracking-tight text-white uppercase leading-[0.95]">
              Event Timeline
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-xl leading-relaxed">
              Complete schedule for national aerospace competitions, hands-on rocketry, autonomous drone swarms, and guided stargazing sessions.
            </p>
          </div>

          {/* Compact Countdown Clock (Full width on mobile, sleek dashboard style) */}
          <div className="w-full lg:w-auto bg-zinc-950/80 border border-white/10 rounded-sm p-3 sm:p-4 backdrop-blur-sm shadow-xl mt-1 lg:mt-0">
            <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-2 flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-white shrink-0" />
              <span className="truncate">Countdown to Inaugural Drone Show</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5 sm:flex sm:items-center sm:gap-3 font-mono text-center">
              <div className="p-1 sm:p-0 bg-white/[0.03] sm:bg-transparent rounded-sm">
                <span className="text-lg sm:text-2xl font-bold text-white tracking-tight">
                  {timeLeft.days}
                </span>
                <span className="block text-[8px] sm:text-[9px] text-zinc-500 uppercase tracking-widest">Days</span>
              </div>
              <span className="text-zinc-600 font-light text-base sm:text-lg -mt-3 hidden sm:inline">:</span>
              <div className="p-1 sm:p-0 bg-white/[0.03] sm:bg-transparent rounded-sm">
                <span className="text-lg sm:text-2xl font-bold text-white tracking-tight">
                  {timeLeft.hours}
                </span>
                <span className="block text-[8px] sm:text-[9px] text-zinc-500 uppercase tracking-widest">Hours</span>
              </div>
              <span className="text-zinc-600 font-light text-base sm:text-lg -mt-3 hidden sm:inline">:</span>
              <div className="p-1 sm:p-0 bg-white/[0.03] sm:bg-transparent rounded-sm">
                <span className="text-lg sm:text-2xl font-bold text-white tracking-tight">
                  {timeLeft.minutes}
                </span>
                <span className="block text-[8px] sm:text-[9px] text-zinc-500 uppercase tracking-widest">Mins</span>
              </div>
              <span className="text-zinc-600 font-light text-base sm:text-lg -mt-3 hidden sm:inline">:</span>
              <div className="p-1 sm:p-0 bg-white/[0.03] sm:bg-transparent rounded-sm">
                <span className="text-lg sm:text-2xl font-bold text-white tracking-tight">
                  {timeLeft.seconds}
                </span>
                <span className="block text-[8px] sm:text-[9px] text-zinc-500 uppercase tracking-widest">Secs</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── DAY FILTER BUTTONS (EDGE-TO-EDGE SWIPE ON MOBILE) ────────── */}
        <div className="flex items-center gap-2 mt-5 sm:mt-8 overflow-x-auto pb-2 -mx-3.5 px-3.5 sm:mx-0 sm:px-0 scrollbar-none touch-pan-x">
          {[
            { id: 'all', label: 'All Days' },
            { id: 'day0', label: 'Day 00 · 25 Sep' },
            { id: 'day1', label: 'Day 01 · 26 Sep' },
            { id: 'day2', label: 'Day 02 · 27 Sep' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveDay(tab.id)}
              className={`px-3.5 sm:px-4 py-2 sm:py-1.5 rounded-sm text-xs font-mono uppercase tracking-wider font-semibold transition-all whitespace-nowrap border shrink-0 min-h-[38px] flex items-center justify-center ${
                activeDay === tab.id
                  ? 'bg-white text-black border-white shadow-md'
                  : 'bg-zinc-900/80 text-zinc-400 border-white/10 hover:border-white/30 hover:text-white active:bg-zinc-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── MAIN TIMELINE CONTAINER ──────────────────────── */}
      <div className="relative z-10 max-w-6xl w-full mx-auto flex-1 flex flex-col gap-5 sm:gap-6">

        {/* ── DAY 00 FEATURED BANNER ──────────────────────── */}
        {(activeDay === 'all' || activeDay === 'day0') && (
          <div className="border border-white/20 bg-zinc-950/70 backdrop-blur-md relative overflow-hidden group hover:border-white/40 transition-all duration-300 rounded-sm">
            <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-white" />

            <div className="p-4 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 flex-1 min-w-0">
                {/* Day Badge & Date */}
                <div className="flex items-center gap-2.5 flex-shrink-0">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-1 bg-white text-black rounded-sm">
                    Day 00
                  </span>
                  <span className="text-xs font-mono text-zinc-400">25 Sep 2026</span>
                </div>

                <div className="hidden sm:block w-px h-8 bg-white/15 flex-shrink-0" />

                {/* Time & Venue */}
                <div className="flex items-center gap-2 flex-wrap font-mono text-xs">
                  <span className="px-2 py-0.5 bg-zinc-900 border border-white/10 text-zinc-300 rounded-sm flex items-center gap-1">
                    <Clock className="w-3 h-3 text-zinc-400" />
                    05:30 PM
                  </span>
                  <span className="px-2 py-0.5 bg-zinc-900 border border-white/10 text-white font-semibold rounded-sm flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-zinc-400" />
                    NCC Ground
                  </span>
                </div>

                <div className="hidden sm:block w-px h-8 bg-white/15 flex-shrink-0" />

                {/* Title & Desc */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white leading-none">
                      Drone Show
                    </h3>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                      Lights &bull; Formations &bull; Sky Spectacle
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                    Inaugural aerial drone light show. Precision swarms, light choreography, and synchronized formations illuminating the Ranchi evening sky.
                  </p>
                </div>
              </div>

              {/* Tag / Status / Actions */}
              <div className="flex items-center justify-between sm:justify-start gap-2 pt-3 border-t border-white/10 lg:border-0 lg:pt-0 shrink-0">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-zinc-900/90 border border-white/20 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-200 rounded-sm">
                  <Zap className="w-3.5 h-3.5 text-yellow-400" />
                  Inauguration
                </span>
                <a
                  href="#events"
                  className="px-3.5 py-1.5 bg-white text-black font-semibold text-xs rounded-sm hover:bg-zinc-200 transition-colors flex items-center gap-1"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ── DAY 01 & DAY 02 GRID ────────────────────────── */}
        <div
          className={`grid gap-5 sm:gap-6 ${
            activeDay === 'all'
              ? 'grid-cols-1 lg:grid-cols-2'
              : 'grid-cols-1'
          }`}
        >

          {/* DAY 01 COLUMN */}
          {(activeDay === 'all' || activeDay === 'day1') && (
            <div className="flex flex-col gap-3">
              {/* Day Header */}
              <div className="flex items-center justify-between pb-2 border-b-2 border-white">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white dot-pulse" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider px-2 py-0.5 bg-white text-black">
                    Day 01
                  </span>
                  <span className="text-xs font-mono text-zinc-300 font-semibold">Saturday, 26 Sep</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                  4 Sessions
                </span>
              </div>

              {/* Day 01 Event Cards */}
              <div className="flex flex-col gap-2.5">
                {day1Events.map((item, idx) => (
                  <TimelineCard key={idx} item={item} />
                ))}
              </div>
            </div>
          )}

          {/* DAY 02 COLUMN */}
          {(activeDay === 'all' || activeDay === 'day2') && (
            <div className="flex flex-col gap-3">
              {/* Day Header */}
              <div className="flex items-center justify-between pb-2 border-b-2 border-zinc-500">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-zinc-400" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider px-2 py-0.5 bg-zinc-800 text-zinc-200 border border-zinc-600">
                    Day 02
                  </span>
                  <span className="text-xs font-mono text-zinc-300 font-semibold">Sunday, 27 Sep</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                  4 Sessions
                </span>
              </div>

              {/* Day 02 Event Cards */}
              <div className="flex flex-col gap-2.5">
                {day2Events.map((item, idx) => (
                  <TimelineCard key={idx} item={item} />
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* ── BOTTOM BAR STRIP ─────────────────────────────── */}
      <div className="relative z-10 max-w-6xl w-full mx-auto mt-8 sm:mt-10 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-zinc-500">
        <div className="uppercase tracking-widest text-[10px] sm:text-[11px] text-center sm:text-left">
          AEROSOC &bull; BIT MESRA &bull; AEROCON 2026
        </div>
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center">
          <a
            href="https://form.jotform.com/262655686665070"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:underline flex items-center gap-1 font-semibold"
          >
            <span>Book Stargazing Slot</span>
            <ArrowUpRight className="w-3 h-3 text-white" />
          </a>
          <span className="text-zinc-700 hidden sm:inline">&bull;</span>
          <a
            href="#events"
            className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
          >
            <span>Explore All Event Cards</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </section>
  );
}

function TimelineCard({ item }) {
  return (
    <div className="group relative bg-zinc-950/60 hover:bg-zinc-900/60 border border-white/10 hover:border-white/25 transition-all duration-300 rounded-sm p-3.5 sm:p-4 flex flex-col justify-between">
      {/* Top Metadata Row */}
      <div>
        <div className="flex items-center justify-between gap-1.5 mb-2 flex-wrap">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-mono text-zinc-300 bg-zinc-900 border border-white/10 px-2 py-0.5 rounded-sm">
              {item.time}
            </span>
            {item.collab && (
              <span className="text-[9px] font-mono text-emerald-400 font-semibold bg-emerald-950/40 border border-emerald-500/20 px-1.5 py-0.5 rounded-sm">
                {item.collab}
              </span>
            )}
            {item.isValedictory && (
              <span className="text-[9px] font-mono text-amber-300 font-semibold bg-amber-950/40 border border-amber-500/20 px-1.5 py-0.5 rounded-sm">
                Ceremony
              </span>
            )}
          </div>
          <span className="text-[10px] font-mono font-semibold text-zinc-300 bg-zinc-900/80 border border-white/10 px-2 py-0.5 rounded-sm flex items-center gap-1 shrink-0">
            <MapPin className="w-2.5 h-2.5 text-zinc-400" />
            {item.venue}
          </span>
        </div>

        {/* Title and Tagline */}
        <h4 className="text-lg sm:text-xl font-black uppercase tracking-tight text-white group-hover:text-zinc-100 transition-colors leading-tight">
          {item.title}
        </h4>
        <p className="text-[10px] sm:text-[11px] font-mono text-zinc-500 uppercase tracking-wider mt-0.5">
          {item.tagline}
        </p>

        {/* Description */}
        <p className="text-xs text-zinc-400 leading-relaxed mt-1.5">
          {item.desc}
        </p>
      </div>

      {/* Action CTA if Stargazing or Event Card */}
      <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between gap-2">
        {item.isStargazing ? (
          <div className="flex items-center justify-between w-full gap-2">
            <span className="text-[10px] sm:text-xs font-mono text-emerald-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3 shrink-0" /> Free Admission
            </span>
            <a
              href={item.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-white text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 active:bg-zinc-300 transition-colors rounded-sm flex items-center gap-1 shadow-sm shrink-0"
            >
              <span>Book Slot</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        ) : (
          <div className="flex items-center justify-end w-full">
            {item.anchor && (
              <a
                href={`#${item.anchor}`}
                className="text-xs font-mono text-zinc-400 hover:text-white transition-colors flex items-center gap-1 py-1"
              >
                <span>View Details</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
