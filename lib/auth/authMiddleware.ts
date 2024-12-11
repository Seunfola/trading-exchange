import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import getUserIdFromRequest from './getUserIdFormRequest';

// Extend NextApiRequest to include userId
declare module 'next' {
  interface NextApiRequest {
    userId?: number;
  }
}

const authMiddleware = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const userId = getUserIdFromRequest(req);

      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      req.userId = userId; 
      // Attach userId to the request object
      return handler(req, res); 
      // Call the original handler
    } catch (error) {
      console.error('AuthMiddleware Error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
};

export default authMiddleware;
