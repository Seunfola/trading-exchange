import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet, faPlus, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

const Profile: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleLinkWallet = () => {
    router.push('/linkwallet');
  };

  const handleCreateWallet = () => {
    router.push('/createWallet');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8 sm:p-12 rounded-3xl shadow-xl max-w-3xl mx-auto mt-12">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 text-center">
        Your Personalized Dashboard
      </h2>
      <p className="text-lg text-gray-100 mb-8 text-center">
        {isAuthenticated
          ? "Welcome back! Ready to explore? Link your wallet or create a new one to get started."
          : "Hello! Log in to unlock your dashboard and access our exclusive features."}
      </p>
      <div
        className={`grid gap-6 ${
          isAuthenticated ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'
        }`}
      >
        {isAuthenticated ? (
          <>
            <div className="flex flex-col items-center bg-white text-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
              <FontAwesomeIcon
                icon={faWallet}
                className="text-blue-500 text-5xl mb-4"
              />
              <h3 className="text-xl font-bold mb-2">Link Your Wallet</h3>
              <p className="text-sm text-gray-600 mb-4">
                Securely connect your wallet to manage your transactions with ease.
              </p>
              <button
                onClick={handleLinkWallet}
                className="bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Get Started
              </button>
            </div>
            <div className="flex flex-col items-center bg-white text-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
              <FontAwesomeIcon
                icon={faPlus}
                className="text-green-500 text-5xl mb-4"
              />
              <h3 className="text-xl font-bold mb-2">Create a Wallet</h3>
              <p className="text-sm text-gray-600 mb-4">
                Don’t have a wallet? Set up a new one in just a few clicks.
              </p>
              <button
                onClick={handleCreateWallet}
                className="bg-green-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
              >
                Create Now
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center bg-white text-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
            <FontAwesomeIcon
              icon={faSignInAlt}
              className="text-purple-500 text-5xl mb-4"
            />
            <h3 className="text-xl font-bold mb-2">Log In to Continue</h3>
            <p className="text-sm text-gray-600 mb-4">
              Access your dashboard by signing in and unlock full features.
            </p>
            <button
              onClick={handleLogin}
              className="bg-purple-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300"
            >
              Log In
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
