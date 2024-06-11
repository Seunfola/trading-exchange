// CandlestickChart component
import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ChartOptions as ChartJSOptions, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';


const loadFinancialChartModules = async () => {
  const { OhlcElement, OhlcController, CandlestickElement, CandlestickController } = await import('chartjs-chart-financial');
  ChartJS.register(
    OhlcElement,
    OhlcController,
    CandlestickElement,
    CandlestickController
  );
  ChartJS.register(...registerables);
};

interface ChartData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

const CandlestickChart: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/candlestick');
        const data: ChartData[] = await response.json();
        setChartData(data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching candlestick data');
        setLoading(false);
      }
    };
    loadFinancialChartModules(); 
    fetchData();
  }, []);

  const processedData = {
    datasets: [
      {
        label: 'Candlestick Chart',
        data: chartData.map(data => ({
          x: new Date(data.date),
          o: data.open,
          h: data.high,
          l: data.low,
          c: data.close,
        })),
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options: ChartJSOptions<'candlestick'> = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
        },
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Price',
        },
      },
    },
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-md">
      <Chart type="candlestick" data={processedData} options={options} />
    </div>
  );
};

export default CandlestickChart;
