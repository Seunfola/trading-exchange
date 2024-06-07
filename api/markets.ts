import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../lib/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const marketData = await prisma.market.findMany({
        select: {
          id: true,
          name: true,
          price: true,
          change: true,
        },
      });

      res.status(200).json(marketData);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching market data', error: (error as Error).message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;
