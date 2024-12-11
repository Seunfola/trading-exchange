import { useEffect, useState } from "react";
import { MarketData } from "../types/type";

const BINANCE_SOCKET_URL = "wss://stream.binance.com:9443/stream";

export const useCurrencyPairsPrices = (symbols: string[]): {
  marketData: MarketData[];
  isLoading: boolean;
  isError: boolean;
} => {
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    if (symbols.length === 0) return;

    const streams = symbols.map((symbol) => `${symbol.toLowerCase()}@ticker`).join("/");
    const ws = new WebSocket(`${BINANCE_SOCKET_URL}?streams=${streams}`);

    ws.onopen = () => {
      console.log("WebSocket connection to Binance opened.");
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const payload = data.data;

        setMarketData((prev) => {
          const existing = prev.find((item) => item.symbol === payload.s);
          if (existing) {
            return prev.map((item) =>
              item.symbol === payload.s
                ? {
                    ...item,
                    historicalData: [
                      ...item.historicalData,
                      {
                        date: new Date().toISOString(),
                        price: parseFloat(payload.c),
                        highPrice: parseFloat(payload.h),
                        lowPrice: parseFloat(payload.l),
                      },
                    ],
                  }
                : item
            );
          } else {
            return [
              ...prev,
              {
                symbol: payload.s,
                historicalData: [
                  {
                    date: new Date().toISOString(),
                    price: parseFloat(payload.c),
                    highPrice: parseFloat(payload.h),
                    lowPrice: parseFloat(payload.l),
                  },
                ],
              },
            ];
          }
        });

        setIsLoading(false);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
        setIsError(true);
      }
    };

    ws.onerror = () => {
      console.error("WebSocket error");
      setIsError(true);
    };

    ws.onclose = () => {
      console.log("WebSocket connection to Binance closed.");
    };

    return () => {
      ws.close();
    };
  }, [symbols]);

  return { marketData, isLoading, isError };
};
