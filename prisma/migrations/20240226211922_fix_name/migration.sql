/*
  Warnings:

  - You are about to drop the column `first_name` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "first_name",
DROP COLUMN "last_name",
ADD COLUMN     "firstName" VARCHAR(50),
ADD COLUMN     "lastName" VARCHAR(50);
