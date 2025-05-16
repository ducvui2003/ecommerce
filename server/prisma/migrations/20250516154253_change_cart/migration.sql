/*
  Warnings:

  - You are about to drop the column `quantity` on the `carts` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `detail` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `district` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `province` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `ward` on the `orders` table. All the data in the column will be lost.
  - The primary key for the `product_resources` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `productId` on the `product_resources` table. All the data in the column will be lost.
  - You are about to drop the column `resourceId` on the `product_resources` table. All the data in the column will be lost.
  - Added the required column `selected` to the `cart_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiver` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `product_resources` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resource_id` to the `product_resources` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_product_id_fkey";

-- DropForeignKey
ALTER TABLE "product_resources" DROP CONSTRAINT "product_resources_productId_fkey";

-- DropForeignKey
ALTER TABLE "product_resources" DROP CONSTRAINT "product_resources_resourceId_fkey";

-- AlterTable
ALTER TABLE "cart_items" ADD COLUMN     "option_id" INTEGER,
ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "selected" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "carts" DROP COLUMN "quantity";

-- AlterTable
ALTER TABLE "order_items" DROP COLUMN "product_id",
ADD COLUMN     "product" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "detail",
DROP COLUMN "district",
DROP COLUMN "province",
DROP COLUMN "ward",
ADD COLUMN     "receiver" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "product_resources" DROP CONSTRAINT "product_resources_pkey",
DROP COLUMN "productId",
DROP COLUMN "resourceId",
ADD COLUMN     "product_id" INTEGER NOT NULL,
ADD COLUMN     "resource_id" INTEGER NOT NULL,
ADD CONSTRAINT "product_resources_pkey" PRIMARY KEY ("product_id", "resource_id");

-- AddForeignKey
ALTER TABLE "product_resources" ADD CONSTRAINT "product_resources_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_resources" ADD CONSTRAINT "product_resources_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "resources"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_option_id_fkey" FOREIGN KEY ("option_id") REFERENCES "options"("id") ON DELETE SET NULL ON UPDATE CASCADE;
