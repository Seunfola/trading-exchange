import { NextApiRequest, NextApiResponse } from 'next';
import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { ethers } from 'ethers';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('Request method:', req.method);
  console.log('Request body:', req.body);

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Check if the request specifies using third-party service
    if (req.body.useThirdParty) {
      const thirdPartyWalletCreationUrl = 'https://thirdpartywallet.com/create-wallet';
      console.log('Redirecting to:', thirdPartyWalletCreationUrl);
      return res.redirect(307, thirdPartyWalletCreationUrl);
    }

    // Otherwise, use Thirdweb to create a wallet
    const infuraUrl = process.env.INFURA_URL;
    const privateKey = process.env.PRIVATE_KEY;

    if (!infuraUrl || !privateKey) {
      throw new Error('Environment variables INFURA_URL and PRIVATE_KEY must be set');
    }

    const provider = new ethers.providers.JsonRpcProvider(infuraUrl);
    const wallet = new ethers.Wallet(privateKey, provider);
    const sdk = new ThirdwebSDK(wallet);

    const createdWallet = await sdk.wallet.create();

    console.log('Wallet creation response:', createdWallet);
    return res.status(201).json({ address: createdWallet.address });
  } catch (error) {
    console.error('Error creating wallet:', error);
    res.status(500).json({ message: error instanceof Error ? error.message : 'Error creating wallet' });
  }
};

export default handler;

