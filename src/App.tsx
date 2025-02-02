import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Tokenomics } from './components/Tokenomics';
import { Roadmap } from './components/Roadmap';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f1729] to-[#0f1729] text-white">
      <Header />
      <Hero />
      <Features />
      <Tokenomics />
      <Roadmap />
      <Footer />
    </div>
  );
}

export default App;