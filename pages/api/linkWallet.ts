// import { NextApiRequest, NextApiResponse } from 'next';
// import bcrypt from 'bcryptjs';
// import prisma from '../../lib/prisma';

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === 'POST') {
//     const { email, password, walletAddress, currency, privateKey } = req.body;

//     if (!email || !password || !walletAddress || !currency) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     try {
//       const user = await prisma.user.findUnique({
//         where: { email },
//       });

//       if (!user) {
//         return res.status(401).json({ message: 'Invalid email or password' });
//       }

//       const isPasswordValid = await bcrypt.compare(password, user.password);

//       if (!isPasswordValid) {
//         return res.status(401).json({ message: 'Invalid email or password' });
//       }

//       const wallet = await prisma.wallet.create({
//         data: {
//           address: walletAddress,
//           currency,
//           privateKey,
//           userId: user.id,
//         },
//       });

//       res.status(200).json({ message: 'Wallet linked successfully', wallet });
//     } catch (error) {
//       res.status(500).json({ message: 'Error linking wallet', error: (error as Error).message });
//     }
//   } else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }
// };

// export default handler;
