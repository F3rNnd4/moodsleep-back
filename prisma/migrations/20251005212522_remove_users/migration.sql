/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `userId` on the `registers` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "users_email_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "users";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_registers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "moodLevel" INTEGER NOT NULL,
    "sleepHours" REAL NOT NULL,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_registers" ("createdAt", "date", "id", "moodLevel", "notes", "sleepHours", "updatedAt") SELECT "createdAt", "date", "id", "moodLevel", "notes", "sleepHours", "updatedAt" FROM "registers";
DROP TABLE "registers";
ALTER TABLE "new_registers" RENAME TO "registers";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
