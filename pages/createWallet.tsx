import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWallet,
  faPlus,
  faLink,
  faCircleNotch,
  faEye,
  faEyeSlash,
  faExclamationTriangle,
  faFileDownload,
} from "@fortawesome/free-solid-svg-icons";


const CreateWallet = () => {
  const [activeTab, setActiveTab] = useState<"link" | "create">("link");
  const [loading, setLoading] = useState(false);
  const [walletData, setWalletData] = useState<{
    address: string;
    message: string;
    seedPhrase?: string;
  }>({ address: "", message: "" });
  const [error, setError] = useState<string | null>(null);
  const [showSeedPhrase, setShowSeedPhrase] = useState(false);

  const handleCreateWallet = async (type: "custom" | "third-party") => {
    setLoading(true);
    setError(null);
    setWalletData({ address: "", message: "" });


    try {
      // const { userId } = req.query;

      const response = await fetch("/api/createWallet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId:1, // Replace with the actual user ID
          useThirdParty: type === "third-party",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create wallet.");
      }

      const data = await response.json();
      if (!data.address || !data.seedPhrase) {
        throw new Error("Incomplete wallet data received.");
      }

      setWalletData({
        address: data.address,
        message: "Wallet created successfully!",
        seedPhrase: data.seedPhrase,
      });
    } catch (error) {
      setError((error as Error).message || "Failed to create wallet.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadSeedPhrase = () => {
    const element = document.createElement("a");
    const file = new Blob([walletData.seedPhrase || ""], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "seed-phrase.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
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

              {/* Error Message */}
              {error && (
                <div className="mt-6 text-center text-red-500">
                  <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
                  {error}
                </div>
              )}

              {/* Success Message */}
              {walletData.address && (
                <div className="mt-6 text-center text-green-400">
                  <p className="font-bold">{walletData.message}</p>
                  <p className="break-all">{walletData.address}</p>
                </div>
              )}

              {/* Seed Phrase Display */}
              {walletData.seedPhrase && (
                <div className="mt-6 text-center">
                  <p className="font-bold text-gray-300">Seed Phrase (Encrypted)</p>
                  <div className="relative">
                    <p
                      className={`break-all bg-gray-700 p-4 rounded-lg ${
                        showSeedPhrase ? "text-gray-300" : "text-gray-500 blur-sm"
                      }`}
                    >
                      {walletData.seedPhrase}
                    </p>
                    <button
                      onClick={() => setShowSeedPhrase(!showSeedPhrase)}
                      className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400"
                    >
                      <FontAwesomeIcon icon={showSeedPhrase ? faEyeSlash : faEye} />
                    </button>
                  </div>
                  <button
                    onClick={handleDownloadSeedPhrase}
                    className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-500 transition"
                  >
                    <FontAwesomeIcon icon={faFileDownload} className="mr-2" />
                    Download Seed Phrase
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateWallet;
