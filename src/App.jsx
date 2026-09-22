import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Events from './components/Events';
import Schedule from './components/Schedule';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

export default function App() {
  const [heroReady, setHeroReady] = useState(false);

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans selection:bg-white selection:text-black">
      <Navbar visible={heroReady} />
      <main>
        <Hero isReady={heroReady} onHeroComplete={() => setHeroReady(true)} />
        <Events />
        <About />
        <Schedule />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
