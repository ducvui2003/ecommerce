/*
  Warnings:

  - You are about to drop the column `provider` on the `payment_transaction` table. All the data in the column will be lost.
  - Added the required column `provider` to the `payment` table without a default value. This is not possible if the table is not empty.
  - Made the column `amount` on table `payment_transaction` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "payment" ADD COLUMN     "provider" "PaymentProvider" NOT NULL;

-- AlterTable
ALTER TABLE "payment_transaction" DROP COLUMN "provider",
ALTER COLUMN "amount" SET NOT NULL,
ALTER COLUMN "amount" DROP DEFAULT;
