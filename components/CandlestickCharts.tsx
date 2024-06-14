import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, TimeScale, Title, Tooltip, Legend,  } from 'chart.js';
import {
  CandlestickController,
  CandlestickElement,
} from "chartjs-chart-financial";
import { Chart } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
  Legend,
  CandlestickController,
  CandlestickElement
);

interface CandlestickData {
  openTime: number;
  open: string;
  high: string;
  low: string;
  close: string;
  closeTime: number;
  options: any;
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const chartData = {
    datasets: [
      {
        label: `${symbol} Candlestick`,
        data: data.map((item) => ({
          x: item.openTime,
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
    responsive: true,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'minute',
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
