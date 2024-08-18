// components/WalletConnectButton.js
import React from 'react';
import { useWallet } from '../hooks/useWallet';

const WalletConnectButton = () => {
  const { walletAddress, isCorrectNetwork, connectWallet, disconnectWallet } = useWallet();

  return (
    <div>
       <div className='header-btn py-1.5 lg:py-2 px-3 xl:py-3.5 lg:px-4 md:px-2 text-white Oxanium '>
              <a href="#" className='font-bold disabled-btn'>Connect Wallet</a>
            </div>
    </div>
  );
};

export default WalletConnectButton;