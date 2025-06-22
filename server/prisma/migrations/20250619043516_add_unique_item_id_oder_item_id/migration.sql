/*
  Warnings:

  - A unique constraint covering the columns `[order_item_id,user_id]` on the table `reviews` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "reviews_order_item_id_user_id_key" ON "reviews"("order_item_id", "user_id");
