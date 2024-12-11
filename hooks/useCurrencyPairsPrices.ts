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
    if (symbols.length === 0) {
      console.error("Symbols array is empty. WebSocket not started.");
      setIsLoading(false);
      return;
    }

    const streams = symbols.map((symbol) => `${symbol.toLowerCase()}@ticker`).join("/");
    const ws = new WebSocket(`${BINANCE_SOCKET_URL}?streams=${streams}`);

    ws.onopen = () => {
      console.log("WebSocket connection to Binance opened.");
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const payload = data.data;

        if (!payload || !payload.s || !payload.c || !payload.h || !payload.l) {
          console.warn("Invalid payload structure:", payload);
          return;
        }

        const updatedSymbolData = {
          symbol: payload.s,
          historicalData: [
            {
              date: new Date().toISOString(),
              price: parseFloat(payload.c),
              highPrice: parseFloat(payload.h),
              lowPrice: parseFloat(payload.l),
            },
          ],
        };

        setMarketData((prev) => {
          const existingIndex = prev.findIndex((item) => item.symbol === payload.s);

          if (existingIndex !== -1) {
            const updated = [...prev];
            updated[existingIndex].historicalData.push(updatedSymbolData.historicalData[0]);
            return updated;
          }

          return [...prev, updatedSymbolData];
        });

        setIsLoading(false);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
        setIsError(true);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setIsError(true);
    };

    ws.onclose = () => {
      console.log("WebSocket connection to Binance closed.");
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
        ws.close();
      }
    };
  }, [symbols]);

  return { marketData, isLoading, isError };
};
