import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface Wallet {
  id: string;
  currency: string;
  balance: number;
  externalBalance?: number;
}

const WalletPage: React.FC = () => {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [action, setAction] = useState<'new' | 'existing'>('new'); // Default to new
  const [currency, setCurrency] = useState<string>('BTC'); // Default to BTC
  const [address, setAddress] = useState<string>(''); // Address input for linking existing wallet

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const response = await fetch('/api/wallet');
        if (!response.ok) {
          throw new Error('Failed to fetch wallets');
        }
        const data = await response.json();
        setWallets(data);
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
      const response = await fetch('/api/wallet/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ currency }),
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

  const linkExistingWallet = async () => {
    try {
      const response = await fetch('/api/wallet/link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ currency, address }),
      });
      if (!response.ok) {
        throw new Error('Failed to link wallet');
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
        <div>
          <button onClick={() => setAction('new')} className="bg-green-500 text-white px-4 py-2 rounded mb-4">
            Create New Wallet
          </button>
          <button onClick={() => setAction('existing')} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
            Link Existing Wallet
          </button>
        </div>
        <div>
          <label htmlFor="currency" className="block mb-2 text-white">Select Currency</label>
          <select
            id="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full bg-gray-700 p-2 rounded mb-4"
          >
            <option value="BTC">BTC</option>
            <option value="ETH">ETH</option>
            {/* Add other currencies as needed */}
          </select>
          {action === 'new' ? (
            <button onClick={createWallet} className="bg-green-500 text-white px-4 py-2 rounded">
              Create Wallet
            </button>
          ) : (
            <div>
              <label htmlFor="address" className="block mb-2 text-white">Wallet Address</label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-gray-700 p-2 rounded mb-4"
                placeholder="Enter your wallet address"
              />
              <button onClick={linkExistingWallet} className="bg-blue-500 text-white px-4 py-2 rounded">
                Link Wallet
              </button>
            </div>
          )}
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-md mt-4">
          {wallets.length === 0 ? (
            <div className="text-white">No wallets found.</div>
          ) : (
            wallets.map((wallet) => (
              <div key={wallet.id} className="flex justify-between mb-2">
                <span className="text-white">{wallet.currency}</span>
                <span className="text-white">Balance: {wallet.balance}</span>
                {wallet.externalBalance !== undefined && (
                  <span className="text-white">External Balance: {wallet.externalBalance}</span>
                )}
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
