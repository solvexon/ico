import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0f1729]/90 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              RRR NEXA
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-300 hover:text-white transition-colors">Home</a>
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#tokenomics" className="text-gray-300 hover:text-white transition-colors">Tokenomics</a>
            <a href="#roadmap" className="text-gray-300 hover:text-white transition-colors">Roadmap</a>
            <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-medium hover:from-blue-700 hover:to-purple-700 transition-all">
              Connect Wallet
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-[#0f1729] border-t border-gray-800">
            <div className="flex flex-col space-y-4 p-4">
              <a href="#home" className="text-gray-300 hover:text-white transition-colors">Home</a>
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#tokenomics" className="text-gray-300 hover:text-white transition-colors">Tokenomics</a>
              <a href="#roadmap" className="text-gray-300 hover:text-white transition-colors">Roadmap</a>
              <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-medium hover:from-blue-700 hover:to-purple-700 transition-all">
                Connect Wallet
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};