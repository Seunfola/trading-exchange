import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { userId, walletId, amount, currency = "ETH" } = req.body;

    if (!userId || !walletId || !amount) {
      return res.status(400).json({ message: "User ID, Wallet ID, and amount are required" });
    }

    if (amount <= 0) {
      return res.status(400).json({ message: "Deposit amount must be greater than zero" });
    }

    // Find the wallet
    const wallet = await prisma.wallet.findUnique({
      where: { id: walletId },
    });

    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    // Log the deposit in the Deposit model
    const deposit = await prisma.deposit.create({
      data: {
        userId: Number(userId),
        walletId: Number(walletId),
        amount: Number(amount),
        currency,
        status: "COMPLETED", // In a real scenario, you might set this to "PENDING" initially
      },
    });

    // Update the wallet balance
    const updatedWallet = await prisma.wallet.update({
      where: { id: walletId },
      data: {
        balance: { increment: Number(amount) },
      },
    });

    res.status(200).json({
      message: "Deposit successful",
      deposit,
      updatedBalance: updatedWallet.balance,
    });
  } catch (error) {
    console.error("Error processing deposit:", error);
    res.status(500).json({
      error: "Error processing deposit",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export default handler;
