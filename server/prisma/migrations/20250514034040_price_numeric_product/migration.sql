/*
  Warnings:

  - You are about to alter the column `total_amount` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `fee_shipping` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "total_amount" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "fee_shipping" SET DATA TYPE DECIMAL(10,2);


ALTER TABLE "products" ALTER COLUMN "base_price" SET DATA TYPE DECIMAL(10,2);
ALTER TABLE "products" ALTER COLUMN "sale_price" SET DATA TYPE DECIMAL(10,2);