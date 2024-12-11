import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet, faCheckCircle, faTimesCircle, faSpinner } from "@fortawesome/free-solid-svg-icons";

const CreateWallet: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleCreateWallet = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const response = await fetch("/api/createWallet", {
        method: "POST",
      });

      if (response.redirected) {
        window.location.href = response.url;
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error creating wallet");
      }

      const responseData = await response.json();
      setMessage(responseData.message);
    } catch (error) {
      setMessage((error as Error).message || "Error creating wallet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-blue-500 to-indigo-700 p-6">
      <div className="bg-white text-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-lg">
        <div className="text-center">
          <FontAwesomeIcon
            icon={faWallet}
            className="text-indigo-500 text-5xl mb-4 animate-bounce"
          />
          <h2 className="text-4xl font-bold mb-4">Create Binance Wallet</h2>
          <p className="text-gray-500">
            Start your journey with a secure Binance wallet
          </p>
        </div>

        <button
          onClick={handleCreateWallet}
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
              Creating Wallet...
            </>
          ) : (
            "Create Wallet on Binance"
          )}
        </button>

        {loading && (
          <div className="text-center text-gray-700 mt-4">
            <FontAwesomeIcon
              icon={faSpinner}
              spin
              className="text-indigo-500 text-3xl"
            />
            <p className="mt-2">Please wait while we create your wallet...</p>
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

export default CreateWallet;
