import { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import prisma from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Allow only POST requests
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }

    console.log("Incoming request body:", req.body);

    // Parse and validate the request body
    const { userId, useThirdParty } = req.body;

    if (!userId || typeof userId !== "number") {
      console.error("Invalid or missing userId:", userId);
      return res.status(400).json({ message: "Invalid or missing User ID" });
    }

    console.log("Valid userId received:", userId);

    // Environment variables
    const infuraUrl = process.env.INFURA_URL;
    const privateKey = process.env.PRIVATE_KEY;
    const thirdPartyWalletCreationUrl = process.env.THIRD_PARTY_WALLET_URL
      ? `${process.env.THIRD_PARTY_WALLET_URL}?userId=${userId}`
      : null;

    if (!infuraUrl || !privateKey) {
      console.error("Missing Infura URL or Private Key in environment variables");
      return res
        .status(500)
        .json({ message: "INFURA_URL and PRIVATE_KEY must be configured in the environment" });
    }

    // Handle third-party wallet creation logic
    if (useThirdParty) {
      if (!thirdPartyWalletCreationUrl) {
        console.error("Third-party wallet URL not configured");
        return res.status(500).json({ message: "Third-party wallet URL is not configured" });
      }

      console.log(`Redirecting to third-party wallet service for userId: ${userId}`);
      return res.redirect(307, thirdPartyWalletCreationUrl);
    }

    // Create wallet using Infura
    const walletDetails = await createInfuraWallet(userId, infuraUrl, privateKey);

    console.log(`Wallet successfully created for userId: ${userId}, address: ${walletDetails.address}`);
    return res.status(201).json(walletDetails);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Stack trace:", error.stack);
      return res.status(500).json({ message: error.message });
    }

    console.error("Unknown error:", error);
    return res.status(500).json({ message: "An unexpected error occurred" });
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

    console.log("Wallet successfully saved in the database:", savedWallet);
    return {
      address: savedWallet.address,
      privateKey: privateKeyForNewWallet,
      balance: savedWallet.balance,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error creating Infura wallet:", error.message);
    } else {
      console.error("Unknown error creating Infura wallet:", error);
    }
    throw new Error("Failed to create wallet");
  }
};
