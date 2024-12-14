import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWallet,
  faSpinner,
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

const LinkWallet = ({ onWalletLinked }: { onWalletLinked: () => void }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

const handleLinkWallet = async () => {
    setLoading(true);
    setMessage(null);

    const userId = localStorage.getItem("userId"); 

    if (!userId) {
      setMessage("User ID is missing.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/linkWallet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: parseInt(userId), // Ensure it's a number
          address: walletAddress,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error linking wallet");
      }

       onWalletLinked();

      setMessage("Wallet linked successfully");
      
    } catch (error) {
      setMessage((error as Error).message || "Error linking wallet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-500 via-blue-500 to-indigo-700 p-6">
      <div className="bg-white text-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-lg">
        <div className="text-center">
          <FontAwesomeIcon
            icon={faWallet}
            className="text-indigo-500 text-5xl mb-4 animate-bounce"
          />
          <h2 className="text-4xl font-bold mb-4">Link Your Wallet</h2>
          <p className="text-gray-500">
            Securely link your wallet to our platform
          </p>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Wallet Address
          </label>
          <input
            type="text"
            className="w-full bg-gray-100 text-gray-800 py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-500"
            placeholder="Enter your wallet address"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
          />
        </div>

        <button
          onClick={handleLinkWallet}
          disabled={loading}
          className={`mt-6 w-full py-3 rounded-lg font-semibold text-white shadow-lg transition-transform transform ${
            loading
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 hover:scale-105"
          }`}
        >
          {loading ? (
            <>
              <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
              Linking Wallet...
            </>
          ) : (
            "Link Wallet"
          )}
        </button>

        {loading && (
          <div className="text-center text-gray-700 mt-4">
            <FontAwesomeIcon
              icon={faSpinner}
              spin
              className="text-indigo-500 text-3xl"
            />
            <p className="mt-2">Please wait while we link your wallet...</p>
          </div>
        )}

        {message && (
          <div
            className={`flex items-center gap-2 mt-4 px-4 py-3 rounded-lg ${
              message.toLowerCase().includes("error")
                ? "bg-red-100 border border-red-400 text-red-700"
                : "bg-green-100 border border-green-400 text-green-700"
            }`}
          >
            <FontAwesomeIcon
              icon={
                message.toLowerCase().includes("error")
                  ? faTimesCircle
                  : faCheckCircle
              }
            />
            <span>{message}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkWallet;
