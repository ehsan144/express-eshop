/*
  Warnings:

  - A unique constraint covering the columns `[id,email,username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_id_email_username_key" ON "User"("id", "email", "username");
