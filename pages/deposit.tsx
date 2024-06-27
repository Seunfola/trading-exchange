import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Deposit: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleDeposit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await fetch('/api/deposit', {
        method: 'POST',
        body: JSON.stringify({ amount: parseFloat(amount) }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to process deposit');
      }

      const data = await response.json();
      setSuccess('Deposit simulated successfully');
      setAmount('');
      console.log('Deposit processed', data);
    } catch (error) {
      setError((error as Error).message || 'Error processing deposit');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 p-4 sm:p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Deposit Funds</h2>
      <div className="flex flex-col mb-4">
        <label className="text-gray-400 mb-1">Amount</label>
        <input
          type="text"
          className="bg-gray-800 text-white py-2 px-4 rounded"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <button
        className="w-full py-2 rounded bg-blue-700 text-white"
        onClick={handleDeposit}
        disabled={loading}
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
      {success && <div className="text-green-500 mt-4">{success}</div>}
      <button
        className="w-full py-2 mt-4 rounded bg-gray-700 text-white"
        onClick={() => router.push('/')}
      >
        Back to Orders
      </button>
    </div>
  );
};

export default Deposit;
