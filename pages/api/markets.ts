import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
    
      const response = await axios.get('https://api.binance.com/api/v3/ticker/24hr');

      const marketData = response.data.map((item: any) => ({
        symbol: item.symbol,
        price: item.lastPrice,
        priceChange: item.priceChangePercent,
      }));

      res.status(200).json(marketData);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching market data', error: (error as Error).message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;
