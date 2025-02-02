import React from 'react';
import { Shield, Zap, RefreshCw, Users } from 'lucide-react';

export const Features = () => {
  const features = [
    {
      icon: <Shield className="w-12 h-12 text-blue-500" />,
      title: "Secure Trading",
      description: "Advanced security measures to protect your assets and transactions"
    },
    {
      icon: <Zap className="w-12 h-12 text-purple-500" />,
      title: "Lightning Fast",
      description: "Execute trades instantly with our high-performance infrastructure"
    },
    {
      icon: <RefreshCw className="w-12 h-12 text-blue-500" />,
      title: "Low Fees",
      description: "Competitive trading fees and rewards for liquidity providers"
    },
    {
      icon: <Users className="w-12 h-12 text-purple-500" />,
      title: "Community Driven",
      description: "Governed by the community for the best interest of users"
    }
  ];

  return (
    <section id="features" className="py-20 bg-[#131b2f]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Why Choose RRR NEXA?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Experience the next generation of decentralized trading with our cutting-edge features
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-8 rounded-2xl bg-[#1a2235] hover:bg-[#1e2943] transition-all">
              <div className="mb-6">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};