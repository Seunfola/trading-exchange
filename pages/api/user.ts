import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { userId } = req.query;

    // Validate `userId` parameter
    if (!userId || typeof userId !== "string" || isNaN(Number(userId))) {
      return res.status(400).json({ message: "Invalid or missing User ID" });
    }

    // Fetch user details from the database
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId, 10) },
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
        Wallets: {
          select: {
            address: true,
            balance: true,
            currency: true,
          },
        },
      },
    });

    // Handle case where user is not found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return user data
    return res.status(200).json({ user });
  } catch (error) {
    console.error("Database Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
