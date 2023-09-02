-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Counter" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "num" TEXT NOT NULL,
    "value" INTEGER NOT NULL DEFAULT 0,
    "checkId" INTEGER NOT NULL,
    CONSTRAINT "Counter_checkId_fkey" FOREIGN KEY ("checkId") REFERENCES "Checks" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Counter" ("checkId", "createdAt", "id", "num", "value") SELECT "checkId", "createdAt", "id", "num", "value" FROM "Counter";
DROP TABLE "Counter";
ALTER TABLE "new_Counter" RENAME TO "Counter";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
