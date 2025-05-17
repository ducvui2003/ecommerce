/*
  Warnings:

  - You are about to drop the column `value` on the `options` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "options" DROP COLUMN "value",
ALTER COLUMN "price" SET DATA TYPE DECIMAL(65,30);
