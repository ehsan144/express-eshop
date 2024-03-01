/*
  Warnings:

  - You are about to drop the column `phone_number` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "phone_number",
ADD COLUMN     "phoneNumber" VARCHAR(13);
