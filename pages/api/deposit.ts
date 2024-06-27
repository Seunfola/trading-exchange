import type { NextApiRequest, NextApiResponse } from 'next';
import Binance from 'node-binance-api';

const binance = new Binance().options({
  APIKEY: process.env.NEXT_PUBLIC_API_KEY,
  APISECRET: process.env.NEXT_PUBLIC_SECRET_KEY,
  useServerTime: true,
  test: true, 
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { amount } = req.body;

      const accountInfo = await binance.balance();
      console.log('Account Info:', accountInfo);

      console.log(`Depositing ${amount} to user's account`);

      res.status(200).json({ message: 'Deposit simulated', amount, accountInfo });
    } catch (error) {
      res.status(500).json({ error: 'Error processing deposit', details: error});
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;
