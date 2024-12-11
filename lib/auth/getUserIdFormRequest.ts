import jwt from 'jsonwebtoken';
import { NextApiRequest } from 'next';

const getUserIdFromRequest = (req: NextApiRequest): number | null => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string | number };
    const userId = Number(decoded.userId); // Ensure the userId is a number
    if (isNaN(userId)) return null; // Return null if userId is not a valid number
    return userId;
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};

export default getUserIdFromRequest;
