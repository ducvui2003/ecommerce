/*
  Warnings:

  - You are about to drop the column `resourceId` on the `products` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_resourceId_fkey";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "resourceId";

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_thumbnail_id_fkey" FOREIGN KEY ("thumbnail_id") REFERENCES "resources"("id") ON DELETE SET NULL ON UPDATE CASCADE;
