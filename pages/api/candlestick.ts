import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface CandlestickData {
  date: Date | string;
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

      const data = candlestickData.map((entry) => {
        let date: Date;

        // Ensure entry.date is a Date object
        if (typeof entry.date === 'string' || entry.date instanceof String) {
          date = new Date(entry.date as string);
        } else if (entry.date instanceof Date) {
          date = entry.date;
        } else {
          throw new Error(`Invalid date format: ${entry.date}`);
        }

        // Validate date
        if (isNaN(date.getTime())) {
          throw new Error(`Invalid date: ${entry.date}`);
        }

        return {
          date: date.toISOString(),
          open: entry.open,
          high: entry.high,
          low: entry.low,
          close: entry.close,
        };
      });

      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching candlestick data:', error);
      res.status(500).json({ message: 'Error fetching candlestick data', error: error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;
