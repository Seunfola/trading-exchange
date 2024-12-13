import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet, faEye, faEyeSlash, faSignOutAlt, faSpinner } from "@fortawesome/free-solid-svg-icons";

interface User {
  id: number;
  username: string;
  email: string;
  createdAt: string;
  wallets?: {
    address: string;
    balance: number;
    currency: string;
  }[];
}

const Profile: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [walletVisible, setWalletVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
const fetchUserDetails = async () => {
  const userId = localStorage.getItem("userId"); // Retrieve userId from localStorage

  if (!userId) {
    console.error("User ID not found in localStorage");
    router.push("/login?redirect=profile");
    return;
  }

  try {
    const response = await fetch(`/api/user?userId=${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error fetching user details:", errorData.message);
      throw new Error(errorData.message);
    }

    const data = await response.json();
    setUser(data.user); // Update user state with fetched data
  } catch (error) {
    console.error("Error fetching user details:", error);
    router.push("/login?redirect=profile");
  }
};



    fetchUserDetails();
  }, [isAuthenticated, logout, router]);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
        <div className="text-white text-center">
          <h1 className="text-3xl font-bold mb-4">Redirecting to Login...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 flex flex-col items-center py-12">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome, {user.username}!</h1>
          <button
            onClick={() => {
              logout();
              router.push("/login");
            }}
            className="flex items-center gap-2 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
            Logout
          </button>
        </div>

        {/* User Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800">Account Details</h2>
            <p className="text-gray-600 mt-2">
              <strong>Username:</strong> {user.username}
            </p>
            <p className="text-gray-600">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="text-gray-600">
              <strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800">Wallet Information</h2>
            {user.wallets && user.wallets.length > 0 ? (
              user.wallets.map((wallet, index) => (
                <div key={index} className="mt-2">
                  <p className="text-gray-600">
                    <strong>Wallet Address:</strong>{" "}
                    <span className="font-mono">
                      {walletVisible ? wallet.address : "***************"}
                    </span>
                    <button
                      onClick={() => setWalletVisible(!walletVisible)}
                      className="ml-2 text-indigo-500 hover:text-indigo-700 transition"
                      aria-label="Toggle wallet visibility"
                    >
                      <FontAwesomeIcon icon={walletVisible ? faEyeSlash : faEye} />
                    </button>
                  </p>
                  <p className="text-gray-600">
                    <strong>Balance:</strong> {wallet.balance} {wallet.currency}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No wallets linked.</p>
            )}
          </div>
        </div>
      </div>

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <FontAwesomeIcon icon={faSpinner} spin size="3x" className="text-white" />
        </div>
      )}
    </div>
  );
};

export default Profile;
