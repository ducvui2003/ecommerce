/*
  Warnings:

  - A unique constraint covering the columns `[user_id,product_id]` on the table `wishlists` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "wishlists_user_id_product_id_key" ON "wishlists"("user_id", "product_id");
