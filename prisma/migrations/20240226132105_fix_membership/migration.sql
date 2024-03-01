/*
  Warnings:

  - You are about to drop the column `membershup` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "membershup",
ADD COLUMN     "membership" "Membership" NOT NULL DEFAULT 'BRONZE';
