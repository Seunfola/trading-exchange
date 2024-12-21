import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faWallet,
  faSignOutAlt,
  faCogs,
  faSpinner,
  faCopy,
  faCheck,
  faEyeSlash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

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
  emailNotifications?: boolean;
  smsNotifications?: boolean;
  themePreference?: "light" | "dark";
}


const Profile= () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"account" | "wallet" | "settings">("account");
      const [emailNotifications, setEmailNotifications] = useState(false);
    const [smsNotifications, setSmsNotifications] = useState(false);
    const [themePreference, setThemePreference] = useState<"light" | "dark">("dark");
    const [saving, setSaving] = useState(false);


  const [walletVisible, setWalletVisible] = useState(false);
  const [copied, setCopied] = useState(false);

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

        console.log("User Data:", data.user);

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

      useEffect(() => {
      if (user) {
        setEmailNotifications(user.emailNotifications || false);
        setSmsNotifications(user.smsNotifications || false);
        setThemePreference(user.themePreference || "dark");
      }
    }, [user]);

const handleSaveSettings = async () => {
  setSaving(true);
  try {
    const response = await fetch("/api/save-settings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "user-id", 
      },
      body: JSON.stringify({
        emailNotifications,
        smsNotifications,
        themePreference,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to save settings.");
    }

    const result = await response.json();
    alert("Settings saved successfully!");
  } catch (error) {
    console.error("Error saving settings:", error);
    alert("Failed to save settings. Please try again.");
  } finally {
    setSaving(false);
  }
};


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    router.push("/login");
  };

  const handleCopyUserId = () => {
    if (user?.id) {
      navigator.clipboard.writeText(user.id.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
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
              <p className="text-gray-300">
                <strong className="mr-4">Username:</strong> {user?.username}
                <button
                  onClick={handleCopyUserId}
                  className="ml-5 text-white py-1 hover:text-blue-600 transition"
                >
                  <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
                  <span className="ml-2">
                    {copied ? "Copied!" : "Copy"}
                    </span>
                </button>
              </p>
              <p className="text-gray-300">
                <strong className="mr-12">Email:</strong> {user?.email}
              </p>
              <p className="text-gray-300">
                <strong className="mr-7">Created:</strong> {new Date(user?.createdAt || "").toLocaleDateString()}
              </p>
            </div>
          )}
{activeTab === "wallet" && (
  <div className="bg-gray-800 rounded-lg p-6">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold text-blue-300">Wallet Information</h2>
      <button
        onClick={() => router.push("/createWallet")}
        className="flex items-center bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105"
      >
        <FontAwesomeIcon icon={faWallet} className="mr-2" />
        Create Wallet
      </button>
    </div>
    {user?.wallets?.length ? (
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
    <p className="text-gray-400 mt-4">Manage your preferences below:</p>

    {/* Profile Settings */}
    <div className="mt-6">
      <h3 className="text-lg font-medium text-blue-200">Profile Settings</h3>
      <div className="mt-4 space-y-4">
        <div>
          <label className="block text-gray-300">Username</label>
          <input
            type="text"
            value={user?.username || ""}
            className="w-full bg-gray-700 text-white rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-500"
            readOnly
          />
        </div>
        <div>
          <label className="block text-gray-300">Email</label>
          <input
            type="email"
            value={user?.email || ""}
            className="w-full bg-gray-700 text-white rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-500"
            readOnly
          />
        </div>
      </div>
    </div>

    {/* Notification Settings */}
    <div className="mt-8">
      <h3 className="text-lg font-medium text-blue-200">Notification Settings</h3>
      <div className="mt-4 flex items-center">
        <label className="text-gray-300 mr-4">Email Notifications</label>
           <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-500"
            checked={emailNotifications}
            onChange={(e) => setEmailNotifications(e.target.checked)}
          />
      </div>
      <div className="mt-4 flex items-center">
        <label className="text-gray-300 mr-4">SMS Notifications</label>
        <input
          type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-500"
            checked={smsNotifications}
            onChange={(e) => setSmsNotifications(e.target.checked)}
        />
      </div>
    </div>

    {/* Theme Preferences */}
     <div className="mt-6">
        <h3 className="text-lg font-medium text-blue-200">Theme Preferences</h3>
        <div className="mt-4 flex space-x-4">
          <button
            className={`py-2 px-4 ${
              themePreference === "light" ? "bg-blue-500 text-white" : "bg-gray-700 text-white"
            } rounded-lg`}
            onClick={() => setThemePreference("light")}
          >
            Light Mode
          </button>
          <button
            className={`py-2 px-4 ${
              themePreference === "dark" ? "bg-blue-500 text-white" : "bg-gray-700 text-white"
            } rounded-lg`}
            onClick={() => setThemePreference("dark")}
          >
            Dark Mode
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="text-right mt-6">
        <button
          onClick={handleSaveSettings}
          className={`py-2 px-6 ${
            saving ? "bg-gray-600 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
          } text-white rounded-lg`}
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
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
