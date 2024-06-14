import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderForm: React.FC = () => {
  const [buyPrice, setBuyPrice] = useState<number>(0);
  const [sellPrice, setSellPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [walletAmount, setWalletAmount] = useState<number>(0);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const buyResponse = await axios.get('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT');
        setBuyPrice(parseFloat(buyResponse.data.price));
        const sellResponse = await axios.get('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT');
        setSellPrice(parseFloat(sellResponse.data.price));
      } catch (error) {
        console.error('Error fetching prices:', error);
      }
    };

    const fetchWallet = async () => {
      try {
        const walletResponse = await axios.get('/api/wallet');
        setWalletAmount(walletResponse.data.balance);
      } catch (error) {
        console.error('Error fetching wallet data:', error);
      }
    };

    fetchPrices();
    fetchWallet();
  }, []);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseFloat(e.target.value);
    setQuantity(isNaN(newQuantity) ? 0 : newQuantity);
    setTotal(buyPrice * (isNaN(newQuantity) ? 0 : newQuantity));
  };

  const handleBuy = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (buyPrice * quantity > walletAmount) {
        throw new Error('Insufficient funds in wallet');
      }
      // Simulate buying process
      const newBalance = walletAmount - buyPrice * quantity;
      await axios.post('/api/wallet', { balance: newBalance });
      setWalletAmount(newBalance);
      setSuccess('Purchase successful');
      setError(null);
      setQuantity(0);
      setTotal(0);
    } catch (error) {
      setError((error as Error).message || 'Error purchasing');
      setSuccess(null);
    }
  };

  const handleSell = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (quantity > walletAmount) {
        throw new Error('Insufficient quantity in wallet to sell');
      }
      // Simulate selling process
      const newBalance = walletAmount + sellPrice * quantity;
      await axios.post('/api/wallet', { balance: newBalance });
      setWalletAmount(newBalance);
      setSuccess('Sale successful');
      setError(null);
      setQuantity(0);
      setTotal(0);
    } catch (error) {
      setError((error as Error).message || 'Error selling');
      setSuccess(null);
    }
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-md text-white">
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
          <label htmlFor="quantity" className="block mb-2">Quantity</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
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
      <form onSubmit={handleSell}>
        <div className="mb-4 mt-6">
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
          <label htmlFor="quantity" className="block mb-2">Quantity</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
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
      <div className="mt-4">
        <p>Wallet Amount: ${walletAmount.toFixed(2)}</p>
      </div>
      {success && <p className="text-green-500 mt-2">{success}</p>}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default OrderForm;
