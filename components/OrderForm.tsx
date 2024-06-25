import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';

interface CurrencyPair {
  symbol: string;
  price: number;
}

const OrderForm: React.FC = () => {
  const [mode, setMode] = useState<'buy' | 'sell'>('buy');
  const [buyPrice, setBuyPrice] = useState<number>(1);
  const [sellPrice, setSellPrice] = useState<number>(1);
  const [quantityInUSD, setQuantityInUSD] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [walletAmount, setWalletAmount] = useState<number | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currencyPairs, setCurrencyPairs] = useState<CurrencyPair[]>([]);
  const [selectedPair, setSelectedPair] = useState<string>('BTCUSDT');

  useEffect(() => {
    const fetchCurrencyPairs = async () => {
      try {
        const response = await axios.get('https://api.binance.com/api/v3/ticker/price');
        const pairs = response.data.map((pair: { symbol: string, price: string }) => ({
          symbol: pair.symbol,
          price: parseFloat(pair.price),
        }));
        setCurrencyPairs(pairs);
        setSelectedPair(pairs[0].symbol);
      } catch (error) {
        console.error('Error fetching currency pairs:', error);
      }
    };

    fetchCurrencyPairs();
  }, []);

  useEffect(() => {
    const fetchPrices = async () => {
      if (selectedPair) {
        try {
          const response = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${selectedPair}`);
          const price = parseFloat(response.data.price);
          setBuyPrice(1 / price); 
          setSellPrice(1 / price); 
        } catch (error) {
          console.error('Error fetching prices:', error);
        }
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
  }, [selectedPair]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantityInUSD = parseFloat(e.target.value);
    if (isNaN(newQuantityInUSD)) {
      setQuantityInUSD(0);
      setTotal(0);
    } else {
      setQuantityInUSD(newQuantityInUSD);
      setTotal(mode === 'buy' ? newQuantityInUSD * buyPrice : newQuantityInUSD * sellPrice);
    }
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

  const handleSwapPrices = () => {
    setBuyPrice(prevBuyPrice => {
      const temp = prevBuyPrice;
      setBuyPrice(sellPrice);
      setSellPrice(temp);
      return sellPrice;
    });
  };

  const handlePairChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPair(e.target.value);
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-md text-white">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <button
            onClick={handleSwapPrices}
            className="bg-gray-700 text-white p-2 rounded-full mr-4 flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faSyncAlt} />
          </button>
          <select
            value={selectedPair}
            onChange={handlePairChange}
            className="bg-gray-700 text-white p-2 rounded"
          >
            {currencyPairs.map(pair => (
              <option key={pair.symbol} value={pair.symbol}>
                {pair.symbol}
              </option>
            ))}
          </select>
        </div>
      </div>
      {mode === 'buy' ? (
        <form onSubmit={handleBuy}>
          <div className="mb-4">
            <label htmlFor="buyPrice" className="block mb-2">Buy Price (1 {selectedPair.split('USDT')[0]})</label>
            <input
              type="number"
              id="buyPrice"
              value={buyPrice.toFixed(8)} 
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
              min="1"
              step="0.01"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="total" className="block mb-2">Total</label>
            <input
              type="number"
              id="total"
              value={total.toFixed(8)} 
              readOnly
              className="w-full bg-gray-700 p-2 rounded"
            />
          </div>
          <button type="submit" className="bg-green-500 p-2 rounded">Buy</button>
        </form>
      ) : (
        <form onSubmit={handleSell}>
          <div className="mb-4">
            <label htmlFor="sellPrice" className="block mb-2">Sell Price (1 {selectedPair.split('USDT')[0]})</label>
            <input
              type="number"
              id="sellPrice"
              value={sellPrice.toFixed(8)} 
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
              min="1"
              step="0.01"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="total" className="block mb-2">Total</label>
            <input
              type="number"
              id="total"
              value={total.toFixed(8)} 
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
