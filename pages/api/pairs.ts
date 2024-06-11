import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const pairs = await prisma.tradingPair.findMany({
        select: {
          id: true,
          date: true,
          open: true,
          high: true,
          low: true,
          close: true,
        },
      });
      res.status(200).json(pairs);
    } catch (error) {
      res.status(500).json(
        { message: 'Error fetching trading pairs data', error});
    }
  } else {
    res.status(405).json(
        { message: 'Method not allowed' }
    );
  }
};

export default handler;
