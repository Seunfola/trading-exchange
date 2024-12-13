import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import validateEnv from "../../utils/validation";
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
      validateEnv();

      // Extract userId using getUserIdFromRequest
      const userId = getUserIdFromRequest(req);

      if (!userId) {
        console.error("AuthMiddleware: Missing or invalid userId");
        return res.status(401).json({ message: "Unauthorized: Missing or invalid token" });
      }

      // Attach userId to the request object for subsequent use
      req.userId = userId;

      // Proceed to the handler
      return handler(req, res);
    } catch (error) {
      console.error("AuthMiddleware Error:", error);

      return res.status(500).json({ message: "Internal server error" });
    }
  };
};

export default authMiddleware;
