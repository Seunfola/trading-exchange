import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('Request method:', req.method);
  console.log('Request body:', req.body);

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const apiKey = process.env.NEXT_PUBLIC_BINANCE_API_KEY;
    if (!apiKey) {
      throw new Error('API key is not set');
    }

    const binanceWalletCreationUrl = 'https://www.binance.com/en/wallet.html';
    console.log('Redirecting to:', binanceWalletCreationUrl);
    return res.redirect(307, binanceWalletCreationUrl);
  } catch (error) {
    console.error('Error creating wallet:', error);
    res.status(500).json({ message: (error as Error).message || 'Error creating wallet' });
  }
};

export default handler;
