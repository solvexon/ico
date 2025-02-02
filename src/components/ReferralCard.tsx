import React from 'react';
import { Users, Copy, Gift, Layers } from 'lucide-react';

export const ReferralCard = () => {
  const referralLink = 'https://wef.finance/?ref=0x123...';

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Referral Program</h2>
          <p className="text-gray-500">Earn USDT rewards</p>
        </div>
        <div className="bg-green-100 p-2 rounded-lg">
          <Gift size={24} className="text-green-600" />
        </div>
      </div>
      
      <div className="space-y-8">
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl">
            <div className="flex items-center space-x-2 mb-2">
              <Users size={18} className="text-green-600" />
              <span className="text-sm font-medium text-gray-600">Team Size</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">0</p>
            <p className="text-sm text-gray-500">Total Members</p>
          </div>
          
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl">
            <div className="flex items-center space-x-2 mb-2">
              <Layers size={18} className="text-emerald-600" />
              <span className="text-sm font-medium text-gray-600">Earnings</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">0.00</p>
            <p className="text-sm text-gray-500">USDT Earned</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Referral Link
          </label>
          <div className="flex">
            <input
              type="text"
              readOnly
              value={referralLink}
              className="flex-1 p-4 border border-gray-200 rounded-l-xl bg-gray-50"
            />
            <button className="px-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-r-xl transition-all">
              <Copy size={20} />
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-green-50 rounded-xl p-6">
          <h3 className="font-semibold mb-4 text-gray-800">Reward Structure</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Gift size={16} className="text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Direct Referral</p>
                <p className="text-sm text-gray-600">20% USDT Instant Reward</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Layers size={16} className="text-emerald-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Level 2-15</p>
                <p className="text-sm text-gray-600">2% USDT per Level</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}