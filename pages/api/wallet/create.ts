import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import Web3 from 'web3';
import authMiddleware from '../../../lib/authMiddleware';

const prisma = new PrismaClient();
const infuraUrl = `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_PROJECT_ID}`;
const web3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const userId = req.userId as number; // Ensure the type is number

  const existingWallet = await prisma.wallet.findFirst({
    where: { userId },
  });

  if (existingWallet) {
    return res.status(400).json({ message: 'User already has a wallet' });
  }

 const account = web3.eth.accounts.create()

  const newWallet = await prisma.wallet.create({
    data: {
      currency: 'ETH',
      balance: 0,
      userId,
      address: account.address,
      privateKey: account.privateKey,
    },
  });

  res.status(201).json(newWallet);
};

export default authMiddleware(handler);
