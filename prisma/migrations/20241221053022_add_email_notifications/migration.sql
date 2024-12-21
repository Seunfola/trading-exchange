-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailNotifications" BOOL NOT NULL DEFAULT false;
ALTER TABLE "User" ADD COLUMN     "smsNotifications" BOOL NOT NULL DEFAULT false;
ALTER TABLE "User" ADD COLUMN     "themePreference" STRING NOT NULL DEFAULT 'dark';
