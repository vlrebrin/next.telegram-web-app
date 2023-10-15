-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Check" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "summa" REAL NOT NULL DEFAULT 12000.2,
    "value" INTEGER NOT NULL DEFAULT 22214,
    "intake" INTEGER NOT NULL DEFAULT 0,
    "closed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Check" ("closed", "createdAt", "id", "intake", "summa", "value") SELECT "closed", "createdAt", "id", "intake", "summa", "value" FROM "Check";
DROP TABLE "Check";
ALTER TABLE "new_Check" RENAME TO "Check";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
