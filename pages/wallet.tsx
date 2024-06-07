import Header from '../components/Header';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';

interface WalletData {
  id: number;
  currency: string;
  balance: number;
}

const Wallet: React.FC = () => {
  const [wallets, setWallets] = useState<WalletData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const response = await fetch('/api/wallet');
        const data: WalletData[] = await response.json();
        setWallets(data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching wallet data');
        setLoading(false);
      }
    };
    fetchWallets();
  }, []);

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="bg-gray-900 min-h-screen">
      <Header />
      <main className="container mx-auto py-8">
        <h1 className="text-3xl text-white mb-4">Wallet</h1>
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          {wallets.map((wallet) => (
            <div key={wallet.id} className="flex justify-between mb-2">
              <span className="text-white">{wallet.currency}</span>
              <span className="text-white">{wallet.balance}</span>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Wallet;
