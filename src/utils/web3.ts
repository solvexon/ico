import { ethers } from 'ethers';

const WEF_CONTRACT_ADDRESS = '0x21D244B39e1B12A82000743734667d83A5828a97';
const WEF_PRICE_BNB = '0.000001'; // Price in BNB per WEF token

const WEF_ABI = [
  "function buy() external payable",
  "function claimTokens() external",
  "function getStakingInfo(address staker) view returns (uint256 balance, uint256 endTime, bool canClaim)",
  "function saleActive() view returns (bool)",
  "function minPurchase() view returns (uint256)",
  "function maxPurchase() view returns (uint256)",
  "event TokensPurchased(address buyer, uint256 bnbAmount, uint256 wefAmount)",
  "event TokensStaked(address staker, uint256 amount, uint256 endTime)"
];

export const connectWallet = async () => {
  if (!window.ethereum) {
    throw new Error('Please install MetaMask');
  }

  await window.ethereum.request({ method: 'eth_requestAccounts' });
  
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x61' }],
    });
  } catch (switchError: any) {
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: '0x61',
            chainName: 'BSC Testnet',
            nativeCurrency: {
              name: 'BNB',
              symbol: 'BNB',
              decimals: 18
            },
            rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
            blockExplorerUrls: ['https://testnet.bscscan.com/']
          }]
        });
      } catch (addError) {
        throw new Error('Failed to add BSC Testnet to MetaMask');
      }
    }
    throw new Error('Please switch to BSC Testnet');
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  
  return {
    provider,
    signer,
    address: await signer.getAddress()
  };
};

export const getContract = (signer: ethers.Signer) => {
  return new ethers.Contract(WEF_CONTRACT_ADDRESS, WEF_ABI, signer);
};

export const calculateBNBAmount = (wefAmount: string): string => {
  try {
    if (!wefAmount || isNaN(Number(wefAmount)) || Number(wefAmount) <= 0) {
      return '0';
    }
    const wefAmountBN = ethers.utils.parseEther(wefAmount);
    const bnbPrice = ethers.utils.parseEther(WEF_PRICE_BNB);
    const bnbAmount = wefAmountBN.mul(bnbPrice).div(ethers.utils.parseEther('1'));
    return ethers.utils.formatEther(bnbAmount);
  } catch (error) {
    console.error('Error calculating BNB amount:', error);
    return '0';
  }
};

const parseTransactionError = (error: any): string => {
  // Check for specific error messages in the error data
  const errorMessage = error.data?.message || error.message || '';
  
  if (errorMessage.toLowerCase().includes('sale not active')) {
    return 'The token sale is not currently active';
  }
  if (errorMessage.toLowerCase().includes('max purchase')) {
    return 'Amount exceeds maximum purchase limit';
  }
  if (errorMessage.toLowerCase().includes('min purchase')) {
    return 'Amount is below minimum purchase requirement';
  }
  if (errorMessage.toLowerCase().includes('insufficient tokens')) {
    return 'Insufficient tokens available for purchase';
  }
  
  // Check for common error patterns
  if (error.message.includes('insufficient funds')) {
    return 'Insufficient BNB balance';
  }
  if (error.message.includes('user rejected')) {
    return 'Transaction was rejected';
  }
  if (error.code === 'CALL_EXCEPTION') {
    return 'Transaction failed. Please verify the sale is active and your purchase amount meets the requirements';
  }
  if (error.code === 'NETWORK_ERROR') {
    return 'Network error - please check your connection and try again';
  }
  if (error.code === 'UNPREDICTABLE_GAS_LIMIT') {
    return 'Unable to estimate gas. The transaction may fail or the sale might be paused';
  }
  
  return 'Transaction failed. Please try again later';
};

const validatePurchase = async (contract: ethers.Contract, wefAmount: string): Promise<void> => {
  try {
    // Check if sale is active
    const saleActive = await contract.saleActive();
    if (!saleActive) {
      throw new Error('The token sale is not currently active');
    }

    // Convert WEF amount to wei for comparison
    const amount = ethers.utils.parseEther(wefAmount);

    // Check minimum and maximum purchase limits
    try {
      const minPurchase = await contract.minPurchase();
      const maxPurchase = await contract.maxPurchase();

      if (amount.lt(minPurchase)) {
        throw new Error(`Purchase amount is below minimum requirement of ${ethers.utils.formatEther(minPurchase)} WEF`);
      }
      if (amount.gt(maxPurchase)) {
        throw new Error(`Purchase amount exceeds maximum limit of ${ethers.utils.formatEther(maxPurchase)} WEF`);
      }
    } catch (error) {
      // If min/max functions don't exist, continue without these checks
      console.warn('Min/max purchase limits not configured on contract');
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const buyAndStake = async (signer: ethers.Signer, wefAmount: string) => {
  if (!wefAmount || isNaN(Number(wefAmount)) || Number(wefAmount) <= 0) {
    throw new Error('Please enter a valid amount');
  }

  try {
    const contract = getContract(signer);
    
    // Validate purchase requirements
    await validatePurchase(contract, wefAmount);
    
    const bnbAmount = calculateBNBAmount(wefAmount);
    
    // Validate BNB amount
    if (bnbAmount === '0') {
      throw new Error('Invalid BNB amount calculated');
    }

    // Check user's BNB balance before proceeding
    const balance = await signer.getBalance();
    const requiredBNB = ethers.utils.parseEther(bnbAmount);
    if (balance.lt(requiredBNB)) {
      throw new Error('Insufficient BNB balance');
    }

    // Add a small amount for gas price fluctuation (0.1%)
    const bnbAmountWithBuffer = ethers.utils.parseEther(bnbAmount)
      .mul(1001).div(1000);
    
    // Estimate gas to check if transaction will fail
    try {
      await contract.estimateGas.buy({ value: bnbAmountWithBuffer });
    } catch (error) {
      throw new Error('Transaction is likely to fail. Please check if the sale is active and your purchase amount is valid.');
    }
    
    const tx = await contract.buy({
      value: bnbAmountWithBuffer,
      gasLimit: 500000 // Set a specific gas limit
    });
    
    // Wait for transaction confirmation with timeout
    const receipt = await Promise.race([
      tx.wait(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Transaction timeout')), 60000)
      )
    ]);

    return receipt;
  } catch (error: any) {
    console.error('Buy error:', error);
    throw new Error(parseTransactionError(error));
  }
};

export const claimTokens = async (signer: ethers.Signer) => {
  try {
    const contract = getContract(signer);
    const tx = await contract.claimTokens();
    await tx.wait();
  } catch (error: any) {
    console.error('Claim error:', error);
    throw new Error(parseTransactionError(error));
  }
};

export const getStakingInfo = async (signer: ethers.Signer, address: string) => {
  try {
    const contract = getContract(signer);
    const [balance, endTime, canClaim] = await contract.getStakingInfo(address);
    return {
      balance: ethers.utils.formatUnits(balance, 18),
      endTime: new Date(endTime.toNumber() * 1000),
      canClaim
    };
  } catch (error: any) {
    console.error('Error fetching staking info:', error);
    return {
      balance: '0',
      endTime: new Date(),
      canClaim: false
    };
  }
};