import React from 'react';
import { CircleDollarSign, DollarSign, Percent, Shield } from 'lucide-react';

export const Tokenomics = () => {
  const distributions = [
    { label: "Liquidity Pool", percentage: "40%", color: "bg-blue-500" },
    { label: "Team & Development", percentage: "20%", color: "bg-purple-500" },
    { label: "Marketing", percentage: "15%", color: "bg-indigo-500" },
    { label: "Community Rewards", percentage: "15%", color: "bg-pink-500" },
    { label: "Reserve", percentage: "10%", color: "bg-violet-500" }
  ];

  return (
    <section id="tokenomics" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Tokenomics
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Understanding the distribution and utility of RRR NEXA tokens
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {distributions.map((item, index) => (
              <div key={index} className="flex items-center space-x-4 bg-[#1a2235] p-4 rounded-xl">
                <div className={`w-4 h-4 rounded-full ${item.color}`} />
                <div className="flex-1">
                  <h4 className="font-medium">{item.label}</h4>
                  <p className="text-gray-400">{item.percentage}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[#1a2235] hover:bg-[#1e2943] transition-all">
              <DollarSign className="w-10 h-10 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Total Supply</h3>
              <p className="text-gray-400">1,000,000,000 NEXA</p>
            </div>
            <div className="p-6 rounded-2xl bg-[#1a2235] hover:bg-[#1e2943] transition-all">
              <Percent className="w-10 h-10 text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Tax</h3>
              <p className="text-gray-400">2% Buy / 2% Sell</p>
            </div>
            <div className="p-6 rounded-2xl bg-[#1a2235] hover:bg-[#1e2943] transition-all">
              <Shield className="w-10 h-10 text-indigo-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Security</h3>
              <p className="text-gray-400">Audited & KYC Verified</p>
            </div>
            <div className="p-6 rounded-2xl bg-[#1a2235] hover:bg-[#1e2943] transition-all">
              <CircleDollarSign className="w-10 h-10 text-pink-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Liquidity</h3>
              <p className="text-gray-400">Locked for 1 Year</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};