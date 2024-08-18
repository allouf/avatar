import { useState, useEffect } from 'react';
import { Web3Provider } from '@ethersproject/providers';

  export const useWallet = () => {
    const [walletAddress, setWalletAddress] = useState('');
    const [isCorrectNetwork, setIsCorrectNetwork] = useState(false);
    const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
  
    useEffect(() => {
      const ethereum = window.ethereum;
      if (ethereum) {
        setIsMetaMaskInstalled(true);
        const provider = new Web3Provider(ethereum, "any");
  
        const checkNetwork = async () => {
          const network = await provider.getNetwork();
          setIsCorrectNetwork(network.chainId === 1); // Ethereum Mainnet chain ID
        };
  
        ethereum.on('accountsChanged', (accounts) => {
          if (accounts.length === 0) {
            setWalletAddress('');
            setIsCorrectNetwork(false);
          } else {
            setWalletAddress(accounts[0]);
            checkNetwork();
          }
        });
  
        ethereum.on('chainChanged', () => {
          window.location.reload();
        });
  
        provider.listAccounts().then(accounts => {
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
            checkNetwork();
          }
        });
  
        return () => {
          ethereum.removeListener('accountsChanged', () => {});
          ethereum.removeListener('chainChanged', () => {});
        };
      } else {
        console.error('MetaMask is not installed');
      }
    }, []);

    const connectWallet = async () => {
      if (!isMetaMaskInstalled) {
        alert('MetaMask is not installed. Please install it to continue.');
        // Optionally redirect to MetaMask installation page
        window.open('https://metamask.io/download.html', '_blank');
        return;
      }
  
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
        checkNetwork();
      } catch (error) {
        console.error('Error connecting to wallet:', error);
      }
    };
  
    const disconnectWallet = () => {
      setWalletAddress('');
      setIsCorrectNetwork(false);
    };
  
    return { walletAddress, connectWallet, disconnectWallet, isCorrectNetwork, isMetaMaskInstalled };
  };