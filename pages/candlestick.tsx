import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { FaChevronDown } from "react-icons/fa";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { ApexOptions } from "apexcharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown, faChartLine, faClock, faSyncAlt } from "@fortawesome/free-solid-svg-icons";

dayjs.extend(utc);

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const mainIntervals = ["1h", "2h", "4h", "1d", "1m"] as const;
const additionalIntervals = ["3M", "6M", "1Y", "2Y", "5Y", "10Y"] as const;
type MainInterval = typeof mainIntervals[number];
type AdditionalInterval = typeof additionalIntervals[number];
type IntervalKey = MainInterval | AdditionalInterval;

const predefinedIntervals: Record<IntervalKey, Date> = {
  "1h": dayjs().subtract(1, "hour").toDate(),
  "2h": dayjs().subtract(2, "hours").toDate(),
  "4h": dayjs().subtract(4, "hours").toDate(),
  "1d": dayjs().subtract(1, "day").toDate(),
  "1m": dayjs().subtract(1, "month").toDate(),
  "3M": dayjs().subtract(3, "months").toDate(),
  "6M": dayjs().subtract(6, "months").toDate(),
  "1Y": dayjs().subtract(1, "year").toDate(),
  "2Y": dayjs().subtract(2, "years").toDate(),
  "5Y": dayjs().subtract(5, "years").toDate(),
  "10Y": dayjs().subtract(10, "years").toDate(),
};

const CandlestickChart = () => {
  const [series, setSeries] = useState<{ data: any }[]>([{ data: [] }]);
  const [symbolList, setSymbolList] = useState<string[]>([]);
  const [selectedSymbol, setSelectedSymbol] = useState<string>("");
  const [selectedInterval, setSelectedInterval] = useState<MainInterval>("1h");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [priceDetails, setPriceDetails] = useState({
    currentPrice: 0,
    change24h: 0,
    high24h: 0,
    low24h: 0,
    volume24h: 0,
    amplitude: 0,
  });

  const options: ApexOptions = {
    chart: {
      height: 450,
      type: "candlestick",
      background: "#1f2937",
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
      },
      toolbar: {
        show: true,
        tools: {
          download: true,
        },
      },
    },
    title: {
      text: "Futuristic Candlestick Chart",
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
          colors: "#a0aec0",
        },
      },
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
      labels: {
        style: {
          colors: "#a0aec0",
        },
      },
    },
    tooltip: {
      theme: "dark",
    },
  };

  const fetchSymbols = async () => {
    try {
      const response = await fetch("https://api.binance.com/api/v3/exchangeInfo");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      const symbols = data.symbols.map((symbol: any) => symbol.symbol);
      setSymbolList(symbols);
      if (symbols.length > 0) setSelectedSymbol(symbols[0]);
    } catch (error) {
      console.error("Error fetching symbols:", error);
    }
  };

  const fetchData = async () => {
    try {
      if (!selectedSymbol) return;
      const startTime = predefinedIntervals[selectedInterval]?.getTime() || dayjs().subtract(1, "month").toDate().getTime();
      const endTime = new Date().getTime();
      const url = `https://api.binance.com/api/v3/klines?symbol=${selectedSymbol}&interval=${selectedInterval}&startTime=${startTime}&endTime=${endTime}&limit=1000`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();

      if (data?.length) {
        const newSeries = [
          {
            data: data.map((item: any) => ({
              x: new Date(item[0]).getTime(),
              y: [
                parseFloat(item[1]),
                parseFloat(item[2]),
                parseFloat(item[3]),
                parseFloat(item[4]),
              ],
            })),
          },
        ];

        setSeries(newSeries);

        const latestData = data[data.length - 1];
        const currentPrice = parseFloat(latestData[4]);
        const high24h = Math.max(...data.map((item: any) => parseFloat(item[2])));
        const low24h = Math.min(...data.map((item: any) => parseFloat(item[3])));
        const volume24h = data.reduce((sum: number, item: any) => sum + parseFloat(item[5]), 0);
        const amplitude = high24h - low24h;
        const change24h = ((currentPrice - parseFloat(data[0][1])) / parseFloat(data[0][1])) * 100;

        setPriceDetails({
          currentPrice,
          change24h,
          high24h,
          low24h,
          volume24h,
          amplitude,
        });
      } else {
        setSeries([{ data: [] }]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setSeries([{ data: [] }]);
    }
  };

  useEffect(() => {
    fetchSymbols();
  }, []);

  useEffect(() => {
    fetchData();
  }, [selectedSymbol, selectedInterval]);

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-6">Candlestick Chart</h1>

        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded flex items-center gap-2"
            >
              {selectedSymbol || "Select Symbol"} <FaChevronDown />
            </button>
            {dropdownOpen && (
              <div className="absolute left-0 mt-2 bg-gray-800 rounded shadow-lg max-h-60 overflow-y-auto">
                {symbolList.map((symbol) => (
                  <div
                    key={symbol}
                    onClick={() => {
                      setSelectedSymbol(symbol);
                      setDropdownOpen(false);
                    }}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-700"
                  >
                    {symbol}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex space-x-4">
            {mainIntervals.map((interval) => (
              <button
                key={interval}
                onClick={() => setSelectedInterval(interval)}
                className={`px-4 py-2 rounded ${
                  selectedInterval === interval
                    ? "bg-blue-600 text-white"
                    : "bg-gray-600 text-gray-300 hover:bg-gray-500"
                }`}
              >
                {interval.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
          <ReactApexChart options={options} series={series} type="candlestick" height={450} />
        </div>

        <div className="flex justify-around items-center mt-6 text-sm">
          <div className="text-center">
            <FontAwesomeIcon icon={faChartLine} className="text-green-400 text-lg" />
            <p>Current Price</p>
            <p className="font-bold">${priceDetails.currentPrice.toFixed(2)}</p>
          </div>
          <div className="text-center">
            <FontAwesomeIcon icon={faArrowUp} className="text-blue-400 text-lg" />
            <p>High 24h</p>
            <p className="font-bold">${priceDetails.high24h.toFixed(2)}</p>
          </div>
          <div className="text-center">
            <FontAwesomeIcon icon={faArrowDown} className="text-red-400 text-lg" />
            <p>Low 24h</p>
            <p className="font-bold">${priceDetails.low24h.toFixed(2)}</p>
          </div>
          <div className="text-center">
            <FontAwesomeIcon icon={faClock} className="text-yellow-400 text-lg" />
            <p>Volume 24h</p>
            <p className="font-bold">{priceDetails.volume24h.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandlestickChart;