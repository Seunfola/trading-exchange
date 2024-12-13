import jwt from "jsonwebtoken";
import { NextApiRequest } from "next";

const getUserIdFromRequest = (req: NextApiRequest): number | null => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    console.error("Missing Authorization header");
    return null;
  }

  const tokenParts = authHeader.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    console.error("Malformed Authorization header");
    return null;
  }

  const token = tokenParts[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number };
    return decoded.userId || null;
  } catch (error) {
    if (error instanceof Error) {
      // Narrow the error type to access `message`
      console.error("JWT Verification Error:", error.message);
    } else {
      console.error("JWT Verification Error: Unknown error occurred");
    }
    return null;
  }
};

export default getUserIdFromRequest;
