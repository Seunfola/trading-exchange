import jwt from "jsonwebtoken";
import { NextApiRequest } from "next";

const getUserIdFromRequest = (req: NextApiRequest): number | null => {
  try {
    // Check for Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      console.error("getUserIdFromRequest: Missing Authorization header");
      return null;
    }

    // Ensure the token is in the correct Bearer format
    const tokenParts = authHeader.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      console.error("getUserIdFromRequest: Malformed Authorization header");
      return null;
    }

    const token = tokenParts[1];

    // Verify the token and extract the payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number };
    return decoded?.userId || null;
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      console.error("JWT Verification Error:", error.message);
    } else {
      console.error("Unknown error occurred in getUserIdFromRequest:", error);
    }
    return null;
  }
};

export default getUserIdFromRequest;
