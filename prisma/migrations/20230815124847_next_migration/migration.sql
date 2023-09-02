/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "User_name_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tg_id" INTEGER NOT NULL DEFAULT 0,
    "name" TEXT NOT NULL,
    "jsondata" TEXT NOT NULL DEFAULT 'NO JSON DATA'
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Counters" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "num" TEXT NOT NULL,
    "value" INTEGER NOT NULL DEFAULT 0,
    "checkId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Counters_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Counters_checkId_fkey" FOREIGN KEY ("checkId") REFERENCES "Checks" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Counters" ("checkId", "createdAt", "id", "num", "userId", "value") SELECT "checkId", "createdAt", "id", "num", "userId", "value" FROM "Counters";
DROP TABLE "Counters";
ALTER TABLE "new_Counters" RENAME TO "Counters";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Users_name_key" ON "Users"("name");
