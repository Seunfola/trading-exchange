import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { userId, walletId, amount, currency = "ETH" } = req.body;

    // Validate request body parameters
    if (!userId || typeof userId !== "number") {
      return res.status(400).json({ message: "Invalid or missing User ID" });
    }
    if (!walletId || typeof walletId !== "number") {
      return res.status(400).json({ message: "Invalid or missing Wallet ID" });
    }
    if (!amount || typeof amount !== "number" || amount <= 0) {
      return res.status(400).json({ message: "Invalid or missing deposit amount" });
    }

    // Find the wallet associated with the walletId
    const wallet = await prisma.wallet.findUnique({
      where: { id: walletId },
      select: {
        id: true,
        balance: true,
        userId: true,
      },
    });

    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    // Verify that the wallet belongs to the user
    if (wallet.userId !== userId) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    // Log the deposit in the Deposit model
    const deposit = await prisma.deposit.create({
      data: {
        userId,
        walletId,
        amount,
        currency,
        status: "COMPLETED",
      },
    });

    // Update the wallet's balance
    const updatedWallet = await prisma.wallet.update({
      where: { id: walletId },
      data: {
        balance: {
          increment: amount,
        },
      },
    });

    // Respond with success and updated balance
    return res.status(200).json({
      message: "Deposit successful",
      deposit,
      updatedBalance: updatedWallet.balance,
    });
  } catch (error) {
    console.error("Error processing deposit:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
