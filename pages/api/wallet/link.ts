import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import authMiddleware from '../../../lib/authMiddleware';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const userId = req.userId;
  const { currency, address } = req.body;

  if (!currency || !address) {
    return res.status(400).json({ message: 'Currency and address are required' });
  }

  const binanceApiKey = process.env.NEXT_PUBLIC_BINANCE_API_KEY;
  const binanceApiSecret = process.env.NEXT_PUBLIC_BINANCE_API_SECRET;

  if (!binanceApiKey || !binanceApiSecret) {
    return res.status(500).json({ message: 'Binance API keys are not configured' });
  }

  const existingWallet = await prisma.wallet.findFirst({
    where: { userId },
  });

  if (existingWallet) {
    return res.status(400).json({ message: 'User already has a wallet' });
  }

  const binanceResponse = await axios.get(`https://api.binance.com/api/v3/account`, {
    headers: {
      'X-MBX-APIKEY': binanceApiKey,
    },
    auth: {
      username: binanceApiKey,
      password: binanceApiSecret,
    },
  });

  const balance = binanceResponse.data.balances.find((b: any) => b.asset === currency)?.free || 0;

  const newWallet = await prisma.wallet.create({
    data: {
      currency,
      balance: parseFloat(balance),
      userId,
      address,
      privateKey: '', 
    },
  });

  res.status(201).json(newWallet);
};

export default authMiddleware(handler);
