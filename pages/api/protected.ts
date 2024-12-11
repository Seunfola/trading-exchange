import { NextApiRequest, NextApiResponse } from 'next';
import authMiddleware from '../../lib/auth/authMiddleware';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = req.userId; 
  // Safely access userId as a number
  res.status(200).json({ message: 'Authenticated request!', userId });
};

export default authMiddleware(handler);
