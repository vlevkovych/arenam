/*
  Warnings:

  - The primary key for the `PostRating` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `PostRating` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,postId]` on the table `PostRating` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "PostRating" DROP CONSTRAINT "PostRating_pkey",
DROP COLUMN "id";

-- CreateIndex
CREATE UNIQUE INDEX "UserAndPostIds" ON "PostRating"("userId", "postId");
