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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('https://api.binance.com/api/v3/depth?symbol=BTCUSDT&limit=100');
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.lengt h / itemsPerPage);

  const handlePaginationNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePaginationPrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b border-gray-700 text-gray-300">Price (USDT)</th> 
              <th className="px-4 py-2 border-b border-gray-700 text-gray-300">Amounts (BTC)</th>
              
              <th className="px-4 py-2 border-b border-gray-700 text-gray-300">Total</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((order) => (
              <tr key={order.id} className="hover:bg-gray-800">
                <td className={`px-4 py-2 border-b border-gray-700 text-white ${order.orderType === 'buy' ? 'text-green-500' : 'text-red-500'}`}>
                  {order.price.toFixed(2)}
                </td>
                <td className="px-4 py-2 border-b border-gray-700 text-white">{order.amount.toFixed(6)}</td>
                <td className="px-4 py-2 border-b border-gray-700 text-white">{order.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="flex justify-between mt-4">
        <button
          className={`px-4 py-2 bg-gray-800 text-white rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handlePaginationPrev}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <button
          className={`px-4 py-2 bg-gray-800 text-white rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handlePaginationNext}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OrderBook;
