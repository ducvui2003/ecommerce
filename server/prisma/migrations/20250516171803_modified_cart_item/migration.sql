/*
  Warnings:

  - You are about to drop the column `deleted_at` on the `cart_items` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `carts` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `carts` table. All the data in the column will be lost.
  - You are about to drop the column `payment` on the `orders` table. All the data in the column will be lost.
  - You are about to alter the column `base_price` on the `products` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Decimal(10,2)`.
  - You are about to alter the column `sale_price` on the `products` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Decimal(10,2)`.
  - Added the required column `quantity` to the `cart_items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cart_items" DROP COLUMN "deleted_at",
ADD COLUMN     "option_id" INTEGER,
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "selected" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "carts" DROP COLUMN "deleted_at",
DROP COLUMN "quantity";

-- AlterTable
ALTER TABLE "options" ALTER COLUMN "price" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "payment",
ALTER COLUMN "paymentId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "base_price" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "sale_price" SET DATA TYPE DECIMAL(10,2);

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_option_id_fkey" FOREIGN KEY ("option_id") REFERENCES "options"("id") ON DELETE SET NULL ON UPDATE CASCADE;
