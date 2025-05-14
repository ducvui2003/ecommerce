/*
  Warnings:

  - You are about to drop the column `payment` on the `orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "payment",
ALTER COLUMN "paymentId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "base_price" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "sale_price" SET DATA TYPE DECIMAL(65,30);
