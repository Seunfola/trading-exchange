import type { NextApiRequest, NextApiResponse } from 'next';
import Binance from 'node-binance-api';

const binance = new Binance().options({
  APIKEY: process.env.NEXT_PUBLIC_API_KEY,
  APISECRET: process.env.NEXT_PUBLIC_SECRET_KEY,
  useServerTime: true,
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const balance = await binance.balance();
      res.status(200).json(balance);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching balance', details: error});
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;
