/*
  Warnings:

  - Added the required column `checkId` to the `Counter` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Checks" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "summa" REAL NOT NULL DEFAULT 12000.2,
    "value" INTEGER NOT NULL DEFAULT 22214,
    "closed" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Counter" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "num" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "checkId" INTEGER NOT NULL,
    CONSTRAINT "Counter_checkId_fkey" FOREIGN KEY ("checkId") REFERENCES "Checks" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Counter" ("createdAt", "id", "num", "value") SELECT "createdAt", "id", "num", "value" FROM "Counter";
DROP TABLE "Counter";
ALTER TABLE "new_Counter" RENAME TO "Counter";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
