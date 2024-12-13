import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import getUserIdFromRequest from "./getUserIdFormRequest";
import validateEnv from "../../utils/validation";

// Extend NextApiRequest to include userId
declare module "next" {
  interface NextApiRequest {
    userId?: number;
  }
}

const authMiddleware = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {

      validateEnv();

      const userId = getUserIdFromRequest(req);

      if (!userId) {
        // For API routes
        if (req.headers.accept?.includes("application/json")) {
          return res.status(401).json({ message: "Unauthorized: User ID is missing or invalid" });
        }

        res.setHeader("Location", "/login");
        res.status(302).end();
        return;
      }

      req.userId = userId;
      return handler(req, res);
    } catch (error) {
      console.error("AuthMiddleware Error:", error);

      return res.status(500).json({ message: "Internal server error" });
    }
  };
};

export default authMiddleware;
