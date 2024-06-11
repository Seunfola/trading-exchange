import Header from '../components/Header';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';

interface MarketData {
  id: number;
  name: string;
  price: number;
  change: number;
}

const Markets: React.FC = () => {
  const [markets, setMarkets] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        const response = await fetch('/api/markets');

        if (!response.ok) {
          throw new Error('Failed to fetch market data');
        }

        const data: MarketData[] = await response.json();
        setMarkets(data);
      } catch (error) {
        setError((error as Error).message || 'Error fetching market data');
      } finally {
        setLoading(false);
      }
    };

    fetchMarkets();
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
        <h1 className="text-3xl text-white mb-4">Markets</h1>
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          {markets.map((market) => (
            <div key={market.id} className="flex justify-between mb-2">
              <span className="text-white">{market.name}</span>
              <span className={`text-${market.change > 0 ? 'green' : 'red'}-500`}>
                {market.price.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Markets;
