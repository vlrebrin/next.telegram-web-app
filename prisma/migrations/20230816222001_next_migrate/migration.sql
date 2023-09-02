-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Counters" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "num" TEXT NOT NULL,
    "value" INTEGER NOT NULL DEFAULT 0,
    "intake" INTEGER NOT NULL DEFAULT 0,
    "checkId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Counters_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Counters_checkId_fkey" FOREIGN KEY ("checkId") REFERENCES "Checks" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Counters" ("checkId", "createdAt", "id", "num", "userId", "value") SELECT "checkId", "createdAt", "id", "num", "userId", "value" FROM "Counters";
DROP TABLE "Counters";
ALTER TABLE "new_Counters" RENAME TO "Counters";
CREATE TABLE "new_Checks" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "summa" REAL NOT NULL DEFAULT 12000.2,
    "value" INTEGER NOT NULL DEFAULT 22214,
    "intake" INTEGER NOT NULL DEFAULT 0,
    "closed" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Checks" ("closed", "createdAt", "id", "summa", "value") SELECT "closed", "createdAt", "id", "summa", "value" FROM "Checks";
DROP TABLE "Checks";
ALTER TABLE "new_Checks" RENAME TO "Checks";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
