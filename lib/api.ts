

export const fetchPairs = async () => {
  const response = await fetch('/api/tradingPairs');
  return await response.json();
};

export const fetchOrderBook = async () => {
  const response = await fetch('/api/orderBook');
  return await response.json();
};

export const fetchCandlestickData = async () => {
  const response = await fetch('/api/candlestick');
  return await response.json();
};
