import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWallet,
  faPlus,
  faLink,
  faCircleNotch,
} from "@fortawesome/free-solid-svg-icons";

const CreateWallet = () => {
  const [activeTab, setActiveTab] = useState<"link" | "create">("link");
  const [useThirdParty, setUseThirdParty] = useState(false);
  const [loading, setLoading] = useState(false);
  const [walletData, setWalletData] = useState<{ address: string; message: string }>({
    address: "",
    message: "",
  });

  const handleCreateWallet = async (type: "custom" | "third-party") => {
    setLoading(true);
    try {
      const response = await fetch("/api/createWallet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ useThirdParty: type === "third-party" }),
      });

      if (!response.ok) throw new Error("Error creating wallet");

      const data = await response.json();
      setWalletData({
        address: data.address || "",
        message: data.message || "Wallet created successfully!",
      });
    } catch (error) {
      setWalletData({
        address: "",
        message: (error as Error).message || "Failed to create wallet.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white flex items-center justify-center p-6">
      <div className="bg-gray-800 rounded-3xl shadow-2xl w-full max-w-3xl p-8">
        {/* Tab Navigation */}
        <div className="flex justify-center gap-8 mb-6">
          <button
            onClick={() => setActiveTab("link")}
            className={`px-6 py-3 text-lg font-bold rounded-lg transition ${
              activeTab === "link"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            <FontAwesomeIcon icon={faLink} className="mr-2" />
            Link Wallet
          </button>
          <button
            onClick={() => setActiveTab("create")}
            className={`px-6 py-3 text-lg font-bold rounded-lg transition ${
              activeTab === "create"
                ? "bg-green-500 text-white shadow-md"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Create Wallet
          </button>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "link" && (
            <div className="text-center">
              <FontAwesomeIcon icon={faLink} className="text-blue-400 text-5xl mb-4" />
              <h2 className="text-2xl font-bold mb-4">Link Your Wallet</h2>
              <p className="text-gray-400 mb-6">Securely connect your wallet to manage transactions.</p>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-500 transition">
                Connect Wallet
              </button>
            </div>
          )}

          {activeTab === "create" && (
            <div>
              <div className="text-center mb-6">
                <FontAwesomeIcon icon={faPlus} className="text-green-400 text-5xl mb-4" />
                <h2 className="text-2xl font-bold mb-4">Create a New Wallet</h2>
                <p className="text-gray-400">
                  Choose between a custom wallet or a third-party service.
                </p>
              </div>

              {/* Wallet Options */}
              <div className="grid gap-4 sm:grid-cols-2">
                <button
                  onClick={() => handleCreateWallet("custom")}
                  className="bg-green-600 p-6 rounded-lg shadow-lg hover:bg-green-500 transition flex flex-col items-center text-center"
                  disabled={loading}
                >
                  {loading ? (
                    <FontAwesomeIcon icon={faCircleNotch} spin className="text-white text-3xl" />
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faWallet} className="text-4xl mb-3" />
                      <h3 className="text-lg font-bold">Custom Wallet</h3>
                      <p className="text-sm text-gray-300">Create a secure wallet with us.</p>
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleCreateWallet("third-party")}
                  className="bg-gray-700 p-6 rounded-lg shadow-lg hover:bg-gray-600 transition flex flex-col items-center text-center"
                  disabled={loading}
                >
                  {loading ? (
                    <FontAwesomeIcon icon={faCircleNotch} spin className="text-white text-3xl" />
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faWallet} className="text-4xl mb-3" />
                      <h3 className="text-lg font-bold">Third-Party Wallet</h3>
                      <p className="text-sm text-gray-300">Use a third-party service to create.</p>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateWallet;
