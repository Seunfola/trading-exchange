import { PrismaClient } from "@prisma/client";
import validateEnv from "../utils/validation";

declare global {
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

try {
  validateEnv();

  prisma = global.prisma || new PrismaClient();

  if (process.env.NODE_ENV !== "production") {
    global.prisma = prisma; 
  }
} catch (error) {
  console.error("PrismaClient Initialization Error:", error);
  throw error; 
}

export default prisma;
