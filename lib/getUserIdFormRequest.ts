import { NextApiRequest } from 'next';

const getUserIdFromRequest = (req: NextApiRequest): number | null => {
  
  const userId = req.body.userId;

  return typeof userId === 'number' ? userId : null;
};

export default getUserIdFromRequest;
