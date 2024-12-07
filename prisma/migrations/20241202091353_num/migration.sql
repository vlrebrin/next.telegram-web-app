/*
  Warnings:

  - You are about to drop the column `name` on the `Counter` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[num]` on the table `Counter` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `num` to the `Counter` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Counter_name_key";

-- AlterTable
ALTER TABLE "Counter" DROP COLUMN "name",
ADD COLUMN     "num" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Counter_num_key" ON "Counter"("num");
