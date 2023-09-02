/*
  Warnings:

  - You are about to drop the `Checks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Counters` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Checks";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Counters";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Users";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tg_id" INTEGER NOT NULL DEFAULT 0,
    "name" TEXT NOT NULL,
    "jsondata" TEXT NOT NULL DEFAULT 'NO JSON DATA'
);

-- CreateTable
CREATE TABLE "Check" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "summa" REAL NOT NULL DEFAULT 12000.2,
    "value" INTEGER NOT NULL DEFAULT 22214,
    "intake" INTEGER NOT NULL DEFAULT 0,
    "closed" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Metering" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "num" TEXT NOT NULL,
    "value" INTEGER NOT NULL DEFAULT 0,
    "intake" INTEGER NOT NULL DEFAULT 0,
    "checkId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Metering_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Metering_checkId_fkey" FOREIGN KEY ("checkId") REFERENCES "Check" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");
