-- CreateEnum
CREATE TYPE "RatingStatus" AS ENUM ('neutral', 'upvoted', 'downvoted');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "signupDate" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "emailAddress" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR NOT NULL,
    "body" VARCHAR NOT NULL,
    "creatorId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "text" VARCHAR NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creatorId" INTEGER NOT NULL,
    "postId" INTEGER,
    "repliedToId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostRating" (
    "userId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,
    "rating" "RatingStatus" NOT NULL
);

-- CreateTable
CREATE TABLE "CommentRating" (
    "userId" INTEGER NOT NULL,
    "commentId" INTEGER NOT NULL,
    "rating" "RatingStatus" NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User.emailAddress_unique" ON "User"("emailAddress");

-- CreateIndex
CREATE UNIQUE INDEX "UserAndPostIds" ON "PostRating"("userId", "postId");

-- CreateIndex
CREATE UNIQUE INDEX "UserAndCommentIds" ON "CommentRating"("userId", "commentId");

-- AddForeignKey
ALTER TABLE "Post" ADD FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD FOREIGN KEY ("repliedToId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostRating" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostRating" ADD FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentRating" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentRating" ADD FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
