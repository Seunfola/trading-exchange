import React, { useState } from 'react';

const OrderForm: React.FC = () => {
  const [price, setPrice] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = parseFloat(e.target.value);
    setPrice(isNaN(newPrice) ? 0 : newPrice);
    setTotal((isNaN(newPrice) ? 0 : newPrice) * amount);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseFloat(e.target.value);
    setAmount(isNaN(newAmount) ? 0 : newAmount);
    setTotal(price * (isNaN(newAmount) ? 0 : newAmount));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ price, amount, total }),
      });
      if (!response.ok) {
        throw new Error('Error placing order');
      }
      setSuccess('Order placed successfully');
      setError(null);
      setPrice(0);
      setAmount(0);
      setTotal(0);
    } catch (error) {
      setError(
        (error as Error).message || 'Error placing order');
      setSuccess(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-900 p-4 rounded-lg shadow-md text-white">
      <div className="mb-4">
        <label htmlFor="price" className="block mb-2">Price</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={handlePriceChange}
          className="w-full bg-gray-700 p-2 rounded"
          min="0"
          step="0.01"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="amount" className="block mb-2">Amount</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={handleAmountChange}
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
      {success && <p className="text-green-500 mt-2">{success}</p>}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
};

export default OrderForm;
