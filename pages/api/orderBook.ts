import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { symbol, userId } = req.body;

    // Validate input
    if (typeof symbol !== 'string' || typeof userId !== 'number' || userId <= 0) {
      return res.status(400).json({ message: 'Invalid input' });
    }

    try {
      // Fetch bid and ask prices and quantities from the Binance API
      const response = await axios.get(`https://api.binance.com/api/v3/depth?symbol=${symbol}`);
      const { bids, asks } = response.data;

      if (!bids || !asks || bids.length === 0 || asks.length === 0) {
        throw new Error('Failed to fetch bid and ask data from Binance API');
      }

      // Parse bid and ask data
      const bid = bids[0];
      const ask = asks[0];

      // Create new order
      const newOrder = await prisma.orderBook.create({
        data: {
          symbol,
          bidPrice: parseFloat(bid[0]),
          askPrice: parseFloat(ask[0]),
          bidQuantity: parseFloat(bid[1]),
          askQuantity: parseFloat(ask[1]),
          userId,
        },
      });

      res.status(201).json(newOrder);
    } catch (error) {
      console.error('Error placing order:', error);
      res.status(500).json({ message: 'Error placing order', error});
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;
