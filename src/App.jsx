import React from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import Features from './components/sections/Features';
import About from './components/sections/About';
import Footer from './components/layout/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <About />
      </main>
      <Footer />
    </div>
  );
}

export default App;