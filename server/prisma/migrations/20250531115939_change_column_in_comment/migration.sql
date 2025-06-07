/*
  Warnings:

  - Changed the type of `like` on the `comments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "comments" DROP COLUMN "like",
ADD COLUMN     "like" INTEGER NOT NULL,
ALTER COLUMN "content" SET DATA TYPE TEXT;
