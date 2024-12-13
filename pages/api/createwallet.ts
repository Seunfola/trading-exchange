import { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import { PrismaClient } from "@prisma/client";
import authMiddleware from "../../lib/auth/authMiddleware";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userId = req.userId; // Provided by authMiddleware

    if (!userId || typeof userId !== "number") {
      return res.status(401).json({ message: "Unauthorized: User ID is invalid or missing" });
    }

    const { useThirdParty } = req.body;

    const infuraUrl = process.env.INFURA_URL;
    const privateKey = process.env.PRIVATE_KEY;
    const thirdPartyWalletCreationUrl = process.env.THIRD_PARTY_WALLET_URL
      ? `${process.env.THIRD_PARTY_WALLET_URL}?userId=${userId}`
      : null;

    // Validate environment variables
    if (!infuraUrl || !privateKey) {
      return res
        .status(500)
        .json({ message: "INFURA_URL and PRIVATE_KEY must be set in the environment" });
    }

    if (useThirdParty) {
      if (!thirdPartyWalletCreationUrl) {
        return res.status(500).json({ message: "Third-party wallet URL is not configured" });
      }
      return res.redirect(307, thirdPartyWalletCreationUrl);
    }

    // Create custom wallet
    const walletDetails = await createInfuraWallet(userId, infuraUrl, privateKey);
    return res.status(201).json(walletDetails);
  } catch (error) {
    console.error("Error handling wallet creation:", error);
    return res.status(500).json({
      message: error instanceof Error ? error.message : "An unexpected error occurred",
    });
  } finally {
    await prisma.$disconnect();
  }
};

const createInfuraWallet = async (userId: number, infuraUrl: string, privateKey: string) => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(infuraUrl);

    const newWallet = ethers.Wallet.createRandom();
    const address = newWallet.address;
    const privateKeyForNewWallet = newWallet.privateKey;

    const savedWallet = await prisma.wallet.create({
      data: {
        address,
        userId, // Ensure only authenticated userId is allowed
        balance: 0.0,
        currency: "ETH",
      },
    });

    return {
      address: savedWallet.address,
      privateKey: privateKeyForNewWallet, // Only return private key once; handle securely
      balance: savedWallet.balance,
    };
  } catch (error) {
    console.error("Error creating Infura wallet:", error);
    throw new Error("Failed to create wallet");
  }
};

export default authMiddleware(handler);
