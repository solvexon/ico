import React, { useState } from 'react';
import { DollarSign, CreditCard, ArrowRight, Lock } from 'lucide-react';
import { buyAndStake, calculateBNBAmount } from '../utils/web3';
import { toast } from 'react-hot-toast';
import { ethers } from 'ethers';

export const PurchaseCard = () => {
  const [wefAmount, setWefAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const calculateBNBCost = (wef: string) => {
    if (!wef || isNaN(parseFloat(wef))) return '0';
    const bnbAmount = calculateBNBAmount(wef);
    return bnbAmount;
  };

  const handleBuyAndStake = async () => {
    if (!wefAmount || parseFloat(wefAmount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    
    setIsLoading(true);
    try {
      if (!window.ethereum) {
        throw new Error('Please install MetaMask');
      }
      
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      
      // Check if user has enough BNB
      const balance = await provider.getBalance(await signer.getAddress());
      const requiredBNB = ethers.utils.parseEther(calculateBNBCost(wefAmount));
      
      if (balance.lt(requiredBNB)) {
        throw new Error('Insufficient BNB balance');
      }
      
      const loadingToast = toast.loading('Buying and staking WEF...');
      await buyAndStake(signer, wefAmount);
      
      toast.dismiss(loadingToast);
      toast.success('Successfully bought and staked WEF tokens!');
      setWefAmount('');
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'Transaction failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Buy WEF</h2>
          <p className="text-gray-500">Purchase & auto-stake tokens</p>
        </div>
        <div className="bg-blue-100 p-2 rounded-lg">
          <CreditCard size={24} className="text-blue-600" />
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            WEF Amount
          </label>
          <div className="relative">
            <input
              type="number"
              value={wefAmount}
              onChange={(e) => setWefAmount(e.target.value)}
              className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Enter amount"
              min="0"
              step="1"
            />
            <div className="absolute right-4 top-4 bg-gray-100 px-2 py-1 rounded text-sm text-gray-600">
              WEF
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Cost</span>
            <ArrowRight size={16} className="text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-800">{calculateBNBCost(wefAmount)} BNB</p>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 space-y-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <DollarSign size={16} className="text-green-500" />
            <span>Price: 0.000001 BNB per WEF</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Lock size={16} className="text-purple-500" />
            <span>Auto-staking: 500 days lock</span>
          </div>
        </div>

        <button 
          onClick={handleBuyAndStake}
          disabled={isLoading || !wefAmount || parseFloat(wefAmount) <= 0}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Processing...' : 'Buy & Stake WEF'}
        </button>
      </div>
    </div>
  );
};