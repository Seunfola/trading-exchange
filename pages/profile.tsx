import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faWallet, faSignOutAlt, faCogs, faSpinner } from "@fortawesome/free-solid-svg-icons";

interface Wallet {
  address: string;
  balance: number;
  currency: string;
}

interface User {
  id: number;
  username: string;
  email: string;
  createdAt: string;
  wallets?: Wallet[];
}

const Profile: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"account" | "wallet" | "settings">("account");
  const [walletVisible, setWalletVisible] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userId = localStorage.getItem("userId");

      if (!userId) {
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
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching user details:", error);
        router.push("/login?redirect=profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-black">
        <FontAwesomeIcon icon={faSpinner} spin size="3x" className="text-white" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black flex items-center justify-center px-6">
      <div className="w-full max-w-4xl bg-gray-900 text-white rounded-lg shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-400">Welcome, {user?.username}!</h1>
          <p className="text-gray-400">Manage your account, wallets, and settings here.</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => setActiveTab("account")}
            className={`py-2 px-6 rounded-lg ${
              activeTab === "account" ? "bg-blue-500 text-white" : "bg-gray-800 text-gray-400"
            } transition`}
          >
            <FontAwesomeIcon icon={faUser} className="mr-2" /> Account
          </button>
          <button
            onClick={() => setActiveTab("wallet")}
            className={`py-2 px-6 rounded-lg ${
              activeTab === "wallet" ? "bg-blue-500 text-white" : "bg-gray-800 text-gray-400"
            } transition`}
          >
            <FontAwesomeIcon icon={faWallet} className="mr-2" /> Wallets
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`py-2 px-6 rounded-lg ${
              activeTab === "settings" ? "bg-blue-500 text-white" : "bg-gray-800 text-gray-400"
            } transition`}
          >
            <FontAwesomeIcon icon={faCogs} className="mr-2" /> Settings
          </button>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "account" && (
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-blue-300">Account Details</h2>
              <p className="text-gray-300 mt-2">
                <strong>Username:</strong> {user?.username}
              </p>
              <p className="text-gray-300">
                <strong>Email:</strong> {user?.email}
              </p>
              <p className="text-gray-300">
                <strong>Joined:</strong> {new Date(user?.createdAt || "").toLocaleDateString()}
              </p>
            </div>
          )}

          {activeTab === "wallet" && (
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-blue-300">Wallet Information</h2>
              {user?.wallets && user.wallets.length > 0 ? (
                user.wallets.map((wallet, index) => (
                  <div key={index} className="mt-4">
                    <p className="text-gray-300">
                      <strong>Wallet Address:</strong>{" "}
                      <span className="font-mono">
                        {walletVisible ? wallet.address : "***************"}
                      </span>
                      <button
                        onClick={() => setWalletVisible(!walletVisible)}
                        className="ml-2 text-blue-400 hover:text-blue-600 transition"
                      >
                        <FontAwesomeIcon icon={walletVisible ? faEyeSlash : faEye} />
                      </button>
                    </p>
                    <p className="text-gray-300">
                      <strong>Balance:</strong> {wallet.balance.toFixed(2)} {wallet.currency}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 mt-4">No wallets linked yet.</p>
              )}
            </div>
          )}

          {activeTab === "settings" && (
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-blue-300">Settings</h2>
              <p className="text-gray-400 mt-4">This section allows you to configure your preferences.</p>
              {/* Add settings options here */}
            </div>
          )}
        </div>

        {/* Logout Button */}
        <div className="text-center mt-8">
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
          >
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
