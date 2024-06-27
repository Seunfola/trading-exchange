import type { NextApiRequest, NextApiResponse } from 'next';
const binance = require('node-binance-api')().options({
  APIKEY: process.env.NEXT_PUBLIC_API_KEY,
  APISECRET: process.env.NEXT_PUBLIC_SECRET_KEY,
  useServerTime: true,
  test: true, // This flag enables the test mode
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { symbol, side, type, timeInForce, quantity, price, stopPrice } = req.body;
      const params: any = { symbol, side, type, quantity };

      if (type === 'LIMIT') {
        params.price = price;
        params.timeInForce = timeInForce;
      } else if (type === 'STOP_LIMIT') {
        params.price = price;
        params.stopPrice = stopPrice;
        params.timeInForce = timeInForce;
      }

      const response = await binance.order(params);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: 'Error placing order', details: error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;
