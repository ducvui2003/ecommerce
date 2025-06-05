/*
  Warnings:

  - Added the required column `resourceId` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "resourceId" INTEGER NOT NULL,
ADD COLUMN     "thumbnail_id" INTEGER;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "resources"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
