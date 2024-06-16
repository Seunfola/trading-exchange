import { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

const BASE_URL = 'https://api.binance.com';

interface RealTimeData {
  symbol: string;
  lastPrice: string;
  highPrice: string;
  lowPrice: string;
  closeTime: number;
}

export interface HistoricalDataItem {
  symbol: string;
  date: string;
  price: string;
  highPrice: string;
  lowPrice: string;
}

const fetchRealTimeData = async (symbol: string): Promise<RealTimeData> => {
  const response = await axios.get(`${BASE_URL}/api/v3/ticker/24hr`, {
    params: {
      symbol,
    },
  });
  return response.data;
};

const fetchHistoricalData = async (symbol: string): Promise<HistoricalDataItem[]> => {
  const endTime = Date.now();
  const startTime = endTime - (365 * 24 * 60 * 60 * 1000);

  const response = await axios.get(`${BASE_URL}/api/v3/klines`, {
    params: {
      symbol,
      interval: '1d',
      startTime,
      endTime,
      limit: 365,
    },
  });

  const historicalData: HistoricalDataItem[] = response.data.map((item: any) => ({
    date: format(new Date(item[0]), 'yyyy-MM-dd'),
    price: item[4],
    highPrice: item[2],
    lowPrice: item[3],
  }));

  return historicalData;
};

interface MarketData {
  symbol: string;
  realTimeData: RealTimeData | null;
  historicalData: HistoricalDataItem[];
  isLoading: boolean;
  isError: boolean;
}

export const useCurrencyPairsPrices = (symbols: string[]): MarketData[] => {
  const [marketData, setMarketData] = useState<MarketData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const newMarketData: MarketData[] = await Promise.all(
        symbols.map(async (symbol) => {
          try {
            const realTimeData = await fetchRealTimeData(symbol);
            const historicalData = await fetchHistoricalData(symbol);
            return {
              symbol, 
              realTimeData,
              historicalData,
              isLoading: false,
              isError: false,
            };
          } catch (error) {
            console.error(`Error fetching data for ${symbol}:`, error);
            return {
              symbol,
              realTimeData: null,
              historicalData: [],
              isLoading: false,
              isError: true,
            };
          }
        })
      );
      setMarketData(newMarketData);
    };

    fetchData();
  }, [symbols]);

  return marketData;
};
