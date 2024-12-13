import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import authMiddleware from "../../lib/auth/authMiddleware";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const userId = req.userId;

    if (!userId || typeof userId !== "number") {
      return res.status(401).json({ message: "Unauthorized: Invalid or missing user ID" });
    }

    const { address } = req.body;

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
        balance: 0.0, // Set to 0.0 initially; balance can be fetched separately
        currency: "ETH",
      },
    });

    return res.status(201).json({
      message: "Wallet linked successfully",
      wallet: linkedWallet,
    });
  } catch (error) {
    console.error("Error linking wallet:", error);
    return res.status(500).json({
      message: error instanceof Error ? error.message : "An unexpected error occurred",
    });
  } finally {
    await prisma.$disconnect();
  }
};

export default authMiddleware(handler);
