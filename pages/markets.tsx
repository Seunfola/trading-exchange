import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import dynamic from "next/dynamic";
import { FaChevronDown } from "react-icons/fa";
import debounce from "lodash/debounce";
import { ApexOptions } from "apexcharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faSyncAlt, faDownload, faSignal, faSpinner } from "@fortawesome/free-solid-svg-icons";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Markets = () => {
  const { isAuthenticated } = useAuth();
  const [symbols, setSymbols] = useState<string[]>(["BTCUSDT", "ETHUSDT", "ADAUSDT", "XRPUSDT"]);
  const [selectedSymbol, setSelectedSymbol] = useState<string>("BTCUSDT");
  const [series, setSeries] = useState<any[]>([{ data: [] }]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const options: ApexOptions = {
    chart: {
      height: 450,
      type: "candlestick",
      background: "#1f2937",
      animations: {
        enabled: true,
        dynamicAnimation: {
          enabled: true,
          speed: 800,
        },
      },
      toolbar: {
        show: true,
        tools: {
          download: true,
          pan: true,
        },
      },
      zoom: {
        enabled: true,
        type: "x",
        autoScaleYaxis: true,
      },
    },
    title: {
      text: "Candlestick Chart",
      align: "center",
      style: {
        color: "#e5e7eb",
        fontSize: "20px",
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        style: {
          colors: "#ffffff",
        },
      },
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
      labels: {
        style: {
          colors: "#ffffff",
        },
      },
    },
    tooltip: {
      theme: "dark",
    },
  };

  const fetchMarketData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.binance.com/api/v3/klines?symbol=${selectedSymbol}&interval=1h&limit=100`
      );
      if (!response.ok) throw new Error("Error fetching market data");
      const data = await response.json();
      const formattedData = data.map((item: any) => ({
        x: new Date(item[0]).getTime(),
        y: [
          parseFloat(item[1]), // Open
          parseFloat(item[2]), // High
          parseFloat(item[3]), // Low
          parseFloat(item[4]), // Close
        ],
      }));
      setSeries([{ data: formattedData }]);
    } catch (error) {
      console.error("Error fetching market data:", error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchMarketData = useCallback(
    debounce(() => {
      fetchMarketData();
    }, 500),
    [selectedSymbol]
  );

  useEffect(() => {
    debouncedFetchMarketData();
    return () => debouncedFetchMarketData.cancel();
  }, [selectedSymbol, debouncedFetchMarketData]);

  if (!isAuthenticated) {
    return <div className="text-center text-white mt-10">Please log in to view market data.</div>;
  }

  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 min-h-screen">
      <div className="container mx-auto px-4 sm:px-8 py-10">
        <h1 className="text-5xl text-white text-center font-extrabold mb-10 flex justify-center items-center gap-4">
          <FontAwesomeIcon icon={faChartLine} /> Real-Time Market Data
        </h1>

        <div className="flex justify-center items-center gap-6 mb-10">
          <div className="relative inline-block">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center px-8 py-4 border border-gray-600 rounded-lg focus:outline-none focus:ring bg-gray-800 text-white hover:bg-gray-700 hover:scale-105 transition-transform duration-300"
            >
              {selectedSymbol} <FaChevronDown className="ml-2" />
            </button>
            {dropdownOpen && (
              <div className="absolute left-0 w-48 bg-gray-900 border border-gray-700 rounded-lg mt-2 z-10 max-h-56 overflow-y-scroll shadow-xl">
                {symbols.map((symbol) => (
                  <div
                    key={symbol}
                    onClick={() => {
                      setSelectedSymbol(symbol);
                      setDropdownOpen(false);
                    }}
                    className="px-4 py-3 cursor-pointer hover:bg-gray-700 text-white transition-colors duration-200"
                  >
                    {symbol}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={fetchMarketData}
            className="flex items-center gap-2 px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-transform duration-300 focus:outline-none focus:ring"
            disabled={loading}
          >
            {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : <FontAwesomeIcon icon={faSyncAlt} />}
            {loading ? "Loading..." : "Refresh Data"}
          </button>
        </div>

        <div className="bg-gray-800 p-8 rounded-lg shadow-2xl relative">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
              <FontAwesomeIcon icon={faSpinner} spin size="3x" className="text-white" />
            </div>
          )}
          <div className="absolute top-4 right-4 text-white flex items-center gap-2">
            <FontAwesomeIcon icon={faDownload} /> Download Data
          </div>
          <ReactApexChart options={options} series={series} type="candlestick" height={450} />
        </div>

        <div className="flex justify-center items-center mt-6 gap-4 text-white">
          <FontAwesomeIcon icon={faSignal} size="2x" className="text-green-500" />
          <p className="text-lg">Live data fetched directly from Binance</p>
        </div>
      </div>
    </div>
  );
};

export default Markets;
