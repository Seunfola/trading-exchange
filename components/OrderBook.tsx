import React, { useEffect, useState } from 'react';

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

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orderBook');
        if (!response.ok) {
          throw new Error('Failed to fetch order book data');
        }
        const data: Order[] = await response.json();
        setOrders(data);
      } catch (error) {
        setError((error as Error).message || 'Error fetching order book data');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-md">
      <h2 className="text-white mb-4">Order Book</h2>
      <ul className="text-white space-y-2">
        {orders.map((order) => (
          <li key={order.id} className="flex justify-between">
            <span>{order.price}</span>
            <span>{order.amount}</span>
            <span>{order.total}</span>
            <span>{order.orderType}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderBook;
