import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { FaChevronDown } from 'react-icons/fa';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { ApexOptions } from 'apexcharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faChartLine, faClock } from '@fortawesome/free-solid-svg-icons';

dayjs.extend(utc);

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const mainIntervals = ['1h', '2h', '4h', '1d', '1m'] as const;
const additionalIntervals = ['3M', '6M', '1Y', '2Y', '5Y', '10Y'] as const;
type MainInterval = typeof mainIntervals[number];
type AdditionalInterval = typeof additionalIntervals[number];
type IntervalKey = MainInterval | AdditionalInterval;

const predefinedIntervals: Record<IntervalKey, Date> = {
  '1h': dayjs().subtract(1, 'hour').toDate(),
  '2h': dayjs().subtract(2, 'hours').toDate(),
  '4h': dayjs().subtract(4, 'hours').toDate(),
  '1d': dayjs().subtract(1, 'day').toDate(),
  '1m': dayjs().subtract(1, 'month').toDate(),
  '3M': dayjs().subtract(3, 'months').toDate(),
  '6M': dayjs().subtract(6, 'months').toDate(),
  '1Y': dayjs().subtract(1, 'year').toDate(),
  '2Y': dayjs().subtract(2, 'years').toDate(),
  '5Y': dayjs().subtract(5, 'years').toDate(),
  '10Y': dayjs().subtract(10, 'years').toDate(),
};

const CandlestickChart = () => {
  const [series, setSeries] = useState<{ data: any }[]>([{ data: [] }]);
  const [symbolList, setSymbolList] = useState<string[]>([]);
  const [selectedSymbol, setSelectedSymbol] = useState<string>('');
  const [selectedInterval, setSelectedInterval] = useState<MainInterval>('1h');
  const [selectedPredefinedInterval, setSelectedPredefinedInterval] = useState<AdditionalInterval | '1m'>('1m');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [intervalDropdownOpen, setIntervalDropdownOpen] = useState(false);
  const [priceDetails, setPriceDetails] = useState({
    currentPrice: 0,
    change24h: 0,
    high24h: 0,
    low24h: 0,
    volume24h: 0,
    amplitude: 0,
    high24hr: 0,
    low24hr: 0,
    volume24hr: 0,
    change24hr: 0,
  });

  const options: ApexOptions = {
    chart: {
      height: 450,
      type: 'candlestick',
      toolbar: { show: false },
    },
    title: {
      text: 'Data Chart Trend',
      align: 'right',
    },
    xaxis: { 
      type: 'datetime' 
    },
    yaxis: {
      tooltip: { 
        enabled: true 
      },
    },
    tooltip: {
      theme: 'dark',
    },
  };

  const fetchSymbols = async () => {
    try {
      const response = await fetch('https://api.binance.com/api/v3/exchangeInfo');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      const symbols = data.symbols.map((symbol: any) => symbol.symbol);
      setSymbolList(symbols);
      if (symbols.length > 0) setSelectedSymbol(symbols[0]);
    } catch (error) {
      console.error('Error fetching symbols:', error);
    }
  };

  const fetchData = async () => {
    try {
      if (!selectedSymbol) return;
      const startTime = predefinedIntervals[selectedPredefinedInterval].getTime();
      const endTime = new Date().getTime();
      const url = `https://api.binance.com/api/v3/klines?symbol=${selectedSymbol}&interval=${selectedInterval}&startTime=${startTime}&endTime=${endTime}&limit=1000`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();

      if (data && data.length) {
        const newSeries = [
          {
            data: data.map((item: any) => ({
              x: new Date(item[0]).getTime(),
              y: [parseFloat(item[1]), parseFloat(item[2]), parseFloat(item[3]), parseFloat(item[4])],
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
        const change24hr = ((currentPrice - parseFloat(data[0][1])) / parseFloat(data[0][1])) * 100;
        const high24hr = high24h;
        const low24hr = low24h;
        const volume24hr = volume24h;

        setPriceDetails({
          currentPrice,
          change24h: change24hr,
          high24h,
          low24h,
          volume24h,
          amplitude,
          high24hr,
          low24hr,
          volume24hr,
          change24hr,
        });
      } else {
        setSeries([{ data: [] }]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setSeries([{ data: [] }]);
    }
  };

  useEffect(() => {
    fetchSymbols();
  }, []);

  useEffect(() => {
    fetchData();
  }, [selectedSymbol, selectedInterval, selectedPredefinedInterval]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-sm">
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold">
            <div className="relative inline-block">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 bg-transparent text-white"
              >
                {selectedSymbol} <FaChevronDown className="ml-2" />
              </button>
              {dropdownOpen && (
                <div className="absolute left-0 w-40 bg-transparent border border-gray-200 rounded-md mt-1 z-10 max-h-48 overflow-y-scroll">
                  {symbolList.map((symbol: string) => (
                    <div
                      key={symbol}
                      onClick={() => {
                        setSelectedSymbol(symbol);
                        setDropdownOpen(false);
                      }}
                      className="px-4 py-2 cursor-pointer bg-transparent hover:bg-sky-700 text-white"
                    >
                      {symbol}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex space-x-4 text-xs text-white">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div><FontAwesomeIcon icon={faClock} /> 24h Change</div>
              <div>{priceDetails.change24hr.toFixed(2)}%</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ color: 'green' }}><FontAwesomeIcon icon={faArrowUp} /> 24h High</div>
              <div>{priceDetails.high24hr.toFixed(2)}%</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ color: 'red' }}><FontAwesomeIcon icon={faArrowDown} /> 24h Low</div>
              <div>{priceDetails.low24hr.toFixed(2)}%</div>
            </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div><FontAwesomeIcon icon={faChartLine} /> 24h Vol</div>
              <div>{priceDetails.volume24hr.toFixed(2)}%</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4 flex justify-end">
        <div className="flex items-center space-x-2">
          {mainIntervals.map((interval) => (
            <button
              key={interval}
              onClick={() => setSelectedInterval(interval)}
              className={`px-2 py-1 ${selectedInterval === interval ? 'bg-transparent text-white rounded' : 'bg-gray-200 text-black'} rounded-md`}
            >
              {interval.toUpperCase()}
            </button>
          ))}
          <div className="relative inline-block">
            <button
              onClick={() => setIntervalDropdownOpen(!intervalDropdownOpen)}
              className="flex items-center px-2 py-2 bg-gray-200 text-black rounded-md"
            >
              <FaChevronDown className="ml"/>
            </button>
            {intervalDropdownOpen && (
              <div className="absolute right-0 w-30 bg-transparent border border-gray-200 rounded-md mt-1 z-10 max-h-48 overflow-y-scroll">
                {additionalIntervals.map((interval) => (
                  <div
                    key={interval}
                    onClick={() => {
                      setSelectedPredefinedInterval(interval);
                      setIntervalDropdownOpen(false);
                    }}
                    className="px-4 py-2 cursor-pointer bg-transparent hover:bg-sky-700 text-white"
                  >
                    {interval}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
         
      </div>
          <div className="flex space-x-4 py-6 justify-end text-xs text-white">
            <div>Current: <span style={{ color: 'green' }}>${priceDetails.currentPrice.toFixed(2)}</span></div>
            <div>Change: <span style={{ color: 'green' }}>{priceDetails.change24h.toFixed(2)}%</span></div>
            <div>High: <span style={{ color: 'green' }}>${priceDetails.high24h.toFixed(2)}</span></div>
            <div>Low: <span style={{ color: 'green' }}>${priceDetails.low24h.toFixed(2)}</span></div>
            <div>Volume: <span style={{ color: 'green' }}>{priceDetails.volume24h.toFixed(2)}</span></div>
            <div>Amplitude: <span style={{ color: 'green' }}>{priceDetails.amplitude.toFixed(2)}%</span></div>
            </div>
      <div>
        <ReactApexChart options={options} series={series} type="candlestick" height={450} />
      </div>
    </div>
  );
};

export default CandlestickChart;
