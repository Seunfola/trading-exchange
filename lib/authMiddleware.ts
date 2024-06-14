import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import getUserIdFromRequest from './getUserIdFormRequest';
const authMiddleware = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const userId = getUserIdFromRequest(req);

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.userId = userId;
    return handler(req, res);
  };
};

export default authMiddleware;
