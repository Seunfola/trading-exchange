import React, { useEffect, useState } from 'react';
import { CircleDashed } from 'lucide-react';

interface Order {
  id: number;
  price: number;
  amount: number;
  total: number;
  orderType: string;
}

const OrderBook: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'buy' | 'sell'>('all');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('https://api.binance.com/api/v3/depth?symbol=BTCUSDT&limit=10');
        if (!response.ok) {
          throw new Error('Failed to fetch order book data');
        }
        const data = await response.json();
        
        const formattedOrders: Order[] = [
          ...data.bids.map((order: [string, string], index: number) => ({
            id: index,
            price: parseFloat(order[0]),
            amount: parseFloat(order[1]),
            total: parseFloat(order[0]) * parseFloat(order[1]),
            orderType: 'buy',
          })),
          ...data.asks.map((order: [string, string], index: number) => ({
            id: index + data.bids.length,
            price: parseFloat(order[0]),
            amount: parseFloat(order[1]),
            total: parseFloat(order[0]) * parseFloat(order[1]),
            orderType: 'sell',
          })),
        ];

        setOrders(formattedOrders);
      } catch (error) {
        setError((error as Error).message || 'Error fetching order book data');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    if (filter === 'all') return true;
    return order.orderType === filter;
  });

  if (loading) {
    return (
      <div className="text-white flex items-center justify-center">
        <CircleDashed className="animate-spin mr-2" />
        Loading...
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="bg-gray-900 p-4 sm:p-6 rounded-lg shadow-lg">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Order Book</h2>
      <div className="flex flex-col sm:flex-row justify-between mb-4 space-y-2 sm:space-y-0 sm:space-x-4">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
          <label htmlFor="filter" className="text-gray-300 sm:mr-2">Filter by:</label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'all' | 'buy' | 'sell')}
            className="bg-gray-700 text-white p-2 rounded w-full sm:w-auto"
          >
            <option value="all">All</option>
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
          <label htmlFor="date" className="text-gray-300 sm:mr-2">Date:</label>
          <input
            type="date"
            id="date"
            className="bg-gray-700 text-white p-2 rounded w-full sm:w-auto"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b border-gray-700 text-gray-300">Price</th>
              <th className="px-4 py-2 border-b border-gray-700 text-gray-300">Amount</th>
              <th className="px-4 py-2 border-b border-gray-700 text-gray-300">Total</th>
              <th className="px-4 py-2 border-b border-gray-700 text-gray-300">Type</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-800">
                <td className="px-4 py-2 border-b border-gray-700 text-white">{order.price.toFixed(2)}</td>
                <td className="px-4 py-2 border-b border-gray-700 text-white">{order.amount.toFixed(6)}</td>
                <td className="px-4 py-2 border-b border-gray-700 text-white">{order.total.toFixed(2)}</td>
                <td className="px-4 py-2 border-b border-gray-700 text-white">{order.orderType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderBook;
