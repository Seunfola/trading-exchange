// validateEnv.ts
const requiredEnv = ["DATABASE_URL", "JWT_SECRET", "INFURA_URL", "PRIVATE_KEY", "THIRD_PARTY_WALLET_URL"];

const validateEnv = () => {
  requiredEnv.forEach((envVar) => {
    if (!process.env[envVar]) {
      throw new Error(`Missing environment variable: ${envVar}`);
    }
  });
};

export default validateEnv;
