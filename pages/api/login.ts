import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import prisma from '../../lib/prisma';

// Initialize the CORS middleware
const cors = Cors({
  methods: ['POST', 'OPTIONS'],
  origin: [
    'https://www.vercel.app',
    'https://trading-exchange-60ivdmgsc-seunfolas-projects.vercel.app',
  ],
  credentials: true,
});

// Helper function to run middleware
async function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}
async function handler(req: NextApiRequest, res: NextApiResponse) {
  await runMiddleware(req, res, cors);

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Origin', 'https://trading-exchange-60ivdmgsc-seunfolas-projects.vercel.app');
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res
      .setHeader('Allow', ['POST'])
      .status(405)
      .json({ success: false, message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const dbStart = Date.now();
    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    const dbEnd = Date.now();
    console.log(`Database query took ${dbEnd - dbStart}ms`);

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    console.log('User Hashed Password:', user.password);

    const bcryptStart = Date.now();
    const isPasswordValid = await bcrypt.compare(password, user.password);
    const bcryptEnd = Date.now();
    console.log(`Password comparison took ${bcryptEnd - bcryptStart}ms`);

    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const { password: _, ...userData } = user;
    res.status(200).json({ success: true, message: 'Login successful', user: userData });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export default handler;
