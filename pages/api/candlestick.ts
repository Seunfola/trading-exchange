import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

interface CandlestickData {
  openTime: number;
  open: string;
  high: string;
  low: string;
  close: string;
  closeTime: number;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const { symbol, interval, limit = 100 } = req.query;

      if (!symbol || typeof symbol !== 'string') {
        return res.status(400).json({ message: 'Invalid or missing "symbol" query parameter' });
      }

      if (!interval || typeof interval !== 'string') {
        return res.status(400).json({ message: 'Invalid or missing "interval" query parameter' });
      }

      const response = await axios.get('https://api.binance.com/api/v3/klines', {
        params: {
          symbol,
          interval,
          limit,
        },
      });

      const candlestickData: CandlestickData[] = response.data.map((entry: any) => ({
        openTime: entry[0],
        open: entry[1],
        high: entry[2],
        low: entry[3],
        close: entry[4],
        closeTime: entry[6],
      }));

      res.status(200).json(candlestickData);
    } catch (error) {
      console.error('Error fetching candlestick data:', error);
      res.status(500).json({ message: 'Error fetching candlestick data', error: (error as Error).message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;
