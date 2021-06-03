/*
  Warnings:

  - You are about to drop the column `repliedTo` on the `Comment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_repliedTo_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "repliedTo",
ADD COLUMN     "repliedToId" INTEGER;

-- AddForeignKey
ALTER TABLE "Comment" ADD FOREIGN KEY ("repliedToId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
