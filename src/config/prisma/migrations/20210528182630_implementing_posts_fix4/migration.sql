/*
  Warnings:

  - You are about to drop the column `creator` on the `Post` table. All the data in the column will be lost.
  - Added the required column `creatorId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_creator_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "creator",
ADD COLUMN     "creatorId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Post" ADD FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
