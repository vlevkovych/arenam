-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "signupDate" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "emailAddress" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.emailAddress_unique" ON "User"("emailAddress");
