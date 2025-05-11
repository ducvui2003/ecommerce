/*
  Warnings:

  - You are about to drop the column `deleted_at` on the `cart_items` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `carts` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `carts` table. All the data in the column will be lost.
  - You are about to drop the column `payment` on the `orders` table. All the data in the column will be lost.
  - Added the required column `quantity` to the `cart_items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cart_items" DROP COLUMN "deleted_at",
ADD COLUMN     "quantity" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "carts" DROP COLUMN "deleted_at",
DROP COLUMN "quantity",
ADD COLUMN     "total_items" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "payment",
ALTER COLUMN "paymentId" DROP NOT NULL;
