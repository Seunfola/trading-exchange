import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

// Link wallet to user
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    // Extract userId from the request body
    const { userId, address } = req.body;

    // Validate userId and address
    if (!userId || typeof userId !== "number") {
      return res.status(400).json({ message: "Invalid or missing user ID" });
    }

    if (!address || typeof address !== "string") {
      return res.status(400).json({ message: "Invalid wallet address provided" });
    }

    // Check if wallet address is already linked
    const existingWallet = await prisma.wallet.findFirst({
      where: { address },
    });

    if (existingWallet) {
      if (existingWallet.userId === userId) {
        return res.status(200).json({ message: "Wallet is already linked to your profile" });
      } else {
        return res.status(400).json({ message: "Wallet is linked to another user" });
      }
    }

    // Link wallet to user's profile
    const linkedWallet = await prisma.wallet.create({
      data: {
        address,
        userId,
        balance: 0.0, // Set to 0.0 initially
        currency: "ETH",
      },
    });

    return res.status(201).json({
      message: "Wallet linked successfully",
      wallet: linkedWallet,
    });
  } catch (error) {
    console.error("Error linking wallet:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default handler;
