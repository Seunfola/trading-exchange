import React, { useState } from 'react';

const CreateWallet: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);

  const handleCreateWallet = async () => {
    try {
      const response = await fetch('/api/createWallet', {
        method: 'POST',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error creating wallet');
      }

      const responseData = await response.json();
      setMessage(responseData.message);
    } catch (error) {
      setMessage((error as Error).message || 'Error creating wallet');
    }
  };

  return (
    <div className="bg-gray-900 p-4 sm:p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Create Binance Wallet</h2>
      <button
        className="w-full py-2 rounded bg-blue-700 text-white"
        onClick={handleCreateWallet}
      >
        Create Wallet on Binance
      </button>
      {message && <div className="text-green-500 mt-4">{message}</div>}
    </div>
  );
};

export default CreateWallet;
