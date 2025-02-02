import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';

export const Roadmap = () => {
  const phases = [
    {
      phase: "Phase 1",
      title: "Foundation",
      items: [
        "Website Launch",
        "Smart Contract Development",
        "Community Building",
        "Marketing Campaign"
      ],
      completed: true
    },
    {
      phase: "Phase 2",
      title: "Growth",
      items: [
        "Token Launch",
        "Exchange Listings",
        "Partnership Announcements",
        "Staking Platform"
      ],
      completed: true
    },
    {
      phase: "Phase 3",
      title: "Expansion",
      items: [
        "Mobile App Development",
        "Cross-chain Integration",
        "NFT Marketplace",
        "Governance System"
      ],
      completed: false
    },
    {
      phase: "Phase 4",
      title: "Evolution",
      items: [
        "Advanced Trading Features",
        "Global Marketing Campaign",
        "Major Exchange Listings",
        "Ecosystem Expansion"
      ],
      completed: false
    }
  ];

  return (
    <section id="roadmap" className="py-20 bg-[#131b2f]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Roadmap
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our journey to revolutionize decentralized trading
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {phases.map((phase, index) => (
            <div key={index} className="relative">
              <div className="p-6 rounded-2xl bg-[#1a2235] h-full">
                <div className="flex items-center space-x-2 mb-4">
                  {phase.completed ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : (
                    <Circle className="w-6 h-6 text-gray-500" />
                  )}
                  <h3 className="text-xl font-semibold">{phase.phase}</h3>
                </div>
                <h4 className="text-lg font-medium mb-4 text-purple-400">{phase.title}</h4>
                <ul className="space-y-3">
                  {phase.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center space-x-2 text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};