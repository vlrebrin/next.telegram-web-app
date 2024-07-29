/*
  Warnings:

  - You are about to drop the column `userId` on the `Metering` table. All the data in the column will be lost.
  - You are about to drop the column `jsondata` on the `User` table. All the data in the column will be lost.
  - Added the required column `counterId` to the `Metering` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Metering" DROP CONSTRAINT "Metering_userId_fkey";

-- AlterTable
ALTER TABLE "Metering" DROP COLUMN "userId",
ADD COLUMN     "counterId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "jsondata";

-- CreateTable
CREATE TABLE "Counter" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isCommon" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Counter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Counter_name_key" ON "Counter"("name");

-- AddForeignKey
ALTER TABLE "Counter" ADD CONSTRAINT "Counter_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Metering" ADD CONSTRAINT "Metering_counterId_fkey" FOREIGN KEY ("counterId") REFERENCES "Counter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
