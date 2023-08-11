/*
  Warnings:

  - You are about to drop the `Boxes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `name` on the `Counters` table. All the data in the column will be lost.
  - Added the required column `num` to the `Counters` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Boxes_name_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Boxes";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Counters" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "num" TEXT NOT NULL,
    "value" INTEGER NOT NULL
);
INSERT INTO "new_Counters" ("id", "value") SELECT "id", "value" FROM "Counters";
DROP TABLE "Counters";
ALTER TABLE "new_Counters" RENAME TO "Counters";
CREATE UNIQUE INDEX "Counters_num_key" ON "Counters"("num");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
