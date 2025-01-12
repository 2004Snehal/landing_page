import React, { useState } from 'react';
import hodosLogo from '../../assets/HODOS (1).png';
import ContactForm from '../form/contact'; // Import the ContactForm component

const Navbar = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Function to toggle the visibility of the demo form
  const handleRequestDemoClick = () => {
    setIsFormVisible(true);
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
  };

  return (
    <div>
      <nav className="fixed w-full bg-white/90 backdrop-blur-sm border-b z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <img
                src={hodosLogo}
                alt="Hodos Logo"
                className="h-20 w-auto object-contain"
              />
            </div>
            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                <a
                  href="#about"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  About
                </a>
                <a
                  href="#features"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Features
                </a>
                <button
                  onClick={handleRequestDemoClick}
                  className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
                >
                  Request Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Demo Request Form Modal */}
      {isFormVisible && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
            <div className="flex justify-end">
              <button
                onClick={handleCloseForm}
                className="text-gray-600 text-2xl font-bold"
              >
                &times;
              </button>
            </div>
            <h2 className="text-2xl font-semibold mb-4">Request a Demo</h2>
            {/* Render the ContactForm component here */}
            <ContactForm /> {/* This will render the Contact form */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
