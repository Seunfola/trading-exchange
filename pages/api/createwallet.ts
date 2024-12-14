import { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import crypto from "crypto";
import prisma from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }

    console.log("Incoming request body:", req.body);

    const { userId, useThirdParty } = req.body;

    if (!userId || typeof userId !== "number") {
      console.error("Invalid or missing userId:", userId);
      return res.status(400).json({ message: "Invalid or missing User ID" });
    }

    console.log("Valid userId received:", userId);

    const infuraUrl = process.env.INFURA_URL;
    const thirdPartyWalletCreationUrl = process.env.THIRD_PARTY_WALLET_URL
      ? `${process.env.THIRD_PARTY_WALLET_URL}?userId=${userId}`
      : null;

    if (!infuraUrl) {
      console.error("Missing Infura URL in environment variables");
      return res.status(500).json({ message: "INFURA_URL must be configured in the environment" });
    }

    if (useThirdParty) {
      if (!thirdPartyWalletCreationUrl) {
        console.error("Third-party wallet URL not configured");
        return res.status(500).json({ message: "Third-party wallet URL is not configured" });
      }

      console.log(`Redirecting to third-party wallet service for userId: ${userId}`);
      return res.redirect(307, thirdPartyWalletCreationUrl);
    }

    const walletDetails = await createInfuraWallet(userId, infuraUrl);

    console.log(`Wallet successfully created for userId: ${userId}, address: ${walletDetails.address}`);
    return res.status(201).json(walletDetails);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Stack trace:", error.stack);
      return res.status(500).json({ message: error.message });
    } else {
      console.error("Unknown error occurred:", error);
      return res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
};

// Function to create a wallet using Infura
const createInfuraWallet = async (userId: number, infuraUrl: string) => {
  try {
    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      throw new Error(`User with ID ${userId} does not exist.`);
    }

    // Initialize the provider
    const provider = new ethers.providers.JsonRpcProvider(infuraUrl);

    // Generate a secure seed phrase
    const mnemonic = ethers.utils.entropyToMnemonic(ethers.utils.randomBytes(16));
    console.log("Generated seed phrase:", mnemonic);

    // Derive the seed from the mnemonic
    const hdNode = ethers.utils.HDNode.fromMnemonic(mnemonic);
    const address = hdNode.address;

    // Get the balance of the newly created wallet (default is 0 for new wallets)
    const balance = await provider.getBalance(address);
    console.log(`Balance for address ${address}: ${ethers.utils.formatEther(balance)} ETH`);

    // Save public address and user ID in the database
    const savedWallet = await prisma.wallet.create({
      data: {
        address,
        userId,
        balance: parseFloat(ethers.utils.formatEther(balance)), // Convert balance to a number
        currency: "ETH",
      },
    });

    // Encrypt the seed phrase
    const cipher = crypto.createCipheriv(
      "aes-256-cbc",
      Buffer.from(process.env.ENCRYPTION_KEY!, "hex"),
      Buffer.from(process.env.IV!, "hex")
    );
    let encryptedMnemonic = cipher.update(mnemonic, "utf8", "hex");
    encryptedMnemonic += cipher.final("hex");

    return {
      address: savedWallet.address,
      balance: savedWallet.balance,
      seedPhrase: encryptedMnemonic,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error creating Infura wallet:", error.message);
      throw new Error(error.message);
    } else {
      console.error("Unknown error occurred while creating wallet:", error);
      throw new Error("An unexpected error occurred during wallet creation.");
    }
  }
};
