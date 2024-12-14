import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { userId } = req.query;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const wallets = await prisma.wallet.findMany({
      where: { userId: Number(userId) }, 
    });

    return res.status(200).json(wallets);
  } catch (error) {
    console.error("Error fetching wallets:", error);
    return res.status(500).json({ message: "Error fetching wallets" });
  }
};

export default handler;
