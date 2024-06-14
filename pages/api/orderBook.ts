import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { symbol, bidPrice, askPrice, bidQuantity, askQuantity, userId } = req.body;

    if (
      typeof symbol !== 'string' || typeof bidPrice !== 'number' || typeof askPrice !== 'number' ||
      typeof bidQuantity !== 'number' || typeof askQuantity !== 'number' || typeof userId !== 'number' ||
      bidPrice <= 0 || askPrice <= 0 || bidQuantity <= 0 || askQuantity <= 0 || userId <= 0
    ) {
      return res.status(400).json({ message: 'Invalid input' });
    }

    try {
      const newOrder = await prisma.orderBook.create({
        data: {
          symbol,
          bidPrice,
          askPrice,
          bidQuantity,
          askQuantity,
          userId,
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
