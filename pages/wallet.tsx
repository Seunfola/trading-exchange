"use client";

import React, { useEffect, useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { RainbowKitProvider, ConnectButton } from '@rainbow-me/rainbowkit';
import { chains, wagmiClient, queryClient } from './api/provider';
import { WagmiConfig } from 'wagmi';
import { QueryClientProvider } from '@tanstack/react-query';
import Header from '../components/Header';
import Footer from '../components/Footer';

const WalletPage: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
  const { disconnect } = useDisconnect();
  const [balance, setBalance] = useState<string | null>(null);
  const [errorState, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      if (address) {
        try {
          const response = await fetch(`/api/balance?address=${address}`);
          if (!response.ok) {
            throw new Error('Failed to fetch balance');
          }
          const data = await response.json();
          setBalance(data.balance);
        } catch (error) {
          setError((error as Error).message);
        }
      }
    };

    fetchBalance();
  }, [address]);

  const handleConnect = (connector: any) => {
    connect({ connector });
  };

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <QueryClientProvider client={queryClient}>
          <div className="bg-gray-900 min-h-screen flex flex-col">
            <Header />
            <main className="container mx-auto py-8 flex-grow">
              <h1 className="text-3xl text-white mb-4">Wallet</h1>
              <div>
                <ConnectButton />
                {isConnected && (
                  <button
                    onClick={() => disconnect()}
                    className="bg-red-500 text-white px-4 py-2 rounded mb-4"
                  >
                    Disconnect
                  </button>
                )}
                {!isConnected && (
                  <div>
                    {connectors.map((connector) => (
                      <button
                        key={connector.id}
                        onClick={() => handleConnect(connector)}
                        disabled={!connector.ready || isLoading && pendingConnector?.id === connector.id}
                        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 mr-2"
                      >
                        {connector.name}
                        {!connector.ready && ' (unsupported)'}
                        {isLoading && pendingConnector?.id === connector.id && ' (connecting)'}
                      </button>
                    ))}
                    {error && <div className="text-red-500">{error.message}</div>}
                  </div>
                )}
              </div>
              {isConnected && (
                <div className="bg-gray-800 p-4 rounded-lg shadow-md mt-4">
                  <h2 className="text-2xl text-white mb-2">Wallet Information</h2>
                  <div className="text-white mb-2">Address: {address}</div>
                  {balance !== null ? (
                    <div className="text-white">Balance: {balance}</div>
                  ) : (
                    <div className="text-white">Loading balance...</div>
                  )}
                  {errorState && <div className="text-red-500">{errorState}</div>}
                </div>
              )}
            </main>
            <Footer />
          </div>
        </QueryClientProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default WalletPage;
