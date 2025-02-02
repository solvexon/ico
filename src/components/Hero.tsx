import React from 'react';
import { ArrowRight } from 'lucide-react';

export const Hero = () => {
  return (
    <section id="home" className="pt-32 pb-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Welcome to RRR NEXA
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12">
            The Next Generation Decentralized Exchange Platform
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-medium hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2">
              Launch App
              <ArrowRight size={20} />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 border border-purple-600 rounded-full font-medium hover:bg-purple-600/20 transition-all">
              Learn More
            </button>
          </div>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg">
              <h3 className="text-3xl font-bold mb-2">$10M+</h3>
              <p className="text-gray-400">Total Volume</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg">
              <h3 className="text-3xl font-bold mb-2">50K+</h3>
              <p className="text-gray-400">Active Users</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg">
              <h3 className="text-3xl font-bold mb-2">100+</h3>
              <p className="text-gray-400">Trading Pairs</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg">
              <h3 className="text-3xl font-bold mb-2">24/7</h3>
              <p className="text-gray-400">Support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};