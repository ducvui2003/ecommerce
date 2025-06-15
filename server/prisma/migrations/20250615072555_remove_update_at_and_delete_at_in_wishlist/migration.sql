/*
  Warnings:

  - You are about to drop the column `deleted_at` on the `wishlists` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `wishlists` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "wishlists" DROP COLUMN "deleted_at",
DROP COLUMN "updated_at";
