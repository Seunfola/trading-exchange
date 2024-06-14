import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface Wallet {
  id: string;
  currency: string;
  balance: number;
}

const WalletPage: React.FC = () => {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const response = await fetch('/api/wallet');
        if (!response.ok) {
          throw new Error('Failed to fetch wallets');
        }
        const data = await response.json();
        setWallets([data]);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchWallets();
  }, []);

  const createWallet = async () => {
    try {
      const response = await fetch('/api/wallet', {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Failed to create wallet');
      }
      const newWallet = await response.json();
      setWallets([newWallet, ...wallets]);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto py-8 flex-grow">
        <h1 className="text-3xl text-white mb-4">Wallet</h1>
        <button onClick={createWallet} className="bg-green-500 text-white px-4 py-2 rounded mb-4">
          Create Wallet
        </button>
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          {wallets.length === 0 ? (
            <div className="text-white">No wallets found.</div>
          ) : (
            wallets.map((wallet) => (
              <div key={wallet.id} className="flex justify-between mb-2">
                <span className="text-white">{wallet.currency}</span>
                <span className="text-white">{wallet.balance}</span>
              </div>
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WalletPage;
