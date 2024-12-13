import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWallet,
  faCheckCircle,
  faTimesCircle,
  faSpinner,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";

const CreateWallet = () => {
  const [step, setStep] = useState<"select" | "loading" | "result">("select");
  const [useThirdParty, setUseThirdParty] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [walletData, setWalletData] = useState({ address: "", message: "" });

  const handleCreateWallet = async () => {
  setStep("loading");
  setLoadingMessage(
    useThirdParty ? "Contacting third-party service..." : "Creating your custom wallet..."
  );

  try {
    const response = await fetch("/api/createWallet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, 
      },
      body: JSON.stringify({ useThirdParty }),
    });

    if (response.status === 401) {
      // Redirect to login if unauthorized
      window.location.href = "/login";
      return;
    }

    if (response.redirected) {
      console.log("Redirecting to:", response.url);
      setLoadingMessage("Redirecting to third-party service...");
      window.location.href = response.url;
      return;
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error creating wallet");
    }

    const responseData = await response.json();
    setWalletData({
      address: responseData.address || "",
      message: responseData.message || "Wallet created successfully!",
    });
    setStep("result");
  } catch (error) {
    console.error("Error during wallet creation:", error);
    setWalletData({
      address: "",
      message: (error as Error).message || "Error creating wallet",
    });
    setStep("result");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-blue-500 to-indigo-700 p-6">
      <div className="bg-white text-gray-800 p-8 rounded-xl shadow-xl w-full max-w-lg">
        {/* Step: Select Method */}
        {step === "select" && (
          <div className="text-center space-y-6">
            <FontAwesomeIcon
              icon={faWallet}
              className="text-indigo-500 text-5xl mb-4 animate-bounce"
            />
            <h2 className="text-3xl font-bold text-gray-800">Create Your Wallet</h2>
            <p className="text-gray-600">
              Choose how you want to create your wallet. Select our secure custom service or a
              third-party service.
            </p>
            <div className="grid gap-4 mt-6">
              <button
                onClick={() => {
                  setUseThirdParty(false);
                  handleCreateWallet();
                }}
                className="relative flex items-center justify-center gap-2 py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition duration-300 group"
              >
                <FontAwesomeIcon
                  icon={faWallet}
                  className="absolute left-4 group-hover:rotate-12 transition-transform"
                />
                Custom Wallet
              </button>
              <button
                onClick={() => {
                  setUseThirdParty(true);
                  handleCreateWallet();
                }}
                className="relative flex items-center justify-center gap-2 py-3 px-6 bg-gradient-to-r from-gray-600 to-gray-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition duration-300 group"
              >
                <FontAwesomeIcon
                  icon={faWallet}
                  className="absolute left-4 group-hover:rotate-12 transition-transform"
                />
                Third-Party Wallet
              </button>
            </div>
          </div>
        )}

        {/* Step: Loading */}
        {step === "loading" && (
          <div className="text-center space-y-4">
            <FontAwesomeIcon icon={faSpinner} spin className="text-indigo-500 text-5xl" />
            <p className="text-gray-600">{loadingMessage}</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
              <div
                className="bg-indigo-500 h-2.5 rounded-full animate-pulse"
                style={{ width: "75%" }}
              ></div>
            </div>
          </div>
        )}

        {/* Step: Result */}
        {step === "result" && (
          <div className="text-center space-y-6">
            {walletData.address ? (
              <>
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="text-green-500 text-5xl mb-4"
                />
                <h2 className="text-2xl font-bold text-gray-800">Wallet Created Successfully!</h2>
                <p className="text-gray-600">
                  Your wallet address:
                  <span className="block font-mono text-indigo-500 mt-2">{walletData.address}</span>
                </p>
                <button
                  onClick={() => navigator.clipboard.writeText(walletData.address)}
                  className="flex items-center justify-center gap-2 py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:bg-indigo-700 transition"
                >
                  <FontAwesomeIcon icon={faCopy} />
                  Copy Address
                </button>
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faTimesCircle} className="text-red-500 text-5xl" />
                <h2 className="text-2xl font-bold text-gray-800">Error Creating Wallet</h2>
                <p className="text-gray-600">{walletData.message}</p>
              </>
            )}
            <button
              onClick={() => setStep("select")}
              className="flex items-center justify-center gap-2 py-3 px-6 bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateWallet;
