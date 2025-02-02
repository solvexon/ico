import React, { useEffect, useState } from 'react';
import { Lock, Timer, TrendingUp } from 'lucide-react';
import { ethers } from 'ethers';
import { getStakingInfo, claimTokens } from '../utils/web3';
import { toast } from 'react-hot-toast';

export const StakingCard = () => {
  const [stakingData, setStakingData] = useState({
    balance: '0',
    endTime: new Date(),
    canClaim: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const loadStakingInfo = async () => {
    if (!window.ethereum?.selectedAddress) return;
    
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const info = await getStakingInfo(signer, address);
      setStakingData(info);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum?.selectedAddress) {
        setIsConnected(true);
        await loadStakingInfo();
      }
    };

    checkConnection();

    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        setIsConnected(accounts.length > 0);
        if (accounts.length > 0) {
          loadStakingInfo();
        } else {
          setStakingData({ balance: '0', endTime: new Date(), canClaim: false });
        }
      });
    }

    return () => {
      if (window.ethereum?.removeListener) {
        window.ethereum.removeListener('accountsChanged', () => {});
      }
    };
  }, []);

  const handleClaim = async () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    setIsLoading(true);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      await claimTokens(signer);
      toast.success('Tokens claimed successfully!');
      await loadStakingInfo();
    } catch (error) {
      console.error(error);
      toast.error('Failed to claim tokens');
    } finally {
      setIsLoading(false);
    }
  };

  const remainingDays = Math.max(0, Math.ceil((stakingData.endTime.getTime() - Date.now()) / (1000 * 60 * 60 * 24)));
  const progress = ((500 - remainingDays) / 500) * 100;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Staking Portal</h2>
          <p className="text-gray-500">Earn rewards by holding</p>
        </div>
        <div className="bg-purple-100 p-2 rounded-lg">
          <Lock size={24} className="text-purple-600" />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-xl">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp size={18} className="text-purple-600" />
            <span className="text-sm font-medium text-gray-600">Total Staked</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">{stakingData.balance} WEF</p>
          <p className="text-sm text-gray-500">≈ ${(parseFloat(stakingData.balance) * 0.01).toFixed(2)} USDT</p>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
          <div className="flex items-center space-x-2 mb-2">
            <Timer size={18} className="text-blue-600" />
            <span className="text-sm font-medium text-gray-600">Lock Period</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">{remainingDays}</p>
          <p className="text-sm text-gray-500">Days Remaining</p>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">Staking Progress</span>
          <span className="text-sm font-medium text-purple-600">{progress.toFixed(1)}%</span>
        </div>
        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <button 
        onClick={handleClaim}
        disabled={!isConnected || !stakingData.canClaim || isLoading}
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {!isConnected ? 'Connect Wallet First' : isLoading ? 'Processing...' : stakingData.canClaim ? 'Claim Tokens' : 'Locked'}
      </button>
    </div>
  );
};