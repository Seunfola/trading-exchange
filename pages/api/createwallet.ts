import { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { useThirdParty, userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    if (useThirdParty) {
      // Redirect to a third-party wallet creation service
      const thirdPartyWalletCreationUrl = "https://thirdpartywallet.com/create-wallet";
      return res.redirect(307, thirdPartyWalletCreationUrl);
    } else {
      // Create a wallet using ethers.js
      const infuraUrl = process.env.INFURA_URL;
      const privateKey = process.env.PRIVATE_KEY;

      if (!infuraUrl || !privateKey) {
        throw new Error("Environment variables INFURA_URL and PRIVATE_KEY must be set");
      }

      const provider = new ethers.providers.JsonRpcProvider(infuraUrl);
      const adminWallet = new ethers.Wallet(privateKey, provider);

      // Generate a new wallet
      const newWallet = ethers.Wallet.createRandom();
      const address = newWallet.address;
      const privateKeyForNewWallet = newWallet.privateKey;

      // Save the wallet details in the database
      const savedWallet = await prisma.wallet.create({
        data: {
          address,
          userId: Number(userId),
          balance: 0.0, // Initial balance
          currency: "ETH", // Default currency
        },
      });

      return res.status(201).json({
        address: savedWallet.address,
        privateKey: privateKeyForNewWallet,
        balance: savedWallet.balance,
      });
    }
  } catch (error) {
    console.error("Error creating wallet:", error);
    return res.status(500).json({
      message: error instanceof Error ? error.message : "An unexpected error occurred",
    });
  }
};

export default handler;
