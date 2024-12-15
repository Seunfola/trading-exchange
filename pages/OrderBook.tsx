import React, { useEffect, useState } from "react";
import { CircleDashed } from "lucide-react";

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
  const [filter, setFilter] = useState<"all" | "buy" | "sell">("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
 const proxyUrl = "https://api.allorigins.win/raw?url=";
    const apiUrl = "https://api.binance.com/api/v3/depth?symbol=ETHUSDT&limit=100";
    const response = await fetch(proxyUrl + encodeURIComponent(apiUrl));
  

        if (!response.ok) {
          throw new Error("Failed to fetch order book data");
        }
        const data = await response.json();
            console.log(data);

const formattedOrders: Order[] = [
  ...(Array.isArray(data.bids)
    ? data.bids.map((order: [string, string], index: number) => ({
        id: index,
        price: parseFloat(order[0]),
        amount: parseFloat(order[1]),
        total: parseFloat(order[0]) * parseFloat(order[1]),
        orderType: "buy",
      }))
    : []),
  ...(Array.isArray(data.asks)
    ? data.asks.map((order: [string, string], index: number) => ({
        id: index + (data.bids?.length || 0),
        price: parseFloat(order[0]),
        amount: parseFloat(order[1]),
        total: parseFloat(order[0]) * parseFloat(order[1]),
        orderType: "sell",
      }))
    : []),
];


        setOrders(formattedOrders);
      } catch (error) {
        setError((error as Error).message || "Error fetching order book data");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    if (filter === "all") return true;
    return order.orderType === filter;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 to-black">
        <CircleDashed className="animate-spin mr-3 text-green-500" />
        <span className="text-lg text-white">Loading order book...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600 bg-gray-800 p-6 rounded shadow">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-800 to-black text-white">
      <div className="w-full px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-bold">Order Book</h2>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as "all" | "buy" | "sell")}
            className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Orders</option>
            <option value="buy">Buy Orders</option>
            <option value="sell">Sell Orders</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-gray-900 p-6 rounded-lg shadow-lg">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-3 border-b border-gray-700 text-gray-300">Price (USDT)</th>
                <th className="px-4 py-3 border-b border-gray-700 text-gray-300">Amount (BTC)</th>
                <th className="px-4 py-3 border-b border-gray-700 text-gray-300">Total</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((order) => (
                <tr
                  key={order.id}
                  className={`hover:bg-gray-800 ${
                    order.orderType === "buy" ? "bg-green-900/20" : "bg-red-900/20"
                  }`}
                >
                  <td
                    className={`px-4 py-3 border-b border-gray-700 ${
                      order.orderType === "buy" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {order.price.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-700 text-white">
                    {order.amount.toFixed(6)}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-700 text-white">
                    {order.total.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <button
            className={`px-4 py-2 rounded bg-gray-800 text-white shadow-md ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-700"
            }`}
            onClick={handlePaginationPrev}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span className="text-gray-400">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className={`px-4 py-2 rounded bg-gray-800 text-white shadow-md ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-700"
            }`}
            onClick={handlePaginationNext}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderBook;
