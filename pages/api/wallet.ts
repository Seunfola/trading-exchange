import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import getUserIdFromRequest from '../../lib/getUserIdFormRequest';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const walletData = await prisma.wallet.findMany({
        select: {
          id: true,
          currency: true,
          balance: true,
          userId: true,
        },
      });

      res.status(200).json(walletData);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching wallet data', error });
    }
  } else if (req.method === 'POST') {
    try {
      
      const userId = getUserIdFromRequest(req); 

      const existingWallet = await prisma.wallet.findFirst({
        where: {
          userId: {
      equals: userId ?? undefined
    }
        },
      });

      if (existingWallet) {
        return res.status(400).json({ message: 'User already has a wallet' });
      }

     
      const newWallet = await prisma.wallet.create({
        data: {
          currency: 'USD', 
          balance: 0, 
          userId: userId as number,
        },
      });

      res.status(201).json(newWallet);
    } catch (error) {
      res.status(500).json({ message: 'Error creating wallet', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;
