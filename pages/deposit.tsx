import { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faCheckCircle,
  faTimesCircle,
  faWallet,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";

const Deposit = () => {
  const [userId, setUserId] = useState("");
  const [walletId, setWalletId] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("ETH");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const validateForm = (): boolean => {
    const amountValue = parseFloat(amount);
    return (
      userId.trim() !== "" &&
      walletId.trim() !== "" &&
      !isNaN(amountValue) &&
      amountValue > 0
    );
  };

  const handleDeposit = async () => {
    if (!validateForm()) {
      setError("Please fill all fields with valid data.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/deposit", {
        method: "POST",
        body: JSON.stringify({
          userId: parseInt(userId),
          walletId: parseInt(walletId),
          amount: parseFloat(amount),
          currency,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to process deposit");
      }

      const data = await response.json();
      setSuccess("Deposit processed successfully!");
      setUserId("");
      setWalletId("");
      setAmount("");
      setCurrency("ETH");
      console.log("Deposit processed", data);
    } catch (error) {
      setError((error as Error).message || "Error processing deposit");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-blue-500 to-indigo-800 p-6">
      <div className="bg-white text-gray-800 p-8 rounded-2xl shadow-2xl max-w-md w-full">
        <div className="text-center">
          <FontAwesomeIcon
            icon={faWallet}
            className="text-indigo-500 text-5xl mb-4 animate-bounce"
          />
          <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
            Deposit Funds
          </h2>
          <p className="text-gray-500">Add funds to your wallet securely</p>
        </div>

        <div className="mt-8 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              User ID
              <span className="text-red-600 ml-1">*</span>
              <span className="text-gray-500 text-xs ml-2">
                (Copy your user ID from your profile )
                <FontAwesomeIcon icon={faCopy} spin className="mr-2 px-2" />
              </span>
            </label>
            <input
              type="text"
              className="block w-full bg-gray-100 text-gray-800 py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm placeholder-gray-400"
              placeholder="Enter your User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Wallet ID
            </label>
            <input
              type="text"
              className="block w-full bg-gray-100 text-gray-800 py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm placeholder-gray-400"
              placeholder="Enter your Wallet ID"
              value={walletId}
              onChange={(e) => setWalletId(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Amount
            </label>
            <input
              type="text"
              className="block w-full bg-gray-100 text-gray-800 py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm placeholder-gray-400"
              placeholder="Enter deposit amount (e.g., 100)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Currency
            </label>
            <input
              type="text"
              className="block w-full bg-gray-100 text-gray-800 py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm placeholder-gray-400"
              placeholder="Enter currency (default: ETH)"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            />
          </div>
        </div>

        <button
          onClick={handleDeposit}
          disabled={loading}
          className={`mt-6 w-full py-3 rounded-lg font-bold text-white transition-transform transform shadow-lg ${
            loading
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 hover:scale-105"
          }`}
        >
          {loading ? (
            <>
              <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
              Processing...
            </>
          ) : (
            "Deposit"
          )}
        </button>

        {error && (
          <div className="flex items-center gap-2 mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
            <FontAwesomeIcon icon={faTimesCircle} />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="flex items-center gap-2 mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
            <FontAwesomeIcon icon={faCheckCircle} />
            <span>{success}</span>
          </div>
        )}

        <button
          className="mt-6 w-full py-3 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold transition-transform transform hover:scale-105"
          onClick={() => router.push("/")}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Deposit;
