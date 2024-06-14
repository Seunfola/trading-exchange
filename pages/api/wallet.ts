// import { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client';
// import getUserIdFromRequest from '../../lib/getUserIdFormRequest';
// import axios from 'axios';

// const prisma = new PrismaClient();

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === 'GET') {
//     try {
//       const userId = getUserIdFromRequest(req);
//       const walletData = await prisma.wallet.findFirst({
//         where: {
//           userId: userId ?? undefined,
//         },
//         select: {
//           id: true,
//           currency: true,
//           balance: true,
//           externalBalance: true,
//           userId: true,
//         },
//       });

//       if (!walletData) {
//         return res.status(404).json({ message: 'Wallet not found' });
//       }

//       res.status(200).json(walletData);
//     } catch (error) {
//       res.status(500).json({ message: 'Error fetching wallet data', error });
//     }
//   } else if (req.method === 'POST') {
//     try {
//       const userId = getUserIdFromRequest(req);
//       const { action, currency } = req.body; // Get action from request body

//       if (!action || !currency) {
//         return res.status(400).json({ message: 'Action and currency are required' });
//       }

//       const existingWallet = await prisma.wallet.findFirst({
//         where: {
//           userId: userId ?? undefined,
//         },
//       });

//       if (existingWallet && action === 'new') {
//         return res.status(400).json({ message: 'User already has a wallet' });
//       }

//       if (action === 'existing') {
//         // Integrate with Binance API to link existing wallet
//         const binanceApiKey = process.env.BINANCE_API_KEY;
//         const binanceApiSecret = process.env.BINANCE_API_SECRET;

//         if (!binanceApiKey || !binanceApiSecret) {
//           return res.status(500).json({ message: 'Binance API keys are not configured' });
//         }

//         const binanceResponse = await axios.get(`https://api.binance.com/api/v3/account`, {
//           headers: {
//             'X-MBX-APIKEY': binanceApiKey,
//           },
//           auth: {
//             username: binanceApiKey,
//             password: binanceApiSecret,
//           }
//         });

//         const balance = binanceResponse.data.balances.find(b => b.asset === currency)?.free || 0;

//         const newWallet = await prisma.wallet.create({
//           data: {
//             currency,
//             balance: 0,
//             externalBalance: parseFloat(balance),
//             userId: userId as number,
//           },
//         });

//         return res.status(201).json(newWallet);
//       }

//       if (action === 'new') {
//         const newWallet = await prisma.wallet.create({
//           data: {
//             currency,
//             balance: 0,
//             userId: userId as number,
//           },
//         });

//         return res.status(201).json(newWallet);
//       }

//       return res.status(400).json({ message: 'Invalid action' });
//     } catch (error) {
//       res.status(500).json({ message: 'Error creating wallet', error });
//     }
//   } else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }
// };

// export default handler;
