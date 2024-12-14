import prisma from "./lib/prisma"; // Adjust the path as necessary
import bcrypt from "bcryptjs";

const test = async () => {
  try {
    const userId = 123;

    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      console.log("User does not exist. Creating user...");
      const hashedPassword = await bcrypt.hash("securePassword123", 10);
      user = await prisma.user.create({
        data: {
          id: userId,
          username: "test_user",
          email: "test@example.com",
          password: hashedPassword,
        },
      });
      console.log("User created:", user);
    }

    // Create wallet
    const savedWallet = await prisma.wallet.create({
      data: {
        address: "0x123456789abcdef",
        userId: user.id, // Link to the user's ID
        balance: 0.0,
        currency: "ETH",
      },
    });

    console.log("Wallet created:", savedWallet);
  } catch (error) {
    console.error("Prisma error:", error);
  } finally {
    await prisma.$disconnect();
  }
};

test();
