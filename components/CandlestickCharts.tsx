import React, { useEffect, useState } from 'react';
import { CircleDashed } from 'lucide-react';
import { Chart as ChartJS, registerables } from 'chart.js'; // Import ChartJS and its registerables
import { Chart } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import {
  CandlestickController,
  CandlestickElement,
} from "chartjs-chart-financial";

ChartJS.register(...registerables); // Register all Chart.js modules

interface CandlestickData {
  openTime: number;
  open: string;
  high: string;
  low: string;
  close: string;
  closeTime: number;
}

const CandlestickChart: React.FC<{ symbol: string; interval: string }> = ({ symbol, interval }) => {
  const [data, setData] = useState<CandlestickData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCandlestickData = async () => {
      try {
        const response = await fetch(`/api/candlestick?symbol=${symbol}&interval=${interval}`);
        if (!response.ok) {
          throw new Error('Failed to fetch candlestick data');
        }

        const data: CandlestickData[] = await response.json();
        setData(data);
      } catch (error) {
        setError((error as Error).message || 'Error fetching candlestick data');
      } finally {
        setLoading(false);
      }
    };
    fetchCandlestickData();
  }, [symbol, interval]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-900 text-white">
        <CircleDashed className="w-8 h-8 mr-2 animate-spin"/>
        <span>Loading...</span>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const chartData = {
    datasets: [
      {
        label: `${symbol} Candlestick`,
        data: data.map((item) => ({
          t: new Date(item.openTime),
          o: parseFloat(item.open),
          h: parseFloat(item.high),
          l: parseFloat(item.low),
          c: parseFloat(item.close),
        })),
        borderColor: 'rgba(0, 0, 0, 1)',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Candlestick Chart',
      },
      tooltip: {
        enabled: true,
        mode: 'point',
        intersect: false,
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'minute',
        },
        ticks: {
          source: 'data',
        },
      },
      y: {
        beginAtZero: false,
      },
    },
  };

  return <Chart type="candlestick" data={chartData} options={options} />;
};

export default CandlestickChart;
