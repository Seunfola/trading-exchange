import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet, faEye, faEyeSlash, faPlus, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

interface User {
  username: string;
  email: string;
  accountType?: string;
  walletAddress?: string | null;
  walletBalance?: string;
}

const Dashboard: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [walletVisible, setWalletVisible] = useState(false);

useEffect(() => {
  const initializeUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token not found in localStorage");
      logout();
      router.push("/login");
      return;
    }

    try {
      // Send token to verifyToken API
      const response = await fetch("/api/verifyToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          console.error("Unauthorized: Invalid token");
          logout();
          router.push("/login");
        } else {
          throw new Error("Failed to verify token");
        }
      }

      const data = await response.json();
      console.log("Verified User Data:", data.user);
      setUser(data.user);
    } catch (error) {
      console.error("Error verifying token:", error);
      logout();
      router.push("/login");
    }
  };

  initializeUser();
}, [isAuthenticated, logout, router]);


  const handleLinkWallet = () => router.push("/linkwallet");
  const handleCreateWallet = () => router.push("/createWallet");
  const handleLogout = () => {
    logout();
    router.push("/login");
  };

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
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome, {user.username}!
          </h1>
          <button
            onClick={handleLogout}
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
              <strong>Account Type:</strong> {user.accountType || "Standard"}
            </p>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800">Wallet Information</h2>
            {user.walletAddress ? (
              <div className="mt-2">
                <p className="text-gray-600">
                  <strong>Wallet Address:</strong>{" "}
                  <span className="font-mono">
                    {walletVisible ? user.walletAddress : "***************"}
                  </span>
                  <button
                    onClick={() => setWalletVisible(!walletVisible)}
                    className="ml-2 text-indigo-500 hover:text-indigo-700 transition"
                    aria-label="Toggle wallet visibility"
                  >
                    <FontAwesomeIcon icon={walletVisible ? faEyeSlash : faEye} />
                  </button>
                </p>
                <p className="text-gray-600 mt-2">
                  <strong>Balance:</strong> {user.walletBalance || "0.00"} ETH
                </p>
              </div>
            ) : (
              <div className="mt-4">
                <p className="text-gray-600 mb-4">
                  No wallet linked. Create or link a wallet to get started.
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={handleLinkWallet}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                  >
                    Link Wallet
                  </button>
                  <button
                    onClick={handleCreateWallet}
                    className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
                  >
                    Create Wallet
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
