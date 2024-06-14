import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderForm: React.FC = () => {
  const [mode, setMode] = useState<'buy' | 'sell'>('buy');
  const [buyPrice, setBuyPrice] = useState<number>(0);
  const [sellPrice, setSellPrice] = useState<number>(0);
  const [quantityInUSD, setQuantityInUSD] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [walletAmount, setWalletAmount] = useState<number | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT');
        const price = parseFloat(response.data.price);
        setBuyPrice(price);
        setSellPrice(price);
      } catch (error) {
        console.error('Error fetching prices:', error);
      }
    };

    const fetchWallet = async () => {
      try {
        const response = await axios.get('/api/wallet');
        setWalletAmount(response.data.balance);
      } catch (error) {
        console.error('Error fetching wallet data:', error);
        setWalletAmount(0);
      }
    };

    fetchPrices();
    fetchWallet();
  }, []);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantityInUSD = parseFloat(e.target.value);
    setQuantityInUSD(isNaN(newQuantityInUSD) ? 0 : newQuantityInUSD);
    setTotal(mode === 'buy' ? buyPrice * newQuantityInUSD : sellPrice * newQuantityInUSD);
  };

  const handleBuy = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (walletAmount !== null && quantityInUSD > walletAmount) {
        throw new Error('Insufficient funds in wallet');
      }
      const newBalance = walletAmount !== null ? walletAmount - quantityInUSD : 0;
      await axios.post('/api/wallet', { balance: newBalance });
      setWalletAmount(newBalance);
      setSuccess('Purchase successful');
      setError(null);
      setQuantityInUSD(0);
      setTotal(0);
    } catch (error) {
      setError((error as Error).message || 'Error purchasing');
      setSuccess(null);
    }
  };

  const handleSell = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (walletAmount !== null && quantityInUSD > walletAmount) {
        throw new Error('Insufficient quantity in wallet to sell');
      }
      const newBalance = walletAmount !== null ? walletAmount + quantityInUSD : 0;
      await axios.post('/api/wallet', { balance: newBalance });
      setWalletAmount(newBalance);
      setSuccess('Sale successful');
      setError(null);
      setQuantityInUSD(0);
      setTotal(0);
    } catch (error) {
      setError((error as Error).message || 'Error selling');
      setSuccess(null);
    }
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-md text-white">
      {mode === 'buy' ? (
        <form onSubmit={handleBuy}>
          <div className="mb-4">
            <label htmlFor="buyPrice" className="block mb-2">Buy Price (from Binance)</label>
            <input
              type="number"
              id="buyPrice"
              value={buyPrice}
              readOnly
              className="w-full bg-gray-700 p-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="quantity" className="block mb-2">Amount in USD</label>
            <input
              type="number"
              id="quantity"
              value={quantityInUSD}
              onChange={handleQuantityChange}
              className="w-full bg-gray-700 p-2 rounded"
              min="0"
              step="0.01"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="total" className="block mb-2">Total</label>
            <input
              type="number"
              id="total"
              value={total}
              readOnly
              className="w-full bg-gray-700 p-2 rounded"
            />
          </div>
          <button type="submit" className="bg-green-500 p-2 rounded">Buy</button>
        </form>
      ) : (
        <form onSubmit={handleSell}>
          <div className="mb-4">
            <label htmlFor="sellPrice" className="block mb-2">Sell Price (from Binance)</label>
            <input
              type="number"
              id="sellPrice"
              value={sellPrice}
              readOnly
              className="w-full bg-gray-700 p-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="quantity" className="block mb-2">Amount in USD</label>
            <input
              type="number"
              id="quantity"
              value={quantityInUSD}
              onChange={handleQuantityChange}
              className="w-full bg-gray-700 p-2 rounded"
              min="0"
              step="0.01"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="total" className="block mb-2">Total</label>
            <input
              type="number"
              id="total"
              value={total}
              readOnly
              className="w-full bg-gray-700 p-2 rounded"
            />
          </div>
          <button type="submit" className="bg-red-500 p-2 rounded">Sell</button>
        </form>
      )}
      <div className="mt-4">
        {walletAmount !== null ? (
          <p>Wallet Amount: ${walletAmount.toFixed(2)}</p>
        ) : (
          <p>Loading wallet amount...</p>
        )}
      </div>
      {success && <p className="text-green-500 mt-2">{success}</p>}
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <div className="flex justify-between mb-4">
        <button
          onClick={() => setMode('buy')}
          className={`px-4 py-2 rounded ${mode === 'buy' ? 'bg-green-500' : 'bg-gray-700'}`}
        >
          Buy
        </button>
        <button
          onClick={() => setMode('sell')}
          className={`px-4 py-2 rounded ${mode === 'sell' ? 'bg-red-500' : 'bg-gray-700'}`}
        >
          Sell
        </button>
      </div>
    </div>
  );
};

export default OrderForm;
