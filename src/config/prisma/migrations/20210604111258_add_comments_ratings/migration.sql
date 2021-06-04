-- CreateTable
CREATE TABLE "CommentRating" (
    "userId" INTEGER NOT NULL,
    "commentId" INTEGER NOT NULL,
    "rating" "RatingStatus" NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAndCommentIds" ON "CommentRating"("userId", "commentId");

-- AddForeignKey
ALTER TABLE "CommentRating" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentRating" ADD FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
