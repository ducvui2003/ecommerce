/*
  Warnings:

  - You are about to drop the column `productId` on the `options` table. All the data in the column will be lost.
  - You are about to drop the column `resourceId` on the `options` table. All the data in the column will be lost.
  - Added the required column `product_id` to the `options` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resource_id` to the `options` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "options" DROP CONSTRAINT "options_productId_fkey";

-- DropForeignKey
ALTER TABLE "options" DROP CONSTRAINT "options_resourceId_fkey";

-- AlterTable
ALTER TABLE "options" DROP COLUMN "productId",
DROP COLUMN "resourceId",
ADD COLUMN     "product_id" INTEGER NOT NULL,
ADD COLUMN     "resource_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "options" ADD CONSTRAINT "options_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "options" ADD CONSTRAINT "options_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "resources"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
