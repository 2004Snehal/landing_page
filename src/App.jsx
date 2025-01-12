import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import Features from './components/sections/Features';
import About from './components/sections/About';
import Footer from './components/layout/Footer';
import InternshipForm from './components/form/apply_form';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Routes>
        {/* Route for the main website */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <main>
                <Hero />
                <Features />
                <About />
              </main>
              <Footer />
            </>
          }
        />
        
        {/* Route for the internship form */}
        <Route path="/apply" element={<InternshipForm />} />
      </Routes>
    </div>
  );
}

export default App;
