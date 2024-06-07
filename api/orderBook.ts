import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../lib/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { price, amount, total } = req.body;

    if (typeof price !== 'number' || typeof amount !== 'number' || typeof total !== 'number') {
      return res.status(400).json({ message: 'Invalid input' });
    }

    try {
      const newOrder = await prisma.orderBook.create({
        data: {
          price,
          amount,
          total,
          orderType: 'buy', 
        },
      });
      res.status(201).json(newOrder);
    } catch (error) {
      res.status(500).json({ message: 'Error placing order', error: (error as Error).message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;
