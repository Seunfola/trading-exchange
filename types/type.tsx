export type HistoricalData = {
  date: string; // ISO date string
  price: number;
  highPrice: number;
  lowPrice: number;
};

export type MarketData = {
  symbol: string;
  historicalData: HistoricalData[];
};
