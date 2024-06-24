import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const CandlestickChart = () => {
  const [series, setSeries] = useState<{ data: any }[]>([]);
  const [symbol, setSymbol] = useState('BTCUSDT');
  const [startDate, setStartDate] = useState<Date>(dayjs().subtract(1, 'month').toDate());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const options: ApexCharts.ApexOptions = {
    chart: {
      height: 350,
      type: 'candlestick', // Ensure this type matches 'candlestick'
      toolbar: {
        show: false,
      },
    },
    title: {
      text: 'Candlestick Chart',
      align: 'left',
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  const handleSymbolChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSymbol(event.target.value);
  };

  const fetchData = async () => {
    try {
      const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1h&startTime=${dayjs(startDate).valueOf()}&endTime=${dayjs(endDate).valueOf()}&limit=1000`;
      const response = await fetch(url);
      const data = await response.json();

      const newSeries = [{
        data: data.map((item: any) => ({
          x: item[0],
          y: [parseFloat(item[1]), parseFloat(item[2]), parseFloat(item[3]), parseFloat(item[4])]
        }))
      }];

      setSeries(newSeries);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDateChange = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex items-center">
          <label htmlFor="symbol" className="mr-2 font-semibold">Select Pair:</label>
          <select id="symbol" value={symbol} onChange={handleSymbolChange} className="px-2 py-1 border border-sky-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500">
            <option value="BTCUSDT">BTC/USDT</option>
            <option value="BTCETH">BTC/ETH</option>
            <option value="ETHUSDT">ETH/USDT</option>
          </select>
        </div>
        <div className="flex items-center">
          <label className="mr-2 font-semibold">Select Start Date:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date as Date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="MMMM d, yyyy"
            className="px-2 py-1 border border-sky-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center">
          <label className="mr-2 font-semibold">Select End Date:</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date as Date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            dateFormat="MMMM d, yyyy"
            className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <button onClick={handleDateChange} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500">Update Chart</button>
      </div>

      <div>
        <ReactApexChart options={options} series={series} type="candlestick" height={350} />
      </div>
    </div>
  );
};

export default CandlestickChart;
