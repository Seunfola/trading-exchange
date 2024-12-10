import React, { useState } from 'react';
import { useCurrencyPairsPrices } from './api/useBTCPrice';

const Markets: React.FC = () => {
  const symbols = ['BTCUSDT', 'ETHUSDT', 'ADAUSDT', 'XRPUSDT']; 
  const marketData = useCurrencyPairsPrices(symbols);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedPair, setSelectedPair] = useState<string>('BTCUSDT');

  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let filteredHistoricalData: any[] = [];

  if (startDate && endDate) {
    filteredHistoricalData = marketData
      .find(data => data.symbol === selectedPair)
      ?.historicalData.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= startDate && itemDate <= endDate;
      }) || [];
  } else {
    filteredHistoricalData = marketData
      .find(data => data.symbol === selectedPair)
      ?.historicalData || [];
  }

  const currentItems = filteredHistoricalData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredHistoricalData.length / itemsPerPage);

  const handlePaginationNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePaginationPrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.valueAsDate;
    setStartDate(date);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.valueAsDate;
    setEndDate(date);
  };

  const handlePairChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const pair = e.target.value;
    setSelectedPair(pair);
  };

  if (marketData.some(data => data.isLoading)) {
    return <div className="text-white">Loading...</div>;
  }

  if (marketData.some(data => data.isError)) {
    return <div className="text-red-500">Error loading data...</div>;
  }

  return (
    <div className="bg-gray-900 min-h-screen">
      <main className="container mx-auto px-4 sm:px-8 py-8">
        <h1 className="text-3xl flex justify-center text-white mb-4">Market Historical Data</h1>

        <div className="mt-4">
          <div className="flex items-center gap-2 mb-4">
            <label htmlFor="startDate" className="mr-2 text-white">Start Date:</label>
            <input
              type="date"
              id="startDate"
              className="px-3 py-1 bg-gray-800 text-white rounded"
              onChange={handleStartDateChange}
            />
            <label htmlFor="endDate" className="ml-4 mr-2 text-white">End Date:</label>
            <input
              type="date"
              id="endDate"
              className="px-3 py-1 bg-gray-800 text-white rounded"
              onChange={handleEndDateChange}
            />
            <label htmlFor="pair" className="mr-2 text-white">Select Pair:</label>
            <select
              id="pair"
              className="px-3 py-1 bg-gray-800 text-white rounded"
              value={selectedPair}
              onChange={handlePairChange}
            >
              {symbols.map((symbol, index) => (
                <option key={index} value={symbol}>{symbol}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4">
          <div className="bg-gray-800 p-6 sm:p-6 flex justify-center rounded-lg shadow-md overflow-x-auto">
            <table className="w-full sm:w-auto bg-gray-800 text-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 sm:px-6 border-b border-gray-700">Date</th>
                  <th className="py-2 px-4 sm:px-6 border-b border-gray-700">Price</th>
                  <th className="py-2 px-4 sm:px-6 border-b border-gray-700">High Price</th>
                  <th className="py-2 px-4 sm:px-6 border-b border-gray-700">Low Price</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr key={index}>
                    <td className="py-2 px-2 sm:px-6 border-b border-gray-700">{item.date}</td>
                    <td className="py-2 px-2 sm:px-6 border-b border-gray-700">{item.price}</td>
                    <td className="py-2 px-2 sm:px-6 border-b border-gray-700">{item.highPrice}</td>
                    <td className="py-2 px-2 sm:px-6 border-b border-gray-700">{item.lowPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end mt-4">
            <button
              className="px-4 py-2 mr-2 bg-gray-800 text-white rounded"
              onClick={handlePaginationPrev}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <button
              className="px-4 py-2 bg-gray-800 text-white rounded"
              onClick={handlePaginationNext}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Markets;
