import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Check if Binance API key is configured
    const apiKey = process.env.NEXT_PUBLIC_BINANCE_API_KEY;
    if (!apiKey) {
      throw new Error('API key is not set');
    }

    // Redirect to Binance wallet creation URL
    const binanceWalletCreationUrl = 'https://www.binance.com/en/wallet.html';
    return res.redirect(307, binanceWalletCreationUrl);
  } catch (error) {
    console.error('Error creating wallet:', error);
    res.status(500).json({ message: (error as Error).message || 'Error creating wallet' });
  }
};

export default handler;
