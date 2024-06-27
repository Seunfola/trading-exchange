import React, { useState } from 'react';

const LinkWallet: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [currency, setCurrency] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const handleLinkWallet = async () => {
    try {
      const response = await fetch('https://api.binance.com/api/v3/account/walletLink', {
        method: 'POST',
        body: JSON.stringify({ email, password, walletAddress, currency, privateKey }),
        headers: {
          'Content-Type': 'application/json',
          'X-MBX-APIKEY': 'process.env.NEXT_BINANCE_PUBLIC_SECRET_KEY', 
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.msg || 'Error linking wallet');
      }

      setMessage('Wallet linked successfully');
    } catch (error) {
      setMessage((error as Error).message || 'Error linking wallet');
    }
  };

  return (
    <div className="bg-gray-900 p-4 sm:p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Link Wallet</h2>
      <div className="flex flex-col mb-4">
        <label className="text-gray-400 mb-1">Email</label>
        <input
          type="email"
          className="bg-gray-800 text-white py-2 px-4 rounded"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col mb-4">
        <label className="text-gray-400 mb-1">Password</label>
        <input
          type="password"
          className="bg-gray-800 text-white py-2 px-4 rounded"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex flex-col mb-4">
        <label className="text-gray-400 mb-1">Wallet Address</label>
        <input
          type="text"
          className="bg-gray-800 text-white py-2 px-4 rounded"
          placeholder="Enter wallet address"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
        />
      </div>
      <div className="flex flex-col mb-4">
        <label className="text-gray-400 mb-1">Currency</label>
        <input
          type="text"
          className="bg-gray-800 text-white py-2 px-4 rounded"
          placeholder="Enter currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        />
      </div>
      <div className="flex flex-col mb-4">
        <label className="text-gray-400 mb-1">Private Key (optional)</label>
        <input
          type="text"
          className="bg-gray-800 text-white py-2 px-4 rounded"
          placeholder="Enter private key (optional)"
          value={privateKey}
          onChange={(e) => setPrivateKey(e.target.value)}
        />
      </div>
      <button
        className="w-full py-2 rounded bg-blue-700 text-white"
        onClick={handleLinkWallet}
      >
        Link Wallet
      </button>
      {message && <div className="text-red-500 mt-4">{message}</div>}
    </div>
  );
};

export default LinkWallet;
