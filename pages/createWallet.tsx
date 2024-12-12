import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWallet,
  faCheckCircle,
  faTimesCircle,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { useWallet } from "../context/WalletContext";

interface LoadingButtonProps {
  loading: boolean;
  onClick: () => void;
  label: string;
  loadingLabel?: string;
  disabled?: boolean;
}

const LoadingButton = ({
  loading,
  onClick,
  label,
  loadingLabel = "Loading...",
  disabled = false,
}: LoadingButtonProps) => (
  <button
    onClick={onClick}
    disabled={loading || disabled}
    aria-label={loading ? loadingLabel : label}
    aria-busy={loading}
    aria-disabled={loading}
    className={`mt-6 w-full py-3 rounded-lg font-semibold text-white shadow-lg transition-transform transform ${
      loading
        ? "bg-indigo-400 cursor-not-allowed"
        : "bg-indigo-600 hover:bg-indigo-700 hover:scale-105"
    }`}
  >
    {loading ? (
      <>
        <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
        {loadingLabel}
      </>
    ) : (
      label
    )}
  </button>
);

const MessageBanner = ({ message }: { message: string }) => {
  const isError = message.toLowerCase().includes("error");
  return (
    <div
      className={`flex items-center gap-2 mt-4 px-4 py-3 rounded-lg ${
        isError
          ? "bg-red-100 border border-red-400 text-red-700"
          : "bg-green-100 border border-green-400 text-green-700"
      }`}
    >
      <FontAwesomeIcon icon={isError ? faTimesCircle : faCheckCircle} />
      <span>{message}</span>
    </div>
  );
};

const CreateWallet = () => {
  const { wallet, setWallet } = useWallet();

  const handleCreateWallet = async () => {
    setWallet({ ...wallet, loading: true, message: null });
    try {
      const response = await fetch("/api/createWallet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
      setWallet({ ...wallet, loading: false, message: responseData.message });
    } catch (error) {
      setWallet({
        ...wallet,
        loading: false,
        message: (error as Error).message || "Error creating wallet",
      });
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

        <LoadingButton
          loading={wallet.loading}
          onClick={handleCreateWallet}
          label="Create Wallet on Binance"
          loadingLabel="Creating Wallet..."
        />

        {wallet.loading && (
          <div className="text-center text-gray-700 mt-4">
            <FontAwesomeIcon
              icon={faSpinner}
              spin
              className="text-indigo-500 text-3xl"
            />
            <p className="mt-2">Please wait while we create your wallet...</p>
          </div>
        )}

        {wallet.message && <MessageBanner message={wallet.message} />}
      </div>
    </div>
  );
};

export default CreateWallet;
