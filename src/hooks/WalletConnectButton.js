// components/WalletConnectButton.js
import React from 'react';
import { useWallet } from '../hooks/useWallet';

const WalletConnectButton = () => {
  const { walletAddress, isCorrectNetwork, connectWallet, disconnectWallet } = useWallet();

  return (
    <div>
      {walletAddress ? (
        <>
          <span>
            Connected: {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}
          </span>
          <button onClick={disconnectWallet}>Disconnect</button>
        </>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
      {!isCorrectNetwork && (
        <p>Please connect to the Ethereum Mainnet.</p>
      )}
    </div>
  );
};

export default WalletConnectButton;