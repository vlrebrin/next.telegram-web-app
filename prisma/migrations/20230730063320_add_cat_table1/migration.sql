-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Boxes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    CONSTRAINT "Boxes_id_fkey" FOREIGN KEY ("id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Boxes" ("id", "name") SELECT "id", "name" FROM "Boxes";
DROP TABLE "Boxes";
ALTER TABLE "new_Boxes" RENAME TO "Boxes";
CREATE UNIQUE INDEX "Boxes_name_key" ON "Boxes"("name");
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tg_id" INTEGER NOT NULL DEFAULT 0,
    "name" TEXT NOT NULL
);
INSERT INTO "new_User" ("id", "name", "tg_id") SELECT "id", "name", "tg_id" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
