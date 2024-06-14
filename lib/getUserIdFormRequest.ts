import { NextApiRequest } from 'next';
import { parseUserId } from './utils';

const getUserIdFromRequest = (req: NextApiRequest): number | null => {
  return parseUserId(req.body.userId);
};

export default getUserIdFromRequest;
