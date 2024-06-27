import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const OrderForm: React.FC = () => {
  const [orderType, setOrderType] = useState('LIMIT');
  const [side, setSide] = useState<'BUY' | 'SELL'>('BUY');
  const [triggerPrice, setTriggerPrice] = useState('');
  const [limitPrice, setLimitPrice] = useState('');
  const [amount, setAmount] = useState('');
  const [timeInForce, setTimeInForce] = useState('GTC');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleOrder = async () => {
    setLoading(true);
    setError(null);
    try {
      const body: {
        symbol: string;
        side: 'BUY' | 'SELL';
        type: string;
        quantity: number;
        price?: number;
        timeInForce?: string;
        stopPrice?: number;
      } = {
        symbol: 'BTCUSDT',
        side,
        type: orderType,
        quantity: parseFloat(amount),
      };

      if (orderType === 'LIMIT') {
        body.price = parseFloat(limitPrice);
        body.timeInForce = timeInForce;
      } else if (orderType === 'STOP_LIMIT') {
        body.price = parseFloat(limitPrice);
        body.stopPrice = parseFloat(triggerPrice);
        body.timeInForce = timeInForce;
      }

      if (orderType === 'MARKET') {
        delete body.price;
        delete body.timeInForce;
      }

      const response = await fetch('/api/binance-order', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to place ${side.toLowerCase()} order`);
      }

      const data = await response.json();
      console.log(`${side} order placed`, data);
    } catch (error) {
      setError((error as Error).message || `Error placing ${side.toLowerCase()} order`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeposit = () => {
    router.push('/deposit');
  };

  return (
    <div className="bg-gray-900 p-4 sm:p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <div className="flex justify-center items-center gap-1 mb-4 rounded">
        <button
          className={`px-8 py-2 rounded-lg rounded-${side === 'BUY' ? 'bg-gray-700 text-white' : 'bg-gray-900 text-gray-400'}`}
          onClick={() => setSide('BUY')}
        >
          Buy
        </button>
        <button
          className={`px-8 py-2 rounded-lg ${side === 'SELL' ? 'bg-red-700 text-white' : 'bg-gray-900 text-gray-400'}`}
          onClick={() => setSide('SELL')}
        >
          Sell
        </button>
      </div>
      <div className="flex justify-around mb-4">
        <button
          className={`px-2 py-1 rounded ${orderType === 'LIMIT' ? 'bg-gray-700 text-white' : 'bg-gray-900 text-gray-400'}`}
          onClick={() => setOrderType('LIMIT')}
        >
          Limit
        </button>
        <button
          className={`px-2 py-1 rounded ${orderType === 'MARKET' ? 'bg-gray-700 text-white' : 'bg-gray-900 text-gray-400'}`}
          onClick={() => setOrderType('MARKET')}
        >
          Market
        </button>
        <button
          className={`px-2 py-1 rounded ${orderType === 'STOP_LIMIT' ? 'bg-gray-700 text-white' : 'bg-gray-900 text-gray-400'}`}
          onClick={() => setOrderType('STOP_LIMIT')}
        >
          Stop-Limit
        </button>
      </div>
      {orderType === 'STOP_LIMIT' && (
        <div className="flex flex-col mb-4">
          <label className="text-gray-400 mb-1">Trigger Price</label>
          <input
            type="text"
            className="bg-gray-800 text-white py-2 px-4 rounded"
            placeholder="0.00 USD"
            value={triggerPrice}
            onChange={(e) => setTriggerPrice(e.target.value)}
          />
        </div>
      )}
      {orderType !== 'MARKET' && (
        <div className="flex flex-col mb-4">
          <label className="text-gray-400 mb-1">Limit Price</label>
          <input
            type="text"
            className="bg-gray-800 text-white py-2 px-4 rounded"
            placeholder="0.00 USD"
            value={limitPrice}
            onChange={(e) => setLimitPrice(e.target.value)}
          />
        </div>
      )}
      <div className="flex flex-col mb-4">
        <label className="text-gray-400 mb-1">Amount</label>
        <input
          type="text"
          className="bg-gray-800 text-white py-2 px-4 rounded"
          placeholder="0.00 BTC"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      {orderType === 'LIMIT' && (
        <div className="flex flex-col mb-4">
          <label className="text-gray-400 mb-1">Type</label>
          <select
            className="bg-gray-800 text-white py-2 px-4 rounded"
            value={timeInForce}
            onChange={(e) => setTimeInForce(e.target.value)}
          >
            <option value="GTC">Good till cancelled</option>
            <option value="IOC">Immediate or cancel</option>
          </select>
        </div>
      )}
      <button
        className={`w-full py-2 mb-4 rounded ${side === 'BUY' ? 'bg-purple-700' : 'bg-red-700'} text-white`}
        onClick={handleOrder}
        disabled={loading}
      >
        {side === 'BUY' ? 'Buy BTC' : 'Sell BTC'}
      </button>
      <div className="text-gray-400 mb-4">
        <p>Total account value: 0.00 NGN</p>
        <p>Open Orders: 0.00</p>
        <p>Available: 0.00</p>
      </div>
      <button
        className="w-full py-2 rounded bg-blue-700 text-white"
        onClick={handleDeposit}
      >
        Deposit
      </button>
      {loading && (
        <div className="text-white flex items-center justify-center mt-4">
          <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
          Processing...
        </div>
      )}
      {error && <div className="text-red-500 mt-4">{error}</div>}
    </div>
  );
};

export default OrderForm;
