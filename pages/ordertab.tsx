import { useState } from 'react';
import OrderForm from './OrderForm';
import OrderBook from './OrderBook';

const OrderTabs = () => {
  const [activeTab, setActiveTab] = useState<'orderForm' | 'orderBook'>('orderForm');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-black text-white">
      {/* Header */}
      <div className="text-center py-6 border-b border-gray-700">
        <h1 className="text-4xl font-bold">Trade Dashboard</h1>
        <p className="text-gray-400 mt-2">Easily manage your orders and trades</p>
      </div>

      {/* Tabs */}
     <div className="flex justify-center items-center bg-gray-900 shadow-lg p-4 sticky top-0 z-50 gap-8">

        <button
          className={`px-8 py-2 mt-2 text-lg font-medium transition-all duration-300 ${
            activeTab === 'orderForm'
              ? 'text-white border-b-4 border-blue-500'
              : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => setActiveTab('orderForm')}
        >
          Order Form
        </button>
        <button
          className={`px-8 py-2 mt-2 text-lg font-medium transition-all duration-300 ${
            activeTab === 'orderBook'
              ? 'text-white border-b-4 border-blue-500'
              : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => setActiveTab('orderBook')}
        >
          Order Book
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-8">
        {activeTab === 'orderForm' && (
          <div
            className="animate-fadeIn w-full flex justify-center items-center"
          >
            <OrderForm />
          </div>
        )}
        {activeTab === 'orderBook' && (
          <div
            className="animate-fadeIn w-full flex justify-center items-center"
          >
            <OrderBook />
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTabs;
