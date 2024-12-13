import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import getUserIdFromRequest from "./getUserIdFormRequest";

// Extend NextApiRequest to include userId
declare module "next" {
  interface NextApiRequest {
    userId?: number;
  }
}

const authMiddleware = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const userId = getUserIdFromRequest(req);

      if (!userId) {
        // For API routes
        if (req.headers.accept?.includes("application/json")) {
          return res.status(401).json({ message: "Unauthorized: User ID is missing or invalid" });
        }

        // For server-side requests, redirect to login
        res.setHeader("Location", "/login");
        res.status(302).end();
        return;
      }

      req.userId = userId; // Attach userId to the request object
      return handler(req, res); // Call the original handler
    } catch (error) {
      console.error("AuthMiddleware Error:", error);

      // Handle internal server errors gracefully
      return res.status(500).json({ message: "Internal server error" });
    }
  };
};

export default authMiddleware;
