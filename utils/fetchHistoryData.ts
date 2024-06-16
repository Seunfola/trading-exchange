import axios from 'axios';
import { format } from 'date-fns';

const BASE_URL = 'https://api.binance.com';

export interface HistoricalDataItem {
    symbol: string;
  date: string;
  price: string;
  highPrice: string;
  lowPrice: string;
}

export const fetchHistoricalData = async (symbols: string[]): Promise<{ [key: string]: HistoricalDataItem[] }> => {
  try {
    const endTime = Date.now();
    const startTime = endTime - (365 * 24 * 60 * 60 * 1000);

    const requests = symbols.map(async (symbol) => {
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

      return { [symbol]: historicalData };
    });

    const historicalDataArray = await Promise.all(requests);
    const historicalDataMap: { [key: string]: HistoricalDataItem[] } = {};
    
    historicalDataArray.forEach((data) => {
      const key = Object.keys(data)[0];
      historicalDataMap[key] = data[key];
    });

    return historicalDataMap;
  } catch (error) {
    console.error('Failed to fetch historical data:', error);
    throw new Error('Failed to fetch historical data');
  }
};
