import axios from 'axios';

const BASE_URL = 'https://api.binance.com';

export interface RealTimeData {
  symbol: string;
  lastPrice: string;
  highPrice: string;
  lowPrice: string;
  closeTime: number;
}

export const fetchRealTimeData = async (symbol: string): Promise<RealTimeData> => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v3/ticker/24hr?symbol=${symbol}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch real-time data for ${symbol}:`, error);
    throw new Error(`Failed to fetch real-time data for ${symbol}`);
  }
};

export const fetchBTCUSDTRealTimeData = async (): Promise<RealTimeData> => {
  return fetchRealTimeData('BTCUSDT');
};

export const fetchETHBTCRealTimeData = async (): Promise<RealTimeData> => {
  return fetchRealTimeData('ETHBTC');
};

export const fetchUSDTETHRealTimeData = async (): Promise<RealTimeData> => {
  return fetchRealTimeData('USDTETH');
};

export const fetchUSDNGNRealTimeData = async (): Promise<RealTimeData> => {
  return fetchRealTimeData('USDNGN');
};
