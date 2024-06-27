import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

const Profile: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleLinkWallet = () => {
    router.push('/linkwallet');
  };

  const handleCreateWallet = () => {
    router.push('/createWallet');
  };

  return (
    <div className="bg-gray-900 p-4 sm:p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">User Dashboard</h2>
      {isAuthenticated ? (
        <div className="text-gray-400 mt-4">
          <p>Welcome to your dashboard. Please link your wallet to start using our services.</p>
          <div className="flex space-x-4 mt-4">
            <button
              onClick={handleLinkWallet}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Link Wallet
            </button>
            <button
              onClick={handleCreateWallet}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Create Wallet
            </button>
          </div>
        </div>
      ) : (
        <div className="text-gray-400 mt-4">
          <p>Please log in to access your dashboard and link or create a wallet.</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
