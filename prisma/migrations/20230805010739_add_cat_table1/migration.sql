-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tg_id" INTEGER NOT NULL DEFAULT 0,
    "name" TEXT NOT NULL,
    "jsondata" TEXT NOT NULL DEFAULT 'NO JSON DATA'
);
INSERT INTO "new_User" ("id", "name", "tg_id") SELECT "id", "name", "tg_id" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
