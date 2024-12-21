import Cors from "cors";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import prisma from "../../lib/prisma";
import jwt from "jsonwebtoken";

// Ensure your JWT_SECRET is defined
const secretKey = process.env.JWT_SECRET;

const cors = Cors({
  methods: ["POST", "OPTIONS"],
  origin: ["https://trading-exchange-peach.vercel.app/"],
  credentials: true,
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("Request received:", { method: req.method, body: req.body });

  // Check request method
  if (req.method !== "POST") {
    return res
      .setHeader("Allow", ["POST"])
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  const { email, password } = req.body;

  // Check if all required fields are present
  if (!email || !password) {
    console.warn("Missing fields:", { email, password });
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    // Find user in database
    console.log("Fetching user with email:", email);
    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });

    if (!user) {
      console.warn("User not found for email:", email);
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // Validate password
    console.log("Validating password for user:", email);
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.warn("Password validation failed for email:", email);
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // Generate JWT token
    console.log("Generating token for user:", email);
    const token = jwt.sign(
      { userId: user.id, username: user.username, email: user.email },
      secretKey!,
      { expiresIn: "1h" }
    );

    console.log("Login successful for user:", email);
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      userId: user.id,
    });
  } catch (error: any) {
    console.error("Login Error:", error.message);
    console.error("Error Stack:", error.stack);
    return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

export default handler;
