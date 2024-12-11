import React, { useState } from "react";
import { useCurrencyPairsPrices } from "../hooks/useCurrencyPairsPrices";
import Login from "./login";
import Signup from "./signup";
import { useAuth } from "../context/AuthContext";
import { MarketData, HistoricalData } from "../types/type";

const Markets: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [showLogin, setShowLogin] = useState<boolean>(true);

  const symbols = ["BTCUSDT", "ETHUSDT", "ADAUSDT", "XRPUSDT"];
  const { marketData, isLoading, isError } = useCurrencyPairsPrices(symbols);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedPair, setSelectedPair] = useState<string>("BTCUSDT");

  const itemsPerPage = 10;

  const filteredHistoricalData: HistoricalData[] =
    marketData
      .find((data: MarketData) => data.symbol === selectedPair)
      ?.historicalData.filter((item: HistoricalData) => {
        const itemDate = new Date(item.date);
        return (!startDate || itemDate >= startDate) && (!endDate || itemDate <= endDate);
      }) || [];

  const currentItems = filteredHistoricalData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredHistoricalData.length / itemsPerPage);

  const handlePaginationNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePaginationPrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handlePairChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPair(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>, isStartDate: boolean) => {
    const date = e.target.valueAsDate;
    if (isStartDate) {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  };

  if (isLoading) return <div className="text-white text-center mt-10">Loading data...</div>;
  if (isError) return <div className="text-red-500 text-center mt-10">Error loading data. Please try again later.</div>;

  return !isAuthenticated ? (
    <div className="flex flex-col items-center">
      {showLogin ? <Login /> : <Signup />}
    </div>
  ) : (
    <div className="bg-gray-900 min-h-screen">
      <main className="container mx-auto px-4 sm:px-8 py-8">
        <h1 className="text-3xl text-white text-center font-bold mb-6">Market Historical Data</h1>

        <div className="flex flex-wrap items-center gap-4 mb-6 justify-center">
          <div>
            <label className="block text-white mb-1">Select Pair:</label>
            <select
              value={selectedPair}
              onChange={handlePairChange}
              className="bg-gray-800 text-white rounded px-3 py-2"
            >
              {symbols.map((symbol) => (
                <option key={symbol} value={symbol}>
                  {symbol}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-white mb-1">Start Date:</label>
            <input
              type="date"
              onChange={(e) => handleDateChange(e, true)}
              className="bg-gray-800 text-white rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-white mb-1">End Date:</label>
            <input
              type="date"
              onChange={(e) => handleDateChange(e, false)}
              className="bg-gray-800 text-white rounded px-3 py-2"
            />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <table className="w-full text-white">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b border-gray-700">Date</th>
                <th className="px-4 py-2 border-b border-gray-700">Price</th>
                <th className="px-4 py-2 border-b border-gray-700">High</th>
                <th className="px-4 py-2 border-b border-gray-700">Low</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((item: HistoricalData, index: number) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border-b border-gray-700">{item.date}</td>
                    <td className="px-4 py-2 border-b border-gray-700">{item.price}</td>
                    <td className="px-4 py-2 border-b border-gray-700">{item.highPrice}</td>
                    <td className="px-4 py-2 border-b border-gray-700">{item.lowPrice}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-500">
                    No data available for the selected range.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between mt-4">
          <button
            disabled={currentPage === 1}
            onClick={handlePaginationPrev}
            className="bg-gray-800 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={handlePaginationNext}
            className="bg-gray-800 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
};

export default Markets;
