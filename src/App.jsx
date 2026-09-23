import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Events from './components/Events';
import Schedule from './components/Schedule';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import FloatingSketches from './components/FloatingSketches';
import { prefetchSlots } from './services/slotService';

export default function App() {
  // Wake up Render server & pre-fetch slots as soon as the site begins loading
  useEffect(() => {
    prefetchSlots().catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans selection:bg-white selection:text-black relative">
      <FloatingSketches />
      <Navbar visible={true} />
      <main className="relative z-10">
        <Hero />
        <Events />
        <About />
        <Schedule />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
