/*
  Warnings:

  - You are about to drop the column `externalBalance` on the `Wallet` table. All the data in the column will be lost.
  - You are about to drop the column `externalId` on the `Wallet` table. All the data in the column will be lost.
  - Added the required column `address` to the `Wallet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Wallet" DROP COLUMN "externalBalance";
ALTER TABLE "Wallet" DROP COLUMN "externalId";
ALTER TABLE "Wallet" ADD COLUMN     "address" STRING NOT NULL;
ALTER TABLE "Wallet" ADD COLUMN     "privateKey" STRING;
ALTER TABLE "Wallet" ALTER COLUMN "balance" SET DEFAULT 0;
