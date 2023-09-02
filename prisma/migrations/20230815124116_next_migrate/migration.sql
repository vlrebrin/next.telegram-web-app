/*
  Warnings:

  - You are about to drop the `Counter` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Counter";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Counters" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "num" TEXT NOT NULL,
    "value" INTEGER NOT NULL DEFAULT 0,
    "checkId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Counters_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Counters_checkId_fkey" FOREIGN KEY ("checkId") REFERENCES "Checks" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
