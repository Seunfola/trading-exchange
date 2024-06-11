import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface CandlestickData {
  date: Date;
  open: number;
  high: number;
  low: number;
  close: number;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const candlestickData: CandlestickData[] = await prisma.tradingPair.findMany({
        select: {
          date: true,
          open: true,
          high: true,
          low: true,
          close: true,
        },
      });

      const data = candlestickData.map((entry: CandlestickData) => ({
        date: entry.date.toISOString(), // Convert to ISO string
        open: entry.open,
        high: entry.high,
        low: entry.low,
        close: entry.close,
      }));

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching candlestick data', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;
