-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Metering" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "num" TEXT NOT NULL,
    "value" INTEGER NOT NULL DEFAULT 0,
    "intake" INTEGER NOT NULL DEFAULT 0,
    "payment" REAL NOT NULL DEFAULT 0.0,
    "isNoValue" BOOLEAN NOT NULL DEFAULT false,
    "isCommon" BOOLEAN NOT NULL DEFAULT false,
    "checkId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Metering_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Metering_checkId_fkey" FOREIGN KEY ("checkId") REFERENCES "Check" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Metering" ("checkId", "createdAt", "id", "intake", "isNoValue", "num", "payment", "userId", "value") SELECT "checkId", "createdAt", "id", "intake", "isNoValue", "num", "payment", "userId", "value" FROM "Metering";
DROP TABLE "Metering";
ALTER TABLE "new_Metering" RENAME TO "Metering";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
