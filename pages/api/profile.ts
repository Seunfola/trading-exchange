import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
import getUserIdFromRequest from '../../lib/getUserIdFormRequest';


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const userId = getUserIdFromRequest(req);
      if (userId === null) {
        return res.status(400).json({ message: 'Invalid userId parameter' });
      }

      const profileData = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          username: true,
          email: true,
          Wallet: {
            select: {
              currency: true,
              balance: true,
            },
          },
          OrderBook: {
            select: {
              symbol: true,
              bidPrice: true,
              askPrice: true,
              bidQuantity: true,
              askQuantity: true,
            },
          },
        },
      });

      if (profileData) {
        res.status(200).json(profileData);
      } else {
        res.status(404).json({ message: 'Profile not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error fetching profile data', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;
