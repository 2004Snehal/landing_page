import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import './App.css'
const Hero = lazy(() => import('./components/sections/Hero'));
const Features = lazy(() => import('./components/sections/Features'));
const About = lazy(() => import('./components/sections/About'));
const InternshipForm = lazy(() => import('./components/form/apply_form'));

const Loading = () => (
  <div className="flex items-center justify-center h-screen">
    <p className="text-lg text-gray-600">Loading...</p>
  </div>
);

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center">
    <h1 className="text-4xl font-bold text-red-600">404</h1>
    <p className="text-lg text-gray-700 mt-4">Page not found.</p>
  </div>
);

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <main>
                  <Hero />
                  <Features />
                  <About />
                </main>
              </>
            }
          />

          <Route path="/apply" element={<InternshipForm />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;
