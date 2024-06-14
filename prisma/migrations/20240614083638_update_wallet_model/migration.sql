/*
  Warnings:

  - Added the required column `updatedAt` to the `Wallet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterSequence
ALTER SEQUENCE "Market_id_seq" MAXVALUE 9223372036854775807;

-- AlterSequence
ALTER SEQUENCE "User_id_seq" MAXVALUE 9223372036854775807;

-- AlterSequence
ALTER SEQUENCE "Wallet_id_seq" MAXVALUE 9223372036854775807;

-- AlterTable
ALTER TABLE "OrderBook" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Wallet" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "Wallet" ADD COLUMN     "externalBalance" FLOAT8;
ALTER TABLE "Wallet" ADD COLUMN     "externalId" STRING;
ALTER TABLE "Wallet" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
