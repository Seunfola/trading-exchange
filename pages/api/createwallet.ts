import { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import { PrismaClient } from "@prisma/client";
import authMiddleware from "../../lib/auth/authMiddleware";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Extract authenticated userId from middleware
    const userId = req.userId;

    if (!userId || typeof userId !== "number") {
      return res.status(401).json({ message: "Unauthorized: Invalid or missing user ID" });
    }

    const { useThirdParty } = req.body;

    // Environment variable validations
    const infuraUrl = process.env.INFURA_URL;
    const privateKey = process.env.PRIVATE_KEY;
    const thirdPartyWalletCreationUrl = process.env.THIRD_PARTY_WALLET_URL
      ? `${process.env.THIRD_PARTY_WALLET_URL}?userId=${userId}`
      : null;

    if (!infuraUrl || !privateKey) {
      return res
        .status(500)
        .json({ message: "INFURA_URL and PRIVATE_KEY must be configured in the environment" });
    }

    if (useThirdParty) {
      if (!thirdPartyWalletCreationUrl) {
        return res.status(500).json({ message: "Third-party wallet URL is not configured" });
      }

      console.log(`Redirecting to third-party wallet service for userId: ${userId}`);
      return res.redirect(307, thirdPartyWalletCreationUrl);
    }

    const walletDetails = await createInfuraWallet(userId, infuraUrl, privateKey);
    console.log(`Wallet created for userId: ${userId}, address: ${walletDetails.address}`);
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

    // Generate a new wallet
    const newWallet = ethers.Wallet.createRandom();
    const address = newWallet.address;
    const privateKeyForNewWallet = newWallet.privateKey;

    // Save wallet in the database
    const savedWallet = await prisma.wallet.create({
      data: {
        address,
        userId,
        balance: 0.0,
        currency: "ETH",
      },
    });

    // Return wallet details securely
    return {
      address: savedWallet.address,
      privateKey: privateKeyForNewWallet, // Only return private key for immediate use; handle securely
      balance: savedWallet.balance,
    };
  } catch (error) {
    console.error("Error creating Infura wallet:", error);
    throw new Error("Failed to create wallet");
  }
};

export default authMiddleware(handler);
