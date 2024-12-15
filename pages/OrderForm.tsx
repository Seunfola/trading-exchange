import React, { useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faMoneyBillWave,
  faDollarSign,
  faBalanceScale,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";

const OrderForm = () => {
  const [orderType, setOrderType] = useState("LIMIT");
  const [side, setSide] = useState<"BUY" | "SELL">("BUY");
  const [triggerPrice, setTriggerPrice] = useState("");
  const [limitPrice, setLimitPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [timeInForce, setTimeInForce] = useState("GTC");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleOrder = async () => {
    if (!limitPrice || !amount || (orderType === "STOP_LIMIT" && !triggerPrice)) {
      setError("Please fill out all required fields.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const body = {
        symbol: "ETHUSDT",
        side,
        type: orderType,
        quantity: parseFloat(amount),
        ...(orderType !== "MARKET" && { price: parseFloat(limitPrice) }),
        ...(orderType === "STOP_LIMIT" && { stopPrice: parseFloat(triggerPrice) }),
        ...(orderType === "LIMIT" && { timeInForce }),
      };

      const response = await fetch("/api/binance-order", {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`Failed to place ${side.toLowerCase()} order`);
      }

      console.log(`${side} order placed`);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeposit = () => {
    router.push("/deposit");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-800 to-white text-white p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {/* Form Title */}
        <div className="md:col-span-2 text-center mb-8">
          <h1 className="text-4xl font-bold">Order Form</h1>
          <p className="text-gray-400">Place a new order using the form below.</p>
        </div>

        {/* Order Type Selection */}
        <div className="col-span-1 bg-gray-900 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-center">Order Type</h2>
          <div className="grid grid-cols-3 gap-4">
            {["LIMIT", "MARKET", "STOP_LIMIT"].map((type) => (
              <button
                key={type}
                className={`py-3 rounded-lg text-center transition-all duration-300 ${
                  orderType === type ? "bg-blue-700 text-white shadow-md" : "bg-gray-800 text-gray-400"
                } hover:scale-105`}
                onClick={() => setOrderType(type)}
              >
                {type.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>

        {/* Buy/Sell Switch */}
        <div className="col-span-1 bg-gray-900 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-center">Order Side</h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              className={`py-3 text-center rounded-lg transition-all duration-300 ${
                side === "BUY" ? "bg-green-700 text-white shadow-lg" : "bg-gray-800 text-gray-400"
              } hover:scale-105`}
              onClick={() => setSide("BUY")}
            >
              <FontAwesomeIcon icon={faDollarSign} className="mr-2" /> Buy
            </button>
            <button
              className={`py-3 text-center rounded-lg transition-all duration-300 ${
                side === "SELL" ? "bg-red-700 text-white shadow-lg" : "bg-gray-800 text-gray-400"
              } hover:scale-105`}
              onClick={() => setSide("SELL")}
            >
              <FontAwesomeIcon icon={faBalanceScale} className="mr-2" /> Sell
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <div className="md:col-span-2 bg-gray-900 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-center">Order Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {orderType === "STOP_LIMIT" && (
              <div className="col-span-1">
                <label className="block text-gray-400 mb-2">Trigger Price</label>
                <input
                  type="number"
                  value={triggerPrice}
                  onChange={(e) => setTriggerPrice(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="Enter trigger price"
                />
              </div>
            )}

            {orderType !== "MARKET" && (
              <div className="col-span-1">
                <label className="block text-gray-400 mb-2">Limit Price</label>
                <input
                  type="number"
                  value={limitPrice}
                  onChange={(e) => setLimitPrice(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="Enter limit price"
                />
              </div>
            )}

            <div className="col-span-1">
              <label className="block text-gray-400 mb-2">Amount (BTC)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Enter amount"
              />
            </div>
          </div>

          {orderType === "LIMIT" && (
            <div className="mt-4">
              <label className="block text-gray-400 mb-2">Time In Force</label>
              <select
                value={timeInForce}
                onChange={(e) => setTimeInForce(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                <option value="GTC">Good Till Cancelled</option>
                <option value="IOC">Immediate Or Cancel</option>
              </select>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="md:col-span-2 flex justify-between items-center mt-6">
          <button
            onClick={handleOrder}
            disabled={loading}
            className={`w-full md:w-1/2 py-3 mr-4 rounded-lg text-lg font-semibold transition-all duration-300 ${
              side === "BUY"
                ? "bg-green-700 hover:bg-green-800 shadow-lg"
                : "bg-red-700 hover:bg-red-800 shadow-lg"
            } text-white hover:scale-105`}
          >
            {loading ? (
              <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
            ) : (
              `${side} BTC`
            )}
          </button>

          <button
            onClick={handleDeposit}
            className="w-full md:w-1/2 py-3 rounded-lg bg-blue-700 hover:bg-blue-800 text-white flex items-center justify-center shadow-md hover:scale-105 transition-all duration-300"
          >
            <FontAwesomeIcon icon={faMoneyBillWave} className="mr-2" />
            Deposit
          </button>
        </div>

        {error && (
          <div className="md:col-span-2 mt-6 text-red-500 text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderForm;
