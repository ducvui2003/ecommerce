/*
  Warnings:

  - You are about to drop the column `deleted_at` on the `cart_items` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `carts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cart_id,product_id,option_id]` on the table `cart_items` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cart_id,product_id]` on the table `cart_items` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "cart_items" DROP COLUMN "deleted_at",
ALTER COLUMN "selected" SET DEFAULT true;

-- AlterTable
ALTER TABLE "carts" DROP COLUMN "deleted_at";

-- CreateIndex
CREATE UNIQUE INDEX "cart_items_cart_id_product_id_option_id_key" ON "cart_items"("cart_id", "product_id", "option_id");

-- CreateIndex
CREATE UNIQUE INDEX "cart_items_cart_id_product_id_key" ON "cart_items"("cart_id", "product_id");
