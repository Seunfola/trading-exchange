import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      
      const walletData = await prisma.wallet.findMany({
        select: {
          id: true,
          currency: true,
          balance: true,
        },
      });

      res.status(200).json(walletData);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching wallet data', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;
